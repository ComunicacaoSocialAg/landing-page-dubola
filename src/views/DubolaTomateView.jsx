import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ChefVirtual from '../components/ChefVirtual';
import DubolaHeader from '../components/DubolaHeader';
import DubolaFooter from '../components/DubolaFooter';
import {
  Sparkles,
  Leaf,
  ArrowRight,
  Flame,
  UtensilsCrossed,
  ChefHat,
  Store,
  Users,
  ChevronDown,
  CheckCircle2,
  Clock,
  Shield,
  Award,
  Package,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────── */
/*  DATA FOR TOMATO PRODUCTS                           */
/* ─────────────────────────────────────────────────── */
const FLAVORS = {
  sugo: {
    id: 'sugo',
    name: 'Molho Tradicional ao Sugo',
    shortName: 'Ao Sugo',
    slogan: 'O molho ancestral de tomates italianos apurados lentamente',
    glowColor: 'rgba(234, 88, 12, 0.3)',
    textColor: 'text-orange-500',
    borderColor: 'border-orange-500/30',
    accentHex: '#ea580c',
    btnGrad: 'from-orange-600 to-red-800',
    badge: 'Tradicional ao Sugo',
    desc: 'O aroma inebriante das cozinhas de trattoria italiana aos domingos. Cozido pacientemente com tomates pelati maduros importados selecionados, azeite extra virgem de primeira prensa, alho triturado e folhas frescas de manjericão gigante. Sem adição de açúcar refinado ou espessantes artificiais.',
    pairing: 'Penne de grano duro, espaguete, lasanha de queijo e gnocchi artesanal.',
    culinaryTip: 'Adicione 2 colheres de sopa da água de cozimento da massa rica em amido diretamente ao molho na hora de saltear. Isso emulsiona o azeite com o tomate, formando uma película aveludada incomparável.',
    image: '/linha-tomates.png',
    highlights: ['Tomate Pelati Italiano', 'Azeite Extra Virgem', 'Manjericão Gigante'],
  },
  rustico: {
    id: 'rustico',
    name: 'Molho de Tomate Rústico',
    shortName: 'Rústico',
    slogan: 'A textura rústica dos tomates pelati esmagados artesanalmente',
    glowColor: 'rgba(202, 138, 4, 0.3)',
    textColor: 'text-yellow-500',
    borderColor: 'border-yellow-600/30',
    accentHex: '#ca8a04',
    btnGrad: 'from-yellow-700 to-amber-950',
    badge: 'Pedaços Inteiros',
    desc: 'Para cozinheiros exigentes que demandam dente e presença no prato. Tomates pelati maduros esmagados grosseiramente com as mãos e apurados longamente no fogo baixo, retendo pedaços carnudos, suculentos e aromáticos.',
    pairing: 'Polenta mole cremosa, parmegiana de berinjela ou filé mignon, e massas grossas.',
    culinaryTip: 'Não mexa excessivamente o molho ao aquecer para não desfazer os pedaços. Sirva coroando a massa com uma burrata fresca no centro.',
    image: '/linha-tomates.png',
    highlights: ['Pedaços Suculentos', 'Processo Artesanal', 'Sabor Robusto de Fogão'],
  },
  'ervas-alho-poro': {
    id: 'ervas-alho-poro',
    name: 'Molho Rústico Alho-Poró & Ervas',
    shortName: 'Alho-Poró & Ervas',
    slogan: 'O dulçor do alho-poró salteado com tomilho fresco e ervas',
    glowColor: 'rgba(5, 150, 105, 0.3)',
    textColor: 'text-emerald-500',
    borderColor: 'border-emerald-500/30',
    accentHex: '#059669',
    btnGrad: 'from-emerald-600 to-teal-900',
    badge: 'Alho-Poró & Ervas Finas',
    desc: 'O verdadeiro atalho de chef. Une o dulçor do alho-poró dourado lentamente no azeite com tomilho fresco, alecrim de colheita e orégano de provence. Complexo, herbáceo e aromático.',
    pairing: 'Filés de peixe grelhados, risotos rápidos, vegetais grelhados e aves assadas.',
    culinaryTip: 'Excelente para fazer um papillote de peixe: monte filés de pargo ou pescada sobre papel alumínio com azeite, cubra com o molho e asse por 20 minutos.',
    image: '/linha-tomates.png',
    highlights: ['Alho-Poró Fresco', 'Ervas Aromáticas', 'Sabor Herbal Elegante'],
  },
  tradicional: {
    id: 'tradicional',
    name: 'Molho de Tomate Clássico',
    shortName: 'Clássico',
    slogan: 'Simplicidade italiana: tomate, azeite, sal. Nada mais necessário',
    glowColor: 'rgba(220, 38, 38, 0.3)',
    textColor: 'text-red-500',
    borderColor: 'border-red-500/30',
    accentHex: '#dc2626',
    btnGrad: 'from-red-650 to-red-950',
    badge: 'Pureza Absoluta',
    desc: 'O básico essencial executado com perfeição cirúrgica. Apenas polpa de tomates maduros, azeite de oliva extra virgem e sal de parrilla. Um molho purista, leve e versátil que serve como tela em branco para sua criatividade.',
    pairing: 'Base de pizzas artesanais, bruschettas, e almôndegas ao sugo.',
    culinaryTip: 'Use como base para montar seu próprio molho de assinatura, acrescentando linguiça calabresa salteada ou vegetais confitados.',
    image: '/linha-tomates.png',
    highlights: ['Ingredientes Puristas', 'Acidez Natural Controlada', 'Clean Label de Verdade'],
  },
};

const RECIPES = [
  {
    id: 1,
    title: 'Gnocchi Clássico ao Molho Sugo e Manjericão',
    flavor: 'Ao Sugo',
    flavorColor: 'text-orange-400',
    chef: 'Chef Thiago Castanho',
    time: '20 min',
    difficulty: 'Fácil',
    serves: '2 pessoas',
    ingredients: [
      '400g de gnocchi de batata artesanal fresco',
      '1 vidro de Molho Tradicional ao Sugo Dubola',
      '2 colheres de sopa de azeite extra virgem',
      'Parmesão artesanal ralado na hora',
      'Ramos de manjericão fresco',
    ],
    method: 'Cozinhe o gnocchi em água fervente com sal até começarem a flutuar na panela. Em uma frigideira larga, aqueça o azeite e despeje o Molho de Tomate ao Sugo Dubola. Escorra o gnocchi com uma escumadeira diretamente para a frigideira com o molho quente. Adicione 2 colheres de sopa da água de cozimento da massa, mexa suavemente, salpique manjericão fresco e sirva com parmesão.',
    tip: 'O amido da água de cozimento é o que liga o molho perfeitamente.',
  },
  {
    id: 2,
    title: 'Parmegiana de Berinjela ao Molho Rústico com Burrata',
    flavor: 'Rústico',
    flavorColor: 'text-yellow-500',
    chef: 'Chef Letícia Dornelles',
    time: '35 min',
    difficulty: 'Médio',
    serves: '3 pessoas',
    ingredients: [
      '2 berinjelas cortadas em rodelas de 1cm',
      '1 vidro de Molho de Tomate Rústico Dubola',
      '1 burrata fresca (150g)',
      '1 xícara de farinha Panko para empanar',
      '2 ovos batidos',
      'Sal grosso e pimenta-do-reino',
    ],
    method: 'Salgue as rodelas de berinjela e deixe escorrer por 15 minutos para tirar o amargor. Seque bem, passe no ovo e na farinha Panko. Frite até dourar. Em um refratário, monte camadas de berinjela e Molho Rústico Dubola. Leve ao forno a 180°C por 15 minutos. Retire, abra a burrata fresca no centro e sirva com folhas de manjericão e fio de azeite.',
    tip: 'A burrata adiciona um contraste de temperatura e cremosidade fenomenal.',
  },
];

const TRUST_BADGES = [
  { icon: Leaf, label: 'Tomates Selecionados', sub: 'Pelati Italiano' },
  { icon: Flame, label: 'Fogo Lento', sub: 'Redução Paciente' },
  { icon: Shield, label: 'Clean Label', sub: 'Sem Aditivos Artificiais' },
  { icon: Award, label: 'Padrão Trattoria', sub: 'Textura com Pedaços' },
];

export default function DubolaTomateView() {
  const [selectedFlavor, setSelectedFlavor] = useState('sugo');
  const currentFlavor = FLAVORS[selectedFlavor];

  // Refs for animations
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const manifestoRef = useRef(null);
  const floatRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();
    function gsapTicker(time) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(gsapTicker);

    // Fade-in animations
    gsap.fromTo('.anim-fade-up',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.2 }
    );

    // Parallax mouse movements
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;

      gsap.to('.mouse-px', {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.05
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(gsapTicker);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans-premium overflow-x-hidden selection:bg-orange-500 selection:text-white relative">
      <DubolaHeader />

      {/* Glow orb background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-15 transition-all duration-1000"
        style={{ background: `radial-gradient(circle at 50% 40%, ${currentFlavor.glowColor} 0%, transparent 65%)` }}
      />

      {/* ── SECTION 1: HERO (IMMERSIVE VIDEO BACKGROUND) ── */}
      <section ref={heroRef} className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden z-10">
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            src="/magnific_os-vegetais-caindo.-nao-a_xgdohQFjfW.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-60"
            onError={(e) => {
              e.currentTarget.src = '/hero-todas.mp4';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none" />
        </div>

        <div className="relative z-10 text-center max-w-5xl px-6 space-y-7">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 backdrop-blur-md px-4 py-1.5 rounded-full text-orange-400 anim-fade-up">
            <Sparkles size={11} className="animate-pulse" />
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase">TOMATES ITALIANOS APURADOS AO FOGO</span>
          </div>

          <h1 className="font-display text-5xl sm:text-8xl font-black tracking-tight text-white uppercase leading-[0.9] drop-shadow-2xl anim-fade-up">
            A TRADIÇÃO DO TOMATE.<br />
            <span className="text-orange-500">APURADO AO RIGOR.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-zinc-300 font-light leading-relaxed anim-fade-up">
            Molhos puristas de verdade. Elaborados com tomates pelati maduros importados selecionados, cozidos pacientemente para o máximo de doçura natural e acidez equilibrada. Clean Label absoluto para assinar pratos de chef.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2 anim-fade-up">
            <a
              href="#sabores"
              className="px-7 py-4 rounded-xl bg-orange-600 hover:bg-orange-550 text-white font-bold text-[10px] tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(234,88,12,0.4)]"
            >
              Explorar Sabores
            </a>
            <a
              href="#receitas"
              className="px-7 py-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md text-white font-bold text-[10px] tracking-widest uppercase transition-all hover:bg-white/10 hover:border-white/30"
            >
              Receitas de Chef
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
                <p className="text-xs font-bold text-white text-left">{label}</p>
                <p className="text-[10px] text-zinc-550 text-left">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 2: SHOWCASE SABORES ── */}
      <section id="sabores" ref={sliderRef} className="py-24 sm:py-32 px-6 sm:px-12 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-orange-500">A RIQUEZA DA COZINHA ITALIANA</p>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white">Nossas Criações</h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded-full" />
          </div>

          {/* Flavor Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {Object.values(FLAVORS).map((flv) => (
              <button
                key={flv.id}
                onClick={() => setSelectedFlavor(flv.id)}
                className={`px-5 py-3 text-[10px] font-space-premium font-black tracking-widest uppercase border rounded-xl transition-all duration-300 ${
                  selectedFlavor === flv.id
                    ? `bg-orange-550 border-orange-550 text-white shadow-[0_0_20px_rgba(234,88,12,0.3)]`
                    : 'bg-zinc-950 border-zinc-800 text-zinc-450 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {flv.shortName}
              </button>
            ))}
          </div>

          {/* Flavor Details panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
            {/* Visual Column */}
            <div className="lg:col-span-5 flex justify-center relative min-h-[350px] items-center">
              <div
                className="absolute w-[260px] h-[340px] rounded-full blur-[80px] opacity-35 z-0"
                style={{ backgroundColor: currentFlavor.accentHex }}
              />
              <img
                src={currentFlavor.image}
                alt={currentFlavor.name}
                className="relative z-10 w-full max-w-[280px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:scale-[1.03] transition-transform duration-500"
              />
            </div>

            {/* Info Column */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="space-y-3">
                <span className={`inline-block border px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${currentFlavor.textColor} ${currentFlavor.borderColor}`}>
                  {currentFlavor.badge}
                </span>
                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-white leading-tight">
                  {currentFlavor.name}
                </h3>
                <p className="text-zinc-450 italic text-sm font-light">
                  "{currentFlavor.slogan}"
                </p>
              </div>

              <p className="text-sm text-zinc-300 font-sans-premium leading-relaxed">
                {currentFlavor.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-zinc-900">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold tracking-wider text-orange-400 uppercase">Harmonização Ideal</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{currentFlavor.pairing}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold tracking-wider text-orange-400 uppercase">Segredo do Chef</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{currentFlavor.culinaryTip}</p>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Link
                  to={`/produto/tomate-${selectedFlavor}`}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-[9px] tracking-widest uppercase transition-all flex items-center gap-2"
                >
                  Ver Ficha Completa <ArrowRight size={12} />
                </Link>
                <Link
                  to="/linha-dubola"
                  className="px-6 py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-650 bg-zinc-950 text-zinc-300 font-bold text-[9px] tracking-widest uppercase transition-all"
                >
                  Catálogo Completo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: VIRTUAL CHEF & RECIPES ── */}
      <section id="receitas" className="py-24 sm:py-32 px-6 sm:px-12 bg-zinc-950 relative z-10 border-t border-white/[0.02]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: virtual chef container */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 text-orange-500 text-[9px] font-bold tracking-wider uppercase">
                <ChefHat size={12} /> ASSISTÊNCIA CULINÁRIA IA
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white leading-none">
                PERGUNTE AO CHEF
              </h2>
              <p className="text-sm text-zinc-450 leading-relaxed">
                Descubra qual molho combina melhor com sua receita, tempo de redução ou técnicas clássicas de emulsão.
              </p>
            </div>
            <ChefVirtual category="tomate" accentColor="#ea580c" />
          </div>

          {/* Right: curated recipes list */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-zinc-500 text-[9px] font-bold tracking-wider uppercase">RECEITAS DE ASSINATURA</span>
              <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-white">Criadas por Chefs</h2>
            </div>

            <div className="space-y-6">
              {RECIPES.map((recipe) => (
                <div key={recipe.id} className="bg-black border border-zinc-900 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className={`text-[8px] font-bold uppercase tracking-wider ${recipe.flavorColor}`}>
                        Molho: {recipe.flavor}
                      </span>
                      <h4 className="font-display text-lg font-black uppercase text-white mt-1">{recipe.title}</h4>
                      <p className="text-[10px] text-zinc-550 font-medium">Desenvolvido por {recipe.chef}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="bg-zinc-900 border border-zinc-800 text-[8px] font-bold uppercase px-2.5 py-1 rounded-lg text-zinc-400">
                        {recipe.time}
                      </span>
                      <span className="bg-zinc-900 border border-zinc-800 text-[8px] font-bold uppercase px-2.5 py-1 rounded-lg text-zinc-400">
                        {recipe.serves}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-[9px] font-bold uppercase text-zinc-400 tracking-wider">Ingredientes Principais</h5>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-zinc-500 font-sans-premium">
                      {recipe.ingredients.slice(0, 4).map((ing, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 size={10} className="text-orange-500 shrink-0" />
                          <span className="truncate">{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans-premium border-t border-zinc-900/60 pt-4">
                    {recipe.method}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DubolaFooter />
    </div>
  );
}
