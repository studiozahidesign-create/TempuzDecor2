import { useEffect, useState } from "react";
import TempusLogo from "./imports/Group9";
import SiteFooter from "./SiteFooter";
import "./AboutPage.css";

const BANNER_PLACEHOLDER = "/images/banner-placeholder.svg";

const companyNumbers = [
  ["01", "desenho pensado para permanência"],
  ["02", "conforto como matéria de projeto"],
  ["03", "tecnologia integrada ao uso"],
  ["04", "relações construídas no tempo"],
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
          <a href="/categorias/reclinaveis" onClick={() => setMenuOpen(false)}>Produtos</a><a href="/sobre" onClick={() => setMenuOpen(false)}>Sobre nós</a><a href="/conteudos" onClick={() => setMenuOpen(false)}>Conteúdos</a><a href="/blocos-3d" onClick={() => setMenuOpen(false)}>Blocos 3D</a><a href="/representantes" onClick={() => setMenuOpen(false)}>Representantes</a><a href="/carreiras" onClick={() => setMenuOpen(false)}>Carreiras</a>
        </nav>
        <a className="quiet-cta" href="https://wa.me/" target="_blank" rel="noreferrer">Fale conosco <span>↗</span></a>
        <button className="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </header>

      <section className="simple-about-hero" aria-labelledby="about-title"><img src={BANNER_PLACEHOLDER} alt="Espaço reservado para banner" fetchPriority="high" /><div /><div className="simple-about-hero-copy"><p className="editorial-eyebrow">Tempus</p><h1 id="about-title">Conforto que permanece no <em>tempo.</em></h1><p>Uma marca construída para transformar matéria, tecnologia e gesto em espaços mais humanos.</p></div></section>

      <section className="simple-about-intro" aria-labelledby="intro-title"><div><p className="editorial-number">01 / Sobre a Tempus</p><h2 id="intro-title">Desenhar o conforto é desenhar uma forma de <em>viver.</em></h2><p>A Tempus atua no desenvolvimento, produção e distribuição de soluções para conforto, construindo ao longo dos anos uma presença baseada em qualidade, experiência e relações de longo prazo.</p><p>Mais do que acompanhar o mercado, buscamos entender como as pessoas vivem, trabalham e ocupam seus espaços para continuar evoluindo.</p></div><img src={BANNER_PLACEHOLDER} alt="Espaço reservado para banner" loading="lazy" decoding="async" /></section>

      <section className="simple-about-numbers" id="numeros" aria-labelledby="numbers-title"><header><p className="editorial-eyebrow editorial-eyebrow--dark">02 / Princípios</p><h2 id="numbers-title">O que sustenta a nossa presença.</h2><p>Antes dos indicadores, existem escolhas. São elas que definem como cada produto deve tocar o espaço, o corpo e o tempo.</p></header><div>{companyNumbers.map(([number, label]) => <article key={label}><strong>{number}</strong><span>{label}</span></article>)}</div></section>

      <section className="simple-about-team" id="time" aria-labelledby="team-title"><header><p className="editorial-eyebrow editorial-eyebrow--dark">03 / Profissionais</p><h2 id="team-title">Uma marca preparada para quem <em>projeta.</em></h2><p>Arquitetos, designers de interiores, especificadores e lojistas encontram na Tempus uma parceira para transformar intenção em experiência.</p></header><div className="simple-team-gallery"><article className="about-professional-card about-professional-card--wide"><img src={BANNER_PLACEHOLDER} alt="Espaço reservado para banner" loading="lazy" decoding="async" /><div><span>01</span><h3>Especificação com repertório</h3><p>Produtos, materiais e soluções pensados para dialogar com projetos de alto padrão.</p></div></article><article className="about-professional-card"><img src={BANNER_PLACEHOLDER} alt="Espaço reservado para banner" loading="lazy" decoding="async" /><div><span>02</span><h3>Atendimento próximo</h3><p>Uma rede preparada para apoiar escolhas, orientar combinações e aproximar a marca dos profissionais.</p></div></article></div></section>

      <section className="leadership-section" aria-labelledby="leadership-title">
        <div className="leadership-copy"><p className="editorial-eyebrow editorial-eyebrow--dark">Direção</p><h2 id="leadership-title">A condução aparece nos <em>detalhes.</em></h2><p>A liderança da Tempus se expressa menos como organograma e mais como critério: desenhar com calma, produzir com precisão e construir relações que permanecem.</p></div>
        <div className="leadership-carousel" aria-hidden="true"><img src={BANNER_PLACEHOLDER} alt="" loading="lazy" decoding="async" /></div>
      </section>

      <section className="simple-about-presence" id="presenca" aria-labelledby="presence-title"><img src={BANNER_PLACEHOLDER} alt="Espaço reservado para banner" loading="lazy" decoding="async" /><div><p className="editorial-eyebrow">04 / Presença</p><h2 id="presence-title">Presença que <em>aproxima.</em></h2><p>Uma rede de representantes e parceiros que leva a Tempus a diferentes regiões e aproxima a marca de profissionais, lojas e clientes.</p><a className="editorial-action editorial-action--light" href="/representantes">Encontrar representante <span>↗</span></a></div></section>

      <section className="simple-about-closing" aria-labelledby="closing-title"><img src={BANNER_PLACEHOLDER} alt="Espaço reservado para banner" loading="lazy" decoding="async" /><div><p className="editorial-eyebrow">Tempus</p><h2 id="closing-title">O espaço também guarda o que a gente sente.</h2><a className="editorial-action editorial-action--light" href="/categorias/reclinaveis">Conheça nossos produtos <span>↗</span></a></div></section>
      <SiteFooter />
    </main>
  );
}
