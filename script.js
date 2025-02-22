    // ============ SISTEMA DE MENU ============
    const menuIcon = document.getElementById("menuIcon");
    const menu = document.getElementById("menu");

    menuIcon.addEventListener("click", function(e) {
        e.stopPropagation();
        menu.classList.toggle("active");
        menuIcon.classList.toggle("active");
    });

    document.addEventListener("click", function(e) {
        if (!menu.contains(e.target) && !menuIcon.contains(e.target)) {
            menu.classList.remove("active");
            menuIcon.classList.remove("active");
        }
    });

    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-3px)";
        });
        item.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0)";
        });
    });

    const culturas = {
        grega: [
            { 
                nome: "Zeus", 
                descricao: "Rei dos deuses, Zeus personifica o poder supremo e a autoridade divina. Ele governa o Olimpo e decide o destino dos mortais e dos deuses. Filosoficamente, Zeus representa a busca pelo controle e a responsabilidade de liderar, refletindo o arquétipo do Líder. Na vida moderna, ele simboliza a necessidade de equilibrar poder e justiça, lembrando-nos de que a verdadeira liderança vem com a sabedoria de usar o poder para o bem comum.", 
                arquetipo: "O Líder" 
            },
            { 
                nome: "Atena", 
                descricao: "Deusa da sabedoria e da guerra estratégica, Atena nasceu da mente de Zeus, já adulta e armada. Ela representa a inteligência aplicada, a razão e a estratégia. Filosoficamente, Atena encarna o arquétipo do Estrategista, que valoriza o planejamento e a sabedoria sobre a força bruta. Na vida moderna, ela nos inspira a resolver conflitos com inteligência e a buscar soluções criativas para os desafios do dia a dia.", 
                arquetipo: "O Estrategista" 
            },
            { 
                nome: "Hades", 
                descricao: "Deus do submundo, Hades governa o reino dos mortos, um lugar de transformação e renascimento. Ele simboliza o desconhecido e o inevitável ciclo da vida e da morte. Filosoficamente, Hades representa o arquétipo do Transformador, que nos convida a enfrentar nossos medos e a abraçar mudanças profundas. Na vida moderna, ele nos lembra de que a transformação pessoal muitas vezes começa ao enfrentarmos nossos 'infernos' internos.", 
                arquetipo: "O Transformador" 
            },
            { 
                nome: "Poseidon", 
                descricao: "Deus dos mares e dos terremotos, Poseidon é uma força poderosa e imprevisível. Ele representa o poder da natureza e a necessidade de respeito pelo mundo natural. Filosoficamente, Poseidon encarna o arquétipo do Destruidor-Criador, que destrói para renovar. Na vida moderna, ele nos lembra de que mudanças drásticas podem ser necessárias para criar algo novo e melhor.", 
                arquetipo: "O Destruidor-Criador" 
            },
            { 
                nome: "Afrodite", 
                descricao: "Deusa do amor e da beleza, Afrodite personifica a atração e a conexão entre os seres. Ela representa a força unificadora do amor e a importância da harmonia. Filosoficamente, Afrodite encarna o arquétipo do Amante, que busca união e beleza em todas as coisas. Na vida moderna, ela nos inspira a valorizar relacionamentos e a buscar a beleza em nosso cotidiano.", 
                arquetipo: "O Amante" 
            },
            { 
                nome: "Apolo", 
                descricao: "Deus da luz, da música e da cura, Apolo é um símbolo de perfeição e harmonia. Ele representa a busca pela verdade e pela expressão artística. Filosoficamente, Apolo encarna o arquétipo do Artista, que busca criar e inspirar através da beleza. Na vida moderna, ele nos lembra da importância da criatividade e da cura através da arte.", 
                arquetipo: "O Artista" 
            },
            { 
                nome: "Ártemis", 
                descricao: "Deusa da caça e da lua, Ártemis é uma protetora da natureza e da independência feminina. Ela representa a força e a liberdade. Filosoficamente, Ártemis encarna o arquétipo da Caçadora, que busca autonomia e conexão com o selvagem. Na vida moderna, ela nos inspira a defender nossos espaços e a buscar nossa independência.", 
                arquetipo: "A Caçadora" 
            },
            { 
                nome: "Hermes", 
                descricao: "Deus dos viajantes e mensageiro dos deuses, Hermes é um símbolo de comunicação e adaptabilidade. Ele representa a capacidade de transitar entre diferentes mundos e realidades. Filosoficamente, Hermes encarna o arquétipo do Comunicador, que facilita a troca de ideias e conhecimentos. Na vida moderna, ele nos lembra da importância da comunicação clara e da adaptação às mudanças.", 
                arquetipo: "O Comunicador" 
            },
            { 
                nome: "Dionísio", 
                descricao: "Deus do vinho e da festa, Dionísio representa a celebração da vida e a liberação das inibições. Ele simboliza a busca pelo prazer e pela liberdade. Filosoficamente, Dionísio encarna o arquétipo do Libertador, que nos convida a viver plenamente e a abraçar nossa natureza selvagem. Na vida moderna, ele nos lembra de que a vida deve ser celebrada, mas com equilíbrio.", 
                arquetipo: "O Libertador" 
            }
        ],
        egipcia: [
            { 
                nome: "Rá", 
                descricao: "Deus do sol, Rá é o criador do mundo e a fonte de toda a vida. Ele viaja pelo céu durante o dia e pelo submundo à noite, simbolizando o ciclo eterno de nascimento, morte e renascimento. Filosoficamente, Rá representa o arquétipo do Criador, que traz luz e ordem ao caos. Na vida moderna, ele nos inspira a buscar propósito e a iluminar nosso caminho com criatividade e determinação.", 
                arquetipo: "O Criador" 
            },
            { 
                nome: "Anúbis", 
                descricao: "Deus dos mortos e guia das almas, Anúbis é o protetor dos túmulos e o juiz dos mortos. Ele simboliza a transição entre a vida e a morte, oferecendo orientação e proteção. Filosoficamente, Anúbis encarna o arquétipo do Guia, que nos ajuda a navegar por momentos de incerteza e mudança. Na vida moderna, ele nos lembra da importância de confiar em nossa intuição e de buscar orientação em tempos de crise.", 
                arquetipo: "O Guia" 
            },
            { 
                nome: "Ísis", 
                descricao: "Deusa da magia e da maternidade, Ísis é a protetora dos necessitados e a cuidadora da vida. Ela representa o poder do amor incondicional e da cura. Filosoficamente, Ísis personifica o arquétipo do Cuidador, que nutre e protege aqueles ao seu redor. Na vida moderna, ela nos ensina a importância da compaixão, do cuidado com os outros e da conexão com o sagrado feminino.", 
                arquetipo: "O Cuidador" 
            },
            { 
                nome: "Osíris", 
                descricao: "Deus da ressurreição e da vida após a morte, Osíris simboliza a esperança e a renovação. Ele representa a vitória da vida sobre a morte. Filosoficamente, Osíris encarna o arquétipo do Renovador, que nos ensina a superar perdas e a encontrar novas oportunidades. Na vida moderna, ele nos inspira a perseverar e a encontrar significado mesmo nas adversidades.", 
                arquetipo: "O Renovador" 
            },
            { 
                nome: "Hórus", 
                descricao: "Deus do céu e da realeza, Hórus é um símbolo de proteção e justiça. Ele representa a luta pelo equilíbrio e pela ordem. Filosoficamente, Hórus encarna o arquétipo do Justiceiro, que busca restaurar a harmonia e a justiça. Na vida moderna, ele nos lembra da importância de lutar pelo que é certo e de proteger os mais vulneráveis.", 
                arquetipo: "O Justiceiro" 
            },
            { 
                nome: "Toth", 
                descricao: "Deus da sabedoria e da escrita, Toth é o guardião do conhecimento e da magia. Ele representa o poder da palavra e do pensamento. Filosoficamente, Toth encarna o arquétipo do Sábio, que valoriza o conhecimento e a comunicação. Na vida moderna, ele nos inspira a buscar aprendizado e a usar o conhecimento para o bem comum.", 
                arquetipo: "O Sábio" 
            },
            { 
                nome: "Bastet", 
                descricao: "Deusa da proteção e dos gatos, Bastet é uma figura maternal e protetora. Ela representa a dualidade entre doçura e ferocidade. Filosoficamente, Bastet encarna o arquétipo do Protetor, que cuida e defende aqueles que ama. Na vida moderna, ela nos lembra da importância de proteger nossa família e nosso espaço pessoal.", 
                arquetipo: "O Protetor" 
            },
            { 
                nome: "Sekhmet", 
                descricao: "Deusa da guerra e da cura, Sekhmet é uma força poderosa e destrutiva, mas também curativa. Ela representa a dualidade entre destruição e renovação. Filosoficamente, Sekhmet encarna o arquétipo do Destruidor-Criador, que destrói para renovar. Na vida moderna, ela nos ensina a enfrentar nossos medos e a transformar a dor em cura.", 
                arquetipo: "O Destruidor-Criador" 
            }
        ],
        nordica: [
            { 
                nome: "Odin", 
                descricao: "Pai de todos e deus da sabedoria e da guerra, Odin é um líder sábio e visionário. Ele sacrificou um olho para beber da fonte do conhecimento, simbolizando a busca pela sabedoria a qualquer custo. Filosoficamente, Odin representa o arquétipo do Sábio, que valoriza o conhecimento e a compreensão profunda. Na vida moderna, ele nos inspira a buscar aprendizado constante e a usar nossa sabedoria para guiar nossas ações.", 
                arquetipo: "O Sábio" 
            },
            { 
                nome: "Thor", 
                descricao: "Deus do trovão, Thor é o protetor dos deuses e dos humanos. Ele usa seu martelo, Mjölnir, para defender o mundo das forças do caos. Filosoficamente, Thor encarna o arquétipo do Protetor, que luta pela justiça e pela segurança dos outros. Na vida moderna, ele nos lembra da importância de defender o que é certo e de usar nossa força para proteger aqueles que amamos.", 
                arquetipo: "O Protetor" 
            },
            { 
                nome: "Loki", 
                descricao: "Deus da trapaça e da mudança, Loki é uma figura complexa e imprevisível. Ele desafia as normas e traz caos, mas também é um agente de transformação. Filosoficamente, Loki representa o arquétipo do Transformador, que quebra padrões e abre caminho para novas possibilidades. Na vida moderna, ele nos ensina a abraçar a incerteza e a ver o caos como uma oportunidade para crescimento e renovação.", 
                arquetipo: "O Transformador" 
            },
            { 
                nome: "Freya", 
                descricao: "Deusa do amor, da beleza e da guerra, Freya é uma figura poderosa e multifacetada. Ela representa a força do amor e a coragem na batalha. Filosoficamente, Freya encarna o arquétipo do Amante-Guerreiro, que busca equilibrar paixão e força. Na vida moderna, ela nos inspira a amar intensamente e a lutar por nossos valores.", 
                arquetipo: "O Amante-Guerreiro" 
            },
            { 
                nome: "Freyr", 
                descricao: "Deus da fertilidade e da prosperidade, Freyr é um símbolo de abundância e paz. Ele representa a conexão com a natureza e a celebração da vida. Filosoficamente, Freyr encarna o arquétipo do Provedor, que busca trazer harmonia e prosperidade. Na vida moderna, ele nos lembra da importância de cuidar da Terra e de celebrar as bênçãos da vida.", 
                arquetipo: "O Provedor" 
            },
            { 
                nome: "Heimdall", 
                descricao: "Guardião da ponte Bifrost, Heimdall é um vigia atento e protetor. Ele representa a vigilância e a preparação. Filosoficamente, Heimdall encarna o arquétipo do Guardião, que está sempre alerta e pronto para agir. Na vida moderna, ele nos inspira a estar preparados para os desafios e a proteger o que é importante para nós.", 
                arquetipo: "O Guardião" 
            },
            { 
                nome: "Tyr", 
                descricao: "Deus da guerra e da justiça, Tyr é um símbolo de coragem e sacrifício. Ele perdeu uma mão para acorrentar o lobo Fenrir, mostrando sua disposição para o sacrifício pelo bem maior. Filosoficamente, Tyr encarna o arquétipo do Mártir, que se sacrifica pela justiça e pela ordem. Na vida moderna, ele nos lembra da importância de lutar por causas maiores, mesmo que isso exija sacrifício.", 
                arquetipo: "O Mártir" 
            },
            { 
                nome: "Hel", 
                descricao: "Deusa do submundo, Hel governa o reino dos mortos. Ela representa a aceitação da morte e a compreensão do ciclo da vida. Filosoficamente, Hel encarna o arquétipo do Aceitador, que nos ensina a lidar com perdas e a encontrar paz na inevitabilidade da morte. Na vida moderna, ela nos ajuda a aceitar as mudanças e a encontrar significado na impermanência.", 
                arquetipo: "O Aceitador" 
            }
        ],
        hindu: [
            { 
                nome: "Brahma", 
                descricao: "O criador do universo, Brahma representa a força criativa e a origem de todas as coisas. Ele simboliza a busca pelo conhecimento e pela compreensão do cosmos. Filosoficamente, Brahma encarna o arquétipo do Criador, que traz ordem ao caos. Na vida moderna, ele nos inspira a buscar significado e a criar algo duradouro.", 
                arquetipo: "O Criador" 
            },
            { 
                nome: "Vishnu", 
                descricao: "O preservador do universo, Vishnu mantém a ordem e a harmonia. Ele representa a estabilidade e a proteção. Filosoficamente, Vishnu encarna o arquétipo do Preservador, que busca manter o equilíbrio. Na vida moderna, ele nos lembra da importância de cuidar do que temos e de proteger o que é valioso.", 
                arquetipo: "O Preservador" 
            },
            { 
                nome: "Shiva", 
                descricao: "O destruidor e transformador, Shiva representa a destruição necessária para a renovação. Ele simboliza a mudança e a libertação. Filosoficamente, Shiva encarna o arquétipo do Transformador, que nos convida a abraçar o caos para encontrar a renovação. Na vida moderna, ele nos ensina a aceitar o fim de ciclos e a buscar novos começos.", 
                arquetipo: "O Transformador" 
            },
            { 
                nome: "Lakshmi", 
                descricao: "Deusa da riqueza e da prosperidade, Lakshmi representa a abundância e a generosidade. Ela simboliza a busca pela felicidade material e espiritual. Filosoficamente, Lakshmi encarna o arquétipo do Provedor, que traz bênçãos e abundância. Na vida moderna, ela nos inspira a buscar equilíbrio entre riqueza material e espiritual.", 
                arquetipo: "O Provedor" 
            },
            { 
                nome: "Ganesha", 
                descricao: "Deus da sabedoria e removedor de obstáculos, Ganesha é um símbolo de inteligência e superação. Ele representa a capacidade de superar desafios. Filosoficamente, Ganesha encarna o arquétipo do Solucionador, que nos ajuda a encontrar caminhos onde parecia não haver saída. Na vida moderna, ele nos inspira a enfrentar desafios com sabedoria e determinação.", 
                arquetipo: "O Solucionador" 
            },
            { 
                nome: "Kali", 
                descricao: "Deusa da destruição e da transformação, Kali é uma força poderosa e assustadora. Ela representa a destruição do ego e a libertação. Filosoficamente, Kali encarna o arquétipo do Destruidor, que nos convida a enfrentar nossos medos e a nos libertar de ilusões. Na vida moderna, ela nos ensina a abraçar a mudança radical e a encontrar força na adversidade.", 
                arquetipo: "O Destruidor" 
            },
            { 
                nome: "Saraswati", 
                descricao: "Deusa do conhecimento e das artes, Saraswati representa a busca pela sabedoria e pela expressão criativa. Ela simboliza a importância da educação e da cultura. Filosoficamente, Saraswati encarna o arquétipo do Sábio, que valoriza o conhecimento e a criatividade. Na vida moderna, ela nos inspira a buscar aprendizado e a expressar nossa criatividade.", 
                arquetipo: "O Sábio" 
            },
            { 
                nome: "Hanuman", 
                descricao: "Deus da devoção e da força, Hanuman é um símbolo de lealdade e coragem. Ele representa a força física e espiritual. Filosoficamente, Hanuman encarna o arquétipo do Devoto, que dedica sua vida a um propósito maior. Na vida moderna, ele nos inspira a ser leais e a usar nossa força para o bem comum.", 
                arquetipo: "O Devoto" 
            }
        ],
        japonesa: [
            { 
                nome: "Amaterasu", 
                descricao: "Deusa do sol e do universo, Amaterasu é a fonte de toda a vida e luz. Ela representa a esperança e a renovação. Filosoficamente, Amaterasu encarna o arquétipo do Iluminador, que traz luz ao mundo. Na vida moderna, ela nos inspira a buscar clareza e a iluminar o caminho para os outros.", 
                arquetipo: "O Iluminador" 
            },
            { 
                nome: "Susanoo", 
                descricao: "Deus das tempestades e do mar, Susanoo é uma figura imprevisível e poderosa. Ele representa a força da natureza e a necessidade de adaptação. Filosoficamente, Susanoo encarna o arquétipo do Caótico, que traz mudanças e desafios. Na vida moderna, ele nos lembra de que o caos pode ser uma oportunidade para crescimento.", 
                arquetipo: "O Caótico" 
            },
            { 
                nome: "Tsukuyomi", 
                descricao: "Deus da lua, Tsukuyomi representa a introspecção e a reflexão. Ele simboliza a busca pelo autoconhecimento. Filosoficamente, Tsukuyomi encarna o arquétipo do Reflexivo, que nos convida a olhar para dentro. Na vida moderna, ele nos inspira a buscar equilíbrio entre ação e introspecção.", 
                arquetipo: "O Reflexivo" 
            },
            { 
                nome: "Izanagi", 
                descricao: "Deus da criação, Izanagi é o criador das ilhas do Japão e dos primeiros deuses. Ele representa a força criativa e a origem da vida. Filosoficamente, Izanagi encarna o arquétipo do Criador, que traz ordem ao caos. Na vida moderna, ele nos inspira a criar e a dar forma aos nossos sonhos.", 
                arquetipo: "O Criador" 
            },
            { 
                nome: "Izanami", 
                descricao: "Deusa da criação e da morte, Izanami é a mãe de todos os deuses e seres. Ela representa o ciclo da vida e da morte. Filosoficamente, Izanami encarna o arquétipo da Mãe, que nutre e protege. Na vida moderna, ela nos lembra da importância de cuidar daqueles que amamos e de aceitar o ciclo natural da vida.", 
                arquetipo: "A Mãe" 
            },
            { 
                nome: "Raijin", 
                descricao: "Deus do trovão, Raijin é uma figura poderosa e temida. Ele representa a força da natureza e o poder destrutivo. Filosoficamente, Raijin encarna o arquétipo do Destruidor, que traz mudanças radicais. Na vida moderna, ele nos ensina a respeitar as forças da natureza e a enfrentar desafios com coragem.", 
                arquetipo: "O Destruidor" 
            },
            { 
                nome: "Fujin", 
                descricao: "Deus do vento, Fujin é uma figura imprevisível e poderosa. Ele representa a liberdade e a mudança. Filosoficamente, Fujin encarna o arquétipo do Libertador, que nos convida a abraçar a mudança. Na vida moderna, ele nos inspira a ser flexíveis e a aceitar o fluxo da vida.", 
                arquetipo: "O Libertador" 
            },
            { 
                nome: "Benzaiten", 
                descricao: "Deusa das artes e da música, Benzaiten representa a criatividade e a expressão artística. Ela simboliza a busca pela beleza e pela harmonia. Filosoficamente, Benzaiten encarna o arquétipo do Artista, que busca criar e inspirar. Na vida moderna, ela nos inspira a expressar nossa criatividade e a buscar a beleza em todas as coisas.", 
                arquetipo: "O Artista" 
            }
        ],
        celtica: [
            { 
                nome: "Dagda", 
                descricao: "O pai dos deuses, Dagda é um símbolo de força e sabedoria. Ele representa a liderança e a proteção. Filosoficamente, Dagda encarna o arquétipo do Líder, que guia e protege seu povo. Na vida moderna, ele nos inspira a assumir responsabilidades e a liderar com sabedoria.", 
                arquetipo: "O Líder" 
            },
            { 
                nome: "Morrigan", 
                descricao: "Deusa da guerra e do destino, Morrigan é uma figura poderosa e misteriosa. Ela representa a inevitabilidade do destino e a coragem na batalha. Filosoficamente, Morrigan encarna o arquétipo do Guerreiro, que enfrenta desafios com determinação. Na vida moderna, ela nos inspira a enfrentar nossos medos e a aceitar nosso destino.", 
                arquetipo: "O Guerreiro" 
            },
            { 
                nome: "Brigid", 
                descricao: "Deusa do fogo, da cura e da poesia, Brigid é uma figura multifacetada. Ela representa a criatividade e a cura. Filosoficamente, Brigid encarna o arquétipo do Curador, que traz luz e cura ao mundo. Na vida moderna, ela nos inspira a buscar cura e a expressar nossa criatividade.", 
                arquetipo: "O Curador" 
            },
            { 
                nome: "Lugh", 
                descricao: "Deus da luz e das habilidades, Lugh é um símbolo de talento e versatilidade. Ele representa a busca pela excelência. Filosoficamente, Lugh encarna o arquétipo do Artesão, que busca perfeição em tudo o que faz. Na vida moderna, ele nos inspira a desenvolver nossas habilidades e a buscar a excelência.", 
                arquetipo: "O Artesão" 
            },
            { 
                nome: "Cernunnos", 
                descricao: "Deus da natureza e dos animais, Cernunnos é um símbolo de conexão com a terra. Ele representa a harmonia com o mundo natural. Filosoficamente, Cernunnos encarna o arquétipo do Guardião, que protege e respeita a natureza. Na vida moderna, ele nos lembra da importância de cuidar do meio ambiente e de viver em harmonia com a natureza.", 
                arquetipo: "O Guardião" 
            },
            { 
                nome: "Epona", 
                descricao: "Deusa dos cavalos e da fertilidade, Epona é uma figura protetora e maternal. Ela representa a conexão com os animais e a vida. Filosoficamente, Epona encarna o arquétipo do Cuidador, que nutre e protege. Na vida moderna, ela nos inspira a cuidar dos animais e a valorizar a vida em todas as suas formas.", 
                arquetipo: "O Cuidador" 
            },
            { 
                nome: "Manannán mac Lir", 
                descricao: "Deus do mar e do além, Manannán mac Lir é uma figura misteriosa e protetora. Ele representa a jornada entre mundos. Filosoficamente, Manannán encarna o arquétipo do Viajante, que explora novos horizontes. Na vida moderna, ele nos inspira a buscar novas experiências e a explorar o desconhecido.", 
                arquetipo: "O Viajante" 
            },
            { 
                nome: "Arawn", 
                descricao: "Deus do submundo, Arawn é um símbolo de mistério e transformação. Ele representa a jornada para o desconhecido. Filosoficamente, Arawn encarna o arquétipo do Transformador, que nos convida a enfrentar nossos medos. Na vida moderna, ele nos ensina a abraçar a mudança e a encontrar significado na jornada.", 
                arquetipo: "O Transformador" 
            }
        ]
    };
    
    document.getElementById("draw-button").addEventListener("click", () => {
        const culturaEscolhida = document.getElementById("cultura-select").value;
        const deuses = culturas[culturaEscolhida];
    
        // Selecionar um deus aleatório
        const deusSorteado = deuses[Math.floor(Math.random() * deuses.length)];
    
        // Exibir o resultado
        const deusContainer = document.getElementById("deus-container");
        const descricaoContainer = document.getElementById("descricao-container");
    
        deusContainer.innerHTML = `<strong>${deusSorteado.nome}</strong> - ${deusSorteado.arquetipo}`;
        descricaoContainer.innerHTML = `<p>${deusSorteado.descricao}</p>`;
    
        // Mostrar a seção de resultado
        document.getElementById("resultado").classList.remove("hidden");
    });
    
    document.getElementById("voltar").addEventListener("click", () => {
        document.getElementById("resultado").classList.add("hidden");
    });
    document.getElementById("voltar").addEventListener("click", () => {
        // Limpar o conteúdo exibido
        document.getElementById("deus-container").innerHTML = "";
        document.getElementById("descricao-container").innerHTML = "";
    
        // Ocultar a seção de resultado
        document.getElementById("resultado").classList.add("hidden");
    
        // Rolagem suave para o topo da página
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });