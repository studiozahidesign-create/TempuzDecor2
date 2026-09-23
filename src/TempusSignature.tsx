type TempusSignatureProps = {
  image?: string;
};

const defaultImage = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1800&h=1600&fit=crop&auto=format";

export default function TempusSignature({ image = defaultImage }: TempusSignatureProps) {
  return (
    <section className="tempus-signature" aria-labelledby="tempus-signature-title">
      <div className="tempus-signature-image">
        <img src={image} alt="Detalhe de materiais e acabamento em couro" />
      </div>
      <div className="tempus-signature-content">
        <p className="editorial-eyebrow editorial-eyebrow--dark">Tempus Signature</p>
        <h2 id="tempus-signature-title">Onde cada detalhe<br />fala sobre <em>você.</em></h2>
        <p className="tempus-signature-intro">Uma seleção curada de materiais e acabamentos para que cada peça compatível reflita o seu jeito de viver, o seu olhar e a arquitetura que a recebe.</p>
        <div className="tempus-signature-metrics">
          <article><strong>65+</strong><span>Tecidos premium</span></article>
          <article><strong>15+</strong><span>Couros naturais</span></article>
          <article><strong>Exclusivos</strong><span>Acabamentos em madeira</span></article>
          <article><strong>Personalizada</strong><span>Configuração</span></article>
        </div>
        <a className="editorial-action" href="#materiais">Explorar materiais <span>→</span></a>
      </div>
    </section>
  );
}
