import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  ChevronDown, 
  CheckCircle2, 
  Package, 
  Calculator, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Leaf, 
  Flame, 
  Utensils, 
  Send, 
  RefreshCw, 
  TrendingUp, 
  ChevronRight, 
  FileText,
  Volume2
} from 'lucide-react';
import { gsap } from 'gsap';
import DubolaHeader from '../components/DubolaHeader';
import DubolaFooter from '../components/DubolaFooter';

// ── DATA FOR LOGISTICS FORMATS (Slide 4) ──
const LOGISTICS_SPECS = {
  bisnaga: {
    title: 'Bisnaga Premium 230g / 178g',
    boxQty: 'Caixa Master com 06 unidades',
    weight: '1,5 kg por caixa master',
    dimensions: '22cm x 15cm x 18cm',
    palletQty: '240 caixas por pallet padrão',
    idealFor: 'Mesas de restaurantes, hamburguerias, bistrôs e empórios de alta gastronomia.',
    description: 'A embalagem perfeita para contato direto com o cliente final na mesa. Design anatômico com válvula dosadora limpa que evita desperdícios e respingos acidentais, garantindo a higiene do salão.',
    highlights: ['Válvula corta-gotas de silicone', 'PET 100% reciclável livre de BPA', 'Exposição de marca na mesa']
  },
  bag: {
    title: 'Bag Profissional 1,01 kg',
    boxQty: 'Caixa Master com 01 unidade (ou fardos sob demanda)',
    weight: '1,1 kg por unidade',
    dimensions: '30cm x 20cm x 10cm',
    palletQty: '480 unidades por pallet padrão',
    idealFor: 'Uso interno na cozinha (Back of House), preparação de pratos, reabastecimento de dispensers e alto giro.',
    description: 'Desenvolvido especificamente para chefs e operações de cozinha profissional. O formato bag maximiza o rendimento e permite a extração de até 99% do produto, gerando desperdício zero e agilizando o pré-paro de burgers e pratos.',
    highlights: ['Bico dosador universal', 'Alta barreira contra oxigênio', 'Economia de espaço no descarte']
  },
};

// ── DATA FOR MAYONNAISE FLAVORS (Slide 6) ──
const MAYONNAISE_FLAVORS = {
  tradicional: {
    id: 'tradicional',
    name: 'Maionese Tradicional',
    colorClass: 'bg-blue-600',
    borderClass: 'border-blue-500/30',
    intensity: 'Suave & Aveludada',
    desc: 'A consagração da emulsão clássica. Elaborada puramente com gemas de ovos caipiras selecionados e um toque sutil de limão siciliano para acidez equilibrada. Textura ultra-cremosa com estabilidade térmica impecável.',
    b2bHighlights: 'Não desanda sob calor residual. Excelente estabilidade em saladas frias e molhos base de alta performance.',
    pairing: 'Base de hambúrgueres clássicos, saladas de batata alemã (kartoffelsalat), fritas rústicas e sanduíches naturais.'
  },
  alho: {
    id: 'alho',
    name: 'Maionese de Alho',
    colorClass: 'bg-purple-600',
    borderClass: 'border-purple-500/30',
    intensity: 'Intensa & Aromática',
    desc: 'O autêntico perfil do Aioli mediterrâneo. Alho dourado e confitado lentamente em azeite de oliva extra virgem, infundido na base aveludada Dubola. Picância característica e aroma marcante do alho natural.',
    b2bHighlights: 'Sem sabor residual químico metálico. Aromas mantidos estáveis mesmo após longas horas em refrigeração de serviço.',
    pairing: 'Batatas bravas, burgers artesanais de costela, carnes grelhadas em tiras e pão de alho gourmet.'
  },
  defumada: {
    id: 'defumada',
    name: 'Maionese Defumada',
    colorClass: 'bg-amber-800',
    borderClass: 'border-amber-700/30',
    intensity: 'Robusta & Amadeirada',
    desc: 'Infundida com fumaça líquida natural extraída de lenha de macieira. Traz a alma e a profundidade aromática do verdadeiro churrasco americano para qualquer cozinha, mesmo em chapas de alta produção.',
    b2bHighlights: 'Simula defumação de pitmaster em segundos. Agrega valor perceptível imediato e sabor "brasa" no prato.',
    pairing: 'Smash burgers na chapa, anéis de cebola empanados, brisket desfiado e carnes de porco grelhadas.'
  },
  ervas: {
    id: 'ervas',
    name: 'Maionese de Ervas Finas',
    colorClass: 'bg-emerald-600',
    borderClass: 'border-emerald-500/30',
    intensity: 'Fresca & Herbal',
    desc: 'Uma sinfonia verde de frescor. Combinação equilibrada de manjericão gigante, salsinha fresca de folha lisa, cebolete e um toque de alecrim fresco picados milimetricamente, trazendo notas herbais vivas e perfumadas.',
    b2bHighlights: 'As ervas permanecem verdes e vibrantes sem oxidar ou escurecer a emulsão ao longo do tempo.',
    pairing: 'Wraps frios vegetarianos, peixes brancos delicados, carnes de aves grelhadas e vegetais assados na brasa.'
  },
  tartaro: {
    id: 'tartaro',
    name: 'Maionese Tártaro',
    colorClass: 'bg-orange-600',
    borderClass: 'border-orange-500/30',
    intensity: 'Cítrica & Crocante',
    desc: 'A rainha dos pratos de frutos do mar. Ricos pedacinhos crocantes de picles nobres em conserva de vinagre de maçã, cebola roxa milimetricamente picada e raspas cítricas frescas de limão e dill.',
    b2bHighlights: 'Crocância física real de picles em cada mordida. Acidez equilibrada ideal para cortar a gordura de frituras.',
    pairing: 'Iscas de peixe na panko, camarões fritos, hambúrgueres de siri e salmão unilateral.'
  },
  azeitona: {
    id: 'azeitona',
    name: 'Maionese de Azeitona Preta',
    colorClass: 'bg-neutral-800',
    borderClass: 'border-neutral-700/30',
    intensity: 'Pungente & Salina',
    desc: 'Incomparável riqueza rústica. Produzida com azeitonas pretas nobres do tipo Azapa, processadas de forma a reter pedacinhos rústicos e salinidade marcante típica da culinária mediterrânea.',
    b2bHighlights: 'Sabor denso de alto impacto sensorial. Perfeita para elevar petiscos simples em pratos gourmet assinados.',
    pairing: 'Canapés finos, sanduíches de focaccia de fermentação natural, carpaccios e acompanhamento de tábuas de frios.'
  },
  limao: {
    id: 'limao',
    name: 'Maionese Limão Siciliano',
    colorClass: 'bg-lime-600',
    borderClass: 'border-lime-500/30',
    intensity: 'Ultra Cítrica & Refrescante',
    desc: 'Uma explosão cítrica e perfumada. Emulsão enriquecida com óleos essenciais da casca e suco concentrado de limão siciliano orgânico, que limpa as papilas gustativas e traz brilho ímpar para o prato.',
    b2bHighlights: 'Perfil de frescor premium e toque gourmet autoral. Excelente apelo visual e sabor refrescante persistente.',
    pairing: 'Hambúrgueres de frango empanado, ceviches contemporâneos, tacos de peixe e saladas de folhas verdes.'
  }
};

