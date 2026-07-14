import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronDown, 
  CheckCircle2, 
  Flame, 
  ShieldCheck, 
  Award,
  Compass,
  Check,
  UtensilsCrossed,
  ChefHat,
  Info,
  Clock,
  BookOpen,
  Users
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import DubolaHeader from '../components/DubolaHeader';
import DubolaFooter from '../components/DubolaFooter';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. DATABASE FOR "SELETOR DE FOME" (Hunger Selector Matrix)
const hungerMatrix = {
  carne: {
    title: "Cortes Bovinos Premium",
    subtitle: "A intensidade do calor extremo da brasa e o bronze selado na chapa de ferro",
    pairings: [
      { name: "Barbecue com Goiaba", badge: "Inovação Agridoce", reason: "O dulçor tropical e denso da goiaba equilibra perfeitamente o sal mineralizado da crosta selada do corte." },
      { name: "Mostarda Dijon", badge: "Patamar Europeu", reason: "Picância elegante, moagem de pedra clássica e distinção ácida sob medida para Anchos, Chorizos e Filets." },
      { name: "Barbecue Picante", badge: "Assinatura Pitmaster", reason: "Notas robustas de defumado em lenha de pecan e um final de boca apimentado ideal para costela na brasa." }
    ],
    recipe: {
      name: "Chorizo Angus Selado na Manteiga de Ervas com Mostarda Dijon Dubola",
      prepTime: "18 minutos",
      difficulty: "Alta Gastronomia",
      ingredients: [
        "1 bife de Chorizo Angus Premium (300g)",
        "3 colheres de sopa de Mostarda Dijon Dubola",
        "2 colheres de sopa de manteiga extra sem sal",
        "2 dentes de alho esmagados com casca",
        "Ramos de tomilho e alecrim frescos",
        "Flor de sal e pimenta-do-reino moída na hora"
      ],
      steps: [
        "Retire o corte de carne da refrigeração 15 minutos antes de grelhar para atingir temperatura ambiente.",
        "Aqueça muito bem uma frigideira pesada de ferro até quase fumegar. Adicione um fio de azeite e deite a carne.",
        "Deixe selar por 3 minutos sem mover, induzindo a Reação de Maillard perfeita. Vire e adicione a manteiga, alho e ervas.",
        "Incline a frigideira e, com uma colher, banhe a carne continuamente com a manteiga de ervas derretida (técnica arroseur).",
        "Retire o chorizo da panela e aguarde 3 minutos antes de fatiar para assentar os sucos térmicos celulares.",
        "Fatie e sirva sobre um espelho generoso de Mostarda Dijon Dubola, polvilhando flor de sal por cima."
      ],
      chefSecret: "A acidez nobre e a picância sutil da mostarda Dijon de moagem fina cortam a gordura untuosa da carne bovina, limpando as papilas gustativas a cada garfada e ressaltando as notas amendoadas da selagem na chapa."
    }
  },
  hamburguer: {
    title: "Burgers & Smashes Gourmet",
    subtitle: "A crosta de renda perfeita, a fusão do queijo nobre e o pão brioche selado",
    pairings: [
      { name: "Maionese Defumada", badge: "Alma de Brasa", reason: "Traz o sabor marcante de fumaça de macieira instantaneamente, mesmo para smashes feitos na chapa." },
      { name: "Barbecue Tradicional", badge: "Brilho Pitmaster", reason: "Molho brilhante, encorpado e caramelizado que envolve o cheddar derretido com maestria." },
      { name: "Maionese Tártaro", badge: "Frescor de Picles", reason: "A acidez cítrica refinada e a crocância dos picles nobres quebram o peso da gordura animal." }
    ],
    recipe: {
      name: "Double Smash Clássico com Maionese Defumada Dubola",
      prepTime: "12 minutos",
      difficulty: "Fácil & Preciso",
      ingredients: [
        "2 bolas de blend bovino fresco de costela e acém (80g cada, bem geladas)",
        "2 fatias de queijo cheddar inglês de alta fusão",
        "1 pão brioche amanteigado",
        "4 colheres de sopa de Maionese Defumada Dubola",
        "1 colher de sopa de manteiga de garrafa",
        "Sal de parrilla e pimenta preta moídos na hora"
      ],
      steps: [
        "Corte o pão brioche ao meio e toste as faces internas na manteiga até obter uma crosta impermeável.",
        "Aplique uma camada farta de Maionese Defumada Dubola em ambas as metades do brioche quente.",
        "Aqueça uma chapa ou frigideira de ferro em fogo máximo absoluto por 5 minutos até irradiar calor intenso.",
        "Deposite as bolas de carne geladas e, com uma prensa pesada, esmague-as até ficarem ultra finas.",
        "Tempere imediatamente com sal e pimenta. Deixe caramelizar por 90 segundos sem mover até obter as bordas rendadas escuras. Vire.",
        "Posicione o queijo cheddar sobre cada disco por 30 segundos, empilhe as carnes e feche no pão brioche."
      ],
      chefSecret: "A Maionese Defumada Dubola traz notas de fumaça de lenha natural que simulam com fidelidade a defumação passiva de churrasqueira, potencializando a Reação de Maillard da carne caramelizada sob o cheddar."
    }
  },
  frango: {
    title: "Frango Dourado & Asas Crocantes",
    subtitle: "Da delicadeza das aves grelhadas à crocância dos empanados finos",
    pairings: [
      { name: "Mostarda com Mel", badge: "Doçura Silvestre", reason: "A maciez do mel com a picância da mostarda eleva o sabor sutil do frango a outro patamar." },
      { name: "Maionese de Ervas", badge: "Notas Verdes", reason: "Combinação incrivelmente leve, herbal e refrescante para wraps frios e sanduíches naturais." },
      { name: "Ketchup Tradicional", badge: "Equilíbrio Ácido", reason: "O par ideal e indispensável para tiras de frango empanadas de forma ultra crocante." }
    ],
    recipe: {
      name: "Asinhas de Frango Crocantes na Panko com Mostarda e Mel Dubola",
      prepTime: "25 minutos",
      difficulty: "Fácil & Incrível",
      ingredients: [
        "500g de tulipas de asa de frango selecionadas",
        "1 xícara de Mostarda com Mel Dubola (para marinar e servir)",
        "1 xícara de farinha Panko de flocagem fina",
        "Sal marinho, páprica defumada e ervas de provence",
        "Fio de azeite extra virgem de oliva"
      ],
      steps: [
        "Tempere as tulipas de frango com sal, páprica, ervas e 2 colheres de sopa da Mostarda com Mel Dubola.",
        "Passe as tulipas marinadas pela farinha Panko, pressionando bem para assegurar uma cobertura homogênea.",
        "Organize as asinhas em uma assadeira untada com azeite ou na cesta da Air-Fryer a 200°C.",
        "Asse por 18 minutos, virando na metade do tempo para assegurar uma crosta dourada perfeita.",
        "Sirva imediatamente, bem crocantes, acompanhadas de um bowl de Mostarda com Mel Dubola gelada."
      ],
      chefSecret: "O mel de flores silvestres presente em nossa mostarda carameliza sutilmente sob o calor do cozimento, enquanto a acidez equilibrada da mostarda impede que o prato se torne excessivamente doce, limpando o paladar."
    }
  },
  peixe: {
    title: "Peixes & Frutos do Mar",
    subtitle: "A sutileza dos filés brancos, camarões na panko e as notas salinas do oceano",
    pairings: [
      { name: "Maionese Tártaro", badge: "Assinatura Litorânea", reason: "A joia dos pratos marinhos. Acidez cítrica de limão e picles nobres picadinhos que realçam o sabor do peixe." },
      { name: "Maionese de Azeitona", badge: "Alma Mediterrânea", reason: "Riqueza salina de azeitonas pretas nobres que agrega complexidade a filés brancos delicados." },
      { name: "Mostarda Tradicional", badge: "Toque Clássico", reason: "Adiciona uma picância sutil e rústica fantástica para frituras de peixes em postas e iscas." }
    ],
    recipe: {
      name: "Filé de Salmão ao Grelhado Unilateral com Molho Tártaro Dubola",
      prepTime: "20 minutos",
      difficulty: "Média & Sofisticada",
      ingredients: [
        "2 filés de salmão fresco com pele (200g cada)",
        "4 colheres de sopa de Maionese Tártaro Dubola",
        "1 colher de sopa de manteiga noisette",
        "Flor de sal e raspas de limão siciliano orgânico",
        "Fio de azeite extra virgem de oliva"
      ],
      steps: [
        "Seque perfeitamente a pele do salmão com papel toalha. Tempere a carne com flor de sal e pimenta branca.",
        "Aqueça o azeite em fogo alto. Coloque o salmão com a pele voltada para baixo. Pressione levemente por 30 segundos.",
        "Grelhe por 4 minutos sem mover para criar uma pele ultra crocante. Adicione a manteiga na frigideira.",
        "Com uma colher, banhe o topo do salmão continuamente com a manteiga derretida (técnica arroseur).",
        "Vire o peixe para selar a carne por meros 45 segundos e retire. Deixe descansar por 1 minuto na tábua.",
        "Sirva com uma quenelle escultural de Maionese Tártaro Dubola fria no topo, finalizando com raspas de limão."
      ],
      chefSecret: "O choque térmico do salmão quente saindo da frigideira com a Maionese Tártaro gelada ativa os aromas cítricos do molho, derretendo sutilmente a emulsão e soltando os óleos essenciais da cebola roxa e dos picles."
    }
  },
  massa: {
    title: "Massas, Wraps & Plant-Based",
    subtitle: "A rusticidade da trattoria italiana e a leveza vegetal contemporânea",
    pairings: [
      { name: "Alho-Poró e Ervas Finas", badge: "Atalho do Chef", reason: "O dulçor do alho-poró e o perfume herbal clássico que elevam massas simples em minutos." },
      { name: "Molho de Tomate Pedaços", badge: "Tradição Italiana", reason: "Pedaços generosos de tomates italianos pelati cozidos lentamente para o máximo de textura." },
      { name: "Maionese de Ervas", badge: "Leveza Refrescante", reason: "Combinação de manjericão, salsa e cebolete que envolve legumes assados e wraps frios." }
    ],
    recipe: {
      name: "Penne Rústico ao Molho de Tomate Alho-Poró e Ervas Finas Dubola",
      prepTime: "15 minutos",
      difficulty: "Fácil & Clássico",
      ingredients: [
        "200g de macarrão Penne de grano duro",
        "1 vidro de Molho de Tomate Alho-Poró e Ervas Finas Dubola",
        "2 colheres de sopa de azeite extra virgem",
        "Folhas frescas de manjericão gigante",
        "Queijo parmesão artesanal ralado na hora",
        "1 dente de alho picado milimetricamente"
      ],
      steps: [
        "Cozinhe o penne em água fervente abundante com sal até atingir o ponto ideal al dente.",
        "Enquanto a massa cozinha, aqueça o azeite em uma frigideira larga e refogue o alho picado por 30 segundos.",
        "Despeje o Molho de Tomate Alho-Poró e Ervas Finas Dubola e deixe apurar em fogo muito baixo por 3 minutos.",
        "Escorra a massa, lembrando de reservar meia concha da água rica em amido do cozimento.",
        "Jogue o penne diretamente na frigideira com o molho quente. Adicione a água reservada e misture energicamente.",
        "Mexa por 1 minuto para ligar e emulsionar. Sirva coroado de parmesão e folhas de manjericão fresco."
      ],
      chefSecret: "Nossos molhos de tomate são Clean Label de verdade: sem açúcares artificiais ou espessantes. Misturar a água de cozimento da massa ao molho Alho-Poró emulsiona o azeite de oliva e o tomate, gerando uma película aveludada incomparável."
    }
  }
};

