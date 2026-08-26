export type Representative = {
  name: string;
  company: string;
  states: string[];
  regions: string[];
  cities: string[];
  contacts: { name: string; phone: string }[];
  email: string;
  phone: string;
  website?: string;
  order: number;
};

// Simulação local até a origem definitiva dos representantes ser integrada.
export const representatives: Representative[] = [
  { name: "Paulo Catelli Maly", company: "Marino Representações", states: ["São Paulo"], regions: ["Sudeste", "Interior / Região 14/18"], cities: ["Bauru", "Marília", "Presidente Prudente"], contacts: [{ name: "Paulo Catelli", phone: "(14) 99658-7474" }, { name: "Maly", phone: "(14) 98137-4008" }], email: "luizmarinovendas@gmail.com", phone: "(14) 99658-7474", order: 1 },
  { name: "Equipe Comercial", company: "JR Representações", states: ["São Paulo"], regions: ["Sudeste", "Interior / Região 16"], cities: ["Araraquara", "Ribeirão Preto", "São Carlos"], contacts: [{ name: "Atendimento comercial", phone: "(16) 00000-0000" }], email: "comercial@exemplo.com", phone: "(16) 00000-0000", order: 2 },
  { name: "Equipe Comercial", company: "M7 Representações", states: ["São Paulo"], regions: ["Sudeste", "Interior / Regiões 12, 15, 17 e 19"], cities: ["Sorocaba", "Campinas", "São José do Rio Preto"], contacts: [{ name: "Atendimento comercial", phone: "(19) 00000-0000" }], email: "comercial@exemplo.com", phone: "(19) 00000-0000", order: 3 },
  { name: "Atendimento regional", company: "Tempus Sul", states: ["Paraná", "Santa Catarina", "Rio Grande do Sul"], regions: ["Sul"], cities: ["Curitiba", "Florianópolis", "Porto Alegre"], contacts: [{ name: "Atendimento regional", phone: "(41) 00000-0000" }], email: "sul@exemplo.com", phone: "(41) 00000-0000", order: 4 },
  { name: "Atendimento regional", company: "Tempus Nordeste", states: ["Bahia", "Pernambuco", "Ceará"], regions: ["Nordeste"], cities: ["Salvador", "Recife", "Fortaleza"], contacts: [{ name: "Atendimento regional", phone: "(81) 00000-0000" }], email: "nordeste@exemplo.com", phone: "(81) 00000-0000", order: 5 },
];
