import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ChefVirtual from '../components/ChefVirtual';
import {
  Sparkles,
  Leaf,
  ArrowRight,
  ArrowLeft,
  Flame,
  UtensilsCrossed,
  ChefHat,
  Store,
  Users,
  ChevronDown,
  CheckCircle2,
  ShoppingCart,
  Star,
  Clock,
  Zap,
  Shield,
  Award,
  Package,
  Phone,
  ExternalLink,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import DubolaHeader from '../components/DubolaHeader';
import DubolaFooter from '../components/DubolaFooter';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────── */
/*  DATA                                               */
/* ─────────────────────────────────────────────────── */
const FLAVORS = {
  tradicional: {
    id: 'tradicional',
    name: 'Ketchup Tradicional',
    shortName: 'Tradicional',
    slogan: 'O Clássico Reinventado',
    glowColor: 'rgba(220, 38, 38, 0.3)',
    textColor: 'text-red-500',
    borderColor: 'border-red-500/30',
    accentHex: '#dc2626',
    btnGrad: 'from-red-600 to-amber-700',
    badge: 'O Original Premium',
    desc: 'Tomate pelati italiano cozido lentamente a fogo baixo durante horas. Um buquê de especiarias secretas e o dulçor natural do açúcar mascavo criam uma textura rústica incomparável — espessa, encorpada, honesta.',
    pairing: 'Smash burgers, batatas fritas rústicas, pizzas artesanais, ovos mexidos com bacon.',
    culinaryTip: 'Pincele sobre o pão brioche tostado na manteiga antes de montar o hambúrguer. O calor carameliza os açúcares e cria uma crosta que eleva o lanche a outro nível.',
    image: '/ketchup/trioKetchupDubola.png',
    highlights: ['Tomate Pelati Importado', 'Textura Encorpada', 'Zero Conservantes'],
  },
  goiaba: {
    id: 'goiaba',
    name: 'Ketchup com Goiaba',
    shortName: 'Goiaba',
    slogan: 'A Insurreição Tropical',
    glowColor: 'rgba(244, 63, 94, 0.3)',
    textColor: 'text-rose-400',
    borderColor: 'border-rose-500/30',
    accentHex: '#fb7185',
    btnGrad: 'from-rose-600 to-pink-700',
    badge: 'A Grande Aposta Dubola',
    desc: 'A ousadia que virou ícone. A polpa madura de goiabas vermelhas selecionadas encontra o tomate pelati em uma fusão que não deveria funcionar — mas é absolutamente perfeita. Doce, ácida, profunda.',
    pairing: 'Costelinha suína assada, queijos brancos grelhados, charcutaria, torresmo, petiscos fritos.',
    culinaryTip: 'Misture com cachaça envelhecida em proporção 3:1 para um glaze extraordinário em carnes suínas na churrasqueira. Aplique nos últimos 5 minutos de brasa alta.',
    image: '/ketchup/trioKetchupDuboladark2.png',
    highlights: ['Polpa de Goiaba Vermelha', 'Equilíbrio Agridoce', 'Sabor Inédito no Mercado'],
  },
  picante: {
    id: 'picante',
    name: 'Ketchup Picante',
    shortName: 'Picante',
    slogan: 'A Explosão de Calor',
    glowColor: 'rgba(234, 88, 12, 0.3)',
    textColor: 'text-orange-400',
    borderColor: 'border-orange-500/30',
    accentHex: '#f97316',
    btnGrad: 'from-orange-600 to-red-700',
    badge: 'Habanero & Chipotle',
    desc: 'Para quem exige mais do que sabor. A infusão cirúrgica de Habanero e Jalapeño frescos entrega uma picância ascendente e persistente — não queima e some, ela constrói e fica. Adrenalina líquida em frasco.',
    pairing: 'Buffalo wings, carnes gordas na brasa, tacos gourmet, frutos do mar fritos.',
    culinaryTip: 'Combine com mel silvestre e suco de limão cravo (proporção 2:1:0.5) para um dipping sauce que rivaliza com os melhores restaurantes americanos.',
    image: '/ketchup/trioKetchupDuboladark.png',
    highlights: ['Habanero + Jalapeño Frescos', 'Picância Progressiva', 'Sem Capsaicina Isolada'],
  },
};

const RECIPES = [
  {
    id: 1,
    title: 'Double Smash com Crosta Caramelizada',
    flavor: 'Tradicional',
    flavorColor: 'text-red-400',
    chef: 'Chef Marcus Vinícius',
    time: '15 min',
    difficulty: 'Fácil',
    serves: '2 pessoas',
    ingredients: [
      '2 blends bovinos de 90g (80% patinho, 20% fraldinha)',
      'Pão brioche mantegueiro',
      'Queijo cheddar inglês fatiado',
      'Ketchup Tradicional Dubola',
      'Manteiga noisette',
      'Flor de sal e pimenta-do-reino recém-moída',
    ],
    method: 'Aqueça a chapa de ferro fundido ao máximo. Passe manteiga no brioche cortado e sele até dourar. Esmague as bolas de blend na chapa com espátula firme. Tempere imediatamente. Pincele Ketchup Tradicional Dubola sobre a face crua antes de virar — o açúcar mascavo carameliza sob o cheddar e cria uma crosta escura, profunda e irresistível.',
    tip: 'O segredo é não mover a carne. Deixe a Maillard acontecer.',
  },
  {
    id: 2,
    title: 'Costelinha Laqueada com Goiabada e Cachaça',
    flavor: 'Goiaba',
    flavorColor: 'text-rose-400',
    chef: 'Chef Letícia Dornelles',
    time: '1h 45min',
    difficulty: 'Médio',
    serves: '4 pessoas',
    ingredients: [
      '1 rack completo de costelinha suína',
      '3 colheres de Ketchup com Goiaba Dubola',
      '50ml de cachaça envelhecida (2 anos)',
      'Alho assado amassado',
      'Alecrim fresco',
      'Pimenta-do-reino e noz-moscada',
    ],
    method: 'Tempere e envolva o rack em papel alumínio duplo. Asse a 160°C por 1h30. Prepare o glaze: reduza o Ketchup com Goiaba e a cachaça em fogo médio por 3 minutos. Retire o alumínio, eleve para 220°C, pincele o glaze generosamente e asse por mais 15 minutos até caramelizar.',
    tip: 'O glaze é a alma do prato. Não economize — faça duas aplicações.',
  },
  {
    id: 3,
    title: 'Buffalo Wings com Dipping de Habanero',
    flavor: 'Picante',
    flavorColor: 'text-orange-400',
    chef: 'Chef Thiago Castanho',
    time: '35 min',
    difficulty: 'Fácil',
    serves: '2 pessoas',
    ingredients: [
      '1kg de tulipas de frango',
      '3 colheres de Ketchup Picante Dubola',
      '2 colheres de mel silvestre',
      '30g de manteiga sem sal derretida',
      'Páprica defumada, alho em pó, sal',
      'Suco de 1 limão cravo',
    ],
    method: 'Tempere as tulipas e asse a 220°C por 25 minutos até a pele estalar como vidro. Em um bowl grande, combine o Ketchup Picante, manteiga derretida, mel e limão. Jogue as asas direto no bowl e envolva com urgência — a fricção do calor com o molho cria o coating perfeito. Sirva imediatamente.',
    tip: 'Nunca deixe o molho no fogo. O calor residual das asas é suficiente.',
  },
  {
    id: 4,
    title: 'Ovo Escalfado com Toast e Ketchup Claro',
    flavor: 'Tradicional',
    flavorColor: 'text-red-400',
    chef: 'Chef Ana Barreto',
    time: '10 min',
    difficulty: 'Fácil',
    serves: '1 pessoa',
    ingredients: [
      '2 ovos caipiras frescos',
      'Sourdough de fermento natural fatiado',
      'Ketchup Tradicional Dubola',
      'Manteiga normanda',
      'Cebolinha, flor de sal e pimenta branca',
    ],
    method: 'Toste o pão no forno com manteiga. Escalde os ovos em água com um fio de vinagre branco (90°C, 3 minutos). Monte: pão, ovo sobre ovo, um traço generoso de Ketchup Tradicional em zigue-zague. Finalize com flor de sal e cebolinha picada fina.',
    tip: 'O ketchup não é decoração. É o componente ácido que equilibra a gema gordurosa.',
  },
];

const CHANNELS = [
  {
    name: 'Mercado Livre',
    tag: 'Maior Marketplace do Brasil',
    icon: '🛒',
    color: 'from-yellow-500/20 to-amber-600/10',
    border: 'border-yellow-500/20',
    tagColor: 'text-yellow-400',
    badge: 'Full ⭐ 4.9',
    url: 'https://www.mercadolivre.com.br',
    cta: 'Comprar Agora',
  },
  {
    name: 'Amazon',
    tag: 'Entrega Prime em 24h',
    icon: '📦',
    color: 'from-orange-500/20 to-amber-700/10',
    border: 'border-orange-500/20',
    tagColor: 'text-orange-400',
    badge: 'Prime Elegível',
    url: 'https://www.amazon.com.br',
    cta: 'Comprar com Prime',
  },
  {
    name: 'TikTok Shop',
    tag: 'Viralizou nas Receitas',
    icon: '🎵',
    color: 'from-pink-500/20 to-violet-600/10',
    border: 'border-pink-500/20',
    tagColor: 'text-pink-400',
    badge: '+ 2M Views',
    url: 'https://shop.tiktok.com',
    cta: 'Ver no TikTok Shop',
  },
  {
    name: 'iFood Mercado',
    tag: 'Delivery em 30 minutos',
    icon: '🛵',
    color: 'from-red-500/20 to-rose-600/10',
    border: 'border-red-500/20',
    tagColor: 'text-red-400',
    badge: 'Disponível Hoje',
    url: 'https://www.ifood.com.br',
    cta: 'Pedir Agora',
  },
];

const TRUST_BADGES = [
  { icon: Shield, label: '100% Natural', sub: 'Zero conservantes artificiais' },
  { icon: Award, label: 'Tomate Pelati', sub: 'Importado da Itália' },
  { icon: Zap, label: 'Clean Label', sub: 'Rótulo limpo certificado' },
  { icon: Leaf, label: 'Sem Glúten', sub: 'Livre de corantes e amidos' },
];

/* ─────────────────────────────────────────────────── */
/*  COMPONENT                                          */
/* ─────────────────────────────────────────────────── */
export default function DubolaKetchupsView() {
  const [activeFlavor, setActiveFlavor] = useState('tradicional');
  const [hoveredSide, setHoveredSide] = useState(null);
  const [activeRecipe, setActiveRecipe] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', businessName: '', cnpj: '', email: '' });
  const [recipesExpanded, setRecipesExpanded] = useState(false);

  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const manifestoRef = useRef(null);
  const floatRef = useRef(null);
  const onde_comprarRef = useRef(null);

  const currentFlavor = FLAVORS[activeFlavor];

  /* Lenis smooth scroll */
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  /* GSAP – Hero video scrub */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const init = () => {
      gsap.fromTo(video, { currentTime: 0 }, {
        currentTime: video.duration || 6,
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1.5, pin: true },
      });
    };
    video.addEventListener('loadedmetadata', init);
    if (video.readyState >= 1) init();
    return () => video.removeEventListener('loadedmetadata', init);
  }, []);

  /* GSAP – Manifesto scroll animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade-in
      gsap.fromTo('.manifesto-header', 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cursive text fade and slight rotation
      gsap.fromTo('.manifesto-cursive',
        { scale: 0.8, rotate: -15, opacity: 0 },
        {
          scale: 1,
          rotate: -3,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Header right side text fade-in
      gsap.fromTo('.manifesto-header-right',
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Manifesto paragraphs staggered fade-in
      gsap.fromTo('.manifesto-p',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Mobile bottles fade-in
      gsap.fromTo('.manifesto-bottles',
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => { e.preventDefault(); setFormSubmitted(true); };

  const visibleRecipes = recipesExpanded ? RECIPES : RECIPES.slice(0, 2);

  return (
    <div className="relative w-full min-h-screen text-[#f4f4f5] overflow-x-hidden font-sans bg-black selection:bg-red-600/30 selection:text-white">

      {/* Dynamic ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-15 transition-all duration-1000"
        style={{ background: `radial-gradient(circle at 50% 40%, ${currentFlavor.glowColor} 0%, transparent 65%)` }}
      />

      {/* ── HEADER ── */}
      <DubolaHeader />

      {/* ── SECTION 1: HERO (PINNED VIDEO SCRUB) ── */}
      <section ref={heroRef} className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden z-10">
        <div className="absolute inset-0 z-0">
          <video ref={videoRef} src="/ketchup/0615(1).mp4" muted playsInline preload="auto" className="w-full h-full object-cover opacity-85" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/50 pointer-events-none" />
        </div>

        <div className="relative z-10 text-center max-w-5xl px-6 space-y-7">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 backdrop-blur-md px-4 py-1.5 rounded-full text-red-400">
            <Sparkles size={11} />
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase">Condimento de Autor — Feito com Obsessão</span>
          </div>

          <h1 className="font-display text-5xl sm:text-8xl font-black tracking-tight text-white uppercase leading-[0.9] drop-shadow-2xl">
            O Ketchup Que<br />
            <span style={{ color: '#ff2a2a' }}>Chefs Escolhem.</span>
          </h1>

          <p className="max-w-xl mx-auto text-sm sm:text-lg text-zinc-300 font-light leading-relaxed">
            Tomate pelati italiano. Goiaba vermelha cascão. Pimentas habanero frescas. Três ketchups que reescrevem as regras da mesa.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <a
              href="#sabores"
              className="px-7 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-[10px] tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)]"
            >
              Explorar Sabores
            </a>
            <a
              href="#onde-comprar"
              className="px-7 py-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md text-white font-bold text-[10px] tracking-widest uppercase transition-all hover:bg-white/10 hover:border-white/30"
            >
              Onde Comprar
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-zinc-500">
          <span className="text-[8px] font-bold tracking-widest uppercase">Role para descobrir</span>
          <ChevronDown size={14} className="animate-bounce" />
        </div>
      </section>

      {/* ── TRUST BADGES BAR ── */}
      <section className="relative z-10 bg-zinc-950 border-y border-white/[0.04] py-6 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-red-600/10 border border-red-600/20 text-red-400 shrink-0">
                <Icon size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">{label}</p>
                <p className="text-[10px] text-zinc-500">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 2: MANIFESTO ── */}
      <section
        id="manifesto"
        ref={manifestoRef}
        className="relative w-full overflow-hidden bg-[#62070e] py-24 lg:py-32 px-6 flex items-center z-10 border-t border-white/[0.02]"
      >
        {/* Background image for desktop (lg) */}
        <div className="absolute inset-0 hidden lg:block z-0">
          <img 
            src="/ketchup/trio-ketchups-sem-acucar-splash.png" 
            alt="" 
            className="w-full h-full object-cover object-right pointer-events-none select-none"
          />
          {/* Subtle overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* Background gradient for mobile */}
        <div className="absolute inset-0 lg:hidden bg-gradient-to-b from-[#62070e] via-[#760811] to-[#b6192c] pointer-events-none select-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Header of Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-16 lg:mb-24 w-full select-none">
            {/* Title Column */}
            <div className="lg:col-span-7 relative inline-flex items-center manifesto-header opacity-0 w-full">
              <h2 className="font-cheddar text-7xl sm:text-8xl md:text-9xl tracking-tight leading-none text-white uppercase select-none relative w-full">
                O JEITO DUBOLA
                <span className="absolute top-[-30%] left-[85%] w-[38%] lg:w-[42%] z-20 manifesto-cursive opacity-0 block">
                  <img 
                    src="/como-deve-ser-branco.png" 
                    alt="Como deve ser" 
                    className="w-full h-auto object-contain transform -rotate-3 select-none"
                    style={{
                      filter: 'drop-shadow(0px 3px 6px rgba(0,0,0,0.4))'
                    }}
                  />
                </span>
              </h2>
            </div>
            
            {/* Subtitle Column */}
            <div className="lg:col-span-5 lg:text-right manifesto-header-right opacity-0 w-full">
              <p className="font-cheddar text-xl sm:text-2xl lg:text-[2rem] leading-none tracking-tight text-white uppercase">
                A DUBOLA NASCEU PARA RESGATAR<br />
                A AUTENTICIDADE DOS SABORES.
              </p>
            </div>
          </div>

          {/* Grid container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left column: Manifesto text */}
            <div className="lg:col-span-6 space-y-8 select-none">
              {/* Paragraph 1 */}
              <p className="font-display uppercase tracking-wider text-2xl sm:text-3xl lg:text-[2.1rem] text-white manifesto-p opacity-0 leading-none">
                NÃO FAZEMOS MOLHOS APENAS PARA VENDER.
              </p>

              {/* Paragraph 2 */}
              <p className="font-display uppercase tracking-wider text-base sm:text-lg lg:text-[1.25rem] text-white/90 leading-snug max-w-xl manifesto-p opacity-0">
                FAZEMOS <span className="font-bold text-white">PRODUTOS AUTÊNTICOS</span> QUE TEMOS <span className="font-bold text-white">ORGULHO</span> DE COLOCAR NA MESA DA NOSSA PRÓPRIA FAMÍLIA.
              </p>

              {/* Paragraph 3 */}
              <div className="font-display uppercase tracking-wider text-base sm:text-lg lg:text-[1.25rem] text-white/90 leading-snug space-y-2 manifesto-p opacity-0">
                <p>ACREDITAMOS QUE <span className="font-bold text-white">SABOR</span> NÃO ACEITA <span className="font-bold text-white">ATALHOS</span>.</p>
                <p>ACREDITAMOS QUE <span className="font-bold text-white">QUALIDADE</span> NÃO É UM DIFERENCIAL.</p>
                <p className="pl-12 md:pl-28">É UMA <span className="font-bold text-white">OBRIGAÇÃO</span>.</p>
                <p>ACREDITAMOS QUE <span className="font-bold text-white">AUTENTICIDADE</span> VALE MAIS DO QUE SEGUIR TENDÊNCIAS.</p>
              </div>

              {/* Paragraph 4 */}
              <p className="font-display uppercase tracking-wider text-base sm:text-lg lg:text-[1.25rem] text-white/90 leading-snug manifesto-p opacity-0">
                ACREDITAMOS QUE <span className="font-bold text-white">CONFIANÇA</span> É CONQUISTADA TODOS OS DIAS.
              </p>

              {/* Paragraph 5 */}
              <div className="font-cheddar uppercase tracking-tight text-black space-y-1 pt-6 manifesto-p opacity-0">
                <p className="text-xl sm:text-2xl lg:text-[1.75rem] leading-none">E ACREDITAMOS QUE UM BOM MOLHO</p>
                <p className="text-2xl sm:text-3xl lg:text-[2.1rem] leading-none">É AQUELE QUE VOCÊ TERÁ ORGULHO DE SERVIR.</p>
              </div>
            </div>

            {/* Right column: Image visible ONLY on mobile/tablet */}
            <div className="lg:col-span-6 lg:hidden w-full flex justify-center mt-12 manifesto-bottles opacity-0">
              <img 
                src="/ketchup/trio-ketchups-sem-acucar-splash.png" 
                alt="Ketchups Dubola" 
                className="w-full max-w-lg object-contain drop-shadow-2xl"
              />
            </div>
            
            {/* Empty column on desktop to let the background bottles shine */}
            <div className="lg:col-span-6 hidden lg:block" />
          </div>
        </div>
      </section>

      {/* ── SECTION 3: VITRINE INTERATIVA ── */}
      <section id="sabores" className="relative py-36 bg-black border-t border-white/[0.02] overflow-hidden z-10">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-[0.25em]">A Linha de Frente</span>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white uppercase leading-none">
              TRÊS KETCHUPS.<br />TRÊS CARACTERES.
            </h2>
            <p className="text-zinc-500 text-sm">
              Não criamos variações de um mesmo produto. Criamos três ketchups distintos com personalidades completamente diferentes. Escolha o seu.
            </p>
          </div>

          {/* Flavor tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {Object.values(FLAVORS).map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFlavor(f.id)}
                className={`px-6 py-3.5 rounded-2xl border text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${activeFlavor === f.id
                  ? 'border-white/40 text-white bg-white/8 shadow-xl scale-105'
                  : 'border-zinc-900 text-zinc-500 bg-zinc-950/60 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
              >
                {f.shortName}
              </button>
            ))}
          </div>

          {/* Flavor detail */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">
            {/* Product visual */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div
                className="absolute w-80 h-80 rounded-full blur-[100px] opacity-35 z-0 transition-all duration-1000"
                style={{ backgroundColor: currentFlavor.glowColor }}
              />
              <div className="relative z-10 w-56 h-[26rem] select-none transition-all duration-500 hover:scale-[1.04]">
                <img
                  src={currentFlavor.image}
                  alt={currentFlavor.name}
                  className="w-full h-full object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.9)]"
                  onError={(e) => { e.target.src = '/ketchup/trioKetchupDubola.png'; }}
                />
              </div>
            </div>

            {/* Flavor info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className={`text-[9px] font-bold uppercase border px-3 py-1 rounded-full ${currentFlavor.textColor} ${currentFlavor.borderColor} bg-white/[0.02]`}>
                  {currentFlavor.badge}
                </span>
                <h3 className="font-display text-4xl sm:text-5xl font-black text-white uppercase leading-none">
                  {currentFlavor.name}
                </h3>
                <p className="text-xs text-zinc-500 italic">"{currentFlavor.slogan}"</p>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">{currentFlavor.desc}</p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2">
                {currentFlavor.highlights.map((h) => (
                  <span key={h} className="text-[9px] font-bold bg-zinc-900 border border-zinc-800 text-zinc-400 px-3 py-1.5 rounded-lg uppercase tracking-wider">
                    {h}
                  </span>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-white/[0.04]">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-red-400 shrink-0"><UtensilsCrossed size={14} /></div>
                  <div>
                    <strong className="text-[10px] text-white uppercase tracking-wider block mb-0.5">Harmonização Perfeita</strong>
                    <span className="text-xs text-zinc-400">{currentFlavor.pairing}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-red-400 shrink-0"><ChefHat size={14} /></div>
                  <div>
                    <strong className="text-[10px] text-white uppercase tracking-wider block mb-0.5">Técnica do Chef</strong>
                    <span className="text-xs text-zinc-400">{currentFlavor.culinaryTip}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href="#onde-comprar"
                  className={`inline-flex items-center gap-2 bg-gradient-to-r ${currentFlavor.btnGrad} text-white font-bold text-[10px] tracking-widest uppercase px-6 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]`}
                >
                  <ShoppingCart size={12} /> Comprar Agora
                </a>
                <a
                  href="#receitas"
                  className="inline-flex items-center gap-2 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 font-bold text-[10px] tracking-widest uppercase px-6 py-3.5 rounded-xl transition-all"
                >
                  Ver Receitas
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: RECEITAS ── */}
      <section id="receitas" className="relative py-36 bg-zinc-950 border-t border-white/[0.02] z-10 overflow-hidden">
        {/* BG accent */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.015]">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_60px,rgba(255,255,255,0.5)_60px,rgba(255,255,255,0.5)_61px),repeating-linear-gradient(90deg,transparent,transparent_60px,rgba(255,255,255,0.5)_60px,rgba(255,255,255,0.5)_61px)]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 space-y-16 relative z-10">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-[0.25em]">Da Cozinha para a Sua Mesa</span>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white uppercase leading-none">
              RECEITAS<br />DE CHEF.
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Desenvolvidas por chefs reais. Testadas em cozinhas profissionais. Executadas por você em casa — com os mesmos ketchups que eles usam.
            </p>
          </div>

          {/* Recipes grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleRecipes.map((recipe, i) => (
              <div
                key={recipe.id}
                className="bg-zinc-900/60 border border-zinc-800/60 rounded-3xl overflow-hidden hover:border-zinc-700/60 transition-all duration-300 hover:shadow-2xl group"
              >
                {/* Recipe header */}
                <div className="px-6 pt-6 pb-4 border-b border-white/[0.04]">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className={`text-[8px] font-bold uppercase tracking-widest border px-2.5 py-1 rounded-full ${recipe.flavorColor} border-current/30 bg-current/5`}>
                      {recipe.flavor}
                    </span>
                    <div className="flex items-center gap-3 text-zinc-500">
                      <span className="flex items-center gap-1 text-[9px]"><Clock size={10} />{recipe.time}</span>
                      <span className="text-[9px] bg-zinc-800 px-2 py-0.5 rounded-lg">{recipe.difficulty}</span>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white uppercase leading-tight">{recipe.title}</h3>
                  <p className="text-[10px] text-zinc-500 mt-1">Por {recipe.chef} · Para {recipe.serves}</p>
                </div>

                <div className="px-6 py-5 space-y-4">
                  {/* Ingredients */}
                  <div>
                    <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Ingredientes</p>
                    <ul className="space-y-1">
                      {recipe.ingredients.map((ing) => (
                        <li key={ing} className="flex items-start gap-2 text-[10px] text-zinc-500">
                          <span className="text-red-500 mt-0.5 shrink-0">—</span>
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Method */}
                  <div>
                    <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Modo de Preparo</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">{recipe.method}</p>
                  </div>

                  {/* Chef tip */}
                  <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-3 flex gap-2.5">
                    <ChefHat size={13} className="text-red-400 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-zinc-400 leading-relaxed"><strong className="text-zinc-300">Dica do Chef:</strong> {recipe.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Expand/collapse recipes */}
          {RECIPES.length > 2 && (
            <div className="text-center">
              <button
                onClick={() => setRecipesExpanded(!recipesExpanded)}
                className="inline-flex items-center gap-2 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 px-6 py-3 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all"
              >
                {recipesExpanded ? 'Ver Menos' : `Ver Mais ${RECIPES.length - 2} Receitas`}
                <ArrowRight size={11} className={`transition-transform ${recipesExpanded ? 'rotate-90' : ''}`} />
              </button>
            </div>
          )}

          {/* AI Recipe Generator — fully functional */}
          <ChefVirtual />
        </div>
      </section>

      {/* ── SECTION 5: ONDE COMPRAR ── */}
      <section id="onde-comprar" ref={onde_comprarRef} className="relative py-36 bg-black border-t border-white/[0.02] z-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] bg-red-900/30" />
        </div>

        <div className="max-w-6xl mx-auto px-6 space-y-16 relative z-10">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-[0.25em]">Disponível Online e nas Lojas</span>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white uppercase leading-none">
              ONDE COMPRAR<br />
              <span style={{ color: '#ff2a2a' }}>OS KETCHUPS.</span>
            </h2>
            <p className="text-zinc-500 text-sm max-w-lg mx-auto">
              Do delivery relâmpago ao Prime de 24h — encontre Dubola no canal que preferir.
            </p>
          </div>

          {/* Marketplace cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CHANNELS.map((ch) => (
              <a
                key={ch.name}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative bg-gradient-to-br ${ch.color} border ${ch.border} rounded-3xl p-6 flex flex-col gap-4 hover:scale-[1.03] transition-all duration-300 hover:shadow-2xl overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/[0.02] pointer-events-none" />
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{ch.icon}</span>
                  <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded-full bg-current/10 border border-current/20 ${ch.tagColor}`}>
                    {ch.badge}
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{ch.name}</h4>
                  <p className={`text-[10px] font-bold mt-0.5 ${ch.tagColor}`}>{ch.tag}</p>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400 group-hover:text-white transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-wider">{ch.cta}</span>
                  <ExternalLink size={10} />
                </div>
              </a>
            ))}
          </div>

          {/* Supermercados físicos */}
          <div className="bg-zinc-950/80 border border-zinc-800/60 rounded-3xl p-8 text-center space-y-4">
            <Store className="text-red-400 mx-auto" size={28} />
            <h3 className="text-xl font-black text-white uppercase">Também nas Redes de Supermercado</h3>
            <p className="text-sm text-zinc-500 max-w-md mx-auto">
              Disponível nas seções de condimentos das principais redes do Brasil. Procure na gondola de molhos especiais — em frasco de vidro e bisnaga premium.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {['Pão de Açúcar', 'Carrefour', 'Atacadão', 'Assaí', 'Dia', 'Sonda'].map((store) => (
                <span key={store} className="text-[10px] font-bold text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl uppercase tracking-wider">
                  {store}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: B2C vs B2B BIFURCAÇÃO ── */}
      <section
        id="experiencia"
        className="relative h-auto md:h-screen w-full flex flex-col md:flex-row overflow-hidden border-t border-white/[0.02] z-10"
      >
        {/* B2C — Consumidor */}
        <div
          onMouseEnter={() => setHoveredSide('b2c')}
          onMouseLeave={() => setHoveredSide(null)}
          className={`relative w-full h-[55vh] md:h-full flex items-center justify-center px-8 md:px-16 transition-all duration-700 ease-out border-b md:border-b-0 md:border-r border-white/[0.04] overflow-hidden ${hoveredSide === 'b2c' ? 'md:w-[62%]' : hoveredSide === 'b2b' ? 'md:w-[38%] opacity-40' : 'md:w-1/2'}`}
        >
          <div className="absolute inset-0 z-0">
            <img src="/ketchup/trioKetchupDubola.png" alt="" className="w-full h-full object-cover opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-zinc-950/90 to-transparent" />
          </div>

          <div className="relative z-10 w-full max-w-lg space-y-6 text-left py-16 md:py-0">
            <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/20 px-3.5 py-1 rounded-full text-red-400">
              <Store size={11} />
              <span className="text-[9px] font-bold tracking-widest uppercase">Para a Sua Mesa</span>
            </div>
            <h3 className="font-display text-3xl sm:text-5xl font-black text-white uppercase leading-none">
              SABOR DE<br />
              <span style={{ color: '#ff2a2a' }}>RESTAURANTE</span><br />
              EM CASA.
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Os ketchups que saem das hamburguerias gourmet mais premiadas do país agora chegam à sua geladeira. Mesmo frasco, mesma qualidade, mesma obsessão.
            </p>

            {/* Mini recipe carousel */}
            <div className="bg-zinc-950/80 border border-white/5 p-5 rounded-2xl space-y-3 shadow-xl backdrop-blur-md">
              <div className="flex justify-between items-center pb-2 border-b border-white/[0.04]">
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <ChefHat size={11} className="text-red-400" /> Receita rápida
                </span>
                <span className="text-[9px] font-bold text-red-400">{activeRecipe + 1} / {RECIPES.length}</span>
              </div>
              <div className="min-h-[80px] space-y-1.5">
                <h4 className="text-xs font-bold text-white uppercase leading-tight">{RECIPES[activeRecipe].title}</h4>
                <p className="text-[10px] text-zinc-400 leading-relaxed line-clamp-3">{RECIPES[activeRecipe].method}</p>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-[9px] text-zinc-500 italic">{RECIPES[activeRecipe].chef}</span>
                <div className="flex gap-1.5">
                  <button onClick={() => setActiveRecipe(p => (p - 1 + RECIPES.length) % RECIPES.length)} className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white">
                    <ArrowLeft size={10} />
                  </button>
                  <button onClick={() => setActiveRecipe(p => (p + 1) % RECIPES.length)} className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white">
                    <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            </div>

            <a href="#onde-comprar" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-[10px] tracking-widest uppercase transition-all">
              <ShoppingCart size={12} /> Comprar Agora
            </a>
          </div>
        </div>

        {/* B2B — Food Service */}
        <div
          onMouseEnter={() => setHoveredSide('b2b')}
          onMouseLeave={() => setHoveredSide(null)}
          className={`relative w-full h-[55vh] md:h-full flex items-center justify-center px-8 md:px-16 transition-all duration-700 ease-out overflow-hidden ${hoveredSide === 'b2b' ? 'md:w-[62%]' : hoveredSide === 'b2c' ? 'md:w-[38%] opacity-40' : 'md:w-1/2'}`}
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-zinc-900/90" />
          </div>

          <div className="relative z-10 w-full max-w-lg space-y-6 text-left py-16 md:py-0">
            <div className="inline-flex items-center gap-2 bg-orange-600/10 border border-orange-600/20 px-3.5 py-1 rounded-full text-orange-400">
              <Users size={11} />
              <span className="text-[9px] font-bold tracking-widest uppercase">Food Service & Distribuidores</span>
            </div>
            <h3 className="font-display text-3xl sm:text-5xl font-black text-white uppercase leading-none">
              QUALIDADE<br />
              <span className="text-orange-400">INALTERÁVEL.</span><br />
              ESCALA REAL.
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Formato BAG de alto rendimento, sem desperdício, sem variação de sabor entre lotes. Os mesmos ketchups que seus clientes provaram na hamburgueriaexigem encontrar no seu cardápio.
            </p>

            {/* Lead form */}
            <div className="bg-zinc-950/80 border border-white/[0.06] p-6 rounded-2xl shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="space-y-0.5 mb-4">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider block">Solicite uma Amostra Grátis</span>
                    <p className="text-[9px] text-zinc-500">Seu estabelecimento merece validar antes de comprar em escala.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <input type="text" placeholder="Seu Nome" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-600" />
                    <input type="text" placeholder="Razão Social" required value={formData.businessName} onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-600" />
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <input type="text" placeholder="CNPJ" required value={formData.cnpj} onChange={e => setFormData({ ...formData, cnpj: e.target.value })}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-600" />
                    <input type="email" placeholder="E-mail Corporativo" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-600" />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-[9px] tracking-widest uppercase transition-all">
                    SOLICITAR AMOSTRA PROFISSIONAL
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 size={22} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase">Amostra Solicitada!</h4>
                    <p className="text-xs text-zinc-400 mt-1">Nossa equipe comercial entrará em contato em breve.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <DubolaFooter />
    </div>
  );
}
