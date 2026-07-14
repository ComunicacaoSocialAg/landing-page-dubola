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
    name: 'Barbecue Tradicional',
    shortName: 'Tradicional',
    slogan: 'O caramelizado amadeirado da lenha Hickory real',
    glowColor: 'rgba(234, 115, 22, 0.3)',
    textColor: 'text-orange-400',
    borderColor: 'border-orange-500/30',
    accentHex: '#ea580c',
    btnGrad: 'from-orange-600 to-amber-900',
    badge: 'Lenha Hickory Real',
    desc: 'Denso, brilhante e imponente. Nosso Barbecue Tradicional traz a alma do churrasco americano clássico com açúcar mascavo caramelizado no ponto exato e o clássico defumado em lenha Hickory real. Textura encorpada de alta fixação que gruda na carne.',
    pairing: 'Brisket bovino, costelinhas suínas assadas, hambúrgueres na brasa e batatas rústicas.',
    culinaryTip: 'Pincele abundantemente a costelinha nos últimos 10 minutos de forno ou grelha para caramelizar os açúcares naturais sem queimar.',
    image: '/pickles-doces-de-pepino-frescos-isolados.png',
    highlights: ['Lenha Hickory Importada', 'Laca de Alta Fixação', 'Açúcar Mascavo Real'],
  },
  picante: {
    id: 'picante',
    name: 'Barbecue Picante',
    shortName: 'Picante',
    slogan: 'A queima sutil da caiena com fumaça profunda',
    glowColor: 'rgba(185, 28, 28, 0.3)',
    textColor: 'text-red-500',
    borderColor: 'border-red-500/30',
    accentHex: '#b91c1c',
    btnGrad: 'from-red-650 to-red-950',
    badge: 'Chipotle & Caiena',
    desc: 'O casamento perfeito entre fumaça e fogo intenso. A base tradicional densa ganha a infusão de pimenta caiena moída na pedra e chipotle defumado em pó, entregando um final de boca apimentado, aromático e progressivo.',
    pairing: 'Asas de frango frito (Buffalo Wings), pulled pork suíno e hambúrgueres picantes.',
    culinaryTip: 'Misture com manteiga clarificada derretida (proporção 2:1) para banhar as tulipas de frango logo após saírem estalando de quentes da fritura.',
    image: '/pickles-doces-de-pepino-frescos-isolados.png',
    highlights: ['Chipotle Defumado', 'Pimenta Caiena Real', 'Ardência Progressiva'],
  },
  goiaba: {
    id: 'goiaba',
    name: 'Barbecue com Goiaba',
    shortName: 'Goiaba',
    slogan: 'O clássico americano reencontra o pomar brasileiro',
    glowColor: 'rgba(244, 63, 94, 0.3)',
    textColor: 'text-rose-400',
    borderColor: 'border-rose-500/30',
    accentHex: '#f43f5e',
    btnGrad: 'from-rose-600 to-rose-900',
    badge: 'Inovação Agridoce',
    desc: 'Uma alquimia tropical e inesquecível. Fundimos o clássico molho barbecue defumado com a polpa rica e aveludada de goiabas vermelhas selecionadas, gerando uma caramelização e doçura únicas que quebram a untuosidade.',
    pairing: 'Lombo suíno assado, queijo coalho grelhado na brasa, costelinhas suínas e peixes gordos.',
    culinaryTip: 'Excelente para pincelar sobre queijo coalho grelhado ou no glazeamento final de peças suínas no forno.',
    image: '/pickles-doces-de-pepino-frescos-isolados.png',
    highlights: ['Goiaba Vermelha Selecionada', 'Caramelização Incomparável', 'Sabor Agridoce Frutado'],
  },
};

