import { useEffect, useState } from "react";
import TempusLogo from "./BrandLogo";
import SiteFooter from "./SiteFooter";
import TempusSignature from "./TempusSignature";

const gallery = [
  ["Frontal", "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=2200&h=1500&fit=crop&auto=format", "Vista frontal da poltrona Mille"],
  ["Lateral", "https://images.unsplash.com/photo-1612204186347-fef88cc864db?w=2200&h=1500&fit=crop&auto=format", "Vista lateral de poltrona com estrutura metálica"],
  ["Reclinada", "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=2200&h=1500&fit=crop&auto=format", "Poltrona reclinável em posição de descanso"],
  ["Detalhe", "https://images.unsplash.com/photo-1564842505181-8862a3b9b173?w=2200&h=1500&fit=crop&auto=format", "Detalhe de couro matelassê"],
] as const;

const highlights = [["Reclínio elétrico", "A posição certa, encontrada num gesto preciso."], ["Encosto independente", "Apoio de costas e pernas com autonomia."], ["Base giratória", "Movimento sereno para acompanhar a casa."], ["USB-C integrado", "Energia discreta, sempre ao alcance."]];
const specifications = [["Dimensões", "86 × 92 × 108 cm"], ["Estrutura", "Madeira de reflorestamento e aço"], ["Revestimentos", "Couro natural ou tecidos Tempus"], ["Mecanismo", "FullTech com dois motores independentes"], ["Garantia", "2 anos"], ["Opções", "Bateria e base 360° opcionais"]];

