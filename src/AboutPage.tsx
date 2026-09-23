import { useEffect, useState } from "react";
import TempusLogo from "./BrandLogo";
import SiteFooter from "./SiteFooter";
import heroImage from "./imports/image-37.png";
import chairImage from "./imports/image-15.png";
import leatherImage from "./imports/image-27.png";
import productMille from "./imports/image-4.png";
import productAthenas from "./imports/image-5.png";
import productOffice from "./imports/image-6.png";
import professionalsImage from "./imports/image-16.png";
import materialsImage from "./imports/image-24.png";

const technologies = [
  ["01", "Unitech", "Precisão essencial para um movimento silencioso e intuitivo."],
  ["02", "Duotech", "Apoios independentes para ajustar o conforto ao seu corpo."],
  ["03", "Multitech", "Funções integradas que acompanham os diferentes momentos do dia."],
  ["04", "Fulltech", "A engenharia Tempus em sua expressão mais completa."],
] as const;

const categories = [
  ["01", "Camas", "Descanso desenhado para a noite."],
  ["02", "Reclináveis", "Conforto em movimento."],
  ["03", "Tempus Office", "Bem-estar para o ritmo de trabalho."],
  ["04", "Acessórios para reclináveis", "Detalhes que completam a experiência."],
  ["05", "Sofás", "Presença e acolhimento para viver junto."],
] as const;

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTechnology, setActiveTechnology] = useState(0);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  const technology = technologies[activeTechnology];

  return (
    <main className="about-rebuild">
      <header className="about-header">
        <a className="about-brand" href="/" aria-label="Tempus, início"><TempusLogo /></a>
        <nav className={menuOpen ? "about-nav is-open" : "about-nav"} aria-label="Navegação principal">
          <a href="#produtos" onClick={() => setMenuOpen(false)}>Produtos</a>
          <a href="#filosofia" onClick={() => setMenuOpen(false)}>Sobre nós</a>
          <a href="#tecnologias" onClick={() => setMenuOpen(false)}>Tecnologias</a>
          <a href="#profissionais" onClick={() => setMenuOpen(false)}>Profissionais</a>
          <a href="#materiais" onClick={() => setMenuOpen(false)}>Materiais</a>
        </nav>
        <a className="about-contact" href="https://wa.me/" target="_blank" rel="noreferrer">Fale conosco <span>↗</span></a>
        <button className="about-menu" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu" aria-expanded={menuOpen}><i /><i /></button>
      </header>

      <section className="about-hero" aria-labelledby="about-title">
        <img src={heroImage} alt="Poltrona reclinável Tempus diante de uma paisagem" />
        <div className="about-hero-copy"><p>Tempus Decor / Brasil</p><h1 id="about-title">O tempo<br />em <em>conforto.</em></h1><span>Poltronas concebidas para tornar a pausa mais presente.</span><a href="#produtos">Conhecer a Tempus <b>↗</b></a></div>
        <small>01 — espaços que pedem permanência</small>
      </section>

      <section className="about-philosophy" id="filosofia" aria-labelledby="philosophy-title">
        <p className="about-kicker">01 / A maneira Tempus</p>
        <div><h2 id="philosophy-title">Desenhamos o <em>repouso</em> como arquitetura.</h2><p>Conforto, tempo e bem-estar encontram proporção para fazer parte da casa com naturalidade.</p><a href="#signature">Nossa filosofia <b>↗</b></a></div>
        <figure><img src={chairImage} alt="Poltrona em ambiente claro" /></figure>
      </section>

      <section className="about-products" id="produtos" aria-labelledby="products-title">
        <div className="about-section-heading"><p className="about-kicker">02 / O que desenhamos</p><h2 id="products-title">Um universo para <em>viver melhor.</em></h2><p>Peças que combinam presença, ergonomia e tecnologia para acompanhar a vida em seus diferentes ritmos.</p></div>
        <div className="about-product-showcase">
          <article className="about-product-large"><img src={productMille} alt="Poltrona Mille Tempus" /><div><span>Reclináveis</span><h3>Mille</h3><a href="/produtos/mille">Ver produto ↗</a></div></article>
          <article><img src={productAthenas} alt="Poltrona Tempus em acabamento escuro" /><div><span>Poltronas</span><h3>Athenas</h3></div></article>
          <article><img src={productOffice} alt="Cadeira Tempus Office" /><div><span>Tempus Office</span><h3>Office</h3></div></article>
        </div>
        <div className="about-category-list">{categories.map(([num, name, description]) => <a key={name} href="/categorias/reclinaveis"><span>{num}</span><strong>{name}</strong><em>{description}</em><b>↗</b></a>)}</div>
      </section>

      <section className="about-tech" id="tecnologias" aria-labelledby="tech-title">
        <div className="about-tech-heading"><p>03 / Engenharia Tempus</p><h2 id="tech-title">Tecnologia que se sente.<br /><em>Não precisa aparecer.</em></h2><span>Quatro sistemas proprietários desenvolvidos para transformar mecanismo em conforto contínuo.</span></div>
        <div className="about-tech-panel"><div className="about-tech-tabs" role="tablist" aria-label="Sistemas de engenharia Tempus">{technologies.map(([number, name], index) => <button key={name} type="button" role="tab" aria-selected={activeTechnology === index} onClick={() => setActiveTechnology(index)} className={activeTechnology === index ? "is-active" : ""}><span>{number}</span>{name}<b>↗</b></button>)}</div><div className="about-tech-detail" role="tabpanel"><span>{technology[0]}</span><h3>{technology[1]}</h3><p>{technology[2]}</p><small>Sistema exclusivo Tempus</small></div></div>
      </section>

      <section className="about-signature" id="signature" aria-labelledby="signature-title"><img src={leatherImage} alt="Detalhe de couro e acabamento Tempus" /><div><p className="about-kicker">04 / Tempus Signature</p><h2 id="signature-title">Matéria, cor e acabamento com a sua <em>assinatura.</em></h2><p>Uma filosofia de personalização para que cada peça revele o modo particular como você habita.</p><a href="/produtos/mille#materiais">Explorar possibilidades <b>↗</b></a></div></section>

      <section className="about-professionals" id="profissionais" aria-labelledby="professionals-title"><img src={professionalsImage} alt="Ambiente Tempus com cama estofada e detalhes de acabamento" /><div><p>05 / Para profissionais</p><h2 id="professionals-title">Projetos que começam na <em>conversa.</em></h2><p>Para arquitetos, designers de interiores e especificadores, a Tempus é uma parceira de projeto: com repertório, materiais e suporte técnico para decidir com segurança.</p><a href="/parceiros">Área profissional <b>↗</b></a><a href="/blocos-3d">Biblioteca 3D <b>↗</b></a></div></section>

      <section className="about-materials" id="materiais" aria-labelledby="materials-title"><img src={materialsImage} alt="Trabalho manual em couro no ateliê Tempus" /><div><p>06 / Materiais e ofício</p><h2 id="materials-title">A qualidade mora no <em>detalhe.</em></h2><p>Couros, tecidos, madeiras e costuras escolhidos pela beleza que revelam hoje e pela história que sustentam amanhã.</p><ul><li>Couro e tecido selecionados</li><li>Construção precisa</li><li>Acabamentos duráveis</li></ul></div></section>

      <section className="about-closing" aria-labelledby="closing-title"><img src={heroImage} alt="Interior Tempus banhado por luz suave" /><div><p>Tempus / desde o primeiro descanso</p><h2 id="closing-title">Dê ao tempo um lugar para <em>ficar.</em></h2><a href="/categorias/reclinaveis">Conheça nossos produtos <b>↗</b></a></div></section>
      <SiteFooter />
    </main>
  );
}
