/* ======================================================
   JORNADA MITOLÓGICA 2.0 – SCRIPT PRINCIPAL
   ====================================================== */

/* -------------
   UTILIDADES
   ------------- */

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function weightedChoice(weightMap) {
  const entries = Object.entries(weightMap);
  const total = entries.reduce((sum, [, w]) => sum + w, 0);
  const r = Math.random() * total;
  let acc = 0;
  for (const [key, weight] of entries) {
    acc += weight;
    if (r <= acc) return key;
  }
  return entries[entries.length - 1][0];
}

function limitText(text, limit) {
  if (!text || text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return cut.slice(0, lastSpace > 0 ? lastSpace : limit) + "...";
}

/* ============================
   MENU HAMBÚRGUER ECOSSISTEMA
   ============================ */

const menuIcon = $("#menuIcon");
const menu = $("#menu");

if (menuIcon && menu) {
  menuIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    const isActive = menu.classList.toggle("active");
    menuIcon.classList.toggle("active");
    menuIcon.setAttribute("aria-expanded", isActive ? "true" : "false");
  });

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !menuIcon.contains(e.target)) {
      if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        menuIcon.classList.remove("active");
        menuIcon.setAttribute("aria-expanded", "false");
      }
    }
  });

  $all(".menu-item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)";
    });
    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

/* ============================
   MODELO DE DADOS – ARCANOS
   ============================ */

/*
  Estrutura comum de carta:

  {
    id,
    tipo: "maior" | "menor",
    baralho: "deuses" | "cenas",
    cultura: "grega" | "egipcia" | ... | null,
    nome,
    arquetipo,
    descricao,
    eixoPsicologico,
    polaridade: "Luz" | "Sombra" | "Ambivalente",
    tags: [ ... ]
  }
*/

// --- Arcanos Maiores (Deuses) – exemplos com campos arquetípicos preenchidos ---