export default function ProductPage() {
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [material, setMaterial] = useState("Couro Nogueira");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const listener = () => setScrolled(window.scrollY > 12);
    listener(); window.addEventListener("scroll", listener, { passive: true });
    return () => window.removeEventListener("scroll", listener);
  }, []);
  const next = () => setActive((value) => (value + 1) % gallery.length);
  const prev = () => setActive((value) => (value - 1 + gallery.length) % gallery.length);

  return <main className="page-shell product-page">
    <header className={scrolled ? "minimal-header is-scrolled product-header" : "minimal-header product-header"}>
      <a className="brand brand-logo" href="/" aria-label="Tempus, início"><TempusLogo /></a>
      <nav className={menuOpen ? "minimal-nav is-open" : "minimal-nav"} aria-label="Navegação principal"><a href="/categorias/reclinaveis" onClick={() => setMenuOpen(false)}>Produtos</a><a href="/#sobre" onClick={() => setMenuOpen(false)}>Sobre nós</a><a href="/#conteudos" onClick={() => setMenuOpen(false)}>Conteúdos</a><a href="/#profissionais" onClick={() => setMenuOpen(false)}>Blocos 3D</a><a href="/#representantes" onClick={() => setMenuOpen(false)}>Representantes</a></nav>
      <a className="quiet-cta" href="https://wa.me/" target="_blank" rel="noreferrer">Fale conosco <span>↗</span></a>
      <button className="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
    </header>

    <section className="product-gallery" aria-label="Galeria da poltrona Mille">
      <img src={gallery[active][1]} alt={gallery[active][2]} />
      <div className="product-gallery-controls"><span>{String(active + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</span><p>{gallery[active][0]}</p><button type="button" onClick={prev} aria-label="Imagem anterior">←</button><button type="button" onClick={next} aria-label="Próxima imagem">→</button></div>
      <div className="product-gallery-thumbs">{gallery.map(([label, image], index) => <button type="button" className={active === index ? "is-active" : ""} onClick={() => setActive(index)} key={label}><img src={image} alt="" /><span>{label}</span></button>)}</div>
    </section>

    <section className="product-overview" aria-labelledby="product-title">
      <div className="product-overview-intro"><div><p className="editorial-eyebrow editorial-eyebrow--dark">Essence / Poltrona reclinável</p><h1 id="product-title">Mille</h1><p className="product-overview-lead">Conforto desenhado para acompanhar o ritmo de todos os dias.</p><p className="product-overview-copy">Mille reúne proporções serenas e tecnologia discreta numa poltrona que se adapta naturalmente à vida contemporânea.</p><a className="editorial-action" href="#materiais">Ver acabamentos <span>↗</span></a></div></div>
      <div className="product-overview-features"><p className="editorial-eyebrow editorial-eyebrow--dark">Em síntese</p><div>{highlights.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div>
    </section>

    <section className="product-specifications" aria-labelledby="specifications-title"><header><p className="editorial-eyebrow editorial-eyebrow--dark">Informação técnica</p><h2 id="specifications-title">A engenharia<br />em <em>equilíbrio.</em></h2></header><dl>{specifications.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl></section>

    <TempusSignature image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&h=1600&fit=crop&auto=format" />

    <section className="product-story" aria-labelledby="story-title"><div className="product-story-image"><img src="https://images.unsplash.com/photo-1599933345241-2d01fe8d06ec?w=1800&h=1350&fit=crop&auto=format" alt="Textura de estofado em luz natural" /></div><div className="product-story-copy"><p className="editorial-eyebrow">Mille, em contexto</p><h2 id="story-title">Uma pausa que<br />pertence à <em>casa.</em></h2><p>Há objetos que resolvem uma função. Mille parte de outra pergunta: como o conforto pode sustentar a vida que acontece ao redor? Sua presença é calma, sem se impor à arquitetura ou interromper a conversa.</p><p>O desenho acolhe o corpo e deixa que o ambiente continue sendo o protagonista.</p></div></section>

    <section className="product-technology" aria-labelledby="technology-title"><div className="product-technology-copy"><p className="editorial-eyebrow">FullTech / Mille</p><h2 id="technology-title">O conforto acontece<br />onde não se <em>vê.</em></h2><p>Dois motores independentes e uma bateria opcional trabalham em silêncio, para que o seu tempo seja só seu.</p><div><span><b>02</b> motores independentes</span><span><b>48h</b> de bateria opcional</span><span><b>01</b> memória de posição</span></div></div><div className="product-technology-image"><img src="https://images.unsplash.com/photo-1599933345241-2d01fe8d06ec?w=1800&h=1350&fit=crop&auto=format" alt="Detalhe de tecido e estofado Tempus" /></div></section>

    <section className="product-usage" aria-labelledby="usage-title"><header><p className="editorial-eyebrow editorial-eyebrow--dark">Como viver com Mille</p><h2 id="usage-title">Feita para o<br /><em>tempo que fica.</em></h2></header><div className="usage-notes"><article><span>01</span><h3>Leitura</h3><p>O apoio contínuo convida a demorar-se num capítulo, sem pedir ajuste constante.</p></article><article><span>02</span><h3>Conversa</h3><p>Giro e reclínio acompanham uma sala que muda de ritmo ao longo do dia.</p></article><article><span>03</span><h3>Descanso</h3><p>Encosto, pernas e cabeça encontram uma posição própria para pausas longas.</p></article></div></section>

    <section className="product-materials" id="materiais"><div className="product-materials-copy"><p className="editorial-eyebrow editorial-eyebrow--dark">Materiais e detalhes</p><h2>Toque, cor e<br /><em>permanência.</em></h2><p>Escolhas que deixam a Mille mais próxima da sua casa.</p><div className="material-options">{[["Couro Nogueira", "#80502d"], ["Tecido Névoa", "#d8d5cd"], ["Couro Grafite", "#333431"], ["Trama Areia", "#c9ba9c"]].map(([name, color]) => <button type="button" className={material === name ? "is-active" : ""} onClick={() => setMaterial(name)} key={name}><i style={{ backgroundColor: color }} /><span>{name}</span></button>)}</div></div><div className="product-material-preview"><img src="https://images.unsplash.com/photo-1564842505181-8862a3b9b173?w=1500&h=1500&fit=crop&auto=format" alt={`Detalhe do acabamento ${material}`} /><p>{material}</p></div></section>

    <section className="product-dimensions" aria-labelledby="dimensions-title"><div><p className="editorial-eyebrow editorial-eyebrow--dark">Dimensões</p><h2 id="dimensions-title">Proporção para<br /><em>o corpo.</em></h2></div><div className="dimension-drawing" aria-label="Desenho técnico da Mille"><div className="dimension-chair"><span className="dimension-width">86 cm</span><span className="dimension-height">108 cm</span><span className="dimension-depth">92 cm</span></div></div><dl>{[["Largura", "86 cm"], ["Profundidade", "92 cm"], ["Altura", "108 cm"], ["Assento", "47 cm"], ["Braço", "63 cm"], ["Reclinada", "168 cm"]].map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl></section>

    <section className="product-specs" aria-labelledby="specs-title"><header><p className="editorial-eyebrow">Ficha completa</p><h2 id="specs-title">Precisão sem<br /><em>excesso.</em></h2></header><dl>{[["Tecnologia", "FullTech reclinável"], ["Alimentação", "Bivolt"], ["Materiais", "Couro, tecido e madeira"], ["Bateria", "Opcional, até 48 horas"], ["Motores", "Dois independentes"], ["Rotação", "Base 360° opcional"], ["Capacidade", "Até 150 kg"], ["Garantia", "2 anos"]].map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl></section>

    <section className="product-related" aria-labelledby="related-products-title"><header><p className="editorial-eyebrow editorial-eyebrow--dark">Continue explorando</p><h2 id="related-products-title">Peças que conversam<br /><em>com a Mille.</em></h2></header><div>{[["Living", "Athenas", "https://images.unsplash.com/photo-1612204186347-fef88cc864db?w=900&h=900&fit=crop&auto=format"], ["Essence", "Lina", "https://images.unsplash.com/photo-1554104683-c7063687d649?w=900&h=900&fit=crop&auto=format"], ["Dreams", "Amora", "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=900&h=900&fit=crop&auto=format"]].map(([collection, name, image]) => <a href="/produtos/mille" key={name}><img src={image} alt={`Poltrona ${name}`} /><p>{collection}</p><h3>{name}</h3><span>Ver produto →</span></a>)}</div></section>

    <section className="product-lifestyle" aria-label="Mille em ambientes"><img src="https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=2200&h=1500&fit=crop&auto=format" alt="Sala de estar ampla e contemporânea" /><img src="https://images.unsplash.com/photo-1750639258774-9a714379a093?w=2200&h=1500&fit=crop&auto=format" alt="Interior neutro com peças de design" /></section>
    <SiteFooter />
  </main>;
}
