import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Check, 
  Leaf, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck, 
  Clock, 
  Award, 
  Flame, 
  UtensilsCrossed, 
  ChefHat, 
  CheckCircle2, 
  Users, 
  FileText, 
  Package, 
  Layers, 
  Info,
  ChevronDown
} from 'lucide-react';
import { gsap } from 'gsap';
import Lenis from 'lenis';
import DubolaHeader from '../components/DubolaHeader';
import DubolaFooter from '../components/DubolaFooter';

// 1. COMPREHENSIVE 17-PRODUCT DATABASE WITH MASTER-CLASS COPY AND SPECS
const PRODUCTS_DATABASE = {
  // --- KETCHUPS ---
  'ketchup-tradicional': {
    id: 'ketchup-tradicional',
    category: 'ketchup',
    name: 'Ketchup Tradicional',
    fullName: 'Ketchup Dubola Rústico Tradicional',
    slogan: 'A pureza ancestral do tomate italiano reduzido ao fogo lento.',
    description: 'Esqueça o sabor artificial e vinagrado da indústria. Nosso Ketchup Tradicional é a celebração do tomate pelati maduro, cozido com paciência com especiarias secretas e açúcar mascavo para conferir doçura sutil e acidez vibrante. Uma textura densa e rústica que envolve o paladar.',
    theme: {
      primary: '#d97706',
      secondary: '#dc2626',
      glow: 'rgba(220, 38, 38, 0.15)',
      badge: 'bg-red-500/10 text-red-400 border-red-500/20',
      radialBg: 'from-[#1a0505] via-[#0d0202] to-[#000000]',
      buttonGrad: 'from-red-600 to-amber-600 shadow-red-600/20 hover:shadow-red-600/40'
    },
    b2c: {
      packaging: 'Frasco de Vidro Premium (320g)',
      retailPrice: 'R$ 21,90',
      yieldText: 'Perfeito para finalizações gourmet em casa',
      shelfLife: '12 meses sob refrigeração após aberto'
    },
    b2b: {
      packaging: 'Bag Profissional (1,01 kg)',
      commercialPrice: 'Sob Consulta / Faturamento Corporativo',
      yieldText: 'Rende aproximadamente 125 hambúrgueres gourmet',
      stability: 'Estabilidade absoluta em banho-maria (sinérese zero) e sob calor de chapa quente.',
      shelfLife: '18 meses fechado, ideal para estoque de alto giro'
    },
    nutrition: {
      ingredients: 'Tomate italiano pelati selecionado, açúcar mascavo orgânico, vinagre de maçã artesanal, sal de parrilla, cebola tostada, alho seco, cravo-da-índia, canela, espessante natural goma xantana e conservante sorbato de potássio.',
      table: [
        { label: 'Valor Energético', qty: '18 kcal', vd: '1%' },
        { label: 'Carboidratos', qty: '4.2 g', vd: '1%' },
        { label: 'Proteínas', qty: '0.2 g', vd: '0%' },
        { label: 'Gorduras Totais', qty: '0.0 g', vd: '0%' },
        { label: 'Sódio', qty: '65 mg', vd: '3%' }
      ]
    },
    recipe: {
      name: 'Fritas Rústicas Imperiais com Ketchup Dubola e Flor de Sal',
      prepTime: '25 min',
      difficulty: 'Fácil',
      chefSecret: 'A doçura orgânica do nosso Ketchup Tradicional equilibra perfeitamente o amargor do alecrim tostado no forno e a salinidade da flor de sal marinho nas batatas quentes.',
      ingredients: [
        '500g de batatas Asterix com casca lavadas',
        '3 dentes de alho esmagados',
        '2 ramos de alecrim fresco',
        '2 colheres de sopa de azeite extra virgem',
        'Flor de sal e páprica defumada',
        'Ketchup Tradicional Dubola gelado'
      ],
      steps: [
        'Corte as batatas em gomos grossos (formato canoa) e seque perfeitamente em um pano limpo.',
        'Envolva os gomos de batata com azeite, alho esmagado, alecrim, flor de sal e páprica.',
        'Disponha em uma assadeira em camada única e asse a 220°C por 20 minutos até dourar intensamente.',
        'Sirva imediatamente estalando de quente ao lado de um ramequim de Ketchup Tradicional Dubola.'
      ]
    }
  },
  'ketchup-picante': {
    id: 'ketchup-picante',
    category: 'ketchup',
    name: 'Ketchup Picante',
    fullName: 'Ketchup Dubola Chipotle & Jalapeño',
    slogan: 'O calor magnético da Habanero fresca com o frescor do tomate pelati.',
    description: 'Para paladares audaciosos que buscam adrenalina sensorial. Fundimos tomates selecionados com uma infusão cirúrgica de pimentas Habanero e Jalapeño frescas, gerando uma ardência persistente que acorda e coroa as papilas gustativas, sem mascarar o sabor do prato.',
    theme: {
      primary: '#ea580c',
      secondary: '#b91c1c',
      glow: 'rgba(185, 28, 28, 0.2)',
      badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      radialBg: 'from-[#220303] via-[#0f0000] to-[#000000]',
      buttonGrad: 'from-orange-600 to-red-700 shadow-red-700/20 hover:shadow-red-700/40'
    },
    b2c: {
      packaging: 'Frasco de Vidro Premium (320g)',
      retailPrice: 'R$ 23,90',
      yieldText: 'Traz picância elegante a sanduíches caseiros',
      shelfLife: '12 meses sob refrigeração após aberto'
    },
    b2b: {
      packaging: 'Bag Profissional (1,01 kg)',
      commercialPrice: 'Faturamento Corporativo Especial',
      yieldText: 'Rende aproximadamente 120 porções de smash premium',
      stability: 'Viscosidade mantida sob altas temperaturas, perfeito para selar sobre burgers quentes.',
      shelfLife: '18 meses fechado, estabilidade a longo prazo'
    },
    nutrition: {
      ingredients: 'Tomate italiano pelati selecionado, açúcar mascavo, vinagre de maçã, sal de parrilla, pimenta habanero fresca, pimenta chipotle defumada, jalapeno triturada, alho, cebola, especiarias.',
      table: [
        { label: 'Valor Energético', qty: '19 kcal', vd: '1%' },
        { label: 'Carboidratos', qty: '4.4 g', vd: '1%' },
        { label: 'Proteínas', qty: '0.2 g', vd: '0%' },
        { label: 'Gorduras Totais', qty: '0.0 g', vd: '0%' },
        { label: 'Sódio', qty: '72 mg', vd: '3%' }
      ]
    },
    recipe: {
      name: 'Asas de Frango Incendiárias ao Molho Chipotle-Dubola',
      prepTime: '30 min',
      difficulty: 'Médio',
      chefSecret: 'A ardência equilibrada da Habanero age como um catalisador térmico, quebrando a gordura natural da pele da asa e caramelizando na assadeira de forma estonteante.',
      ingredients: [
        '800g de tulipa de asa de frango fresca',
        '1/2 xícara de Ketchup Picante Dubola',
        '1 colher de sopa de manteiga derretida',
        'Suco de 1/2 limão cravo',
        'Sal marinho e páprica picante',
        'Cebolinha fresca fatiada'
      ],
      steps: [
        'Seque bem as tulipas de frango e tempere com sal marinho e páprica.',
        'Em um bowl grande, misture o Ketchup Picante Dubola com a manteiga derretida e o limão cravo.',
        'Asse as tulipas na Air-fryer ou forno a 200°C por 18 minutos até ficarem bem crocantes.',
        'Retire, jogue-as no bowl de molho picante até envolver tudo por completo e polvilhe cebolinha.'
      ]
    }
  },
  'ketchup-goiaba': {
    id: 'ketchup-goiaba',
    category: 'ketchup',
    name: 'Ketchup com Goiaba',
    fullName: 'Ketchup Dubola com Goiaba Vermelha',
    slogan: 'A maior insurreição culinária: a fusão sedosa do tomate com o dulçor tropical da goiaba.',
    description: 'Nosso orgulho máximo e estrela de inovação. Uma colisão audaciosa que subverte a receita clássica americana ao incorporar a cremosidade e doçura natural da goiaba vermelha madura com a acidez clássica do tomate. Uma textura ultra-aveludada, cor profunda e final agridoce elegante.',
    theme: {
      primary: '#f43f5e',
      secondary: '#be123c',
      glow: 'rgba(190, 18, 60, 0.2)',
      badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      radialBg: 'from-[#24030d] via-[#100005] to-[#000000]',
      buttonGrad: 'from-rose-600 to-red-700 shadow-rose-600/20 hover:shadow-rose-600/40'
    },
    b2c: {
      packaging: 'Frasco de Vidro Premium (320g)',
      retailPrice: 'R$ 24,90',
      yieldText: 'A joia gourmet de destaque para a mesa da sua casa',
      shelfLife: '12 meses sob refrigeração'
    },
    b2b: {
      packaging: 'Bag Profissional (1,01 kg)',
      commercialPrice: 'Faturamento Corporativo Especial',
      yieldText: 'Perfeito para assinar pratos autorais de porco, frango e peixes nobres',
      stability: 'Fácil aderência a superfícies de carnes quentes. Excelente caramelização sob forno salamandra.',
      shelfLife: '18 meses fechado, alta rotação garantida'
    },
    nutrition: {
      ingredients: 'Polpa de goiaba vermelha madura selecionada (38%), tomate pelati italiano, açúcar mascavo, vinagre de maçã, sal de parrilla, cravo, canela, cardamomo, especiarias finas.',
      table: [
        { label: 'Valor Energético', qty: '24 kcal', vd: '1%' },
        { label: 'Carboidratos', qty: '5.8 g', vd: '2%' },
        { label: 'Proteínas', qty: '0.1 g', vd: '0%' },
        { label: 'Gorduras Totais', qty: '0.0 g', vd: '0%' },
        { label: 'Sódio', qty: '58 mg', vd: '2%' }
      ]
    },
    recipe: {
      name: 'Costelinha Suína Laqueada ao Ketchup de Goiaba Dubola',
      prepTime: '1h 30min',
      difficulty: 'Alta Gastronomia',
      chefSecret: 'A pectina natural da goiaba vermelha gera uma laca brilhante e firme que protege as fibras da costelinha de porco do ressecamento do forno, enquanto seu dulçor contrasta divinamente com a gordura suína.',
      ingredients: [
        '1 rack de costelinha suína limpa (800g)',
        '1/2 xícara de Ketchup de Goiaba Dubola',
        '2 colheres de sopa de cachaça envelhecida',
        '1 dente de alho picado',
        'Sal grosso moído e pimenta preta',
        'Ramos de tomilho fresco'
      ],
      steps: [
        'Tempere a costelinha com sal grosso, pimenta preta e alho picado.',
        'Embrulhe em papel alumínio e asse a 180°C por 1 hora até a carne ficar macia.',
        'Misture o Ketchup de Goiaba Dubola com a cachaça e pincele generosamente sobre a costelinha.',
        'Volte ao forno sem papel alumínio a 220°C por 12 minutos, pincelando o molho a cada 4 minutos até laquear.'
      ]
    }
  },

  // --- MAIONESES ---
  'maionese-tradicional': {
    id: 'maionese-tradicional',
    category: 'maionese',
    name: 'Maionese Tradicional',
    fullName: 'Maionese Dubola Tradicional Ouro',
    slogan: 'A consagração da emulsão ouro purista de gemas caipiras.',
    description: 'A maionese purista definitiva. Desenvolvida com gemas selecionadas de ovos de galinhas caipiras criadas livres, óleo de altíssima pureza, suco fresco de limão siciliano e sementes de mostarda esmagadas a frio na chapa de pedra. Uma textura tão firme e untuosa que desenha o pote.',
    theme: {
      primary: '#3b82f6',
      secondary: '#1d4ed8',
      glow: 'rgba(29, 78, 216, 0.15)',
      badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      radialBg: 'from-[#03091a] via-[#01030a] to-[#000000]',
      buttonGrad: 'from-blue-600 to-indigo-700 shadow-blue-600/20 hover:shadow-blue-600/40'
    },
    b2c: {
      packaging: 'Pote de Vidro Rústico (300g)',
      retailPrice: 'R$ 19,90',
      yieldText: 'Consistência incomparável para maioneses de batata caseiras',
      shelfLife: '6 meses sob refrigeração constante após aberto'
    },
    b2b: {
      packaging: 'Bag Profissional (1,01 kg)',
      commercialPrice: 'Faturamento Direto Distribuidor',
      yieldText: 'Rende aproximadamente 150 burgers de alta performance',
      stability: 'Ultra estabilizada. Não gera sinérese (soltura de água) mesmo em contato com pães quentes.',
      shelfLife: '12 meses fechado sob refrigeração de estoque'
    },
    nutrition: {
      ingredients: 'Óleo de soja refinado, gemas de ovos caipiras pasteurizados, água purificada, vinagre de maçã, sal marinho fino, sementes de mostarda moídas na pedra, suco de limão siciliano orgânico e óleo essencial de alecrim.',
      table: [
        { label: 'Valor Energético', qty: '52 kcal', vd: '3%' },
        { label: 'Carboidratos', qty: '0.2 g', vd: '0%' },
        { label: 'Proteínas', qty: '0.1 g', vd: '0%' },
        { label: 'Gorduras Totais', qty: '5.6 g', vd: '10%' },
        { label: 'Sódio', qty: '88 mg', vd: '4%' }
      ]
    },
    recipe: {
      name: 'Salada de Batatas Rústicas com Ervas e Maionese Ouro',
      prepTime: '20 min',
      difficulty: 'Fácil',
      chefSecret: 'A consistência densa da nossa maionese tradicional liga os vegetais sem amolecer a casca crocante das batatas douradas na manteiga.',
      ingredients: [
        '400g de batatas Asterix em cubos cozidas al dente',
        '4 colheres de sopa de Maionese Tradicional Dubola',
        '1 colher de chá de cebolete bem fatiada',
        '1 ovo cozido picado fino',
        'Gotas de limão siciliano',
        'Pimenta preta moída na hora'
      ],
      steps: [
        'Cozinhe as batatas em água abundante com sal até ficarem macias, mas sem desmanchar.',
        'Escorra bem e deixe esfriar totalmente na geladeira por 15 minutos.',
        'Em um bowl gelado, junte as batatas, o ovo picado, a maionese tradicional e a cebolete.',
        'Incorpore com espátula delicadamente, adicione as gotinhas de limão e pimenta.'
      ]
    }
  },
  'maionese-tartaro': {
    id: 'maionese-tartaro',
    category: 'maionese',
    name: 'Maionese Tártaro',
    fullName: 'Maionese Dubola Tártaro Litorânea',
    slogan: 'A joia litorânea: acidez refrescante de pepinos nobres em vinagre.',
    description: 'A joia inquestionável da culinária marinha. Combinamos picles de pepino agridoce triturados milimetricamente com cebola roxa fresca, salsa gigante e o perfume de endro (dill). O frescor cítrico sob medida para frituras marinhas, camarões e salmão grelhado unilateral.',
    theme: {
      primary: '#f97316',
      secondary: '#c2410c',
      glow: 'rgba(249, 115, 22, 0.15)',
      badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      radialBg: 'from-[#1a0701] via-[#090200] to-[#000000]',
      buttonGrad: 'from-orange-600 to-amber-700 shadow-orange-600/20 hover:shadow-orange-600/40'
    },
    b2c: {
      packaging: 'Pote de Vidro Rústico (300g)',
      retailPrice: 'R$ 22,90',
      yieldText: 'Eleve o churrasco de peixe ou petiscos marinhos frios',
      shelfLife: '6 meses sob refrigeração constante após aberto'
    },
    b2b: {
      packaging: 'Bag Profissional (1,01 kg)',
      commercialPrice: 'Faturamento Corporativo Litoral',
      yieldText: 'Estrela de pratos executivos de salmão e porções fritas',
      stability: 'Pedaços de picles suspensos de forma homogênea. Mantém a acidez inalterada sob aquecimento leve.',
      shelfLife: '12 meses fechado sob refrigeração de estoque'
    },
    nutrition: {
      ingredients: 'Água, óleo de soja, ovos pasteurizados, pepinos selecionados em conserva agridoce, cebola roxa picada, mostarda amarela em grãos, vinagre de maçã, sal marinho, limão orgânico, endro fresco.',
      table: [
        { label: 'Valor Energético', qty: '46 kcal', vd: '2%' },
        { label: 'Carboidratos', qty: '0.5 g', vd: '0%' },
        { label: 'Proteínas', qty: '0.1 g', vd: '0%' },
        { label: 'Gorduras Totais', qty: '5.0 g', vd: '9%' },
        { label: 'Sódio', qty: '98 mg', vd: '5%' }
      ]
    },
    recipe: {
      name: 'Salmão Grelhado Unilateral com Quenelle de Tártaro Dubola',
      prepTime: '20 min',
      difficulty: 'Médio',
      chefSecret: 'O choque térmico do peixe pelando de quente com a quenelle gelada de Maionese Tártaro derrete suavemente a gordura nobre, ativando os aromas de dill e limão siciliano.',
      ingredients: [
        '2 filés de salmão fresco com pele (200g cada)',
        '4 colheres de sopa de Maionese Tártaro Dubola gelada',
        '1 colher de sopa de manteiga extra sem sal',
        'Flor de sal e pimenta branca',
        'Raspas de limão siciliano',
        'Fio de azeite'
      ],
      steps: [
        'Seque bem a pele do salmão e tempere com flor de sal e pimenta branca.',
        'Grelhe com a pele voltada para baixo em fogo alto com azeite por 4 minutos sem mexer.',
        'Adicione a manteiga, vire e doure por mais 1 minuto. Retire e aguarde descansar por 1 minuto.',
        'Sirva com gotinhas cítricas e uma colherada escultural de tártaro gelado no topo.'
      ]
    }
  },
  'maionese-defumada': {
    id: 'maionese-defumada',
    category: 'maionese',
    name: 'Maionese Defumada',
    fullName: 'Maionese Dubola Smokehouse Defumada',
    slogan: 'A alma do braseiro: defumação a frio em lenha de macieira natural.',
    description: 'A captura da chapa de churrasqueira em forma de creme. Desenvolvida através de uma infusão de fumaça natural de lenha de macieira a frio, trazendo notas amadeiradas profundas e dulçor sutil de brasa que transformam qualquer burger em obra-prima.',
    theme: {
      primary: '#854d0e',
      secondary: '#451a03',
      glow: 'rgba(133, 77, 14, 0.15)',
      badge: 'bg-yellow-800/10 text-yellow-500 border-yellow-800/20',
      radialBg: 'from-[#1c0e03] via-[#0a0400] to-[#000000]',
      buttonGrad: 'from-amber-700 to-amber-900 shadow-amber-700/20 hover:shadow-amber-700/40'
    },
    b2c: {
      packaging: 'Pote de Vidro Rústico (300g)',
      retailPrice: 'R$ 21,90',
      yieldText: 'Perfeito para burgers caseiros na chapa de ferro',
      shelfLife: '6 meses sob refrigeração'
    },
    b2b: {
      packaging: 'Bag Profissional (1,01 kg)',
      commercialPrice: 'Faturamento Corporativo Hamburguerias',
      yieldText: 'Atalho ideal de churrasqueira para chapa de chapa plana',
      stability: 'Mantém estabilidade densa sob a fusão térmica do queijo cheddar quente.',
      shelfLife: '12 meses fechado sob refrigeração de estoque'
    },
    nutrition: {
      ingredients: 'Óleo de soja, água refinada, ovos caipiras, vinagre, açúcar mascavo, sal, fumaça líquida de lenha de macieira extraída a frio, páprica defumada, especiarias selecionadas.',
      table: [
        { label: 'Valor Energético', qty: '49 kcal', vd: '2%' },
        { label: 'Carboidratos', qty: '0.3 g', vd: '0%' },
        { label: 'Proteínas', qty: '0.1 g', vd: '0%' },
        { label: 'Gorduras Totais', qty: '5.3 g', vd: '10%' },
        { label: 'Sódio', qty: '90 mg', vd: '4%' }
      ]
    },
    recipe: {
      name: 'Double Smash Burger com Crosta e Maionese Defumada',
      prepTime: '12 min',
      difficulty: 'Fácil',
      chefSecret: 'A Maionese Defumada Dubola traz notas amadeiradas de pitmaster que simulam a churrasqueira perfeita sob a fusão untuosa do queijo cheddar na chapa.',
      ingredients: [
        '2 bolas de carne bovina fresca bem geladas (80g cada)',
        '2 fatias de cheddar inglês de alta fusão',
        '1 pão brioche amanteigado selado',
        '4 colheres de sopa de Maionese Defumada Dubola',
        'Manteiga, sal e pimenta'
      ],
      steps: [
        'Corte o pão e toste as faces internas na manteiga até selar.',
        'Aplique a Maionese Defumada de forma abundante em ambas as faces do pão brioche.',
        'Esmague as bolas de carne gelada contra a chapa de ferro quente até ficarem bem finas.',
        'Tempere com sal e pimenta, doure por 90 segundos, vire, adicione queijo e empilhe.'
      ]
    }
  },
  'maionese-azeitona': {
    id: 'maionese-azeitona',
    category: 'maionese',
    name: 'Maionese de Azeitona',
    fullName: 'Maionese Dubola Azeitona Preta Azapa',
    slogan: 'A untuosidade mediterrânea com a pungência salina da azeitona preta Azapa.',
    description: 'Uma viagem sensorial às costas do Mediterrâneo. Incorporamos uma seleção rica de azeitonas pretas nobres do tipo Azapa, conferindo uma coloração purpúrea elegante, sabor salino complexo e perfume herbal único que enobrece carnes frias e bruschettas.',
    theme: {
      primary: '#4d7c0f',
      secondary: '#14532d',
      glow: 'rgba(77, 124, 15, 0.15)',
      badge: 'bg-lime-800/10 text-lime-500 border-lime-800/20',
      radialBg: 'from-[#051403] via-[#020801] to-[#000000]',
      buttonGrad: 'from-lime-700 to-green-900 shadow-lime-700/20 hover:shadow-lime-700/40'
    },
    b2c: {
      packaging: 'Pote de Vidro Rústico (300g)',
      retailPrice: 'R$ 22,90',
      yieldText: 'Combinação clássica para sanduíches frios e canapés',
      shelfLife: '6 meses sob refrigeração'
    },
    b2b: {
      packaging: 'Bag Profissional (1,01 kg)',
      commercialPrice: 'Faturamento Corporativo Distribuição',
      yieldText: 'Consistência nobre de cor para tábuas de charcutaria e bistrôs',
      stability: 'Textura homogênea de suspensão de azeitonas trituradas. Excelente em frios.',
      shelfLife: '12 meses fechado sob refrigeração'
    },
    nutrition: {
      ingredients: 'Óleo de soja, água purificada, ovos, polpa triturada de azeitonas pretas do tipo Azapa nobres, vinagre de maçã, sal de parrilla, especiarias mediterrâneas.',
      table: [
        { label: 'Valor Energético', qty: '47 kcal', vd: '2%' },
        { label: 'Carboidratos', qty: '0.4 g', vd: '0%' },
        { label: 'Proteínas', qty: '0.1 g', vd: '0%' },
        { label: 'Gorduras Totais', qty: '5.1 g', vd: '9%' },
        { label: 'Sódio', qty: '105 mg', vd: '5%' }
      ]
    },
    recipe: {
      name: 'Bruschetta de Focaccia com Carpaccio e Creme de Azeitonas',
      prepTime: '15 min',
      difficulty: 'Fácil',
      chefSecret: 'A salinidade natural da azeitona preta Azapa presente na maionese corta a untuosidade da carne crua e adiciona o frescor mediterrâneo sobre a focaccia tostada.',
      ingredients: [
        '4 fatias de focaccia artesanal de alecrim',
        '8 fatias de carpaccio de filet mignon bem finas',
        '4 colheres de sopa de Maionese de Azeitona Dubola',
        'Rúcula selvagem e raspas de queijo parmesão',
        'Azeite extra virgem de oliva'
      ],
      steps: [
        'Toste as fatias de focaccia na grelha com um fio de azeite.',
        'Espalhe uma camada generosa de Maionese de Azeitona Dubola sobre a focaccia quente.',
        'Disponha as lâminas de carpaccio por cima de forma ondulada.',
        'Finalize com rúcula selvagem fresca, raspas de parmesão e pimenta.'
      ]
    }
  },
  'maionese-ervas': {
    id: 'maionese-ervas',
    category: 'maionese',
    name: 'Maionese de Ervas',
    fullName: 'Maionese Dubola Ervas Frescas e Manjericão',
    slogan: 'O frescor do jardim: manjericão fresco, salsinha e hortelã em emulsão.',
    description: 'Uma sinfonia botânica refrescante. Combinamos salsa, cebolete e folhas frescas de manjericão gigante batidos suavemente com nossa maionese base, criando uma emulsão leve de cor esverdeada natural que acorda qualquer paladar de forma aromática.',
    theme: {
      primary: '#059669',
      secondary: '#064e3b',
      glow: 'rgba(5, 150, 105, 0.15)',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      radialBg: 'from-[#02170f] via-[#010a06] to-[#000000]',
      buttonGrad: 'from-emerald-600 to-green-700 shadow-emerald-600/20 hover:shadow-emerald-600/40'
    },
    b2c: {
      packaging: 'Pote de Vidro Rústico (300g)',
      retailPrice: 'R$ 20,90',
      yieldText: 'Consistência leve ideal para saladas folhosas e wraps',
      shelfLife: '6 meses sob refrigeração'
    },
    b2b: {
      packaging: 'Bag Profissional (1,01 kg)',
      commercialPrice: 'Faturamento Corporativo Food Service',
      yieldText: 'Nota herbal vibrante que diferencia sanduíches e wraps naturais',
      stability: 'Sem separação de fase da água de vegetais, mantendo coloração verde viva.',
      shelfLife: '12 meses fechado sob refrigeração'
    },
    nutrition: {
      ingredients: 'Óleo de soja, gemas de ovos, água purificada, vinagre, sal marinho, salsa fresca micro-picada, cebolete, manjericão italiano, aroma natural de hortelã.',
      table: [
        { label: 'Valor Energético', qty: '45 kcal', vd: '2%' },
        { label: 'Carboidratos', qty: '0.3 g', vd: '0%' },
        { label: 'Proteínas', qty: '0.1 g', vd: '0%' },
        { label: 'Gorduras Totais', qty: '4.8 g', vd: '9%' },
        { label: 'Sódio', qty: '85 mg', vd: '4%' }
      ]
    },
    recipe: {
      name: 'Wrap de Legumes Grelhados com Creme de Ervas Dubola',
      prepTime: '15 min',
      difficulty: 'Fácil',
      chefSecret: 'O aroma de manjericão fresco presente em nossa maionese envolve os legumes grelhados quentes, trazendo um tom refrescante e perfumado para wraps frios.',
      ingredients: [
        '2 pães tipo tortilla ou folha',
        '1 xícara de legumes grelhados (abobrinha, berinjela e tomate cereja)',
        '4 colheres de sopa de Maionese de Ervas Dubola',
        'Queijo minas frescal em fatias',
        'Folhas frescas de rúcula'
      ],
      steps: [
        'Aqueça levemente os legumes grelhados em frigideira com azeite.',
        'Espalhe a Maionese de Ervas Dubola sobre toda a superfície da tortilla.',
        'Disponha os legumes grelhados, queijo minas e rúcula no centro.',
        'Dobre as laterais, enrole com firmeza e sirva cortado ao meio.'
      ]
    }
  },

  'maionese-alho': {
    id: 'maionese-alho',
    category: 'maionese',
    name: 'Maionese de Alho',
    fullName: 'Maionese Dubola Alho Assado e Azeite',
    slogan: 'A profundidade aromática do alho dourado no azeite de oliva.',
    description: 'A clássica aioli mediterrânea elevada ao padrão Dubola. Desenvolvida com alho fresco assado lentamente no azeite de oliva extra virgem até atingir a doçura concentrada e suave, mesclada à nossa emulsão base de gemas caipiras. Um creme denso, aromático e com final persistente que transforma qualquer lanche.',
    theme: {
      primary: '#a16207',
      secondary: '#713f12',
      glow: 'rgba(161, 98, 7, 0.15)',
      badge: 'bg-yellow-700/10 text-yellow-500 border-yellow-700/20',
      radialBg: 'from-[#170e02] via-[#080500] to-[#000000]',
      buttonGrad: 'from-yellow-700 to-amber-900 shadow-yellow-700/20 hover:shadow-yellow-700/40'
    },
    b2c: {
      packaging: 'Pote de Vidro Rústico (300g)',
      retailPrice: 'R$ 21,90',
      yieldText: 'Perfeito para sanduíches, pães artesanais e petiscos de mesa',
      shelfLife: '6 meses sob refrigeração após aberto'
    },
    b2b: {
      packaging: 'Bag Profissional (1,01 kg)',
      commercialPrice: 'Faturamento Corporativo Food Service',
      yieldText: 'Creme aioli institucional de alta distinção para hambúrgueres gourmet e porções',
      stability: 'Alho estabilizado homogeneamente. Sem separação de óleos essenciais sob refrigeração.',
      shelfLife: '12 meses fechado sob refrigeração de estoque'
    },
    nutrition: {
      ingredients: 'Óleo de soja, gemas de ovos caipiras pasteurizados, água purificada, alho fresco assado em azeite extra virgem, vinagre de maçã, sal marinho, suco de limão siciliano, especiarias.',
      table: [
        { label: 'Valor Energético', qty: '51 kcal', vd: '3%' },
        { label: 'Carboidratos', qty: '0.4 g', vd: '0%' },
        { label: 'Proteínas', qty: '0.2 g', vd: '0%' },
        { label: 'Gorduras Totais', qty: '5.5 g', vd: '10%' },
        { label: 'Sódio', qty: '92 mg', vd: '4%' }
      ]
    },
    recipe: {
      name: 'Sanduíche de Frango Grelhado com Aioli de Alho Dubola',
      prepTime: '18 min',
      difficulty: 'Fácil',
      chefSecret: 'O alho assado suaviza sua pungência natural e confere uma doçura profunda e persistente que equilibra a acidez do tomate e a crocância da alface.',
      ingredients: [
        '1 filé de peito de frango limpo temperado',
        '3 colheres de sopa de Maionese de Alho Dubola',
        '1 pão ciabatta amanteigado',
        'Tomate em fatias, alface americana crocante',
        'Azeite extra virgem e flor de sal'
      ],
      steps: [
        'Grelhe o peito de frango temperado com sal, pimenta e azeite em frigideira bem quente.',
        'Toste as fatias do pão ciabatta na manteiga até dourar uniformemente.',
        'Aplique camada generosa de Maionese de Alho Dubola nas duas faces internas do pão.',
        'Monte o sanduíche com alface, tomate e o frango fatiado. Finalize com flor de sal.'
      ]
    }
  },
  'maionese-limao': {
    id: 'maionese-limao',
    category: 'maionese',
    name: 'Maionese de Limão Siciliano',
    fullName: 'Maionese Dubola Limão Siciliano Orgânico',
    slogan: 'A acidez solar e perfumada do limão siciliano em emulsão aveludada.',
    description: 'Leveza e frescor cítrico como você nunca experimentou em uma maionese. Incorporamos a raspa e o suco prensado a frio de limões sicilianos orgânicos selecionados, gerando uma emulsão vibrante, levemente cítrica e com final refrescante que eleva frutos do mar, saladas e lanches frios a outro nível.',
    theme: {
      primary: '#65a30d',
      secondary: '#3f6212',
      glow: 'rgba(101, 163, 13, 0.15)',
      badge: 'bg-lime-600/10 text-lime-400 border-lime-600/20',
      radialBg: 'from-[#071402] via-[#030800] to-[#000000]',
      buttonGrad: 'from-lime-600 to-green-800 shadow-lime-600/20 hover:shadow-lime-600/40'
    },
    b2c: {
      packaging: 'Bisnaga Premium (300g)',
      retailPrice: 'R$ 22,90',
      yieldText: 'Frescor cítrico perfeito para saladas, peixes e lanches de verão',
      shelfLife: '6 meses sob refrigeração após aberto'
    },
    b2b: {
      packaging: 'Bag Profissional (1,01 kg)',
      commercialPrice: 'Faturamento Corporativo Especial',
      yieldText: 'Creme cítrico de assinatura para frutos do mar e pratos executivos leves',
      stability: 'Acidez cítrica estabilizada sem escurecimento enzimático. Mantém frescor aromático integral.',
      shelfLife: '12 meses fechado sob refrigeração de estoque'
    },
    nutrition: {
      ingredients: 'Óleo de soja, gemas de ovos caipiras pasteurizados, água purificada, suco de limão siciliano orgânico prensado a frio, raspas de limão siciliano, vinagre de maçã, sal marinho, especiarias.',
      table: [
        { label: 'Valor Energético', qty: '44 kcal', vd: '2%' },
        { label: 'Carboidratos', qty: '0.6 g', vd: '0%' },
        { label: 'Proteínas', qty: '0.1 g', vd: '0%' },
        { label: 'Gorduras Totais', qty: '4.7 g', vd: '9%' },
        { label: 'Sódio', qty: '80 mg', vd: '4%' }
      ]
    },
    recipe: {
      name: 'Salada de Camarão Grelhado com Maionese de Limão Siciliano',
      prepTime: '15 min',
      difficulty: 'Fácil',
      chefSecret: 'A raspa de limão siciliano age como intensificador aromático natural, potencializando o frescor marinho do camarão grelhado sem mascarar seu sabor delicado.',
      ingredients: [
        '300g de camarão cinza limpo e descascado',
        '4 colheres de sopa de Maionese de Limão Siciliano Dubola',
        'Folhas de alface americana e rúcula',
        'Tomate cereja cortado ao meio',
        'Raspas de limão siciliano e flor de sal'
      ],
      steps: [
        'Tempere os camarões com sal, pimenta e azeite. Grelhe em frigideira bem quente por 2 minutos de cada lado.',
        'Monte a base de salada com alface americana, rúcula e tomate cereja no prato.',
        'Posicione os camarões grelhados quentes por cima da salada fria.',
        'Finalize com uma quenelle de Maionese de Limão Siciliano Dubola, raspas de limão e flor de sal.'
      ]
    }
  },

  // --- BARBECUES ---
  'barbecue-tradicional': {
    id: 'barbecue-tradicional',
    category: 'barbecue',
    name: 'Barbecue Tradicional',
    fullName: 'Barbecue Dubola Hickory Wood Tradicional',
    slogan: 'O caramelizado amadeirado da lenha de nogueira (Hickory) real.',
    description: 'Denso, brilhante e imponente. Nosso Barbecue Tradicional traz a alma do churrasco americano com azeite de oliva, açúcar mascavo caramelizado no ponto exato e o clássico defumado em lenha Hickory real. Perfeito para laquear costelinhas de porco na brasa.',
    theme: {
      primary: '#ea580c',
      secondary: '#451a03',
      glow: 'rgba(234, 115, 22, 0.15)',
      badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      radialBg: 'from-[#1c0803] via-[#090301] to-[#000000]',
      buttonGrad: 'from-orange-650 to-amber-900 shadow-orange-600/20 hover:shadow-orange-600/40'
    },
    b2c: {
      packaging: 'Bisnaga Premium (320g)',
      retailPrice: 'R$ 22,90',
      yieldText: 'Laqueie e coroe carnes assadas no forno da sua casa',
      shelfLife: '12 meses sob refrigeração após aberto'
    },
    b2b: {
      packaging: 'Bag Profissional (1,01 kg)',
      commercialPrice: 'Faturamento Corporativo Especial',
      yieldText: 'Laca de alta fixação para costelinhas e asas de frango',
      stability: 'Excelente consistência que não escorre sob calor de chapa, caramelizando sem queimar.',
      shelfLife: '18 meses fechado, estabilidade comercial exemplar'
    },
    nutrition: {
      ingredients: 'Polpa de tomate italiano, vinagre de maçã, açúcar mascavo, açúcar cristal, azeite extra virgem de oliva, sal, fumaça líquida natural de nogueira, cebola tostada, alho, mostarda, cravo.',
      table: [
        { label: 'Valor Energético', qty: '28 kcal', vd: '1%' },
        { label: 'Carboidratos', qty: '6.5 g', vd: '2%' },
        { label: 'Proteínas', qty: '0.2 g', vd: '0%' },
        { label: 'Gorduras Totais', qty: '0.1 g', vd: '0%' },
        { label: 'Sódio', qty: '82 mg', vd: '4%' }
      ]
    },
    recipe: {
      name: 'Costelinhas de Porco de Bistrô com Barbecue Hickory',
      prepTime: '1h 40min',
      difficulty: 'Média',
      chefSecret: 'A consistência densa e caramelizada do barbecue Hickory garante um laqueado uniforme e brilhante sob o grill do forno sem ressecar a carne.',
      ingredients: [
        '1 rack de costelinha suína limpa (900g)',
        '1/2 xícara de Barbecue Tradicional Dubola',
        'Sal grosso moído e pimenta preta',
        'Papel alumínio para a primeira assagem'
      ],
      steps: [
        'Tempere a costelinha com sal grosso moído e pimenta preta.',
        'Embrulhe bem no papel alumínio e asse a 180°C por 1 hora e 20 minutos até amaciar.',
        'Abra o papel, pincele o Barbecue Tradicional Dubola em toda a costelinha.',
        'Asse a 220°C por mais 15 minutos, pincelando o barbecue a cada 5 minutos até laquear.'
      ]
    }
  },
  'barbecue-picante': {
    id: 'barbecue-picante',
    category: 'barbecue',
    name: 'Barbecue Picante',
    fullName: 'Barbecue Dubola Chipotle Picante',
    slogan: 'A queima sutil da caiena com a densidade do barbecue rústico.',
    description: 'O casamento perfeito entre fumaça e fogo intenso. Nosso Barbecue ganha a adição de pimenta caiena moída na pedra e chipotle defumado, entregando um final de boca apimentado, complexo e altamente viciante para elevar grelhados na brasa.',
    theme: {
      primary: '#b91c1c',
      secondary: '#450a0a',
      glow: 'rgba(185, 28, 28, 0.15)',
      badge: 'bg-red-500/10 text-red-400 border-red-500/20',
      radialBg: 'from-[#1c0303] via-[#090101] to-[#000000]',
      buttonGrad: 'from-red-650 to-red-950 shadow-red-600/20 hover:shadow-red-600/40'
    },
    b2c: {
      packaging: 'Bisnaga Premium (320g)',
      retailPrice: 'R$ 23,90',
      yieldText: 'Traga picância e defumação profunda a hambúrgueres caseiros',
      shelfLife: '12 meses sob refrigeração'
    },
    b2b: {
      packaging: 'Bag Profissional (1,01 kg)',
      commercialPrice: 'Faturamento Corporativo Hamburguerias',
      yieldText: 'Assinatura picante rústica ideal para carnes defumadas e asas',
      stability: 'Estabilidade sob forno salamandra, perfeito para caramelizar costelas.',
      shelfLife: '18 meses fechado sob refrigeração de estoque'
    },
    nutrition: {
      ingredients: 'Polpa de tomate pelati, vinagre de maçã, açúcar mascavo, pimenta caiena moída, chipotle defumado em pó, sal, cebola, alho desidratado, especiarias selecionadas.',
      table: [
        { label: 'Valor Energético', qty: '29 kcal', vd: '1%' },
        { label: 'Carboidratos', qty: '6.6 g', vd: '2%' },
        { label: 'Proteínas', qty: '0.2 g', vd: '0%' },
        { label: 'Gorduras Totais', qty: '0.1 g', vd: '0%' },
        { label: 'Sódio', qty: '89 mg', vd: '4%' }
      ]
    },
    recipe: {
      name: 'Asas de Frango Incendiárias e Picantes',
      prepTime: '25 min',
      difficulty: 'Fácil',
      chefSecret: 'O chipotle defumado de nosso barbecue picante acorda o paladar e contrasta com a untuosidade da pele do frango grelhado.',
      ingredients: [
        '800g de tulipa de asa de frango',
        '1/2 xícara de Barbecue Picante Dubola',
        'Suco de 1/2 limão siciliano',
        'Sal, pimenta e cebolinha fresca'
      ],
      steps: [
        'Grelhe as asas de frango na churrasqueira ou Air-fryer até ficarem crocantes.',
        'Em um bowl grande, misture o Barbecue Picante Dubola com gotinhas de limão siciliano.',
        'Jogue as tulipas quentes no bowl, misture até envolver e sirva polvilhado com cebolinha.'
      ]
    }
  },
  'barbecue-goiaba': {
    id: 'barbecue-goiaba',
    category: 'barbecue',
    name: 'Barbecue com Goiaba',
    fullName: 'Barbecue Dubola Goiaba Defumado',
    slogan: 'O clássico americano reencontra o pomar brasileiro.',
    description: 'Uma alquimia ousada, tropical e inesquecível. Fundimos o clássico molho barbecue defumado com a polpa adocicada de goiabas vermelhas selecionadas, gerando um sabor agridoce frutado que carameliza proteínas com elegância única no prato.',
    theme: {
      primary: '#f43f5e',
      secondary: '#881337',
      glow: 'rgba(244, 63, 94, 0.15)',
      badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      radialBg: 'from-[#1c0209] via-[#090003] to-[#000000]',
      buttonGrad: 'from-rose-600 to-rose-900 shadow-rose-600/20 hover:shadow-rose-600/40'
    },
    b2c: {
      packaging: 'Bisnaga Premium (320g)',
      retailPrice: 'R$ 24,90',
      yieldText: 'Traga a exclusividade gourmet aos churrascos de final de semana',
      shelfLife: '12 meses sob refrigeração'
    },
    b2b: {
      packaging: 'Bag Profissional (1,01 kg)',
      commercialPrice: 'Faturamento Corporativo Lojas Gourmet',
      yieldText: 'Assinatura inovadora agridoce ideal para hambúrgueres e costelinhas',
      stability: 'Excelente caramelização no grill ou forno salamandra, fixando de forma brilhante.',
      shelfLife: '18 meses fechado, alta rotação garantida'
    },
    nutrition: {
      ingredients: 'Polpa de goiaba vermelha selecionada, tomate pelati italiano, açúcar mascavo, vinagre de maçã, sal de parrilla, fumaça líquida natural, especiarias finas.',
      table: [
        { label: 'Valor Energético', qty: '31 kcal', vd: '2%' },
        { label: 'Carboidratos', qty: '7.2 g', vd: '2%' },
        { label: 'Proteínas', qty: '0.1 g', vd: '0%' },
        { label: 'Gorduras Totais', qty: '0.1 g', vd: '0%' },
        { label: 'Sódio', qty: '78 mg', vd: '3%' }
      ]
    },
    recipe: {
      name: 'Lombo Suíno Assado Glaceado com Goiaba e Barbecue',
      prepTime: '50 min',
      difficulty: 'Médio',
      chefSecret: 'O mel natural e a pectina da goiaba vermelha formam um verniz brilhante que protege as fibras da carne suína do ressecamento na assadeira.',
      ingredients: [
        '600g de lombo suíno limpo em peça',
        '1/2 xícara de Barbecue com Goiaba Dubola',
        '1 dente de alho picado e alecrim fresco',
        'Sal grosso e pimenta preta'
      ],
      steps: [
        'Tempere a peça de lombo com sal grosso, alho picado e alecrim.',
        'Sele a peça de lombo em frigideira quente com azeite até dourar todos os lados.',
        'Transfira para assadeira e pincele abundantemente o Barbecue com Goiaba Dubola.',
        'Asse a 200°C por 35 minutos, pincelando molho a cada 10 minutos para formar uma crosta.'
      ]
    }
  },

  // --- MOSTARDAS ---
  'mostarda-tradicional': {
    id: 'mostarda-tradicional',
    category: 'mostarda',
    name: 'Mostarda Tradicional',
    fullName: 'Mostarda Dubola Rústica Amarela',
    slogan: 'A picância limpa e rústica das sementes de mostarda selecionadas.',
    description: 'A clareza dos clássicos. Nossa Mostarda Tradicional equilibra sementes amarelas selecionadas de mostarda moídas finas com vinagre aromático e especiarias selecionadas, oferecendo um sabor vibrante, levemente picante e extremamente limpo no paladar.',
    theme: {
      primary: '#eab308',
      secondary: '#854d0e',
      glow: 'rgba(234, 179, 8, 0.15)',
      badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      radialBg: 'from-[#1c1503] via-[#0a0801] to-[#000000]',
      buttonGrad: 'from-yellow-600 to-amber-700 shadow-yellow-600/20 hover:shadow-yellow-600/40'
    },
    b2c: {
      packaging: 'Bisnaga Premium (320g)',
      retailPrice: 'R$ 18,90',
      yieldText: 'Excelente versatilidade para pratos quentes e vinagrete em casa',
      shelfLife: '12 meses sob refrigeração'
    },
    b2b: {
      packaging: 'Bag Profissional (1,01 kg)',
      commercialPrice: 'Faturamento Corporativo Especial',
      yieldText: 'Consistência ideal para misturas culinárias e hot dogs gourmet',
      stability: 'Cor amarela vibrante inalterada e alta estabilidade de emulsão sob agitação leve.',
      shelfLife: '18 meses fechado, ideal para estoque'
    },
    nutrition: {
      ingredients: 'Água purificada, sementes selecionadas de mostarda amarela, vinagre aromático, açúcar orgânico, sal marinho, especiarias selecionadas e óleo essencial de mostarda.',
      table: [
        { label: 'Valor Energético', qty: '12 kcal', vd: '1%' },
        { label: 'Carboidratos', qty: '1.2 g', vd: '0%' },
        { label: 'Proteínas', qty: '0.4 g', vd: '1%' },
        { label: 'Gorduras Totais', qty: '0.6 g', vd: '1%' },
        { label: 'Sódio', qty: '110 mg', vd: '5%' }
      ]
    },
    recipe: {
      name: 'Vinagrete de Mostarda Amarela para Salada Rústica',
      prepTime: '8 min',
      difficulty: 'Fácil',
      chefSecret: 'A mostarda amarela Dubola funciona como emulsificante natural para o azeite de oliva e vinagre de maçã, criando um creme suave e perfumado.',
      ingredients: [
        '3 colheres de sopa de Mostarda Tradicional Dubola',
        '4 colheres de sopa de azeite extra virgem',
        '2 colheres de sopa de vinagre de maçã',
        '1 colher de chá de mel de abelhas',
        'Sal fino e pimenta preta'
      ],
      steps: [
        'Em um bowl pequeno, junte a mostarda tradicional e o vinagre de maçã.',
        'Adicione o mel, sal e pimenta e bata com um batedor de arame (fouet).',
        'Despeje o azeite de oliva em fio contínuo, batendo sem parar até emulsionar.',
        'Regue sobre folhas verdes frescas de rúcula, alface romana e figos.'
      ]
    }
  },
  'mostarda-dijon': {
    id: 'mostarda-dijon',
    category: 'mostarda',
    name: 'Mostarda Dijon',
    fullName: 'Mostarda Dubola Dijon com Vinho Branco',
    slogan: 'A nobreza aristocrática da semente escura com vinho branco seco.',
    description: 'O rigor da alta culinária francesa na sua mesa. Elaborada com sementes escuras selecionadas de mostarda moídas na pedra e infusionadas com vinho Chardonnay seco, ela confere picância nasal profunda, textura rústica e acidez imponente que enobrece qualquer carne nobre.',
    theme: {
      primary: '#ca8a04',
      secondary: '#713f12',
      glow: 'rgba(202, 138, 4, 0.15)',
      badge: 'bg-yellow-700/10 text-yellow-450 border-yellow-750/20',
      radialBg: 'from-[#170e01] via-[#070400] to-[#000000]',
      buttonGrad: 'from-yellow-700 to-amber-900 shadow-yellow-700/20 hover:shadow-yellow-700/40'
    },
    b2c: {
      packaging: 'Bisnaga Premium (320g)',
      retailPrice: 'R$ 25,90',
      yieldText: 'Traga a sofisticação aristocrática de bistrô aos seus jantares',
      shelfLife: '12 meses sob refrigeração'
    },
    b2b: {
      packaging: 'Bag Profissional (1,01 kg)',
      commercialPrice: 'Faturamento Corporativo Gourmet',
      yieldText: 'Excelente condimento nobre para selar e temperar filés Angus',
      stability: 'Viscosidade firme com sementes trituradas em suspensão homogênea. Suporta gratinar no forno.',
      shelfLife: '18 meses fechado, alta distinção no estoque'
    },
    nutrition: {
      ingredients: 'Água refinada, sementes escuras selecionadas de mostarda, vinho branco Chardonnay seco, vinagre, sal marinho, antioxidante natural ácido cítrico, especiarias finas.',
      table: [
        { label: 'Valor Energético', qty: '14 kcal', vd: '1%' },
        { label: 'Carboidratos', qty: '1.4 g', vd: '0%' },
        { label: 'Proteínas', qty: '0.6 g', vd: '1%' },
        { label: 'Gorduras Totais', qty: '0.8 g', vd: '1%' },
        { label: 'Sódio', qty: '125 mg', vd: '5%' }
      ]
    },
    recipe: {
      name: 'Medalhão de Mignon com Espelho de Mostarda Dijon',
      prepTime: '20 min',
      difficulty: 'Alta Gastronomia',
      chefSecret: 'A acidez nobre e a picância nasal da nossa mostarda Dijon cortam a gordura untuosa do filet mignon quente, limpando as papilas gustativas a cada garfada.',
      ingredients: [
        '2 medalhões de filet mignon limpos (200g cada)',
        '4 colheres de sopa de Mostarda Dijon Dubola',
        '2 colheres de sopa de manteiga sem sal e tomilho',
        'Flor de sal e pimenta preta'
      ],
      steps: [
        'Tempere os medalhões com sal e pimenta preta moída na hora.',
        'Sele os medalhões em frigideira quente com manteiga e tomilho por 3 minutos de cada lado.',
        'Regue a carne continuamente com a manteiga de ervas quente derretida na frigideira.',
        'Espalhe a Mostarda Dijon Dubola formando um espelho no prato quente e apoie o medalhão sobre ele.'
      ]
    }
  },
  'mostarda-mel': {
    id: 'mostarda-mel',
    category: 'mostarda',
    name: 'Mostarda com Mel',
    fullName: 'Mostarda Dubola com Mel Silvestre',
    slogan: 'O dulçor sedutor do mel de flores silvestres com o calor da mostarda.',
    description: 'A doçura que acalma a picância. Combinamos sementes selecionadas de mostarda moídas finas com mel puro de abelhas de florada de mata nativa, gerando uma emulsão aveludada, adocicada e levemente pungente. Perfeita para saladas e empanados crocantes.',
    theme: {
      primary: '#f59e0b',
      secondary: '#78350f',
      glow: 'rgba(245, 158, 11, 0.15)',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      radialBg: 'from-[#170a01] via-[#070300] to-[#000000]',
      buttonGrad: 'from-amber-600 to-amber-800 shadow-amber-600/20 hover:shadow-amber-600/40'
    },
    b2c: {
      packaging: 'Bisnaga Premium (320g)',
      retailPrice: 'R$ 23,90',
      yieldText: 'Consistência leve ideal para molhos de salada e petiscos',
      shelfLife: '12 meses sob refrigeração'
    },
    b2b: {
      packaging: 'Bag Profissional (1,01 kg)',
      commercialPrice: 'Faturamento Corporativo Lojas',
      yieldText: 'Destaque e suavidade para acompanhamentos folhosos e empanados',
      stability: 'Fácil fixação e viscosidade que envolve saladas frescas sem escorrer.',
      shelfLife: '18 meses fechado, alta durabilidade comercial'
    },
    nutrition: {
      ingredients: 'Água, mel puro de flores silvestres selecionado, sementes de mostarda amarelas moídas, vinagre, açúcar mascavo, sal, especiarias selecionadas e ácido cítrico.',
      table: [
        { label: 'Valor Energético', qty: '26 kcal', vd: '1%' },
        { label: 'Carboidratos', qty: '5.2 g', vd: '2%' },
        { label: 'Proteínas', qty: '0.3 g', vd: '1%' },
        { label: 'Gorduras Totais', qty: '0.4 g', vd: '1%' },
        { label: 'Sódio', qty: '95 mg', vd: '4%' }
      ]
    },
    recipe: {
      name: 'Salada de Figos Frescos, Presunto Parma e Mel-Mostarda',
      prepTime: '15 min',
      difficulty: 'Fácil',
      chefSecret: 'O mel silvestre acalma a acidez da mostarda, casando de forma divinal com o sabor salgado do parma e a textura carnuda do figo fresco.',
      ingredients: [
        '1 maço de folhas de rúcula selvagem lavadas',
        '4 fatias finas de presunto Parma italiano',
        '3 figos frescos cortados em quatro',
        '4 colheres de sopa de Mostarda com Mel Dubola',
        'Queijo de cabra esfarelado'
      ],
      steps: [
        'Organize as folhas de rúcula selvagem em um prato plano de servir.',
        'Disponha as fatias de presunto Parma e os pedaços de figo fresco por cima.',
        'Regue a Mostarda com Mel Dubola em zigue-zague sobre toda a salada.',
        'Polvilhe o queijo de cabra por cima e adicione um fio de azeite extra virgem.'
      ]
    }
  },

  // --- MOLHOS DE TOMATE (Linha Premium/Artesanal em Vidro) ---
  'tomate-sugo': {
    id: 'tomate-sugo',
    category: 'tomate',
    name: 'Molho de Tomate Tradicional ao Sugo',
    fullName: 'Molho de Tomate Dubola Tradicional ao Sugo',
    slogan: 'O molho ancestral de tomates italianos apurados lentamente.',
    description: 'O aroma inebriante das cozinhas de trattoria italiana aos domingos. Cozido pacientemente com tomates pelati maduros importados selecionados, azeite extra virgem de primeira prensa, alho triturado e folhas frescas de manjericão gigante. Sem adição de açúcar refinado ou espessantes artificiais.',
    theme: {
      primary: '#ea580c',
      secondary: '#991b1b',
      glow: 'rgba(153, 27, 27, 0.15)',
      badge: 'bg-red-500/10 text-red-400 border-red-500/20',
      radialBg: 'from-[#170202] via-[#070000] to-[#000000]',
      buttonGrad: 'from-red-600 to-red-800 shadow-red-650/20 hover:shadow-red-650/40'
    },
    b2c: {
      packaging: 'Pote de Vidro Hermético (400g)',
      retailPrice: 'R$ 22,90',
      yieldText: 'Consistência ideal para molhos de massas tradicionais',
      shelfLife: '12 meses fechado, consumir em 5 dias após aberto'
    },
    b2b: {
      packaging: 'Bag Profissional (1,01 kg)',
      commercialPrice: 'Faturamento Corporativo Pizzarias',
      yieldText: 'Base líquida encorpada ideal para assinar pizzas e lasanhas de alto giro',
      stability: 'Suporta forno de alta temperatura (pizzaria a lenha ou elétrico) mantendo coloração vermelha viva.',
      shelfLife: '18 meses fechado, alto giro industrial'
    },
    nutrition: {
      ingredients: 'Tomate italiano pelati selecionado, polpa de tomates maduros, azeite de oliva extra virgem, alho picado, manjericão fresco gigante, sal de parrilla, orégano desidratado e ácido cítrico.',
      table: [
        { label: 'Valor Energético', qty: '32 kcal', vd: '2%' },
        { label: 'Carboidratos', qty: '5.8 g', vd: '2%' },
        { label: 'Proteínas', qty: '1.2 g', vd: '1%' },
        { label: 'Gorduras Totais', qty: '0.6 g', vd: '1%' },
        { label: 'Sódio', qty: '120 mg', vd: '5%' }
      ]
    },
    recipe: {
      name: 'Gnocchi Clássico de Batata ao Molho de Tomate e Manjericão',
      prepTime: '20 min',
      difficulty: 'Fácil',
      chefSecret: 'Nossos molhos são puristas e Clean Label. Misturar a água de cozimento da massa rica em amido ao molho quente emulsiona o azeite de oliva extra virgem e o tomate de forma incomparável.',
      ingredients: [
        '400g de gnocchi de batata artesanal fresco',
        '1 vidro de Molho de Tomate Tradicional ao Sugo Dubola',
        '2 colheres de sopa de azeite extra virgem',
        'Parmesão artesanal ralado na hora',
        'Ramos de manjericão fresco'
      ],
      steps: [
        'Cozinhe o gnocchi em água fervente com sal até começarem a flutuar na panela.',
        'Em frigideira larga, aqueça o azeite e despeje o Molho de Tomate ao Sugo Dubola.',
        'Escorra o gnocchi com uma escumadeira diretamente para a frigideira com o molho quente.',
        'Adicione 2 colheres de sopa da água de cozimento da massa, mexa, salpique manjericão e sirva.'
      ]
    }
  },
  'tomate-rustico': {
    id: 'tomate-rustico',
    category: 'tomate',
    name: 'Molho de Tomate Rústico',
    fullName: 'Molho de Tomate Dubola Rústico com Pedaços',
    slogan: 'A textura rústica dos tomates pelati esmagados artesanalmente.',
    description: 'Para cozinheiros exigentes que demandam dente e presença no prato. Tomates pelati maduros esmagados grosseiramente com as mãos e apurados longamente no fogo baixo, retendo pedaços carnudos, suculentos e aromáticos que envolvem a massa de forma perfeita, sem sabor industrial de extratos concentrados.',
    theme: {
      primary: '#ca8a04',
      secondary: '#991b1b',
      glow: 'rgba(153, 27, 27, 0.15)',
      badge: 'bg-red-500/10 text-red-400 border-red-500/20',
      radialBg: 'from-[#170305] via-[#070001] to-[#000000]',
      buttonGrad: 'from-red-650 to-red-900 shadow-red-650/20 hover:shadow-red-650/40'
    },
    b2c: {
      packaging: 'Pote de Vidro Hermético (400g)',
      retailPrice: 'R$ 24,90',
      yieldText: 'Traga a textura de restaurante italiano contemporâneo para sua casa',
      shelfLife: '12 meses fechado, consumir em até 5 dias aberto'
    },
    b2b: {
      packaging: 'Bag Profissional (1,01 kg)',
      commercialPrice: 'Faturamento Corporativo Restaurantes',
      yieldText: 'Textura artesanal pedaçuda superior que valoriza pratos executivos instantaneamente',
      stability: 'Retém viscosidade rústica firme e pedaços inteiros mesmo após fervura longa industrial.',
      shelfLife: '18 meses fechado, facilidade operacional e de estoque'
    },
    nutrition: {
      ingredients: 'Tomate italiano pelati inteiro selecionado esmagado grosseiramente, polpa de tomates maduros, azeite extra virgem, alho, cebola, manjericão fresco, sal de parrilla e ácido cítrico.',
      table: [
        { label: 'Valor Energético', qty: '34 kcal', vd: '2%' },
        { label: 'Carboidratos', qty: '6.2 g', vd: '2%' },
        { label: 'Proteínas', qty: '1.3 g', vd: '1%' },
        { label: 'Gorduras Totais', qty: '0.6 g', vd: '1%' },
        { label: 'Sódio', qty: '125 mg', vd: '5%' }
      ]
    },
    recipe: {
      name: 'Penne Rústico com Tomates Pedaçudos e Burrata Italiana',
      prepTime: '15 min',
      difficulty: 'Médio',
      chefSecret: 'Os pedaços rústicos e carnudos de tomate envolvem as dobras do penne, contrastando lindamente com a cremosidade amanteigada do coração da burrata.',
      ingredients: [
        '200g de macarrão Penne de grano duro',
        '1 vidro de Molho de Tomate Rústico Dubola',
        '1 burrata de búfala fresca',
        'Folhas gigantes de manjericão fresco',
        'Pimenta preta e azeite extra virgem'
      ],
      steps: [
        'Cozinhe o penne em água fervente com sal até atingir o ponto ideal al dente.',
        'Em frigideira, despeje o Molho de Tomate Rústico Dubola e deixe ferver levemente.',
        'Jogue a massa escorrida diretamente na frigideira, salteie para envolver e sirva.',
        'Posicione a burrata de búfala no centro do prato quente, rasgue-a, regue com azeite e manjericão.'
      ]
    }
  },
  'tomate-ervas-alho-poro': {
    id: 'tomate-ervas-alho-poro',
    category: 'tomate',
    name: 'Molho de Tomate Rústico com Ervas Finas e Alho-Poró',
    fullName: 'Molho de Tomate Dubola Rústico com Ervas Finas e Alho-Poró',
    slogan: 'O atalho aromático: o dulçor do alho-poró salteado com ervas finas.',
    description: 'O verdadeiro atalho de chef de alta gastronomia na sua cozinha. Nosso molho especial une o dulçor característico do alho-poró fatiado em rodelas douradas no azeite de oliva com um buquê clássico e perfumado de ervas finas selecionadas (tomilho fresco, alecrim e orégano de provence). Complexo e aromático.',
    theme: {
      primary: '#059669',
      secondary: '#991b1b',
      glow: 'rgba(153, 27, 27, 0.15)',
      badge: 'bg-red-500/10 text-red-400 border-red-500/20',
      radialBg: 'from-[#031405] via-[#010702] to-[#000000]',
      buttonGrad: 'from-red-600 to-emerald-700 shadow-red-650/20 hover:shadow-red-650/40'
    },
    b2c: {
      packaging: 'Pote de Vidro Hermético (400g)',
      retailPrice: 'R$ 25,90',
      yieldText: 'Ideal para risotos rápidos, vegetais assados ou molhos de peixe em casa',
      shelfLife: '12 meses fechado, consumir em até 5 dias aberto'
    },
    b2b: {
      packaging: 'Bag Profissional (1,01 kg)',
      commercialPrice: 'Faturamento Corporativo Gourmet Service',
      yieldText: 'Molho pronto de alta distinção culinária para filés e pratos elaborados com tempo zero de preparo',
      stability: 'Aromas botânicos de alho-poró e ervas finas mantidos estáveis sob ebulição longa.',
      shelfLife: '18 meses fechado, excelente consistência de estoque'
    },
    nutrition: {
      ingredients: 'Tomate pelati italiano maduro, alho-poró fresco triturado e fatiado, azeite extra virgem de oliva, tomilho fresco, alecrim, orégano de provence, salsa, cebola, alho, sal marinho, ácido cítrico.',
      table: [
        { label: 'Valor Energético', qty: '35 kcal', vd: '2%' },
        { label: 'Carboidratos', qty: '6.4 g', vd: '2%' },
        { label: 'Proteínas', qty: '1.1 g', vd: '1%' },
        { label: 'Gorduras Totais', qty: '0.8 g', vd: '1%' },
        { label: 'Sódio', qty: '115 mm', vd: '5%' }
      ]
    },
    recipe: {
      name: 'Pargo Assado no Papillote com Alho-Poró e Ervas Finas',
      prepTime: '30 min',
      difficulty: 'Médio',
      chefSecret: 'O vapor aromático do alho-poró e das ervas finas do molho cozinha as fibras do peixe no envelope de papel, garantindo um peixe macio e extremamente perfumado.',
      ingredients: [
        '2 filés grossos de pargo ou pescada amarela (180g cada)',
        '1 xícara de Molho Rústico com Ervas Finas e Alho-Poró Dubola',
        'Gotas de limão siciliano orgânico',
        'Sal refinado, pimenta branca e ramos de alecrim',
        'Fio de azeite e papel alumínio'
      ],
      steps: [
        'Tempere os filés de peixe com gotas de limão siciliano, sal e pimenta branca.',
        'Crie um envelope firme (papillote) usando papel alumínio, regando o azeite na base.',
        'Disponha o filé de peixe no centro e cubra abundantemente com o Molho Rústico com Ervas Finas e Alho-Poró Dubola.',
        'Feche bem as bordas do papel para não escapar vapor e asse a 200°C por 20 minutos.'
      ]
    }
  },

  // Aliases para URLs legadas (compatibilidade backward)
  'tomate-tradicional': {
    id: 'tomate-tradicional',
    category: 'tomate',
    name: 'Molho de Tomate Tradicional ao Sugo',
    fullName: 'Molho de Tomate Dubola Tradicional ao Sugo',
    slogan: 'O molho ancestral de tomates italianos apurados lentamente.',
    description: 'O aroma inebriante das cozinhas de trattoria italiana aos domingos. Cozido pacientemente com tomates pelati maduros importados selecionados, azeite extra virgem de primeira prensa, alho triturado e folhas frescas de manjericão gigante. Sem adição de açúcar refinado ou espessantes artificiais.',
    theme: { primary: '#ea580c', secondary: '#991b1b', glow: 'rgba(153, 27, 27, 0.15)', badge: 'bg-red-500/10 text-red-400 border-red-500/20', radialBg: 'from-[#170202] via-[#070000] to-[#000000]', buttonGrad: 'from-red-600 to-red-800 shadow-red-650/20 hover:shadow-red-650/40' },
    b2c: { packaging: 'Pote de Vidro Hermético (400g)', retailPrice: 'R$ 22,90', yieldText: 'Consistência ideal para molhos de massas tradicionais', shelfLife: '12 meses fechado, consumir em 5 dias após aberto' },
    b2b: { packaging: 'Bag Profissional (1,01 kg)', commercialPrice: 'Faturamento Corporativo Pizzarias', yieldText: 'Base líquida encorpada ideal para pizzas e lasanhas', stability: 'Suporta forno de alta temperatura mantendo coloração vermelha viva.', shelfLife: '18 meses fechado' },
    nutrition: { ingredients: 'Tomate italiano pelati, azeite extra virgem, alho, manjericão fresco, sal de parrilla, orégano e ácido cítrico.', table: [{ label: 'Valor Energético', qty: '32 kcal', vd: '2%' }, { label: 'Carboidratos', qty: '5.8 g', vd: '2%' }, { label: 'Proteínas', qty: '1.2 g', vd: '1%' }, { label: 'Gorduras Totais', qty: '0.6 g', vd: '1%' }, { label: 'Sódio', qty: '120 mg', vd: '5%' }] },
    recipe: { name: 'Gnocchi ao Molho Sugo Dubola', prepTime: '20 min', difficulty: 'Fácil', chefSecret: 'Adicione água de cozimento da massa ao molho para emulsionar perfeitamente.', ingredients: ['400g de gnocchi artesanal', '1 vidro de Molho ao Sugo Dubola', 'Parmesão ralado', 'Manjericão fresco'], steps: ['Cozinhe o gnocchi até flutuar.', 'Aqueça o molho em frigideira larga.', 'Junte o gnocchi ao molho e salteie.', 'Salpique parmesão e manjericão.'] }
  },
  'tomate-pedacos': {
    id: 'tomate-pedacos',
    category: 'tomate',
    name: 'Molho de Tomate Rústico',
    fullName: 'Molho de Tomate Dubola Rústico com Pedaços',
    slogan: 'A textura rústica dos tomates pelati esmagados artesanalmente.',
    description: 'Para cozinheiros exigentes que demandam dente e presença no prato. Tomates pelati maduros esmagados grosseiramente com as mãos e apurados longamente no fogo baixo, retendo pedaços carnudos, suculentos e aromáticos.',
    theme: { primary: '#ca8a04', secondary: '#991b1b', glow: 'rgba(153, 27, 27, 0.15)', badge: 'bg-red-500/10 text-red-400 border-red-500/20', radialBg: 'from-[#170305] via-[#070001] to-[#000000]', buttonGrad: 'from-red-650 to-red-900 shadow-red-650/20 hover:shadow-red-650/40' },
    b2c: { packaging: 'Pote de Vidro Hermético (400g)', retailPrice: 'R$ 24,90', yieldText: 'Textura rústica ideal para restaurante italiano em casa', shelfLife: '12 meses fechado, consumir em até 5 dias aberto' },
    b2b: { packaging: 'Bag Profissional (1,01 kg)', commercialPrice: 'Faturamento Corporativo Restaurantes', yieldText: 'Textura artesanal pedaçuda para pratos executivos', stability: 'Retém pedaços inteiros mesmo após fervura longa.', shelfLife: '18 meses fechado' },
    nutrition: { ingredients: 'Tomate pelati esmagado, azeite extra virgem, alho, cebola, manjericão, sal e ácido cítrico.', table: [{ label: 'Valor Energético', qty: '34 kcal', vd: '2%' }, { label: 'Carboidratos', qty: '6.2 g', vd: '2%' }, { label: 'Proteínas', qty: '1.3 g', vd: '1%' }, { label: 'Gorduras Totais', qty: '0.6 g', vd: '1%' }, { label: 'Sódio', qty: '125 mg', vd: '5%' }] },
    recipe: { name: 'Penne Rústico com Burrata Italiana', prepTime: '15 min', difficulty: 'Médio', chefSecret: 'Os pedaços de tomate envolvem as dobras do penne perfeitamente.', ingredients: ['200g de Penne de grano duro', '1 vidro de Molho Rústico Dubola', '1 burrata fresca', 'Manjericão fresco'], steps: ['Cozinhe o penne al dente.', 'Aqueça o molho rústico em frigideira.', 'Junte a massa e salteie.', 'Posicione a burrata no centro e sirva.'] }
  },
  'tomate-alho-poro': {
    id: 'tomate-alho-poro',
    category: 'tomate',
    name: 'Molho de Tomate Rústico com Ervas Finas e Alho-Poró',
    fullName: 'Molho de Tomate Dubola Rústico com Ervas Finas e Alho-Poró',
    slogan: 'O atalho aromático: o dulçor do alho-poró salteado com ervas finas.',
    description: 'O verdadeiro atalho de chef. Une o dulçor do alho-poró dourado no azeite com tomilho fresco, alecrim e orégano de provence. Complexo, aromático e premium.',
    theme: { primary: '#059669', secondary: '#991b1b', glow: 'rgba(153, 27, 27, 0.15)', badge: 'bg-red-500/10 text-red-400 border-red-500/20', radialBg: 'from-[#031405] via-[#010702] to-[#000000]', buttonGrad: 'from-red-600 to-emerald-700 shadow-red-650/20 hover:shadow-red-650/40' },
    b2c: { packaging: 'Pote de Vidro Hermético (400g)', retailPrice: 'R$ 25,90', yieldText: 'Ideal para risotos rápidos e molhos de peixe em casa', shelfLife: '12 meses fechado, consumir em até 5 dias aberto' },
    b2b: { packaging: 'Bag Profissional (1,01 kg)', commercialPrice: 'Faturamento Corporativo Gourmet Service', yieldText: 'Molho de alta distinção culinária para filés e pratos elaborados', stability: 'Aromas botânicos mantidos estáveis sob ebulição longa.', shelfLife: '18 meses fechado' },
    nutrition: { ingredients: 'Tomate pelati, alho-poró fresco, azeite extra virgem, tomilho, alecrim, orégano de provence, alho, sal marinho e ácido cítrico.', table: [{ label: 'Valor Energético', qty: '35 kcal', vd: '2%' }, { label: 'Carboidratos', qty: '6.4 g', vd: '2%' }, { label: 'Proteínas', qty: '1.1 g', vd: '1%' }, { label: 'Gorduras Totais', qty: '0.8 g', vd: '1%' }, { label: 'Sódio', qty: '115 mg', vd: '5%' }] },
    recipe: { name: 'Pargo no Papillote com Alho-Poró e Ervas Finas', prepTime: '30 min', difficulty: 'Médio', chefSecret: 'O vapor aromático do molho cozinha o peixe e preserva todo o perfume das ervas.', ingredients: ['2 filés de pargo (180g cada)', '1 xícara do Molho com Ervas Dubola', 'Limão siciliano', 'Azeite e papel alumínio'], steps: ['Tempere os filés com sal, pimenta e limão.', 'Monte o papillote com azeite na base.', 'Cubra o peixe com o molho e feche bem.', 'Asse a 200°C por 20 minutos.'] }
  }
};

// 2. PRODUCT IMAGE MAP — maps each productId to its public image path
const PRODUCT_IMAGES = {
  'ketchup-tradicional':       '/ketchup-tradicional.jpg',
  'ketchup-picante':           '/trio-ketchups-novo.png',
  'ketchup-goiaba':            '/hero-ketchup-goiaba.png',
  'maionese-tradicional':      '/maionese-tartaro.png',
  'maionese-tartaro':          '/maionese-tartaro.png',
  'maionese-defumada':         '/maionese-tartaro.png',
  'maionese-azeitona':         '/maionese-tartaro.png',
  'maionese-ervas':            '/maionese-tartaro.png',
  'maionese-alho':             '/maionese-tartaro.png',
  'maionese-limao':            '/maionese-tartaro.png',
  'barbecue-tradicional':      '/linha-barbecue.png',
  'barbecue-picante':          '/linha-barbecue.png',
  'barbecue-goiaba':           '/linha-barbecue.png',
  'mostarda-tradicional':      '/linha-mostardas.png',
  'mostarda-dijon':            '/linha-mostardas.png',
  'mostarda-mel':              '/linha-mostardas.png',
  'tomate-sugo':               '/linha-tomates.png',
  'tomate-rustico':            '/linha-tomates.png',
  'tomate-ervas-alho-poro':    '/linha-tomates.png',
  'tomate-tradicional':        '/linha-tomates.png',
  'tomate-pedacos':            '/linha-tomates.png',
  'tomate-alho-poro':          '/linha-tomates.png',
};