const arcanosMaioresDeuses = [
  {
    id: "grega-zeus",
    tipo: "maior",
    baralho: "deuses",
    cultura: "grega",
    nome: "Zeus",
    arquetipo: "O Líder",
    descricao:
      "Rei dos deuses, Zeus personifica o poder supremo e a autoridade divina. Ele governa o Olimpo e decide o destino dos mortais e dos deuses. Filosoficamente, Zeus representa a busca pelo controle e a responsabilidade de liderar, refletindo o arquétipo do Líder. Na vida moderna, ele simboliza a necessidade de equilibrar poder e justiça, lembrando-nos de que a verdadeira liderança vem com a sabedoria de usar o poder para o bem comum.",
    eixoPsicologico: "Poder e Responsabilidade",
    polaridade: "Luz",
    tags: ["liderança", "autoridade", "responsabilidade", "justiça"],
  },
  {
    id: "grega-atena",
    tipo: "maior",
    baralho: "deuses",
    cultura: "grega",
    nome: "Atena",
    arquetipo: "O Estrategista",
    descricao:
      "Deusa da sabedoria e da guerra estratégica, Atena nasceu da mente de Zeus, já adulta e armada. Ela representa a inteligência aplicada, a razão e a estratégia. Filosoficamente, Atena encarna o arquétipo do Estrategista, que valoriza o planejamento e a sabedoria sobre a força bruta. Na vida moderna, ela nos inspira a resolver conflitos com inteligência e a buscar soluções criativas para os desafios do dia a dia.",
    eixoPsicologico: "Sabedoria e Estratégia",
    polaridade: "Luz",
    tags: ["sabedoria", "estratégia", "razão", "criatividade"],
  },
  {
    id: "grega-hades",
    tipo: "maior",
    baralho: "deuses",
    cultura: "grega",
    nome: "Hades",
    arquetipo: "O Transformador",
    descricao:
      "Deus do submundo, Hades governa o reino dos mortos, um lugar de transformação e renascimento. Ele simboliza o desconhecido e o inevitável ciclo da vida e da morte. Filosoficamente, Hades representa o arquétipo do Transformador, que nos convida a enfrentar nossos medos e a abraçar mudanças profundas. Na vida moderna, ele nos lembra de que a transformação pessoal muitas vezes começa ao enfrentarmos nossos 'infernos' internos.",
    eixoPsicologico: "Transformação e Sombra",
    polaridade: "Ambivalente",
    tags: ["transformação", "sombra", "medo", "renascimento"],
  },
  {
    id: "egipcia-ra",
    tipo: "maior",
    baralho: "deuses",
    cultura: "egipcia",
    nome: "Rá",
    arquetipo: "O Criador",
    descricao:
      "Deus do sol, Rá é o criador do mundo e a fonte de toda a vida. Ele viaja pelo céu durante o dia e pelo submundo à noite, simbolizando o ciclo eterno de nascimento, morte e renascimento. Filosoficamente, Rá representa o arquétipo do Criador, que traz luz e ordem ao caos. Na vida moderna, ele nos inspira a buscar propósito e a iluminar nosso caminho com criatividade e determinação.",
    eixoPsicologico: "Criação e Propósito",
    polaridade: "Luz",
    tags: ["criatividade", "propósito", "ordem", "renovação"],
  },
  {
    id: "egipcia-anubis",
    tipo: "maior",
    baralho: "deuses",
    cultura: "egipcia",
    nome: "Anúbis",
    arquetipo: "O Guia",
    descricao:
      "Deus dos mortos e guia das almas, Anúbis é o protetor dos túmulos e o juiz dos mortos. Ele simboliza a transição entre a vida e a morte, oferecendo orientação e proteção. Filosoficamente, Anúbis encarna o arquétipo do Guia, que nos ajuda a navegar por momentos de incerteza e mudança. Na vida moderna, ele nos lembra da importância de confiar em nossa intuição e de buscar orientação em tempos de crise.",
    eixoPsicologico: "Transição e Intuição",
    polaridade: "Luz",
    tags: ["guia", "intuição", "transição", "proteção"],
  },
  {
    id: "nordica-odin",
    tipo: "maior",
    baralho: "deuses",
    cultura: "nordica",
    nome: "Odin",
    arquetipo: "O Sábio",
    descricao:
      "Pai de todos e deus da sabedoria e da guerra, Odin é um líder sábio e visionário. Ele sacrificou um olho para beber da fonte do conhecimento, simbolizando a busca pela sabedoria a qualquer custo. Filosoficamente, Odin representa o arquétipo do Sábio, que valoriza o conhecimento e a compreensão profunda. Na vida moderna, ele nos inspira a buscar aprendizado constante e a usar nossa sabedoria para guiar nossas ações.",
    eixoPsicologico: "Sabedoria e Sacrifício",
    polaridade: "Luz",
    tags: ["sabedoria", "visão", "sacrifício", "liderança"],
  },
  {
    id: "nordica-loki",
    tipo: "maior",
    baralho: "deuses",
    cultura: "nordica",
    nome: "Loki",
    arquetipo: "O Transformador",
    descricao:
      "Deus da trapaça e da mudança, Loki é uma figura complexa e imprevisível. Ele desafia as normas e traz caos, mas também é um agente de transformação. Filosoficamente, Loki representa o arquétipo do Transformador, que quebra padrões e abre caminho para novas possibilidades. Na vida moderna, ele nos ensina a abraçar a incerteza e a ver o caos como uma oportunidade para crescimento e renovação.",
    eixoPsicologico: "Caos e Mudança",
    polaridade: "Ambivalente",
    tags: ["mudança", "caos", "rebeldia", "renovação"],
  },
  {
    id: "hindu-shiva",
    tipo: "maior",
    baralho: "deuses",
    cultura: "hindu",
    nome: "Shiva",
    arquetipo: "O Transformador",
    descricao:
      "O destruidor e transformador, Shiva representa a destruição necessária para a renovação. Ele simboliza a mudança e a libertação. Filosoficamente, Shiva encarna o arquétipo do Transformador, que nos convida a abraçar o caos para encontrar a renovação. Na vida moderna, ele nos ensina a aceitar o fim de ciclos e a buscar novos começos.",
    eixoPsicologico: "Destruição e Renovação",
    polaridade: "Ambivalente",
    tags: ["fim de ciclo", "renovação", "libertação", "coragem"],
  },
  {
    id: "japonesa-amaterasu",
    tipo: "maior",
    baralho: "deuses",
    cultura: "japonesa",
    nome: "Amaterasu",
    arquetipo: "O Iluminador",
    descricao:
      "Deusa do sol e do universo, Amaterasu é a fonte de toda a vida e luz. Ela representa a esperança e a renovação. Filosoficamente, Amaterasu encarna o arquétipo do Iluminador, que traz luz ao mundo. Na vida moderna, ela nos inspira a buscar clareza e a iluminar o caminho para os outros.",
    eixoPsicologico: "Clareza e Esperança",
    polaridade: "Luz",
    tags: ["clareza", "esperança", "visibilidade", "inspiração"],
  },
  {
    id: "celtica-morrigan",
    tipo: "maior",
    baralho: "deuses",
    cultura: "celtica",
    nome: "Morrigan",
    arquetipo: "O Guerreiro",
    descricao:
      "Deusa da guerra e do destino, Morrigan é uma figura poderosa e misteriosa. Ela representa a inevitabilidade do destino e a coragem na batalha. Filosoficamente, Morrigan encarna o arquétipo do Guerreiro, que enfrenta desafios com determinação. Na vida moderna, ela nos inspira a enfrentar nossos medos e a aceitar nosso destino.",
    eixoPsicologico: "Coragem e Destino",
    polaridade: "Ambivalente",
    tags: ["coragem", "conflito", "destino", "força"],
  },
  // ... aqui, na integração final, adicionas todos os outros deuses originais
];

// --- Arcanos Menores (cenas / situações) – exemplos ---

const arcanosMenoresCenas = [
  {
    id: "menor-fluxo-emocional",
    tipo: "menor",
    baralho: "cenas",
    cultura: null,
    nome: "Fluxo Emocional",
    arquetipo: "Rios Internos",
    descricao:
      "Esta carta fala de emoções em movimento, sensibilidade ampliada e necessidade de acolher o que se sente sem julgamento. Representa momentos em que o coração se expressa com mais intensidade, pedindo espaço e escuta.",
    eixoPsicologico: "Emoções e Vínculos",
    polaridade: "Ambivalente",
    tags: ["emoções", "sensibilidade", "vínculos", "expressão"],
  },
  {
    id: "menor-conflito-mental",
    tipo: "menor",
    baralho: "cenas",
    cultura: null,
    nome: "Conflito Mental",
    arquetipo: "Espadas Cruzadas",
    descricao:
      "Indica pensamentos em conflito, dúvidas e narrativas internas que se chocam. A mente tenta resolver tudo pela lógica, mas pode criar labirintos em vez de clareza.",
    eixoPsicologico: "Pensamento e Decisão",
    polaridade: "Sombra",
    tags: ["dúvida", "excesso de pensamento", "decisão", "autocrítica"],
  },
  {
    id: "menor-estabilidade-material",
    tipo: "menor",
    baralho: "cenas",
    cultura: null,
    nome: "Estabilidade Material",
    arquetipo: "Base Concreta",
    descricao:
      "Fala de segurança, estrutura e recursos. Representa momentos em que é possível construir, consolidar ou cuidar da base material da vida.",
    eixoPsicologico: "Recursos e Estrutura",
    polaridade: "Luz",
    tags: ["segurança", "recursos", "trabalho", "base"],
  },
  {
    id: "menor-impulso-de-acao",
    tipo: "menor",
    baralho: "cenas",
    cultura: null,
    nome: "Impulso de Ação",
    arquetipo: "Faísca",
    descricao:
      "Sinaliza energia disponível para iniciar algo, coragem para o primeiro passo e entusiasmo que pede um canal criativo.",
    eixoPsicologico: "Ação e Iniciativa",
    polaridade: "Luz",
    tags: ["início", "coragem", "impulso", "criatividade"],
  },
  {
    id: "menor-repeticao-de-padrao",
    tipo: "menor",
    baralho: "cenas",
    cultura: null,
    nome: "Repetição de Padrão",
    arquetipo: "Círculo Fechado",
    descricao:
      "Mostra ciclos que se repetem, hábitos que voltam e situações que espelham histórias antigas. Aponta para a necessidade de consciência para quebrar o ciclo.",
    eixoPsicologico: "Hábitos e Padrões",
    polaridade: "Sombra",
    tags: ["padrão", "repetição", "hábito", "inconsciente"],
  },
];

/* ============================
   PESOS / CURADORIA
   ============================ */

const culturasPeso = {
  grega: 1.1,
  egipcia: 1.0,
  nordica: 1.0,
  hindu: 0.95,
  japonesa: 1.0,
  celtica: 0.95,
};

const pesoBaralhos = {
  maiores: 0.7,
  menores: 0.3,
};

/* ============================
   PADRÕES DE TIRAGEM
   ============================ */

const padroesTiragem = {
  1: [
    {
      id: "foco",
      nome: "Foco do momento",
      pergunta: "Qual é o núcleo arquetípico que está ativo na tua vida agora?",
      tipoEixo: "síntese",
    },
  ],
  2: [
    {
      id: "poloA",
      nome: "Polo A",
      pergunta: "Que força ou tendência está a puxar-te numa direção?",
      tipoEixo: "tensao",
    },
    {
      id: "poloB",
      nome: "Polo B",
      pergunta:
        "Que força ou tendência complementa ou desafia o primeiro polo?",
      tipoEixo: "tensao",
    },
  ],
  3: [
    {
      id: "passado",
      nome: "Passado",
      pergunta:
        "Que padrão arquetípico do passado ainda influencia o presente?",
      tipoEixo: "linha_do_tempo",
    },
    {
      id: "presente",
      nome: "Presente",
      pergunta: "Que energia arquetípica descreve o teu estado atual?",
      tipoEixo: "linha_do_tempo",
    },
    {
      id: "potencial",
      nome: "Potencial",
      pergunta:
        "Que caminho potencial se abre se continuares neste fluxo?",
      tipoEixo: "linha_do_tempo",
    },
  ],
  5: [
    {
      id: "situacao",
      nome: "Situação",
      pergunta: "Qual é o cenário arquetípico central que estás a viver?",
      tipoEixo: "mapa",
    },
    {
      id: "desafio",
      nome: "Desafio",
      pergunta:
        "Que força interna ou externa te desafia neste momento?",
      tipoEixo: "mapa",
    },
    {
      id: "recurso",
      nome: "Recurso",
      pergunta: "Que qualidade arquetípica está disponível para te apoiar?",
      tipoEixo: "mapa",
    },
    {
      id: "sombra",
      nome: "Sombra",
      pergunta: "Que aspecto negado ou inconsciente pede integração?",
      tipoEixo: "sombra",
    },
    {
      id: "direcao",
      nome: "Direção",
      pergunta:
        "Qual a direção possível se dialogares com estas forças?",
      tipoEixo: "mapa",
    },
  ],
  7: [
    {
      id: "origem",
      nome: "Origem",
      pergunta: "De onde nasce este processo na tua história?",
      tipoEixo: "linha_do_tempo",
    },
    {
      id: "presente",
      nome: "Estado atual",
      pergunta:
        "Como se manifesta hoje este arquétipo na tua vida?",
      tipoEixo: "linha_do_tempo",
    },
    {
      id: "bloqueio",
      nome: "Bloqueio",
      pergunta:
        "Que padrão impede o fluxo natural desta energia?",
      tipoEixo: "sombra",
    },
    {
      id: "aliado",
      nome: "Aliado interno",
      pergunta:
        "Que força dentro de ti pode acompanhar este processo?",
      tipoEixo: "recurso",
    },
    {
      id: "espelho",
      nome: "Espelho externo",
      pergunta:
        "Como o mundo à tua volta espelha este movimento?",
      tipoEixo: "relacao",
    },
    {
      id: "aprendizado",
      nome: "Aprendizado",
      pergunta:
        "Que aprendizagem profunda este ciclo oferece?",
      tipoEixo: "sentido",
    },
    {
      id: "proximo_passo",
      nome: "Próximo passo",
      pergunta:
        "Que gesto concreto pode honrar esta jornada agora?",
      tipoEixo: "acao",
    },
  ],
  9: [
    {
      id: "eu",
      nome: "Eu neste momento",
      pergunta: "Que arquétipo melhor descreve o teu centro atual?",
      tipoEixo: "identidade",
    },
    {
      id: "corpo",
      nome: "Corpo",
      pergunta: "Que mensagem o teu corpo traz para este processo?",
      tipoEixo: "somatico",
    },
    {
      id: "mente",
      nome: "Mente",
      pergunta: "Que narrativa mental está a dominar o cenário?",
      tipoEixo: "cognitivo",
    },
    {
      id: "emocao",
      nome: "Emoção",
      pergunta: "Que emoção arquetípica colore esta fase?",
      tipoEixo: "emocional",
    },
    {
      id: "relacao",
      nome: "Relações",
      pergunta:
        "Como os encontros com os outros entram neste quadro?",
      tipoEixo: "relacao",
    },
    {
      id: "trabalho",
      nome: "Obra / Trabalho",
      pergunta:
        "Que aspecto da tua obra ou propósito é tocado aqui?",
      tipoEixo: "proposito",
    },
    {
      id: "sombra",
      nome: "Sombra ativa",
      pergunta:
        "Que conteúdo inconsciente tenta emergir através desta situação?",
      tipoEixo: "sombra",
    },
    {
      id: "guia",
      nome: "Guia interno",
      pergunta:
        "Que sabedoria interna deseja orientar-te agora?",
      tipoEixo: "recurso",
    },
    {
      id: "sintese",
      nome: "Síntese da jornada",
      pergunta:
        "Que história maior estas cartas contam em conjunto?",
      tipoEixo: "síntese",
    },
  ],
  12: [
    {
      id: "fundamento",
      nome: "Fundamento",
      pergunta:
        "Que base arquetípica sustenta esta fase da tua vida?",
      tipoEixo: "linha_do_tempo",
    },
    {
      id: "passado_remoto",
      nome: "Passado remoto",
      pergunta: "Que padrão antigo ainda ressoa aqui?",
      tipoEixo: "linha_do_tempo",
    },
    {
      id: "passado_recente",
      nome: "Passado recente",
      pergunta:
        "Que evento ou processo recente reativou este arquétipo?",
      tipoEixo: "linha_do_tempo",
    },
    {
      id: "presente_externo",
      nome: "Contexto externo",
      pergunta:
        "Como o ambiente externo molda o teu momento atual?",
      tipoEixo: "relacao",
    },
    {
      id: "presente_interno",
      nome: "Estado interno",
      pergunta: "Que movimento interno te caracteriza agora?",
      tipoEixo: "identidade",
    },
    {
      id: "desafio",
      nome: "Desafio central",
      pergunta:
        "Qual o desafio arquetípico mais forte que se apresenta?",
      tipoEixo: "sombra",
    },
    {
      id: "recurso_consciente",
      nome: "Recurso consciente",
      pergunta:
        "Que recurso já reconheces em ti para lidar com isto?",
      tipoEixo: "recurso",
    },
    {
      id: "recurso_inconsciente",
      nome: "Recurso oculto",
      pergunta:
        "Que potencial ainda não reconhecido te apoia em silêncio?",
      tipoEixo: "recurso",
    },
    {
      id: "rota_A",
      nome: "Possível rota A",
      pergunta:
        "O que acontece se seguires o impulso atual sem mudanças?",
      tipoEixo: "futuro",
    },
    {
      id: "rota_B",
      nome: "Possível rota B",
      pergunta:
        "O que se abre se integrares os aprendizados desta tiragem?",
      tipoEixo: "futuro",
    },
    {
      id: "integracao",
      nome: "Integração",
      pergunta:
        "Que movimento de integração entre opostos é pedido aqui?",
      tipoEixo: "síntese",
    },
    {
      id: "bencao",
      nome: "Bênção oculta",
      pergunta:
        "Que dádiva profunda esta jornada traz, mesmo se desafiante?",
      tipoEixo: "sentido",
    },
  ],
};