export default function DubolaCommercialCatalogView() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState('bisnaga');
  const [activeMaionese, setActiveMaionese] = useState('tradicional');
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

  // ── CALCULATOR STATES ──
  const [segment, setSegment] = useState('hamburgueria');
  const [dailyOrders, setDailyOrders] = useState(150);
  const [ketchupSelected, setKetchupSelected] = useState(true);
  const [mayoSelected, setMayoSelected] = useState(true);
  const [formatSelected, setFormatSelected] = useState('bisnaga');

  // ── FORM STATES ──
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    cnpj: '',
    email: '',
    phone: '',
    cityState: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ── GSAP TRANSITIONS ──
  useEffect(() => {
    // Animate slide content entrance
    gsap.fromTo('.slide-content-anim', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );
  }, [activeSlide]);

  // ── KEYBOARD NAVIGATION ──
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide]);

  // ── MOUSE MOVE PARALLAX ──
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const nextSlide = () => {
    if (activeSlide < 6) setActiveSlide(activeSlide + 1);
  };

  const prevSlide = () => {
    if (activeSlide > 0) setActiveSlide(activeSlide - 1);
  };

  // ── B2B DYNAMIC CALCULATION LOGIC ──
  const calculateLogistics = () => {
    // Refeições mensais = diárias * 30
    const monthlyOrders = dailyOrders * 30;
    
    // Porções estimadas por refeição
    let gramsPerMeal = 25;
    if (segment === 'hamburgueria') gramsPerMeal = 40;
    else if (segment === 'lanchonete') gramsPerMeal = 30;
    else if (segment === 'padaria') gramsPerMeal = 20;
    else if (segment === 'varejo') gramsPerMeal = 45;

    let totalSauceFactor = 0;
    if (ketchupSelected) totalSauceFactor += 0.45; // 45% do volume é ketchup
    if (mayoSelected) totalSauceFactor += 0.55;    // 55% do volume é maionese

    const totalSauceGrams = monthlyOrders * gramsPerMeal * totalSauceFactor;
    const totalKg = totalSauceGrams / 1000;

    // Cálculo em caixas/unidades com base no formato selecionado
    let recommendedPackages = 0;
    let recommendedBoxes = 0;
    let unitsPerBox = 1;

    if (formatSelected === 'bisnaga') {
      recommendedPackages = Math.ceil(totalSauceGrams / 230);
      unitsPerBox = 6;
      recommendedBoxes = Math.ceil(recommendedPackages / unitsPerBox);
    } else if (formatSelected === 'bag') {
      recommendedPackages = Math.ceil(totalSauceGrams / 1010);
      unitsPerBox = 1;
      recommendedBoxes = recommendedPackages;
    } else {
      recommendedPackages = Math.ceil(totalSauceGrams / 7);
      unitsPerBox = 100;
      recommendedBoxes = Math.ceil(recommendedPackages / unitsPerBox);
    }

    // Ganho em rendimento
    const costSavings = 15; // 15% de economia estimada em desperdício comparado a baldes com alta perda residual.

    return {
      monthlyOrders,
      totalKg: totalKg.toFixed(1),
      recommendedPackages,
      recommendedBoxes,
      costSavings
    };
  };

  const logistics = calculateLogistics();

  // ── FORM SUBMIT ──
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simular envio de lead
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
    }, 1500);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen text-[#f4f4f5] overflow-hidden bg-black font-sans selection:bg-[#ff003c]/30 selection:text-white"
    >
      <DubolaHeader />

      {/* Slide Navigation Overlay */}
      <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3.5 z-40">
        {[...Array(7)].map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
              activeSlide === i 
                ? 'bg-[#ff003c] scale-125 shadow-[0_0_10px_#ff003c]' 
                : 'bg-zinc-800 hover:bg-zinc-600'
            }`}
            title={`Slide ${i + 1}`}
            aria-label={`Ir para o slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Main Slides Wrapper */}
      <div className="relative w-full h-full flex transition-transform duration-700 ease-out" style={{ transform: `translateY(-${activeSlide * 100}%)`, flexDirection: 'column' }}>
        
        {/* ======================================================== */}
        {/* SLIDE 1: COVER (O extraordinário se torna o padrão)       */}
        {/* ======================================================== */}
        <section className="w-full h-screen flex-shrink-0 relative overflow-hidden flex items-center justify-center bg-[#09090b]">
          {/* Subtle rustic background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(24,24,27,0.8)_0%,rgba(9,9,11,1)_100%)] z-0" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 z-0 select-none pointer-events-none transition-transform duration-75"
            style={{ 
              backgroundImage: `url('/trio-1920x1080.png')`,
              transform: `translate(${(mousePosition.x - 50) * 0.1}px, ${(mousePosition.y - 50) * 0.1}px) scale(1.05)`
            }}
          />
          
          <div className="max-w-7xl w-full mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 pt-20">
            <div className="lg:col-span-6 flex flex-col items-start text-left slide-content-anim">
              <div className="flex items-center gap-1 mb-4">
                <span className="text-[#ff003c]"><Star size={16} fill="#ff003c" className="animate-pulse" /></span>
                <span className="text-[10px] font-space-premium font-black tracking-[0.35em] text-white/50 uppercase">
                  Apresentação Comercial Exclusiva
                </span>
              </div>
              <img 
                src="/Logo-Dubola.png" 
                alt="Dubola" 
                className="h-16 sm:h-20 w-auto mb-6 object-contain filter drop-shadow-[0_4px_12px_rgba(255,0,0,0.15)]"
              />
              <h1 className="text-4xl sm:text-6xl font-black font-rockwell text-white leading-tight uppercase tracking-tight mb-6">
                Onde o <span className="text-[#ff003c]">extraordinário</span> se torna o padrão do seu negócio.
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-lg mb-8">
                Parceira estratégica de hamburguerias, restaurantes, padarias, redes de atacado e varejo. Molhos especiais criados para surpreender paladares e impulsionar o seu faturamento.
              </p>
              
              <button
                onClick={nextSlide}
                className="group flex items-center gap-3 bg-[#ff003c] hover:bg-[#d90032] text-white font-space-premium font-black text-[10px] tracking-[0.2em] uppercase px-8 py-4.5 rounded-xl shadow-[0_4px_20px_rgba(255,0,60,0.35)] transition-all duration-300 hover:scale-[1.03]"
              >
                Iniciar Apresentação <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
            
            <div className="lg:col-span-6 flex justify-center relative slide-content-anim">
              <div className="absolute w-[80%] h-[80%] bg-[#ff003c]/5 rounded-full blur-[100px] -z-10" />
              {/* Product mockup placement */}
              <img 
                src="/ketchup/trioKetchupDubola.png" 
                alt="Trio Ketchups Dubola" 
                className="w-full max-w-md sm:max-w-lg object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce select-none pointer-events-none">
            <span className="text-[8px] font-space-premium tracking-[0.25em] uppercase">Rolar para descer</span>
            <ChevronDown size={16} />
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 2: MANIFESTO (Qualidade Absoluta)                   */}
        {/* ======================================================== */}
        <section className="w-full h-screen flex-shrink-0 relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#800000] to-[#3a0007]">
          {/* Decorative blood-red dynamic light spot */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,60,0.15)_0%,transparent_70%)] z-0" />
          
          <div className="max-w-7xl w-full mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 pt-20">
            <div className="lg:col-span-5 flex justify-center relative order-2 lg:order-1 slide-content-anim">
              <div className="absolute w-full h-full bg-[#ff003c]/20 rounded-full blur-[120px] -z-10" />
              {/* Splashes behind product mockup */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <div className="w-[120%] h-[120%] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/hero-b2b.png')` }} />
              </div>
              <img 
                src="/trio-ketchups-novo.png" 
                alt="Ketchups Dubola" 
                className="w-full max-w-sm sm:max-w-md object-contain filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-10"
              />
            </div>
            
            <div className="lg:col-span-7 flex flex-col items-start text-left order-1 lg:order-2 slide-content-anim">
              <span className="text-[#ff5c7c] text-[10px] font-space-premium font-black tracking-[0.3em] uppercase mb-4 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                Compromisso Logístico & Culinário
              </span>
              <h2 className="text-3xl sm:text-5xl font-black font-rockwell text-white leading-tight uppercase tracking-tight mb-6">
                Para quem vive a <span className="text-amber-400">Qualidade Absoluta</span>:
              </h2>
              <div className="h-1 w-24 bg-amber-400 mb-8" />
              
              <h3 className="text-lg sm:text-xl font-bold font-space-premium text-white leading-relaxed tracking-wider mb-6">
                SABOR PREMIUM, BRILHO IMPECÁVEL E CONSISTÊNCIA IDÊNTICA DO PRIMEIRO AO ÚLTIMO LOTE.
              </h3>
              
              <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl">
                <p>
                  A Dubola nasceu para transformar o comum em memorável. Nosso foco é oferecer um produto confiável que reduza o refugo e encante seus clientes.
                </p>
                <p className="font-semibold text-white">
                  Mais do que fornecer molhos espetaculares, nós firmamos um pacto de crescimento com a sua operação comercial.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-8 w-full max-w-md">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-amber-400"><ShieldCheck size={18} /></div>
                  <div>
                    <h4 className="text-[10px] font-space-premium font-bold tracking-wider text-white">ESTABILIDADE</h4>
                    <p className="text-[10px] text-zinc-400">Sem separação de soro ou água.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-amber-400"><Leaf size={18} /></div>
                  <div>
                    <h4 className="text-[10px] font-space-premium font-bold tracking-wider text-white">CLEAN LABEL</h4>
                    <p className="text-[10px] text-zinc-400">Ingredientes nobres e reais.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 3: KETCHUPS (Insumos nobres)                        */}
        {/* ======================================================== */}
        <section className="w-full h-screen flex-shrink-0 relative overflow-hidden flex items-center justify-center bg-[#1c080b]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,0,0,0.06)_0%,transparent_60%)] z-0" />
          
          <div className="max-w-7xl w-full mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 pt-20">
            <div className="lg:col-span-6 flex flex-col items-start text-left slide-content-anim">
              <span className="text-[#ff003c] text-[10px] font-space-premium font-black tracking-[0.3em] uppercase mb-4">
                Redução Lenta & Tomate Italiano
              </span>
              <h2 className="text-4xl sm:text-6xl font-black font-rockwell text-white leading-tight uppercase tracking-tight mb-6">
                Ketchups <span className="text-[#ff003c]">Dubola</span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-lg mb-8">
                Unimos ingredientes nobres, receitas exclusivas e processos rigorosos para entregar molhos de qualidade premium, primeira linha. Nosso Ketchup é produzido com base de tomates italianos de polpa densa, açúcar mascavo e um buquê único de especiarias naturais.
              </p>
              
              <div className="space-y-4 w-full">
                <div className="flex items-center gap-4.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all">
                  <span className="w-3 h-3 rounded-full bg-red-600 shadow-[0_0_8px_#dc2626]" />
                  <div>
                    <h3 className="text-xs font-space-premium font-bold tracking-widest text-white uppercase">Ketchup Tradicional</h3>
                    <p className="text-[10px] text-zinc-400">Rústico, espesso, com dulçor e acidez perfeitamente calibrados.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all">
                  <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
                  <div>
                    <h3 className="text-xs font-space-premium font-bold tracking-widest text-white uppercase">Ketchup com Goiaba</h3>
                    <p className="text-[10px] text-zinc-400">A combinação agridoce pioneira que virou febre nas melhores hamburguerias.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-all">
                  <span className="w-3 h-3 rounded-full bg-orange-600 shadow-[0_0_8px_#ea580c]" />
                  <div>
                    <h3 className="text-xs font-space-premium font-bold tracking-widest text-white uppercase">Ketchup Picante</h3>
                    <p className="text-[10px] text-zinc-400">Pungência progressiva de pimentas Habanero e Jalapeño defumadas.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-6 flex justify-center relative slide-content-anim">
              <div className="absolute w-[80%] h-[80%] bg-[#ff003c]/5 rounded-full blur-[80px] -z-10" />
              {/* Splitted image layout to simulate PDF French fries and bottles side-by-side */}
              <div className="relative w-full max-w-md sm:max-w-lg aspect-video sm:aspect-square bg-cover bg-center rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl" 
                   style={{ backgroundImage: `url('/ketchup-tradicional.jpg')` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-space-premium tracking-[0.2em] text-[#ff003c] font-black uppercase">Destaque de Mesa</span>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Qualidade que se sente visualmente</h4>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[8px] bg-white/10 px-2.5 py-1 rounded text-white font-bold border border-white/10">230G BISNAGA</span>
                    <span className="text-[8px] bg-white/10 px-2.5 py-1 rounded text-white font-bold border border-white/10">1.01KG BAG</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 4: TABLE OF FORMATS (Matriz logistica)              */}
        {/* ======================================================== */}
        <section className="w-full h-screen flex-shrink-0 relative overflow-hidden flex items-center justify-center bg-[#b22222]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.15)_0%,transparent_80%)] z-0" />
          
          <div className="max-w-7xl w-full mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 pt-20">
            <div className="lg:col-span-7 flex flex-col items-start slide-content-anim">
              <span className="text-white/70 text-[10px] font-space-premium font-black tracking-[0.3em] uppercase mb-4">
                Especificações Técnicas Operacionais
              </span>
              <h2 className="text-3xl sm:text-5xl font-black font-rockwell text-white leading-tight uppercase tracking-tight mb-8">
                Formatos & <span className="text-yellow-400">Distribuição</span>
              </h2>
              
              {/* Interactive Matrix Table */}
              <div className="w-full bg-black/30 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-black/40">
                      <th className="p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest text-zinc-400 uppercase">Embalagem</th>
                      <th className="p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest text-white uppercase text-center">Tradicional</th>
                      <th className="p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest text-white uppercase text-center">Com Goiaba</th>
                      <th className="p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest text-white uppercase text-center">Picante</th>
                      <th className="p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest text-zinc-400 uppercase text-right">Logística</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr 
                      onClick={() => setSelectedFormat('bisnaga')}
                      className={`border-b border-white/[0.06] hover:bg-white/5 cursor-pointer transition-colors ${selectedFormat === 'bisnaga' ? 'bg-white/10' : ''}`}
                    >
                      <td className="p-4 sm:p-5 flex items-center gap-3">
                        <span className="text-yellow-400"><Package size={16} /></span>
                        <span className="text-xs sm:text-sm font-bold text-white uppercase">Bisnaga 230g</span>
                      </td>
                      <td className="p-4 sm:p-5 text-center"><span className="inline-block w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_white]" /></td>
                      <td className="p-4 sm:p-5 text-center"><span className="inline-block w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_white]" /></td>
                      <td className="p-4 sm:p-5 text-center"><span className="inline-block w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_white]" /></td>
                      <td className="p-4 sm:p-5 text-right text-[10px] font-space-premium font-black text-yellow-400">CX. 06 UN</td>
                    </tr>
                    
                    <tr 
                      onClick={() => setSelectedFormat('bag')}
                      className={`border-b border-white/[0.06] hover:bg-white/5 cursor-pointer transition-colors ${selectedFormat === 'bag' ? 'bg-white/10' : ''}`}
                    >
                      <td className="p-4 sm:p-5 flex items-center gap-3">
                        <span className="text-yellow-400"><Package size={16} /></span>
                        <span className="text-xs sm:text-sm font-bold text-white uppercase">Bag 1,01 kg</span>
                      </td>
                      <td className="p-4 sm:p-5 text-center"><span className="inline-block w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_white]" /></td>
                      <td className="p-4 sm:p-5 text-center"><span className="inline-block w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_white]" /></td>
                      <td className="p-4 sm:p-5 text-center"><span className="inline-block w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_white]" /></td>
                      <td className="p-4 sm:p-5 text-right text-[10px] font-space-premium font-black text-yellow-400">CX. 01 UN</td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-zinc-300 mt-4 italic">
                * Clique em uma linha da tabela para visualizar os detalhes logísticos no painel lateral.
              </p>
            </div>
            
            {/* Interactive Logistics Sidebar card */}
            <div className="lg:col-span-5 slide-content-anim">
              <div className="bg-zinc-950/80 border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff003c]/10 rounded-full blur-2xl" />
                <span className="text-[9px] font-space-premium font-black tracking-widest text-[#ff003c] uppercase block mb-2">
                  Especificação Logística
                </span>
                
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white mb-4 border-b border-white/10 pb-3 flex items-center gap-2">
                  <Package className="text-yellow-400" size={18} />
                  {LOGISTICS_SPECS[selectedFormat].title}
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-[10px] font-space-premium tracking-wider text-zinc-400 uppercase">Embalagem de Embarque</h4>
                    <p className="text-xs font-semibold text-white">{LOGISTICS_SPECS[selectedFormat].boxQty}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-space-premium tracking-wider text-zinc-400 uppercase">Peso Bruto Estimado</h4>
                    <p className="text-xs font-semibold text-white">{LOGISTICS_SPECS[selectedFormat].weight}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-space-premium tracking-wider text-zinc-400 uppercase">Paletização Padrão</h4>
                    <p className="text-xs font-semibold text-white">{LOGISTICS_SPECS[selectedFormat].palletQty}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-space-premium tracking-wider text-zinc-400 uppercase">Destinação Operacional</h4>
                    <p className="text-xs text-zinc-300 leading-relaxed">{LOGISTICS_SPECS[selectedFormat].idealFor}</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <h4 className="text-[9px] font-space-premium tracking-wider text-yellow-400 uppercase mb-2">Vantagens Food Service</h4>
                  <ul className="space-y-1">
                    {LOGISTICS_SPECS[selectedFormat].highlights.map((h, i) => (
                      <li key={i} className="text-[10px] text-zinc-300 flex items-center gap-2">
                        <CheckCircle2 size={10} className="text-yellow-400 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 5: MAYONNAISE HERO (A maionese que eleva)          */}
        {/* ======================================================== */}
        <section className="w-full h-screen flex-shrink-0 relative overflow-hidden flex items-center justify-center bg-[#050e26]">
          {/* Midnight Blue glowing orb */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12)_0%,transparent_75%)] z-0" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-25 z-0 select-none pointer-events-none transition-transform duration-75"
            style={{ 
              backgroundImage: `url('/maioneses.png')`,
              transform: `translate(${(mousePosition.x - 50) * -0.08}px, ${(mousePosition.y - 50) * -0.08}px) scale(1.03)`
            }}
          />

          <div className="max-w-7xl w-full mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 pt-20">
            <div className="lg:col-span-6 flex justify-center relative order-2 lg:order-1 slide-content-anim">
              <div className="absolute w-[90%] h-[90%] bg-blue-500/10 rounded-full blur-[100px] -z-10" />
              {/* Mayonnaise mockup visual */}
              <img 
                src="/maioneses.png" 
                alt="Dubola Mayonnaises Trio" 
                className="w-full max-w-sm sm:max-w-md object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.7)]"
              />
            </div>
            
            <div className="lg:col-span-6 flex flex-col items-start text-left order-1 lg:order-2 slide-content-anim">
              <span className="text-blue-400 text-[10px] font-space-premium font-black tracking-[0.3em] uppercase mb-4 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                Linha de Emulsões Nobres
              </span>
              <h2 className="text-4xl sm:text-6xl font-black font-rockwell text-white leading-tight uppercase tracking-tight mb-6">
                A Maionese que <span className="text-blue-400">Eleva</span> Qualquer Prato
              </h2>
              <div className="h-1 w-24 bg-blue-500 mb-8" />
              
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-lg mb-8">
                Nossas maioneses especiais combinam cremosidade e densidade. Elas foram formuladas para manter sua estrutura em preparos frios e quentes, oferecendo excelente cobertura sem umidade residual indesejada.
              </p>

              <div className="space-y-4.5 w-full max-w-md">
                <div className="flex gap-4 items-start">
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 mt-1">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-space-premium font-bold tracking-wider text-white uppercase">Estabilidade Térmica Elevada</h3>
                    <p className="text-[11px] text-zinc-400">Suporta contato direto com hambúrgueres recém-saídos da grelha sem liquefazer.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 mt-1">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-space-premium font-bold tracking-wider text-white uppercase">Rendimento Superior (High Yield)</h3>
                    <p className="text-[11px] text-zinc-400">Por sua consistência firme, exige menor gramatura por porção para cobrir e dar sabor.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SLIDE 6: MAYONNAISE FLAVORS (Lista de sabores)            */}
        {/* ======================================================== */}
        <section className="w-full h-screen flex-shrink-0 relative overflow-hidden flex flex-col lg:flex-row bg-[#080d1a]">
          
          {/* Left Panel: Flavor Selection (Beige/Cream theme) */}
          <div className="w-full lg:w-5/12 h-1/2 lg:h-full bg-[#f4ebd0] flex flex-col justify-center px-8 sm:px-16 pt-24 pb-8 lg:py-0 overflow-y-auto">
            <div className="max-w-md w-full slide-content-anim">
              <span className="text-[#080d1a]/60 text-[9px] font-space-premium font-bold tracking-[0.25em] uppercase mb-2 block">
                Menu de Especialidades
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-rockwell text-[#080d1a] uppercase tracking-tight mb-8">
                Maioneses
              </h2>
              
              <div className="flex flex-col gap-2.5 sm:gap-3.5">
                {Object.values(MAYONNAISE_FLAVORS).map((flav) => (
                  <button
                    key={flav.id}
                    onClick={() => setActiveMaionese(flav.id)}
                    className={`w-full text-left py-3.5 px-6 rounded-2xl transition-all duration-300 font-space-premium font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-between border ${
                      activeMaionese === flav.id
                        ? `${flav.colorClass} text-white border-transparent shadow-lg scale-[1.02]`
                        : 'bg-black/[0.03] text-[#080d1a]/85 border-[#080d1a]/15 hover:bg-black/[0.07]'
                    }`}
                  >
                    <span>{flav.name}</span>
                    {activeMaionese === flav.id ? <ChevronRight size={16} /> : <span className="w-1.5 h-1.5 rounded-full bg-[#080d1a]/50" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Panel: Flavor Details (Midnight Navy Blue theme) */}
          <div className="w-full lg:w-7/12 h-1/2 lg:h-full flex flex-col justify-center px-8 sm:px-16 py-8 lg:py-0 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06)_0%,transparent_70%)] pointer-events-none" />
            
            <div className="max-w-xl w-full relative z-10 slide-content-anim">
              <span className="text-blue-400 text-[10px] font-space-premium font-bold tracking-[0.25em] uppercase mb-3 block">
                Ficha Sensorial B2B
              </span>
              
              <h3 className="text-3xl sm:text-5xl font-black font-rockwell text-white uppercase tracking-tight mb-6">
                {MAYONNAISE_FLAVORS[activeMaionese].name}
              </h3>
              
              <div className="flex items-center gap-3.5 mb-6">
                <span className="text-[10px] bg-blue-500/10 border border-blue-500/35 text-blue-400 font-space-premium font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Intensidade: {MAYONNAISE_FLAVORS[activeMaionese].intensity}
                </span>
                <span className="text-[9px] text-zinc-400 font-mono">
                  COD: DBL-MAI-{activeMaionese.slice(0,3).toUpperCase()}
                </span>
              </div>
              
              <div className="h-px bg-white/10 w-full mb-6" />
              
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                {MAYONNAISE_FLAVORS[activeMaionese].desc}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white/[0.02] border border-white/[0.04] p-5 rounded-2xl">
                <div>
                  <h4 className="text-[10px] font-space-premium font-black tracking-wider text-blue-400 uppercase mb-2">Sugestão de Uso</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {MAYONNAISE_FLAVORS[activeMaionese].pairing}
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-space-premium font-black tracking-wider text-yellow-400 uppercase mb-2">Benefício Operacional</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {MAYONNAISE_FLAVORS[activeMaionese].b2bHighlights}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </section>

        {/* ======================================================== */}
        {/* SLIDE 7: CALCULATOR & B2B LEAD FORM                      */}
        {/* ======================================================== */}
        <section className="w-full h-screen flex-shrink-0 relative overflow-hidden flex items-center justify-center bg-[#09090b]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,0,60,0.06)_0%,transparent_60%)] z-0" />
          
          <div className="max-w-7xl w-full mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 pt-20 overflow-y-auto h-full pb-10 lg:pb-0">
            
            {/* Calculator Column */}
            <div className="lg:col-span-6 flex flex-col slide-content-anim py-6 lg:py-0">
              <span className="text-[#ff003c] text-[10px] font-space-premium font-black tracking-[0.3em] uppercase mb-3 flex items-center gap-1.5">
                <Calculator size={12} /> Dimensionamento Comercial
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-rockwell text-white uppercase tracking-tight mb-5">
                Simulador de <span className="text-[#ff003c]">Consumo</span>
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                Descubra a demanda mensal de molhos e a recomendação de compra logística ideal baseada no volume diário de vendas do seu estabelecimento.
              </p>
              
              {/* Form Controls */}
              <div className="bg-zinc-900/50 border border-white/[0.06] p-5 sm:p-6 rounded-2xl space-y-4">
                {/* Segment Selection */}
                <div>
                  <label className="text-[9px] font-space-premium font-bold tracking-wider text-zinc-400 uppercase block mb-2">Segmento do Negócio</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['hamburgueria', 'restaurante', 'lanchonete'].map((seg) => (
                      <button
                        key={seg}
                        onClick={() => setSegment(seg)}
                        className={`py-2 px-3 rounded-lg text-[9px] font-space-premium font-bold uppercase border transition-all text-center ${
                          segment === seg
                            ? 'bg-[#ff003c] border-transparent text-white'
                            : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {seg === 'hamburgueria' ? 'Burger' : seg === 'restaurante' ? 'Restaurante' : 'Lanchonete'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Range Slider for Orders */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[9px] font-space-premium font-bold tracking-wider text-zinc-400 uppercase">Pedidos diários estimados</label>
                    <span className="text-xs font-bold text-white font-mono">{dailyOrders} pedidos/dia</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={dailyOrders}
                    onChange={(e) => setDailyOrders(parseInt(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#ff003c]"
                  />
                  <div className="flex justify-between text-[8px] text-zinc-500 font-mono mt-1">
                    <span>10</span>
                    <span>500</span>
                    <span>1000</span>
                  </div>
                </div>

                {/* Packaging Formats Selectors */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-space-premium font-bold tracking-wider text-zinc-400 uppercase block mb-2">Formato Desejado</label>
                    <select
                      value={formatSelected}
                      onChange={(e) => setFormatSelected(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 text-xs text-white rounded-lg p-2.5 outline-none focus:border-[#ff003c]/50 font-space-premium"
                    >
                      <option value="bisnaga">Bisnaga 230g</option>
                      <option value="bag">Bag Profissional 1kg</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] font-space-premium font-bold tracking-wider text-zinc-400 uppercase block mb-2">Linhas incluídas</label>
                    <div className="flex gap-2.5 pt-1">
                      <label className="flex items-center gap-1.5 text-xs text-white cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={ketchupSelected}
                          onChange={(e) => setKetchupSelected(e.target.checked)}
                          className="rounded border-zinc-700 bg-zinc-950 text-[#ff003c] focus:ring-[#ff003c]/20"
                        />
                        Ketchup
                      </label>
                      <label className="flex items-center gap-1.5 text-xs text-white cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={mayoSelected}
                          onChange={(e) => setMayoSelected(e.target.checked)}
                          className="rounded border-zinc-700 bg-zinc-950 text-[#ff003c] focus:ring-[#ff003c]/20"
                        />
                        Maionese
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Results Display */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-white/[0.02] border border-white/[0.04] p-3.5 rounded-xl text-center">
                  <span className="text-[8px] font-space-premium tracking-wider text-zinc-400 uppercase block mb-1">Volume Mensal</span>
                  <span className="text-lg font-black text-[#ff003c] font-mono">{logistics.totalKg} kg</span>
                </div>
                <div className="bg-white/[0.02] border border-white/[0.04] p-3.5 rounded-xl text-center">
                  <span className="text-[8px] font-space-premium tracking-wider text-zinc-400 uppercase block mb-1">Recomendação</span>
                  <span className="text-lg font-black text-white font-mono">{logistics.recommendedBoxes} cx</span>
                  <span className="text-[8px] text-zinc-500 block">({formatSelected.toUpperCase()})</span>
                </div>
                <div className="bg-white/[0.02] border border-white/[0.04] p-3.5 rounded-xl text-center">
                  <span className="text-[8px] font-space-premium tracking-wider text-zinc-400 uppercase block mb-1">Ganho em Rendimento</span>
                  <span className="text-lg font-black text-green-400 font-mono">+{logistics.costSavings}%</span>
                </div>
              </div>
            </div>
            
            {/* Lead Form Column */}
            <div className="lg:col-span-6 slide-content-anim py-6 lg:py-0">
              <div className="bg-zinc-950 border border-white/10 p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-2xl">
                
                {formSubmitted ? (
                  <div className="text-center py-10 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center text-green-400 mb-6 animate-bounce">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black font-rockwell text-white uppercase mb-3">Solicitação Recebida!</h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                      Nossa equipe comercial B2B entrará em contato em até 4 horas úteis via WhatsApp para agendar o envio do seu **Kit de Amostras Gratuitas**.
                    </p>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="text-[9px] font-space-premium font-bold tracking-widest text-[#ff003c] border border-[#ff003c]/20 hover:bg-[#ff003c]/10 px-6 py-2.5 rounded-xl mt-8 transition-colors uppercase"
                    >
                      Realizar nova simulação
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="text-[8px] font-space-premium font-black tracking-widest text-[#ff003c] uppercase block mb-2">
                      Fale com um Especialista
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white mb-5 pb-3 border-b border-white/10 flex items-center gap-2">
                      Solicitar Kit Amostras & Cotação
                    </h3>
                    
                    <form onSubmit={handleFormSubmit} className="space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="text-[8px] font-space-premium font-bold tracking-wider text-zinc-400 uppercase block mb-1">Nome de Contato</label>
                          <input
                            type="text"
                            required
                            placeholder="Ex: Marcus Chef"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-black border border-white/10 text-xs text-white rounded-lg p-2.5 outline-none focus:border-[#ff003c]/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] font-space-premium font-bold tracking-wider text-zinc-400 uppercase block mb-1">Razão Social / Hamburgueria</label>
                          <input
                            type="text"
                            required
                            placeholder="Ex: Burger King SP"
                            value={formData.businessName}
                            onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                            className="w-full bg-black border border-white/10 text-xs text-white rounded-lg p-2.5 outline-none focus:border-[#ff003c]/50 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="text-[8px] font-space-premium font-bold tracking-wider text-zinc-400 uppercase block mb-1">CNPJ (Opcional)</label>
                          <input
                            type="text"
                            placeholder="00.000.000/0000-00"
                            value={formData.cnpj}
                            onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
                            className="w-full bg-black border border-white/10 text-xs text-white rounded-lg p-2.5 outline-none focus:border-[#ff003c]/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] font-space-premium font-bold tracking-wider text-zinc-400 uppercase block mb-1">E-mail Corporativo</label>
                          <input
                            type="email"
                            required
                            placeholder="exemplo@empresa.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-black border border-white/10 text-xs text-white rounded-lg p-2.5 outline-none focus:border-[#ff003c]/50 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="text-[8px] font-space-premium font-bold tracking-wider text-zinc-400 uppercase block mb-1">Celular / WhatsApp</label>
                          <input
                            type="tel"
                            required
                            placeholder="(11) 99999-9999"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full bg-black border border-white/10 text-xs text-white rounded-lg p-2.5 outline-none focus:border-[#ff003c]/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] font-space-premium font-bold tracking-wider text-zinc-400 uppercase block mb-1">Cidade / Estado</label>
                          <input
                            type="text"
                            required
                            placeholder="Ex: São Paulo / SP"
                            value={formData.cityState}
                            onChange={(e) => setFormData({...formData, cityState: e.target.value})}
                            className="w-full bg-black border border-white/10 text-xs text-white rounded-lg p-2.5 outline-none focus:border-[#ff003c]/50 transition-colors"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 bg-[#ff003c] hover:bg-[#d90032] disabled:bg-zinc-800 text-white font-space-premium font-black text-[10px] tracking-[0.25em] uppercase rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-2 mt-4"
                      >
                        {submitting ? (
                          <>
                            <RefreshCw size={14} className="animate-spin" /> Processando...
                          </>
                        ) : (
                          <>
                            <Send size={12} /> Solicitar Cotação B2B
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
                
              </div>
            </div>
            
          </div>
        </section>

      </div>

      {/* Navigation Controls Left/Right footer bar */}
      <div className="absolute bottom-6 left-6 sm:left-12 z-40 flex items-center gap-4 bg-zinc-950/80 border border-white/10 rounded-full p-2 pr-6">
        <button
          onClick={prevSlide}
          disabled={activeSlide === 0}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/15 disabled:opacity-40 disabled:hover:bg-white/5 flex items-center justify-center transition-colors"
          aria-label="Voltar slide"
        >
          <ArrowLeft size={16} />
        </button>
        <button
          onClick={nextSlide}
          disabled={activeSlide === 6}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/15 disabled:opacity-40 disabled:hover:bg-white/5 flex items-center justify-center transition-colors"
          aria-label="Avançar slide"
        >
          <ArrowRight size={16} />
        </button>
        
        <span className="text-[10px] font-space-premium font-bold tracking-widest text-zinc-400">
          SLIDE {activeSlide + 1} DE 7
        </span>
      </div>
      
    </div>
  );
}
