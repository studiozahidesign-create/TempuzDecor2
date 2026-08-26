import { useEffect, useMemo, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import brazilStatesData from "./data/brazil-states.json";
import TempusLogo from "./imports/Group9";
import SiteFooter from "./SiteFooter";
import { representatives } from "./cms/representatives";

const regionOptions = ["Todos", "Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"];

function BrazilMap({ selectedState, onSelect }: { selectedState: string; onSelect: (state: string) => void }) {
  const projection = geoMercator().fitSize([490, 540], brazilStatesData as never);
  const pathGenerator = geoPath(projection);
  const coveredStates = new Set(representatives.flatMap((representative) => representative.states));
  return <svg className="representatives-map" viewBox="0 0 490 540" role="img" aria-label="Mapa interativo dos estados do Brasil">{brazilStatesData.features.map((feature) => {
    const state = feature.properties.name as string;
    return <path key={state} d={pathGenerator(feature as never) ?? ""} className={`${coveredStates.has(state) ? "has-representative" : ""} ${selectedState === state ? "is-selected" : ""}`} onClick={() => onSelect(state)}><title>{state}{coveredStates.has(state) ? " — atendimento disponível" : ""}</title></path>;
  })}</svg>;
}

export default function RepresentativesPage() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Todos");
  const [selectedState, setSelectedState] = useState("Todos os estados");
  const [selectedCity, setSelectedCity] = useState("Todas as cidades");
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 12);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const stateOptions = useMemo(() => [...new Set(brazilStatesData.features.map((feature) => feature.properties.name as string))].sort((first, second) => first.localeCompare(second)), []);
  const cityOptions = useMemo(() => [...new Set(representatives.flatMap((representative) => representative.cities))].sort((first, second) => first.localeCompare(second)), []);
  const results = useMemo(() => representatives.filter((representative) => {
    const allTerms = [representative.name, representative.company, ...representative.states, ...representative.regions, ...representative.cities].join(" ").toLocaleLowerCase();
    return (selectedRegion === "Todos" || representative.regions.includes(selectedRegion)) && (selectedState === "Todos os estados" || representative.states.includes(selectedState)) && (selectedCity === "Todas as cidades" || representative.cities.includes(selectedCity)) && (!query.trim() || allTerms.includes(query.toLocaleLowerCase()));
  }).sort((first, second) => first.order - second.order), [query, selectedRegion, selectedState, selectedCity]);

  return <main className="page-shell representatives-page">
    <header className={headerScrolled ? "minimal-header is-scrolled" : "minimal-header"}><a className="brand brand-logo" href="/" aria-label="Tempus, início"><TempusLogo /></a><nav className={menuOpen ? "minimal-nav is-open" : "minimal-nav"} aria-label="Navegação principal"><a href="/categorias/reclinaveis" onClick={() => setMenuOpen(false)}>Produtos</a><a href="/sobre" onClick={() => setMenuOpen(false)}>Sobre nós</a><a href="/conteudos" onClick={() => setMenuOpen(false)}>Conteúdos</a><a href="/blocos-3d" onClick={() => setMenuOpen(false)}>Blocos 3D</a><a href="/representantes" onClick={() => setMenuOpen(false)}>Representantes</a><a href="/seja-representante" onClick={() => setMenuOpen(false)}>Seja representante</a><a href="/parceiros" onClick={() => setMenuOpen(false)}>Parceiros</a><a href="/carreiras" onClick={() => setMenuOpen(false)}>Carreiras</a></nav><a className="quiet-cta" href="https://wa.me/" target="_blank" rel="noreferrer">Fale conosco <span>↗</span></a><button className="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button></header>

    <section className="representatives-hero" aria-labelledby="representatives-title"><img src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=2400&h=1500&fit=crop&auto=format" alt="Interior contemporâneo com poltrona e luz natural" /><div><p className="editorial-eyebrow">Representantes</p><h1 id="representatives-title">Presença que <em>aproxima.</em></h1><p>Encontre o representante Tempus mais próximo do seu projeto.</p><a className="editorial-action editorial-action--light" href="#finder">Encontrar representante <span>↗</span></a></div></section>

    <section className="representative-finder" id="finder" aria-labelledby="finder-title"><div className="representative-map-area"><p className="editorial-eyebrow editorial-eyebrow--dark">Cobertura nacional</p><h2>Uma rede em todo o <em>Brasil.</em></h2><p className="representative-map-lead">Selecione uma região para encontrar o representante responsável pelo seu atendimento.</p><BrazilMap selectedState={selectedState} onSelect={(state) => { setSelectedState(state); setExpanded(null); }} /></div><div className="representative-directory"><header><p className="editorial-eyebrow editorial-eyebrow--dark">Encontre seu atendimento</p><h2 id="finder-title">Quem pode ajudar seu <em>projeto?</em></h2></header><label className="representative-search"><span>Buscar por estado, cidade ou empresa</span><input value={query} onChange={(event) => { setQuery(event.target.value); setExpanded(null); }} placeholder="Digite seu estado ou cidade" /></label><nav className="representative-regions" aria-label="Filtrar por região">{regionOptions.map((region) => <button className={selectedRegion === region ? "is-active" : ""} onClick={() => { setSelectedRegion(region); setExpanded(null); }} type="button" key={region}>{region}</button>)}</nav><div className="representative-selects"><label><span>Estado</span><select value={selectedState} onChange={(event) => { setSelectedState(event.target.value); setExpanded(null); }}><option>Todos os estados</option>{stateOptions.map((state) => <option key={state}>{state}</option>)}</select></label><label><span>Cidade</span><select value={selectedCity} onChange={(event) => { setSelectedCity(event.target.value); setExpanded(null); }}><option>Todas as cidades</option>{cityOptions.map((city) => <option key={city}>{city}</option>)}</select></label></div><div className="representative-results">{results.length ? results.map((representative, index) => <article className={expanded === representative.order ? "is-expanded" : ""} key={representative.order}><button type="button" onClick={() => setExpanded(expanded === representative.order ? null : representative.order)}><span>{String(index + 1).padStart(2, "0")}</span><div><p>{representative.states.join(" / ")}</p><h3>{representative.company}</h3><small>{representative.regions.filter((region) => region !== "Sudeste").join(" · ") || representative.regions.join(" · ")}</small></div><b>{expanded === representative.order ? "−" : "+"}</b></button><div className="representative-detail"><p><strong>{representative.name}</strong><br />{representative.cities.join(" · ")}</p><div>{representative.contacts.map((contact) => <a href={`tel:${contact.phone.replace(/\D/g, "")}`} key={contact.phone}>{contact.name}: {contact.phone} <span>↗</span></a>)}<a href={`mailto:${representative.email}`}>Enviar e-mail <span>↗</span></a></div></div></article>) : <div className="representative-empty"><h3>Não encontramos um representante específico para esta região.</h3><a className="editorial-action" href="https://wa.me/" target="_blank" rel="noreferrer">Fale com a Tempus <span>↗</span></a></div>}</div></div></section>

    <section className="representatives-support" aria-labelledby="help-title"><div><p className="editorial-eyebrow">Atendimento Tempus</p><h2 id="help-title">Precisa de <em>ajuda?</em></h2><p>Nossa equipe pode orientar você sobre produtos, especificações e atendimento.</p><a className="editorial-action editorial-action--light" href="https://wa.me/" target="_blank" rel="noreferrer">Falar com a Tempus <span>↗</span></a></div><img src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=1600&h=1100&fit=crop&auto=format" alt="Ambiente residencial de design contemporâneo" /></section>
    <SiteFooter />
  </main>;
}
