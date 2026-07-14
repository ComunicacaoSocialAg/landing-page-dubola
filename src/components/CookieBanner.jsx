import { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieBanner({ onAcceptTracking, isDarkMode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Verificar se o consentimento já foi salvo
    const consent = localStorage.getItem('dubola_cookie_consent');
    if (!consent) {
      // Pequeno atraso para a entrada elegante do banner
      const timer = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(timer);
    } else if (consent === 'accepted') {
      if (onAcceptTracking) onAcceptTracking();
    }
  }, [onAcceptTracking]);

  const handleAccept = () => {
    localStorage.setItem('dubola_cookie_consent', 'accepted');
    setVisible(false);
    if (onAcceptTracking) onAcceptTracking();
  };

  const handleDecline = () => {
    localStorage.setItem('dubola_cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50 animate-fadeIn duration-500">
      <div 
        className={`p-5 rounded-2xl border backdrop-blur-xl shadow-2xl flex flex-col gap-4 text-left transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-zinc-950/95 border-white/[0.08] text-white' 
            : 'bg-white/95 border-[#eae1c0] text-zinc-800'
        }`}
      >
        <div className="flex items-start gap-3 justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-[#ff003c]/10 text-[#ff003c]' : 'bg-[#ff003c]/5 text-[#ff003c]'}`}>
              <ShieldCheck size={18} />
            </div>
            <h5 className="font-space-premium font-bold text-[10px] tracking-widest uppercase">
              Privacidade & Cookies (LGPD)
            </h5>
          </div>
          <button 
            onClick={handleDecline}
            className={`p-1 rounded-lg hover:bg-zinc-800/10 transition-colors ${isDarkMode ? 'text-zinc-500 hover:text-white' : 'text-zinc-400 hover:text-zinc-800'}`}
            aria-label="Fechar"
          >
            <X size={14} />
          </button>
        </div>

        <p className={`text-[10px] sm:text-[11px] font-sans-premium leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          Nós usamos cookies e tecnologias de rastreamento para analisar o tráfego do site, melhorar o rendimento da sua experiência e otimizar nossas campanhas comerciais de acordo com a nossa Política de Privacidade.
        </p>

        <div className="flex gap-3 justify-end text-[9px] font-space-premium font-black uppercase tracking-wider">
          <button 
            onClick={handleDecline}
            className={`px-3 py-2 rounded-xl border transition-all ${
              isDarkMode 
                ? 'border-white/10 hover:bg-white/5 text-zinc-400 hover:text-white' 
                : 'border-zinc-200 hover:bg-zinc-50 text-zinc-650 hover:text-zinc-800'
            }`}
          >
            Apenas Essenciais
          </button>
          <button 
            onClick={handleAccept}
            className="bg-[#ff003c] hover:bg-[#d90432] text-white px-4 py-2 rounded-xl transition-all shadow-[0_4px_12px_rgba(255,0,60,0.2)]"
          >
            Aceitar Todos
          </button>
        </div>
      </div>
    </div>
  );
}
