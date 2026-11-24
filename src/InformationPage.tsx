import { useLocation } from "react-router";
import TempusLogo from "./imports/Group9";
import SiteFooter from "./SiteFooter";

const pageContent: Record<string, { eyebrow: string; title: string; description: string }> = {
  "/assistencia": { eyebrow: "Assistência Tempus", title: "Cuidados com o seu produto.", description: "Consulte informações de uso, manutenção e garantia." },
  "/contato": { eyebrow: "Contato", title: "Fale com a Tempus.", description: "Encontre um representante e consulte os detalhes dos produtos Tempus." },
  "/contato/comercial": { eyebrow: "Atendimento comercial", title: "Vamos conversar.", description: "Encontre os contatos de representantes disponíveis na sua região." },
  "/contato/suporte": { eyebrow: "Suporte", title: "Precisa de orientação?", description: "Consulte as informações de garantia ou encontre um contato Tempus." },
  "/biblioteca-bim": { eyebrow: "Profissionais", title: "Arquivos para o seu projeto.", description: "Consulte os arquivos disponíveis para os produtos Tempus." },
  "/downloads": { eyebrow: "Profissionais", title: "Materiais para consulta.", description: "Encontre arquivos e informações de produto disponíveis." },
  "/especificacoes": { eyebrow: "Profissionais", title: "Consulte os detalhes do produto.", description: "Veja as dimensões e os recursos informados para cada modelo." },
  "/manuais": { eyebrow: "Assistência", title: "Manuais dos produtos.", description: "Consulte as instruções de uso e manutenção de cada modelo." },
  "/garantia": { eyebrow: "Assistência", title: "Prazos de garantia.", description: "Confira o prazo informado para cada parte do produto. Consulte o certificado para ver as condições completas." },
  "/cuidados": { eyebrow: "Assistência", title: "Cuide do seu produto.", description: "Consulte as orientações de conservação para os materiais e mecanismos." },
  "/faq": { eyebrow: "Ajuda", title: "Dúvidas frequentes.", description: "Encontre respostas sobre produtos, atendimento e garantia." },
};

const technologies = [
  ["unitech", "Unitech", "Consulte os recursos informados para cada modelo."],
  ["duotech", "Duotech", "Consulte os recursos informados para cada modelo."],
  ["multitech", "Multitech", "Consulte os recursos informados para cada modelo."],
  ["fulltech", "Fulltech", "Consulte os recursos informados para cada modelo."],
];

const guaranteeItems = [
  ["01", "Estrutura", "12 meses"],
  ["02", "Revestimentos", "3 meses"],
  ["03", "Parte elétrica", "3 meses"],
  ["04", "Certificado", "Consulte as condições completas."],
];

export default function InformationPage() {
  const { pathname } = useLocation();
  const isTechnologyPage = pathname === "/tecnologias";
  const isWarrantyPage = pathname === "/garantia";
  const content = isTechnologyPage
    ? { eyebrow: "Tecnologias Tempus", title: "Quatro tecnologias de reclínio.", description: "Conheça Unitech, Duotech, Multitech e Fulltech. Consulte os recursos informados para cada modelo." }
    : pageContent[pathname] ?? pageContent["/contato"];
  const action = isTechnologyPage
    ? { href: "#unitech", label: "Ver tecnologias" }
    : isWarrantyPage
      ? { href: "/contato/suporte", label: "Falar com o suporte" }
      : pathname.startsWith("/contato")
        ? { href: "/representantes", label: "Encontrar representante" }
        : { href: "/garantia", label: "Consultar garantia" };

  return (
    <main className="page-shell information-page">
      <header className="minimal-header"><a className="brand brand-logo" href="/" aria-label="Tempus, início"><TempusLogo /></a><nav className="minimal-nav" aria-label="Navegação principal"><a href="/produtos">Produtos</a><a href="/sobre">A Tempus</a><a href="/conteudos">Inspirações</a><a href="/representantes">Representantes</a></nav><a className="quiet-cta" href="/contato">Fale com a Tempus <span>↗</span></a></header>
      <section className="information-hero">
        <p className="editorial-eyebrow editorial-eyebrow--dark">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p>{content.description}</p>
        <a className="editorial-action" href={action.href}>{action.label} <span>↗</span></a>
      </section>
      {isTechnologyPage && <section className="technology-directory" aria-label="Tecnologias Tempus">{technologies.map(([id, name, description], index) => <article id={id} key={id}><span>{String(index + 1).padStart(2, "0")}</span><h2>{name}</h2><p>{description}</p></article>)}</section>}
      {isWarrantyPage && <section className="technology-directory" aria-label="Prazos informados de garantia">{guaranteeItems.map(([number, name, description]) => <article key={number}><span>{number}</span><h2>{name}</h2><p>{description}</p></article>)}</section>}
      <SiteFooter />
    </main>
  );
}