/* ============================
   MECÂNICA DE BARALHO / TIRAGEM
   ============================ */

function filtrarCartaPorCultura(carta, cultura) {
  if (!cultura) return true;
  if (!carta.cultura) return true; // menores são neutras
  return carta.cultura === cultura;
}

function construirDeck(opcoes) {
  const { incluirMaiores, incluirMenores, culturaFoco } = opcoes;
  let deck = [];

  if (incluirMaiores) {
    deck = deck.concat(
      arcanosMaioresDeuses.filter((c) =>
        filtrarCartaPorCultura(c, culturaFoco)
      )
    );
  }

  if (incluirMenores) {
    deck = deck.concat(arcanosMenoresCenas);
  }

  return deck;
}

function sortearCartas(numCartas, opcoes) {
  const deck = construirDeck(opcoes);
  if (deck.length < numCartas) {
    console.warn("Deck insuficiente para tiragem:", deck.length, numCartas);
  }
  const embaralhado = shuffle(deck);
  return embaralhado.slice(0, numCartas);
}

/* ============================
   INTERPRETAÇÃO ARQUETÍPICA
   ============================ */

function interpretarCartaNaPosicao(carta, posicao) {
  if (!carta || !posicao) return "";

  const nome = carta.nome;
  const arqu = carta.arquetipo;
  const eixo = carta.eixoPsicologico;
  const polar = carta.polaridade;

  const base =
    `Na posição "${posicao.nome}", ${nome} manifesta o arquétipo de ${arqu}, ` +
    `trazendo à tona temas de ${eixo.toLowerCase()}.`;

  let camada = "";

  switch (posicao.tipoEixo) {
    case "linha_do_tempo":
      camada =
        " Esta carta ajuda a compreender a forma como o tempo e a tua história pessoal se cruzam com este arquétipo, mostrando ciclos que se repetem e possibilidades de renovação.";
      break;
    case "sombra":
      if (polar === "Sombra") {
        camada =
          " Aqui, a expressão na sombra torna-se evidente, sugerindo padrões inconscientes, medos ou impulsos que pedem reconhecimento e integração cuidadosa.";
      } else {
        camada =
          " Embora esta posição fale de sombra, a qualidade luminosa desta carta aponta recursos internos que podem apoiar a integração de conteúdos inconscientes.";
      }
      break;
    case "recurso":
      camada =
        " Nesta posição, a carta destaca competências, qualidades e apoios internos que podem ser mobilizados de forma consciente.";
      break;
    case "tensao":
      camada =
        " A carta atua como um polo de tensão, representando forças ou tendências que puxam a tua experiência numa direção específica e que pedem equilíbrio com outros aspectos da tiragem.";
      break;
    case "síntese":
      camada =
        " Nesta posição de síntese, o arquétipo funciona como fio condutor, ajudando a unir os diferentes elementos da tiragem numa narrativa coerente.";
      break;
    case "relacao":
      camada =
        " Aqui, o foco está nas relações, mostrando como este arquétipo se manifesta nos encontros com outras pessoas, em projeções e espelhamentos.";
      break;
    case "identidade":
      camada =
        " Esta posição enfatiza o modo como estás a identificar-te com este arquétipo, seja assumindo-o de forma consciente, seja lutando com ele internamente.";
      break;
    case "acao":
      camada =
        " O lugar desta carta sugere um convite à ação concreta, indicando atitudes que podem honrar o movimento interno que ela representa.";
      break;
    case "futuro":
      camada =
        " Nesta posição, a carta aponta linhas de possibilidade futura, não como destino fixo, mas como cenário provável se certas tendências forem mantidas ou transformadas.";
      break;
    case "somatico":
      camada =
        " A leitura aqui aproxima o arquétipo da experiência do corpo, sinalizando sensações, cansaços ou vitalidades que contam parte da história.";
      break;
    case "cognitivo":
      camada =
        " Esta posição foca o plano mental, revelando narrativas, crenças e padrões de pensamento associados a este arquétipo.";
      break;
    case "emocional":
      camada =
        " Aqui, a ênfase está na textura emocional, nas atmosferas afetivas e nos modos de sentir que acompanham este símbolo.";
      break;
    case "proposito":
      camada =
        " Esta carta conversa com a tua obra e propósito, indicando como este arquétipo atravessa o que escolhes construir no mundo.";
      break;
    case "sentido":
      camada =
        " Esta posição convida a perceber o sentido mais profundo da experiência, aquilo que permanece como aprendizado ou bênção, mesmo através de desafios.";
      break;
    default:
      camada =
        " Esta posição amplia o diálogo com o arquétipo, oferecendo um ângulo específico de leitura que complementa o restante da tiragem.";
  }

  return base + camada;
}