export default function DubolaHomeView() {
  const [preloaderActive, setPreloaderActive] = useState(true);
  const [preloaderFade, setPreloaderFade] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Dynamic Selector State
  const [selectedProtein, setSelectedProtein] = useState('carne');
  const [recipeDrawerOpen, setRecipeDrawerOpen] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  
  // Refs
  const preloaderRef = useRef(null);
  const heroRef = useRef(null);
  const heroVideoRef = useRef(null);
  const heroTextRef = useRef(null);
  const ketchupVideoRef = useRef(null);
  const maioneseVideoRef = useRef(null);
  const pinnedSectionRef = useRef(null);
  const horizontalScrollRef = useRef(null);
  const b2bSectionRef = useRef(null);
  
  // Form Data
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    cnpj: '',
    email: '',
    interest: 'B2B'
  });
  const [activeInput, setActiveInput] = useState(null);

  // Dynamic Fonts Load
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&family=Syne:wght@700;800&family=Space+Grotesk:wght@500;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Preloader animation trigger
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setPreloaderFade(true);
        setTimeout(() => {
          setPreloaderActive(false);
          // Video is scroll-scrubbed — no autoplay needed
        }, 800);
      }
    });

    tl.fromTo('.preloader-letter', 
      { opacity: 0, y: 35, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.12, ease: 'power4.out' }
    )
    .to('.preloader-sub', 
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    )
    .to('.preloader-bar', 
      { scaleX: 1, duration: 1.2, ease: 'power2.inOut' },
      '-=0.6'
    )
    .to('.preloader-letter, .preloader-sub, .preloader-bar-wrap', 
      { opacity: 0, y: -25, duration: 0.5, stagger: 0.05, ease: 'power3.in' },
      '+=0.4'
    );

    return () => {
      tl.kill();
    };
  }, []);

  const animateHeroEntrance = () => {
    gsap.fromTo('.hero-fade-in',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.3, stagger: 0.18, ease: 'power4.out' }
    );
  };

  // Lenis & ScrollTrigger Horizontal scroll
  useEffect(() => {
    if (preloaderActive) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const gsapTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(gsapTicker);
    gsap.ticker.lagSmoothing(0);

    // ── HERO: PINNED VIDEO SCRUB ──────────────────────────────────────────────
    const video = heroVideoRef.current;
    let heroScrubTl = null;
    let heroTextScrub = null;

    const initHeroScrub = () => {
      const duration = video.duration || 6;

      // Main pinned timeline — scrubs video currentTime
      heroScrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 2.5}`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        }
      });

      // 1. Scrub video forward
      heroScrubTl.fromTo(
        video,
        { currentTime: 0 },
        { currentTime: duration, ease: 'none' },
        0
      );

      // 2. Text fades in towards the end of the scroll (starting at 55%)
      heroScrubTl.fromTo(
        '.hero-fade-in',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, stagger: 0.06, ease: 'power3.out', duration: 0.13 },
        0.55
      );

      // Fade in the dark gradient overlays to make the text legible
      heroScrubTl.to(
        '.hero-gradient',
        { opacity: 1, duration: 0.18, ease: 'power3.out' },
        0.55
      );
    };

    if (video) {
      video.addEventListener('loadedmetadata', initHeroScrub);
      if (video.readyState >= 1) initHeroScrub();
    }

    // Horizontal Scroll Trigger for 5 Categories
    let mm = gsap.matchMedia(pinnedSectionRef);
    
    mm.add("(min-width: 768px)", () => {
      const panels = gsap.utils.toArray('.horizontal-panel');
      
      const scrollTween = gsap.to(horizontalScrollRef.current, {
        x: () => -(horizontalScrollRef.current.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: pinnedSectionRef.current,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: () => `+=${horizontalScrollRef.current.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
      });

      // Entrance animation stagger on slides content and Video Play Triggers
      panels.forEach((panel, i) => {
        const video = panel.querySelector('video');
        if (video) {
          ScrollTrigger.create({
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left center",
            end: "right center",
            onEnter: () => { video.currentTime = 0; video.play().catch(()=>{}); },
            onLeave: () => video.pause(),
            onEnterBack: () => { video.currentTime = 0; video.play().catch(()=>{}); },
            onLeaveBack: () => video.pause(),
          });
        }

        if (i === 0) return;
        const contentWrap = panel.querySelector('.panel-content-wrap');
        if (contentWrap) {
          gsap.fromTo(contentWrap,
            { opacity: 0, x: 120 },
            {
              opacity: 1,
              x: 0,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left 85%",
                end: "center center",
                scrub: true,
              }
            }
          );
        }
      });
    });

    mm.add("(max-width: 767px)", () => {
      const panels = gsap.utils.toArray('.horizontal-panel');
      
      panels.forEach((panel, i) => {
        const video = panel.querySelector('video');
        if (video) {
          ScrollTrigger.create({
            trigger: panel,
            start: "top center",
            end: "bottom center",
            onEnter: () => { video.currentTime = 0; video.play().catch(()=>{}); },
            onLeave: () => video.pause(),
            onEnterBack: () => { video.currentTime = 0; video.play().catch(()=>{}); },
            onLeaveBack: () => video.pause(),
          });
        }

        if (i === 0) return;
        const contentWrap = panel.querySelector('.panel-content-wrap');
        if (contentWrap) {
          gsap.fromTo(contentWrap,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                start: "top 85%",
                end: "center center",
                scrub: true,
              }
            }
          );
        }
      });
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(gsapTicker);
      if (heroScrubTl) heroScrubTl.kill();
      mm.revert();
    };
  }, [preloaderActive]);

  // Magnetic CTAs Hover micro-interaction
  const handleMagneticMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      scale: 1.04,
      duration: 0.35,
      ease: 'power2.out'
    });

    const text = btn.querySelector('.btn-text');
    if (text) {
      gsap.to(text, {
        x: x * 0.15,
        y: y * 0.15,
        duration: 0.35,
        ease: 'power2.out'
      });
    }
  };

  const handleMagneticLeave = (e) => {
    const btn = e.currentTarget;
    gsap.to(btn, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'elastic.out(1.1, 0.4)'
    });
    
    const text = btn.querySelector('.btn-text');
    if (text) {
      gsap.to(text, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1.1, 0.4)'
      });
    }
  };

  // 3D Parallax Mousemove on product images
  const handleProductTilt = (e) => {
    const wrapper = e.currentTarget;
    const rect = wrapper.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    wrapper.style.setProperty('--rx', `${y * 22}deg`);
    wrapper.style.setProperty('--ry', `${-x * 22}deg`);
    wrapper.style.setProperty('--tx', `${x * 18}px`);
    wrapper.style.setProperty('--ty', `${y * 18}px`);
  };

  const handleProductTiltReset = (e) => {
    const wrapper = e.currentTarget;
    wrapper.style.setProperty('--rx', '0deg');
    wrapper.style.setProperty('--ry', '0deg');
    wrapper.style.setProperty('--tx', '0px');
    wrapper.style.setProperty('--ty', '0px');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.cnpj) return;
    setFormSubmitted(true);
  };

  // Toggle checklist ingredients
  const toggleIngredientCheck = (ingName) => {
    if (checkedIngredients.includes(ingName)) {
      setCheckedIngredients(checkedIngredients.filter(item => item !== ingName));
    } else {
      setCheckedIngredients([...checkedIngredients, ingName]);
    }
  };

  const currentSelectionData = hungerMatrix[selectedProtein];

  return (
    <div className="relative w-full bg-black text-[#f4f4f5] overflow-x-hidden font-sans selection:bg-[#ff003c]/30 selection:text-white">
      
      {/* Premium Variables and Styles Injection */}
      <style dangerouslySetInnerHTML={{__html: `
        @font-face {
          font-family: 'Bebas Neue';
          src: url('/fonts/BebasNeue-Regular.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
        
        :root {
          --font-outfit: 'Outfit', sans-serif;
          --font-bebas: 'Bebas Neue', sans-serif;
          --font-space: 'Space Grotesk', sans-serif;
        }
        
        .font-display {
          font-family: var(--font-bebas), sans-serif;
          letter-spacing: 0.04em;
        }
        
        .font-sans-premium {
          font-family: var(--font-outfit), sans-serif;
        }

        .font-space-premium {
          font-family: var(--font-space), sans-serif;
        }

        .glass-premium {
          background: rgba(10, 10, 10, 0.65);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .glass-premium-hover:hover {
          background: rgba(16, 16, 16, 0.85);
          border-color: rgba(255, 0, 60, 0.2);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(255, 0, 60, 0.06);
        }

        .btn-magnetic {
          position: relative;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        
        .btn-magnetic::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: inherit;
          background: radial-gradient(circle, rgba(255,0,60,0.3) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
          z-index: -1;
        }
        
        .btn-magnetic:hover::after {
          opacity: 1;
        }

        .tilt-wrapper {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        .floating-bottle {
          transform: translate3d(var(--tx, 0px), var(--ty, 0px), 60px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
          transition: transform 0.15s cubic-bezier(0.25, 1, 0.5, 1);
          filter: drop-shadow(0 25px 40px rgba(0, 0, 0, 0.75));
        }

        .floating-shadow {
          transform: translate3d(calc(var(--tx, 0px) * 0.4), calc(var(--ty, 0px) * 0.4), -15px) scale(0.92);
          transition: transform 0.15s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .form-input-wrap {
          position: relative;
          border-bottom: 1.5px solid #27272a;
          transition: border-color 0.4s ease;
        }
        
        .form-input-wrap.active {
          border-color: #ff003c;
        }

        .form-label {
          position: absolute;
          left: 0;
          top: 12px;
          font-size: 13px;
          color: #a1a1aa;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .form-input-wrap.filled .form-label,
        .form-input-wrap.active .form-label {
          top: -12px;
          font-size: 11px;
          color: #ff003c;
          font-weight: 700;
        }

        /* Customized scroll bar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #000;
        }
        ::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #ff003c;
        }

        /* Animated red gradient */
        .gradient-text-red {
          background: linear-gradient(135deg, #ffffff 40%, #ff003c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Animated gold gradient */
        .gradient-text-gold {
          background: linear-gradient(135deg, #ffffff 40%, #eab308 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        /* Slow pulsing logo glow */
        @keyframes subtle-glow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(255,0,0,0.1)); }
          50% { filter: drop-shadow(0 0 25px rgba(255,0,60,0.25)); }
        }
        .logo-glow {
          animation: subtle-glow 5s infinite ease-in-out;
        }
      `}} />

      {/* 1. THE PRELOADER */}
      {preloaderActive && (
        <div 
          ref={preloaderRef}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-700 ease-in-out ${
            preloaderFade ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Subtle grid backdrop */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          
          <div className="text-center z-10 space-y-4">
            {/* Elegant letter reveal */}
            <div className="flex justify-center space-x-3 overflow-hidden py-4">
              {['D', 'U', 'B', 'O', 'L', 'A'].map((letter, i) => (
                <span 
                  key={i}
                  className="preloader-letter font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-wider text-white select-none inline-block"
                >
                  {letter}
                </span>
              ))}
            </div>
            
            <p className="preloader-sub opacity-0 text-[10px] sm:text-xs font-space-premium tracking-[0.4em] uppercase text-[#ff003c] font-bold">
              Molhos & Condimentos Especiais
            </p>
            
            <div className="preloader-bar-wrap w-48 sm:w-64 h-[1.5px] bg-zinc-900 mx-auto rounded-full overflow-hidden relative mt-4">
              <div className="preloader-bar absolute left-0 top-0 h-full w-full bg-[#ff003c] origin-left scale-x-0"></div>
            </div>
          </div>
        </div>
      )}

      {/* FIXED IMMERSIVE HEADER */}
      <DubolaHeader />

      {/* 2. HERO SECTION */}
      <section 
        id="hero-welcome"
        ref={heroRef}
        className="relative w-full h-screen flex flex-col justify-center items-center px-6 overflow-hidden bg-black"
      >
        {/* Shadow overlays */}
        <div className="hero-gradient absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/70 z-10 pointer-events-none opacity-0"></div>
        <div className="hero-gradient absolute inset-0 bg-radial-gradient(circle_at_center, transparent 20%, rgba(0,0,0,0.9) 100%) z-10 pointer-events-none opacity-0"></div>
        
        {/* Hero video — currentTime controlled by GSAP scroll scrub */}
        <video 
          ref={heroVideoRef}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          muted
          playsInline
          preload="auto"
          src="/hero-ketchup.mp4"
        />

        {/* Ambient grid overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:30px_30px] z-10 pointer-events-none"></div>

        {/* Centered Typography & Content */}
        <div 
          ref={heroTextRef}
          className="relative max-w-5xl text-center z-20 space-y-8 px-4"
        >
          <div className="hero-fade-in hero-badge-el opacity-0 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-1.5 rounded-full">
              <Flame size={12} className="text-[#ff003c]" />
              <span className="text-[9px] font-space-premium font-bold tracking-[0.25em] uppercase text-zinc-300">
                A MATÉRIA-PRIMA INQUEBRÁVEL QUE DEFINE O PADRÃO DOS GRANDES CHEFS
              </span>
            </div>
          </div>

          <h1 className="hero-fade-in hero-title-el opacity-0 font-display text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-white uppercase leading-[0.95]">
            O RIGOR DO FOGO. <br className="hidden sm:inline" />
            A LUXÚRIA DO <span className="gradient-text-red">SABOR ABSOLUTO.</span>
          </h1>

          <p className="hero-fade-in hero-sub-el opacity-0 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-zinc-400 font-sans-premium leading-relaxed">
            Nascida no calor brutal das brasas e refinada pela precisão cirúrgica da culinária autoral. Fundimos técnica ancestral com a pureza visceral de ingredientes frescos para esculpir condimentos que não apenas acompanham, mas consagram e coroam o seu paladar.
          </p>

          {/* CTAs with Magnetic micro-interaction */}
          <div className="hero-fade-in hero-cta-el opacity-0 flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 w-full max-w-md mx-auto sm:max-w-none">
            <Link 
              to="/ketchups"
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              className="btn-magnetic w-full sm:w-auto bg-[#ff003c] text-white px-10 py-5 rounded-2xl font-space-premium font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(255,0,60,0.35)] transition-all"
            >
              <span className="btn-text inline-block">CONHECER OS KETCHUPS</span>
              <ArrowRight size={13} />
            </Link>

            <Link 
              to="/linha-dubola"
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              className="btn-magnetic w-full sm:w-auto border border-white/15 hover:border-white/30 bg-[#18181b]/60 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-space-premium font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
            >
              <span className="btn-text inline-block">LINHA COMPLETA</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Floating Indicator */}
        <div className="absolute bottom-10 z-20 animate-bounce flex flex-col items-center opacity-70">
          <span className="text-[9px] font-space-premium font-bold tracking-[0.3em] uppercase text-zinc-500 mb-2">SCROLL PARA EXPLORAR</span>
          <ChevronDown size={14} className="text-[#ff003c]" />
        </div>
      </section>

      {/* 3. PRODUCT SHOWCASE (GSAP HORIZONTAL PINNED SECTION) */}
      <section 
        ref={pinnedSectionRef}
        className="relative bg-zinc-950 overflow-hidden min-h-screen md:h-screen w-full flex items-center"
      >
        {/* Horizontal Container encompassing 5 core product lines */}
        <div 
          ref={horizontalScrollRef}
          className="flex flex-col md:flex-row w-full h-full md:w-[500vw] shrink-0"
        >
          
          {/* PANEL 1: KETCHUPS */}
          <div className="horizontal-panel w-full md:w-[100vw] min-h-screen md:h-screen shrink-0 flex items-center justify-center px-6 sm:px-12 md:px-24 relative overflow-hidden bg-black border-r border-white/[0.02]">
            <video 
              ref={ketchupVideoRef}
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
              src="/plano-de-fundo-ketchup.mp4"
            />

            {/* Gradient for text legibility — left side only */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent z-[1] pointer-events-none" />

            {/* Subtle watermark */}
            <span className="absolute -bottom-10 -right-20 font-display font-black text-[22vw] text-white/[0.015] select-none leading-none tracking-tighter z-[1]">KETCHUP</span>

            {/* Panel number + label */}
            <div className="absolute top-24 md:top-28 left-8 md:left-24 flex items-center gap-3 z-20">
              <span className="text-[#ff003c] font-display font-black text-3xl leading-none">01</span>
              <div className="w-px h-6 bg-white/15" />
              <span className="text-[9px] font-space-premium font-bold tracking-widest uppercase text-white/60">Linha Ketchups</span>
            </div>

            {/* SKU chips — top right */}
            <div className="absolute top-24 md:top-28 right-8 md:right-24 flex flex-wrap gap-2 z-20 justify-end">
              {['Tradicional', 'Picante', 'com Goiaba'].map((sku) => (
                <Link key={sku} to="/ketchups"
                  className="text-[9px] font-space-premium font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-[#ff003c]/40 bg-black/40 backdrop-blur-sm text-[#ff003c] hover:bg-[#ff003c]/20 transition-colors">
                  {sku}
                </Link>
              ))}
            </div>

            <div className="panel-content-wrap max-w-7xl mx-auto w-full flex flex-col justify-between h-full relative z-10 py-32 md:py-32 md:pb-16 pl-0 md:pl-8">
              
              {/* TOP LEFT: Headline */}
              <div className="w-full mt-12 md:mt-0">
                <h2 className="font-rockwell text-6xl sm:text-7xl md:text-[8.5rem] uppercase text-white leading-[0.8] tracking-tighter drop-shadow-2xl">
                  O<br />
                  TOMATE<br />
                  NO SEU<br />
                  ESTADO<br />
                  MAIS PURO.
                </h2>
              </div>

              {/* BOTTOM LEFT: Trio and Copy */}
              <div className="w-full flex flex-col md:flex-row md:items-end gap-6 md:gap-10 mt-auto pt-8">
                <img 
                  src="/trio-ketchups-novo.png" 
                  alt="Trio de Ketchups Dubola" 
                  className="w-[220px] md:w-[320px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] z-20 -ml-4 md:-ml-8"
                />
                <div className="flex flex-col gap-4 pb-4 md:pb-12">
                  <p className="text-white font-carbon uppercase text-xs md:text-sm leading-relaxed md:leading-[1.4] max-w-2xl drop-shadow-md tracking-wider">
                    TOMATES COLHIDOS NO PICO DA MATURAÇÃO,<br className="hidden md:block"/>
                    APURADOS NO FOGO LENTAMENTE.<br className="hidden md:block"/>
                    ZERO ADITIVOS, ZERO CONCESSÕES.<br className="hidden md:block"/>
                    APENAS A CONCENTRAÇÃO MÁXIMA DO SABOR EM CADA FRASCO.
                  </p>
                  <div className="flex flex-wrap items-center gap-6 md:gap-12 font-cheddar uppercase text-white text-sm md:text-lg tracking-widest mt-2">
                    <span className="hover:text-red-500 transition-colors cursor-pointer">TRADICIONAL</span>
                    <span className="hover:text-red-500 transition-colors cursor-pointer">COM GOIABA</span>
                    <span className="hover:text-red-500 transition-colors cursor-pointer">PICANTE</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Scroll nudge */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 opacity-50">
              <span className="text-[8px] font-space-premium tracking-widest text-white/50 uppercase">Próxima linha</span>
              <ArrowRight size={12} className="text-white/40 rotate-90" />
            </div>
          </div>

          {/* PANEL 2: MAIONESES */}
          <div className="horizontal-panel w-full md:w-[100vw] min-h-screen md:h-screen shrink-0 flex items-center justify-center px-6 sm:px-12 md:px-24 relative overflow-hidden bg-black border-r border-white/[0.02]">

            {/* Video background */}
            <video
              ref={maioneseVideoRef}
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
              src="/maioneses-hero.mp4"
            />

            {/* Gradient overlays removed per request for a cleaner look */}

            {/* Giant watermark */}
            <span className="absolute -bottom-10 -right-20 font-display font-black text-[22vw] text-white/[0.015] select-none leading-none tracking-tighter z-[1]">MAYO</span>

            {/* Panel number + label */}
            <div className="absolute top-24 md:top-28 left-8 md:left-24 flex items-center gap-3 z-20">
              <span className="text-yellow-400 font-display font-black text-3xl leading-none">02</span>
              <div className="w-px h-6 bg-white/15" />
              <span className="text-[9px] font-space-premium font-bold tracking-widest uppercase text-white/50">Linha Maioneses</span>
            </div>

            {/* SKU chips — top right, quick nav */}
            <div className="absolute top-24 md:top-28 right-8 md:right-24 hidden md:flex flex-wrap gap-1.5 z-20 justify-end max-w-[420px]">
              {[
                { label: 'Tradicional', id: 'maionese-tradicional' },
                { label: 'Tártaro', id: 'maionese-tartaro' },
                { label: 'Defumada', id: 'maionese-defumada' },
                { label: 'Azeitona', id: 'maionese-azeitona' },
                { label: 'Ervas', id: 'maionese-ervas' },
                { label: 'Alho', id: 'maionese-alho' },
                { label: 'Limão Siciliano', id: 'maionese-limao' }
              ].map((sku) => (
                <Link key={sku.id} to={sku.id === 'maionese-tartaro' ? '/dubola' : `/produto/${sku.id}`}
                  className="text-[8px] font-space-premium font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border border-yellow-400/25 bg-black/50 backdrop-blur-sm text-yellow-300/70 hover:text-yellow-300 hover:border-yellow-400/50 hover:bg-yellow-400/10 transition-all">
                  {sku.label}
                </Link>
              ))}
            </div>

            {/* Main content */}
            <div className="panel-content-wrap max-w-7xl mx-auto w-full flex flex-col justify-center relative z-10 py-20 md:py-0">

              <div className="max-w-3xl space-y-8 text-left">

                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 rounded-full text-white">
                  <Award size={11} />
                  <span className="text-[10px] font-space-premium font-bold tracking-widest uppercase">7 Sabores · Emulsão Artesanal · B2C &amp; Food Service</span>
                </div>

                {/* Headline */}
                <div className="space-y-1">
                  <h2 className="font-display text-4xl sm:text-5xl md:text-[5.5rem] font-black uppercase text-white leading-[0.85] drop-shadow-2xl">
                    A MAIONESE QUE
                  </h2>
                  <h2 className="font-display text-4xl sm:text-5xl md:text-[5.5rem] font-black uppercase leading-[0.85] text-yellow-400 drop-shadow-2xl">
                    ELEVA QUALQUER PRATO.
                  </h2>
                </div>

                {/* Body copy */}
                <p className="text-white font-carbon uppercase text-xs md:text-sm leading-relaxed md:leading-[1.5] max-w-2xl drop-shadow-lg tracking-wider">
                  OVOS FRESCOS SELECIONADOS, EMULSÃO LENTA E ZERO ESTABILIZANTES ARTIFICIAIS. CADA FRASCO É O RESULTADO DE UMA OBSESSÃO PELA TEXTURA PERFEITA — DENSA, SEDOSA, COM PERSONALIDADE PRÓPRIA.
                </p>

                {/* Flavors List */}
                <div className="flex flex-wrap items-center gap-4 md:gap-8 font-cheddar uppercase text-white text-sm md:text-lg tracking-widest mt-4 drop-shadow-md">
                  <span className="hover:text-yellow-400 transition-colors cursor-pointer">TRADICIONAL</span>
                  <span className="hover:text-yellow-400 transition-colors cursor-pointer">TÁRTARO</span>
                  <span className="hover:text-yellow-400 transition-colors cursor-pointer">DEFUMADA</span>
                  <span className="hover:text-yellow-400 transition-colors cursor-pointer">AZEITONA</span>
                  <span className="hover:text-yellow-400 transition-colors cursor-pointer">ERVAS</span>
                  <span className="hover:text-yellow-400 transition-colors cursor-pointer">ALHO</span>
                  <span className="hover:text-yellow-400 transition-colors cursor-pointer">LIMÃO SICILIANO</span>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-6 pt-6">
                  <Link
                    to="/dubola"
                    className="inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-black font-space-premium font-black text-[11px] tracking-widest uppercase px-8 py-4 rounded-full transition-all hover:scale-[1.02] shadow-xl"
                  >
                    <span>VER TODAS AS MAIONESES</span>
                    <ArrowRight size={13} />
                  </Link>
                  <a
                    href="#breakout-b2b"
                    className="inline-flex items-center gap-2 text-[11px] font-space-premium font-bold tracking-widest uppercase text-white hover:text-yellow-400 transition-colors drop-shadow-md"
                  >
                    <Users size={12} />
                    <span>Food Service &amp; B2B</span>
                  </a>
                </div>

              </div>
            </div>

            {/* Scroll nudge */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 opacity-40">
              <span className="text-[8px] font-space-premium tracking-widest text-white/50 uppercase">Próxima linha</span>
              <ArrowRight size={12} className="text-white/40 rotate-90" />
            </div>
          </div>

          {/* PANEL 3: BARBECUES */}

          <div className="horizontal-panel w-full md:w-[100vw] min-h-screen md:h-screen shrink-0 flex items-center justify-center px-6 sm:px-12 md:px-24 relative overflow-hidden bg-gradient-to-br from-[#0c0303] via-zinc-950 to-black border-r border-white/[0.02]">
            {/* Video de plano de fundo do Painel 3 */}
            <div className="absolute inset-0 z-0">
              <video 
                className="w-full h-full object-cover opacity-40"
                src="/barbecue-premium-hero.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-black/85 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />
            </div>

            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/sementes-de-pimenta-preta-isoladas.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <span className="absolute -bottom-10 -right-20 font-display font-black text-[22vw] text-white/[0.01] select-none leading-none tracking-tighter">SMOKE</span>

            <div className="absolute top-24 md:top-28 left-8 md:left-24 flex items-center gap-3 z-20">
              <span className="text-red-500 font-display font-black text-3xl leading-none">03</span>
              <div className="w-px h-6 bg-white/10" />
              <span className="text-[9px] font-space-premium font-bold tracking-widest uppercase text-zinc-500">Linha Barbecues</span>
            </div>

            <div className="absolute top-24 md:top-28 right-8 md:right-24 flex flex-wrap gap-2 z-20 justify-end">
              {[
                { label: 'Tradicional', id: 'barbecue-tradicional' },
                { label: 'Picante', id: 'barbecue-picante' },
                { label: 'com Goiaba', id: 'barbecue-goiaba' },
              ].map((sku) => (
                <Link key={sku.id} to={`/produto/${sku.id}`}
                  className="text-[9px] font-space-premium font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                  {sku.label}
                </Link>
              ))}
            </div>

            <div className="panel-content-wrap max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center relative z-10 py-16 md:py-0">
              
              <div className="md:col-span-6 space-y-6 text-left order-2 md:order-1">
                <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/20 px-4 py-1.5 rounded-full text-red-400">
                  <Flame size={12} />
                  <span className="text-[10px] font-space-premium font-bold tracking-widest uppercase">3 Sabores • Defumação Real de Lenha Dura</span>
                </div>
                
                <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-black uppercase text-white leading-[0.95]">
                  FUMAÇA, BRASA<br />
                  <span className="gradient-text-red">E CARAMELO ESCURO.</span>
                </h2>
                
                <p className="text-zinc-400 font-sans-premium text-sm sm:text-base leading-relaxed">
                  A captura engarrafada da combustão perfeita. Uma laca densa, brilhante e profunda que sela e eleva qualquer proteína. O <strong className="text-white">Tradicional</strong> com caramelo amadeirado ideal para brisket e costelas, o <strong className="text-white">Picante com Pimenta Defumada</strong> que entrega ardência progressiva, e o <strong className="text-white">Barbecue com Goiaba</strong> — doçura tropical que transforma asas de frango em obra de arte.
                </p>

                <div className="p-4 border-l-2 border-[#ff003c] bg-white/[0.02] rounded-r-xl">
                  <p className="text-xs text-zinc-400 italic font-sans-premium">
                    "Laca de brasa, caramelo escuro e fumaça que gruda na memória. O Barbecue Dubola não acompanha a carne — ele a finaliza."
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
                  {['Tradicional', 'Picante', 'Goiaba'].map((v) => (
                    <div key={v} className="text-center">
                      <div className="w-2 h-2 rounded-full bg-red-500 mx-auto mb-1.5" />
                      <span className="text-[10px] font-space-premium font-bold text-zinc-400 uppercase tracking-wider">{v}</span>
                    </div>
                  ))}
                </div>

                <Link to="/barbecue" className="inline-flex items-center gap-3 text-xs font-space-premium font-bold tracking-widest text-red-400 hover:text-white transition-colors">
                  <span>SENTIR A DEFUMAÇÃO</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className="md:col-span-6 flex justify-center items-center order-1 md:order-2">
                <Link to="/produto/barbecue-tradicional"
                  onMouseMove={handleProductTilt}
                  onMouseLeave={handleProductTiltReset}
                  className="tilt-wrapper block relative w-full max-w-[460px] aspect-[4/5] flex items-center justify-center cursor-pointer group"
                >
                  <div className="absolute w-[280px] h-[280px] rounded-full blur-[70px] bg-red-600/10 group-hover:bg-red-600/25 transition-colors duration-500 z-0"></div>
                  <div className="floating-shadow absolute bottom-12 w-56 h-8 bg-black/60 rounded-full blur-md z-10"></div>
                  <img 
                    className="floating-bottle w-full max-h-[460px] object-contain z-20 pointer-events-none drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:scale-105"
                    src="/trio-barbecue.png"
                    alt="Barbecue Dubola"
                    onError={(e) => { e.target.src = '/linha-barbecue.png'; }}
                  />
                  <div className="absolute bottom-10 left-6 opacity-90 z-30">
                    <span className="text-[9px] text-white font-space-premium font-bold border border-red-500/40 rounded-full px-3 py-1 bg-red-500/20">Pitmaster Choice</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* PANEL 4: MOSTARDAS */}
          <div className="horizontal-panel w-full md:w-[100vw] min-h-screen md:h-screen shrink-0 flex items-center justify-center px-6 sm:px-12 md:px-24 relative overflow-hidden bg-gradient-to-br from-[#0c0a03] via-zinc-950 to-black border-r border-white/[0.02]">
            <span className="absolute -bottom-10 -right-20 font-display font-black text-[22vw] text-white/[0.01] select-none leading-none tracking-tighter">MUSTARD</span>

            <div className="absolute top-24 md:top-28 left-8 md:left-24 flex items-center gap-3 z-20">
              <span className="text-yellow-400 font-display font-black text-3xl leading-none">04</span>
              <div className="w-px h-6 bg-white/10" />
              <span className="text-[9px] font-space-premium font-bold tracking-widest uppercase text-zinc-500">Linha Mostardas</span>
            </div>

            <div className="absolute top-24 md:top-28 right-8 md:right-24 flex flex-wrap gap-2 z-20 justify-end">
              {[
                { label: 'Tradicional', id: 'mostarda-tradicional' },
                { label: 'Dijon', id: 'mostarda-dijon' },
                { label: 'com Mel', id: 'mostarda-mel' },
              ].map((sku) => (
                <Link key={sku.id} to={`/produto/${sku.id}`}
                  className="text-[9px] font-space-premium font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-colors">
                  {sku.label}
                </Link>
              ))}
            </div>

            <div className="panel-content-wrap max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center relative z-10 py-16 md:py-0">
              
              <div className="md:col-span-6 space-y-6 text-left order-2 md:order-1">
                <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-4 py-1.5 rounded-full text-yellow-400">
                  <Compass size={12} />
                  <span className="text-[10px] font-space-premium font-bold tracking-widest uppercase">3 Sabores • Moagem Rústica de Grão Inteiro</span>
                </div>
                
                <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-black uppercase text-white leading-[0.95]">
                  A PICÂNCIA QUE<br />
                  <span className="gradient-text-gold">DESPERTA O PALADAR.</span>
                </h2>
                
                <p className="text-zinc-400 font-sans-premium text-sm sm:text-base leading-relaxed">
                  Não é tempero, é arquitetura de sabor. A <strong className="text-white">Tradicional de Grão Inteiro</strong> com textura rústica que crocanta nos pães e cortes fatiados. A <strong className="text-white">Mostarda com Mel de Flores Silvestres</strong> que equilibra o ardor com doçura floral — par perfeito para frango empanado e queijos. E o rigor europeu da <strong className="text-white">Dijon</strong> — acidez aristocrática inspirada na moagem a frio de Borgonha.
                </p>

                <div className="glass-premium p-5 rounded-2xl border-l-2 border-yellow-500 flex items-start gap-4">
                  <Award size={18} className="text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-space-premium font-bold text-white uppercase tracking-widest">Dijon — O Refinamento Europeu</h4>
                    <p className="text-[11px] text-zinc-400 mt-1">Acidez limpa, persistente e elegante. Eleva medalhões, gratinados, molhos beurre blanc e qualquer corte bovino que mereça o toque da cozinha clássica francesa.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
                  {['Tradicional', 'Dijon', 'com Mel'].map((v) => (
                    <div key={v} className="text-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mx-auto mb-1.5" />
                      <span className="text-[10px] font-space-premium font-bold text-zinc-400 uppercase tracking-wider">{v}</span>
                    </div>
                  ))}
                </div>

                <Link to="/mostardas" className="inline-flex items-center gap-3 text-xs font-space-premium font-bold tracking-widest text-yellow-400 hover:text-white transition-colors">
                  <span>CONHECER AS MOSTARDAS</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className="md:col-span-6 flex justify-center items-center order-1 md:order-2">
                <Link to="/produto/mostarda-dijon"
                  onMouseMove={handleProductTilt}
                  onMouseLeave={handleProductTiltReset}
                  className="tilt-wrapper block relative w-full max-w-[460px] aspect-[4/5] flex items-center justify-center cursor-pointer group"
                >
                  <div className="absolute w-[280px] h-[280px] rounded-full blur-[70px] bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-colors duration-500 z-0"></div>
                  <div className="floating-shadow absolute bottom-12 w-56 h-8 bg-black/60 rounded-full blur-md z-10"></div>
                  <img 
                    className="floating-bottle w-full max-h-[460px] object-contain z-20 pointer-events-none"
                    src="/ketchup-tradicional.jpg"
                    alt="Mostarda Dijon Dubola"
                    onError={(e) => { e.target.src = '/pickles-doces-de-pepino-frescos-isolados.png'; }}
                  />
                  <div className="absolute top-10 left-6 opacity-90 z-30">
                    <span className="text-[9px] text-white font-space-premium font-bold border border-yellow-400/40 rounded-full px-3 py-1 bg-yellow-400/15">Dijon Premium</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* PANEL 5: MOLHOS DE TOMATE */}
          <div className="horizontal-panel w-full md:w-[100vw] min-h-screen md:h-screen shrink-0 flex items-center justify-center px-6 sm:px-12 md:px-24 relative overflow-hidden bg-gradient-to-br from-[#030604] via-zinc-950 to-black">
            <div className="absolute inset-0 bg-cover bg-center opacity-[0.02] select-none pointer-events-none" style={{ backgroundImage: "url('/dynamic-red-onion-slices-falling-white.png')" }}></div>
            <span className="absolute -bottom-10 -right-20 font-display font-black text-[22vw] text-white/[0.01] select-none leading-none tracking-tighter">TOMATO</span>

            <div className="absolute top-24 md:top-28 left-8 md:left-24 flex items-center gap-3 z-20">
              <span className="text-emerald-400 font-display font-black text-3xl leading-none">05</span>
              <div className="w-px h-6 bg-white/10" />
              <span className="text-[9px] font-space-premium font-bold tracking-widest uppercase text-zinc-500">Linha Molhos de Tomate</span>
            </div>

            <div className="absolute top-24 md:top-28 right-8 md:right-24 flex flex-wrap gap-2 z-20 justify-end">
              {[
                { label: 'Tradicional', id: 'tomate-tradicional' },
                { label: 'com Pedaços', id: 'tomate-pedacos' },
                { label: 'Alho-Poró & Ervas', id: 'tomate-alho-poro' },
              ].map((sku) => (
                <Link key={sku.id} to={`/produto/${sku.id}`}
                  className="text-[9px] font-space-premium font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                  {sku.label}
                </Link>
              ))}
            </div>

            <div className="panel-content-wrap max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center relative z-10 py-16 md:py-0">
              
              <div className="md:col-span-6 space-y-6 text-left order-2 md:order-1">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-emerald-500">
                  <Compass size={12} />
                  <span className="text-[10px] font-space-premium font-bold tracking-widest uppercase">3 Sabores • Clean Label Absoluto • Cozimento Lento</span>
                </div>
                
                <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-black uppercase text-white leading-[0.95]">
                  O RIGOR SAGRADO<br />
                  <span className="text-emerald-500">DO TOMATE ITALIANO REAL</span>
                </h2>
                
                <p className="text-zinc-400 font-sans-premium text-sm sm:text-base leading-relaxed">
                  A fragrância de trattoria italiana no domingo que não se esquece. Tomates pelati maduros apurados pacientemente com azeite extra virgem, folhas frescas de manjericão gigante e absolutamente zero conservantes ou espessantes. O <strong className="text-white">Tradicional</strong> de alma purista, o <strong className="text-white">com Pedaços</strong> rústico que oferece textura e presença no prato, e o <strong className="text-white">Alho-Poró e Ervas Finas</strong> — o atalho do chef com dulçor botânico e aroma de Provence.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-left">
                  <div>
                    <h5 className="text-xs font-space-premium font-bold text-white uppercase tracking-widest">Alho-Poró & Ervas Finas</h5>
                    <p className="text-[11px] text-zinc-500 mt-1">Verdadeiro atalho do chef — tomilho, alecrim e orégano de Provence num passe de mágica.</p>
                  </div>
                  <div>
                    <h5 className="text-xs font-space-premium font-bold text-white uppercase tracking-widest">Clean Label Absoluto</h5>
                    <p className="text-[11px] text-zinc-500 mt-1">Zero sabor de extrato enlatado. Apenas vegetais frescos e cozimento lento com amor.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 pt-2">
                  <Link to="/linha-dubola" className="inline-flex items-center gap-3 text-xs font-space-premium font-bold tracking-widest text-emerald-500 hover:text-white transition-colors">
                    <span>CONHECER A HORTA DUBOLA</span>
                    <ArrowRight size={13} />
                  </Link>
                  <span className="text-zinc-700 text-xs font-space-premium">B2C 400g · Food Service 1,01kg</span>
                </div>
              </div>

              <div className="md:col-span-6 flex justify-center items-center order-1 md:order-2">
                <Link to="/produto/tomate-tradicional"
                  onMouseMove={handleProductTilt}
                  onMouseLeave={handleProductTiltReset}
                  className="tilt-wrapper block relative w-full max-w-[340px] aspect-[4/5] flex items-center justify-center cursor-pointer group"
                >
                  <div className="absolute w-[220px] h-[220px] rounded-full blur-[60px] bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors duration-500 z-0"></div>
                  <div className="floating-shadow absolute bottom-12 w-44 h-7 bg-black/60 rounded-full blur-md z-10"></div>
                  <img 
                    className="floating-bottle w-full max-h-[380px] object-contain z-20 pointer-events-none"
                    src="/ketchup-tradicional.jpg"
                    alt="Molho de Tomate Tradicional Dubola"
                    onError={(e) => { e.target.src = '/pickles-doces-de-pepino-frescos-isolados.png'; }}
                  />
                  <div className="absolute top-10 left-6 opacity-90 z-30">
                    <span className="text-[9px] text-white font-space-premium font-bold border border-emerald-400/40 rounded-full px-3 py-1 bg-emerald-400/15">Sabor Tradicional</span>
                  </div>
                </Link>
              </div>
          </div>
        </div>
      </div>
    </section>

      {/* 4. THE INTERACTIVE "SELETOR DE FOME" (Gamification Section) */}
      <section 
        id="seletor-fome"
        className="relative bg-zinc-950 py-24 px-6 sm:px-12 border-t border-zinc-900 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full blur-[140px] bg-[#ff003c]/5 pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#ff003c]/10 border border-[#ff003c]/20 px-4 py-1.5 rounded-full text-[#ff003c]">
              <ChefHat size={12} />
              <span className="text-[9px] font-space-premium font-bold tracking-widest uppercase">ARQUITETURA DO PALADAR</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white">
              QUAL É A SUA INSURREIÇÃO GASTRONÔMICA DE HOJE?
            </h2>
            
            <p className="text-sm text-zinc-400 font-sans-premium">
              Mapeie os caminhos sensoriais do seu prato. Selecione a base ou proteína do seu preparo e descubra a combinação exata de molhos Dubola que desbravam e coroam a receita perfeita para o seu paladar.
            </p>
          </div>

          {/* Interactive Protein Selectors */}
          <div className="flex flex-wrap justify-center gap-4 py-4">
            {[
              { id: 'carne', label: 'Corte Bovino / Grelhados', icon: '🥩' },
              { id: 'hamburguer', label: 'Hambúrguer Gourmet', icon: '🍔' },
              { id: 'frango', label: 'Frango & Aves Grelhadas', icon: '🍗' },
              { id: 'peixe', label: 'Peixe & Frutos do Mar', icon: '🐟' },
              { id: 'massa', label: 'Massas & Vegetarianos', icon: '🍝' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedProtein(item.id);
                  setRecipeDrawerOpen(false);
                  setCheckedIngredients([]);
                }}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-space-premium font-bold uppercase tracking-wider border transition-all ${
                  selectedProtein === item.id 
                    ? 'border-[#ff003c] text-white bg-[#ff003c]/15 shadow-[0_0_20px_rgba(255,0,60,0.15)] scale-[1.03]' 
                    : 'border-zinc-800 text-zinc-400 bg-zinc-900/50 hover:border-zinc-700 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Recommendation Output Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            
            {/* Recommendations column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="glass-premium p-6 rounded-3xl text-left space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-space-premium font-bold text-zinc-500 uppercase tracking-widest">Opção Selecionada</span>
                  <h3 className="font-space-premium font-black text-xl text-white uppercase tracking-wider">{currentSelectionData.title}</h3>
                  <p className="text-xs text-zinc-400 font-sans-premium">{currentSelectionData.subtitle}</p>
                </div>
                
                <hr className="border-zinc-800" />
                
                <div className="space-y-3">
                  <span className="text-[10px] font-space-premium font-bold text-zinc-500 uppercase tracking-widest block">Combinações Ideais Dubola</span>
                  
                  {currentSelectionData.pairings.map((pair, idx) => (
                    <div key={idx} className="bg-zinc-950/60 border border-zinc-800/80 p-4 rounded-xl space-y-1.5 flex flex-col justify-start">
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-xs font-space-premium font-black text-white uppercase tracking-wider">{pair.name}</span>
                        <span className="text-[9px] font-space-premium font-bold px-2 py-0.5 rounded-full uppercase bg-[#ff003c]/10 text-[#ff003c] border border-[#ff003c]/20">
                          {pair.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 font-sans-premium leading-relaxed">{pair.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Recipe Preview column */}
            <div className="lg:col-span-7">
              <div className="glass-premium p-8 rounded-3xl text-left space-y-6 relative overflow-hidden flex flex-col justify-between h-full">
                
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-space-premium font-bold text-[#ff003c] uppercase tracking-widest">ATALHO DO CHEF EXPRESSO</span>
                      <h3 className="font-space-premium font-black text-2xl text-white uppercase tracking-tight">{currentSelectionData.recipe.name}</h3>
                    </div>
                    
                    <div className="flex gap-4 shrink-0 text-zinc-500 text-[10px] font-space-premium font-bold uppercase">
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="text-zinc-500" />
                        <span>{currentSelectionData.recipe.prepTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award size={12} className="text-zinc-500" />
                        <span>{currentSelectionData.recipe.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans-premium">
                    Gaste poucos minutos preparando esse prato fantástico e eleve a experiência culinária da sua cozinha doméstica para o patamar dos grandes bistrôs.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    
                    {/* Ingredients Checklist */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        <BookOpen size={12} className="text-zinc-400" />
                        <span className="text-[10px] font-space-premium font-bold text-white uppercase tracking-widest">Ingredientes</span>
                      </div>
                      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {currentSelectionData.recipe.ingredients.map((ing, idx) => (
                          <label 
                            key={idx} 
                            onClick={() => toggleIngredientCheck(ing)}
                            className="flex items-center gap-2 cursor-pointer py-1 select-none text-[11px] font-sans-premium text-zinc-300 hover:text-white"
                          >
                            <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                              checkedIngredients.includes(ing) 
                                ? 'bg-emerald-500 border-emerald-500 text-black' 
                                : 'border-zinc-700 bg-zinc-900'
                            }`}>
                              {checkedIngredients.includes(ing) && <Check size={10} strokeWidth={3} />}
                            </div>
                            <span className={checkedIngredients.includes(ing) ? 'line-through text-zinc-500' : ''}>
                              {ing}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Quick Chef's Pairing Secret */}
                    <div className="bg-[#ff003c]/5 border border-[#ff003c]/10 p-5 rounded-2xl space-y-2 flex flex-col justify-start">
                      <div className="flex items-center gap-1.5 text-[#ff003c]">
                        <Info size={12} />
                        <span className="text-[10px] font-space-premium font-bold uppercase tracking-widest">Por que funciona?</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 font-sans-premium leading-relaxed">
                        {currentSelectionData.recipe.chefSecret}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Interactive Action to unfold the full recipe steps drawer */}
                <div className="pt-6 border-t border-zinc-800">
                  <button 
                    onClick={() => setRecipeDrawerOpen(!recipeDrawerOpen)}
                    className="w-full bg-white text-black hover:bg-zinc-200 py-3.5 rounded-xl font-space-premium font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                  >
                    <span>{recipeDrawerOpen ? 'OCULTAR INSTRUÇÕES DE PREPARO' : 'VER INSTRUÇÕES DE PREPARO'}</span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${recipeDrawerOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* Collapsible Steps Drawer */}
          {recipeDrawerOpen && (
            <div className="glass-premium p-8 rounded-3xl text-left space-y-6 animate-fadeIn duration-500">
              <div className="flex items-center gap-2 text-[#ff003c]">
                <ChefHat size={16} />
                <h4 className="font-space-premium font-bold text-sm uppercase tracking-wider">Modo de Preparo Passo a Passo</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {currentSelectionData.recipe.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start py-2 border-b border-zinc-900">
                    <span className="font-display font-black text-xl text-zinc-600 shrink-0">{(idx + 1).toString().padStart(2, '0')}</span>
                    <p className="text-[11px] sm:text-xs text-zinc-300 font-sans-premium leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 5. B2B / FOOD SERVICE BREAKOUT SECTION */}
      <section 
        id="breakout-b2b"
        ref={b2bSectionRef}
        className="relative bg-black py-24 sm:py-32 px-6 sm:px-12 border-t border-zinc-950"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] bg-[#ff003c]/5 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[180px] bg-zinc-900/40 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          
          {/* Left Column: Industrial Bucket Focus */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full text-zinc-300">
              <Users size={12} className="text-[#ff003c]" />
              <span className="text-[10px] font-space-premium font-bold tracking-widest uppercase">CONTRATO DE PERFORMANCE</span>
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white leading-[0.95]">
              A CONSISTÊNCIA INDUSTRIAL<br />
              <span className="gradient-text-red">PARA COZINHAS INSANAS</span>
            </h2>
            
            <p className="text-zinc-400 font-sans-premium text-sm sm:text-base leading-relaxed">
              Vencer na hora do rush exige precisão militar. Nossos baldes profissionais de **5kg e galões de alta vazão** foram desenhados para a brutalidade operacional do food service: estabilidade perfeita sob calor extremo da chapa, zero sinérese (não separam água), rendimento linear milimétrico e consistência inalterada que garante a fidelidade de cada cliente.
            </p>
            
            <div className="space-y-4 w-full text-left">
              <div className="glass-premium p-5 rounded-2xl flex items-start gap-4">
                <CheckCircle2 size={18} className="text-[#ff003c] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-space-premium font-bold text-xs uppercase text-white tracking-widest">Estabilidade Elevada</h4>
                  <p className="text-xs text-zinc-400 mt-1">Nossos molhos suportam o calor de banho-maria e chapa de hambúrguer sem se separar.</p>
                </div>
              </div>
              
              <div className="glass-premium p-5 rounded-2xl flex items-start gap-4">
                <ShieldCheck size={18} className="text-[#ff003c] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-space-premium font-bold text-xs uppercase text-white tracking-widest">Qualidade e Padronização</h4>
                  <p className="text-xs text-zinc-400 mt-1">Conformidade microbiológica rigorosa atestada por análises laboratoriais.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Form and Bucket mock */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
            
            {/* Visual representation of 5kg Buckets */}
            <div className="sm:col-span-5 flex justify-center items-center order-2 sm:order-1">
              <div className="relative group cursor-pointer aspect-square w-full max-w-[240px]">
                <div className="absolute inset-0 rounded-full bg-[#ff003c]/5 group-hover:bg-[#ff003c]/15 blur-3xl transition-colors duration-500"></div>
                <img 
                  src="/Logo-Dubola.png" 
                  alt="Balde Profissional 5kg Dubola" 
                  className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&q=80&w=400';
                  }}
                />
                <div className="absolute -bottom-4 right-4 z-20 glass-premium px-3 py-1.5 rounded-xl border border-zinc-800">
                  <span className="text-[10px] font-space-premium font-bold text-[#ff003c]">PROFISSIONAL 5KG</span>
                </div>
              </div>
            </div>

            {/* Seamless B2B Lead-Capture Form */}
            <div className="sm:col-span-7 order-1 sm:order-2">
              <div className="glass-premium p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#ff003c] to-transparent"></div>

                {!formSubmitted ? (
                  <form onSubmit={handleFormSubmit} className="space-y-6 text-left">
                    <div className="space-y-1">
                      <h3 className="font-space-premium font-bold text-lg text-white uppercase tracking-wider">Solicitar Kit Especial</h3>
                      <p className="text-xs text-zinc-500">Insira seu CNPJ corporativo e receba amostras para teste.</p>
                    </div>

                    <div className={`form-input-wrap ${activeInput === 'name' ? 'active' : ''} ${formData.name ? 'filled' : ''}`}>
                      <label className="form-label">Seu Nome Completo</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-transparent border-none outline-none py-3 text-sm text-white font-sans-premium animate-none"
                        value={formData.name}
                        onFocus={() => setActiveInput('name')}
                        onBlur={() => setActiveInput(null)}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>

                    <div className={`form-input-wrap ${activeInput === 'businessName' ? 'active' : ''} ${formData.businessName ? 'filled' : ''}`}>
                      <label className="form-label">Razão Social / Fantasia</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-transparent border-none outline-none py-3 text-sm text-white font-sans-premium"
                        value={formData.businessName}
                        onFocus={() => setActiveInput('businessName')}
                        onBlur={() => setActiveInput(null)}
                        onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                      />
                    </div>

                    <div className={`form-input-wrap ${activeInput === 'cnpj' ? 'active' : ''} ${formData.cnpj ? 'filled' : ''}`}>
                      <label className="form-label">CNPJ do Estabelecimento</label>
                      <input 
                        type="text" 
                        required
                        placeholder="00.000.000/0000-00"
                        className="w-full bg-transparent border-none outline-none py-3 text-sm text-white font-sans-premium placeholder:opacity-0 focus:placeholder:opacity-50"
                        value={formData.cnpj}
                        onFocus={() => setActiveInput('cnpj')}
                        onBlur={() => setActiveInput(null)}
                        onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
                      />
                    </div>

                    <div className={`form-input-wrap ${activeInput === 'email' ? 'active' : ''} ${formData.email ? 'filled' : ''}`}>
                      <label className="form-label">E-mail Comercial</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-transparent border-none outline-none py-3 text-sm text-white font-sans-premium"
                        value={formData.email}
                        onFocus={() => setActiveInput('email')}
                        onBlur={() => setActiveInput(null)}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-space-premium font-bold text-zinc-500 uppercase tracking-widest block mb-1">INTERESSE COMERCIAL</span>
                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          type="button"
                          onClick={() => setFormData({...formData, interest: 'B2B'})}
                          className={`py-2 rounded-xl text-[10px] font-space-premium font-bold tracking-widest uppercase border transition-all ${
                            formData.interest === 'B2B' 
                              ? 'border-[#ff003c] text-white bg-[#ff003c]/10' 
                              : 'border-zinc-800 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          Usar no Estabelecimento
                        </button>
                        <button 
                          type="button"
                          onClick={() => setFormData({...formData, interest: 'Distribution'})}
                          className={`py-2 rounded-xl text-[10px] font-space-premium font-bold tracking-widest uppercase border transition-all ${
                            formData.interest === 'Distribution' 
                              ? 'border-[#ff003c] text-white bg-[#ff003c]/10' 
                              : 'border-zinc-800 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          Revender / Distribuir
                        </button>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      onMouseMove={handleMagneticMove}
                      onMouseLeave={handleMagneticLeave}
                      className="btn-magnetic w-full bg-white text-black hover:bg-zinc-200 py-4.5 rounded-2xl font-space-premium font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 pt-4 transition-all"
                    >
                      <span className="btn-text">SOLICITAR ATENDIMENTO</span>
                    </button>
                  </form>
                ) : (
                  <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                      <CheckCircle2 size={32} className="animate-bounce" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-space-premium font-black text-xl uppercase tracking-wider text-white">Contato Registrado!</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans-premium max-w-sm">
                        Obrigado, **{formData.name}**. A equipe comercial Dubola já registrou os dados da **{formData.businessName}** e fará contato em até 24 horas úteis para organizar o envio de amostras profissionais.
                      </p>
                    </div>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="text-[10px] font-space-premium font-bold tracking-widest text-[#ff003c] uppercase hover:underline"
                    >
                      ENVIAR OUTRO FORMULÁRIO
                    </button>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* DYNAMIC TEXT TICKER */}
      <section className="bg-zinc-950 py-8 border-y border-zinc-900 overflow-hidden relative select-none pointer-events-none">
        <div className="flex whitespace-nowrap gap-8 animate-infinite-scroll">
          <div className="inline-flex gap-8 text-[11px] font-space-premium font-bold tracking-[0.4em] uppercase text-zinc-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-4">
                <span>DUBOLA COZINHA PROFISSIONAL</span>
                <span className="text-[#ff003c] font-black">•</span>
                <span>CONSISTÊNCIA LOGÍSTICA INQUEBRÁVEL</span>
                <span className="text-[#ff003c] font-black">•</span>
                <span>DESDE 1998</span>
                <span className="text-[#ff003c] font-black">•</span>
                <span>SABOR SEM COMPROMISSO</span>
                <span className="text-[#ff003c] font-black">•</span>
              </span>
            ))}
          </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes infinite-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-infinite-scroll {
            animation: infinite-scroll 45s linear infinite;
          }
        `}} />
      </section>

      {/* 6. IMMERSIVE CINEMATIC FOOTER */}
      <DubolaFooter />

    </div>
  );
}
