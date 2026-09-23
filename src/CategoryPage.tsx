import { useEffect, useMemo, useState } from "react";
import TempusLogo from "./BrandLogo";
import SiteFooter from "./SiteFooter";

type Product = { name: string; category: string; type: string; image: string; technology?: string };

const categories = [
  { id: "beds", name: "Camas", description: "Descanso desenhado como arquitetura.", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&h=1000&fit=crop&auto=format" },
  { id: "recliners", name: "Reclináveis", description: "Conforto pensado para todos os dias.", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=1000&fit=crop&auto=format" },
  { id: "office", name: "Tempus Office", description: "Ergonomia e presença para o trabalho contemporâneo.", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=1000&fit=crop&auto=format" },
  { id: "accessories", name: "Acessórios para reclináveis", description: "Elementos que completam a experiência de conforto.", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=1000&fit=crop&auto=format" },
  { id: "sofas", name: "Sofás", description: "Espaços para reunir, permanecer e viver bem.", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=1000&fit=crop&auto=format" },
] as const;

const products: Product[] = [
  { name: "Mille", category: "recliners", type: "Reclinável", technology: "Reclínio elétrico", image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=1000&h=900&fit=crop&auto=format" },
  { name: "Athenas", category: "sofas", type: "Sofá", technology: "Conforto modular", image: "https://images.unsplash.com/photo-1612204186347-fef88cc864db?w=1000&h=900&fit=crop&auto=format" },
  { name: "Amora", category: "beds", type: "Cama", technology: "Apoio envolvente", image: "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=1000&h=900&fit=crop&auto=format" },
  { name: "Ayla", category: "accessories", type: "Acessório", technology: "Apoio complementar", image: "https://images.unsplash.com/photo-1554104707-a76b270e4bbb?w=1000&h=900&fit=crop&auto=format" },
  { name: "Nora", category: "office", type: "Cadeira de trabalho", technology: "Suporte ergonômico", image: "https://images.unsplash.com/photo-1624345691006-e683ff409f3f?w=1000&h=900&fit=crop&auto=format" },
  { name: "Maya", category: "recliners", type: "Reclinável", technology: "Mecanismo silencioso", image: "https://images.unsplash.com/photo-1740154093925-ffb8e7ae526e?w=1000&h=900&fit=crop&auto=format" },
  { name: "Lina", category: "office", type: "Cadeira de trabalho", technology: "Base em madeira", image: "https://images.unsplash.com/photo-1554104683-c7063687d649?w=1000&h=900&fit=crop&auto=format" },
  { name: "Siena", category: "sofas", type: "Sofá", technology: "Conforto progressivo", image: "https://images.unsplash.com/photo-1648994517760-19afc8c7ba00?w=1000&h=900&fit=crop&auto=format" },
];


export default function CategoryPage() {
  const [category, setCategory] = useState("recliners");
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [page, setPage] = useState(1);
  const visible = useMemo(() => products.filter((product) => product.category === category), [category]);
  const activeCategory = categories.find((item) => item.id === category) ?? categories[1];

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
      <div className="catalog-hero-copy"><p className="editorial-eyebrow editorial-eyebrow--dark">Categorias / Tempus</p><h1 id="category-title">{activeCategory.name}</h1><p>{activeCategory.description}</p><span>{visible.length} {visible.length === 1 ? "modelo disponível" : "modelos disponíveis"}</span></div>
      <div className="catalog-hero-image"><img src="https://images.unsplash.com/photo-1760072513367-55182245e76c?w=1900&h=1300&fit=crop&auto=format" alt="Sala contemporânea com poltronas e luz natural" /></div>
    </section>

    <section className="catalog-categories" aria-label="Categorias de produto"><div className="catalog-category-rail">{categories.map((item) => <button type="button" className={category === item.id ? "is-active" : ""} onClick={() => { setCategory(item.id); setPage(1); document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} key={item.id}><span className="catalog-category-image"><img src={item.image} alt={`Interior Tempus para ${item.name}`} /></span><span className="catalog-category-copy"><b>{item.name}</b></span></button>)}</div></section>

    <section className="catalog-products" id="catalogo" aria-labelledby="catalog-products-title">
      <header className="catalog-grid-head"><p className="editorial-eyebrow editorial-eyebrow--dark">Seleção atual / {activeCategory.name}</p><h2 id="catalog-products-title">Modelos para<br /><em>viver melhor.</em></h2></header>
      <div className="catalog-grid">{visible.map((product) => <a className="catalog-product" href="/produtos/mille" key={product.name}><div className="catalog-product-image"><img src={product.image} alt={`${product.type} ${product.name} Tempus`} /></div><p>{activeCategory.name}</p><h3>{product.name}</h3><small>{product.technology}</small><span>Ver produto <b>→</b></span></a>)}</div>
      <nav className="catalog-pagination" aria-label="Paginação">{[1, 2, 3, 4].map((number) => <button type="button" className={page === number ? "is-active" : ""} onClick={() => setPage(number)} key={number}>{String(number).padStart(2, "0")}</button>)}</nav>
    </section>

    <SiteFooter />
  </main>;
}