function sintetizarTiragem(cartas, padraoPosicoes) {
  if (!cartas || cartas.length === 0) return "";

  const total = cartas.length;

  const contador = {
    Luz: 0,
    Sombra: 0,
    Ambivalente: 0,
  };

  const eixos = {};

  cartas.forEach((carta) => {
    if (contador[carta.polaridade] !== undefined) {
      contador[carta.polaridade] += 1;
    }
    const eixo = carta.eixoPsicologico;
    if (!eixos[eixo]) eixos[eixo] = 0;
    eixos[eixo] += 1;
  });

  const eixoPrincipal = Object.entries(eixos).sort((a, b) => b[1] - a[1])[0];
  const eixoNome = eixoPrincipal ? eixoPrincipal[0] : "um conjunto de temas diversos";

  const luzPct = Math.round((contador.Luz / total) * 100);
  const sombraPct = Math.round((contador.Sombra / total) * 100);

  let polarTexto = "";
  if (sombraPct > luzPct + 15) {
    polarTexto =
      "Há uma presença marcante de conteúdos de sombra, sugerindo um momento propício para reconhecer padrões inconscientes e trabalhar integração com cuidado.";
  } else if (luzPct > sombraPct + 15) {
    polarTexto =
      "Predominam expressões luminosas dos arquétipos, indicando que recursos internos e qualidades construtivas estão particularmente disponíveis.";
  } else {
    polarTexto =
      "A tiragem apresenta um equilíbrio entre luz e sombra, convidando a um olhar que inclua tanto potenciais quanto vulnerabilidades.";
  }

  const tipoSintese =
    padraoPosicoes && padraoPosicoes.some((p) => p.tipoEixo === "síntese")
      ? "Em conjunto, estas cartas"
      : "No conjunto, esta tiragem";

  const texto =
    `${tipoSintese} enfatizam sobretudo o eixo de ${eixoNome.toLowerCase()}, ` +
    `indicando que este é o campo principal de movimento na tua jornada neste momento. ` +
    `${polarTexto}`;

  return texto;
}

/* ============================
   ESTADO GLOBAL DA APP
   ============================ */

const AppState = {
  culturaSelecionada: null, // definida pela Roda da Fortuna
  tipoTiragem: 3,
  modoBaralho: "maiores", // "maiores" | "mistos"
  cartasAtuais: [],
  padraoAtual: [],
};

/* ============================
   ECRÃS E LAYOUT (SEM SCROLL)
   ============================ */

const screenWheel = $("#screen-wheel");
const screenSetup = $("#screen-setup");
const screenSpread = $("#screen-spread");
const screenSummary = $("#screen-summary");

function mostrarScreen(targetId) {
  const allScreens = [screenWheel, screenSetup, screenSpread, screenSummary];
  allScreens.forEach((el) => {
    if (!el) return;
    if (el.id === targetId) {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
    }
  });
}

/* ============================
   RODA DA FORTUNA (CULTURAS)
   ============================ */

const rodaCanvas = $("#wheel-canvas");
const rodaButton = $("#btn-wheel-spin");
const rodaResultado = $("#wheel-result");

let rodaGirando = false;
let rodaAngulo = 0;
let rodaVelocidade = 0;

const culturasOrdem = ["grega", "egipcia", "nordica", "hindu", "japonesa", "celtica"];

function desenharRoda(ctx, width, height, angulo) {
  const radius = Math.min(width, height) / 2 - 10;
  const cx = width / 2;
  const cy = height / 2;
  const slice = (2 * Math.PI) / culturasOrdem.length;

  ctx.clearRect(0, 0, width, height);

  culturasOrdem.forEach((cultura, index) => {
    const start = angulo + index * slice;
    const end = start + slice;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, end);
    ctx.closePath();

    const corBase = {
      grega: "#2c3e50",
      egipcia: "#8e7b5b",
      nordica: "#4a6fa5",
      hindu: "#c95f3d",
      japonesa: "#bd3d3a",
      celtica: "#3b7d4a",
    }[cultura] || "#2c3e50";

    ctx.fillStyle = corBase;
    ctx.fill();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(start + slice / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#f7f7f7";
    ctx.font = "12px 'Times New Roman', serif";
    ctx.fillText(cultura.toUpperCase(), radius - 10, 4);
    ctx.restore();
  });

  // Indicador topo
  ctx.beginPath();
  ctx.moveTo(cx, cy - radius - 8);
  ctx.lineTo(cx + 8, cy - radius - 24);
  ctx.lineTo(cx - 8, cy - radius - 24);
  ctx.closePath();
  ctx.fillStyle = "#d4b192";
  ctx.fill();
}

