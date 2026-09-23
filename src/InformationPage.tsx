import { useLocation } from "react-router";
import TempusLogo from "./imports/Group9";
import SiteFooter from "./SiteFooter";

const pageContent: Record<string, { eyebrow: string; title: string; description: string }> = {
  "/assistencia": { eyebrow: "Assistência Tempus", title: "Cuidado que acompanha o seu produto.", description: "Encontre orientações para uso, garantia e suporte técnico especializado." },
  "/contato": { eyebrow: "Contato", title: "Vamos conversar.", description: "Fale com a Tempus para receber atendimento, orientação de produto ou solicitar um orçamento." },
  "/contato/comercial": { eyebrow: "Comercial", title: "Atendimento para o seu projeto.", description: "Nossa equipe comercial está pronta para orientar escolhas, propostas e oportunidades de parceria." },
  "/contato/suporte": { eyebrow: "Suporte", title: "Conte com a nossa equipe.", description: "Envie sua solicitação para receber orientação técnica sobre o seu produto Tempus." },
  "/biblioteca-bim": { eyebrow: "Profissionais", title: "Biblioteca BIM para especificar.", description: "Recursos digitais para apoiar arquitetos e designers no desenvolvimento de projetos." },
  "/downloads": { eyebrow: "Profissionais", title: "Downloads técnicos.", description: "Acesse materiais e arquivos de apoio para a especificação de produtos Tempus." },
  "/especificacoes": { eyebrow: "Profissionais", title: "Informação precisa para cada projeto.", description: "Consulte dados e orientações técnicas para especificar com segurança." },
  "/manuais": { eyebrow: "Assistência", title: "Manuais de produto.", description: "Orientações de instalação, uso e manutenção para aproveitar cada detalhe com segurança." },
  "/garantia": { eyebrow: "Assistência", title: "Garantia Tempus.", description: "Entenda a cobertura e as orientações para manter o seu produto sempre bem cuidado." },
  "/cuidados": { eyebrow: "Assistência", title: "Cuidados que preservam o conforto.", description: "Recomendações simples para conservar materiais, acabamentos e mecanismos." },
  "/faq": { eyebrow: "Assistência", title: "Perguntas frequentes.", description: "Respostas rápidas para dúvidas sobre produtos, atendimento e garantia." },
};

const technologies = [
  ["unitech", "Unitech", "Conforto essencial em uma experiência de reclínio simples e precisa."],
  ["duotech", "Duotech", "Dois movimentos coordenados para ampliar as possibilidades de conforto."],
  ["multitech", "Multitech", "Ajustes independentes para encontrar a posição ideal em cada momento."],
  ["fulltech", "Fulltech", "Recursos integrados para uma experiência de relaxamento completa."],
];

export default function InformationPage() {
  const { pathname } = useLocation();
  const isTechnologyPage = pathname === "/tecnologias";
  const content = isTechnologyPage
    ? { eyebrow: "Tecnologias Tempus", title: "Conforto pensado para acompanhar você.", description: "Quatro tecnologias de movimento criadas para diferentes maneiras de relaxar." }
    : pageContent[pathname] ?? pageContent["/contato"];

  return (
    <main className="page-shell information-page">
      <header className="minimal-header"><a className="brand brand-logo" href="/" aria-label="Tempus, início"><TempusLogo /></a><nav className="minimal-nav" aria-label="Navegação principal"><a href="/produtos">Produtos</a><a href="/sobre">Sobre a Tempus</a><a href="/conteudos">Conteúdos</a><a href="/representantes">Representantes</a></nav><a className="quiet-cta" href="/contato">Fale conosco <span>↗</span></a></header>
      <section className="information-hero">
        <p className="editorial-eyebrow editorial-eyebrow--dark">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p>{content.description}</p>
        {isTechnologyPage ? <a className="editorial-action" href="#unitech">Conhecer tecnologias <span>↓</span></a> : <a className="editorial-action" href="/contato">Falar com a Tempus <span>↗</span></a>}
      </section>
      {isTechnologyPage && <section className="technology-directory" aria-label="Tecnologias Tempus">{technologies.map(([id, name, description], index) => <article id={id} key={id}><span>{String(index + 1).padStart(2, "0")}</span><h2>{name}</h2><p>{description}</p></article>)}</section>}
      <SiteFooter />
    </main>
  );
}
