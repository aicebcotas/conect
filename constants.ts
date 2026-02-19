
import { Church } from './types';

export const INITIAL_CHURCHES: Church[] = [
  { id: "1", name: "1ª Igreja Cristã Evangélica em Cândido Mendes", city: "Cândido Mendes", state: "MA", region: "amazonica" },
  { id: "2", name: "Igreja Cristã Evangélica Família da Fé", city: "São Luís", state: "MA", region: "amazonica" },
  { id: "4", name: "Igreja Cristã Evangélica em Castanhal", city: "Castanhal", state: "PA", region: "amazonica" },
  { id: "9", name: "Igreja Cristã Evangélica em Benguí", city: "Belém", state: "PA", region: "amazonica" },
  { id: "10", name: "Igreja Cristã Evangélica em Marco", city: "Belém", state: "PA", region: "amazonica" },
  { id: "20", name: "Primeira Igreja Cristã Evangélica Vila dos Cabanos", city: "Barcarena", state: "PA", region: "amazonica", address: "Av. Cônego Batista Campos" },
  { id: "49", name: "Igreja Cristã Evangélica Portel", city: "Portel", state: "PA", region: "amazonia-equatorial" },
  { id: "76", name: "Igreja Cristã Evangélica em Compensa", city: "Manaus", state: "AM", region: "amazonia-ocidental" },
  { id: "93", name: "Primeira Igreja Cristã Evangélica em Boa Vista", city: "Boa Vista", state: "RR", region: "extremo-norte" },
  { id: "105", name: "Primeira Igreja Cristã Evangélica em Parauapebas", city: "Parauapebas", state: "PA", region: "carajas" },
  { id: "112", name: "Igreja Cristã Evangélica em Campo Alegre de Lourdes", city: "Campo Alegre de Lourdes", state: "BA", region: "sertaneja" },
  { id: "125", name: "Primeira Igreja Cristã Evangélica de Araguaína", city: "Araguaína", state: "TO", region: "tocantina" },
  { id: "137", name: "Primeira Igreja Cristã Evangélica de Imperatriz", city: "Imperatriz", state: "MA", region: "tocantina", address: "Rua Simplício Moreira, 123" },
  { id: "178", name: "Igreja Cristã Evangélica Gama", city: "Gama", state: "DF", region: "central" },
  { id: "209", name: "Igreja Cristã Evangélica São Luís (Centro)", city: "São Luís", state: "MA", region: "maranhense", address: "Rua do Passeio" }
];

export const REGIONS_LABELS: Record<string, string> = {
  'amazonica': '🌴 Amazônica',
  'amazonia-equatorial': '🌊 Amazônia Equatorial',
  'amazonia-ocidental': '🌲 Amazônia Ocidental',
  'extremo-norte': '❄️ Extremo Norte',
  'carajas': '⛰️ Carajás',
  'nordeste': '🌞 Nordeste',
  'sertaneja': '🏜️ Sertaneja',
  'tocantina': '🏞️ Tocantina',
  'central': '🏛️ Central',
  'maranhense': '🌴 Maranhense'
};

export const STATES = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"];
