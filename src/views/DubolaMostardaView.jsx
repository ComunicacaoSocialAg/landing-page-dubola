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
    name: 'Mostarda Rústica Tradicional',
    shortName: 'Tradicional',
    slogan: 'A picância rústica e pura das sementes selecionadas',
    glowColor: 'rgba(234, 179, 8, 0.3)',
    textColor: 'text-yellow-400',
    borderColor: 'border-yellow-500/30',
    accentHex: '#eab308',
    btnGrad: 'from-yellow-600 to-amber-800',
    badge: 'Sementes Moídas a Frio',
    desc: 'Equilíbrio e frescor. Nossa Mostarda Tradicional é elaborada com sementes amarelas selecionadas moídas a frio com vinagre aromático e especiarias de autor. Sabor vibrante, textura suave e uma picância limpa que limpa o paladar.',
    pairing: 'Salsichas alemãs, hot dogs artesanais, sanduíches de pastrami e tempero de molhos finos.',
    culinaryTip: 'Misture com azeite de oliva e um toque de limão para emulsionar um molho de salada denso e aromático que não separa.',
    image: '/linha-mostardas.png',
    highlights: ['Sementes Premium Selecionadas', 'Vinagre Aromático Destilado', 'Sem Corantes de Cúrcuma Artificial'],
  },
  dijon: {
    id: 'dijon',
    name: 'Mostarda Dijon Chardonnay',
    shortName: 'Dijon',
    slogan: 'O rigor aristocrático da semente escura com vinho Chardonnay',
    glowColor: 'rgba(202, 138, 4, 0.3)',
    textColor: 'text-yellow-500',
    borderColor: 'border-yellow-600/30',
    accentHex: '#ca8a04',
    btnGrad: 'from-yellow-700 to-amber-950',
    badge: 'Chardonnay de Autor',
    desc: 'O ápice da culinária clássica. Elaborada com sementes escuras de mostarda moídas na pedra e infusionadas com vinho Chardonnay seco de alta estirpe. Confere picância nasal profunda, acidez refinada e textura rústica que eleva pratos de carne nobre.',
    pairing: 'Medalhão de filet mignon grelhado na brasa, costeletas de cordeiro, molhos nobres e gratinados refinados.',
    culinaryTip: 'Pincele suavemente sobre filés nobres imediatamente após saírem da brasa para selar e temperar com a manteiga noisette.',
    image: '/linha-mostardas.png',
    highlights: ['Sementes Escuras Moídas na Pedra', 'Infusão com Chardonnay Seco', 'Picância Nasal Característica'],
  },
  mel: {
    id: 'mel',
    name: 'Mostarda com Mel Silvestre',
    shortName: 'Mostarda & Mel',
    slogan: 'O dulçor sedutor do mel de flores com o calor da mostarda',
    glowColor: 'rgba(245, 158, 11, 0.3)',
    textColor: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    accentHex: '#f59e0b',
    btnGrad: 'from-amber-600 to-amber-900',
    badge: 'Mel de Mata Nativa',
    desc: 'Uma emulsão aveludada e apaixonante. Fundimos a acidez da mostarda com a doçura sedosa e profunda do mel de flores silvestres nativas brasileiras. O resultado é um molho levemente adocicado, de textura untuosa e equilíbrio perfeito.',
    pairing: 'Saladas de folhas nobres, presunto tipo Parma, queijos finos e empanados crocantes.',
    culinaryTip: 'Excelente para pincelar sobre peitos de frango na grelha no final do cozimento ou como molho dip para croquetes gourmet.',
    image: '/linha-mostardas.png',
    highlights: ['Mel Silvestre Puro Selecionado', 'Emulsão Sedosa Estável', 'Equilíbrio Agridoce Único'],
  },
};

