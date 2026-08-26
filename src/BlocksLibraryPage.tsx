import { useEffect, useMemo, useState } from "react";
import TempusLogo from "./imports/Group9";
import SiteFooter from "./SiteFooter";

type FileFormat = "3DS" | "DWG" | "FBX" | "OBJ" | "SKP";

type BlocksProduct = {
  name: string;
  category: string;
  type: string;
  reference: string;
  image: string;
  description: string;
  available_formats: FileFormat[];
  download_links: Partial<Record<FileFormat, string>>;
  featured: boolean;
  searchable: boolean;
  order: number;
};

const fileLink = (product: string, format: FileFormat) => `data:text/plain;charset=utf-8,${encodeURIComponent(`Tempus Decor — ${product}\nFormato: ${format}\n\nArquivo demonstrativo. Substitua este link pelo arquivo 3D oficial.`)}`;

const blocksProducts: BlocksProduct[] = [
  { name: "Mille", category: "Poltronas reclináveis", type: "Poltrona", reference: "MIL-01", image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=1100&h=900&fit=crop&auto=format", description: "Poltrona reclinável com conforto integrado para ambientes contemporâneos.", available_formats: ["SKP", "3DS", "OBJ"], download_links: {}, featured: true, searchable: true, order: 1 },
  { name: "Athenas", category: "Living", type: "Poltrona", reference: "ATH-02", image: "https://images.unsplash.com/photo-1612204186347-fef88cc864db?w=1100&h=900&fit=crop&auto=format", description: "Poltrona de presença leve, desenvolvida para áreas de estar.", available_formats: ["SKP", "DWG", "OBJ"], download_links: {}, featured: true, searchable: true, order: 2 },
  { name: "Amora", category: "Living", type: "Sofá", reference: "AMO-03", image: "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=1100&h=900&fit=crop&auto=format", description: "Sofá modular para composições de convivência e permanência.", available_formats: ["SKP", "FBX"], download_links: {}, featured: false, searchable: true, order: 3 },
  { name: "Ayla", category: "Living", type: "Poltrona", reference: "AYL-04", image: "https://images.unsplash.com/photo-1554104707-a76b270e4bbb?w=1100&h=900&fit=crop&auto=format", description: "Peça compacta com proporção pensada para diferentes ambientes.", available_formats: ["3DS", "DWG", "OBJ"], download_links: {}, featured: false, searchable: true, order: 4 },
  { name: "Nora", category: "Dormitórios", type: "Cadeira", reference: "NOR-05", image: "https://images.unsplash.com/photo-1624345691006-e683ff409f3f?w=1100&h=900&fit=crop&auto=format", description: "Cadeira de apoio para espaços de descanso e leitura.", available_formats: ["SKP", "3DS"], download_links: {}, featured: false, searchable: true, order: 5 },
  { name: "Pérola", category: "Dormitórios", type: "Cama", reference: "PER-06", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1100&h=900&fit=crop&auto=format", description: "Cama de linhas acolhedoras para projetos de dormitório.", available_formats: ["SKP", "DWG", "FBX"], download_links: {}, featured: true, searchable: true, order: 6 },
  { name: "Lina", category: "Acessórios", type: "Cadeira", reference: "LIN-07", image: "https://images.unsplash.com/photo-1554104683-c7063687d649?w=1100&h=900&fit=crop&auto=format", description: "Cadeira de desenho essencial para composições versáteis.", available_formats: ["OBJ", "3DS"], download_links: {}, featured: false, searchable: true, order: 7 },
  { name: "Siena", category: "Poltronas reclináveis", type: "Poltrona", reference: "SIE-08", image: "https://images.unsplash.com/photo-1624345691006-e683ff409f3f?w=1100&h=900&fit=crop&auto=format", description: "Poltrona de volume generoso para o conforto cotidiano.", available_formats: ["SKP", "OBJ", "FBX"], download_links: {}, featured: false, searchable: true, order: 8 },
].map((product) => ({ ...product, download_links: Object.fromEntries(product.available_formats.map((format) => [format, fileLink(product.name, format)])) }));

export default function BlocksLibraryPage() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas as categorias");
  const [type, setType] = useState("Todos os tipos");
  const [format, setFormat] = useState("Todos os formatos");
  const [sort, setSort] = useState("Mais relevantes");
  const [selectedProduct, setSelectedProduct] = useState<BlocksProduct | null>(null);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setSelectedProduct(null); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const categories = useMemo(() => [...new Set(blocksProducts.map((product) => product.category))], []);
  const productTypes = useMemo(() => [...new Set(blocksProducts.map((product) => product.type))], []);
  const formats = useMemo(() => [...new Set(blocksProducts.flatMap((product) => product.available_formats))], []);
  const filteredProducts = useMemo(() => blocksProducts.filter((product) => {
    const term = search.trim().toLowerCase();
    const matchesSearch = !term || (product.searchable && `${product.name} ${product.reference}`.toLowerCase().includes(term));
    return matchesSearch && (category === "Todas as categorias" || product.category === category) && (type === "Todos os tipos" || product.type === type) && (format === "Todos os formatos" || product.available_formats.includes(format as FileFormat));
  }).sort((first, second) => sort === "A–Z" ? first.name.localeCompare(second.name) : sort === "Novidades" ? second.order - first.order : Number(second.featured) - Number(first.featured) || first.order - second.order), [category, format, search, sort, type]);

  const clearFilters = () => { setSearch(""); setCategory("Todas as categorias"); setType("Todos os tipos"); setFormat("Todos os formatos"); setSort("Mais relevantes"); };

  return <main className="page-shell blocks-page">
    <header className={headerScrolled ? "minimal-header is-scrolled" : "minimal-header"}>
      <a className="brand brand-logo" href="/" aria-label="Tempus, início"><TempusLogo /></a>
      <nav className={menuOpen ? "minimal-nav is-open" : "minimal-nav"} aria-label="Navegação principal"><a href="/categorias/reclinaveis" onClick={() => setMenuOpen(false)}>Produtos</a><a href="/sobre" onClick={() => setMenuOpen(false)}>Sobre nós</a><a href="/conteudos" onClick={() => setMenuOpen(false)}>Conteúdos</a><a href="/blocos-3d" onClick={() => setMenuOpen(false)}>Blocos 3D</a><a href="#suporte" onClick={() => setMenuOpen(false)}>Representantes</a><a href="/carreiras" onClick={() => setMenuOpen(false)}>Carreiras</a></nav>
      <a className="quiet-cta" href="https://wa.me/" target="_blank" rel="noreferrer">Fale conosco <span>↗</span></a><button className="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
    </header>

    <section className="blocks-intro" aria-labelledby="blocks-title">
      <img src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=2400&h=1500&fit=crop&auto=format" alt="Poltrona contemporânea em interior arquitetônico" />
      <div className="blocks-intro-shade" />
      <div className="blocks-intro-copy"><p className="editorial-eyebrow">3D Blocks</p><h1 id="blocks-title">Recursos para projetos profissionais.</h1><p>Download Tempos 3D models for professional architectural projects.</p></div>
      <a className="blocks-intro-explore" href="#biblioteca">Explore 3D Blocks <span>↓</span></a>
    </section>

    <section className="blocks-library" id="biblioteca" aria-labelledby="library-title"><header className="blocks-library-head"><div><p className="editorial-eyebrow editorial-eyebrow--dark">Biblioteca profissional</p><h2 id="library-title">Modelos para <em>especificar.</em></h2></div><p>{filteredProducts.length} {filteredProducts.length === 1 ? "modelo disponível" : "modelos disponíveis"}</p></header>
      <div className="blocks-filters" aria-label="Filtros da biblioteca"><label className="blocks-search"><span>Buscar</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Produto ou referência" /></label><label><span>Categoria</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option>Todas as categorias</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Tipo</span><select value={type} onChange={(event) => setType(event.target.value)}><option>Todos os tipos</option>{productTypes.map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Formato</span><select value={format} onChange={(event) => setFormat(event.target.value)}><option>Todos os formatos</option>{formats.map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Ordenar</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option>Mais relevantes</option><option>A–Z</option><option>Novidades</option></select></label></div>
      {filteredProducts.length ? <div className="blocks-product-grid">{filteredProducts.map((product) => <article className="blocks-product" key={product.reference}><button className="blocks-product-preview" type="button" onClick={() => setSelectedProduct(product)} aria-label={`Ver ${product.name}`}><img src={product.image} alt={`Produto ${product.name} em fundo branco`} /></button><div><p>{product.category} <span>{product.reference}</span></p><h3>{product.name}</h3><button type="button" onClick={() => setSelectedProduct(product)}>Download 3D <span>→</span></button></div></article>)}</div> : <div className="blocks-empty"><h3>No products found.</h3><p>Tente ajustar a busca ou os filtros aplicados.</p><button type="button" onClick={clearFilters}>Limpar filtros</button></div>}
    </section>

    <section className="blocks-support" id="suporte" aria-labelledby="support-title"><div><p className="editorial-eyebrow">Suporte profissional</p><h2 id="support-title">Need more <em>information?</em></h2><p>Our professional team can help with technical specifications, materials, dimensions and product information.</p><div><a className="editorial-action editorial-action--light" href="/produtos/mille">Technical information <span>↗</span></a><a className="editorial-action editorial-action--light" href="https://wa.me/" target="_blank" rel="noreferrer">Contact our team <span>↗</span></a></div></div><img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&h=1100&fit=crop&auto=format" alt="Profissional observando arquitetura contemporânea" /></section>
    <SiteFooter />

    {selectedProduct && <div className="blocks-modal-backdrop" role="presentation" onMouseDown={() => setSelectedProduct(null)}><section className="blocks-modal" role="dialog" aria-modal="true" aria-labelledby="modal-product-title" onMouseDown={(event) => event.stopPropagation()}><button className="blocks-modal-close" type="button" onClick={() => setSelectedProduct(null)} aria-label="Fechar preview">×</button><div className="blocks-modal-image"><img src={selectedProduct.image} alt={`Produto ${selectedProduct.name}`} /></div><div className="blocks-modal-content"><p className="editorial-eyebrow editorial-eyebrow--dark">{selectedProduct.category} / {selectedProduct.reference}</p><h2 id="modal-product-title">{selectedProduct.name}</h2><p>{selectedProduct.description}</p><div className="blocks-modal-formats"><span>Available formats</span>{selectedProduct.available_formats.map((item) => <a href={selectedProduct.download_links[item]} download={`${selectedProduct.name.toLowerCase().replaceAll(" ", "-")}.${item.toLowerCase()}.txt`} key={item}>Download {item} <b>↓</b></a>)}</div></div></section></div>}
  </main>;
}
