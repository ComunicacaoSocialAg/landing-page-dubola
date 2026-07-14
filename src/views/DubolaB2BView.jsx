import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import DubolaHeader from '../components/DubolaHeader';
import DubolaFooter from '../components/DubolaFooter';
import CookieBanner from '../components/CookieBanner';
import { submitB2BLead } from '../services/leadService';
import {
  Package,
  CheckCircle2,
  ArrowRight,
  Shield,
  Award,
  Phone,
  ShoppingBag,
  TrendingUp,
  Sparkles,
  Scale,
  Building,
  Users,
  MapPin,
  Mail,
  Zap,
  Info,
  Check,
  ChevronDown,
  Calculator,
  X
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { CATALOG_PRODUCTS, CATEGORY_META } from './DubolaLineView';

gsap.registerPlugin(ScrollTrigger);

// B2B benefits
const B2B_BENEFITS = [
  {
    icon: Zap,
    title: 'Estabilidade Térmica Extrema',
    desc: 'Nossos molhos suportam o calor do banho-maria e chapa de hambúrguer sem separar água (sinérese zero).'
  },
  {
    icon: Scale,
    title: 'Rendimento Milimétrico',
    desc: 'Viscosidade ideal que evita desperdícios nas bombas de alta vazão e bisnagas da sua cozinha.'
  },
  {
    icon: Shield,
    title: 'Selo Clean Label Real',
    desc: 'Apenas condimentos de autor, sem adição excessiva de amido, espessantes ou conservantes químicos.'
  },
  {
    icon: Award,
    title: 'Fidelização Lote a Lote',
    desc: 'Processo industrial ultra padronizado que garante que o cliente sinta o mesmo sabor em todas as visitas.'
  }
];

// Logistics specs
const LOGISTICS_SPECS = [
  { label: 'Pedido Mínimo', value: '150 kg (Faturamento Direto) ou via Distribuidor local' },
  { label: 'Prazo de Entrega', value: '2 a 5 dias úteis (Região Sul/Sudeste) / Demais sob consulta' },
  { label: 'Modalidade de Frete', value: 'FOB ou CIF (acima de 300 kg)' },
  { label: 'Armazenamento', value: 'Local seco e arejado. Após aberto, manter sob refrigeração.' },
];

const B2B_LOGISTICS_SPECS = {
  bisnaga: {
    title: 'Bisnaga Premium (Varejo/Mesa)',
    boxQty: 'Caixa Master com 06 unidades',
    weight: '1,5 kg por caixa master (média)',
    dimensions: '22cm x 15cm x 18cm',
    palletQty: '240 caixas por pallet padrão',
    idealFor: 'Mesas de restaurantes, hamburguerias, bistrôs e empórios de alta gastronomia.',
    description: 'A embalagem perfeita para contato direto com o cliente final na mesa. Design anatômico com válvula dosadora limpa que evita desperdícios e respingos acidentais, garantindo a higiene do salão.',
    highlights: ['Válvula corta-gotas de silicone', 'PET 100% reciclável livre de BPA', 'Exposição de marca na mesa']
  },
  bag: {
    title: 'Bag Profissional 1,01 kg',
    boxQty: 'Caixa Master com 06 unidades',
    weight: '6,3 kg por caixa master',
    dimensions: '30cm x 20cm x 15cm',
    palletQty: '120 caixas por pallet padrão',
    idealFor: 'Uso interno na cozinha (Back of House), preparação de pratos, reabastecimento de dispensers e alto giro.',
    description: 'Desenvolvido especificamente para chefs e operações de cozinha profissional. O formato bag de 1,01 kg maximiza o rendimento e permite a extração de até 99% do produto, gerando desperdício zero e agilizando o pré-paro de burgers e pratos.',
    highlights: ['Bico dosador universal', 'Alta barreira contra oxigênio', 'Economia de espaço no descarte']
  },
  vidro: {
    title: 'Pote de Vidro Gourmet (Varejo/Gourmet)',
    boxQty: 'Caixa Master com 06 unidades',
    weight: '2,8 kg por caixa master',
    dimensions: '28cm x 18cm x 14cm',
    palletQty: '180 caixas por pallet padrão',
    idealFor: 'Exposição em gôndolas de varejo gourmet, empórios de frios, presentes corporativos e receitas autorais refinadas.',
    description: 'Embalagem clássica que preserva a pureza do sabor e eleva o posicionamento de marca nas prateleiras e mesas de exposição gourmet.',
    highlights: ['Lacre metálico de segurança', 'Vidro esterilizado reutilizável', 'Exposição de marca de alto valor']
  }
};

export default function DubolaB2BView() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [preloaderActive, setPreloaderActive] = useState(true);
  const [preloaderFade, setPreloaderFade] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    cnpj: '',
    contactName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    businessType: 'hamburgueria',
    consumption: '50'
  });
  const [lgpdConsent, setLgpdConsent] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [commercialSubmitted, setCommercialSubmitted] = useState(false);
  const [selectedFormat, setSelectedFormatState] = useState('bisnaga');
  const setSelectedFormat = (format) => {
    setSelectedFormatState(format);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById('ficha-logistica')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    }
  };
  const [activeCategoryTab, setActiveCategoryTab] = useState('ketchups');
  const [isMobile, setIsMobile] = useState(false);
  
  // Ref elements for GSAP
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const videoRef = useRef(null);
  const manifestoRef = useRef(null);

  // Monitor screen size for responsive assets and layouts
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dynamic Fonts & Scroll Load
  useEffect(() => {
    // Fonts
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&family=Syne:wght@700;800&family=Space+Grotesk:wght@500;700&display=swap';
    document.head.appendChild(link);

    // Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      document.head.removeChild(link);
    };
  }, []);

  // Ref for the gradient overlay that fades in after video ends
  const gradientOverlayRef = useRef(null);

  // Safety timer to auto-dismiss preloader in case of error/block
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setPreloaderFade(true);
      const hideTimer = setTimeout(() => setPreloaderActive(false), 1200);
      return () => clearTimeout(hideTimer);
    }, 8500);
    return () => clearTimeout(safetyTimer);
  }, []);

  // Cinematic Preloader Motion Design Timeline
  useEffect(() => {
    if (!preloaderActive) return;

    // Set initial styles for the logo image
    gsap.set('.preloader-logo', {
      opacity: 0,
      scale: 0.82,
      filter: 'blur(8px) drop-shadow(0 0 0px rgba(255,0,60,0))'
    });

    const tl = gsap.timeline({
      onComplete: () => {
        // Trigger fade out of preloader overlay
        setPreloaderFade(true);
        setTimeout(() => {
          setPreloaderActive(false);
        }, 1200);
      }
    });

    // 1. Cinematic reveal: fade-in, blur removal, and smooth scale-up
    tl.to('.preloader-logo', {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px) drop-shadow(0 8px 36px rgba(255,0,60,0.3))',
      duration: 1.6,
      ease: 'power4.out',
      delay: 0.4
    })
    // 2. Subtle heartbeat / breathing animation while centered
    .to('.preloader-logo', {
      scale: 1.03,
      duration: 1.1,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: 1
    })
    // 3. Cinematic exit: zoom out, blur, and fade out
    .to('.preloader-logo', {
      opacity: 0,
      scale: 1.15,
      filter: 'blur(12px) drop-shadow(0 0 0px rgba(255,0,60,0))',
      duration: 0.8,
      ease: 'power3.inOut'
    });
  }, [preloaderActive]);

  // GSAP Cinematic Intro: triggered when preloader finishes and video ends
  useEffect(() => {
    // Start everything invisible — content hidden while loading/playing
    gsap.set('.hero-badge', { opacity: 0, y: 16 });
    gsap.set('.hero-handwriting', { opacity: 0, y: -20 });
    gsap.set('.hero-title-line', { opacity: 0, y: 20 });
    gsap.set('.hero-desc', { opacity: 0, y: 16 });
    gsap.set('.hero-logo-right', { opacity: 0, x: 20 });
    gsap.set('.hero-btns', { opacity: 0, y: 16 });

    // Do not run animations while preloader is active
    if (preloaderActive) return;

    const video = videoRef.current;
    let fallbackTimeout = null;

    const triggerCinematicIntro = () => {
      if (fallbackTimeout) clearTimeout(fallbackTimeout);

      const tl = gsap.timeline();

      // Step 2: badge and handwriting script logo
      tl.to(['.hero-badge', '.hero-handwriting'], {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out'
      })
      // Step 3: Title Lines Stagger
      .to('.hero-title-line', {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power4.out'
      }, '-=0.35')
      // Step 4: Subtitle & Right Logo
      .to(['.hero-desc', '.hero-logo-right'], {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.65,
        ease: 'power3.out'
      }, '-=0.3')
      // Step 5: CTA buttons
      .to('.hero-btns', {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: 'power3.out'
      }, '-=0.35');
    };

    if (video) {
      // Play background video on preloader finish
      video.play().catch((err) => {
        console.warn("Autoplay block or video.play() error:", err);
        setVideoEnded(true);
        triggerCinematicIntro();
      });

      if (video.ended) {
        setVideoEnded(true);
        triggerCinematicIntro();
        return;
      }

      const handleEnded = () => {
        setVideoEnded(true);
        triggerCinematicIntro();
      };
      video.addEventListener('ended', handleEnded, { once: true });

      // Fallback: 8s safety limit for background video play
      fallbackTimeout = setTimeout(() => {
        if (!video.ended) {
          setVideoEnded(true);
          triggerCinematicIntro();
        }
      }, 8000);

      return () => {
        video.removeEventListener('ended', handleEnded);
        if (fallbackTimeout) clearTimeout(fallbackTimeout);
      };
    } else {
      setVideoEnded(true);
      fallbackTimeout = setTimeout(triggerCinematicIntro, 500);
      return () => {
        if (fallbackTimeout) clearTimeout(fallbackTimeout);
      };
    }
  }, [preloaderActive, isMobile]);

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

  // Format CNPJ Input (99.999.999/9999-99)
  const handleCnpjChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 14) value = value.substring(0, 14);

    if (value.length > 12) {
      value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
    } else if (value.length > 8) {
      value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4})$/, "$1.$2.$3/$4");
    } else if (value.length > 5) {
      value = value.replace(/^(\d{2})(\d{3})(\d{0,3})$/, "$1.$2.$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,3})$/, "$1.$2");
    }
    
    setFormData({ ...formData, cnpj: value });
  };

  // Format Phone Input ((99) 99999-9999)
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);

    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,4})$/, "($1) $2");
    }
    
    setFormData({ ...formData, phone: value });
  };

  // Handle Form Submission for Sales Representative callback (direct WhatsApp contact)
  const handleCommercialSubmit = async (e) => {
    e.preventDefault();
    if (!formData.businessName || !formData.cnpj || !formData.contactName || !formData.phone) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    
    if (!lgpdConsent) {
      alert("Você precisa concordar com os Termos de Uso e Política de Privacidade para enviar os seus dados comercialmente.");
      return;
    }

    try {
      // Enviar Lead para o Banco de Dados e CRM + rastreamento
      const result = await submitB2BLead(formData);
      
      const isHot = result.leadScore === 'HOT';
      const scoreTag = isHot ? '🔥 *[ATENDIMENTO PRIORITÁRIO - CLIENTE DE ALTO GIRO]*\n' : '';
      
      const message = `${scoreTag}Olá, Equipe Comercial da Dubola Alimentos!
Gostaria de solicitar uma proposta comercial e amostras para a minha empresa:

- *Razão Social:* ${formData.businessName}
- *CNPJ:* ${formData.cnpj}
- *Comprador / Contato:* ${formData.contactName}
- *WhatsApp:* ${formData.phone}
- *E-mail:* ${formData.email || 'Não informado'}
- *Cidade/UF:* ${formData.city}/${formData.state}
- *Tipo de Estabelecimento:* ${formData.businessType}
- *Consumo Mensal Estimado:* ${formData.consumption} kg/mês

Gostaria de conhecer melhor as linhas e formatos corporativos da Dubola B2B.`;

      const encodedText = encodeURIComponent(message);
      
      // WhatsApp Oficial da Dubola Alimentos
      const whatsappUrl = `https://wa.me/5521998487779?text=${encodedText}`;
      
      setCommercialSubmitted(true);
      
      // Abre o WhatsApp para o atendimento comercial
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 800);
    } catch (err) {
      console.error("Erro no processamento do lead:", err);
      // Fallback em caso de falha de conexão: garante o redirecionamento ao WhatsApp de qualquer forma!
      const message = `Olá, Equipe Comercial da Dubola!
Gostaria de solicitar proposta B2B para:
- *Razão Social:* ${formData.businessName}
- *Comprador:* ${formData.contactName}
- *WhatsApp:* ${formData.phone}`;
      const encodedText = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/5521998487779?text=${encodedText}`;
      setCommercialSubmitted(true);
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 800);
    }
  };

  return (
    <div className={`relative w-full min-h-screen ${isDarkMode ? 'dark-theme bg-black text-[#f4f4f5]' : 'light-theme bg-[#faf7ed] text-zinc-900'} overflow-x-hidden selection:bg-[#ff003c]/30 selection:text-white font-sans-premium transition-colors duration-300`}>
      
      {/* Dynamic Style Injection for premium typography */}
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
        .font-space-premium {
          font-family: var(--font-space), sans-serif;
        }
        .font-sans-premium {
          font-family: var(--font-outfit), sans-serif;
        }
        .dark-theme .glass-premium {
          background: rgba(10, 10, 10, 0.65);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
        }
        .light-theme .glass-premium {
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(214, 207, 169, 0.45);
          box-shadow: 0 8px 32px 0 rgba(140, 120, 80, 0.03);
        }
        .dark-theme .gradient-text-red {
          background: linear-gradient(135deg, #ffffff 30%, #ff003c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .light-theme .gradient-text-red {
          background: linear-gradient(135deg, #18181b 30%, #ff003c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .dark-theme .gradient-text-gold {
          background: linear-gradient(135deg, #ffffff 40%, #eab308 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .light-theme .gradient-text-gold {
          background: linear-gradient(135deg, #18181b 40%, #d97706 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .dark-theme .form-input-wrap {
          position: relative;
          background: rgba(20, 20, 20, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 8px 16px 8px;
          transition: all 0.3s ease;
        }
        .dark-theme .form-input-wrap.active {
          border-color: rgba(255, 0, 60, 0.5);
          box-shadow: 0 0 15px rgba(255, 0, 60, 0.15);
          background: rgba(24, 24, 24, 0.8);
        }
        .dark-theme .form-label {
          display: block;
          font-family: var(--font-space), sans-serif;
          font-size: 8px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 2px;
        }
        .light-theme .form-input-wrap {
          position: relative;
          background: rgba(247, 240, 213, 0.75);
          border: 1px solid rgba(214, 207, 169, 0.4);
          border-radius: 16px;
          padding: 8px 16px 8px;
          transition: all 0.3s ease;
        }
        .light-theme .form-input-wrap.active {
          border-color: rgba(255, 0, 60, 0.35);
          box-shadow: 0 0 15px rgba(255, 0, 60, 0.05);
          background: rgba(255, 255, 255, 0.95);
        }
        .light-theme .form-label {
          display: block;
          font-family: var(--font-space), sans-serif;
          font-size: 8px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(0, 0, 0, 0.5);
          margin-bottom: 2px;
        }
        /* Custom overrides for grey to sand/cream transition (f7f0d5) */
        .light-theme .hover\:bg-zinc-100\/50:hover {
          background-color: rgba(247, 240, 213, 0.45) !important;
        }
        .light-theme .border-zinc-200\/50 {
          border-color: rgba(214, 207, 169, 0.4) !important;
        }
        .light-theme .bg-zinc-100\/80 {
          background-color: rgba(247, 240, 213, 0.8) !important;
        }
        .light-theme .bg-zinc-50 {
          background-color: rgba(247, 240, 213, 0.35) !important;
        }
        .light-theme .border-zinc-200 {
          border-color: rgba(214, 207, 169, 0.55) !important;
        }
        .light-theme .divide-zinc-200\/60 > :not([hidden]) ~ :not([hidden]) {
          border-color: rgba(214, 207, 169, 0.35) !important;
        }
        .light-theme .bg-zinc-50\/60 {
          background-color: rgba(247, 240, 213, 0.45) !important;
        }
        .light-theme .bg-zinc-200 {
          background-color: rgba(214, 207, 169, 0.5) !important;
        }
        .light-theme .text-zinc-650,
        .light-theme .text-zinc-550 {
          color: #8c7f66 !important;
        }
        .light-theme .text-zinc-400 {
          color: #7a6e55 !important;
        }
      `}} />

      {/* Cinematic Intro Preloader */}
      {preloaderActive && (
        <div className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-1000 ${preloaderFade ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {/* Ambient soft red glow in the center */}
          <div className="absolute w-[600px] h-[600px] rounded-full bg-[#ff003c]/12 blur-[150px] animate-pulse pointer-events-none" />

          {/* Logo container */}
          <div className="preloader-logo-wrap relative z-10 select-none px-6">
            <img
              src="/como-deve-ser.png"
              alt="Como deve ser."
              className="preloader-logo w-[280px] sm:w-[400px] md:w-[480px] h-auto object-contain filter drop-shadow-[0_4px_30px_rgba(255,0,60,0.3)]"
            />
          </div>
        </div>
      )}

      <DubolaHeader forceLight={!isDarkMode} isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />

      {/* Background ambient light */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[140px] ${isDarkMode ? 'bg-[#ff003c]/5' : 'bg-[#ff003c]/3'} pointer-events-none z-0`} />
      <div className={`fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] ${isDarkMode ? 'bg-[#eab308]/3' : 'bg-[#eab308]/2'} pointer-events-none z-0`} />

      {/* ── HERO SECTION — CINEMATIC FULLSCREEN ── */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden z-10 bg-black"
        style={{ height: isMobile ? '100svh' : '100vh' }}
      >
        {/* ── VIDEO: fullscreen background on both mobile & desktop ── */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            loop={false}
            muted
            playsInline
            preload="auto"
            key={isMobile ? 'mobile-v' : 'desktop-v'}
            className="w-full h-full object-cover object-center"
            onError={(e) => { e.currentTarget.src = '/hero-todas.mp4'; }}
          >
            <source src="/ketchup-goiaba-hero.mp4" type="video/mp4" />
          </video>
        </div>

        {/* ── IMAGE BACKDROP: clean mockup (no text or logo baked-in) ── */}
        <div 
          className={`absolute inset-0 z-0 bg-cover bg-no-repeat transition-opacity duration-1000 ease-out ${
            isMobile ? 'bg-[position:left_20%_center]' : 'bg-center'
          } ${videoEnded ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: "url('/hero-final-clean.jpg')" }}
        />

        {/* ── MAIN CONTENT GRID: exact match to the reference layout ── */}
        <div className={`
          absolute inset-0 z-20 flex w-full h-full
          ${isMobile 
            ? 'flex-col justify-end px-6 pb-12 pt-24' 
            : 'relative'
          }
        `}>
          
          {/* COLUMN 1: LEFT AREA (Handwriting logo "Como deve ser.") */}
          {!isMobile ? (
            <div className="hero-handwriting absolute top-[8%] left-[20%] w-[18%] select-none">
              <img 
                src="/como-deve-ser.png" 
                alt="Como deve ser." 
                className="w-full h-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" 
              />
            </div>
          ) : (
            /* On mobile, place it at the top */
            <div className="hero-handwriting absolute top-28 left-6">
              <img 
                src="/como-deve-ser.png" 
                alt="Como deve ser." 
                className="w-36 h-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" 
              />
            </div>
          )}

          {/* COLUMN 2: MIDDLE AREA (Title, Subtitle, CTAs) */}
          <div className={`
            flex flex-col items-start
            ${isMobile 
              ? 'w-full mt-auto bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-6' 
              : 'absolute top-[22%] left-[45%] w-[35%] flex flex-col justify-start'
            }
          `}>
            {/* Badge */}
            <div className={`hero-badge inline-flex items-center gap-2 border backdrop-blur-md px-4 py-1.5 rounded-full mb-4 self-start ${
              isDarkMode 
                ? 'bg-black/50 border-white/10 text-zinc-300' 
                : 'bg-white/70 border-zinc-200 text-zinc-700'
            }`}>
              <Sparkles size={11} className="text-[#a01e16] animate-pulse" />
              <span className="text-[9px] font-space-premium font-bold tracking-[0.25em] uppercase">Área Exclusiva B2B</span>
            </div>

            {/* Title */}
            <h1 
              style={{ 
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: isMobile ? '2.8rem' : 'clamp(3rem, 4vw, 4.4rem)',
                color: '#a01e16'
              }}
              className="font-black uppercase leading-[0.98] tracking-wide mb-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
            >
              <span className="hero-title-line block">MOLHOS QUE VOCÊ</span>
              <span className="hero-title-line block">SERVE COM ORGULHO.</span>
            </h1>

            {/* Subtitle */}
            <p 
              style={{ 
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: isMobile ? '1.1rem' : 'clamp(1.15rem, 1.4vw, 1.45rem)',
                color: '#c4b265'
              }}
              className="hero-desc font-bold tracking-[0.2em] leading-none mb-6 uppercase drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]"
            >
              AUTÊNTICOS. SABOROSOS. CONFIÁVEIS.
            </p>

            {/* CTAs */}
            <div className="hero-btns flex gap-3 w-full sm:w-auto">
              <a
                href="#catalogo"
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#a01e16] hover:bg-[#861710] text-white font-space-premium font-bold uppercase tracking-widest transition-all shadow-[0_0_28px_rgba(160,30,22,0.4)]"
                style={{ padding: isMobile ? '14px 20px' : '14px 28px', fontSize: '0.65rem' }}
              >
                <ShoppingBag size={13} /> Ver Catálogo Completo
              </a>
              <a
                href="#beneficios"
                className={`flex items-center justify-center gap-2 rounded-2xl border font-space-premium font-bold uppercase tracking-widest transition-all ${
                  isDarkMode 
                    ? 'border-white/15 bg-white/5 text-zinc-200 hover:bg-white/10 hover:border-white/25' 
                    : 'border-zinc-300 bg-zinc-100 text-zinc-800 hover:bg-zinc-200 hover:border-zinc-400'
                }`}
                style={{ padding: isMobile ? '14px 20px' : '14px 28px', fontSize: '0.65rem' }}
              >
                Diferenciais Técnicos
              </a>
            </div>
          </div>

          {/* COLUMN 3: RIGHT AREA (Dubola Logo) */}
          {!isMobile && (
            <div className="hero-logo-right absolute top-[20%] right-[8%] w-[12%] flex justify-end items-center">
              <img 
                src="/Logo-Dubola.png" 
                alt="DUBOLA Logo" 
                className="w-full h-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" 
              />
            </div>
          )}
        </div>

        {/* Scroll hint on mobile */}
        {isMobile && (
          <div className="absolute bottom-[200px] right-6 z-20 flex flex-col items-center gap-1 opacity-40">
            <ChevronDown size={16} className="text-white animate-bounce" />
          </div>
        )}
      </section>

      {/* ── SECTION 2: MANIFESTO ── */}
      <section
        id="manifesto"
        ref={manifestoRef}
        className="relative w-full overflow-hidden bg-gradient-to-r from-[#7a0c16] via-[#7a0c16] to-[#62070e] py-24 lg:py-32 px-6 flex items-center z-10 border-t border-white/[0.02]"
      >
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Header of Section */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 gap-8 manifesto-header opacity-0">
            <div className="relative flex items-end">
              <h2 className="font-cheddar text-7xl sm:text-8xl md:text-9xl tracking-tight leading-none text-white uppercase select-none">
                O JEITO DUBOLA
              </h2>
              <div className="absolute -bottom-4 left-[62%] w-48 sm:w-64 z-20 manifesto-cursive opacity-0">
                <img 
                  src="/como-deve-ser-branco.png" 
                  alt="Como deve ser" 
                  className="w-full h-auto object-contain transform -rotate-6 select-none"
                />
              </div>
            </div>
            
            <div className="max-w-xl lg:text-right pt-6 lg:pt-0 manifesto-header-right opacity-0">
              <p className="font-display text-2xl sm:text-3xl lg:text-[2.2rem] leading-none tracking-widest text-white uppercase">
                A DUBOLA NASCEU PARA RESGATAR<br />
                A AUTENTICIDADE DOS SABORES.
              </p>
            </div>
          </div>

          {/* Grid container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left column: Manifesto text */}
            <div className="lg:col-span-6 space-y-10 select-none">
              {/* Paragraph 1 */}
              <p className="font-display uppercase tracking-wider text-3xl lg:text-4xl text-white font-bold manifesto-p opacity-0 leading-none">
                NÃO FAZEMOS MOLHOS APENAS PARA VENDER.
              </p>

              {/* Paragraph 2 */}
              <p className="font-display uppercase tracking-wider text-2xl lg:text-[1.85rem] text-[#f3d3d6] font-normal leading-tight max-w-xl manifesto-p opacity-0">
                FAZEMOS <span className="text-white font-black">PRODUTOS AUTÊNTICOS</span> QUE TEMOS <span className="text-white font-black">ORGULHO</span> DE COLOCAR NA MESA DA NOSSA PRÓPRIA FAMÍLIA.
              </p>

              {/* Paragraph 3 */}
              <div className="font-display uppercase tracking-wider text-2xl lg:text-[1.85rem] text-[#f3d3d6] font-normal leading-tight space-y-3 manifesto-p opacity-0">
                <p>ACREDITAMOS QUE <span className="text-white font-black">SABOR</span> NÃO ACEITA <span className="text-white font-black">ATALHOS</span>.</p>
                <p>ACREDITAMOS QUE <span className="text-white font-black">QUALIDADE</span> NÃO É UM DIFERENCIAL.</p>
                <p className="pl-16 md:pl-32">É UMA OBRIGAÇÃO.</p>
                <p>ACREDITAMOS QUE <span className="text-white font-black">AUTENTICIDADE</span> VALE MAIS DO QUE SEGUIR TENDÊNCIAS.</p>
              </div>

              {/* Paragraph 4 */}
              <p className="font-display uppercase tracking-wider text-2xl lg:text-[1.85rem] text-[#f3d3d6] font-normal leading-tight manifesto-p opacity-0">
                ACREDITAMOS QUE <span className="text-white font-black">CONFIANÇA</span> É CONQUISTADA TODOS OS DIAS.
              </p>

              {/* Paragraph 5 */}
              <div className="font-display uppercase tracking-wider text-3xl lg:text-[2.2rem] text-[#182d1c] font-black leading-tight pt-6 manifesto-p opacity-0">
                <p>E ACREDITAMOS QUE UM BOM MOLHO</p>
                <p>É AQUELE QUE VOCÊ TERÁ ORGULHO DE SERVIR.</p>
              </div>
            </div>

            {/* Right column: Image */}
            <div className="lg:col-span-6 w-full flex justify-center lg:justify-end manifesto-bottles opacity-0">
              <img 
                src="/ketchup/trio-ketchups-sem-acucar-splash.png" 
                alt="Ketchups Dubola" 
                className="w-full max-w-2xl object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SIMPLIFIED COMMERCIAL CATALOG SECTION ── */}
      <section id="catalogo" className="py-24 px-6 sm:px-12 relative z-10">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#ff003c]/10 border border-[#ff003c]/20 px-4 py-1.5 rounded-full text-[#ff003c]">
              <Package size={12} />
              <span className="text-[9px] font-space-premium font-bold tracking-[0.25em] uppercase">PRODUTOS & FORMATOS B2B</span>
            </div>
            <h2 className={`font-display text-2xl sm:text-3xl md:text-[32px] font-black uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'} max-w-4xl mx-auto leading-tight`}>
              Mais do que assinar condimentos espetaculares, selamos um pacto de performance e crescimento com a sua operação.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto font-sans-premium leading-relaxed">
              A Dubola nasceu para elevar o padrão da chapa à mesa: transformamos o comum em memorável para cozinhas que exigem qualidade absoluta.
            </p>
            <div className="w-12 h-1 bg-[#ff003c] mx-auto rounded-full" />
          </div>

          {/* Complete Line Showcase Video */}
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.04] bg-zinc-950 shadow-2xl aspect-[16/9] sm:aspect-[21/9] max-h-[500px] flex items-center justify-center">
            <video 
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            >
              <source src="/video-banner-bbk-dubola.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-left space-y-2 z-10">
              <span className="text-[8px] font-space-premium font-bold tracking-[0.25em] text-[#ff003c] uppercase bg-black/60 px-3 py-1 rounded-full border border-white/5">EXCELÊNCIA EM TODOS OS DETALHES</span>
              <h3 className="font-display text-xl sm:text-3xl font-black uppercase text-white">A Linha Completa Dubola</h3>
              <p className="text-[10px] sm:text-xs text-zinc-400 font-sans-premium max-w-md leading-relaxed">
                Nossos produtos unem sabores autorais e ingredientes 100% selecionados a uma engenharia de embalagens voltada para rendimento, facilidade de uso e conservação de sabor.
              </p>
            </div>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Ketchups Category */}
            <div className="glass-premium p-6 rounded-3xl border border-white/[0.03] text-left flex flex-col justify-between hover:border-zinc-800 transition-colors">
              <div className="space-y-4">
                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-white/[0.02]">
                  <img src="/linha-ketchups-trio.png" alt="Linha Ketchups" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2">
                  <span className="text-[8px] font-space-premium font-black text-[#ff003c] uppercase tracking-widest">LINHA KETCHUP</span>
                  <h4 className={`font-space-premium font-black text-lg ${isDarkMode ? 'text-white' : 'text-zinc-900'} uppercase tracking-wider`}>Ketchups de Autor</h4>
                  <p className="text-[11px] text-zinc-400 font-sans-premium leading-relaxed">
                    Tradicional, com Goiaba e Picante. Sabores marcantes produzidos com tomates selecionados, acidez equilibrada e textura ideal para finalizações.
                  </p>
                </div>
              </div>
              
              <div className={`pt-6 border-t ${isDarkMode ? 'border-zinc-900' : 'border-[#eae1c0]'} mt-6 space-y-4`}>
                <div>
                  <p className="text-[8px] font-space-premium font-bold text-zinc-550 uppercase tracking-widest mb-2">Formatos Disponíveis</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Bisnaga', 'Bag 1,01kg'].map((f) => (
                      <span key={f} className={`text-[8px] font-space-premium font-bold ${isDarkMode ? 'bg-white/5 text-zinc-300 border-white/[0.02]' : 'bg-[#f7f0d5] text-zinc-750 border-[#eae1c0]'} px-2 py-1 rounded-lg border`}>{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Maioneses Category */}
            <div className="glass-premium p-6 rounded-3xl border border-white/[0.03] text-left flex flex-col justify-between hover:border-zinc-800 transition-colors">
              <div className="space-y-4">
                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-white/[0.02]">
                  <img src="/linha-maioneses-trio.jpg" alt="Linha Maioneses" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2">
                  <span className="text-[8px] font-space-premium font-black text-sky-450 uppercase tracking-widest">LINHA MAIONESE</span>
                  <h4 className={`font-space-premium font-black text-lg ${isDarkMode ? 'text-white' : 'text-zinc-900'} uppercase tracking-wider`}>Maioneses Especiais</h4>
                  <p className="text-[11px] text-zinc-400 font-sans-premium leading-relaxed">
                    Tradicional, Alho, Defumada, Ervas Finas, Tártaro, Azeitona Preta e Limão Siciliano. Estabilidade lendária com textura cremosa de alta performance.
                  </p>
                </div>
              </div>
              
              <div className={`pt-6 border-t ${isDarkMode ? 'border-zinc-900' : 'border-[#eae1c0]'} mt-6 space-y-4`}>
                <div>
                  <p className="text-[8px] font-space-premium font-bold text-zinc-550 uppercase tracking-widest mb-2">Formatos Disponíveis</p>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {['Bisnaga', 'Bag 1,01kg'].map((f) => (
                        <span key={f} className={`text-[8px] font-space-premium font-bold ${isDarkMode ? 'bg-white/5 text-zinc-300 border-white/[0.02]' : 'bg-[#f7f0d5] text-zinc-750 border-[#eae1c0]'} px-2 py-1 rounded-lg border`}>{f}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[8px] font-space-premium font-bold bg-[#ff003c]/10 text-[#ff003c] px-2 py-1 rounded-lg border border-[#ff003c]/10">Pote de Vidro *</span>
                      <span className="text-[8px] text-zinc-550 font-sans-premium">* Disponível apenas para Maionese Tradicional</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Barbecues Category */}
            <div className="glass-premium p-6 rounded-3xl border border-white/[0.03] text-left flex flex-col justify-between hover:border-zinc-800 transition-colors">
              <div className="space-y-4">
                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-white/[0.02]">
                  <img src="/linha-barbecue-trio.jpg" alt="Linha Barbecues" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2">
                  <span className="text-[8px] font-space-premium font-black text-amber-500 uppercase tracking-widest">LINHA BARBECUE</span>
                  <h4 className={`font-space-premium font-black text-lg ${isDarkMode ? 'text-white' : 'text-zinc-900'} uppercase tracking-wider`}>Barbecue Premium</h4>
                  <p className="text-[11px] text-zinc-400 font-sans-premium leading-relaxed">
                    Tradicional, com Goiaba e Picante. Defumação equilibrada com dulçor e acidez perfeitamente calibrados para carnes e hambúrgueres.
                  </p>
                </div>
              </div>
              
              <div className={`pt-6 border-t ${isDarkMode ? 'border-zinc-900' : 'border-[#eae1c0]'} mt-6 space-y-4`}>
                <div>
                  <p className="text-[8px] font-space-premium font-bold text-zinc-550 uppercase tracking-widest mb-2">Formatos Disponíveis</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Bisnaga', 'Bag 1,01kg'].map((f) => (
                      <span key={f} className={`text-[8px] font-space-premium font-bold ${isDarkMode ? 'bg-white/5 text-zinc-300 border-white/[0.02]' : 'bg-[#f7f0d5] text-zinc-750 border-[#eae1c0]'} px-2 py-1 rounded-lg border`}>{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mostardas Category */}
            <div className="glass-premium p-6 rounded-3xl border border-white/[0.03] text-left flex flex-col justify-between hover:border-zinc-800 transition-colors">
              <div className="space-y-4">
                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-white/[0.02]">
                  <img src="/linha-mostardas.png" alt="Linha Mostardas" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2">
                  <span className="text-[8px] font-space-premium font-black text-yellow-400 uppercase tracking-widest">LINHA MOSTARDA</span>
                  <h4 className={`font-space-premium font-black text-lg ${isDarkMode ? 'text-white' : 'text-zinc-900'} uppercase tracking-wider`}>Mostardas Especiais</h4>
                  <p className="text-[11px] text-zinc-400 font-sans-premium leading-relaxed">
                    Tradicional, Dijon e com Mel. Sementes selecionadas e processos clássicos que entregam picância elegante e acidez equilibrada.
                  </p>
                </div>
              </div>
              
              <div className={`pt-6 border-t ${isDarkMode ? 'border-zinc-900' : 'border-[#eae1c0]'} mt-6 space-y-4`}>
                <div>
                  <p className="text-[8px] font-space-premium font-bold text-zinc-550 uppercase tracking-widest mb-2">Formatos Disponíveis</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Bisnaga', 'Bag 1,01kg'].map((f) => (
                      <span key={f} className={`text-[8px] font-space-premium font-bold ${isDarkMode ? 'bg-white/5 text-zinc-300 border-white/[0.02]' : 'bg-[#f7f0d5] text-zinc-750 border-[#eae1c0]'} px-2 py-1 rounded-lg border`}>{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Molhos de Tomate Category */}
            <div className="glass-premium p-6 rounded-3xl border border-white/[0.03] text-left flex flex-col justify-between hover:border-zinc-800 transition-colors md:col-span-2 lg:col-span-1">
              <div className="space-y-4">
                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-white/[0.02]">
                  <img src="/linha-tomates.png" alt="Linha Molhos de Tomate" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2">
                  <span className="text-[8px] font-space-premium font-black text-emerald-400 uppercase tracking-widest">LINHA TOMATE</span>
                  <h4 className={`font-space-premium font-black text-lg ${isDarkMode ? 'text-white' : 'text-zinc-900'} uppercase tracking-wider`}>Molhos de Tomate</h4>
                  <p className="text-[11px] text-zinc-400 font-sans-premium leading-relaxed">
                    Tradicional ao Sugo, Rústico e Rústico com Ervas Finas e Alho-Poró. Cozimento lento de polpa italiana com pedaços suculentos.
                  </p>
                </div>
              </div>
              
              <div className={`pt-6 border-t ${isDarkMode ? 'border-zinc-900' : 'border-[#eae1c0]'} mt-6 space-y-4`}>
                <div>
                  <p className="text-[8px] font-space-premium font-bold text-zinc-550 uppercase tracking-widest mb-2">Formatos Disponíveis</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Pote de Vidro 320g', 'Bag 1,01kg'].map((f) => (
                      <span key={f} className="text-[8px] font-space-premium font-bold bg-[#ff003c]/10 text-[#ff003c] px-2 py-1 rounded-lg border border-[#ff003c]/10">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── FORMATS & DISTRIBUTION INTERACTIVE MATRIX ── */}
          <div className="pt-12 space-y-8">
            <div className="text-left space-y-2">
              <span className={`${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'} text-[10px] font-space-premium font-black tracking-[0.3em] uppercase block`}>
                Especificações Técnicas Operacionais
              </span>
              <h3 className={`text-2xl sm:text-4xl font-black font-display ${isDarkMode ? 'text-white' : 'text-zinc-900'} leading-tight uppercase tracking-tight`}>
                Formatos & <span className="text-[#ff003c]">Distribuição</span>
              </h3>
            {/* Tab Selector Buttons */}
            <div className={`flex flex-wrap gap-2 justify-start border-b ${isDarkMode ? 'border-white/[0.04]' : 'border-zinc-200'} pb-4`}>
              {[
                { id: 'ketchups', label: 'Linha Ketchups' },
                { id: 'maioneses', label: 'Linha Maioneses' },
                { id: 'barbecues', label: 'Linha Barbecue' },
                { id: 'mostardas', label: 'Linha Mostardas' },
                { id: 'tomates', label: 'Molhos de Tomate' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveCategoryTab(tab.id);
                    if (tab.id === 'tomates') {
                      setSelectedFormat('bag');
                    } else {
                      setSelectedFormat('bisnaga');
                    }
                  }}
                  className={`px-4 py-2.5 text-[9px] font-space-premium font-bold tracking-widest uppercase border transition-all duration-200 rounded-lg ${
                    activeCategoryTab === tab.id
                      ? 'border-[#ff003c]/40 bg-[#ff003c]/10 text-[#ff003c]'
                      : isDarkMode
                        ? 'border-white/[0.06] bg-zinc-950 text-zinc-400 hover:border-white/15 hover:text-white'
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Table */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                <div className={`w-full ${isDarkMode ? 'bg-zinc-950/60 border-white/[0.04]' : 'bg-white/75 border-zinc-200 shadow-sm'} border rounded-2xl overflow-hidden backdrop-blur-md`}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                      
                      {/* dot element definition */}
                      {(() => {
                        const dotElement = isDarkMode 
                          ? <span className="inline-block w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_white]" /> 
                          : <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ff003c] shadow-[0_0_8px_rgba(255,0,60,0.3)]" />;

                        return (
                          <>
                            {/* Linha Ketchups */}
                            {activeCategoryTab === 'ketchups' && (
                              <>
                                <thead>
                                  <tr className={`border-b ${isDarkMode ? 'border-white/[0.04] bg-black/40' : 'border-zinc-200 bg-zinc-50'}`}>
                                    <th className="p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest text-zinc-500 uppercase">Embalagem</th>
                                    <th className={`p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest uppercase text-center ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Tradicional</th>
                                    <th className={`p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest uppercase text-center ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>com Goiaba</th>
                                    <th className={`p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest uppercase text-center ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Picante</th>
                                    <th className="p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest text-zinc-500 uppercase text-right">Logística</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr 
                                    onClick={() => setSelectedFormat('bisnaga')}
                                    className={`border-b ${isDarkMode ? 'border-white/[0.06] hover:bg-white/5' : 'border-zinc-200/50 hover:bg-zinc-100/50'} cursor-pointer transition-colors ${selectedFormat === 'bisnaga' ? (isDarkMode ? 'bg-white/10' : 'bg-zinc-100/80') : ''}`}
                                  >
                                    <td className="p-4 sm:p-5 flex items-center gap-3">
                                      <span className="text-[#ff003c]"><Package size={16} /></span>
                                      <span className={`text-xs sm:text-sm font-bold uppercase ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Bisnaga 230g</span>
                                    </td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-right text-[10px] font-space-premium font-black text-[#ff003c]">CX. 06 UN</td>
                                  </tr>
                                  <tr 
                                    onClick={() => setSelectedFormat('bag')}
                                    className={`border-b ${isDarkMode ? 'border-white/[0.06] hover:bg-white/5' : 'border-zinc-200/50 hover:bg-zinc-100/50'} cursor-pointer transition-colors ${selectedFormat === 'bag' ? (isDarkMode ? 'bg-white/10' : 'bg-zinc-100/80') : ''}`}
                                  >
                                    <td className="p-4 sm:p-5 flex items-center gap-3">
                                      <span className="text-[#ff003c]"><Package size={16} /></span>
                                      <span className={`text-xs sm:text-sm font-bold uppercase ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Bag 1,01 kg</span>
                                    </td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-right text-[10px] font-space-premium font-black text-[#ff003c]">CX. 06 UN</td>
                                  </tr>
                                </tbody>
                              </>
                            )}

                            {/* Linha Maioneses */}
                            {activeCategoryTab === 'maioneses' && (
                              <>
                                <thead>
                                  <tr className={`border-b ${isDarkMode ? 'border-white/[0.04] bg-black/40' : 'border-zinc-200 bg-zinc-50'}`}>
                                    <th className="p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest text-zinc-500 uppercase">Embalagem</th>
                                    <th className={`p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest uppercase text-center ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Tradicional</th>
                                    <th className={`p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest uppercase text-center ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Alho</th>
                                    <th className={`p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest uppercase text-center ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Defumada</th>
                                    <th className={`p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest uppercase text-center ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Ervas Finas</th>
                                    <th className={`p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest uppercase text-center ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Tártaro</th>
                                    <th className={`p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest uppercase text-center ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Azeitona Preta</th>
                                    <th className={`p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest uppercase text-center ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Limão Siciliano</th>
                                    <th className="p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest text-zinc-500 uppercase text-right">Logística</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr 
                                    onClick={() => setSelectedFormat('vidro')}
                                    className={`border-b ${isDarkMode ? 'border-white/[0.06] hover:bg-white/5' : 'border-zinc-200/50 hover:bg-zinc-100/50'} cursor-pointer transition-colors ${selectedFormat === 'vidro' ? (isDarkMode ? 'bg-white/10' : 'bg-zinc-100/80') : ''}`}
                                  >
                                    <td className="p-4 sm:p-5 flex items-center gap-3">
                                      <span className="text-[#ff003c]"><Package size={16} /></span>
                                      <span className={`text-xs sm:text-sm font-bold uppercase ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Pote de Vidro</span>
                                    </td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className={`p-4 sm:p-5 text-center ${isDarkMode ? 'text-zinc-700' : 'text-zinc-350'}`}>—</td>
                                    <td className={`p-4 sm:p-5 text-center ${isDarkMode ? 'text-zinc-700' : 'text-zinc-350'}`}>—</td>
                                    <td className={`p-4 sm:p-5 text-center ${isDarkMode ? 'text-zinc-700' : 'text-zinc-350'}`}>—</td>
                                    <td className={`p-4 sm:p-5 text-center ${isDarkMode ? 'text-zinc-700' : 'text-zinc-350'}`}>—</td>
                                    <td className={`p-4 sm:p-5 text-center ${isDarkMode ? 'text-zinc-700' : 'text-zinc-350'}`}>—</td>
                                    <td className={`p-4 sm:p-5 text-center ${isDarkMode ? 'text-zinc-700' : 'text-zinc-350'}`}>—</td>
                                    <td className="p-4 sm:p-5 text-right text-[10px] font-space-premium font-black text-[#ff003c]">CX. 06 UN</td>
                                  </tr>
                                  <tr 
                                    onClick={() => setSelectedFormat('bisnaga')}
                                    className={`border-b ${isDarkMode ? 'border-white/[0.06] hover:bg-white/5' : 'border-zinc-200/50 hover:bg-zinc-100/50'} cursor-pointer transition-colors ${selectedFormat === 'bisnaga' ? (isDarkMode ? 'bg-white/10' : 'bg-zinc-100/80') : ''}`}
                                  >
                                    <td className="p-4 sm:p-5 flex items-center gap-3">
                                      <span className="text-[#ff003c]"><Package size={16} /></span>
                                      <span className={`text-xs sm:text-sm font-bold uppercase ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Bisnaga 230g</span>
                                    </td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-right text-[10px] font-space-premium font-black text-[#ff003c]">CX. 06 UN</td>
                                  </tr>
                                  <tr 
                                    onClick={() => setSelectedFormat('bag')}
                                    className={`border-b ${isDarkMode ? 'border-white/[0.06] hover:bg-white/5' : 'border-zinc-200/50 hover:bg-zinc-100/50'} cursor-pointer transition-colors ${selectedFormat === 'bag' ? (isDarkMode ? 'bg-white/10' : 'bg-zinc-100/80') : ''}`}
                                  >
                                    <td className="p-4 sm:p-5 flex items-center gap-3">
                                      <span className="text-[#ff003c]"><Package size={16} /></span>
                                      <span className={`text-xs sm:text-sm font-bold uppercase ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Bag 1,01 kg</span>
                                    </td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-right text-[10px] font-space-premium font-black text-[#ff003c]">CX. 06 UN</td>
                                  </tr>
                                </tbody>
                              </>
                            )}

                            {/* Linha Barbecue */}
                            {activeCategoryTab === 'barbecues' && (
                              <>
                                <thead>
                                  <tr className={`border-b ${isDarkMode ? 'border-white/[0.04] bg-black/40' : 'border-zinc-200 bg-zinc-50'}`}>
                                    <th className="p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest text-zinc-500 uppercase">Embalagem</th>
                                    <th className={`p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest uppercase text-center ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Tradicional</th>
                                    <th className={`p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest uppercase text-center ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>com Goiaba</th>
                                    <th className={`p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest uppercase text-center ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Picante</th>
                                    <th className="p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest text-zinc-500 uppercase text-right">Logística</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr 
                                    onClick={() => setSelectedFormat('bisnaga')}
                                    className={`border-b ${isDarkMode ? 'border-white/[0.06] hover:bg-white/5' : 'border-zinc-200/50 hover:bg-zinc-100/50'} cursor-pointer transition-colors ${selectedFormat === 'bisnaga' ? (isDarkMode ? 'bg-white/10' : 'bg-zinc-100/80') : ''}`}
                                  >
                                    <td className="p-4 sm:p-5 flex items-center gap-3">
                                      <span className="text-[#ff003c]"><Package size={16} /></span>
                                      <span className={`text-xs sm:text-sm font-bold uppercase ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Bisnaga 230g</span>
                                    </td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-right text-[10px] font-space-premium font-black text-[#ff003c]">CX. 06 UN</td>
                                  </tr>
                                  <tr 
                                    onClick={() => setSelectedFormat('bag')}
                                    className={`border-b ${isDarkMode ? 'border-white/[0.06] hover:bg-white/5' : 'border-zinc-200/50 hover:bg-zinc-100/50'} cursor-pointer transition-colors ${selectedFormat === 'bag' ? (isDarkMode ? 'bg-white/10' : 'bg-zinc-100/80') : ''}`}
                                  >
                                    <td className="p-4 sm:p-5 flex items-center gap-3">
                                      <span className="text-[#ff003c]"><Package size={16} /></span>
                                      <span className={`text-xs sm:text-sm font-bold uppercase ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Bag 1,01 kg</span>
                                    </td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-right text-[10px] font-space-premium font-black text-[#ff003c]">CX. 06 UN</td>
                                  </tr>
                                </tbody>
                              </>
                            )}

                            {/* Linha Mostardas */}
                            {activeCategoryTab === 'mostardas' && (
                              <>
                                <thead>
                                  <tr className={`border-b ${isDarkMode ? 'border-white/[0.04] bg-black/40' : 'border-zinc-200 bg-zinc-50'}`}>
                                    <th className="p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest text-zinc-500 uppercase">Embalagem</th>
                                    <th className={`p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest uppercase text-center ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Tradicional</th>
                                    <th className={`p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest uppercase text-center ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Dijon</th>
                                    <th className={`p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest uppercase text-center ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>com Mel</th>
                                    <th className="p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest text-zinc-500 uppercase text-right">Logística</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr 
                                    onClick={() => setSelectedFormat('bisnaga')}
                                    className={`border-b ${isDarkMode ? 'border-white/[0.06] hover:bg-white/5' : 'border-zinc-200/50 hover:bg-zinc-100/50'} cursor-pointer transition-colors ${selectedFormat === 'bisnaga' ? (isDarkMode ? 'bg-white/10' : 'bg-zinc-100/80') : ''}`}
                                  >
                                    <td className="p-4 sm:p-5 flex items-center gap-3">
                                      <span className="text-[#ff003c]"><Package size={16} /></span>
                                      <span className={`text-xs sm:text-sm font-bold uppercase ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Bisnaga 230g</span>
                                    </td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-right text-[10px] font-space-premium font-black text-[#ff003c]">CX. 06 UN</td>
                                  </tr>
                                  <tr 
                                    onClick={() => setSelectedFormat('bag')}
                                    className={`border-b ${isDarkMode ? 'border-white/[0.06] hover:bg-white/5' : 'border-zinc-200/50 hover:bg-zinc-100/50'} cursor-pointer transition-colors ${selectedFormat === 'bag' ? (isDarkMode ? 'bg-white/10' : 'bg-zinc-100/80') : ''}`}
                                  >
                                    <td className="p-4 sm:p-5 flex items-center gap-3">
                                      <span className="text-[#ff003c]"><Package size={16} /></span>
                                      <span className={`text-xs sm:text-sm font-bold uppercase ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Bag 1,01 kg</span>
                                    </td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-right text-[10px] font-space-premium font-black text-[#ff003c]">CX. 06 UN</td>
                                  </tr>
                                </tbody>
                              </>
                            )}

                            {/* Molhos de Tomate */}
                            {activeCategoryTab === 'tomates' && (
                              <>
                                <thead>
                                  <tr className={`border-b ${isDarkMode ? 'border-white/[0.04] bg-black/40' : 'border-zinc-200 bg-zinc-50'}`}>
                                    <th className="p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest text-zinc-500 uppercase">Embalagem</th>
                                    <th className={`p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest uppercase text-center ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Tradicional ao Sugo</th>
                                    <th className={`p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest uppercase text-center ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Rústico</th>
                                    <th className={`p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest uppercase text-center ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Rústico Ervas & Alho</th>
                                    <th className="p-4 sm:p-5 text-[10px] font-space-premium font-bold tracking-widest text-zinc-500 uppercase text-right">Logística</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr 
                                    onClick={() => setSelectedFormat('vidro')}
                                    className={`border-b ${isDarkMode ? 'border-white/[0.06] hover:bg-white/5' : 'border-zinc-200/50 hover:bg-zinc-100/50'} cursor-pointer transition-colors ${selectedFormat === 'vidro' ? (isDarkMode ? 'bg-white/10' : 'bg-zinc-100/80') : ''}`}
                                  >
                                    <td className="p-4 sm:p-5 flex items-center gap-3">
                                      <span className="text-[#ff003c]"><Package size={16} /></span>
                                      <span className={`text-xs sm:text-sm font-bold uppercase ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Vidro 320g</span>
                                    </td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-right text-[10px] font-space-premium font-black text-[#ff003c]">CX. 06 UN</td>
                                  </tr>
                                  <tr 
                                    onClick={() => setSelectedFormat('bag')}
                                    className={`border-b ${isDarkMode ? 'border-white/[0.06] hover:bg-white/5' : 'border-zinc-200/50 hover:bg-zinc-100/50'} cursor-pointer transition-colors ${selectedFormat === 'bag' ? (isDarkMode ? 'bg-white/10' : 'bg-zinc-100/80') : ''}`}
                                  >
                                    <td className="p-4 sm:p-5 flex items-center gap-3">
                                      <span className="text-[#ff003c]"><Package size={16} /></span>
                                      <span className={`text-xs sm:text-sm font-bold uppercase ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Bag 1,01 kg</span>
                                    </td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-center">{dotElement}</td>
                                    <td className="p-4 sm:p-5 text-right text-[10px] font-space-premium font-black text-[#ff003c]">CX. 06 UN</td>
                                  </tr>
                                </tbody>
                              </>
                            )}
                          </>
                        );
                      })()}

                    </table>
                  </div>
                </div>
                <p className={`text-[10px] ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'} mt-4 italic`}>
                  * Clique em uma linha da tabela para visualizar os detalhes logísticos no painel lateral.
                </p>
              </div>

              {/* Right Column: Interactive Details Card */}
              <div className="lg:col-span-5 w-full scroll-mt-20" id="ficha-logistica">
                <div className={`${isDarkMode ? 'bg-zinc-950/80 border-white/10' : 'bg-white border-zinc-200'} border p-6 sm:p-8 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden text-left min-h-[380px] flex flex-col justify-between`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff003c]/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div>
                    <span className="text-[9px] font-space-premium font-black tracking-widest text-[#ff003c] uppercase block mb-2">
                      Especificação Logística
                    </span>
                    
                    <h3 className={`text-lg sm:text-xl font-bold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-zinc-800'} mb-4 border-b ${isDarkMode ? 'border-white/10' : 'border-zinc-200'} pb-3 flex items-center gap-2`}>
                      <Package className="text-[#ff003c]" size={18} />
                      {B2B_LOGISTICS_SPECS[selectedFormat]?.title || B2B_LOGISTICS_SPECS['bisnaga'].title}
                    </h3>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className={`text-[10px] font-space-premium tracking-wider ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'} uppercase`}>Embalagem de Embarque</h4>
                        <p className={`text-xs font-semibold ${isDarkMode ? 'text-white' : 'text-zinc-800'} mt-0.5`}>{B2B_LOGISTICS_SPECS[selectedFormat]?.boxQty || B2B_LOGISTICS_SPECS['bisnaga'].boxQty}</p>
                      </div>
                      <div>
                        <h4 className={`text-[10px] font-space-premium tracking-wider ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'} uppercase`}>Peso Bruto Estimado</h4>
                        <p className={`text-xs font-semibold ${isDarkMode ? 'text-white' : 'text-zinc-800'} mt-0.5`}>{B2B_LOGISTICS_SPECS[selectedFormat]?.weight || B2B_LOGISTICS_SPECS['bisnaga'].weight}</p>
                      </div>
                      <div>
                        <h4 className={`text-[10px] font-space-premium tracking-wider ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'} uppercase`}>Paletização Padrão</h4>
                        <p className={`text-xs font-semibold ${isDarkMode ? 'text-white' : 'text-zinc-800'} mt-0.5`}>{B2B_LOGISTICS_SPECS[selectedFormat]?.palletQty || B2B_LOGISTICS_SPECS['bisnaga'].palletQty}</p>
                      </div>
                      <div>
                        <h4 className={`text-[10px] font-space-premium tracking-wider ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'} uppercase`}>Destinação Operacional</h4>
                        <p className={`text-xs ${isDarkMode ? 'text-zinc-300' : 'text-zinc-650'} leading-relaxed mt-0.5`}>{B2B_LOGISTICS_SPECS[selectedFormat]?.idealFor || B2B_LOGISTICS_SPECS['bisnaga'].idealFor}</p>
                      </div>
                    </div>
                  </div>

                  <div className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-zinc-50 border-zinc-200'} border rounded-xl p-4 mt-auto`}>
                    <h4 className={`text-[9px] font-space-premium tracking-wider ${isDarkMode ? 'text-yellow-400' : 'text-amber-600'} uppercase mb-2 font-black`}>Vantagens Food Service</h4>
                    <ul className="space-y-1.5">
                      {(B2B_LOGISTICS_SPECS[selectedFormat]?.highlights || B2B_LOGISTICS_SPECS['bisnaga'].highlights).map((h, i) => (
                        <li key={i} className={`text-[10px] ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'} flex items-center gap-2 font-sans-premium`}>
                          <CheckCircle2 size={10} className="text-[#ff003c] flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lead capture form specifically for B2B proposal request */}
          <div className={`${isDarkMode ? 'glass-premium border-white/[0.04]' : 'bg-white border-zinc-200 shadow-xl'} p-6 sm:p-12 rounded-2xl sm:rounded-3xl border relative overflow-hidden text-left max-w-4xl mx-auto`} ref={formRef}>
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ff003c] to-transparent"></div>
            
            {!commercialSubmitted ? (
              <form onSubmit={handleCommercialSubmit} className="space-y-6">
                <div className="space-y-2">
                  <h3 className={`font-space-premium font-black text-lg uppercase ${isDarkMode ? 'text-white' : 'text-zinc-800'} tracking-widest`}>Receber Proposta e Amostras B2B</h3>
                  <p className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'} font-sans-premium leading-relaxed`}>
                    Preencha os dados do seu negócio abaixo. Nossa equipe comercial validará seu CNPJ e entrará em contato para enviar tabelas de preços corporativas com desconto escalável.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Business Name */}
                  <div className={`form-input-wrap ${activeInput === 'businessName' ? 'active' : ''}`}>
                    <label className="form-label">Razão Social / Nome Fantasia *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Burguer House Ltda"
                      className={`w-full bg-transparent border-none outline-none py-1.5 text-xs ${isDarkMode ? 'text-white placeholder-zinc-700' : 'text-zinc-800 placeholder-zinc-400'} font-sans-premium`}
                      value={formData.businessName}
                      onFocus={() => setActiveInput('businessName')}
                      onBlur={() => setActiveInput(null)}
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    />
                  </div>

                  {/* CNPJ */}
                  <div className={`form-input-wrap ${activeInput === 'cnpj' ? 'active' : ''}`}>
                    <label className="form-label">CNPJ *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="00.000.000/0000-00"
                      className={`w-full bg-transparent border-none outline-none py-1.5 text-xs ${isDarkMode ? 'text-white placeholder-zinc-700' : 'text-zinc-800 placeholder-zinc-400'} font-sans-premium`}
                      value={formData.cnpj}
                      onFocus={() => setActiveInput('cnpj')}
                      onBlur={() => setActiveInput(null)}
                      onChange={handleCnpjChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Name */}
                  <div className={`form-input-wrap ${activeInput === 'contactName' ? 'active' : ''}`}>
                    <label className="form-label">Nome do Comprador / Contato *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Carlos Eduardo"
                      className={`w-full bg-transparent border-none outline-none py-1.5 text-xs ${isDarkMode ? 'text-white placeholder-zinc-700' : 'text-zinc-800 placeholder-zinc-400'} font-sans-premium`}
                      value={formData.contactName}
                      onFocus={() => setActiveInput('contactName')}
                      onBlur={() => setActiveInput(null)}
                      onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                    />
                  </div>

                  {/* WhatsApp */}
                  <div className={`form-input-wrap ${activeInput === 'phone' ? 'active' : ''}`}>
                    <label className="form-label">WhatsApp Comercial *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="(11) 99999-9999"
                      className={`w-full bg-transparent border-none outline-none py-1.5 text-xs ${isDarkMode ? 'text-white placeholder-zinc-700' : 'text-zinc-800 placeholder-zinc-400'} font-sans-premium`}
                      value={formData.phone}
                      onFocus={() => setActiveInput('phone')}
                      onBlur={() => setActiveInput(null)}
                      onChange={handlePhoneChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Email */}
                  <div className={`form-input-wrap ${activeInput === 'email' ? 'active' : ''} md:col-span-1`}>
                    <label className="form-label">E-mail Corporativo</label>
                    <input 
                      type="email" 
                      placeholder="compras@suaempresa.com"
                      className={`w-full bg-transparent border-none outline-none py-1.5 text-xs ${isDarkMode ? 'text-white placeholder-zinc-700' : 'text-zinc-800 placeholder-zinc-400'} font-sans-premium`}
                      value={formData.email}
                      onFocus={() => setActiveInput('email')}
                      onBlur={() => setActiveInput(null)}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  {/* City */}
                  <div className={`form-input-wrap ${activeInput === 'city' ? 'active' : ''} md:col-span-1`}>
                    <label className="form-label">Cidade *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: São Paulo"
                      className={`w-full bg-transparent border-none outline-none py-1.5 text-xs ${isDarkMode ? 'text-white placeholder-zinc-700' : 'text-zinc-800 placeholder-zinc-400'} font-sans-premium`}
                      value={formData.city}
                      onFocus={() => setActiveInput('city')}
                      onBlur={() => setActiveInput(null)}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                  </div>

                  {/* State */}
                  <div className={`form-input-wrap ${activeInput === 'state' ? 'active' : ''} md:col-span-1`}>
                    <label className="form-label">UF *</label>
                    <input 
                      type="text" 
                      required
                      maxLength={2}
                      placeholder="SP"
                      className={`w-full bg-transparent border-none outline-none py-1.5 text-xs ${isDarkMode ? 'text-white placeholder-zinc-700' : 'text-zinc-800 placeholder-zinc-400'} font-sans-premium uppercase`}
                      value={formData.state}
                      onFocus={() => setActiveInput('state')}
                      onBlur={() => setActiveInput(null)}
                      onChange={(e) => setFormData({...formData, state: e.target.value.toUpperCase()})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Business Type */}
                  <div className={`form-input-wrap ${activeInput === 'businessType' ? 'active' : ''}`}>
                    <label className="form-label">Tipo de Estabelecimento *</label>
                    <select
                      required
                      className={`w-full bg-transparent border-none outline-none py-1 text-xs ${isDarkMode ? 'text-white bg-zinc-950 text-zinc-200' : 'text-zinc-800 bg-[#faf7ed] text-zinc-700'} font-sans-premium cursor-pointer`}
                      value={formData.businessType}
                      onFocus={() => setActiveInput('businessType')}
                      onBlur={() => setActiveInput(null)}
                      onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                    >
                      <option value="hamburgueria">Hamburgueria / Lanchonete</option>
                      <option value="restaurante">Restaurante / Cozinha de Autor</option>
                      <option value="pizzaria">Pizzaria / Trattoria</option>
                      <option value="distribuidor">Distribuidor / Atacadista</option>
                      <option value="redes">Grande Rede / Franquia</option>
                      <option value="emporio">Empório / Supermercado</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>

                  {/* Monthly Consumption */}
                  <div className={`form-input-wrap ${activeInput === 'consumption' ? 'active' : ''}`}>
                    <label className="form-label">Consumo Mensal Estimado de Molhos *</label>
                    <select
                      required
                      className={`w-full bg-transparent border-none outline-none py-1 text-xs ${isDarkMode ? 'text-white bg-zinc-950 text-zinc-200' : 'text-zinc-800 bg-[#faf7ed] text-zinc-700'} font-sans-premium cursor-pointer`}
                      value={formData.consumption}
                      onFocus={() => setActiveInput('consumption')}
                      onBlur={() => setActiveInput(null)}
                      onChange={(e) => setFormData({...formData, consumption: e.target.value})}
                    >
                      <option value="50">Até 50 kg / mês</option>
                      <option value="100">De 50 kg a 100 kg / mês</option>
                      <option value="300">De 100 kg a 500 kg / mês (Alta Demanda)</option>
                      <option value="500">Mais de 500 kg / mês (Grande Giro)</option>
                    </select>
                  </div>
                </div>

                {/* LGPD Consent Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="lgpdConsent"
                    checked={lgpdConsent}
                    onChange={(e) => setLgpdConsent(e.target.checked)}
                    className="mt-1 flex-shrink-0 accent-[#ff003c] cursor-pointer"
                    required
                  />
                  <label htmlFor="lgpdConsent" className={`text-[10px] font-sans-premium leading-relaxed cursor-pointer select-none ${isDarkMode ? 'text-zinc-550' : 'text-zinc-600'}`}>
                    Declaro que li e concordo com os <span onClick={() => setPrivacyModalOpen(true)} className="text-[#ff003c] underline hover:text-[#d90432] cursor-pointer">Termos de Uso</span> e a <span onClick={() => setPrivacyModalOpen(true)} className="text-[#ff003c] underline hover:text-[#d90432] cursor-pointer">Política de Privacidade</span> da Dubola Alimentos e aceito o compartilhamento dos dados sob a LGPD para recebimento de propostas comerciais de preços e amostras por WhatsApp e e-mail.
                  </label>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="flex-1 bg-[#ff003c] hover:bg-[#d90432] text-white py-4.5 rounded-2xl font-space-premium font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_15px_30px_rgba(255,0,60,0.25)]"
                  >
                    <Phone size={14} /> Falar com Equipe de Vendas (WhatsApp)
                  </button>
                </div>

              </form>
            ) : (
              /* Success confirmation */
              <div className="py-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <Check size={28} className="stroke-[3px]" />
                </div>
                
                <div className="space-y-2">
                  <h4 className={`font-space-premium font-black text-lg uppercase ${isDarkMode ? 'text-white' : 'text-zinc-800'} tracking-widest`}>
                    Proposta Comercial Solicitada!
                  </h4>
                  <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-zinc-550'} font-sans-premium leading-relaxed max-w-xs mx-auto`}>
                    Nossa equipe comercial já recebeu os seus dados e abrirá o atendimento comercial no seu WhatsApp para alinhar o envio de amostras.
                  </p>
                </div>

                <div className={`${isDarkMode ? 'bg-zinc-950/80 border-white/[0.04]' : 'bg-zinc-50 border-zinc-200'} border p-5 rounded-2xl text-left space-y-3 font-space-premium text-[11px] max-w-md mx-auto`}>
                  <div className={`flex justify-between border-b ${isDarkMode ? 'border-zinc-900' : 'border-zinc-200'} pb-2 text-zinc-500 uppercase font-bold tracking-wider`}>
                    <span>Solicitação Recebida</span>
                    <span className="text-[#ff003c]">Contato Comercial</span>
                  </div>
                  <p className={`${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}><strong className={`${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Empresa:</strong> {formData.businessName}</p>
                  <p className={`${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}><strong className={`${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>CNPJ:</strong> {formData.cnpj}</p>
                  <p className={`${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}><strong className={`${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Contato:</strong> {formData.contactName}</p>
                  <p className={`${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}><strong className={`${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>Localidade:</strong> {formData.city} - {formData.state}</p>
                </div>

                <button
                  onClick={() => setCommercialSubmitted(false)}
                  className="text-[9px] font-space-premium font-bold text-[#ff003c] uppercase hover:underline tracking-widest"
                >
                  Enviar outra solicitação
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ── B2B TESTIMONIALS SECTION ── */}
      <section className={`py-24 border-t ${isDarkMode ? 'border-white/[0.04] bg-black' : 'border-zinc-200/60 bg-[#fbfbfa]'} relative z-10 px-6 sm:px-12`}>
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center space-y-4">
            <p className="text-[9px] font-space-premium font-bold tracking-[0.25em] text-[#ff003c] uppercase">CASOS DE SUCESSO</p>
            <h2 className={`font-display text-2xl sm:text-4xl font-black uppercase ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Dubola nas Cozinhas de Alto Giro</h2>
            <div className="w-12 h-1 bg-[#ff003c] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`${isDarkMode ? 'glass-premium border-white/[0.03]' : 'bg-white border-zinc-200 shadow-sm'} p-8 rounded-3xl border text-left flex flex-col justify-between min-h-[220px]`}>
              <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-zinc-650'} leading-relaxed font-sans-premium italic`}>
                "Substituímos toda a nossa linha de mostardas e barbecues industriais pela Dubola. A estabilidade térmica deles na chapa é bizarra. Não separa água e a viscosidade é perfeita nas bombas automáticas. Clientes notaram o upgrade imediatamente."
              </p>
              <div className={`pt-6 border-t ${isDarkMode ? 'border-zinc-900' : 'border-zinc-150'} mt-6 flex items-center gap-3`}>
                <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'} flex items-center justify-center font-bold text-[10px] ${isDarkMode ? 'text-white' : 'text-zinc-700'}`}>
                  MB
                </div>
                <div>
                  <h4 className={`font-space-premium font-bold text-[11px] ${isDarkMode ? 'text-white' : 'text-zinc-800'} uppercase tracking-wider`}>Marcio Bruno</h4>
                  <p className={`text-[9px] ${isDarkMode ? 'text-zinc-550' : 'text-zinc-500'} font-sans-premium`}>Chef Proprietário - Monster Burger</p>
                </div>
              </div>
            </div>

            <div className={`${isDarkMode ? 'glass-premium border-white/[0.03]' : 'bg-white border-zinc-200 shadow-sm'} p-8 rounded-3xl border text-left flex flex-col justify-between min-h-[220px]`}>
              <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-zinc-650'} leading-relaxed font-sans-premium italic`}>
                "Trabalhamos com buffet corporativo de larga escala. O custo-benefício dos baldes de 5kg aliado ao selo Clean Label nos permitiu elevar o tíquete médio dos nossos contratos de catering. A maionese verde é um estouro."
              </p>
              <div className={`pt-6 border-t ${isDarkMode ? 'border-zinc-900' : 'border-zinc-150'} mt-6 flex items-center gap-3`}>
                <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'} flex items-center justify-center font-bold text-[10px] ${isDarkMode ? 'text-white' : 'text-zinc-700'}`}>
                  LD
                </div>
                <div>
                  <h4 className={`font-space-premium font-bold text-[11px] ${isDarkMode ? 'text-white' : 'text-zinc-800'} uppercase tracking-wider`}>Lúcia Dornelles</h4>
                  <p className={`text-[9px] ${isDarkMode ? 'text-zinc-550' : 'text-zinc-500'} font-sans-premium`}>Diretora de Logística - Express Catering</p>
                </div>
              </div>
            </div>

            <div className={`${isDarkMode ? 'glass-premium border-white/[0.03]' : 'bg-white border-zinc-200 shadow-sm'} p-8 rounded-3xl border text-left flex flex-col justify-between min-h-[220px]`}>
              <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-zinc-650'} leading-relaxed font-sans-premium italic`}>
                "Nossa rede de pizzarias artesanais usa o Molho Rústico de Tomate da Dubola como base padrão. Ele vem com pedaços suculentos no ponto ideal de cozimento e acidez equilibrada, poupando dezenas de horas de preparo da nossa equipe."
              </p>
              <div className={`pt-6 border-t ${isDarkMode ? 'border-zinc-900' : 'border-zinc-150'} mt-6 flex items-center gap-3`}>
                <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'} flex items-center justify-center font-bold text-[10px] ${isDarkMode ? 'text-white' : 'text-zinc-700'}`}>
                  TC
                </div>
                <div>
                  <h4 className={`font-space-premium font-bold text-[11px] ${isDarkMode ? 'text-white' : 'text-zinc-800'} uppercase tracking-wider`}>Thiago Castanho</h4>
                  <p className={`text-[9px] ${isDarkMode ? 'text-zinc-550' : 'text-zinc-500'} font-sans-premium`}>Sócio Fundador - Trattoria 98</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <DubolaFooter forceLight={!isDarkMode} />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/5521998487779?text=Ol%C3%A1%21%20Gostaria%20de%20falar%20com%20o%20setor%20comercial%20da%20Dubola%20Alimentos."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-4.5 rounded-full shadow-[0_4px_25px_rgba(37,211,102,0.35)] hover:shadow-[0_8px_35px_rgba(37,211,102,0.55)] hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center gap-2"
        aria-label="Fale conosco no WhatsApp"
      >
        <svg
          className="w-5.5 h-5.5 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-300 ease-out font-space-premium font-bold text-[10px] tracking-wider uppercase whitespace-nowrap">
          Fale Conosco
        </span>
      </a>
      <CookieBanner isDarkMode={isDarkMode} />

      {/* Privacy Policy & Terms of Use Modal */}
      {privacyModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setPrivacyModalOpen(false)}
          />
          
          {/* Modal Card */}
          <div className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 border shadow-2xl overflow-y-auto max-h-[85vh] transition-colors ${
            isDarkMode 
              ? 'bg-zinc-950/95 border-white/[0.08] text-zinc-300' 
              : 'bg-[#faf7ed]/95 border-[#eae1c0] text-zinc-800'
          }`}>
            <button 
              onClick={() => setPrivacyModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 transition-colors"
            >
              <X size={18} className={isDarkMode ? 'text-zinc-400' : 'text-zinc-600'} />
            </button>

            <h3 className={`font-display text-xl sm:text-2xl font-black uppercase mb-6 ${
              isDarkMode ? 'text-white' : 'text-zinc-900'
            }`}>
              Termos de Uso & <span className="text-[#ff003c]">Privacidade</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm leading-relaxed font-sans-premium">
              <p>
                A <strong>Dubola Alimentos</strong> preza pela segurança, confidencialidade e privacidade dos dados de seus parceiros comerciais. Em total conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD)</strong> - Lei nº 13.709/18, apresentamos abaixo como coletamos, armazenamos e tratamos suas informações.
              </p>
              
              <div className="space-y-3">
                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-[#f7f0d5]/40 border-[#eae1c0]'}`}>
                  <h4 className="font-space-premium font-bold uppercase text-[10px] tracking-wider text-[#ff003c] mb-1">
                    1. Coleta e Finalidade dos Dados
                  </h4>
                  <p className="text-[11px] sm:text-xs">
                    Os dados informados no formulário (Razão Social, CNPJ, Nome, E-mail, WhatsApp, Cidade, Estado, Segmento e Consumo Mensal) serão utilizados com a finalidade exclusiva de qualificar o perfil da sua empresa, calcular o volume de consumo para faixas de preços especiais, enviar propostas de catálogos e entrar em contato comercial via WhatsApp ou e-mail.
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-[#f7f0d5]/40 border-[#eae1c0]'}`}>
                  <h4 className="font-space-premium font-bold uppercase text-[10px] tracking-wider text-[#ff003c] mb-1">
                    2. Armazenamento Seguro e Consentimento
                  </h4>
                  <p className="text-[11px] sm:text-xs">
                    Ao marcar a caixa de seleção e enviar seus dados, você fornece o consentimento explícito e de livre vontade. As informações fornecidas são gravadas de forma criptografada em nosso banco de dados hospedado de forma segura no Supabase e integradas aos nossos fluxos de atendimento comercial (CRM). Não vendemos nem compartilhamos seus dados com terceiros.
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-[#f7f0d5]/40 border-[#eae1c0]'}`}>
                  <h4 className="font-space-premium font-bold uppercase text-[10px] tracking-wider text-[#ff003c] mb-1">
                    3. Direitos do Usuário (Art. 18 da LGPD)
                  </h4>
                  <p className="text-[11px] sm:text-xs">
                    Você possui total direito de requerer o acesso, retificação, alteração ou exclusão completa de todos os seus dados coletados pela Dubola Alimentos a qualquer momento. Para exercer este direito, basta solicitar diretamente ao consultor comercial que iniciar o contato com você pelo WhatsApp ou enviar uma notificação para <strong>contato@dubola.com.br</strong>.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setPrivacyModalOpen(false)}
                  className="bg-[#ff003c] hover:bg-[#d90432] text-white font-space-premium font-bold uppercase tracking-widest text-[10px] px-6 py-3 rounded-xl transition-all"
                >
                  Entendi e Aceito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
