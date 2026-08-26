import TempusLogo from "./imports/Group9";

export default function SiteFooter() {
  return (
  <footer className="site-footer">
    <div className="footer-intro">
      <a className="brand footer-brand brand-logo footer-logo" href="#inicio" aria-label="Tempus, início">
    <TempusLogo />
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
  );
}
