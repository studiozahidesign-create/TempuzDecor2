import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import TempusLogo from "./imports/Group9";
import SiteFooter from "./SiteFooter";
import essenceBanner from "./assets/banner-essence.png";

const BANNER_PLACEHOLDER = "/images/banner-placeholder.svg";
const HOME_HERO_IMAGE = "/images/home/banner-principal.png";

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
};

function Image({ fill, priority, style, onError, ...props }: ImageProps) {
  return (
    <img
      {...props}
      loading={priority ? "eager" : "lazy"}
      onError={(event) => {
        event.currentTarget.classList.add("image-pending");
        onError?.(event);
      }}
      style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style } : style}
    />
  );
}

const products = [
  { name: "Mille", collection: "Essence", image: "/images/products/uniform/5841-mille-3-2.png", features: "Reclínio automático · Base giratória" },
  { name: "Athenas", collection: "Living", image: "/images/products/uniform/7041-athenas.png", features: "Conforto ergonômico · Design compacto" },
  { name: "Amora", collection: "Lounge", image: "/images/products/uniform/7187-amora.png", features: "Chaise extensível · Dois lugares" },
];

const collections = [
  { number: "01", name: "Essence", description: "Conforto intuitivo para viver todos os dias.", image: "/images/products/uniform/5841-mille-3-2.png" },
  { number: "02", name: "Living", description: "Design leve para ambientes contemporâneos.", image: "/images/products/uniform/7400-ayla.png" },
  { number: "03", name: "Lounge", description: "Mais espaço para desacelerar.", image: "/images/products/uniform/7187-amora.png" },
  { number: "04", name: "Dreams", description: "Tecnologia dedicada ao descanso.", image: "/images/products/uniform/6629-perola.png" },
];


const newReleases = [
  { name: "Mille", slug: "mille-3-2", collection: "Fulltech", image: "/images/products/uniform/5841-mille-3-2.png", alt: "Poltrona Mille Tempus Decor" },
  { name: "Athenas", slug: "athenas", collection: "Poltronas Complementos", image: "/images/products/uniform/7041-athenas.png", alt: "Poltrona Athenas Tempus Decor" },
  { name: "Amora", slug: "amora", collection: "Poltronas Complementos", image: "/images/products/uniform/7187-amora.png", alt: "Poltrona Amora Tempus Decor" },
  { name: "Ayla", slug: "ayla", collection: "Poltronas Complementos", image: "/images/products/uniform/7400-ayla.png", alt: "Poltrona Ayla Tempus Decor" },
  { name: "Donna", slug: "donna", collection: "Poltronas Complementos", image: "/images/products/uniform/6639-donna.png", alt: "Poltrona Donna Tempus Decor" },
  { name: "Sila", slug: "sila", collection: "Poltronas Complementos", image: "/images/products/uniform/7398-sila.png", alt: "Poltrona Sila Tempus Decor" },
  { name: "Aurora", slug: "aurora", collection: "Cama", image: "/images/products/uniform/6379-aurora.png", alt: "Cama Aurora Tempus Decor" },
  { name: "Maya", slug: "maya-cor-granizo", collection: "Fulltech", image: "/images/products/uniform/7032-maya-cor-granizo.png", alt: "Poltrona Maya Tempus Decor" },
];


