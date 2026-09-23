import { useEffect, useState } from "react";
import { useParams } from "react-router";
import TempusLogo from "./imports/Group9";
import SiteFooter from "./SiteFooter";
import { loadProductCatalog, type CatalogProduct } from "./productCatalog";

const gallery = [
  ["Frontal", "/images/products/uniform/5841-mille-3-2.png", "Vista frontal da poltrona Mille"],
  ["Lateral", "/images/products/uniform/7041-athenas.png", "Vista lateral de poltrona com estrutura metálica"],
  ["Traseira", "/images/products/uniform/6379-aurora.png", "Vista traseira de poltrona em madeira"],
  ["Reclinada", "/images/products/uniform/7187-amora.png", "Poltrona reclinável em posição de descanso"],
  ["Detalhe", "/images/products/uniform/6371-sophi-taupe.png", "Detalhe de couro matelassê"],
  ["Ambiente", "/images/products/uniform/7041-athenas.png", "Poltrona em ambiente de estar contemporâneo"],
] as const;

const highlights = [["Reclínio elétrico", "Um gesto preciso para encontrar a posição de pausa."], ["Encosto independente", "Apoio de costas e pernas ajustados com autonomia."], ["Apoio de cabeça", "Conforto contínuo, mesmo nas pausas mais longas."], ["USB-C integrado", "Energia discreta, sempre ao alcance."], ["Bateria opcional", "Liberdade para compor o ambiente sem cabos aparentes."], ["Base giratória", "Movimento sereno para acompanhar a casa."]];

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<CatalogProduct | null>(null);
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [material, setMaterial] = useState("Couro Nogueira");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { const listener = () => setScrolled(window.scrollY > 12); listener(); window.addEventListener("scroll", listener, { passive: true }); return () => window.removeEventListener("scroll", listener); }, []);
  useEffect(() => { loadProductCatalog().then((products) => setProduct(products.find((item) => item.slug === slug) ?? products.find((item) => item.slug === "mille-3-2") ?? null)); }, [slug]);
  const next = () => setActive((value) => (value + 1) % gallery.length);
  const prev = () => setActive((value) => (value - 1 + gallery.length) % gallery.length);
  const productName = product?.name ?? "Mille";
  const productCategory = product?.category ?? "Fulltech";
  const productImage = product?.image ?? gallery[0][1];

  return <main className="page-shell product-page">
    <header className={scrolled ? "minimal-header is-scrolled product-header" : "minimal-header product-header"}>
      <a className="brand brand-logo" href="/" aria-label="Tempus, início"><TempusLogo /></a>
      <nav className={menuOpen ? "minimal-nav is-open" : "minimal-nav"} aria-label="Navegação principal"><a href="/categorias/reclinaveis" onClick={() => setMenuOpen(false)}>Produtos</a><a href="/sobre" onClick={() => setMenuOpen(false)}>Sobre nós</a><a href="/conteudos" onClick={() => setMenuOpen(false)}>Conteúdos</a><a href="/blocos-3d" onClick={() => setMenuOpen(false)}>Blocos 3D</a><a href="/representantes" onClick={() => setMenuOpen(false)}>Representantes</a><a href="/seja-representante" onClick={() => setMenuOpen(false)}>Seja representante</a><a href="/parceiros" onClick={() => setMenuOpen(false)}>Parceiros</a><a href="/carreiras" onClick={() => setMenuOpen(false)}>Carreiras</a></nav>
      <a className="quiet-cta" href="https://wa.me/" target="_blank" rel="noreferrer">Fale conosco <span>↗</span></a>
      <button className="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
    </header>

    <section className="product-gallery" aria-label={`Galeria ${productName}`}>
      <img src={active === 0 ? productImage : gallery[active][1]} alt={active === 0 ? `${productName} Tempus` : gallery[active][2]} />
      <div className="product-gallery-controls"><span>{String(active + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</span><p>{gallery[active][0]}</p><button type="button" onClick={prev} aria-label="Imagem anterior">←</button><button type="button" onClick={next} aria-label="Próxima imagem">→</button></div>
      <div className="product-gallery-thumbs">{gallery.map(([label, image], index) => <button type="button" className={active === index ? "is-active" : ""} onClick={() => setActive(index)} key={label}><img src={image} alt="" /><span>{label}</span></button>)}</div>
    </section>

    <section className="product-overview" aria-labelledby="product-title">
      <div className="product-overview-intro">
        <div><p className="editorial-eyebrow editorial-eyebrow--dark">{productCategory} / Tempus</p><h1 id="product-title">{productName}</h1><p className="product-overview-lead">Conforto desenhado para acompanhar o ritmo de todos os dias.</p><p className="product-overview-copy">{productName} combina tecnologia de conforto e proporções serenas em uma peça que se adapta naturalmente à vida contemporânea.</p><a className="editorial-action" href="#materiais">Ver acabamentos <span>↗</span></a></div>
      </div>
      <div className="product-overview-features"><p className="editorial-eyebrow editorial-eyebrow--dark">Design em uso / Recursos Mille</p><div>{highlights.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div>
    </section>

    <section className="product-technology"><div className="product-technology-image"><img src="/images/products/uniform/7187-amora.png" alt="Detalhe de tecido e estofado Tempus" /></div><div className="product-technology-copy"><p className="editorial-eyebrow">FullTech / Mille</p><h2>O conforto acontece<br />onde não se <em>vê.</em></h2><p>Dois motores independentes, memória de posição e bateria opcional trabalham em silêncio para que o seu tempo seja só seu.</p><div><span><b>02</b> motores independentes</span><span><b>48h</b> de bateria opcional</span><span><b>01</b> memória de posição</span></div></div></section>

    <section className="product-materials" id="materiais"><div className="product-materials-copy"><p className="editorial-eyebrow editorial-eyebrow--dark">Materiais e acabamentos</p><h2>Toque, cor e<br /><em>permanência.</em></h2><p>Escolhas que deixam a Mille mais próxima da sua casa.</p><div className="material-options">{[["Couro Nogueira", "#80502d"], ["Tecido Névoa", "#d8d5cd"], ["Couro Grafite", "#333431"], ["Trama Areia", "#c9ba9c"]].map(([name, color]) => <button type="button" className={material === name ? "is-active" : ""} onClick={() => setMaterial(name)} key={name}><i style={{ backgroundColor: color }} /><span>{name}</span></button>)}</div></div><div className="product-material-preview"><img src="/images/products/uniform/6371-sophi-taupe.png" alt={`Amostra de acabamento ${material}`} /><p>{material}</p></div></section>

    <section className="product-dimensions" aria-labelledby="dimensions-title"><div><p className="editorial-eyebrow editorial-eyebrow--dark">Dimensões</p><h2 id="dimensions-title">Proporção para<br /><em>o corpo.</em></h2></div><div className="dimension-drawing" aria-label="Desenho técnico da Mille"><div className="dimension-chair"><span className="dimension-width">86 cm</span><span className="dimension-height">108 cm</span><span className="dimension-depth">92 cm</span></div></div><dl><div><dt>Largura</dt><dd>86 cm</dd></div><div><dt>Profundidade</dt><dd>92 cm</dd></div><div><dt>Altura</dt><dd>108 cm</dd></div><div><dt>Altura do assento</dt><dd>47 cm</dd></div><div><dt>Altura do braço</dt><dd>63 cm</dd></div><div><dt>Comprimento reclinada</dt><dd>168 cm</dd></div></dl></section>

    <section className="product-specs" aria-labelledby="specs-title"><header><p className="editorial-eyebrow">Especificações</p><h2 id="specs-title">Feita para durar<br />com <em>leveza.</em></h2></header><dl>{[["Tecnologia", "FullTech reclinável"], ["Alimentação", "Bivolt"], ["Materiais", "Couro, tecido e madeira"], ["Bateria", "Opcional, até 48 horas"], ["Motores", "Dois independentes"], ["Rotação", "Base 360° opcional"], ["Capacidade", "Até 150 kg"], ["Garantia", "2 anos"]].map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl></section>

    <section className="product-lifestyle"><img src="/images/products/uniform/7400-ayla.png" alt="Poltrona em uma sala de estar ampla e contemporânea" /><img src="/images/products/uniform/7032-maya-cor-granizo.png" alt="Interior neutro com peças de design" /></section>

    <section className="product-related" aria-labelledby="related-products-title"><header><p className="editorial-eyebrow editorial-eyebrow--dark">Continue explorando</p><h2 id="related-products-title">Peças que conversam<br /><em>com a Mille.</em></h2></header><div>{[["Living", "Athenas", "/images/products/uniform/7041-athenas.png"], ["Essence", "Lina", "/images/products/uniform/6639-donna.png"], ["Dreams", "Amora", "/images/products/uniform/7187-amora.png"], ["Office", "Nora", "/images/products/uniform/7398-sila.png"]].map(([collection, name, image]) => <a href="/produtos/mille" key={name}><img src={image} alt={`Poltrona ${name}`} /><p>{collection}</p><h3>{name}</h3><span>Ver produto →</span></a>)}</div></section>

    <section className="product-downloads"><div><p className="editorial-eyebrow editorial-eyebrow--dark">Recursos Mille</p><h2>Para escolher,<br /><em>projetar e cuidar.</em></h2></div><nav>{["Catálogo do produto", "Ficha técnica", "Blocos 3D", "Instruções de montagem", "Garantia", "Guia de cuidados", "Arquivos para arquitetos"].map((item, index) => <a href="#downloads" key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}<b>↓</b></a>)}</nav></section>

    <section className="product-dealers"><div><p className="editorial-eyebrow">Onde experimentar</p><h2>Encontre a Mille<br />perto de <em>você.</em></h2></div><div><p>Visite um parceiro Tempus, fale com nossa equipe comercial ou acesse o atendimento para profissionais.</p><a className="editorial-action editorial-action--light" href="/#assistencia">Encontrar um revendedor <span>↗</span></a><a className="editorial-action editorial-action--light" href="/#profissionais">Área de arquitetos <span>↗</span></a></div></section>
    <SiteFooter />
  </main>;
}