function animarRoda() {
  if (!rodaCanvas || !rodaGirando) return;
  const ctx = rodaCanvas.getContext("2d");
  const { width, height } = rodaCanvas;

  rodaAngulo += rodaVelocidade;
  rodaVelocidade *= 0.985; // desaceleração

  if (rodaVelocidade < 0.002) {
    rodaGirando = false;
    rodaVelocidade = 0;

    const slice = (2 * Math.PI) / culturasOrdem.length;
    const offset = Math.PI / 2; // indicador no topo
    let idx = Math.floor(
      ((2 * Math.PI - (rodaAngulo + offset)) % (2 * Math.PI)) / slice
    );
    if (idx < 0) idx += culturasOrdem.length;
    const culturaEscolhida = culturasOrdem[idx];

    AppState.culturaSelecionada = culturaEscolhida;
    if (rodaResultado) {
      rodaResultado.textContent =
        "Cultura selecionada: " + culturaEscolhida.toUpperCase();
    }
    if (rodaButton) rodaButton.disabled = false;

    return;
  }

  desenharRoda(ctx, width, height, rodaAngulo);
  requestAnimationFrame(animarRoda);
}

function iniciarRoda() {
  if (!rodaCanvas) return;
  const ctx = rodaCanvas.getContext("2d");
  rodaCanvas.width = rodaCanvas.offsetWidth;
  rodaCanvas.height = rodaCanvas.offsetHeight;
  desenharRoda(ctx, rodaCanvas.width, rodaCanvas.height, rodaAngulo);
}

if (rodaButton && rodaCanvas) {
  rodaButton.addEventListener("click", () => {
    if (rodaGirando) return;
    rodaGirando = true;
    rodaVelocidade = 0.3 + Math.random() * 0.1;

    // partículas quânticas básicas (classe CSS a ser adicionada em cards layout)
    if (rodaResultado) rodaResultado.textContent = "A roda está em movimento...";

    rodaButton.disabled = true;
    animarRoda();
  });
}

/* ============================
   CONFIGURAÇÃO DA TIRAGEM
   ============================ */

const selectNumCartas = $("#select-num-cartas");
const selectTipoBaralho = $("#select-tipo-baralho");
const btnIrParaTiragem = $("#btn-ir-tiragem");
const helpTiragemBtn = $("#btn-help-tiragem");
const helpTiragemModal = $("#modal-help-tiragem");
const helpTiragemFechar = $("#modal-help-tiragem-fechar");

if (helpTiragemBtn && helpTiragemModal && helpTiragemFechar) {
  helpTiragemBtn.addEventListener("click", () => {
    helpTiragemModal.classList.remove("hidden");
  });
  helpTiragemFechar.addEventListener("click", () => {
    helpTiragemModal.classList.add("hidden");
  });
}

if (btnIrParaTiragem && selectNumCartas && selectTipoBaralho) {
  btnIrParaTiragem.addEventListener("click", () => {
    const num = parseInt(selectNumCartas.value, 10);
    const tipoBaralho = selectTipoBaralho.value;

    if (!padroesTiragem[num]) {
      alert("Tiragem não suportada.");
      return;
    }

    AppState.tipoTiragem = num;
    AppState.modoBaralho = tipoBaralho;

    const incluirMaiores = tipoBaralho === "maiores" || tipoBaralho === "mistos";
    const incluirMenores = tipoBaralho === "menores" || tipoBaralho === "mistos";

    const cartas = sortearCartas(num, {
      incluirMaiores,
      incluirMenores,
      culturaFoco: AppState.culturaSelecionada,
    });

    const padrao = padroesTiragem[num];

    AppState.cartasAtuais = cartas;
    AppState.padraoAtual = padrao;

    renderSpread(cartas, padrao);
    mostrarScreen("screen-spread");
  });
}

/* ============================
   ECRÃ DE TIRAGEM (GRELHA)
   ============================ */

const spreadGrid = $("#spread-grid");
const spreadFocusName = $("#spread-focus-name");
const spreadFocusArquetipo = $("#spread-focus-arquetipo");
const spreadFocusTexto = $("#spread-focus-texto");
const spreadFocusPergunta = $("#spread-focus-pergunta");
const spreadResumo = $("#spread-resumo");

