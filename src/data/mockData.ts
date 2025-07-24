// Mock data for Greek mythology entities
export interface MythEntity {
  id: string;
  nome: string;
  categoria: 'olimpico' | 'menor' | 'primordial' | 'heroi';
  descricao: string;
  imagem: string;
  relacoes: string[];
  tags: string[];
  poderes?: string[];
  simbolos?: string[];
}

export interface BlogPost {
  id: string;
  titulo: string;
  conteudo: string;
  data_publicacao: string;
  tags: string[];
  resumo: string;
}

export const mythEntities: MythEntity[] = [
  // Deuses Olímpicos
  {
    id: "zeus",
    nome: "Zeus",
    categoria: "olimpico",
    descricao: "Rei dos deuses do Olimpo, senhor dos céus e do trovão. Zeus governa sobre todos os outros deuses e é conhecido por sua autoridade suprema e seus raios poderosos.",
    imagem: "/placeholder-zeus.jpg",
    relacoes: ["Hera", "Poseidon", "Hades", "Atena", "Apolo"],
    tags: ["rei", "trovao", "ceu", "olimpo"],
    poderes: ["Controle dos raios", "Metamorfose", "Autoridade divina"],
    simbolos: ["Raio", "Águia", "Carvalho"]
  },
  {
    id: "hera",
    nome: "Hera",
    categoria: "olimpico", 
    descricao: "Rainha dos deuses e esposa de Zeus, protetora do casamento e da família. Conhecida por sua dignidade real e ciúmes legendários.",
    imagem: "/placeholder-hera.jpg",
    relacoes: ["Zeus", "Ares", "Hefesto"],
    tags: ["rainha", "casamento", "familia"],
    poderes: ["Proteção familiar", "Magia matrimonial", "Autoridade real"],
    simbolos: ["Pavão", "Coroa", "Romã"]
  },
  {
    id: "poseidon",
    nome: "Poseidon", 
    categoria: "olimpico",
    descricao: "Deus dos mares, oceanos e terremotos. Irmão de Zeus, governa todas as águas e é temido pelos marinheiros por sua ira tempestuosa.",
    imagem: "/placeholder-poseidon.jpg",
    relacoes: ["Zeus", "Hades", "Anfitrite"],
    tags: ["mar", "oceano", "terremoto"],
    poderes: ["Controle das águas", "Terremotos", "Criação de cavalos"],
    simbolos: ["Tridente", "Cavalo", "Golfinho"]
  },
  
  // Heróis
  {
    id: "hercules",
    nome: "Héracles (Hércules)",
    categoria: "heroi",
    descricao: "O maior herói da mitologia grega, filho de Zeus. Famoso pelos Doze Trabalhos e por sua força sobre-humana.",
    imagem: "/placeholder-hercules.jpg", 
    relacoes: ["Zeus", "Alcmena", "Hera"],
    tags: ["forca", "trabalhos", "heroi"],
    poderes: ["Força sobre-humana", "Resistência", "Coragem"],
    simbolos: ["Clava", "Pele do Leão de Nemeia"]
  },
  {
    id: "aquiles",
    nome: "Aquiles",
    categoria: "heroi",
    descricao: "Herói da Guerra de Troia, invulnerável exceto pelo calcanhar. O maior guerreiro de sua geração.",
    imagem: "/placeholder-aquiles.jpg",
    relacoes: ["Tétis", "Péleu", "Pátroclo"],
    tags: ["guerra", "troia", "invulneravel"],
    poderes: ["Invulnerabilidade", "Habilidade de combate", "Velocidade"],
    simbolos: ["Lança", "Escudo", "Elmo"]
  },

  // Seres Primordiais
  {
    id: "gaia",
    nome: "Gaia",
    categoria: "primordial",
    descricao: "A Terra personificada, mãe de todos os seres. A primeira divindade primordial que deu origem ao cosmos.",
    imagem: "/placeholder-gaia.jpg",
    relacoes: ["Urano", "Cronos", "Titãs"],
    tags: ["terra", "mae", "primordial"],
    poderes: ["Criação da vida", "Controle da natureza", "Sabedoria ancestral"],
    simbolos: ["Terra", "Frutos", "Montanhas"]
  },

  // Divindades Menores
  {
    id: "pan",
    nome: "Pã",
    categoria: "menor",
    descricao: "Deus dos pastores, da natureza selvagem e da música pastoral. Meio homem, meio bode, protetor dos rebanhos.",
    imagem: "/placeholder-pan.jpg",
    relacoes: ["Hermes", "Ninfas"],
    tags: ["natureza", "pastores", "musica"],
    poderes: ["Música mágica", "Comunhão com animais", "Pânico"],
    simbolos: ["Flauta de pã", "Cajado de pastor"]
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "guerra-troia",
    titulo: "A Guerra de Troia: Épico de Heróis e Deuses",
    resumo: "Explore a lendária guerra que durou dez anos e envolveu os maiores heróis da mitologia grega.",
    conteudo: "A Guerra de Troia é uma das narrativas mais épicas da mitologia grega...",
    data_publicacao: "2024-01-15",
    tags: ["guerra", "troia", "herois", "iliada"]
  },
  {
    id: "olimpo-origem",
    titulo: "O Monte Olimpo: Lar dos Deuses",
    resumo: "Descubra a morada sagrada dos doze deuses olímpicos e seus mistérios.",
    conteudo: "O Monte Olimpo, localizado na Grécia, é considerado a morada dos deuses...",
    data_publicacao: "2024-01-10", 
    tags: ["olimpo", "deuses", "morada", "sagrado"]
  },
  {
    id: "doze-trabalhos",
    titulo: "Os Doze Trabalhos de Héracles",
    resumo: "Acompanhe a jornada épica do maior herói grego através de seus desafios impossíveis.",
    conteudo: "Héracles, conhecido pelos romanos como Hércules, teve que realizar doze trabalhos...",
    data_publicacao: "2024-01-05",
    tags: ["hercules", "trabalhos", "heroi", "desafios"]
  }
];

export const timelineEvents = [
  {
    id: "criacao-mundo",
    titulo: "Criação do Mundo",
    periodo: "Tempo Primordial", 
    descricao: "Gaia emerge do Caos e cria Urano, iniciando a genealogia divina.",
    categoria: "cosmogonia"
  },
  {
    id: "titanomquia",
    titulo: "Guerra dos Titãs",
    periodo: "Era dos Titãs",
    descricao: "Zeus lidera os olímpicos contra Cronos e os Titãs pelo domínio do cosmos.",
    categoria: "guerra"
  },
  {
    id: "nascimento-atena",
    titulo: "Nascimento de Atena", 
    periodo: "Era Olímpica",
    descricao: "Atena nasce da cabeça de Zeus, já adulta e armada.",
    categoria: "nascimento"
  },
  {
    id: "guerra-troia",
    titulo: "Guerra de Troia",
    periodo: "Era Heroica",
    descricao: "Conflito épico entre gregos e troianos que durou dez anos.",
    categoria: "guerra"
  }
];