const RECIPES = [
  {
    id: 1,
    title: 'Vinagrete Rústico de Mostarda Amarela',
    flavor: 'Tradicional',
    flavorColor: 'text-yellow-400',
    chef: 'Chef Thiago Castanho',
    time: '8 min',
    difficulty: 'Fácil',
    serves: '4 pessoas',
    ingredients: [
      '3 colheres de sopa de Mostarda Tradicional Dubola',
      '4 colheres de sopa de azeite extra virgem',
      '2 colheres de sopa de vinagre de maçã',
      '1 colher de chá de mel de abelhas',
      'Sal fino e pimenta preta'
    ],
    method: 'Em um bowl pequeno, junte a mostarda tradicional e o vinagre de maçã. Adicione o mel, sal e pimenta e bata com um batedor de arame (fouet). Despeje o azeite de oliva em fio contínuo, batendo sem parar até emulsionar. Regue sobre folhas verdes frescas de rúcula, alface romana e figos.',
    tip: 'A mostarda amarela Dubola funciona como emulsificante natural para o azeite de oliva e vinagre de maçã, criando um creme suave e perfumado.',
  },
  {
    id: 2,
    title: 'Medalhão de Mignon com Espelho de Dijon',
    flavor: 'Dijon',
    flavorColor: 'text-yellow-500',
    chef: 'Chef Marcus Vinícius',
    time: '20 min',
    difficulty: 'Alta Gastronomia',
    serves: '2 pessoas',
    ingredients: [
      '2 medalhões de filet mignon limpos (200g cada)',
      '4 colheres de sopa de Mostarda Dijon Dubola',
      '2 colheres de sopa de manteiga sem sal e tomilho',
      'Flor de sal e pimenta preta'
    ],
    method: 'Tempere os medalhões com sal e pimenta preta moída na hora. Sele os medalhões em frigideira quente com manteiga e tomilho por 3 minutos de cada lado. Regue a carne continuamente com a manteiga de ervas quente derretida na frigideira. Espalhe a Mostarda Dijon Dubola formando um espelho no prato quente e apoie o medalhão sobre ele.',
    tip: 'A acidez nobre e a picância nasal da nossa mostarda Dijon cortam a gordura untuosa do filet mignon quente, limpando as papilas gustativas a cada garfada.',
  },
  {
    id: 3,
    title: 'Salada de Figos Frescos, Parma e Mel-Mostarda',
    flavor: 'Mostarda & Mel',
    flavorColor: 'text-amber-400',
    chef: 'Chef Letícia Dornelles',
    time: '15 min',
    difficulty: 'Fácil',
    serves: '4 pessoas',
    ingredients: [
      '1 maço de folhas de rúcula selvagem lavadas',
      '4 figos frescos cortados em quatro',
      '6 fatias finas de presunto tipo Parma',
      '3 colheres de sopa de Mostarda com Mel Dubola',
      'Azeite de oliva extra virgem e sal'
    ],
    method: 'Distribua as folhas de rúcula em uma travessa rasa. Adicione as fatias de presunto Parma e os figos frescos harmoniosamente por cima das folhas. Em um bowl menor, misture a mostarda com mel Dubola com um fio de azeite e regue toda a salada logo antes de servir.',
    tip: 'O mel silvestre acalma a acidez da mostarda, casando de forma divinal com o sabor salgado do parma e a textura carnuda do figo fresco.',
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
    color: 'from-amber-500/20 to-yellow-600/10',
    border: 'border-amber-500/20',
    tagColor: 'text-amber-400',
    badge: 'Prime Elegível',
    url: 'https://www.amazon.com.br',
    cta: 'Comprar com Prime',
  },
  {
    name: 'TikTok Shop',
    tag: 'Tendência Culinária',
    icon: '🎵',
    color: 'from-pink-500/20 to-violet-600/10',
    border: 'border-pink-500/20',
    tagColor: 'text-pink-400',
    badge: 'Viral no FoodTok',
    url: 'https://shop.tiktok.com',
    cta: 'Ver no TikTok Shop',
  },
  {
    name: 'iFood Mercado',
    tag: 'Entrega Expressa em 30 min',
    icon: '🛵',
    color: 'from-red-500/20 to-rose-600/10',
    border: 'border-red-500/20',
    tagColor: 'text-red-400',
    badge: 'Delivery Local',
    url: 'https://www.ifood.com.br',
    cta: 'Pedir Agora',
  },
];

const TRUST_BADGES = [
  { icon: Shield, label: 'Sementes Reais', sub: 'Moagem de sementes inteiras a frio' },
  { icon: Award, label: 'Chardonnay Genuíno', sub: 'Dijon com vinho Chardonnay de verdade' },
  { icon: Zap, label: 'Mel Silvestre Real', sub: 'Dulçor natural de abelha silvestre pura' },
  { icon: Leaf, label: 'Clean Label Estrito', sub: 'Sem espessantes, corantes ou amido' },
];

