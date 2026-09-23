import { useEffect, useMemo, useState } from "react";
import TempusLogo from "./imports/Group9";
import SiteFooter from "./SiteFooter";
import { loadProductCatalog, type CatalogProduct } from "./productCatalog";

const BANNER_PLACEHOLDER = "/images/banner-placeholder.svg";
const PRODUCTS_PER_PAGE = 12;

export default function CategoryPage() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadProductCatalog().then(setProducts).catch(() => setProducts([]));
    const updateHeader = () => setHeaderScrolled(window.scrollY > 12);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  const categories = useMemo(() => ["Todos", ...Array.from(new Set(products.map((product) => product.category)))], [products]);
  const visible = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    return products.filter((product) => (category === "Todos" || product.category === category) && (!normalizedQuery || product.name.toLocaleLowerCase("pt-BR").includes(normalizedQuery)));
  }, [category, products, query]);
  const pageCount = Math.max(1, Math.ceil(visible.length / PRODUCTS_PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const pageProducts = visible.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);
  const selectCategory = (nextCategory: string) => { setCategory(nextCategory); setPage(1); };

  return <main className="page-shell catalog-page">
    <header className={headerScrolled ? "minimal-header is-scrolled catalog-header" : "minimal-header catalog-header"}>
      <a className="brand brand-logo" href="/" aria-label="Tempus, início"><TempusLogo /></a>
      <nav className={menuOpen ? "minimal-nav catalog-nav is-open" : "minimal-nav catalog-nav"} aria-label="Navegação principal"><a href="/categorias/reclinaveis" onClick={() => setMenuOpen(false)}>Produtos</a><a href="/sobre" onClick={() => setMenuOpen(false)}>Sobre nós</a><a href="/conteudos" onClick={() => setMenuOpen(false)}>Conteúdos</a><a href="/blocos-3d" onClick={() => setMenuOpen(false)}>Blocos 3D</a><a href="/representantes" onClick={() => setMenuOpen(false)}>Representantes</a><a href="/seja-representante" onClick={() => setMenuOpen(false)}>Seja representante</a><a href="/parceiros" onClick={() => setMenuOpen(false)}>Parceiros</a><a href="/carreiras" onClick={() => setMenuOpen(false)}>Carreiras</a></nav>
      <a className="quiet-cta" href="https://wa.me/" target="_blank" rel="noreferrer">Fale conosco <span>↗</span></a>
      <button className="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
    </header>

    <section className="catalog-hero" aria-labelledby="category-title"><div className="catalog-hero-copy"><p className="editorial-eyebrow editorial-eyebrow--dark">Produtos / Tempus</p><h1 id="category-title">Conforto para<br /><em>todos os ritmos.</em></h1><p>Conheça o catálogo Tempus. Cada peça une desenho, tecnologia e ergonomia para acompanhar a maneira como você vive.</p><span>{products.length || "—"} modelos disponíveis</span></div><div className="catalog-hero-image"><img src={BANNER_PLACEHOLDER} alt="Espaço reservado para banner" /></div></section>

    <section className="catalog-collections" aria-label="Categorias de produtos"><div className="catalog-collection-rail">{categories.map((item, index) => { const featured = item === "Todos" ? products[0] : products.find((product) => product.category === item); return <button type="button" className={category === item ? "is-active" : ""} onClick={() => selectCategory(item)} key={item}>{featured && <img src={featured.image} alt="" />}<span>{index === 0 ? "Todos os produtos" : item}</span></button>; })}</div></section>

    <section className="catalog-products" aria-labelledby="catalog-products-title">
      <div className="catalog-filter-bar"><div className="catalog-filter-summary"><span>Catálogo</span><strong>{visible.length.toString().padStart(2, "0")} produtos</strong></div><label className="catalog-search"><span className="sr-only">Buscar produto</span><input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Buscar produto" aria-label="Buscar produto por nome" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Limpar busca">×</button>}</label><div className="catalog-filter-options">{categories.map((item) => <button type="button" key={item} className={category === item ? "is-selected" : ""} onClick={() => selectCategory(item)}>{item}<span>⌄</span></button>)}</div><button className="catalog-filter-mobile" type="button" onClick={() => setFiltersOpen(true)}>Filtrar produtos <span>↗</span></button></div>
      {filtersOpen && <div className="catalog-drawer" role="dialog" aria-modal="true" aria-label="Filtros"><div><button type="button" onClick={() => setFiltersOpen(false)} aria-label="Fechar filtros">×</button><p className="editorial-eyebrow editorial-eyebrow--dark">Categorias</p><h2>Escolha uma seleção</h2><label className="catalog-search"><span>Buscar produto</span><input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Ex.: Mille" /></label><label>Categoria<select value={category} onChange={(event) => selectCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label><button className="drawer-apply" type="button" onClick={() => setFiltersOpen(false)}>Ver produtos</button></div></div>}
      <header className="catalog-grid-head"><p className="editorial-eyebrow editorial-eyebrow--dark">Seleção atual</p><h2 id="catalog-products-title">{category === "Todos" ? <>Todos os <em>produtos.</em></> : <>{category}<br /><em>Tempus.</em></>}</h2></header>
      <div className="catalog-grid">{pageProducts.map((product) => <a className="catalog-product" href={`/produtos/${product.slug}`} key={product.id}><div className="catalog-product-image"><img src={product.image} alt={`${product.name} Tempus`} /></div><p>{product.category}</p><h3>{product.name}</h3><small>Conheça detalhes e acabamentos</small><span>Ver produto <b>→</b></span></a>)}</div>
      {!products.length && <p className="catalog-empty">Carregando produtos do catálogo.</p>}
      {!!products.length && !visible.length && <p className="catalog-empty">Nenhum produto encontrado para “{query}”.</p>}
      {pageCount > 1 && <nav className="catalog-pagination" aria-label="Paginação">{Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => <button type="button" className={currentPage === number ? "is-active" : ""} onClick={() => { setPage(number); document.querySelector(".catalog-grid-head")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} key={number}>{String(number).padStart(2, "0")}</button>)}</nav>}
    </section>
    <SiteFooter />
  </main>;
}
