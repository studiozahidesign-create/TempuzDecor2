import { useEffect, useState } from "react";
import TempusLogo from "./imports/Group9";
import SiteFooter from "./SiteFooter";
import "./AboutPage.css";

const BANNER_PLACEHOLDER = "/images/banner-placeholder.svg";

const companyNumbers = [
  ["01", "Unitech"],
  ["02", "Duotech"],
  ["03", "Multitech"],
  ["04", "Fulltech"],
];

export default function AboutPage() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="simple-about-page">
      <header className={headerScrolled ? "minimal-header is-scrolled" : "minimal-header"}>
        <a className="brand brand-logo" href="/" aria-label="Tempus, início"><TempusLogo /></a>
        <nav className={menuOpen ? "minimal-nav is-open" : "minimal-nav"} aria-label="Navegação principal">
          <a href="/categorias/reclinaveis" onClick={() => setMenuOpen(false)}>Produtos</a><a href="/sobre" onClick={() => setMenuOpen(false)}>A Tempus</a><a href="/conteudos" onClick={() => setMenuOpen(false)}>Inspirações</a><a href="/blocos-3d" onClick={() => setMenuOpen(false)}>Blocos 3D</a><a href="/representantes" onClick={() => setMenuOpen(false)}>Representantes</a><a href="/seja-representante" onClick={() => setMenuOpen(false)}>Seja representante</a><a href="/parceiros" onClick={() => setMenuOpen(false)}>Parceiros</a><a href="/carreiras" onClick={() => setMenuOpen(false)}>Carreiras</a>
        </nav>
        <a className="quiet-cta" href="https://wa.me/" target="_blank" rel="noreferrer">Fale com a Tempus <span>↗</span></a>
        <button className="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </header>

      <section className="simple-about-hero" aria-labelledby="about-title"><img src={BANNER_PLACEHOLDER} alt="Espaço reservado para banner" fetchPriority="high" /><div /><div className="simple-about-hero-copy"><p className="editorial-eyebrow">Tempus</p><h1 id="about-title">Conforto para o seu <em>tempo.</em></h1><p>Conheça as poltronas reclináveis Tempus, suas tecnologias e opções de acabamento.</p></div></section>

      <section className="simple-about-intro" aria-labelledby="intro-title"><div><p className="editorial-number">A Tempus</p><h2 id="intro-title">Conheça as opções Tempus.</h2><p>A Tempus reúne poltronas reclináveis com diferentes opções de tecnologia e acabamento. Consulte os detalhes de cada modelo para comparar os recursos disponíveis.</p><p>Na Tempus Signature, você encontra mais de 65 opções de tecidos e mais de 15 opções de couro.</p></div><img src={BANNER_PLACEHOLDER} alt="Espaço reservado para banner" loading="lazy" decoding="async" /></section>

      <section className="simple-about-numbers" id="numeros" aria-labelledby="numbers-title"><header><p className="editorial-eyebrow editorial-eyebrow--dark">Tecnologias Tempus</p><h2 id="numbers-title">Quatro tecnologias de reclínio.</h2><p>Conheça Unitech, Duotech, Multitech e Fulltech. Consulte os recursos informados para cada modelo.</p></header><div>{companyNumbers.map(([number, label]) => <article key={label}><strong>{number}</strong><span>{label}</span></article>)}</div></section>

      <section className="simple-about-team" id="time" aria-labelledby="team-title"><header><p className="editorial-eyebrow editorial-eyebrow--dark">03 / Profissionais</p><h2 id="team-title">Informações para conhecer cada <em>modelo.</em></h2><p>Compare dimensões, consulte os recursos do produto e explore as opções de acabamento.</p></header><div className="simple-team-gallery"><article className="about-professional-card about-professional-card--wide"><img src={BANNER_PLACEHOLDER} alt="Espaço reservado para banner" loading="lazy" decoding="async" /><div><span>01</span><h3>Detalhes do produto</h3><p>Consulte as informações de cada modelo antes de escolher.</p></div></article><article className="about-professional-card"><img src={BANNER_PLACEHOLDER} alt="Espaço reservado para banner" loading="lazy" decoding="async" /><div><span>02</span><h3>Acabamentos Tempus Signature</h3><p>Mais de 65 opções de tecidos e mais de 15 opções de couro.</p></div></article></div></section>

      <section className="leadership-section" aria-labelledby="leadership-title">
        <div className="leadership-copy"><p className="editorial-eyebrow editorial-eyebrow--dark">Direção</p><h2 id="leadership-title">Compare as opções com <em>clareza.</em></h2><p>Consulte as dimensões, os recursos de reclínio e os acabamentos informados para cada modelo.</p></div>
        <div className="leadership-carousel" aria-hidden="true"><img src={BANNER_PLACEHOLDER} alt="" loading="lazy" decoding="async" /></div>
      </section>

      <section className="simple-about-presence" id="presenca" aria-labelledby="presence-title"><img src={BANNER_PLACEHOLDER} alt="Espaço reservado para banner" loading="lazy" decoding="async" /><div><p className="editorial-eyebrow">04 / Presença</p><h2 id="presence-title">Presença que <em>aproxima.</em></h2><p>Selecione sua região e consulte os contatos de representantes disponíveis.</p><a className="editorial-action editorial-action--light" href="/representantes">Encontrar representante <span>↗</span></a></div></section>

      <section className="simple-about-closing" aria-labelledby="closing-title"><img src={BANNER_PLACEHOLDER} alt="Espaço reservado para banner" loading="lazy" decoding="async" /><div><p className="editorial-eyebrow">Tempus</p><h2 id="closing-title">Encontre a poltrona para o seu espaço.</h2><a className="editorial-action editorial-action--light" href="/categorias/reclinaveis">Ver poltronas <span>↗</span></a></div></section>
      <SiteFooter />
    </main>
  );
}
