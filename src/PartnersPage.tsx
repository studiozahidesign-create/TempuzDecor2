import { FormEvent, useEffect, useState } from "react";
import TempusLogo from "./BrandLogo";
import SiteFooter from "./SiteFooter";

const strengths = [
  ["Marca", "Uma empresa posicionada no mercado de conforto e design."],
  ["Portfólio", "Produtos desenvolvidos para diferentes ambientes e necessidades."],
  ["Suporte", "Estrutura para apoiar o representante no desenvolvimento comercial."],
  ["Relacionamento", "Uma parceria construída no longo prazo."],
];

const categories = [
  ["Poltronas", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=1400&fit=crop&auto=format"],
  ["Sofás", "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=1400&fit=crop&auto=format"],
  ["Camas", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&h=1400&fit=crop&auto=format"],
  ["Home", "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&h=1400&fit=crop&auto=format"],
];

const resources = ["Materiais comerciais", "Suporte técnico", "Blocos 3D", "Atendimento", "Logística"];
const process = [
  ["Cadastro", "Envie suas informações e sua região de atuação."],
  ["Análise", "Nossa equipe avalia o perfil e a oportunidade regional."],
  ["Conversa", "Entendemos seu mercado, experiência e potencial de atuação."],
  ["Parceria", "Definimos os próximos passos para começar a trabalhar juntos."],
];
const profile = ["Experiência comercial", "Conhecimento do mercado de móveis e design", "Relacionamento com lojistas e profissionais", "Atuação regional", "Perfil consultivo", "Organização e acompanhamento comercial"];

export default function PartnersPage() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="page-shell representatives-page">
      <header className={headerScrolled ? "minimal-header is-scrolled" : "minimal-header"}>
        <a className="brand brand-logo" href="/" aria-label="Tempos, início"><TempusLogo /></a>
        <nav className={menuOpen ? "minimal-nav is-open" : "minimal-nav"} aria-label="Navegação principal">
          <a href="/categorias/reclinaveis" onClick={() => setMenuOpen(false)}>Produtos</a><a href="/sobre" onClick={() => setMenuOpen(false)}>Sobre nós</a><a href="/conteudos" onClick={() => setMenuOpen(false)}>Conteúdos</a><a href="/blocos-3d" onClick={() => setMenuOpen(false)}>Blocos 3D</a><a href="/representantes" onClick={() => setMenuOpen(false)}>Representantes</a><a href="/seja-representante" onClick={() => setMenuOpen(false)}>Seja representante</a><a href="/parceiros" onClick={() => setMenuOpen(false)}>Parceiros</a>
        </nav>
        <a className="quiet-cta" href="#candidatura">Seja representante <span>↗</span></a>
        <button className="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </header>

      <section className="rep-hero" aria-labelledby="rep-title">
        <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=2400&h=1600&fit=crop&auto=format" alt="Ambiente contemporâneo Tempos" />
        <div className="rep-hero-copy"><p className="editorial-eyebrow">Seja um representante</p><h1 id="rep-title">Leve a Tempos<br />para a sua <em>região.</em></h1><p>Estamos ampliando nossa rede de representantes e buscamos parceiros comerciais preparados para construir novos mercados conosco.</p><div className="rep-actions"><a href="#candidatura">Quero representar a Tempos <span>↗</span></a><a href="#oportunidade">Conhecer a oportunidade <span>↓</span></a></div></div>
        <p className="rep-hero-index">01 — Parceiros comerciais</p>
      </section>

      <section className="rep-opportunity" id="oportunidade" aria-labelledby="opportunity-title">
        <div><p className="editorial-eyebrow editorial-eyebrow--dark">A oportunidade</p><h2 id="opportunity-title">Uma marca para representar.<br /><em>Um mercado para desenvolver.</em></h2><p>Tempos reúne conforto, design e soluções para a casa contemporânea. Buscamos representantes que entendem os mercados locais e querem construir relações comerciais consistentes.</p></div>
        <div className="rep-strengths">{strengths.map(([title, description], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>

      <section className="rep-portfolio" aria-labelledby="portfolio-title"><div className="rep-section-heading"><p className="editorial-eyebrow editorial-eyebrow--dark">Portfólio Tempos</p><h2 id="portfolio-title">Amplitude para<br /><em>novas conversas.</em></h2><p>Um portfólio construído para diferentes momentos e ambientes da casa.</p></div><div className="rep-category-grid">{categories.map(([category, image], index) => <article key={category} className={`rep-category rep-category-${index + 1}`}><img src={image} alt={`Linha de ${category.toLowerCase()} Tempos`} /><div><span>{String(index + 1).padStart(2, "0")}</span><h3>{category}</h3><b>↗</b></div></article>)}</div></section>

      <section className="rep-support" aria-labelledby="support-title"><div className="rep-support-image"><img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1800&h=1500&fit=crop&auto=format" alt="Mesa com materiais de trabalho" /></div><div><p className="editorial-eyebrow">Estrutura para representantes</p><h2 id="support-title">Você vende.<br />A Tempos dá <em>suporte.</em></h2><ul>{resources.map((resource, index) => <li key={resource}><span>{String(index + 1).padStart(2, "0")}</span><b>{resource}</b><i>↗</i></li>)}</ul></div></section>

      <section className="rep-process" aria-labelledby="process-title"><div><p className="editorial-eyebrow editorial-eyebrow--dark">Como funciona</p><h2 id="process-title">O começo de uma<br /><em>boa parceria.</em></h2></div><ol>{process.map(([name, copy], index) => <li key={name}><span>{String(index + 1).padStart(2, "0")}</span><h3>{name}</h3><p>{copy}</p></li>)}</ol></section>

      <section className="rep-network" aria-labelledby="network-title"><div className="rep-map" aria-label="Mapa estilizado do Brasil indicando regiões de atuação"><div className="rep-map-shape" /><i className="pin pin-1" /><i className="pin pin-2" /><i className="pin pin-3" /><i className="pin pin-4" /><p>Brasil</p></div><div><p className="editorial-eyebrow">Onde estamos</p><h2 id="network-title">Uma rede que continua <em>crescendo.</em></h2><p>Já estamos presentes em diferentes regiões do Brasil e buscamos novos parceiros para ampliar nossa atuação.</p><a href="#candidatura">Ver oportunidade na minha região <span>↘</span></a></div></section>

      <section className="rep-profile" aria-labelledby="profile-title"><div><p className="editorial-eyebrow editorial-eyebrow--dark">Quem procuramos</p><h2 id="profile-title">Parceiros que<br />conhecem o <em>mercado.</em></h2></div><ul>{profile.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ul></section>

      <section className="rep-application" id="candidatura" aria-labelledby="application-title"><div><p className="editorial-eyebrow editorial-eyebrow--dark">Candidatura</p><h2 id="application-title">Quer representar<br />a <em>Tempos?</em></h2><p>Conte um pouco sobre sua atuação e a região onde trabalha.</p></div><form onSubmit={submit}>{submitted ? <p className="rep-success" role="status">Recebemos suas informações. Em breve, nossa equipe entrará em contato.</p> : <><label><span>Nome</span><input required name="name" /></label><label><span>Empresa</span><input name="company" /></label><label><span>E-mail</span><input required type="email" name="email" /></label><label><span>Telefone</span><input required type="tel" name="phone" /></label><label><span>Cidade</span><input name="city" /></label><label><span>Estado</span><select defaultValue=""><option value="" disabled>Selecione</option><option>AC</option><option>BA</option><option>MG</option><option>PR</option><option>RJ</option><option>RS</option><option>SC</option><option>SP</option></select></label><label><span>Região de atuação</span><input name="region" /></label><label><span>Segmentos em que atua</span><input name="segments" /></label><label><span>Marcas que representa atualmente</span><input name="brands" /></label><label><span>Website / Instagram</span><input name="website" /></label><label className="rep-message"><span>Mensagem</span><textarea name="message" rows={3} /></label><button type="submit">Quero representar a Tempos <span>↗</span></button></>}</form></section>

      <section className="rep-closing"><img src="https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=2400&h=1500&fit=crop&auto=format" alt="Sala sofisticada com mobiliário contemporâneo" /><div><p className="editorial-eyebrow">Próximo passo</p><h2>Vamos crescer <em>juntos.</em></h2><p>Estamos procurando parceiros para construir a próxima etapa da nossa presença no Brasil.</p><a href="#candidatura">Quero ser representante <span>↗</span></a></div></section>
      <SiteFooter />
    </main>
  );
}
