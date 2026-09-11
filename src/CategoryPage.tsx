import { useEffect, useMemo, useState } from "react";
import TempusLogo from "./imports/Group9";
import SiteFooter from "./SiteFooter";

const BANNER_PLACEHOLDER = "/images/banner-placeholder.svg";

type Product = { name: string; slug: string; collection: string; type: string; image: string; technology?: string };

const collections = [
  ["Essence", "/images/products/5841-mille-3-2.jpg"],
  ["Living", "/images/products/7041-athenas.png"],
  ["Dreams", "/images/products/7187-amora.png"],
  ["Maya", "/images/products/6379-aurora.png"],
  ["Office", "/images/products/7398-sila.png"],
  ["Premium", "/images/products/6379-aurora.png"],
] as const;

const products: Product[] = [
  { name: "Mille", slug: "mille-3-2", collection: "Essence", type: "Reclinável", technology: "Reclínio elétrico", image: "/images/products/5841-mille-3-2.jpg" },
  { name: "Athenas", slug: "athenas", collection: "Living", type: "Poltrona", technology: "Base giratória", image: "/images/products/7041-athenas.png" },
  { name: "Amora", slug: "amora", collection: "Dreams", type: "Reclinável", technology: "Apoio lombar", image: "/images/products/7187-amora.png" },
  { name: "Ayla", slug: "ayla", collection: "Maya", type: "Poltrona", technology: "Design compacto", image: "/images/products/7400-ayla.png" },
  { name: "Nora", slug: "nora", collection: "Office", type: "Poltrona", technology: "Suporte ergonômico", image: "/images/products/7398-sila.png" },
  { name: "Maya", slug: "maya-cor-granizo", collection: "Premium", type: "Reclinável", technology: "Mecanismo silencioso", image: "/images/products/7032-maya-cor-granizo.png" },
  { name: "Lina", slug: "lina", collection: "Essence", type: "Poltrona", technology: "Base em madeira", image: "/images/products/6371-sophi-taupe.png" },
  { name: "Siena", slug: "siena", collection: "Living", type: "Reclinável", technology: "Conforto progressivo", image: "/images/products/6379-aurora.png" },
];

const filterLabels = ["Coleção", "Tipo de produto", "Ambiente", "Tecnologia", "Revestimento", "Material", "Cor", "Designer", "Disponibilidade", "Ordenar por"];

