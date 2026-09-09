import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const wordpressUrl = (process.env.TEMPUS_WORDPRESS_URL ?? "https://tempusdecor.com.br").replace(/\/$/, "");
const outputDir = path.resolve("public/images/products");

const getJson = async (pathname) => {
  const response = await fetch(`${wordpressUrl}${pathname}`);
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
  if (!remoteImage) continue;
  const extension = path.extname(new URL(remoteImage).pathname).toLowerCase() || ".jpg";
  const filename = `${entry.id}-${entry.slug}${extension}`;
  const response = await fetch(remoteImage);
  if (!response.ok) throw new Error(`${response.status} ao baixar ${remoteImage}`);
  await writeFile(path.join(outputDir, filename), Buffer.from(await response.arrayBuffer()));
  const category = termById.get(entry["colecoes-2022"]?.[0]);
  products.push({
    id: entry.id,
    slug: entry.slug,
    name: entry.title.rendered.replace(/&nbsp;/g, " "),
    category: category?.name ?? "Sem categoria",
    image: `/images/products/${filename}`,
    source: entry.link,
  });
}

await writeFile(path.join(outputDir, "catalog.json"), JSON.stringify({ source: wordpressUrl, products }, null, 2));

const bySlug = new Map(products.map((product) => [product.slug, product.image]));
const preferredSlugs = [
  "mille-3-2", "athenas", "amora", "ayla", "maya-cor-granizo", "perola", "aurora", "sophi-taupe",
  "allegra", "emilia", "martina", "olivia", "elena", "donna", "coralina-taupe", "cama-julia",
  "jessy-wisky-2", "tess", "lys", "lille-2", "sila", "samia", "ada-2", "zoe-2",
];
const preferred = preferredSlugs.map((slug) => bySlug.get(slug)).filter(Boolean);

const knownPhotos = new Map([
  ["1505843490538-5133c6c7d0e1", bySlug.get("mille-3-2")],
  ["1612204186347-fef88cc864db", bySlug.get("athenas")],
  ["1567538096621-38d2284b23ff", bySlug.get("amora")],
  ["1554104707-a76b270e4bbb", bySlug.get("ayla")],
  ["1740154093925-ffb8e7ae526e", bySlug.get("maya-cor-granizo")],
  ["1505693416388-ac5ce068fe85", bySlug.get("cama-julia")],
  ["1624345691006-e683ff409f3f", bySlug.get("sila")],
  ["1648994517760-19afc8c7ba00", bySlug.get("aurora")],
  ["1564842505181-8862a3b9b173", bySlug.get("sophi-taupe")],
]);

const sourceDir = path.resolve("src");
const sourceFiles = (await readdir(sourceDir)).filter((name) => name.endsWith(".tsx"));
const fallbackByUrl = new Map();
let fallbackIndex = 0;
let replacements = 0;

for (const filename of sourceFiles) {
  const filepath = path.join(sourceDir, filename);
  const original = await readFile(filepath, "utf8");
  let updated = original.replace(/https:\/\/images\.unsplash\.com\/photo-([^?"')]+)[^"') ]*/g, (url, photoId) => {
    let replacement = knownPhotos.get(photoId);
    if (!replacement) {
      replacement = fallbackByUrl.get(url);
      if (!replacement) {
        replacement = preferred[fallbackIndex % preferred.length];
        fallbackByUrl.set(url, replacement);
        fallbackIndex += 1;
      }
    }
    replacements += 1;
    return replacement;
  });
  updated = updated
    .replaceAll("/images/mille.jpg", bySlug.get("mille-3-2"))
    .replaceAll("/images/athenas.png", bySlug.get("athenas"))
    .replaceAll("/images/amora.png", bySlug.get("amora"))
    .replaceAll("/images/ayla.png", bySlug.get("ayla"))
    .replaceAll("/images/perola.png", bySlug.get("perola"));
  if (updated !== original) await writeFile(filepath, updated);
}

console.log(`Sincronizados ${products.length} produtos e substituídas ${replacements} referências fictícias.`);
