import { useEffect, useRef, useState } from "react";
import TempusLogo from "./imports/Group9";
import SiteFooter from "./SiteFooter";
import "./AboutPage.css";

// Replace these records with the official employee roster whenever it is available.
const teamMembers = [
  { name: "Nome do profissional", role: "Função / área", image: "/images/products/5841-mille-3-2.jpg" },
  { name: "Nome do profissional", role: "Função / área", image: "/images/products/7041-athenas.png" },
  { name: "Nome do profissional", role: "Função / área", image: "/images/products/7187-amora.png" },
  { name: "Nome do profissional", role: "Função / área", image: "/images/products/7400-ayla.png" },
];

const companyNumbers = [
  ["XX", "anos de história"],
  ["XX", "profissionais"],
  ["XX", "representantes"],
  ["XX", "regiões atendidas"],
];

// Replace placeholder names and portraits with official leadership data; the carousel adapts automatically.
const leadershipTeam = [
  { order: 1, name: "Nome do executivo", position: "CEO", portrait: "/images/products/7032-maya-cor-granizo.png", short_bio: "Responsável pela direção estratégica da empresa e pelos novos caminhos da Tempus." },
  { order: 2, name: "Nome do executivo", position: "COO", portrait: "/images/products/6629-perola.webp", short_bio: "Responsável por conectar operação, processos e a experiência entregue pela empresa." },
  { order: 3, name: "Nome do executivo", position: "CFO", portrait: "/images/products/6379-aurora.png", short_bio: "Conduz o planejamento financeiro que sustenta a evolução responsável da Tempus." },
  { order: 4, name: "Nome do executivo", position: "Direção Comercial", portrait: "/images/products/6371-sophi-taupe.png", short_bio: "Constrói relações de longo prazo com representantes, parceiros e mercados." },
  { order: 5, name: "Nome do executivo", position: "Direção de Operações", portrait: "/images/products/7177-allegra.png", short_bio: "Transforma visão em uma operação precisa, atenta e continuamente preparada." },
  { order: 6, name: "Nome do executivo", position: "Direção de Marketing", portrait: "/images/products/7358-emilia.png", short_bio: "Cuida da presença da Tempus e da maneira como a marca se aproxima das pessoas." },
];