const collectionShowcase = [
  { number: "01", name: "Camas", description: "Presença, proporção e conforto para a noite.", href: "/categorias/reclinaveis", image: "/images/products/uniform/5777-cama-julia.png", alt: "Cama contemporânea em composição clara" },
  { number: "02", name: "Poltronas", description: "Conforto preciso para desacelerar todos os dias.", href: "/categorias/reclinaveis", image: "/images/products/uniform/5841-mille-3-2.png", alt: "Poltrona reclinável em fundo claro" },
  { number: "03", name: "Tempus Office", description: "Ergonomia e presença para o espaço de trabalho.", href: "/categorias/reclinaveis", image: "/images/products/uniform/7398-sila.png", alt: "Poltrona para espaço de trabalho" },
  { number: "04", name: "Poltronas Complementos", description: "Peças que completam a casa com personalidade.", href: "/categorias/reclinaveis", image: "/images/products/uniform/7041-athenas.png", alt: "Poltrona complementar em fundo claro" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [carouselPage, setCarouselPage] = useState(1);
  const releaseRailRef = useRef<HTMLDivElement>(null);
  const [collectionSlide, setCollectionSlide] = useState(0);
  const collectionRailRef = useRef<HTMLDivElement>(null);

  const scrollReleases = (direction: number) => {
    const rail = releaseRailRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * Math.max(rail.clientWidth * 0.66, 360), behavior: "smooth" });
  };

  const updateCarouselPage = () => {
    const rail = releaseRailRef.current;
    if (!rail) return;
    const maxScroll = Math.max(rail.scrollWidth - rail.clientWidth, 1);
    setCarouselPage(Math.min(8, Math.max(1, Math.round((rail.scrollLeft / maxScroll) * 7) + 1)));
  };

  const scrollCollections = (direction: number) => {
    const rail = collectionRailRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * .82, behavior: "smooth" });
  };

  const updateCollectionSlide = () => {
    const rail = collectionRailRef.current;
    if (!rail) return;
    const maxScroll = Math.max(rail.scrollWidth - rail.clientWidth, 1);
    setCollectionSlide(Math.min(collectionShowcase.length - 1, Math.max(0, Math.round((rail.scrollLeft / maxScroll) * (collectionShowcase.length - 1)))));
  };

  useEffect(() => {
    const updateHeader = () => setHeaderScrolled(window.scrollY > 12);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <main className="page-shell home-page">
      <header className={headerScrolled ? "minimal-header is-scrolled" : "minimal-header"}>
        <a className="brand brand-logo" href="#inicio" aria-label="Tempus, início">
          <TempusLogo />
        </a>
        <nav className={menuOpen ? "minimal-nav is-open" : "minimal-nav"} aria-label="Navegação principal">
          <a href="/categorias/reclinaveis" onClick={() => setMenuOpen(false)}>Produtos</a>
          <a href="/sobre" onClick={() => setMenuOpen(false)}>A Tempus</a>
          <a href="/conteudos" onClick={() => setMenuOpen(false)}>Inspirações</a>
          <a href="/blocos-3d" onClick={() => setMenuOpen(false)}>Blocos 3D</a>
          <a href="/representantes" onClick={() => setMenuOpen(false)}>Representantes</a><a href="/seja-representante" onClick={() => setMenuOpen(false)}>Seja representante</a><a href="/parceiros" onClick={() => setMenuOpen(false)}>Parceiros</a>
          <a href="/carreiras" onClick={() => setMenuOpen(false)}>Carreiras</a>
        </nav>
        <a className="quiet-cta" href="https://wa.me/" target="_blank" rel="noreferrer">Fale com a Tempus <span>↗</span></a>
        <button className="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </header>

      <section className="editorial-hero" id="inicio" aria-label="Tempus Decor">
        <img className="editorial-hero-image" src={HOME_HERO_IMAGE} alt="Poltrona reclinável Tempus em ambiente com vista para montanhas" />
        <div className="editorial-hero-shade" />
        <div className="editorial-hero-content">
          <p className="editorial-eyebrow">Tempus Decor / Brasil</p>
          <h1>Seu tempo pede<br /><em>conforto.</em></h1>
          <p className="editorial-hero-lead">Poltronas reclináveis Tempus para o seu espaço.</p>
          <a className="editorial-action editorial-action--light" href="#produtos">Ver poltronas <span>↗</span></a>
        </div>
        <p className="editorial-hero-caption">01 — Um tempo para relaxar</p>
      </section>

      <section className="brand-product-showcase" aria-labelledby="statement-title">
        <div className="brand-product-story">
          <p className="editorial-number">A Tempus</p>
          <h2 id="statement-title">Poltronas reclináveis<br />para o seu <em>tempo.</em></h2>
          <p>Conheça os modelos, compare os recursos e explore os acabamentos Tempus.</p>
          <a className="editorial-action" href="/sobre">Conheça a Tempus <span>↗</span></a>
        </div>
        <div className="brand-product-carousel">
          <div className="brand-product-carousel-top"><p className="editorial-eyebrow editorial-eyebrow--dark">Modelos Tempus</p><div className="carousel-controls" aria-label="Navegação dos lançamentos"><span>{String(carouselPage).padStart(2, "0")} / 08</span><button type="button" onClick={() => scrollReleases(-1)} aria-label="Produto anterior">←</button><button type="button" onClick={() => scrollReleases(1)} aria-label="Próximo produto">→</button></div></div>
          <div className="release-showcase-rail" ref={releaseRailRef} onScroll={updateCarouselPage}>
            {newReleases.map((product) => <a className="release-showcase-slide" href={`/produtos/${product.slug}`} key={product.slug}><div className="release-showcase-image"><img src={product.image} alt={product.alt} /></div><div className="release-showcase-caption"><p>{product.collection}</p><h3>{product.name}</h3><span>Ver modelo →</span></div></a>)}
          </div>
        </div>
      </section>

      <section className="editorial-feature" id="colecoes" aria-labelledby="feature-title">
        <div className="editorial-feature-image">
          <img src={essenceBanner} alt="Poltrona reclinável em ambiente acolhedor" />
        </div>
        <div className="editorial-feature-copy">
          <p className="editorial-eyebrow editorial-eyebrow--dark">Tempus Signature</p>
          <h2 id="feature-title">Escolha os<br /><em>acabamentos.</em></h2>
          <p>Mais de 65 opções de tecidos e mais de 15 opções de couro para conhecer.</p>
          <a className="editorial-action" href="#produtos">Conhecer acabamentos <span>↗</span></a>
        </div>
      </section>

      <section className="collection-showcase" id="colecoes" aria-labelledby="collection-showcase-title">
        <div className="collection-showcase-intro">
          <p className="editorial-eyebrow editorial-eyebrow--dark">Produtos Tempus</p>
          <h2 id="collection-showcase-title">Encontre o modelo<br /><em>para o seu espaço.</em></h2>
          <p>Explore o catálogo Tempus e veja os detalhes de cada modelo.</p>
          <div className="collection-showcase-controls"><span>{String(collectionSlide + 1).padStart(2, "0")} / {String(collectionShowcase.length).padStart(2, "0")}</span><button type="button" onClick={() => scrollCollections(-1)} aria-label="Categoria anterior">←</button><button type="button" onClick={() => scrollCollections(1)} aria-label="Próxima categoria">→</button></div>
        </div>
        <div className="collection-showcase-rail" ref={collectionRailRef} onScroll={updateCollectionSlide}>
          {collectionShowcase.map((collection) => <a className="collection-showcase-slide" href={collection.href} key={collection.name}><div className="collection-showcase-image"><img src={collection.image} alt={collection.alt} /></div><div className="collection-showcase-caption"><p>{collection.number}</p><h3>{collection.name}</h3><span>{collection.description}</span><b>Explorar categoria →</b></div></a>)}
        </div>
      </section>

      <section className="editorial-products" id="produtos" aria-labelledby="products-title">
        <header className="editorial-section-head">
          <p className="editorial-eyebrow editorial-eyebrow--dark">Poltronas Tempus</p>
          <h2 id="products-title">Poltronas<br /><em>reclináveis.</em></h2>
          <p>Conheça os modelos Tempus e confira os recursos de cada um.</p>
        </header>
        <div className="editorial-product-grid">
          <a className="catalogue-product catalogue-product--tall" href="#assistencia">
            <div className="catalogue-product-image"><img src="/images/products/uniform/3468-san-martin-2.png" alt="Poltrona San Martin em fundo branco" /></div>
            <div className="catalogue-product-meta"><span>01</span><h3>San Martin</h3><p>Poltronas</p><b>↗</b></div>
          </a>
          <a className="catalogue-product" href="#assistencia">
            <div className="catalogue-product-image"><img src="/images/products/uniform/3476-zara-2.png" alt="Poltrona Zara em fundo branco" /></div>
            <div className="catalogue-product-meta"><span>02</span><h3>Zara</h3><p>Poltronas</p><b>↗</b></div>
          </a>
          <a className="catalogue-product catalogue-product--wide" href="#assistencia">
            <div className="catalogue-product-image"><img src="/images/products/uniform/7032-maya-cor-granizo.png" alt="Poltrona Maya em fundo branco" /></div>
            <div className="catalogue-product-meta"><span>03</span><h3>Maya</h3><p>Poltronas</p><b>↗</b></div>
          </a>
        </div>
      </section>

      <section className="technology-section" aria-labelledby="technology-title">
        <div className="technology-visual"><img src={BANNER_PLACEHOLDER} alt="Espaço reservado para banner" /></div>
        <div className="technology-content">
          <p className="editorial-eyebrow">Tecnologia Tempus</p>
          <h2 id="technology-title">Quatro tecnologias<br /><em>Tempus.</em></h2>
          <p>Unitech, Duotech, Multitech e Fulltech. Consulte os recursos informados para cada modelo.</p>
          <div className="technology-points">
            <article><span>01</span><h3>Unitech</h3><p>Consulte os recursos informados para cada modelo.</p></article>
            <article><span>02</span><h3>Duotech</h3><p>Consulte os recursos informados para cada modelo.</p></article>
            <article><span>03</span><h3>Multitech</h3><p>Consulte os recursos informados para cada modelo.</p></article>
            <article><span>04</span><h3>Fulltech</h3><p>Consulte os recursos informados para cada modelo.</p></article>
          </div>
          <a className="editorial-action editorial-action--light" href="#profissionais">Conhecer as tecnologias <span>↗</span></a>
        </div>
      </section>

      <section className="editorial-material" aria-labelledby="material-title">
        <div className="editorial-material-copy">
          <p className="editorial-eyebrow editorial-eyebrow--dark">Tempus Signature</p>
          <h2 id="material-title">Acabamentos para<br /><em>escolher.</em></h2>
          <p>São mais de 65 opções de tecidos e mais de 15 opções de couro.</p>
          <a className="editorial-action" href="#profissionais">Ver acabamentos <span>↗</span></a>
        </div>
        <div className="editorial-material-image"><img src="/images/products/uniform/6371-sophi-taupe.png" alt="Textura de couro marrom matelassê" /></div>
      </section>

      <section className="bedroom-section" aria-labelledby="bedroom-title">
        <div className="bedroom-copy">
          <p className="editorial-eyebrow editorial-eyebrow--dark">Poltronas Tempus</p>
          <h2 id="bedroom-title">Um espaço para<br /><em>relaxar.</em></h2>
          <p>Conheça as poltronas reclináveis Tempus e veja os detalhes de cada modelo.</p>
          <a className="editorial-action" href="#produtos">Ver poltronas <span>↗</span></a>
        </div>
        <div className="bedroom-image"><img src={BANNER_PLACEHOLDER} alt="Espaço reservado para banner" /></div>
      </section>

      <section className="audience-section" aria-labelledby="audience-title">
        <header className="editorial-section-head audience-head"><p className="editorial-eyebrow editorial-eyebrow--dark">Explore a Tempus</p><h2 id="audience-title">Conheça modelos.<br /><em>Compare recursos.</em></h2><p>Veja as opções de poltronas, tecnologias e acabamentos Tempus.</p></header>
        <div className="audience-grid">
          {[
            ["01", "Poltronas", "Conheça os modelos reclináveis Tempus."],
            ["02", "Tecnologias", "Veja Unitech, Duotech, Multitech e Fulltech."],
            ["03", "Acabamentos", "Explore mais de 65 opções de tecidos e mais de 15 de couro."],
            ["04", "Representantes", "Consulte os contatos disponíveis na sua região."],
          ].map(([number, title, description]) => <a href="#profissionais" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p><b>↗</b></a>)}
        </div>
      </section>

      <section className="ecosystem-section" id="profissionais" aria-labelledby="ecosystem-title">
        <div className="ecosystem-intro">
          <p className="editorial-number">Atendimento Tempus</p>
          <h2 id="ecosystem-title">Encontre um<br /><em>representante.</em></h2>
          <p>Consulte os contatos de representantes e encontre atendimento para a sua região.</p>
          <a className="editorial-action" href="#representantes">Encontrar representante <span>↗</span></a>
        </div>
        <div className="ecosystem-panels" id="representantes">
          <a className="ecosystem-panel ecosystem-panel--representatives" href="#representantes">
            <img src="/images/products/uniform/7398-sila.png" alt="Ambiente de showroom de mobiliário contemporâneo" />
            <div><span>01</span><h3>Representantes nacionais</h3><p>Consulte os contatos disponíveis para a sua região.</p><b>Encontrar um representante <i>↗</i></b></div>
          </a>
          <a className="ecosystem-panel ecosystem-panel--professionals" href="#profissionais">
            <img src="/images/products/uniform/7396-samia.png" alt="Profissional organizando amostras e materiais de projeto" />
            <div><span>02</span><h3>Arquitetos & designers</h3><p>Consulte os arquivos e as informações disponíveis para o seu projeto.</p><b>Recursos profissionais <i>↗</i></b></div>
          </a>
          <a className="ecosystem-panel ecosystem-panel--technical" href="#assistencia">
            <img src="/images/products/uniform/7346-ada-2.png" alt="Detalhe de acabamento e marcenaria de mobiliário" />
            <div><span>03</span><h3>Suporte técnico</h3><p>Encontre informações sobre uso, cuidados e garantia.</p><b>Informações técnicas <i>↗</i></b></div>
          </a>
        </div>
      </section>

      <section className="company-section" aria-labelledby="company-title">
        <div className="company-image"><img src={BANNER_PLACEHOLDER} alt="Espaço reservado para banner" /></div>
        <div className="company-copy"><p className="editorial-eyebrow editorial-eyebrow--dark">Tempus / Poltronas reclináveis</p><h2 id="company-title">Conforto para<br /><em>o seu espaço.</em></h2><p>Explore os modelos Tempus, compare recursos e conheça as opções de acabamento.</p><div className="company-values"><span><b>01</b>Unitech</span><span><b>02</b>Duotech</span><span><b>03</b>Multitech</span><span><b>04</b>Fulltech</span></div><a className="editorial-action" href="#inicio">Conhecer a Tempus <span>↗</span></a></div>
      </section>

      <section className="editorial-support" id="assistencia">
        <img src={BANNER_PLACEHOLDER} alt="Espaço reservado para banner" />
        <div>
          <p className="editorial-eyebrow">Tempus / Atendimento</p>
          <h2>Precisa de<br /><em>orientação?</em></h2>
          <a className="editorial-action editorial-action--light" href="https://wa.me/" target="_blank" rel="noreferrer">Falar com a Tempus <span>↗</span></a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