// Ordered list of all product IDs for prev/next navigation
const ALL_PRODUCT_IDS = [
  'ketchup-tradicional', 'ketchup-picante', 'ketchup-goiaba',
  'maionese-tradicional', 'maionese-tartaro', 'maionese-defumada',
  'maionese-azeitona', 'maionese-ervas', 'maionese-alho', 'maionese-limao',
  'barbecue-tradicional', 'barbecue-picante', 'barbecue-goiaba',
  'mostarda-tradicional', 'mostarda-dijon', 'mostarda-mel',
  'tomate-sugo', 'tomate-rustico', 'tomate-ervas-alho-poro',
  'tomate-tradicional', 'tomate-pedacos', 'tomate-alho-poro',
];

// Category display labels
const CATEGORY_LABELS = {
  ketchup:  'Linha Ketchups',
  maionese: 'Linha Maioneses',
  barbecue: 'Linha Barbecues',
  mostarda: 'Linha Mostardas',
  tomate:   'Linha Molhos de Tomate',
};

const CATEGORY_PATHS = {
  ketchup:  '/ketchups',
  maionese: '/maioneses',
  barbecue: '/barbecues',
  mostarda: '/mostardas',
  tomate:   '/molhos-de-tomate',
};

export default function DubolaProductDetailView() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [b2bMode, setB2bMode] = useState(false);
  const [nutritionExpanded, setNutritionExpanded] = useState(false);
  const [recipeDrawerOpen, setRecipeDrawerOpen] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const product = PRODUCTS_DATABASE[productId] || PRODUCTS_DATABASE['ketchup-goiaba'];

  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    cnpj: '',
    email: '',
    phone: '',
    volume: '50-100',
  });
  const [activeInput, setActiveInput] = useState(null);

  // Initialize Lenis scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Scroll to top on load
    window.scrollTo(0, 0);

    return () => {
      lenis.destroy();
    };
  }, [productId]);

  // Entrance animations
  useEffect(() => {
    gsap.fromTo('.anim-fade-in', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out' }
    );
  }, [productId, b2bMode]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.cnpj) return;
    setFormSubmitted(true);
  };

  const toggleIngredientCheck = (ing) => {
    if (checkedIngredients.includes(ing)) {
      setCheckedIngredients(checkedIngredients.filter(item => item !== ing));
    } else {
      setCheckedIngredients([...checkedIngredients, ing]);
    }
  };

  const theme = product.theme;
  const currentSpec = b2bMode ? product.b2b : product.b2c;

  // Related products: same category, excluding current, max 4
  const relatedProducts = ALL_PRODUCT_IDS
    .filter(id => {
      const p = PRODUCTS_DATABASE[id];
      return p && p.category === product.category && id !== productId;
    })
    .slice(0, 4);

  // Prev / next navigation
  const navIds = ALL_PRODUCT_IDS.filter(id => PRODUCTS_DATABASE[id]);
  const currentNavIndex = navIds.indexOf(productId);
  const prevId = currentNavIndex > 0 ? navIds[currentNavIndex - 1] : null;
  const nextId = currentNavIndex < navIds.length - 1 ? navIds[currentNavIndex + 1] : null;

  // Product image
  const productImage = PRODUCT_IMAGES[productId] || '/trio-ketchups-novo.png';

  // Category label
  const categoryLabel = CATEGORY_LABELS[product.category] || product.category;

  return (
    <div className={`relative w-full min-h-screen text-[#f4f4f5] overflow-x-hidden font-sans selection:bg-[#ff003c]/35 selection:text-white bg-gradient-to-b ${theme.radialBg} transition-colors duration-750`}>

      {/* ── Ambient background glow orb ── */}
      <div
        className="fixed top-0 right-0 w-[700px] h-[700px] rounded-full blur-[200px] pointer-events-none z-0 opacity-30 transition-all duration-1000"
        style={{ backgroundColor: theme.primary }}
      />
      <div
        className="fixed bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[160px] pointer-events-none z-0 opacity-10"
        style={{ backgroundColor: theme.secondary }}
      />

      {/* ── Sticky header ── */}
      <DubolaHeader b2bMode={b2bMode} setB2bMode={setB2bMode} />

      <main className="max-w-7xl mx-auto px-6 sm:px-12 pt-8 pb-24 relative z-10 space-y-28">

        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-2 text-[10px] font-space-premium font-bold tracking-widest text-zinc-600 uppercase anim-fade-in" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-zinc-300 transition-colors">Home</Link>
          <span className="text-zinc-700">/</span>
          <Link to="/linha-dubola" className="hover:text-zinc-300 transition-colors">Linha Dubola</Link>
          <span className="text-zinc-700">/</span>
          <Link to={CATEGORY_PATHS[product.category] || "/linha-dubola"} className="hover:text-zinc-300 transition-colors">{categoryLabel}</Link>
          <span className="text-zinc-700">/</span>
          <span className="text-zinc-400 truncate max-w-[160px]">{product.name}</span>
        </nav>

        {/* ════════════════════════════════════════════
             SECTION 1 — HERO: floating image + copy
        ════════════════════════════════════════════ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* LEFT — floating product image (5/12) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative anim-fade-in">

            {/* Large ambient glow orb behind image */}
            <div
              className="absolute w-[340px] h-[420px] rounded-full blur-[100px] opacity-40 z-0"
              style={{ backgroundColor: theme.primary }}
            />

            {/* Category badge chip */}
            <div className="relative z-20 mb-6 flex items-center gap-2">
              <span className={`border px-4 py-1.5 rounded-full text-[9px] font-space-premium font-black uppercase tracking-widest ${theme.badge}`}>
                {categoryLabel.toUpperCase()}
              </span>
              {b2bMode && (
                <span className="bg-[#ff003c] text-white text-[8px] font-space-premium font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgba(255,0,60,0.4)]">
                  FOOD SERVICE
                </span>
              )}
            </div>

            {/* Floating product image — no glass frame */}
            <div className="relative z-10 w-full max-w-sm flex items-center justify-center">
              <img
                key={`${productId}-${b2bMode ? 'b2b' : 'b2c'}`}
                src={b2bMode ? '/bag-food-service.jpg' : productImage}
                alt={product.fullName}
                className="w-full max-h-[480px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] transition-all duration-700 hover:scale-[1.03]"
                style={{
                  filter: `drop-shadow(0 20px 50px ${theme.primary}55) drop-shadow(0 40px 80px rgba(0,0,0,0.7))`
                }}
                onError={(e) => {
                  e.currentTarget.src = '/trio-ketchups-novo.png';
                }}
              />
            </div>

            {/* Packaging label chip below image */}
            <div className="relative z-20 mt-6 glass-premium px-4 py-2 rounded-2xl border border-white/[0.06]">
              <span className="text-[10px] font-space-premium font-bold text-white uppercase tracking-wider">
                {currentSpec.packaging}
              </span>
            </div>

            {/* Back link */}
            <Link
              to="/linha-dubola"
              className="mt-5 inline-flex items-center gap-2 text-xs font-space-premium font-bold text-zinc-600 hover:text-white transition-colors"
            >
              <ArrowLeft size={13} /> CATÁLOGO COMPLETO
            </Link>
          </div>

          {/* RIGHT — copy + specs (7/12) */}
          <div className="lg:col-span-7 space-y-7 text-left anim-fade-in">

            {/* Eyebrow */}
            <p className="text-[10px] font-space-premium font-bold tracking-widest uppercase text-[#ff003c]">
              A Assinatura Dubola de Rigor · {categoryLabel}
            </p>

            {/* H1 */}
            <h1 className="font-rockwell text-4xl sm:text-6xl font-black uppercase text-white leading-[0.92] tracking-tight">
              {product.name}
            </h1>

            {/* Slogan */}
            <p
              className="text-base sm:text-lg font-bold italic leading-snug"
              style={{ color: theme.primary }}
            >
              &ldquo;{product.slogan}&rdquo;
            </p>

            {/* Description */}
            <p className="text-zinc-400 font-sans-premium text-sm sm:text-base leading-relaxed max-w-2xl">
              {product.description}
            </p>

            {/* B2C / B2B Spec Panel */}
            <div id="especificacoes" className="glass-premium p-6 rounded-3xl border border-white/[0.05] space-y-4">
              {/* Panel header with live indicator */}
              <div className="flex justify-between items-center pb-3 border-b border-white/[0.06]">
                <h3 className="font-space-premium font-black text-xs uppercase tracking-widest text-white">
                  {b2bMode ? 'Ficha Técnica Food Service (B2B)' : 'Ficha Técnica Consumidor (B2C)'}
                </h3>
                <span className={`w-2 h-2 rounded-full animate-ping ${b2bMode ? 'bg-[#ff003c]' : 'bg-emerald-500'}`} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans-premium">
                <div className="space-y-1">
                  <span className="text-zinc-500 block font-bold text-[9px] uppercase tracking-wider">Embalagem</span>
                  <span className="text-white font-extrabold">{currentSpec.packaging}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-zinc-500 block font-bold text-[9px] uppercase tracking-wider">
                    {b2bMode ? 'Valor / Condições' : 'Preço de Varejo Sugerido'}
                  </span>
                  <span className="text-white font-extrabold">{currentSpec.commercialPrice || currentSpec.retailPrice}</span>
                </div>
                <div className="space-y-1 sm:col-span-2 border-t border-white/[0.06] pt-3">
                  <span className="text-zinc-500 block font-bold text-[9px] uppercase tracking-wider">Rendimento Culinário</span>
                  <span className="text-white font-medium leading-relaxed">{currentSpec.yieldText}</span>
                </div>
                {b2bMode && product.b2b.stability && (
                  <div className="space-y-1 sm:col-span-2 border-t border-white/[0.06] pt-3">
                    <span className="text-zinc-500 block font-bold text-[9px] uppercase tracking-wider">Estabilidade de Chapa & Banho</span>
                    <p className="text-zinc-400 leading-relaxed">{product.b2b.stability}</p>
                  </div>
                )}
                <div className="space-y-1 sm:col-span-2 border-t border-white/[0.06] pt-3">
                  <span className="text-zinc-500 block font-bold text-[9px] uppercase tracking-wider">Conservação e Validade</span>
                  <span className="text-zinc-400 font-medium">{currentSpec.shelfLife}</span>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
              {b2bMode ? (
                <a
                  href="#b2b-form"
                  className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 px-10 py-4 rounded-2xl font-space-premium font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_15px_30px_rgba(255,255,255,0.08)]"
                >
                  <Users size={13} /> SOLICITAR KIT DE AMOSTRA
                </a>
              ) : (
                <button
                  onClick={() =>
                    alert('Os molhos Dubola estão disponíveis nos principais empórios e redes de supermercados (Pão de Açúcar, St. Marche, Zaffari, Zona Sul e Mambo).')
                  }
                  className={`w-full sm:w-auto text-white px-10 py-4 rounded-2xl font-space-premium font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all bg-gradient-to-r shadow-lg ${theme.buttonGrad}`}
                >
                  <Package size={13} /> ONDE ENCONTRAR
                </button>
              )}
              <button
                onClick={() => setB2bMode(!b2bMode)}
                className="w-full sm:w-auto text-center border border-white/10 hover:border-white/20 bg-zinc-900/40 text-white px-8 py-4 rounded-2xl font-space-premium font-black text-xs uppercase tracking-widest transition-all"
              >
                {b2bMode ? 'VER VAREJO (B2C)' : 'VER FOOD SERVICE (B2B)'}
              </button>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
             SECTION 2 — CLEAN LABEL & NUTRITION
        ════════════════════════════════════════════ */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pt-12 border-t border-white/[0.04] text-left">

          {/* Ingredients */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-emerald-500">
              <Leaf size={12} />
              <span className="text-[10px] font-space-premium font-bold tracking-widest uppercase">Clean Label · Ingredientes de Verdade</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-white leading-none">
              O COMPROMISSO ABSOLUTO<br />
              <span className="text-emerald-500">COM A MATÉRIA-PRIMA</span>
            </h2>
            <p className="text-zinc-400 font-sans-premium text-sm leading-relaxed">
              Nossos condimentos são desenvolvidos sob o rigor Clean Label. Não utilizamos espessantes químicos,
              amidos artificiais, conservantes sintéticos invasivos ou corantes de laboratório. A densidade perfeita
              dos nossos molhos é fruto de cozimento lento e emulsões cirúrgicas.
            </p>
            <div className="glass-premium p-6 rounded-3xl space-y-3">
              <span className="text-zinc-500 block font-bold text-[9px] uppercase tracking-wider">Lista Completa de Ingredientes</span>
              <p className="text-white font-sans-premium text-xs leading-relaxed font-semibold">
                {product.nutrition.ingredients}
              </p>
              <div className="inline-flex items-center gap-2 text-emerald-500 text-[10px] font-bold tracking-wider pt-2 border-t border-white/5 w-full">
                <ShieldCheck size={12} /> ZERO ESPESSANTES DE AMIDO · ZERO CORANTES ARTIFICIAIS
              </div>
            </div>
          </div>

          {/* Nutrition table */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <div className="glass-premium rounded-3xl border border-white/[0.04] p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-space-premium font-black text-xs uppercase tracking-widest text-white">Informação Nutricional</h4>
                  <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Porção de 12g (1 colher de sopa)</span>
                </div>
                <button
                  onClick={() => setNutritionExpanded(!nutritionExpanded)}
                  className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                >
                  <ChevronDown size={14} className={`transition-transform duration-300 ${nutritionExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>
              <div className="space-y-2 text-xs font-sans-premium">
                {product.nutrition.table.map((row, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2.5 border-b border-white/5">
                    <span className="text-zinc-400 font-medium">{row.label}</span>
                    <div className="space-x-4 font-extrabold text-white">
                      <span>{row.qty}</span>
                      <span className="text-zinc-600 w-10 text-right inline-block">%VD</span>
                    </div>
                  </div>
                ))}
              </div>
              {nutritionExpanded && (
                <div className="text-[10px] text-zinc-500 leading-relaxed font-sans-premium pt-3 border-t border-white/5 space-y-2">
                  <p>(*) % Valores Diários de referência com base em uma dieta de 2.000 kcal ou 8.400 kJ.</p>
                  <p>(**) VD não estabelecido. Conservar sob refrigeração de 2°C a 6°C após aberto.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════
             SECTION 3 — CHEF'S RECIPE
        ════════════════════════════════════════════ */}
        <section id="receita" className="bg-[#0b0b0d] p-8 sm:p-12 rounded-3xl border border-white/[0.04] text-left space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-white/5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 bg-[#ff003c]/10 border border-[#ff003c]/20 px-3 py-1 rounded-full text-[#ff003c]">
                <ChefHat size={12} />
                <span className="text-[9px] font-space-premium font-bold tracking-widest uppercase">RECEITA EXCLUSIVA ASSINADA</span>
              </div>
              <h3 className="font-space-premium font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                {product.recipe.name}
              </h3>
            </div>
            <div className="flex gap-4 shrink-0 text-zinc-500 text-[10px] font-space-premium font-bold uppercase pt-2">
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{product.recipe.prepTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Award size={12} />
                <span>{product.recipe.difficulty}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Ingredients checklist */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-1.5">
                <UtensilsCrossed size={12} className="text-zinc-400" />
                <span className="text-[10px] font-space-premium font-bold text-white uppercase tracking-widest">Ingredientes da Receita</span>
              </div>
              <div className="space-y-2.5">
                {product.recipe.ingredients.map((ing, idx) => (
                  <label
                    key={idx}
                    onClick={() => toggleIngredientCheck(ing)}
                    className="flex items-center gap-3 cursor-pointer py-1.5 select-none text-xs font-sans-premium text-zinc-300 hover:text-white"
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                      checkedIngredients.includes(ing)
                        ? 'bg-emerald-500 border-emerald-500 text-black'
                        : 'border-zinc-700 bg-zinc-900'
                    }`}>
                      {checkedIngredients.includes(ing) && <Check size={11} strokeWidth={3} />}
                    </div>
                    <span className={checkedIngredients.includes(ing) ? 'line-through text-zinc-500' : ''}>
                      {ing}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Chef secret + toggle */}
            <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
              <div className="bg-[#ff003c]/5 border border-[#ff003c]/10 p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-1.5 text-[#ff003c]">
                  <Info size={12} />
                  <span className="text-[10px] font-space-premium font-bold uppercase tracking-widest">POR QUE FUNCIONA? O SEGREDO DO CHEF</span>
                </div>
                <p className="text-xs text-zinc-400 font-sans-premium leading-relaxed">
                  {product.recipe.chefSecret}
                </p>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => setRecipeDrawerOpen(!recipeDrawerOpen)}
                  className="w-full bg-white text-black hover:bg-zinc-200 py-4 rounded-xl font-space-premium font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                >
                  {recipeDrawerOpen ? 'OCULTAR MODO DE PREPARO' : 'VER INSTRUÇÕES PASSO A PASSO'}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${recipeDrawerOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Collapsible steps drawer */}
          {recipeDrawerOpen && (
            <div className="glass-premium p-6 sm:p-8 rounded-2xl text-left space-y-6 border border-white/[0.04] mt-6">
              <div className="flex items-center gap-2 text-[#ff003c]">
                <ChefHat size={16} />
                <h4 className="font-space-premium font-bold text-sm uppercase tracking-wider">Modo de Preparo Detalhado</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                {product.recipe.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start py-3 border-b border-zinc-900">
                    <span className="font-display font-black text-xl text-zinc-600 shrink-0">{(idx + 1).toString().padStart(2, '0')}</span>
                    <p className="text-xs text-zinc-300 font-sans-premium leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ════════════════════════════════════════════
             SECTION 4 — RELATED PRODUCTS STRIP
        ════════════════════════════════════════════ */}
        {relatedProducts.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-space-premium font-bold tracking-widest uppercase text-[#ff003c]">Também da {categoryLabel}</p>
                <h3 className="font-display font-black text-xl sm:text-2xl uppercase text-white tracking-tight">EXPLORE A LINHA COMPLETA</h3>
              </div>
              <Link
                to="/linha-dubola"
                className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-space-premium font-bold tracking-widest uppercase text-zinc-500 hover:text-white transition-colors"
              >
                VER TODOS <ArrowRight size={12} />
              </Link>
            </div>

            {/* Horizontal scrollable strip */}
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
              {relatedProducts.map(id => {
                const rp = PRODUCTS_DATABASE[id];
                if (!rp) return null;
                return (
                  <Link
                    key={id}
                    to={`/produto/${id}`}
                    className="group flex-none snap-start w-56 sm:w-64 glass-premium rounded-2xl border border-white/[0.05] p-5 space-y-4 hover:border-white/10 transition-all"
                  >
                    {/* Product image thumbnail */}
                    <div className="relative h-32 flex items-center justify-center overflow-hidden rounded-xl">
                      <div
                        className="absolute inset-0 rounded-xl blur-2xl opacity-30"
                        style={{ backgroundColor: rp.theme.primary }}
                      />
                      <img
                        src={PRODUCT_IMAGES[id] || '/trio-ketchups-novo.png'}
                        alt={rp.name}
                        className="relative z-10 h-28 w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-500"
                        onError={e => { e.currentTarget.src = '/trio-ketchups-novo.png'; }}
                      />
                    </div>
                    {/* Info */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: rp.theme.primary }}
                        />
                        <span className="text-[9px] font-space-premium font-bold uppercase tracking-widest text-zinc-500">
                          {rp.category}
                        </span>
                      </div>
                      <h4 className="font-display font-black text-sm uppercase text-white leading-tight">{rp.name}</h4>
                      <p className="text-[10px] text-zinc-500 font-sans-premium italic leading-snug line-clamp-2">{rp.slogan}</p>
                    </div>
                    {/* Arrow */}
                    <div className="flex items-center gap-1 text-[9px] font-space-premium font-bold uppercase tracking-widest" style={{ color: rp.theme.primary }}>
                      VER PRODUTO <ArrowRight size={10} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════
             SECTION 5 — B2B LEAD FORM (B2B mode only)
        ════════════════════════════════════════════ */}
        {b2bMode && (
          <section
            id="b2b-form"
            className="bg-[#050507] p-8 sm:p-12 rounded-3xl border border-[#ff003c]/20 relative overflow-hidden text-left space-y-8"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] bg-[#ff003c]/5 pointer-events-none" />
            <div className="max-w-3xl mx-auto space-y-8 relative z-10">
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 bg-[#ff003c]/15 border border-[#ff003c]/30 px-4 py-1.5 rounded-full text-white">
                  <Users size={12} className="text-[#ff003c]" />
                  <span className="text-[10px] font-space-premium font-bold tracking-widest uppercase">SOLICITAÇÃO COMERCIAL DE FOOD SERVICE</span>
                </div>
                <h3 className="font-space-premium font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  RECEBER AMOSTRA GRÁTIS DE 5KG
                </h3>
                <p className="text-xs text-zinc-500 font-sans-premium leading-relaxed max-w-xl">
                  Se você é chef, comprador ou proprietário de um estabelecimento comercial (hamburgueria, restaurante, hotel ou distribuidora),
                  insira seu CNPJ ativo para receber amostras corporativas para testes.
                </p>
              </div>

              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div className={`form-input-wrap ${activeInput === 'name' ? 'active' : ''} ${formData.name ? 'filled' : ''}`}>
                    <label className="form-label">Nome do Solicitante</label>
                    <input type="text" required className="w-full bg-transparent border-none outline-none py-3 text-sm text-white font-sans-premium"
                      value={formData.name} onFocus={() => setActiveInput('name')} onBlur={() => setActiveInput(null)}
                      onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className={`form-input-wrap ${activeInput === 'businessName' ? 'active' : ''} ${formData.businessName ? 'filled' : ''}`}>
                    <label className="form-label">Razão Social / Nome do Restaurante</label>
                    <input type="text" required className="w-full bg-transparent border-none outline-none py-3 text-sm text-white font-sans-premium"
                      value={formData.businessName} onFocus={() => setActiveInput('businessName')} onBlur={() => setActiveInput(null)}
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})} />
                  </div>
                  <div className={`form-input-wrap ${activeInput === 'cnpj' ? 'active' : ''} ${formData.cnpj ? 'filled' : ''}`}>
                    <label className="form-label">CNPJ Corporativo</label>
                    <input type="text" required placeholder="00.000.000/0000-00"
                      className="w-full bg-transparent border-none outline-none py-3 text-sm text-white font-sans-premium placeholder:opacity-0 focus:placeholder:opacity-50"
                      value={formData.cnpj} onFocus={() => setActiveInput('cnpj')} onBlur={() => setActiveInput(null)}
                      onChange={(e) => setFormData({...formData, cnpj: e.target.value})} />
                  </div>
                  <div className={`form-input-wrap ${activeInput === 'email' ? 'active' : ''} ${formData.email ? 'filled' : ''}`}>
                    <label className="form-label">E-mail Corporativo</label>
                    <input type="email" required className="w-full bg-transparent border-none outline-none py-3 text-sm text-white font-sans-premium"
                      value={formData.email} onFocus={() => setActiveInput('email')} onBlur={() => setActiveInput(null)}
                      onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className={`form-input-wrap ${activeInput === 'phone' ? 'active' : ''} ${formData.phone ? 'filled' : ''}`}>
                    <label className="form-label">Telefone / WhatsApp</label>
                    <input type="tel" required placeholder="(00) 00000-0000"
                      className="w-full bg-transparent border-none outline-none py-3 text-sm text-white font-sans-premium placeholder:opacity-0 focus:placeholder:opacity-50"
                      value={formData.phone} onFocus={() => setActiveInput('phone')} onBlur={() => setActiveInput(null)}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="space-y-1 text-left sm:col-span-2">
                    <span className="text-[10px] font-space-premium font-bold text-zinc-500 uppercase tracking-widest block mb-1">Estimativa de Consumo Mensal</span>
                    <div className="grid grid-cols-3 gap-3">
                      {[{id:'50-100',label:'Até 100 kg/mês'},{id:'100-300',label:'100–300 kg'},{id:'300+',label:'Mais de 300 kg'}].map(item => (
                        <button key={item.id} type="button"
                          onClick={() => setFormData({...formData, volume: item.id})}
                          className={`py-2 rounded-xl text-[10px] font-space-premium font-bold tracking-widest uppercase border transition-all ${
                            formData.volume === item.id ? 'border-[#ff003c] text-white bg-[#ff003c]/10' : 'border-zinc-800 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >{item.label}</button>
                      ))}
                    </div>
                  </div>
                  <button type="submit"
                    className="w-full sm:col-span-2 bg-[#ff003c] hover:bg-[#d90432] text-white py-4 rounded-2xl font-space-premium font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all mt-4"
                  >
                    SOLICITAR AMOSTRA PROFISSIONAL DO CHEF
                  </button>
                </form>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 size={32} className="animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-space-premium font-black text-xl uppercase tracking-wider text-white">CNPJ Validado e Solicitação Confirmada!</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans-premium max-w-md">
                      Obrigado, {formData.name}. Nossa equipe comercial Dubola analisará os dados da {formData.businessName}
                      e fará contato via WhatsApp em até 24h úteis.
                    </p>
                  </div>
                  <button onClick={() => setFormSubmitted(false)}
                    className="text-[10px] font-space-premium font-bold tracking-widest text-[#ff003c] uppercase hover:underline"
                  >
                    ENVIAR OUTRA SOLICITAÇÃO
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── SECTION 6: PREV / NEXT NAVIGATION ── */}
        <nav className="pt-8 border-t border-white/[0.04] flex items-center justify-between gap-4">
          {prevId ? (
            <Link
              to={`/produto/${prevId}`}
              className="group flex items-center gap-3 text-left min-w-0"
            >
              <div className="w-10 h-10 rounded-full glass-premium border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:border-white/20 transition-all">
                <ArrowLeft size={16} className="text-zinc-400 group-hover:text-white transition-colors" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-space-premium font-bold uppercase tracking-widest text-zinc-650">Produto Anterior</p>
                <p className="text-sm font-display font-black uppercase text-white truncate">{PRODUCTS_DATABASE[prevId]?.name}</p>
              </div>
            </Link>
          ) : <div />}

          {nextId ? (
            <Link
              to={`/produto/${nextId}`}
              className="group flex items-center gap-3 text-right min-w-0"
            >
              <div className="min-w-0">
                <p className="text-[9px] font-space-premium font-bold uppercase tracking-widest text-zinc-650">Próximo Produto</p>
                <p className="text-sm font-display font-black uppercase text-white truncate">{PRODUCTS_DATABASE[nextId]?.name}</p>
              </div>
              <div className="w-10 h-10 rounded-full glass-premium border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:border-white/20 transition-all">
                <ArrowRight size={16} className="text-zinc-400 group-hover:text-white transition-colors" />
              </div>
            </Link>
          ) : <div />}
        </nav>

      </main>

      <DubolaFooter />
    </div>
  );
}


