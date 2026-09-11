import { FormEvent, useEffect, useMemo, useState } from "react";
import TempusLogo from "./imports/Group9";
import SiteFooter from "./SiteFooter";

import { categories, exploreArticles, latestArticles } from "./journalData";

const BANNER_PLACEHOLDER = "/images/banner-placeholder.svg";

export default function JournalPage() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState("Todos");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => { const onScroll = () => setHeaderScrolled(window.scrollY > 12); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  const filteredArticles = useMemo(() => category === "Todos" ? latestArticles : latestArticles.filter((article) => article.category === category), [category]);
  const filteredExploreArticles = useMemo(() => category === "Todos" ? exploreArticles : exploreArticles.filter((article) => article.category === category), [category]);
  const submitNewsletter = (event: FormEvent) => { event.preventDefault(); if (email.trim()) setSubscribed(true); };

  return <main className="page-shell journal-page">
    <header className={headerScrolled ? "minimal-header is-scrolled" : "minimal-header"}><a className="brand brand-logo" href="/" aria-label="Tempus, início"><TempusLogo /></a><nav className={menuOpen ? "minimal-nav is-open" : "minimal-nav"} aria-label="Navegação principal"><a href="/categorias/reclinaveis" onClick={() => setMenuOpen(false)}>Produtos</a><a href="/sobre" onClick={() => setMenuOpen(false)}>Sobre nós</a><a href="/conteudos" onClick={() => setMenuOpen(false)}>Conteúdos</a><a href="/blocos-3d" onClick={() => setMenuOpen(false)}>Blocos 3D</a><a href="/representantes" onClick={() => setMenuOpen(false)}>Representantes</a><a href="/seja-representante" onClick={() => setMenuOpen(false)}>Seja representante</a><a href="/parceiros" onClick={() => setMenuOpen(false)}>Parceiros</a><a href="/carreiras" onClick={() => setMenuOpen(false)}>Carreiras</a></nav><a className="quiet-cta" href="https://wa.me/" target="_blank" rel="noreferrer">Fale conosco <span>↗</span></a><button className="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button></header>

    <section className="journal-hero" aria-labelledby="journal-title"><img src={BANNER_PLACEHOLDER} alt="Espaço reservado para banner" /><div><p className="editorial-eyebrow">Conteúdos</p><h1 id="journal-title">Design para além do <em>produto.</em></h1><p>Ideias, referências e conversas sobre design, arquitetura, tecnologia e novas formas de viver.</p><article><span>Interiores / 18.08.2026</span><h2>Design, matéria e o espaço que habitamos.</h2><a className="editorial-action editorial-action--light" href="/conteudos/conforto-como-parte-do-projeto">Ler artigo <span>↗</span></a></article></div></section>

    <section className="journal-latest" id="recentes" aria-labelledby="latest-title"><header><p className="editorial-eyebrow editorial-eyebrow--dark">Mais recentes</p><h2 id="latest-title">Conteúdos</h2><nav aria-label="Categorias de conteúdo">{categories.map((item) => <button type="button" className={category === item ? "is-active" : ""} onClick={() => setCategory(item)} key={item}>{item}</button>)}</nav></header><div className="journal-article-list">{filteredArticles.map((article, index) => <a href={`/conteudos/${article.slug}`} key={article.id}><span>{String(index + 1).padStart(2, "0")}</span><img src={article.image} alt="" /><div><p>{article.category} <time>{article.date}</time></p><h3>{article.title}</h3><small>{article.description}</small></div><b>Ler artigo ↗</b></a>)}</div></section>

    <section className="journal-explore" aria-labelledby="explore-title"><header><p className="editorial-eyebrow editorial-eyebrow--dark">Explore</p><h2 id="explore-title">Mais para <em>descobrir.</em></h2></header><div className="journal-explore-grid">{filteredExploreArticles.map((article) => <a href={`/conteudos/${article.slug}`} key={article.id}><div><img src={article.image} alt="" /></div><p>{article.category}<time>{article.date}</time></p><h3>{article.title}</h3><small>{article.description}</small><span>Ler artigo <b>↗</b></span></a>)}</div></section>

    <section className="journal-feature" aria-labelledby="feature-title"><img src={BANNER_PLACEHOLDER} alt="Espaço reservado para banner" /><div><p className="editorial-eyebrow">Em foco</p><h2 id="feature-title">O design começa muito antes do <em>produto.</em></h2><p>Uma investigação sobre processos, materiais, tecnologia e as decisões que transformam uma ideia em objeto.</p><a className="editorial-action editorial-action--light" href="#newsletter">Explorar história <span>↗</span></a></div></section>

    <section className="journal-newsletter" id="newsletter" aria-labelledby="newsletter-title"><div><p className="editorial-eyebrow editorial-eyebrow--dark">Journal Tempus</p><h2 id="newsletter-title">Continue por <em>perto.</em></h2><p>Receba novos conteúdos, referências e novidades da Tempus.</p></div><form onSubmit={submitNewsletter}>{subscribed ? <p className="newsletter-success">Obrigado. Você está na nossa lista.</p> : <><label><span>E-mail</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="seuemail@exemplo.com" required /></label><button type="submit">Inscrever-se <span>↗</span></button></>}</form></section>
    <SiteFooter />
  </main>;
}