/* ─────────────────────────────────────────────────── */
/*  COMPONENT                                          */
/* ─────────────────────────────────────────────────── */
export default function DubolaMostardaView() {
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

  /* GSAP – Hero parallax scroll */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    gsap.fromTo(video, { yPercent: 0, scale: 1 }, {
      yPercent: 15,
      scale: 1.05,
      scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
    });
  }, []);

  /* GSAP – Tickers and floating */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.smoke-ticker-l', { xPercent: 5 }, { xPercent: -35, scrollTrigger: { trigger: manifestoRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
      gsap.fromTo('.smoke-ticker-r', { xPercent: -35 }, { xPercent: 5, scrollTrigger: { trigger: manifestoRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
      gsap.fromTo('.float-slow', { y: 40 }, { y: -120, rotate: 30, scrollTrigger: { trigger: manifestoRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.8 } });
      gsap.fromTo('.float-fast', { y: 60 }, { y: -200, rotate: -60, scrollTrigger: { trigger: manifestoRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.9 } });
    });
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!floatRef.current) return;
    const rect = floatRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
    gsap.to('.mouse-px', { x, y, stagger: 0.03, ease: 'power2.out', duration: 0.8 });
  };

  const handleSubmit = (e) => { e.preventDefault(); setFormSubmitted(true); };

  const visibleRecipes = recipesExpanded ? RECIPES : RECIPES.slice(0, 2);

  return (
    <div className="relative w-full min-h-screen text-[#f4f4f5] overflow-x-hidden font-sans bg-black selection:bg-yellow-550/35 selection:text-white">

      {/* Dynamic ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-15 transition-all duration-1000"
        style={{ background: `radial-gradient(circle at 50% 40%, ${currentFlavor.glowColor} 0%, transparent 65%)` }}
      />

      <DubolaHeader />

      {/* ── SECTION 1: HERO (IMMERSIVE VIDEO OVERLAY) ── */}
      <section ref={heroRef} className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden z-10">
        <div className="absolute inset-0 z-0">
          <video ref={videoRef} src="/hero-todas.mp4" autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none" />
        </div>

        <div className="relative z-10 text-center max-w-5xl px-6 space-y-7">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-550/20 backdrop-blur-md px-4 py-1.5 rounded-full text-yellow-400">
            <Sparkles size={11} className="animate-pulse" />
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase">SEMENTES INTEIRAS E VINHO CHARDONNAY</span>
          </div>

          <h1 className="font-display text-5xl sm:text-8xl font-black tracking-tight text-white uppercase leading-[0.9] drop-shadow-2xl">
            A PICÂNCIA QUE INSPIRA.<br />
            <span className="text-yellow-500">O RIGOR DO SABOR.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-zinc-300 font-light leading-relaxed">
            A essência da semente moída no seu estado mais nobre. Mostardas densas, aromáticas e rústicas desenvolvidas com vinho Chardonnay seco e mel silvestre puro para elevar suas criações.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <a
              href="#sabores"
              className="px-7 py-4 rounded-xl bg-yellow-600 hover:bg-yellow-500 text-white font-bold text-[10px] tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(234,179,8,0.4)]"
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
              <div className="p-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 shrink-0">
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
        onMouseMove={handleMouseMove}
        className="relative py-36 bg-zinc-950/70 overflow-hidden border-t border-white/[0.02] z-10"
      >
        {/* Parallax tickers */}
        <div className="absolute top-8 left-0 w-full overflow-hidden opacity-[0.02] select-none pointer-events-none space-y-3">
          <div className="smoke-ticker-l font-display font-black text-[10vw] tracking-tighter uppercase whitespace-nowrap text-white">
            SEMENTES DE MOSTARDA • CHARDONNAY SECO • VINAGRE DE MAÇÃ • MEL SILVESTRE •
          </div>
          <div className="smoke-ticker-r font-display font-black text-[10vw] tracking-tighter uppercase whitespace-nowrap text-white">
            MOAGEM A FRIO • TEXTURA RÚSTICA • ZERO TURMERIC ARTIFICIAL • DENSIDADE IDEAL •
          </div>
        </div>

        {/* Floating elements */}
        <div ref={floatRef} className="absolute inset-0 pointer-events-none z-0">
          <div className="float-slow mouse-px absolute left-[8%] top-[25%] w-20 h-20 flex items-center justify-center bg-yellow-600/10 border border-yellow-500/20 rounded-full blur-[2px] opacity-40">
            <span className="text-3xl">🌾</span>
          </div>
          <div className="float-fast mouse-px absolute right-[12%] top-[20%] w-14 h-14 flex items-center justify-center bg-amber-600/10 border border-amber-500/20 rounded-full blur-[1px] opacity-40">
            <span className="text-2xl">🍯</span>
          </div>
          <div className="float-slow mouse-px absolute left-[18%] bottom-[25%] w-16 h-16 flex items-center justify-center bg-yellow-650/10 border border-yellow-600/20 rounded-full blur-[2px] opacity-30">
            <span className="text-2xl">🍇</span>
          </div>
          <div className="float-fast mouse-px absolute right-[20%] bottom-[30%] w-12 h-12 flex items-center justify-center bg-amber-500/10 border border-amber-500/20 rounded-full opacity-35">
            <span className="text-xl">🍋</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-6 space-y-7">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-3.5 py-1 rounded-full text-yellow-400">
              <Leaf size={11} />
              <span className="text-[9px] font-bold tracking-widest uppercase">Pureza nos Grãos</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-none">
              MOAGEM A FRIO.<br />
              <span className="text-yellow-500">SABOR TOTALMENTE</span> PRESERVADO.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Evitamos a moagem rápida que gera calor excessivo e amargura as sementes. As mostardas Dubola são processadas a frio de forma lenta, retendo todos os óleos essenciais voláteis da semente e entregando picância natural e acidez pura.
            </p>
            <p className="text-sm sm:text-base text-zinc-550 leading-relaxed">
              O dulçor da nossa Mostarda com Mel vem unicamente de mel de abelhas silvestre legítimo, sem xaropes industriais de glicose. Nossos molhos mantêm consistência rústica estável, ideais para saladas de alto padrão, grelhados e bistrôs gastronômicos.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-2">
              {[['100%', 'Mel e Grãos Reais'], ['0%', 'Espessantes ou Amido'], ['3', 'Sabores Aristocráticos']].map(([num, label]) => (
                <div key={label}>
                  <span className="text-2xl font-black text-yellow-500">{num}</span>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-white/5 shadow-2xl group">
              <img
                src="/ketchup-tradicional.jpg"
                alt="Mostarda Rústica Dubola"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[9px] font-space-premium font-bold tracking-widest text-yellow-400 uppercase">Processo de Autor</span>
                <h4 className="text-lg font-bold text-white uppercase mt-1">Picância e Equilíbrio</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: VITRINE DE SABORES ── */}
      <section id="sabores" className="relative py-36 bg-black border-t border-white/[0.02] overflow-hidden z-10">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-[0.25em]">Criações Nobres</span>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white uppercase leading-none">
              TRÊS TEXTURAS.<br />TRÊS INTENSIDADES.
            </h2>
            <p className="text-zinc-550 text-sm">
              Três receitas icônicas criadas com grãos selecionados, vinho Chardonnay e mel de mata nativa. Descubra a sua perfeita.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {Object.values(FLAVORS).map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFlavor(f.id)}
                className={`px-6 py-3.5 rounded-2xl border text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${activeFlavor === f.id
                  ? 'border-white/40 text-white bg-white/8 shadow-xl scale-105'
                  : 'border-zinc-900 text-zinc-500 bg-zinc-955/60 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
              >
                {f.shortName}
              </button>
            ))}
          </div>

          {/* Detail card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="absolute w-80 h-80 rounded-full blur-[100px] opacity-35 z-0 transition-all duration-1000" style={{ backgroundColor: currentFlavor.glowColor }} />
              <div className="relative z-10 w-64 h-[26rem] rounded-3xl overflow-hidden border border-white/5 bg-zinc-950/40 p-4 flex items-center justify-center select-none transition-all duration-500 hover:scale-[1.04]">
                <img
                  src={currentFlavor.image}
                  alt={currentFlavor.name}
                  className="max-h-[360px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.85)]"
                  onError={(e) => { e.target.src = '/ketchup-tradicional.jpg'; }}
                />
              </div>
            </div>

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
                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-yellow-500 shrink-0"><UtensilsCrossed size={14} /></div>
                  <div>
                    <strong className="text-[10px] text-white uppercase tracking-wider block mb-0.5">Harmonização Perfeita</strong>
                    <span className="text-xs text-zinc-400">{currentFlavor.pairing}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-yellow-500 shrink-0"><ChefHat size={14} /></div>
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
        <div className="max-w-6xl mx-auto px-6 space-y-16 relative z-10">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-[0.25em]">Sabor na Prática</span>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white uppercase leading-none">
              A ARTE DO TEMPERO.
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Receitas originais baseadas na acidez refinada e textura rústica da mostarda Dubola. Culinária autoral ao seu alcance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleRecipes.map((recipe, i) => (
              <div key={recipe.id} className="bg-zinc-900/60 border border-zinc-800/60 rounded-3xl overflow-hidden hover:border-zinc-700/60 transition-all duration-300 hover:shadow-2xl group">
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
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-yellow-400 transition-colors">{recipe.title}</h3>
                  <p className="text-[10px] text-zinc-500 italic mt-0.5">{recipe.chef}</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block">Ingredientes</span>
                    <ul className="grid grid-cols-1 gap-1 text-xs text-zinc-455">
                      {recipe.ingredients.map((ing) => (
                        <li key={ing} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-yellow-400 shrink-0" />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block">Preparo</span>
                    <p className="text-xs text-zinc-400 leading-relaxed">{recipe.method}</p>
                  </div>
                  <div className="p-3.5 bg-black/40 border border-white/[0.02] rounded-xl flex gap-2.5 items-start">
                    <Flame size={12} className="text-yellow-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-zinc-500 leading-relaxed font-sans-premium"><strong className="text-zinc-400">Segredo de Chef:</strong> {recipe.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setRecipesExpanded(!recipesExpanded)}
              className="text-[10px] font-bold tracking-widest text-yellow-450 hover:text-white uppercase transition-colors"
            >
              {recipesExpanded ? 'Ver Menos Receitas' : 'Ver Todas as Receitas'}
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: CHEF VIRTUAL ── */}
      <ChefVirtual productLine="mostardas" />

      {/* ── SECTION 6: ONDE COMPRAR ── */}
      <section id="onde-comprar" ref={onde_comprarRef} className="relative py-36 bg-black border-t border-white/[0.02] z-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] bg-yellow-955/20" />
        </div>

        <div className="max-w-6xl mx-auto px-6 space-y-16 relative z-10">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-bold text-yellow-450 uppercase tracking-[0.25em]">Disponível Online e nas Lojas</span>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white uppercase leading-none">
              ONDE COMPRAR<br />
              <span className="text-yellow-500">AS MOSTARDAS DUBOLA.</span>
            </h2>
            <p className="text-zinc-500 text-sm max-w-lg mx-auto">
              Seja na sua casa ou no seu restaurante, compre a linha completa Dubola com facilidade.
            </p>
          </div>

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

          <div className="bg-zinc-950/80 border border-zinc-800/60 rounded-3xl p-8 text-center space-y-4">
            <Store className="text-yellow-500 mx-auto" size={28} />
            <h3 className="text-xl font-black text-white uppercase">Disponível nos Melhores Empórios</h3>
            <p className="text-sm text-zinc-500 max-w-md mx-auto">
              Encontre também a linha de mostardas rústicas e especiais Dubola nas gôndolas dos principais mercados e empórios gourmet do país.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {['Pão de Açúcar', 'Carrefour', 'Atacadão', 'Assaí', 'Sonda'].map((store) => (
                <span key={store} className="text-[10px] font-bold text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl uppercase tracking-wider">
                  {store}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: B2B BIFURCAÇÃO ── */}
      <section className="relative h-auto md:h-screen w-full flex flex-col md:flex-row overflow-hidden border-t border-white/[0.02] z-10">
        <div
          onMouseEnter={() => setHoveredSide('b2c')}
          onMouseLeave={() => setHoveredSide(null)}
          className={`relative w-full h-[55vh] md:h-full flex items-center justify-center px-8 md:px-16 transition-all duration-700 ease-out border-b md:border-b-0 md:border-r border-white/[0.04] overflow-hidden ${hoveredSide === 'b2c' ? 'md:w-[62%]' : hoveredSide === 'b2b' ? 'md:w-[38%] opacity-40' : 'md:w-1/2'}`}
        >
          <div className="absolute inset-0 z-0">
            <img src="/ketchup-tradicional.jpg" alt="" className="w-full h-full object-cover opacity-5" />
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-zinc-955/90 to-transparent" />
          </div>

          <div className="relative z-10 w-full max-w-lg space-y-6 text-left py-16 md:py-0">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/25 px-3.5 py-1 rounded-full text-yellow-450">
              <Store size={11} />
              <span className="text-[9px] font-bold tracking-widest uppercase">Para a Sua Cozinha</span>
            </div>
            <h3 className="font-display text-3xl sm:text-5xl font-black text-white uppercase leading-none">
              SABOR DE BRASSERIE<br />
              <span className="text-yellow-500">NO CONFORTO</span><br />
              DO SEU LAR.
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Traga a picância profunda da semente moída na pedra e o refinamento do vinho Chardonnay francês direto para os seus preparos cotidianos em uma bisnaga premium e prática.
            </p>

            <div className="bg-zinc-950/80 border border-white/5 p-5 rounded-2xl space-y-3 shadow-xl backdrop-blur-md">
              <div className="flex justify-between items-center pb-2 border-b border-white/[0.04]">
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <ChefHat size={11} className="text-yellow-500" /> Receita de Destaque
                </span>
                <span className="text-[9px] font-bold text-yellow-500">{activeRecipe + 1} / {RECIPES.length}</span>
              </div>
              <div className="min-h-[80px] space-y-1.5">
                <h4 className="text-xs font-bold text-white uppercase leading-tight">{RECIPES[activeRecipe].title}</h4>
                <p className="text-[10px] text-zinc-500 leading-relaxed line-clamp-3">{RECIPES[activeRecipe].method}</p>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-[9px] text-zinc-550 italic">{RECIPES[activeRecipe].chef}</span>
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

        <div
          onMouseEnter={() => setHoveredSide('b2b')}
          onMouseLeave={() => setHoveredSide(null)}
          className={`relative w-full h-[55vh] md:h-full flex items-center justify-center px-8 md:px-16 transition-all duration-700 ease-out overflow-hidden ${hoveredSide === 'b2b' ? 'md:w-[62%]' : hoveredSide === 'b2c' ? 'md:w-[38%] opacity-40' : 'md:w-1/2'}`}
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-zinc-950/90" />
          </div>

          <div className="relative z-10 w-full max-w-lg space-y-6 text-left py-16 md:py-0">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/25 px-3.5 py-1 rounded-full text-yellow-455">
              <Users size={11} />
              <span className="text-[9px] font-bold tracking-widest uppercase">Food Service & Distribuidores</span>
            </div>
            <h3 className="font-display text-3xl sm:text-5xl font-black text-white uppercase leading-none">
              ALTA ESTABILIDADE.<br />
              <span className="text-yellow-500">PARA OPERAÇÕES</span><br />
              EXIGENTES.
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Disponibilizamos embalagens Bag de 1,01 kg perfeitamente vedadas para manter a integridade dos óleos voláteis e a acidez equilibrada. Textura homogênea estável que resiste a altas temperaturas ao gratinar.
            </p>

            {/* B2B Form */}
            <div className="bg-zinc-950/80 border border-white/[0.06] p-6 rounded-2xl shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="space-y-0.5 mb-4">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider block">Solicite Amostra de Food Service</span>
                    <p className="text-[9px] text-zinc-500">Experimente nossas mostardas gourmet na operação do seu restaurante.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <input type="text" placeholder="Seu Nome" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-yellow-500 transition-colors placeholder:text-zinc-500" />
                    <input type="text" placeholder="Razão Social" required value={formData.businessName} onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-yellow-500 transition-colors placeholder:text-zinc-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <input type="text" placeholder="CNPJ" required value={formData.cnpj} onChange={e => setFormData({ ...formData, cnpj: e.target.value })}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-yellow-500 transition-colors placeholder:text-zinc-500" />
                    <input type="email" placeholder="E-mail Corporativo" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-yellow-500 transition-colors placeholder:text-zinc-500" />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-yellow-600 hover:bg-yellow-500 text-white font-bold text-[9px] tracking-widest uppercase transition-all">
                    SOLICITAR AMOSTRA PROFISSIONAL
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 size={22} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase">Pedido Enviado!</h4>
                    <p className="text-[10px] text-zinc-400 max-w-xs mx-auto mt-1">
                      Retornaremos em até 24h úteis para as tratativas comerciais de envio de amostra e preços diferenciados por faturamento de distribuidores.
                    </p>
                  </div>
                  <button onClick={() => setFormSubmitted(false)} className="text-[9px] font-bold tracking-widest text-yellow-550 uppercase hover:underline">
                    Nova solicitação
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <DubolaFooter />
    </div>
  );
}
