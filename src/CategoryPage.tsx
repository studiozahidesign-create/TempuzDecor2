import { useEffect, useMemo, useState } from "react";
import TempusLogo from "./imports/Group9";
import SiteFooter from "./SiteFooter";

type Product = { name: string; collection: string; type: string; image: string; technology?: string };

const collections = [
  ["Essence", "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=360&h=220&fit=crop&auto=format"],
  ["Living", "https://images.unsplash.com/photo-1612204186347-fef88cc864db?w=360&h=220&fit=crop&auto=format"],
  ["Dreams", "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=360&h=220&fit=crop&auto=format"],
  ["Maya", "https://images.unsplash.com/photo-1554104683-c7063687d649?w=360&h=220&fit=crop&auto=format"],
  ["Office", "https://images.unsplash.com/photo-1624345691006-e683ff409f3f?w=360&h=220&fit=crop&auto=format"],
  ["Premium", "https://images.unsplash.com/photo-1648994517760-19afc8c7ba00?w=360&h=220&fit=crop&auto=format"],
] as const;

const products: Product[] = [
  { name: "Mille", collection: "Essence", type: "Reclinável", technology: "Reclínio elétrico", image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=1000&h=900&fit=crop&auto=format" },
  { name: "Athenas", collection: "Living", type: "Poltrona", technology: "Base giratória", image: "https://images.unsplash.com/photo-1612204186347-fef88cc864db?w=1000&h=900&fit=crop&auto=format" },
  { name: "Amora", collection: "Dreams", type: "Reclinável", technology: "Apoio lombar", image: "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=1000&h=900&fit=crop&auto=format" },
  { name: "Ayla", collection: "Maya", type: "Poltrona", technology: "Design compacto", image: "https://images.unsplash.com/photo-1554104707-a76b270e4bbb?w=1000&h=900&fit=crop&auto=format" },
  { name: "Nora", collection: "Office", type: "Poltrona", technology: "Suporte ergonômico", image: "https://images.unsplash.com/photo-1624345691006-e683ff409f3f?w=1000&h=900&fit=crop&auto=format" },
  { name: "Maya", collection: "Premium", type: "Reclinável", technology: "Mecanismo silencioso", image: "https://images.unsplash.com/photo-1740154093925-ffb8e7ae526e?w=1000&h=900&fit=crop&auto=format" },
  { name: "Lina", collection: "Essence", type: "Poltrona", technology: "Base em madeira", image: "https://images.unsplash.com/photo-1554104683-c7063687d649?w=1000&h=900&fit=crop&auto=format" },
  { name: "Siena", collection: "Living", type: "Reclinável", technology: "Conforto progressivo", image: "https://images.unsplash.com/photo-1648994517760-19afc8c7ba00?w=1000&h=900&fit=crop&auto=format" },
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
      <div className="catalog-hero-image"><img src="https://images.unsplash.com/photo-1760072513367-55182245e76c?w=1900&h=1300&fit=crop&auto=format" alt="Sala contemporânea com poltronas e luz natural" /></div>
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
      <div className="catalog-grid">{visible.map((product) => <a className="catalog-product" href="/produtos/mille" key={product.name}><div className="catalog-product-image"><img src={product.image} alt={`Poltrona ${product.name} Tempus`} /></div><p>{product.collection}</p><h3>{product.name}</h3><small>{product.technology}</small><span>Ver produto <b>→</b></span></a>)}</div>
      <nav className="catalog-pagination" aria-label="Paginação">{[1, 2, 3, 4].map((number) => <button type="button" className={page === number ? "is-active" : ""} onClick={() => setPage(number)} key={number}>{String(number).padStart(2, "0")}</button>)}</nav>
    </section>

    <section className="related-categories" aria-labelledby="related-title"><header><p className="editorial-eyebrow editorial-eyebrow--dark">Descubra também</p><h2 id="related-title">Outras maneiras de<br /><em>habitar o conforto.</em></h2></header><div>{[["Sofás", "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=900&h=900&fit=crop&auto=format"], ["Camas", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&h=900&fit=crop&auto=format"], ["Colchões", "https://images.unsplash.com/photo-1617098900591-3f90928e8c54?w=900&h=900&fit=crop&auto=format"], ["Acessórios", "https://images.unsplash.com/photo-1634148739177-775032f3feb1?w=900&h=900&fit=crop&auto=format"]].map(([name, image]) => <a href="/categorias/reclinaveis" key={name}><img src={image} alt={`${name} Tempus`} /><span>{name}</span><b>↗</b></a>)}</div></section>
    <SiteFooter />
  </main>;
}