const RECIPES = [
  {
    id: 1,
    title: 'Costelinhas de Porco Hickory Laqueadas',
    flavor: 'Tradicional',
    flavorColor: 'text-orange-400',
    chef: 'Chef Thiago Castanho',
    time: '1h 40min',
    difficulty: 'Médio',
    serves: '4 pessoas',
    ingredients: [
      '1 rack de costelinha suína limpa (900g)',
      '1/2 xícara de Barbecue Tradicional Dubola',
      'Sal de parrilla e pimenta preta moída',
      '2 dentes de alho esmagados',
      'Ramos de alecrim fresco',
    ],
    method: 'Tempere a costelinha com sal, alho e pimenta. Envolva em papel alumínio duplo e asse a 180°C por 1h20 até amaciar. Retire o alumínio, pincele o Barbecue Tradicional Dubola em toda a superfície. Asse a 220°C por mais 15 minutos, pincelando novas camadas de barbecue a cada 5 minutos até laquear e brilhar.',
    tip: 'O barbecue deve ser aplicado apenas no final da cocção para caramelizar os açúcares sem queimar.',
  },
  {
    id: 2,
    title: 'Asas de Frango Picantes ao Beurre-Chipotle',
    flavor: 'Picante',
    flavorColor: 'text-red-400',
    chef: 'Chef Marcus Vinícius',
    time: '30 min',
    difficulty: 'Fácil',
    serves: '2 pessoas',
    ingredients: [
      '1kg de tulipas de asa de frango',
      '1/2 xícara de Barbecue Picante Dubola',
      'Suco de 1/2 limão siciliano',
      '20g de manteiga derretida',
      'Sal e cebolinha fresca picada',
    ],
    method: 'Asse as tulipas a 220°C até ficarem muito crocantes e estalando. Em um bowl grande, misture o Barbecue Picante com a manteiga derretida e o limão siciliano. Jogue as asas quentes no bowl, misture vigorosamente para cobrir todas as peças e finalize com cebolinha.',
    tip: 'A gordura da manteiga ajuda a criar um esmalte brilhante que adere de forma impecável na pele do frango.',
  },
  {
    id: 3,
    title: 'Lombo Suíno Glaceado com Goiaba e Ervas',
    flavor: 'Goiaba',
    flavorColor: 'text-rose-400',
    chef: 'Chef Letícia Dornelles',
    time: '50 min',
    difficulty: 'Médio',
    serves: '4 pessoas',
    ingredients: [
      '600g de lombo suíno em peça',
      '1/2 xícara de Barbecue com Goiaba Dubola',
      'Alho, alecrim fresco e sal grosso',
      'Azeite de oliva extra virgem',
    ],
    method: 'Tempere o lombo com sal grosso, alho e alecrim. Sele todos os lados na frigideira quente com azeite até dourar. Transfira para a assadeira e pincele abundantemente o Barbecue com Goiaba Dubola. Asse a 200°C por 35 minutos, aplicando novas camadas de molho a cada 10 minutos.',
    tip: 'A pectina natural da goiaba sela a peça e impede que o lombo suíno perca líquido, mantendo-o incrivelmente úmido por dentro.',
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
  { icon: Shield, label: 'Defumação Real', sub: 'Lenha de nogueira Hickory' },
  { icon: Award, label: 'Laca Profissional', sub: 'Viscosidade ideal que não escorre' },
  { icon: Zap, label: 'Goiaba de Verdade', sub: 'Polpa de goiaba vermelha real' },
  { icon: Leaf, label: '100% Clean Label', sub: 'Sem espessantes ou corantes artificiais' },
];

/* ─────────────────────────────────────────────────── */
/*  COMPONENT                                          */
/* ─────────────────────────────────────────────────── */
export default function DubolaBarbecueView() {
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
    <div className="relative w-full min-h-screen text-[#f4f4f5] overflow-x-hidden font-sans bg-black selection:bg-orange-600/35 selection:text-white">

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
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 backdrop-blur-md px-4 py-1.5 rounded-full text-orange-400">
            <Sparkles size={11} className="animate-pulse" />
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase">CARAMELO ESCURO E DEFUMAÇÃO HICKORY</span>
          </div>

          <h1 className="font-display text-5xl sm:text-8xl font-black tracking-tight text-white uppercase leading-[0.9] drop-shadow-2xl">
            O RIGOR DO FOGO.<br />
            <span className="text-orange-500">SABOR ABSOLUTO.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-zinc-300 font-light leading-relaxed">
            A captura engarrafada da combustão perfeita. Uma laca densa, brilhante e profunda desenvolvida com lenha Hickory de verdade e polpa de goiaba fresca para caramelizar e selar carnes nobres.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <a
              href="#sabores"
              className="px-7 py-4 rounded-xl bg-orange-650 hover:bg-orange-600 text-white font-bold text-[10px] tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(234,88,12,0.4)]"
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
              <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 shrink-0">
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
            LENHA HICKORY • DEFUMAÇÃO REAL A FRIO • CARAMELO ESCURO • ZERO CORANTES •
          </div>
          <div className="smoke-ticker-r font-display font-black text-[10vw] tracking-tighter uppercase whitespace-nowrap text-white">
            GOIABA CASCÃO • PIMENTA CAIENA • CHIPOTLE DEFUMADO • LACA DE ALTA FIXAÇÃO •
          </div>
        </div>

        {/* Floating elements */}
        <div ref={floatRef} className="absolute inset-0 pointer-events-none z-0">
          <div className="float-slow mouse-px absolute left-[8%] top-[25%] w-20 h-20 flex items-center justify-center bg-orange-600/10 border border-orange-500/20 rounded-full blur-[2px] opacity-40">
            <span className="text-3xl">🪵</span>
          </div>
          <div className="float-fast mouse-px absolute right-[12%] top-[20%] w-14 h-14 flex items-center justify-center bg-red-655/10 border border-red-500/20 rounded-full blur-[1px] opacity-40">
            <span className="text-2xl">🔥</span>
          </div>
          <div className="float-slow mouse-px absolute left-[18%] bottom-[25%] w-16 h-16 flex items-center justify-center bg-pink-600/10 border border-pink-500/20 rounded-full blur-[2px] opacity-30">
            <span className="text-2xl">🍑</span>
          </div>
          <div className="float-fast mouse-px absolute right-[20%] bottom-[30%] w-12 h-12 flex items-center justify-center bg-yellow-600/10 border border-yellow-500/20 rounded-full opacity-35">
            <span className="text-xl">🌶️</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          <div className="lg:col-span-6 space-y-7">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-3.5 py-1 rounded-full text-orange-400">
              <Leaf size={11} />
              <span className="text-[9px] font-bold tracking-widest uppercase">Nossa Combustão</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-none">
              O SABOR DA BRASA<br />
              <span className="text-orange-500">LIVRE DE</span> ATALHOS.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Diferente dos molhos barbecue comerciais que dependem de aromatizantes sintéticos de fumaça artificial e amido para engrossar, os barbecues Dubola são produtos de combustão lenta de lenha dura natural em ambiente controlado.
            </p>
            <p className="text-sm sm:text-base text-zinc-550 leading-relaxed">
              O dulçor vem de açúcares puros não refinados e caramelo apurado em caldeira de cobre. A laca resultante possui uma aderência notável nas carnes quentes, formando uma crosta lisa, escura, brilhante e indestrutível no fogo.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-2">
              {[['100%', 'Lenha Real'], ['0%', 'Amido ou Espessantes'], ['3', 'Sabores de Autor']].map(([num, label]) => (
                <div key={label}>
                  <span className="text-2xl font-black text-orange-500">{num}</span>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-white/5 shadow-2xl group">
              <img
                src="/ketchup-tradicional.jpg"
                alt="Churrasco premium Dubola"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[9px] font-space-premium font-bold tracking-widest text-orange-400 uppercase">Defumação Artesanal</span>
                <h4 className="text-lg font-bold text-white uppercase mt-1">Caramelização Perfeita</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: VITRINE DE SABORES ── */}
      <section id="sabores" className="relative py-36 bg-black border-t border-white/[0.02] overflow-hidden z-10">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.25em]">A Linha de Frente</span>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white uppercase leading-none">
              TRÊS FUMAÇAS.<br />TRÊS TEMPERAMENTOS.
            </h2>
            <p className="text-zinc-500 text-sm">
              Três criações distintas baseadas em lenha Hickory, caiena e goiaba. Escolha a sua defumação ideal.
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
                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-orange-400 shrink-0"><UtensilsCrossed size={14} /></div>
                  <div>
                    <strong className="text-[10px] text-white uppercase tracking-wider block mb-0.5">Harmonização Perfeita</strong>
                    <span className="text-xs text-zinc-400">{currentFlavor.pairing}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-orange-400 shrink-0"><ChefHat size={14} /></div>
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
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.25em]">Sabor no fogo</span>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white uppercase leading-none">
              A ARTE DO GRILL.
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Receitas concretas baseadas na defumação limpa e caramelo amadeirado Dubola. Pratos de autor fáceis de replicar.
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
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-orange-400 transition-colors">{recipe.title}</h3>
                  <p className="text-[10px] text-zinc-500 italic mt-0.5">{recipe.chef}</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block">Ingredientes</span>
                    <ul className="grid grid-cols-1 gap-1 text-xs text-zinc-455">
                      {recipe.ingredients.map((ing) => (
                        <li key={ing} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-orange-400 shrink-0" />
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
                    <Flame size={12} className="text-orange-400 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-zinc-500 leading-relaxed font-sans-premium"><strong className="text-zinc-400">Segredo de Chef:</strong> {recipe.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setRecipesExpanded(!recipesExpanded)}
              className="text-[10px] font-bold tracking-widest text-orange-400 hover:text-white uppercase transition-colors"
            >
              {recipesExpanded ? 'Ver Menos Receitas' : 'Ver Todas as Receitas'}
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: CHEF VIRTUAL ── */}
      <ChefVirtual productLine="barbecue" />

      {/* ── SECTION 6: ONDE COMPRAR ── */}
      <section id="onde-comprar" ref={onde_comprarRef} className="relative py-36 bg-black border-t border-white/[0.02] z-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] bg-orange-955/30" />
        </div>

        <div className="max-w-6xl mx-auto px-6 space-y-16 relative z-10">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.25em]">Disponível Online e nas Lojas</span>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white uppercase leading-none">
              ONDE COMPRAR<br />
              <span className="text-orange-500">OS MOLHOS BARBECUE.</span>
            </h2>
            <p className="text-zinc-500 text-sm max-w-lg mx-auto">
              Encontre Dubola no canal que for mais conveniente para a sua cozinha.
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
            <Store className="text-orange-400 mx-auto" size={28} />
            <h3 className="text-xl font-black text-white uppercase">Também nas Redes de Supermercado</h3>
            <p className="text-sm text-zinc-500 max-w-md mx-auto">
              Disponível nas seções de condimentos das principais redes de varejo do país. Procure na gondola de molhos especiais.
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
            <div className="inline-flex items-center gap-2 bg-orange-650/10 border border-orange-500/20 px-3.5 py-1 rounded-full text-orange-400">
              <Store size={11} />
              <span className="text-[9px] font-bold tracking-widest uppercase">Para a Sua Mesa</span>
            </div>
            <h3 className="font-display text-3xl sm:text-5xl font-black text-white uppercase leading-none">
              SABOR DE<br />
              <span className="text-orange-500">PITMASTER</span><br />
              EM CASA.
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              O mesmo molho espesso e defumado com lenha de nogueira Hickory usado nas hamburguerias e steak houses mais conceituadas agora chega na sua cozinha em bisnaga flexível.
            </p>

            <div className="bg-zinc-950/80 border border-white/5 p-5 rounded-2xl space-y-3 shadow-xl backdrop-blur-md">
              <div className="flex justify-between items-center pb-2 border-b border-white/[0.04]">
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <ChefHat size={11} className="text-orange-400" /> Receita de Destaque
                </span>
                <span className="text-[9px] font-bold text-orange-400">{activeRecipe + 1} / {RECIPES.length}</span>
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
            <div className="inline-flex items-center gap-2 bg-orange-650/10 border border-orange-600/20 px-3.5 py-1 rounded-full text-orange-400">
              <Users size={11} />
              <span className="text-[9px] font-bold tracking-widest uppercase">Food Service & Distribuidores</span>
            </div>
            <h3 className="font-display text-3xl sm:text-5xl font-black text-white uppercase leading-none">
              CONSISTÊNCIA DA<br />
              <span className="text-orange-500">LACA DE BRASA.</span><br />
              FRENTE CORPORATIVA.
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Formato Bag de 1,01 kg desenvolvido para alta cozinha. Sem sinérese (não escorre na chapa quente nem separa óleos), mantendo a caramelização uniforme e diminuindo o desperdício do lote.
            </p>

            {/* B2B Form */}
            <div className="bg-zinc-950/80 border border-white/[0.06] p-6 rounded-2xl shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="space-y-0.5 mb-4">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider block">Solicite Amostra de Food Service</span>
                    <p className="text-[9px] text-zinc-500">Valide nossa laca Hickory em seus próprios hambúrgueres e costelas.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <input type="text" placeholder="Seu Nome" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-500" />
                    <input type="text" placeholder="Razão Social" required value={formData.businessName} onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <input type="text" placeholder="CNPJ" required value={formData.cnpj} onChange={e => setFormData({ ...formData, cnpj: e.target.value })}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-500" />
                    <input type="email" placeholder="E-mail Corporativo" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-500" />
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
                    <h4 className="text-sm font-bold text-white uppercase">Pedido Enviado!</h4>
                    <p className="text-[10px] text-zinc-400 max-w-xs mx-auto mt-1">
                      Retornaremos em até 24h úteis para as tratativas comerciais de envio de amostra e preços diferenciados por faturamento de distribuidores.
                    </p>
                  </div>
                  <button onClick={() => setFormSubmitted(false)} className="text-[9px] font-bold tracking-widest text-orange-400 uppercase hover:underline">
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
