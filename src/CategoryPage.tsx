import { useEffect, useMemo, useState } from "react";
import TempusLogo from "./imports/Group9";
import SiteFooter from "./SiteFooter";
import { productCategories, products } from "./cms/products";

const PAGE_SIZE = 12;

export default function CategoryPage() {
  const [category, setCategory] = useState("todos");
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => category === "todos" ? products : products.filter((product) => product.categorySlug === category), [category]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    const updateHeader = () => setHeaderScrolled(window.scrollY > 12);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  const chooseCategory = (slug: string) => { setCategory(slug); setPage(1); };

  return <main className="page-shell catalog-page">
    <header className={headerScrolled ? "minimal-header is-scrolled catalog-header" : "minimal-header catalog-header"}>
      <a className="brand brand-logo" href="/" aria-label="Tempus, início"><TempusLogo /></a>
      <nav className={menuOpen ? "minimal-nav catalog-nav is-open" : "minimal-nav catalog-nav"} aria-label="Navegação principal"><a href="/categorias/reclinaveis">Produtos</a><a href="/sobre">Sobre nós</a><a href="/conteudos">Conteúdos</a><a href="/blocos-3d">Blocos 3D</a><a href="/representantes">Representantes</a><a href="/carreiras">Carreiras</a></nav>
      <a className="quiet-cta" href="https://wa.me/" target="_blank" rel="noreferrer">Fale conosco <span>↗</span></a>
      <button className="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
    </header>

    <section className="catalog-hero" aria-labelledby="category-title">
      <div className="catalog-hero-copy"><p className="editorial-eyebrow editorial-eyebrow--dark">Catálogo / Tempus</p><h1 id="category-title">Produtos<br /><em>Tempus.</em></h1><p>O catálogo ativo da marca, organizado pelas coleções oficiais do WordPress.</p><span>{products.length} modelos disponíveis</span></div>
      <div className="catalog-hero-image"><img src={products[0]?.image} alt="Produto Tempus" /></div>
    </section>

    <section className="catalog-collections" aria-label="Categorias de produtos"><div className="catalog-collection-rail">
      <button type="button" className={category === "todos" ? "is-active" : ""} onClick={() => chooseCategory("todos")}><img src={products[0]?.image} alt="" /><span>Todos ({products.length})</span></button>
      {productCategories.map((item) => { const sample = products.find((product) => product.categorySlug === item.slug); return <button type="button" className={category === item.slug ? "is-active" : ""} onClick={() => chooseCategory(item.slug)} key={item.id}><img src={sample?.image} alt="" /><span>{item.name} ({item.count})</span></button>; })}
    </div></section>

    <section className="catalog-products" aria-labelledby="catalog-products-title">
      <div className="catalog-filter-bar"><div className="catalog-filter-summary"><span>Categoria</span><strong>{filtered.length.toString().padStart(2, "0")} produtos</strong></div><div className="catalog-filter-options">{productCategories.map((item) => <button type="button" className={category === item.slug ? "is-selected" : ""} onClick={() => chooseCategory(item.slug)} key={item.id}>{item.name}<span>{item.count}</span></button>)}</div><button className="catalog-filter-mobile" type="button" onClick={() => setFiltersOpen(true)}>Filtrar categoria <span>↗</span></button></div>
      {filtersOpen && <div className="catalog-drawer" role="dialog" aria-modal="true" aria-label="Categorias"><div><button type="button" onClick={() => setFiltersOpen(false)} aria-label="Fechar filtros">×</button><p className="editorial-eyebrow editorial-eyebrow--dark">Categoria</p><h2>Refinar seleção</h2><label>Categoria<select value={category} onChange={(event) => chooseCategory(event.target.value)}><option value="todos">Todos</option>{productCategories.map((item) => <option value={item.slug} key={item.id}>{item.name} ({item.count})</option>)}</select></label><button className="drawer-apply" type="button" onClick={() => setFiltersOpen(false)}>Ver produtos</button></div></div>}
      <header className="catalog-grid-head"><p className="editorial-eyebrow editorial-eyebrow--dark">Catálogo ativo</p><h2 id="catalog-products-title">Modelos para<br /><em>viver melhor.</em></h2></header>
      <div className="catalog-grid">{visible.map((product) => <a className="catalog-product" href={`/produtos/${product.slug}`} key={product.id}><div className="catalog-product-image"><img src={product.image} alt={`${product.name} — ${product.category}`} loading="lazy" /></div><p>{product.category}</p><h3>{product.name}</h3><span>Ver produto <b>→</b></span></a>)}</div>
      {pageCount > 1 && <nav className="catalog-pagination" aria-label="Paginação">{Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => <button type="button" className={page === number ? "is-active" : ""} onClick={() => { setPage(number); window.scrollTo({ top: 720, behavior: "smooth" }); }} key={number}>{String(number).padStart(2, "0")}</button>)}</nav>}
    </section>
    <SiteFooter />
  </main>;
}
