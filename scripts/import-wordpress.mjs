import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.TEMPUS_WORDPRESS_URL ?? "http://tempus-decor-web-site.local";
const outputDir = path.resolve("public/images/products");

const getJson = async (pathname) => {
  const response = await fetch(`${baseUrl}${pathname}`);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${pathname}`);
  return response.json();
};

const terms = await getJson("/wp-json/wp/v2/colecoes-2022?per_page=100");
const termById = new Map(terms.map((term) => [term.id, term]));
const entries = await getJson("/wp-json/wp/v2/catalogos?status=publish&per_page=100&_embed=1");

await mkdir(outputDir, { recursive: true });

const products = [];
for (const entry of entries) {
  const media = entry._embedded?.["wp:featuredmedia"]?.[0];
  const remoteImage = media?.media_details?.sizes?.medium_large?.source_url ?? media?.source_url;
  let image = "/images/product-placeholder.svg";

  if (remoteImage) {
    const extension = path.extname(new URL(remoteImage).pathname) || ".jpg";
    const filename = `${entry.id}-${entry.slug}${extension}`;
    const response = await fetch(remoteImage);
    if (response.ok) {
      await writeFile(path.join(outputDir, filename), Buffer.from(await response.arrayBuffer()));
      image = `/images/products/${filename}`;
    }
  }

  const category = termById.get(entry["colecoes-2022"]?.[0]);
  products.push({
    id: entry.id,
    slug: entry.slug,
    name: entry.title.rendered.replace(/&nbsp;/g, " "),
    category: category?.name ?? "Sem categoria",
    categorySlug: category?.slug ?? "sem-categoria",
    image,
    sourceUrl: entry.link,
    status: "published",
  });
}

const categories = terms
  .filter((term) => products.some((product) => product.categorySlug === term.slug))
  .map((term) => ({ id: term.id, name: term.name, slug: term.slug, count: products.filter((product) => product.categorySlug === term.slug).length }));

const source = `// Gerado por scripts/import-wordpress.mjs. Não editar manualmente.\nexport type Product = { id: number; slug: string; name: string; category: string; categorySlug: string; image: string; sourceUrl: string; status: \"published\" };\nexport type ProductCategory = { id: number; name: string; slug: string; count: number };\n\nexport const productCategories: ProductCategory[] = ${JSON.stringify(categories, null, 2)};\n\nexport const products: Product[] = ${JSON.stringify(products, null, 2)};\n\nexport const getProductBySlug = (slug?: string) => products.find((product) => product.slug === slug);\n`;
await writeFile(path.resolve("src/cms/products.ts"), source);
console.log(`Imported ${products.length} published products in ${categories.length} non-empty categories.`);
