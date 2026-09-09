import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import TempusLogo from "./imports/Group9";
import SiteFooter from "./SiteFooter";
import heroBanner from "./imports/ChatGPT_Image_9_09_2026__09_05_43.png";
import { productCategories, products as cmsProducts } from "./cms/products";

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

const newReleases = cmsProducts.slice(0, 8).map((product) => ({ ...product, collection: product.category, alt: `${product.name} — ${product.category}` }));


const collectionShowcase = productCategories.slice(0, 6).map((category, index) => {
  const sample = cmsProducts.find((product) => product.categorySlug === category.slug);
  return { number: String(index + 1).padStart(2, "0"), name: category.name, description: `${category.count} produtos no catálogo atual.`, href: "/categorias/reclinaveis", image: sample?.image ?? cmsProducts[0].image, alt: `Coleção ${category.name}` };
});

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
    setCollectionSlide(Math.min(5, Math.max(0, Math.round((rail.scrollLeft / maxScroll) * 5))));
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
          <a href="/sobre" onClick={() => setMenuOpen(false)}>Sobre nós</a>
          <a href="/conteudos" onClick={() => setMenuOpen(false)}>Conteúdos</a>
          <a href="/blocos-3d" onClick={() => setMenuOpen(false)}>Blocos 3D</a>
          <a href="/representantes" onClick={() => setMenuOpen(false)}>Representantes</a><a href="/seja-representante" onClick={() => setMenuOpen(false)}>Seja representante</a><a href="/parceiros" onClick={() => setMenuOpen(false)}>Parceiros</a>
          <a href="/carreiras" onClick={() => setMenuOpen(false)}>Carreiras</a>
        </nav>
        <a className="quiet-cta" href="https://wa.me/" target="_blank" rel="noreferrer">Fale conosco <span>↗</span></a>
        <button className="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </header>

      <section className="editorial-hero" id="inicio" aria-label="Tempus Decor">
        <img className="editorial-hero-image" src={heroBanner} alt="Poltrona reclinável Tempus em sala contemporânea com vista para as montanhas" />
        <div className="editorial-hero-shade" />
        <div className="editorial-hero-content">
          <p className="editorial-eyebrow">Tempus Decor / Brasil</p>
          <h1>O tempo<br />em <em>conforto.</em></h1>
          <p className="editorial-hero-lead">Poltronas concebidas para tornar a pausa mais presente.</p>
          <a className="editorial-action editorial-action--light" href="#produtos">Conhecer a coleção <span>↗</span></a>
        </div>
        <p className="editorial-hero-caption">01 — Espaços que pedem permanência</p>
      </section>

      <section className="brand-product-showcase" aria-labelledby="statement-title">
        <div className="brand-product-story">
          <p className="editorial-number">01 / A maneira Tempus</p>
          <h2 id="statement-title">Desenhamos o<br /><em>repouso</em> como arquitetura.</h2>
          <p>Proporção, matéria e movimento se encontram em peças que acolhem sem interromper a paisagem da casa.</p>
          <a className="editorial-action" href="/sobre">Nossa história <span>↗</span></a>
        </div>
        <div className="brand-product-carousel">
          <div className="brand-product-carousel-top"><p className="editorial-eyebrow editorial-eyebrow--dark">Novidades Tempus</p><div className="carousel-controls" aria-label="Navegação dos lançamentos"><span>{String(carouselPage).padStart(2, "0")} / 08</span><button type="button" onClick={() => scrollReleases(-1)} aria-label="Produto anterior">←</button><button type="button" onClick={() => scrollReleases(1)} aria-label="Próximo produto">→</button></div></div>
          <div className="release-showcase-rail" ref={releaseRailRef} onScroll={updateCarouselPage}>
            {newReleases.map((product) => <a className="release-showcase-slide" href={`/produtos/${product.slug}`} key={product.id}><div className="release-showcase-image"><img src={product.image} alt={product.alt} /></div><div className="release-showcase-caption"><p>{product.collection}</p><h3>{product.name}</h3><span>Explorar produto →</span></div></a>)}
          </div>
        </div>
      </section>

      <section className="editorial-feature" id="colecoes" aria-labelledby="feature-title">
        <div className="editorial-feature-image">
          <img src="https://images.unsplash.com/photo-1750639258774-9a714379a093?w=1600&h=1900&fit=crop&auto=format" alt="Interior de estar elegante em tons neutros" />
        </div>
        <div className="editorial-feature-copy">
          <p className="editorial-eyebrow editorial-eyebrow--dark">Essence / 01</p>
          <h2 id="feature-title">Menos ruído.<br />Mais <em>presença.</em></h2>
          <p>Linhas calmas, ergonomia precisa e acabamentos que respeitam o tempo de cada ambiente.</p>
          <a className="editorial-action" href="#produtos">Ver coleção Essence <span>↗</span></a>
        </div>
      </section>

      <section className="collection-showcase" id="colecoes" aria-labelledby="collection-showcase-title">
        <div className="collection-showcase-intro">
          <p className="editorial-eyebrow editorial-eyebrow--dark">Coleções Tempus</p>
          <h2 id="collection-showcase-title">Conforto para cada<br /><em>ritmo de viver.</em></h2>
          <p>Uma família de peças pensada para acompanhar diferentes maneiras de habitar a casa.</p>
          <div className="collection-showcase-controls"><span>{String(collectionSlide + 1).padStart(2, "0")} / 06</span><button type="button" onClick={() => scrollCollections(-1)} aria-label="Coleção anterior">←</button><button type="button" onClick={() => scrollCollections(1)} aria-label="Próxima coleção">→</button></div>
        </div>
        <div className="collection-showcase-rail" ref={collectionRailRef} onScroll={updateCollectionSlide}>
          {collectionShowcase.map((collection) => <a className="collection-showcase-slide" href={collection.href} key={collection.name}><div className="collection-showcase-image"><img src={collection.image} alt={collection.alt} /></div><div className="collection-showcase-caption"><p>{collection.number}</p><h3>{collection.name}</h3><span>{collection.description}</span><b>Explorar coleção →</b></div></a>)}
        </div>
      </section>

      <section className="editorial-products" id="produtos" aria-labelledby="products-title">
        <header className="editorial-section-head">
          <p className="editorial-eyebrow editorial-eyebrow--dark">Seleção / 2026</p>
          <h2 id="products-title">Formas para<br /><em>permanecer.</em></h2>
          <p>Uma edição essencial de poltronas para viver, receber e desacelerar.</p>
        </header>
        <div className="editorial-product-grid">
          <a className="catalogue-product catalogue-product--tall" href="#assistencia">
            <div className="catalogue-product-image"><img src="https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=1100&h=1200&fit=crop&auto=format" alt="Poltrona de madeira clara em fundo branco" /></div>
            <div className="catalogue-product-meta"><span>01</span><h3>Mille</h3><p>Essence</p><b>↗</b></div>
          </a>
          <a className="catalogue-product" href="#assistencia">
            <div className="catalogue-product-image"><img src="https://images.unsplash.com/photo-1612204186347-fef88cc864db?w=1100&h=900&fit=crop&auto=format" alt="Poltrona de couro escuro com estrutura metálica" /></div>
            <div className="catalogue-product-meta"><span>02</span><h3>Athenas</h3><p>Living</p><b>↗</b></div>
          </a>
          <a className="catalogue-product catalogue-product--wide" href="#assistencia">
            <div className="catalogue-product-image"><img src="https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=1200&h=760&fit=crop&auto=format" alt="Poltrona estofada em tom areia sobre fundo branco" /></div>
            <div className="catalogue-product-meta"><span>03</span><h3>Amora</h3><p>Lounge</p><b>↗</b></div>
          </a>
        </div>
      </section>

      <section className="technology-section" aria-labelledby="technology-title">
        <div className="technology-visual"><img src="https://images.unsplash.com/photo-1599933345241-2d01fe8d06ec?w=1600&h=1200&fit=crop&auto=format" alt="Detalhe de estofado e tecido aplicado em uma poltrona" /></div>
        <div className="technology-content">
          <p className="editorial-eyebrow">Tecnologia Tempus</p>
          <h2 id="technology-title">Conforto é uma<br /><em>engenharia silenciosa.</em></h2>
          <p>Por trás de cada gesto simples, há escolhas pensadas para durar — da postura ao mecanismo, do toque ao acabamento.</p>
          <div className="technology-points">
            <article><span>01</span><h3>Ergonomia</h3><p>Suporte que acompanha o corpo em todas as posições.</p></article>
            <article><span>02</span><h3>Movimento</h3><p>Mecanismos de reclínio calibrados para um gesto leve.</p></article>
            <article><span>03</span><h3>Precisão</h3><p>Estruturas e materiais escolhidos para o uso contínuo.</p></article>
          </div>
          <a className="editorial-action editorial-action--light" href="#profissionais">Conhecer a tecnologia <span>↗</span></a>
        </div>
      </section>

      <section className="editorial-material" aria-labelledby="material-title">
        <div className="editorial-material-copy">
          <p className="editorial-eyebrow editorial-eyebrow--dark">Matéria / Movimento</p>
          <h2 id="material-title">O detalhe<br />também <em>acolhe.</em></h2>
          <p>Couros, tecidos e mecanismos escolhidos para revelar conforto com precisão silenciosa.</p>
          <a className="editorial-action" href="#profissionais">Conhecer materiais <span>↗</span></a>
        </div>
        <div className="editorial-material-image"><img src="https://images.unsplash.com/photo-1564842505181-8862a3b9b173?w=1600&h=1300&fit=crop&auto=format" alt="Textura de couro marrom matelassê" /></div>
      </section>

      <section className="bedroom-section" aria-labelledby="bedroom-title">
        <div className="bedroom-copy">
          <p className="editorial-eyebrow editorial-eyebrow--dark">Dormitórios / Tempus</p>
          <h2 id="bedroom-title">A noite também<br />merece <em>design.</em></h2>
          <p>Camas e colchões criados para transformar o descanso em parte essencial da arquitetura da casa.</p>
          <a className="editorial-action" href="#produtos">Explorar dormitórios <span>↗</span></a>
        </div>
        <div className="bedroom-image"><img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1800&h=1300&fit=crop&auto=format" alt="Quarto contemporâneo com cama e roupas de cama em tons neutros" /></div>
      </section>

      <section className="audience-section" aria-labelledby="audience-title">
        <header className="editorial-section-head audience-head"><p className="editorial-eyebrow editorial-eyebrow--dark">Relações Tempus</p><h2 id="audience-title">Feita para viver.<br /><em>Preparada para projetar.</em></h2><p>Uma rede de cuidado que acompanha pessoas, projetos e negócios.</p></header>
        <div className="audience-grid">
          {[
            ["01", "Para sua casa", "Escolhas orientadas por conforto, proporção e presença."],
            ["02", "Arquitetos e designers", "Blocos 3D, especificações e biblioteca de materiais."],
            ["03", "Lojistas", "Linha curada, treinamento e apoio comercial próximo."],
            ["04", "Representantes", "Ferramentas e relacionamento para expandir bons encontros."],
          ].map(([number, title, description]) => <a href="#profissionais" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p><b>↗</b></a>)}
        </div>
      </section>

      <section className="ecosystem-section" id="profissionais" aria-labelledby="ecosystem-title">
        <div className="ecosystem-intro">
          <p className="editorial-number">02 / Ecossistema profissional</p>
          <h2 id="ecosystem-title">Presença que<br /><em>aproxima projetos.</em></h2>
          <p>Uma rede nacional que conecta pessoas, repertório técnico e atendimento próximo para transformar cada especificação em uma experiência Tempus.</p>
          <a className="editorial-action" href="#representantes">Conhecer nossa rede <span>↗</span></a>
        </div>
        <div className="ecosystem-panels" id="representantes">
          <a className="ecosystem-panel ecosystem-panel--representatives" href="#representantes">
            <img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1400&h=1500&fit=crop&auto=format" alt="Ambiente de showroom de mobiliário contemporâneo" />
            <div><span>01</span><h3>Representantes nacionais</h3><p>Encontre quem conhece a Tempus e acompanha a sua escolha de perto.</p><b>Encontrar um representante <i>↗</i></b></div>
          </a>
          <a className="ecosystem-panel ecosystem-panel--professionals" href="#profissionais">
            <img src="https://images.unsplash.com/photo-1542621334-a254cf47733d?w=1400&h=1500&fit=crop&auto=format" alt="Profissional organizando amostras e materiais de projeto" />
            <div><span>02</span><h3>Arquitetos & designers</h3><p>Blocos 3D, materiais e informações para especificar com liberdade.</p><b>Recursos profissionais <i>↗</i></b></div>
          </a>
          <a className="ecosystem-panel ecosystem-panel--technical" href="#assistencia">
            <img src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1400&h=1500&fit=crop&auto=format" alt="Detalhe de acabamento e marcenaria de mobiliário" />
            <div><span>03</span><h3>Suporte técnico</h3><p>Informação precisa para cada detalhe, do projeto ao uso contínuo.</p><b>Informações técnicas <i>↗</i></b></div>
          </a>
        </div>
      </section>

      <section className="company-section" aria-labelledby="company-title">
        <div className="company-image"><img src="https://images.unsplash.com/photo-1444069788560-6ae1deb4c0d4?w=1600&h=1150&fit=crop&auto=format" alt="Artesão trabalhando a madeira em uma oficina" /></div>
        <div className="company-copy"><p className="editorial-eyebrow editorial-eyebrow--dark">Tempus / Desde o começo</p><h2 id="company-title">Qualidade é aquilo<br />que fica <em>depois do tempo.</em></h2><p>Fabricamos com atenção ao detalhe, inovação responsável e respeito por materiais feitos para acompanhar histórias.</p><div className="company-values"><span><b>01</b>Design com propósito</span><span><b>02</b>Manufatura precisa</span><span><b>03</b>Materiais duráveis</span></div><a className="editorial-action" href="#inicio">Conhecer a Tempus <span>↗</span></a></div>
      </section>

      <section className="editorial-support" id="assistencia">
        <img src="https://images.unsplash.com/photo-1760072513367-55182245e76c?w=1800&h=1050&fit=crop&auto=format" alt="Sala contemporânea com sofá e estante" />
        <div>
          <p className="editorial-eyebrow">Tempus / Atendimento</p>
          <h2>Cuidar faz parte<br />do <em>conforto.</em></h2>
          <a className="editorial-action editorial-action--light" href="https://wa.me/" target="_blank" rel="noreferrer">Falar com a Tempus <span>↗</span></a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
