import { useState, type ImgHTMLAttributes } from "react";

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
};

function Image({ fill, priority, style, ...props }: ImageProps) {
  return (
    <img
      {...props}
      loading={priority ? "eager" : "lazy"}
      style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style } : style}
    />
  );
}

const products = [
  { name: "Mille", collection: "Essence", image: "/images/mille.jpg", features: "Reclínio automático · Base giratória" },
  { name: "Athenas", collection: "Living", image: "/images/athenas.png", features: "Conforto ergonômico · Design compacto" },
  { name: "Amora", collection: "Lounge", image: "/images/amora.png", features: "Chaise extensível · Dois lugares" },
];

const collections = [
  { number: "01", name: "Essence", description: "Conforto intuitivo para viver todos os dias.", image: "/images/mille.jpg" },
  { number: "02", name: "Living", description: "Design leve para ambientes contemporâneos.", image: "/images/ayla.png" },
  { number: "03", name: "Lounge", description: "Mais espaço para desacelerar.", image: "/images/amora.png" },
  { number: "04", name: "Dreams", description: "Tecnologia dedicada ao descanso.", image: "/images/perola.png" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="page-shell">
      <header className="minimal-header">
        <a className="brand brand-logo" href="#inicio" aria-label="Tempus, início">
          <Image src="/images/tempus-logo.png" alt="Tempus" width={243} height={45} priority />
        </a>
        <nav className={menuOpen ? "minimal-nav is-open" : "minimal-nav"} aria-label="Navegação principal">
          <a href="#produtos" onClick={() => setMenuOpen(false)}>Produtos</a>
          <a href="#colecoes" onClick={() => setMenuOpen(false)}>Coleções</a>
          <a href="#profissionais" onClick={() => setMenuOpen(false)}>Blocos 3D</a>
          <a href="#profissionais" onClick={() => setMenuOpen(false)}>Revendedores</a>
          <a href="#assistencia" onClick={() => setMenuOpen(false)}>Assistência</a>
        </nav>
        <a className="quiet-cta" href="https://wa.me/" target="_blank" rel="noreferrer">Fale conosco <span>↗</span></a>
        <button className="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </header>

      <section className="quiet-hero section-full" id="inicio">
        <div className="hero-copy">
          <h1>Conforto,<br /><em>bem resolvido.</em></h1>
          <p>Design que acolhe. Tecnologia que desaparece.</p>
          <a className="hero-primary-action" href="#produtos">Explorar produtos <span>↗</span></a>
        </div>
        <div
          className="hero-stage"
          aria-label="Composição espacial com produtos Tempus"
          onPointerMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            event.currentTarget.style.setProperty("--near-x", `${x * 26}px`);
            event.currentTarget.style.setProperty("--near-y", `${y * 18}px`);
            event.currentTarget.style.setProperty("--far-x", `${x * -24}px`);
            event.currentTarget.style.setProperty("--far-y", `${y * -16}px`);
            event.currentTarget.style.setProperty("--tilt-x", `${x * 3}deg`);
            event.currentTarget.style.setProperty("--tilt-y", `${y * -2}deg`);
          }}
          onPointerLeave={(event) => {
            ["--near-x", "--near-y", "--far-x", "--far-y", "--tilt-x", "--tilt-y"].forEach((property) =>
              event.currentTarget.style.removeProperty(property)
            );
          }}
        >
          <div className="hero-depth-shape" aria-hidden="true" />
          <div className="hero-secondary-product">
            <Image src="/images/athenas.png" alt="Poltrona Athenas" fill sizes="18vw" />
            <span>Athenas / Living</span>
          </div>
          <div className="hero-main-product">
            <Image src="/images/mille.jpg" alt="Poltrona Mille Tempus" fill priority sizes="42vw" />
            <span>Mille / Essence</span>
          </div>
          <div className="hero-detail-card">
            <div><Image src="/images/tech.jpg" alt="Detalhe do controle integrado da poltrona" fill sizes="18vw" /></div>
            <p><span>Detalhe 01</span> Controle integrado</p>
          </div>
          <div className="hero-lifestyle-card">
            <Image src="/images/hero.webp" alt="Interior contemporâneo Tempus" fill sizes="18vw" />
            <span>Casa / tempo / presença</span>
          </div>
          <div className="hero-wide-product">
            <Image src="/images/amora.png" alt="Poltrona Amora Tempus" fill sizes="21vw" />
            <span>Amora / Lounge</span>
          </div>
        </div>
      </section>

      <section className="brand-statement section-full">
        <div className="statement-copy">
          <h2>Conforto não é excesso.<br />É tudo estar no lugar certo.</h2>
          <p>A Tempus cria móveis que acolhem o corpo, simplificam a rotina e permanecem relevantes no espaço.</p>
          <a href="#">Conheça nossa história ↗</a>
        </div>
        <div className="statement-detail"><Image src="/images/tech.jpg" alt="Detalhe de acabamento Tempus" fill sizes="30vw" /><span>Detalhe / matéria e precisão</span></div>
      </section>

      <section className="featured section-full" id="produtos">
        <div className="editorial-head">
          <h2>Escolhas para o seu tempo.</h2>
          <a href="#">Todos os produtos ↗</a>
        </div>
        <div className="product-editorial-grid">
          {products.map((product, index) => (
            <article className={`product-cell product-cell-${index + 1}`} key={product.name}>
              <div className="product-picture"><Image src={product.image} alt={`Poltrona ${product.name}`} fill sizes="(max-width: 720px) 100vw, 50vw" /></div>
              <div className="product-caption">
                <span>0{index + 1} / {product.collection}</span>
                <h3>{product.name}</h3>
                <p>{product.features}</p>
                <a href="#" aria-label={`Ver produto ${product.name}`}>↗</a>
              </div>
            </article>
          ))}
          <div className="material-cell"><Image src="/images/tech.jpg" alt="Detalhe técnico de produto" fill sizes="25vw" /><span>Precisão silenciosa</span></div>
        </div>
      </section>

      <section className="collections-section section-full" id="colecoes">
        <div className="collections-title"><h2>Quatro maneiras<br />de sentir conforto.</h2></div>
        <div className="collection-grid">
          {collections.map((collection) => (
            <a href="#" className={`collection-cell collection-${collection.number}`} key={collection.name}>
              <div className="collection-image">
                <Image src={collection.image} alt={`Coleção ${collection.name}`} fill sizes="(max-width: 720px) 100vw, 35vw" />
              </div>
              <div className="collection-meta"><span>{collection.number}</span><h3>{collection.name}</h3><p>{collection.description}</p><strong>↗</strong></div>
            </a>
          ))}
        </div>
      </section>

      <section className="professionals-section section-full" id="profissionais">
        <div className="technical-visual"><Image src="/images/maya.png" alt="Produto Tempus para especificação profissional" fill sizes="48vw" /><span>Produto / vista técnica</span></div>
        <div className="technical-copy">
          <h2>Precisão para projetar.<br />Estrutura para vender.</h2>
          <p>Recursos técnicos e relacionamento comercial para quem especifica e representa a Tempus.</p>
          <a href="#"><small>01 / Arquitetos e designers</small><strong>Blocos 3D e dados de produto</strong><b>↗</b></a>
          <a href="#"><small>02 / Lojistas e representantes</small><strong>Linha curada e apoio comercial</strong><b>↗</b></a>
        </div>
      </section>

      <section className="assistance-section section-full" id="assistencia">
        <div className="assistance-intro"><h2>Cuidar também<br />faz parte.</h2><p>Orientações para usar, conservar e aproveitar melhor o seu produto Tempus.</p></div>
        <nav aria-label="Atalhos de assistência">
          {["Manuais", "Vídeos técnicos", "Garantia", "Suporte no WhatsApp"].map((item, index) => <a href="#" key={item}><span>0{index + 1}</span>{item}<strong>↗</strong></a>)}
        </nav>
        <div className="assistance-image"><Image src="/images/ayla.png" alt="Poltrona Ayla Tempus" fill sizes="32vw" /></div>
      </section>

      <section className="closing-section section-full section-closing">
        <h2>Encontre o conforto<br />que combina com você.</h2>
        <div className="closing-links">
          <a href="#produtos">Explorar produtos <span>↗</span></a>
          <a href="https://wa.me/" target="_blank" rel="noreferrer">Falar no WhatsApp <span>↗</span></a>
          <a href="#profissionais">Acessar Blocos 3D <span>↗</span></a>
          <a href="#profissionais">Encontrar representante <span>↗</span></a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-intro">
          <a className="brand footer-brand brand-logo footer-logo" href="#inicio" aria-label="Tempus, início">
            <Image src="/images/tempus-logo.png" alt="Tempus" width={243} height={45} />
          </a>
          <p>Poltronas reclináveis que unem conforto, tecnologia e design para ambientes contemporâneos.</p>
          <div className="footer-contact-actions">
            <a href="https://wa.me/" target="_blank" rel="noreferrer">WhatsApp comercial <span>↗</span></a>
            <a href="#assistencia">Solicitar assistência <span>↗</span></a>
          </div>
        </div>

        <div className="footer-directory">
          <div className="footer-group">
            <h3>Navegação</h3>
            <nav>
              <a href="#inicio">Home</a><a href="#">Sobre Nós</a><a href="#produtos">Produtos</a>
              <a href="#colecoes">Coleções</a><a href="#profissionais">Revendedores</a>
              <a href="#assistencia">Assistência</a><a href="#profissionais">Blocos 3D</a>
              <a href="#">Blog / Vídeos</a><a href="#">Contato</a>
            </nav>
          </div>
          <div className="footer-group">
            <h3>Produtos</h3>
            <nav>
              <a href="#produtos">Todos os produtos</a><a href="#">Poltronas reclináveis</a>
              <a href="#">Poltronas automáticas</a><a href="#">Poltronas com lifting</a>
              <a href="#">Poltronas com massagem</a><a href="#">Poltronas giratórias</a>
              <a href="#profissionais">Produtos com Bloco 3D</a><a href="#">Lançamentos</a>
            </nav>
          </div>
          <div className="footer-group">
            <h3>Coleções</h3>
            <nav>
              <a href="#colecoes">Todas as coleções</a><a href="#">Essence</a>
              <a href="#">Living</a><a href="#">Lounge</a><a href="#">Dreams</a>
            </nav>
          </div>
          <div className="footer-group">
            <h3>Profissionais</h3>
            <nav>
              <a href="#profissionais">Blocos 3D</a><a href="#profissionais">Para arquitetos e designers</a>
              <a href="#">Biblioteca 3D</a><a href="#">Especificações técnicas</a>
              <a href="#">Atendimento profissional</a>
            </nav>
          </div>
          <div className="footer-group">
            <h3>Comercial</h3>
            <nav>
              <a href="#profissionais">Seja um revendedor</a><a href="#profissionais">Encontre um representante</a>
              <a href="#">Atendimento comercial</a><a href="#">Rede de representantes</a>
              <a href="#">Solicitar contato comercial</a>
            </nav>
          </div>
          <div className="footer-group">
            <h3>Assistência</h3>
            <nav>
              <a href="#assistencia">Assistência técnica</a><a href="#">Manuais</a>
              <a href="#">Vídeos técnicos</a><a href="#">Garantia</a>
              <a href="#">Cuidados com o produto</a><a href="#">Falar com suporte</a>
            </nav>
          </div>
        </div>

        <div className="footer-contact">
          <div>
            <h3>Contato</h3>
            <p>WhatsApp comercial <span>Contato a inserir</span></p>
            <p>WhatsApp assistência <span>Contato a inserir</span></p>
            <p>E-mail comercial <span>E-mail a inserir</span></p>
            <p>E-mail de suporte <span>E-mail a inserir</span></p>
          </div>
          <div>
            <h3>Atendimento</h3>
            <p>Fábrica / showroom <span>Endereço a inserir</span></p>
            <p>Horário comercial <span>Horário a inserir</span></p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Tempus Decor</p>
          <nav aria-label="Links legais">
            <a href="#">Política de Privacidade</a><a href="#">Termos de Uso</a>
            <a href="#">Política de Garantia</a><a href="#">Política de Cookies</a>
            <a href="#">LGPD</a><a href="#">Mapa do site</a>
          </nav>
          <p className="footer-credit">Design para viver melhor.</p>
        </div>
      </footer>
    </main>
  );
}