export default function AboutPage() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [leadershipIndex, setLeadershipIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const leadershipTrack = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const changeLeader = (direction: number) => setLeadershipIndex((current) => (current + direction + leadershipTeam.length) % leadershipTeam.length);

  useEffect(() => {
    const track = leadershipTrack.current;
    const slide = track?.children[leadershipIndex] as HTMLElement | undefined;
    if (!track || !slide) return;
    const align = () => { track.style.transform = `translateX(-${slide.offsetLeft}px)`; };
    align();
    const observer = new ResizeObserver(align);
    observer.observe(track);
    return () => observer.disconnect();
  }, [leadershipIndex]);

  const finishLeadershipDrag = (clientX: number) => {
    if (dragStartX.current === null) return;
    const distance = clientX - dragStartX.current;
    if (Math.abs(distance) > 42) changeLeader(distance < 0 ? 1 : -1);
    dragStartX.current = null;
  };

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

      <section className="simple-about-hero" aria-labelledby="about-title"><img src="/images/about/ambiente-tempus.jpg" alt="Poltrona Tempus em ambiente com madeira natural e tons acolhedores" fetchPriority="high" /><div /><div className="simple-about-hero-copy"><p className="editorial-eyebrow">Tempus</p><h1 id="about-title">Sobre a <em>Tempus.</em></h1><p>Uma empresa construída em torno do conforto, do design e da evolução.</p></div></section>

      <section className="simple-about-intro" aria-labelledby="intro-title"><div><p className="editorial-number">01 / Sobre a Tempus</p><h2 id="intro-title">Somos a <em>Tempus.</em></h2><p>A Tempus atua no desenvolvimento, produção e distribuição de soluções para conforto, construindo ao longo dos anos uma presença baseada em qualidade, experiência e relações de longo prazo.</p><p>Mais do que acompanhar o mercado, buscamos entender como as pessoas vivem, trabalham e ocupam seus espaços para continuar evoluindo.</p></div><img src="/images/products/6388-olivia.png" alt="Cama Olivia da Tempus, com cabeceira estofada" loading="lazy" decoding="async" /></section>

      <section className="simple-about-numbers" id="numeros" aria-labelledby="numbers-title"><header><p className="editorial-eyebrow editorial-eyebrow--dark">02 / Em números</p><h2 id="numbers-title">Uma presença que se constrói no <em>tempo.</em></h2><p>Os indicadores oficiais serão atualizados aqui conforme a evolução da empresa.</p></header><div>{companyNumbers.map(([number, label]) => <article key={label}><strong>{number}</strong><span>{label}</span></article>)}</div></section>

      <section className="simple-about-team" id="time" aria-labelledby="team-title"><header><p className="editorial-eyebrow editorial-eyebrow--dark">03 / Time Tempus</p><h2 id="team-title">Tempus é feita de <em>pessoas.</em></h2><p>Pessoas diferentes, experiências diferentes e funções diferentes. Um mesmo compromisso com o trabalho que fazemos.</p></header><div className="simple-team-gallery">{teamMembers.map((member, index) => <article key={`${member.name}-${index}`}><div className="about-portrait-pending" role="img" aria-label="Fotografia da equipe ainda não disponibilizada"><span>Time Tempus</span></div><div><span>{String(index + 1).padStart(2, "0")}</span><h3>{member.name}</h3><p>{member.role}</p></div></article>)}</div></section>

      <section className="leadership-section" aria-labelledby="leadership-title">
        <div className="leadership-copy"><p className="editorial-eyebrow editorial-eyebrow--dark">Liderança</p><h2 id="leadership-title">Quem conduz a <em>Tempus.</em></h2><p>Uma equipe de profissionais responsável por construir, desenvolver e conduzir a Tempus.</p><div className="leadership-controls"><button type="button" onClick={() => changeLeader(-1)} aria-label="Liderança anterior">Anterior</button><span>{String(leadershipIndex + 1).padStart(2, "0")} / {String(leadershipTeam.length).padStart(2, "0")}</span><button type="button" onClick={() => changeLeader(1)} aria-label="Próxima liderança">Próximo</button></div></div>
        <div className="leadership-carousel" role="region" aria-label="Carrossel de liderança" tabIndex={0} onKeyDown={(event) => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); changeLeader(event.key === "ArrowLeft" ? -1 : 1); } }} onPointerDown={(event) => { dragStartX.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerUp={(event) => finishLeadershipDrag(event.clientX)} onPointerCancel={() => { dragStartX.current = null; }}>
          <div className="leadership-track" ref={leadershipTrack}>
            {leadershipTeam.map((leader) => <article className="leadership-slide" key={leader.order}><div className="about-portrait-pending" role="img" aria-label="Retrato oficial ainda não disponibilizado"><span>Tempus</span></div><div><span>{String(leader.order).padStart(2, "0")}</span><h3>{leader.name}</h3><p className="leadership-position">{leader.position}</p><p className="leadership-bio">{leader.short_bio}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="simple-about-presence" id="presenca" aria-labelledby="presence-title"><img src="/images/about/arquitetura-tempus.jpg" alt="Entrada contemporânea com madeira e iluminação natural" loading="lazy" decoding="async" /><div><p className="editorial-eyebrow">04 / Presença</p><h2 id="presence-title">Presença que <em>aproxima.</em></h2><p>Uma rede de representantes e parceiros que leva a Tempus a diferentes regiões e aproxima a marca de profissionais, lojas e clientes.</p><a className="editorial-action editorial-action--light" href="/representantes">Encontrar representante <span>↗</span></a></div></section>

      <section className="simple-about-closing" aria-labelledby="closing-title"><img src="/images/about/ambiente-tempus.jpg" alt="Composição oficial Tempus com mobiliário em ambiente residencial" loading="lazy" decoding="async" /><div><p className="editorial-eyebrow">Tempus</p><h2 id="closing-title">Continuamos em <em>movimento.</em></h2><p>Evoluindo a empresa, as relações e a maneira como construímos conforto para o futuro.</p><a className="editorial-action editorial-action--light" href="/categorias/reclinaveis">Conheça nossos produtos <span>↗</span></a></div></section>
      <SiteFooter />
    </main>
  );
}