const btnVerDescricaoCompleta = $("#btn-descricao-completa");
const modalDescricaoCompleta = $("#modal-descricao-completa");
const modalDescricaoTexto = $("#modal-descricao-texto");
const modalDescricaoFechar = $("#modal-descricao-fechar");

const btnNovaTiragem = $("#btn-nova-tiragem");
const btnIrParaResumo = $("#btn-ir-resumo");

if (modalDescricaoFechar && modalDescricaoCompleta) {
  modalDescricaoFechar.addEventListener("click", () => {
    modalDescricaoCompleta.classList.add("hidden");
  });
}

if (btnNovaTiragem) {
  btnNovaTiragem.addEventListener("click", () => {
    mostrarScreen("screen-setup");
  });
}

if (btnIrParaResumo) {
  btnIrParaResumo.addEventListener("click", () => {
    renderSummary();
    mostrarScreen("screen-summary");
  });
}

function renderSpread(cartas, padrao) {
  if (!spreadGrid) return;

  spreadGrid.innerHTML = "";

  cartas.forEach((carta, index) => {
    const pos = padrao[index];
    const cardEl = document.createElement("button");
    cardEl.className = "card-slot card-slot-virada";
    cardEl.setAttribute("data-index", String(index));
    cardEl.setAttribute("type", "button");
    cardEl.innerHTML = `
      <div class="card-back-quantum"></div>
      <div class="card-label">${pos ? pos.nome : "Carta " + (index + 1)}</div>
    `;
    // animação quântica via CSS (ex.: .card-back-quantum com keyframes)
    cardEl.addEventListener("click", () => {
      focarCarta(index);
    });
    spreadGrid.appendChild(cardEl);
  });

  if (cartas[0]) {
    focarCarta(0);
  }

  const resumoTexto = sintetizarTiragem(cartas, padrao);
  if (spreadResumo) {
    spreadResumo.textContent = resumoTexto;
  }
}

function focarCarta(index) {
  const carta = AppState.cartasAtuais[index];
  const posicao = AppState.padraoAtual[index];
  if (!carta || !posicao) return;

  if (spreadFocusName) {
    spreadFocusName.textContent = carta.nome;
  }
  if (spreadFocusArquetipo) {
    spreadFocusArquetipo.textContent = carta.arquetipo;
  }
  if (spreadFocusPergunta) {
    spreadFocusPergunta.textContent = posicao.pergunta;
  }

  const interpretacao = interpretarCartaNaPosicao(carta, posicao);
  if (spreadFocusTexto) {
    spreadFocusTexto.textContent = interpretacao;
  }

  if (btnVerDescricaoCompleta && modalDescricaoCompleta && modalDescricaoTexto) {
    btnVerDescricaoCompleta.onclick = () => {
      modalDescricaoTexto.textContent = carta.descricao;
      modalDescricaoCompleta.classList.remove("hidden");
    };
  }

  if (spreadGrid) {
    $all(".card-slot", spreadGrid).forEach((el) =>
      el.classList.remove("card-slot-ativa")
    );
    const cardEl = spreadGrid.querySelector(`.card-slot[data-index="${index}"]`);
    if (cardEl) {
      cardEl.classList.add("card-slot-ativa");
      cardEl.classList.remove("card-slot-virada");
      cardEl.classList.add("card-slot-revelada");
    }
  }
}

/* ============================
   ECRÃ DE RESUMO / DIÁRIO
   ============================ */

const summaryTexto = $("#summary-texto");
const summaryNotas = $("#summary-notas");
const summarySalvar = $("#summary-salvar");
const summaryVoltarInicio = $("#summary-voltar-inicio");

function gerarResumoNarrativo(cartas, padrao) {
  const base = sintetizarTiragem(cartas, padrao);
  const detalhes = cartas
    .map((carta, index) => {
      const pos = padrao[index];
      return `${pos.nome}: ${carta.nome} (${carta.arquetipo})`;
    })
    .join(" | ");
  return `${base} Nesta tiragem, as posições e cartas foram: ${detalhes}.`;
}

function renderSummary() {
  if (!summaryTexto) return;
  const texto = gerarResumoNarrativo(
    AppState.cartasAtuais,
    AppState.padraoAtual
  );
  summaryTexto.textContent = texto;

  if (summaryNotas) {
    const chave = "jm-notas";
    const notas = localStorage.getItem(chave);
    summaryNotas.value = notas || "";
    if (summarySalvar) {
      summarySalvar.onclick = () => {
        localStorage.setItem(chave, summaryNotas.value);
      };
    }
  }
}

if (summaryVoltarInicio) {
  summaryVoltarInicio.addEventListener("click", () => {
    mostrarScreen("screen-wheel");
  });
}

/* ============================
   INICIALIZAÇÃO GERAL
   ============================ */

document.addEventListener("DOMContentLoaded", () => {
  iniciarRoda();
  mostrarScreen("screen-wheel");
});