export default function CategoryPage() {
  const [collection, setCollection] = useState("Todos");
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [type, setType] = useState("Todos");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const visible = useMemo(() => products.filter((product) => (collection === "Todos" || product.collection === collection) && (type === "Todos" || product.type === type)), [collection, type]);

  useEffect(() => {
    const updateHeader = () => setHeaderScrolled(window.scrollY > 12);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return <main className="page-shell catalog-page">
    <header className={headerScrolled ? "minimal-header is-scrolled catalog-header" : "minimal-header catalog-header"}>
      <a className="brand brand-logo" href="/" aria-label="Tempus, início"><TempusLogo /></a>
      <nav className={menuOpen ? "minimal-nav catalog-nav is-open" : "minimal-nav catalog-nav"} aria-label="Navegação principal"><a href="/categorias/reclinaveis" onClick={() => setMenuOpen(false)}>Produtos</a><a href="/#sobre" onClick={() => setMenuOpen(false)}>Sobre nós</a><a href="/#conteudos" onClick={() => setMenuOpen(false)}>Conteúdos</a><a href="/#profissionais" onClick={() => setMenuOpen(false)}>Blocos 3D</a><a href="/#representantes" onClick={() => setMenuOpen(false)}>Representantes</a><a href="/#carreiras" onClick={() => setMenuOpen(false)}>Carreiras</a></nav>
      <a className="quiet-cta" href="https://wa.me/" target="_blank" rel="noreferrer">Fale conosco <span>↗</span></a>
      <button className="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
    </header>

    <section className="catalog-hero" aria-labelledby="category-title">
      <div className="catalog-hero-copy"><p className="editorial-eyebrow editorial-eyebrow--dark">Coleção / Tempus</p><h1 id="category-title">Poltronas<br /><em>reclináveis.</em></h1><p>Conforto desenvolvido para o cotidiano. Tecnologia, ergonomia e estética atemporal em uma coleção feita para permanecer.</p><span>24 modelos disponíveis</span></div>
      <div className="catalog-hero-image"><img src={BANNER_PLACEHOLDER} alt="Espaço reservado para banner" /></div>
    </section>

    <section className="catalog-collections" aria-label="Coleções de reclináveis"><div className="catalog-collection-rail">{collections.map(([name, image]) => <button type="button" className={collection === name ? "is-active" : ""} onClick={() => { setCollection(name); setPage(1); }} key={name}><img src={image} alt="" /><span>{name}</span></button>)}</div></section>

    <section className="catalog-products" aria-labelledby="catalog-products-title">
      <div className="catalog-filter-bar">
        <div className="catalog-filter-summary"><span>Filtros</span><strong>{visible.length.toString().padStart(2, "0")} produtos</strong></div>
        <div className="catalog-filter-options">{filterLabels.map((label) => <button type="button" key={label} className={(label === "Coleção" && collection !== "Todos") || (label === "Tipo de produto" && type !== "Todos") ? "is-selected" : ""} onClick={() => label === "Coleção" ? setCollection(collection === "Todos" ? "Essence" : "Todos") : label === "Tipo de produto" ? setType(type === "Todos" ? "Reclinável" : "Todos") : undefined}>{label}<span>⌄</span></button>)}</div>
        <button className="catalog-filter-mobile" type="button" onClick={() => setFiltersOpen(true)}>Filtrar e ordenar <span>↗</span></button>
      </div>
      {filtersOpen && <div className="catalog-drawer" role="dialog" aria-modal="true" aria-label="Filtros"><div><button type="button" onClick={() => setFiltersOpen(false)} aria-label="Fechar filtros">×</button><p className="editorial-eyebrow editorial-eyebrow--dark">Filtros</p><h2>Refinar seleção</h2><label>Coleção<select value={collection} onChange={(event) => setCollection(event.target.value)}><option>Todos</option>{collections.map(([name]) => <option key={name}>{name}</option>)}</select></label><label>Tipo de produto<select value={type} onChange={(event) => setType(event.target.value)}><option>Todos</option><option>Reclinável</option><option>Poltrona</option></select></label><button className="drawer-apply" type="button" onClick={() => setFiltersOpen(false)}>Ver produtos</button></div></div>}
      <header className="catalog-grid-head"><p className="editorial-eyebrow editorial-eyebrow--dark">Seleção atual</p><h2 id="catalog-products-title">Modelos para<br /><em>viver melhor.</em></h2></header>
      <div className="catalog-grid">{visible.map((product) => <a className="catalog-product" href={`/produtos/${product.slug}`} key={product.name}><div className="catalog-product-image"><img src={product.image} alt={`Poltrona ${product.name} Tempus`} /></div><p>{product.collection}</p><h3>{product.name}</h3><small>{product.technology}</small><span>Ver produto <b>→</b></span></a>)}</div>
      <nav className="catalog-pagination" aria-label="Paginação">{[1, 2, 3, 4].map((number) => <button type="button" className={page === number ? "is-active" : ""} onClick={() => setPage(number)} key={number}>{String(number).padStart(2, "0")}</button>)}</nav>
    </section>

    <section className="related-categories" aria-labelledby="related-title"><header><p className="editorial-eyebrow editorial-eyebrow--dark">Descubra também</p><h2 id="related-title">Outras maneiras de<br /><em>habitar o conforto.</em></h2></header><div>{[["Sofás", "/images/products/7358-emilia.png"], ["Camas", "/images/products/5777-cama-julia.webp"], ["Colchões", "/images/products/7394-martina.png"], ["Acessórios", "/images/products/6388-olivia.png"]].map(([name, image]) => <a href="/categorias/reclinaveis" key={name}><img src={image} alt={`${name} Tempus`} /><span>{name}</span><b>↗</b></a>)}</div></section>
    <SiteFooter />
  </main>;
}
