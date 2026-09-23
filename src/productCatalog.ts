export type CatalogProduct = {
  id: number;
  slug: string;
  name: string;
  category: string;
  image: string;
  originalImage?: string;
};

type ProductCatalog = { products: CatalogProduct[] };

let catalogRequest: Promise<CatalogProduct[]> | undefined;

export function loadProductCatalog() {
  if (!catalogRequest) {
    catalogRequest = fetch("/images/products/catalog.json")
      .then((response) => {
        if (!response.ok) throw new Error("Não foi possível carregar o catálogo.");
        return response.json() as Promise<ProductCatalog>;
      })
      .then((catalog) => catalog.products);
  }

  return catalogRequest;
}
