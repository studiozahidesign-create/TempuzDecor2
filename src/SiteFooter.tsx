import TempusLogo from "./imports/Group9";

const footerGroups = [
  {
    title: "Navegação",
    links: [
      ["Home", "/"], ["Sobre a Tempus", "/sobre"], ["Produtos", "/produtos"], ["Representantes", "/representantes"],
      ["Assistência", "/assistencia"], ["Blocos 3D", "/blocos-3d"], ["Conteúdos", "/conteudos"], ["Contato", "/contato"],
    ],
  },
  {
    title: "Produtos",
    links: [
      ["Todos os produtos", "/produtos"], ["Poltronas", "/produtos/poltronas"], ["Sofás", "/produtos/sofas"], ["Camas", "/produtos/camas"],
      ["Tempus Office", "/produtos/tempus-office"], ["Complementos para Poltronas", "/produtos/complementos"], ["Lançamentos", "/produtos?f=lancamentos"],
    ],
  },
  {
    title: "Tecnologias",
    links: [
      ["Tecnologias", "/tecnologias"], ["Unitech", "/tecnologias#unitech"], ["Duotech", "/tecnologias#duotech"],
      ["Multitech", "/tecnologias#multitech"], ["Fulltech", "/tecnologias#fulltech"],
    ],
  },
  {
    title: "Profissionais",
    links: [
      ["Blocos 3D", "/blocos-3d"], ["Biblioteca BIM", "/biblioteca-bim"], ["Downloads", "/downloads"],
      ["Especificações Técnicas", "/especificacoes"], ["Atendimento Comercial", "/contato/comercial"],
    ],
  },
  {
    title: "Comercial",
    links: [
      ["Seja Representante", "/seja-representante"], ["Encontre um Representante", "/representantes"], ["Atendimento Comercial", "/contato/comercial"],
      ["Solicitar Orçamento", "/contato"], ["Trabalhe Conosco", "/carreiras"],
    ],
  },
  {
    title: "Assistência",
    links: [
      ["Assistência Técnica", "/assistencia"], ["Manuais", "/manuais"], ["Garantia", "/garantia"],
      ["Cuidados com o Produto", "/cuidados"], ["Perguntas Frequentes", "/faq"], ["Falar com o Suporte", "/contato/suporte"],
    ],
  },
] as const;

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-intro">
        <a className="brand footer-brand brand-logo footer-logo" href="/" aria-label="Tempus, início"><TempusLogo /></a>
        <p>Conforto, tecnologia e design para acompanhar o tempo de cada ambiente.</p>
        <div className="footer-contact-actions">
          <a href="/contato/comercial">Atendimento comercial <span>↗</span></a>
          <a href="/assistencia">Solicitar assistência <span>↗</span></a>
        </div>
      </div>

      <div className="footer-directory">
        {footerGroups.map((group) => (
          <div className="footer-group" key={group.title}>
            <h3>{group.title}</h3>
            <nav aria-label={group.title}>
              {group.links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
            </nav>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Tempus</p>
        <p className="footer-credit">Design para viver melhor.</p>
      </div>
    </footer>
  );
}
