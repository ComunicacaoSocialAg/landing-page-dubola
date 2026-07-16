import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Users,
  UtensilsCrossed,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';

export default function DubolaHeader({ b2bMode, setB2bMode, forceLight, isDarkMode, toggleTheme }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll for header background transitions
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/site-preview';
  const isKetchups = location.pathname === '/ketchups';
  const isMaioneses = location.pathname === '/maioneses';
  const isBarbecues = location.pathname === '/barbecues';
  const isMostardas = location.pathname === '/mostardas';
  const isTomates = location.pathname === '/molhos-de-tomate';
  const isCatalog = location.pathname === '/linha-dubola';
  const isPresentation = location.pathname === '/apresentacao-comercial';
  const isProductDetail = location.pathname.startsWith('/produto/');
  const isB2bPage = location.pathname === '/' || location.pathname === '/vendas-b2b';
  const isB2bMode = location.pathname === '/' || location.pathname === '/vendas-b2b';

  // Handle hash scrolling from other pages
  const handleHashLink = (e, hash) => {
    if (!isHome) {
      e.preventDefault();
      navigate('/' + hash);
      // Wait for navigation to complete then scroll
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  // Determine page-specific links to display in sub-nav or main-nav
  const renderAnchorLinks = () => {
    if (isB2bPage) {
      return (
        <>
          <a href="#beneficios" className="hover:text-white transition-colors">DIFERENCIAIS</a>
          <a href="#catalogo" className="hover:text-white transition-colors">CATÁLOGO B2B</a>
        </>
      );
    }
    if (isHome) {
      return (
        <>
          <a href="#seletor-fome" className="hover:text-[#ff003c] transition-colors flex items-center gap-1">
            <UtensilsCrossed size={11} /> SELETOR DE FOME
          </a>
          <Link to="/vendas-b2b" className="hover:text-[#ff003c] transition-colors flex items-center gap-1.5">
            <Sparkles size={11} className="animate-pulse text-[#ff003c]" /> FOOD SERVICE
          </Link>
        </>
      );
    }
    if (isKetchups) {
      return (
        <>
          <a href="#sabores" className="hover:text-white transition-colors">SABORES</a>
          <a href="#receitas" className="hover:text-white transition-colors">RECEITAS</a>
          <a href="#onde-comprar" className="hover:text-white transition-colors">ONDE COMPRAR</a>
        </>
      );
    }
    if (isMaioneses) {
      return (
        <>
          <a href="#harmonizacao" className="hover:text-orange-400 transition-colors">HARMONIZAÇÃO</a>
          <a href="#ingredientes" className="hover:text-orange-400 transition-colors">INGREDIENTES</a>
          <a href="#tabela" className="hover:text-orange-400 transition-colors">NUTRICIONAL</a>
          <a href="#onde-comprar" className="hover:text-orange-400 transition-colors">ONDE COMPRAR</a>
        </>
      );
    }
    if (isBarbecues) {
      return (
        <>
          <a href="#sabores" className="hover:text-white transition-colors">SABORES</a>
          <a href="#receitas" className="hover:text-white transition-colors">RECEITAS</a>
          <a href="#onde-comprar" className="hover:text-white transition-colors">ONDE COMPRAR</a>
        </>
      );
    }
    if (isMostardas) {
      return (
        <>
          <a href="#sabores" className="hover:text-white transition-colors">SABORES</a>
          <a href="#receitas" className="hover:text-white transition-colors">RECEITAS</a>
          <a href="#onde-comprar" className="hover:text-white transition-colors">ONDE COMPRAR</a>
        </>
      );
    }
    if (isTomates) {
      return (
        <>
          <a href="#sabores" className="hover:text-white transition-colors">SABORES</a>
          <a href="#receitas" className="hover:text-white transition-colors">RECEITAS</a>
          <a href="#onde-comprar" className="hover:text-white transition-colors">ONDE COMPRAR</a>
        </>
      );
    }
    if (isProductDetail) {
      return (
        <>
          <a href="#especificacoes" className="hover:text-white transition-colors">ESPECIFICAÇÕES</a>
          <a href="#receita" className="hover:text-white transition-colors">RECEITA CHEF</a>
          {b2bMode && (
            <a href="#b2b-form" className="hover:text-white transition-colors text-[#ff003c]">
              AMOSTRAS
            </a>
          )}
        </>
      );
    }
    return null;
  };

  const isLight = forceLight || location.pathname === '/claro';
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 px-6 sm:px-12 py-3 flex items-center justify-between border-b transition-all duration-300 ${
        isLight
          ? scrolled 
            ? 'bg-[#faf7ed]/95 backdrop-blur-xl border-[#eae1c0] shadow-sm' 
            : 'bg-[#faf7ed]/75 backdrop-blur-md border-[#eae1c0]/50'
          : scrolled 
            ? 'bg-black/90 backdrop-blur-xl border-white/[0.08] shadow-lg' 
            : 'bg-black/60 backdrop-blur-md border-white/[0.04]'
      }`}
    >
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-3 group relative z-50">
        <img 
          src="/Logo-Dubola.png" 
          alt="DUBOLA Logo" 
          className={`h-10 sm:h-12 w-auto object-contain logo-glow transition-transform duration-500 group-hover:scale-[1.02] ${isLight ? 'brightness-[0.15]' : ''}`} 
        />
        <span className={`hidden lg:inline-block text-[8px] font-space-premium font-bold tracking-[0.2em] border px-2 py-0.5 rounded-full uppercase ml-1 ${isLight ? 'border-[#ff003c]/40 text-[#ff003c] bg-[#ff003c]/5' : 'border-[#ff003c]/30 text-[#ff003c] bg-[#ff003c]/5'}`}>
          EST. 1998
        </span>
      </Link>

      <nav className={`hidden xl:flex items-center gap-6 lg:gap-8 text-[10px] font-space-premium font-bold tracking-widest ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
        {isB2bMode ? (
          <>
            <a href="#beneficios" className={`transition-colors ${isLight ? 'text-zinc-700 hover:text-[#ff003c]' : 'text-zinc-300 hover:text-white'}`}>DIFERENCIAIS</a>
            <a href="#catalogo" className={`transition-colors ${isLight ? 'text-zinc-700 hover:text-[#ff003c]' : 'text-zinc-300 hover:text-white'}`}>CATÁLOGO B2B</a>
            <a href="#logistica" className={`transition-colors ${isLight ? 'text-zinc-700 hover:text-[#ff003c]' : 'text-zinc-300 hover:text-white'}`}>LOGÍSTICA</a>
            <a href="#onde-comprar" className="hover:text-[#eab308] hover:scale-[1.02] transition-all flex items-center gap-1.5 font-black uppercase text-[#eab308]">
              <Sparkles size={11} className="animate-pulse text-[#eab308]" /> Onde Comprar (Varejo)
            </a>
          </>
        ) : (
          <>
            <Link 
              to="/" 
              className={`hover:text-white transition-colors ${isHome ? 'text-[#ff003c]' : ''}`}
            >
              INÍCIO
            </Link>
            <Link 
              to="/ketchups" 
              className={`hover:text-white transition-colors ${isKetchups ? 'text-red-500' : ''}`}
            >
              KETCHUPS
            </Link>
            <Link 
              to="/maioneses" 
              className={`hover:text-white transition-colors ${isMaioneses ? 'text-blue-500' : ''}`}
            >
              MAIONESES
            </Link>
            <Link 
              to="/barbecues" 
              className={`hover:text-white transition-colors ${isBarbecues ? 'text-amber-500' : ''}`}
            >
              BARBECUES
            </Link>
            <Link 
              to="/mostardas" 
              className={`hover:text-white transition-colors ${isMostardas ? 'text-yellow-500' : ''}`}
            >
              MOSTARDAS
            </Link>
            <Link 
              to="/molhos-de-tomate" 
              className={`hover:text-white transition-colors ${isTomates ? 'text-orange-500' : ''}`}
            >
              TOMATES
            </Link>
            
            <div className="w-px h-4 bg-white/20 self-center mx-1" />
            
            <Link 
              to="/linha-dubola" 
              className={`hover:text-white transition-colors ${isCatalog ? 'text-[#ff003c]' : ''}`}
            >
              LINHA COMPLETA
            </Link>
            <Link 
              to="/apresentacao-comercial" 
              className={`hover:text-white transition-colors ${isPresentation ? 'text-[#ff003c]' : ''}`}
            >
              APRESENTAÇÃO B2B
            </Link>

            {/* Dynamic anchor links based on current view context */}
            {renderAnchorLinks()}

            {/* Non-home context hash helpers */}
            {!isHome && !isB2bPage && (
              <>
                <a 
                  href="#seletor-fome" 
                  onClick={(e) => handleHashLink(e, '#seletor-fome')}
                  className="hover:text-[#ff003c] transition-colors flex items-center gap-1"
                >
                  <UtensilsCrossed size={11} /> SELETOR DE FOME
                </a>
                <Link 
                  to="/vendas-b2b" 
                  className="hover:text-[#ff003c] transition-colors flex items-center gap-1.5"
                >
                  <Sparkles size={11} className="text-[#ff003c]" /> FOOD SERVICE
                </Link>
              </>
            )}
          </>
        )}
      </nav>


      {/* Right Controls Area: B2C/B2B Switch OR Commercial Form Link */}
      <div className="hidden sm:flex items-center gap-4 z-50">
        {toggleTheme && (
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl border transition-all ${
              isLight
                ? 'border-zinc-200 bg-white text-zinc-650 hover:bg-zinc-100/50 shadow-sm'
                : 'border-white/[0.06] bg-zinc-950 text-zinc-400 hover:text-white'
            }`}
            aria-label="Alternar Tema"
            type="button"
          >
            {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        )}

        {setB2bMode !== undefined ? (
          <div className="relative flex items-center bg-zinc-900/80 border border-white/[0.06] rounded-xl p-1 gap-1">
            <button
              onClick={() => setB2bMode(false)}
              className={`px-3 py-1.5 rounded-lg text-[8px] font-space-premium font-black tracking-widest uppercase transition-all ${
                !b2bMode
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              B2C
            </button>
            <button
              onClick={() => setB2bMode(true)}
              className={`px-3 py-1.5 rounded-lg text-[8px] font-space-premium font-black tracking-widest uppercase transition-all ${
                b2bMode
                  ? 'bg-[#ff003c] text-white shadow-[0_0_12px_rgba(255,0,60,0.3)]'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              B2B
            </button>
          </div>
        ) : (
          isB2bMode ? (
            <a 
              href="https://wa.me/5521998487779?text=Olá!%20Gostaria%20de%20falar%20com%20a%20equipe%20de%20vendas%20da%20Dubola%20Alimentos." 
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[8px] font-space-premium font-bold tracking-widest border px-4 py-2.5 rounded-xl transition-all uppercase ${
                isLight
                  ? 'border-[#ff003c]/40 hover:border-[#ff003c] text-[#ff003c] bg-[#ff003c]/5 hover:bg-[#ff003c]/10'
                  : 'border-[#ff003c]/40 hover:border-[#ff003c]/60 text-white bg-[#ff003c]/10 hover:bg-[#ff003c]/20'
              }`}
            >
              Fale com Vendas
            </a>
          ) : (
            <Link 
              to="/vendas-b2b" 
              className={`text-[8px] font-space-premium font-bold tracking-widest border border-white/20 hover:border-[#ff003c]/60 text-white bg-white/5 hover:bg-[#ff003c]/15 px-4 py-2.5 rounded-xl transition-all ${isB2bPage ? 'border-[#ff003c]/60 bg-[#ff003c]/10' : ''}`}
            >
              ÁREA COMERCIAL B2B
            </Link>
          )
        )}
      </div>

      {/* Mobile Menu & Controls */}
      <div className="flex items-center gap-2 xl:hidden z-50">
        {toggleTheme && (
          <button
            onClick={toggleTheme}
            className={`sm:hidden p-2 rounded-xl border transition-all ${
              isLight
                ? 'border-zinc-200 bg-white text-zinc-650 hover:bg-zinc-100/50 shadow-sm'
                : 'border-white/[0.06] bg-zinc-950 text-zinc-400 hover:text-white'
            }`}
            aria-label="Alternar Tema"
            type="button"
          >
            {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        )}
        <button 
          className={`p-2 transition-colors ${isLight ? 'text-zinc-800 hover:text-zinc-650' : 'text-white hover:text-zinc-300'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <div 
        className={`fixed inset-0 bg-black/98 backdrop-blur-2xl flex flex-col justify-center px-8 transition-all duration-300 xl:hidden z-40 ${
          mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-6 text-sm font-space-premium font-bold tracking-widest text-left">
          {isB2bMode ? (
            <>
              <a href="#beneficios" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white py-2 border-b border-zinc-900">
                DIFERENCIAIS B2B
              </a>
              <a href="#catalogo" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white py-2 border-b border-zinc-900">
                CATÁLOGO B2B
              </a>
              <a href="#logistica" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white py-2 border-b border-zinc-900">
                LOGÍSTICA B2B
              </a>
              <a href="#contato" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white py-2 border-b border-zinc-900">
                FALE CONOSCO
              </a>
              <a 
                href="https://wa.me/5521998487779?text=Olá!%20Gostaria%20de%20falar%20com%20a%20equipe%20de%20vendas%20da%20Dubola%20Alimentos." 
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)} 
                className="text-[#ff003c] hover:text-white py-2 border-b border-zinc-900 flex items-center gap-1.5"
              >
                FALE COM VENDAS (WHATSAPP)
              </a>
            </>
          ) : (
            <>
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white py-2 border-b border-zinc-900">
                INÍCIO
              </Link>
              <Link to="/ketchups" onClick={() => setMobileMenuOpen(false)} className="text-red-500 hover:text-white py-2 border-b border-zinc-900">
                KETCHUPS
              </Link>
              <Link to="/maioneses" onClick={() => setMobileMenuOpen(false)} className="text-blue-500 hover:text-white py-2 border-b border-zinc-900">
                MAIONESES
              </Link>
              <Link to="/barbecues" onClick={() => setMobileMenuOpen(false)} className="text-amber-500 hover:text-white py-2 border-b border-zinc-900">
                BARBECUES
              </Link>
              <Link to="/mostardas" onClick={() => setMobileMenuOpen(false)} className="text-yellow-500 hover:text-white py-2 border-b border-zinc-900">
                MOSTARDAS
              </Link>
              <Link to="/molhos-de-tomate" onClick={() => setMobileMenuOpen(false)} className="text-orange-500 hover:text-white py-2 border-b border-zinc-900">
                TOMATES
              </Link>
              <Link to="/linha-dubola" onClick={() => setMobileMenuOpen(false)} className="text-[#ff003c] hover:text-white py-2 border-b border-zinc-900">
                LINHA COMPLETA
              </Link>
              <Link to="/apresentacao-comercial" onClick={() => setMobileMenuOpen(false)} className="text-[#ff003c] hover:text-white py-2 border-b border-zinc-900">
                APRESENTAÇÃO B2B
              </Link>
              <Link to="/vendas-b2b" onClick={() => setMobileMenuOpen(false)} className="text-amber-500 hover:text-white py-2 border-b border-zinc-900">
                ÁREA COMERCIAL (B2B)
              </Link>
            </>
          )}

          {/* Mobile context indicators */}
          {setB2bMode !== undefined && (
            <div className="flex items-center gap-3 mt-4">
              <span className="text-[10px] text-zinc-450 uppercase">Visualização:</span>
              <button 
                onClick={() => setB2bMode(!b2bMode)}
                className={`text-[9px] px-4 py-2 border rounded-xl font-bold tracking-wider ${
                  b2bMode ? 'border-[#ff003c] text-white bg-[#ff003c]/10' : 'border-zinc-800 text-zinc-400 bg-zinc-900/40'
                }`}
              >
                {b2bMode ? 'Área Food Service (B2B)' : 'Área Consumidor (B2C)'}
              </button>
            </div>
          )}

          {toggleTheme && (
            <div className="flex items-center gap-3 mt-4">
              <span className="text-[10px] text-zinc-450 uppercase">Visual:</span>
              <button
                onClick={() => {
                  toggleTheme();
                  setMobileMenuOpen(false);
                }}
                className="text-[9px] px-4 py-2 border border-zinc-800 rounded-xl font-bold tracking-wider text-zinc-400 bg-zinc-900/40 flex items-center gap-1.5"
                type="button"
              >
                {isDarkMode ? <Sun size={11} /> : <Moon size={11} />}
                {isDarkMode ? 'Tema Claro' : 'Tema Escuro'}
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
