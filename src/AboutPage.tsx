import { useEffect, useRef, useState } from "react";
import TempusLogo from "./imports/Group9";
import SiteFooter from "./SiteFooter";

// Replace these records with the official employee roster whenever it is available.
const teamMembers = [
  { name: "Nome do profissional", role: "Função / área", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=1500&fit=crop&auto=format" },
  { name: "Nome do profissional", role: "Função / área", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&h=1500&fit=crop&auto=format" },
  { name: "Nome do profissional", role: "Função / área", image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200&h=1500&fit=crop&auto=format" },
  { name: "Nome do profissional", role: "Função / área", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=1500&fit=crop&auto=format" },
];

const companyNumbers = [
  ["XX", "anos de história"],
  ["XX", "profissionais"],
  ["XX", "representantes"],
  ["XX", "regiões atendidas"],
];

// Replace placeholder names and portraits with official leadership data; the carousel adapts automatically.
const leadershipTeam = [
  { order: 1, name: "Nome do executivo", position: "CEO", portrait: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1400&h=1800&fit=crop&auto=format", short_bio: "Responsável pela direção estratégica da empresa e pelos novos caminhos da Tempus." },
  { order: 2, name: "Nome do executivo", position: "COO", portrait: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1400&h=1800&fit=crop&auto=format", short_bio: "Responsável por conectar operação, processos e a experiência entregue pela empresa." },
  { order: 3, name: "Nome do executivo", position: "CFO", portrait: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1400&h=1800&fit=crop&auto=format", short_bio: "Conduz o planejamento financeiro que sustenta a evolução responsável da Tempus." },
  { order: 4, name: "Nome do executivo", position: "Direção Comercial", portrait: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&h=1800&fit=crop&auto=format", short_bio: "Constrói relações de longo prazo com representantes, parceiros e mercados." },
  { order: 5, name: "Nome do executivo", position: "Direção de Operações", portrait: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=1400&h=1800&fit=crop&auto=format", short_bio: "Transforma visão em uma operação precisa, atenta e continuamente preparada." },
  { order: 6, name: "Nome do executivo", position: "Direção de Marketing", portrait: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=1400&h=1800&fit=crop&auto=format", short_bio: "Cuida da presença da Tempus e da maneira como a marca se aproxima das pessoas." },
];

export default function AboutPage() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [leadershipIndex, setLeadershipIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const changeLeader = (direction: number) => setLeadershipIndex((current) => (current + direction + leadershipTeam.length) % leadershipTeam.length);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") changeLeader(-1);
      if (event.key === "ArrowRight") changeLeader(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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
          <a href="/categorias/reclinaveis" onClick={() => setMenuOpen(false)}>Produtos</a><a href="/sobre" onClick={() => setMenuOpen(false)}>Sobre nós</a><a href="#numeros" onClick={() => setMenuOpen(false)}>Conteúdos</a><a href="#time" onClick={() => setMenuOpen(false)}>Blocos 3D</a><a href="#presenca" onClick={() => setMenuOpen(false)}>Representantes</a><a href="#time" onClick={() => setMenuOpen(false)}>Carreiras</a>
        </nav>
        <a className="quiet-cta" href="https://wa.me/" target="_blank" rel="noreferrer">Fale conosco <span>↗</span></a>
        <button className="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </header>

      <section className="simple-about-hero" aria-labelledby="about-title"><img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=2400&h=1500&fit=crop&auto=format" alt="Espaço de trabalho contemporâneo com luz natural" /><div /><div className="simple-about-hero-copy"><p className="editorial-eyebrow">Tempus</p><h1 id="about-title">Sobre a <em>Tempus.</em></h1><p>Uma empresa construída em torno do conforto, do design e da evolução.</p></div></section>

      <section className="simple-about-intro" aria-labelledby="intro-title"><div><p className="editorial-number">01 / Sobre a Tempus</p><h2 id="intro-title">Somos a <em>Tempus.</em></h2><p>A Tempus atua no desenvolvimento, produção e distribuição de soluções para conforto, construindo ao longo dos anos uma presença baseada em qualidade, experiência e relações de longo prazo.</p><p>Mais do que acompanhar o mercado, buscamos entender como as pessoas vivem, trabalham e ocupam seus espaços para continuar evoluindo.</p></div><img src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1800&h=1600&fit=crop&auto=format" alt="Pessoas reunidas em um ambiente de trabalho contemporâneo" /></section>

      <section className="simple-about-numbers" id="numeros" aria-labelledby="numbers-title"><header><p className="editorial-eyebrow editorial-eyebrow--dark">02 / Em números</p><h2 id="numbers-title">Uma presença que se constrói no <em>tempo.</em></h2><p>Os indicadores oficiais serão atualizados aqui conforme a evolução da empresa.</p></header><div>{companyNumbers.map(([number, label]) => <article key={label}><strong>{number}</strong><span>{label}</span></article>)}</div></section>

      <section className="simple-about-team" id="time" aria-labelledby="team-title"><header><p className="editorial-eyebrow editorial-eyebrow--dark">03 / Time Tempus</p><h2 id="team-title">Tempos é feita de <em>pessoas.</em></h2><p>Pessoas diferentes, experiências diferentes e funções diferentes. Um mesmo compromisso com o trabalho que fazemos.</p></header><div className="simple-team-gallery">{teamMembers.map((member, index) => <article key={`${member.name}-${index}`}><img src={member.image} alt="Retrato do time Tempus" /><div><span>{String(index + 1).padStart(2, "0")}</span><h3>{member.name}</h3><p>{member.role}</p></div></article>)}</div></section>

      <section className="leadership-section" aria-labelledby="leadership-title">
        <div className="leadership-copy"><p className="editorial-eyebrow editorial-eyebrow--dark">Liderança</p><h2 id="leadership-title">Quem conduz a <em>Tempus.</em></h2><p>Uma equipe de profissionais responsável por construir, desenvolver e conduzir a Tempus.</p><div className="leadership-controls"><button type="button" onClick={() => changeLeader(-1)} aria-label="Liderança anterior">Anterior</button><span>{String(leadershipIndex + 1).padStart(2, "0")} / {String(leadershipTeam.length).padStart(2, "0")}</span><button type="button" onClick={() => changeLeader(1)} aria-label="Próxima liderança">Próximo</button></div></div>
        <div className="leadership-carousel" role="region" aria-label="Carrossel de liderança" tabIndex={0} onPointerDown={(event) => { dragStartX.current = event.clientX; }} onPointerUp={(event) => finishLeadershipDrag(event.clientX)} onPointerCancel={() => { dragStartX.current = null; }}>
          <div className="leadership-track" style={{ transform: `translateX(-${leadershipIndex * 80}%)` }}>
            {leadershipTeam.map((leader) => <article className="leadership-slide" key={leader.order}><img src={leader.portrait} alt={`Retrato de ${leader.name}, ${leader.position}`} /><div><span>{String(leader.order).padStart(2, "0")}</span><h3>{leader.name}</h3><p className="leadership-position">{leader.position}</p><p className="leadership-bio">{leader.short_bio}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="simple-about-presence" id="presenca" aria-labelledby="presence-title"><img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2400&h=1500&fit=crop&auto=format" alt="Arquitetura corporativa contemporânea" /><div><p className="editorial-eyebrow">04 / Presença</p><h2 id="presence-title">Presença que <em>aproxima.</em></h2><p>Uma rede de representantes e parceiros que leva a Tempus a diferentes regiões e aproxima a marca de profissionais, lojas e clientes.</p><a className="editorial-action editorial-action--light" href="https://wa.me/" target="_blank" rel="noreferrer">Encontrar representante <span>↗</span></a></div></section>

      <section className="simple-about-closing" aria-labelledby="closing-title"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2400&h=1500&fit=crop&auto=format" alt="Interior contemporâneo com mobiliário e luz natural" /><div><p className="editorial-eyebrow">Tempus</p><h2 id="closing-title">Continuamos em <em>movimento.</em></h2><p>Evoluindo a empresa, as relações e a maneira como construímos conforto para o futuro.</p><a className="editorial-action editorial-action--light" href="/categorias/reclinaveis">Conheça nossos produtos <span>↗</span></a></div></section>
      <SiteFooter />
    </main>
  );
}
