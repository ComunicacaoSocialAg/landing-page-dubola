import { Link, useLocation } from 'react-router-dom';

export default function DubolaFooter() {
  const location = useLocation();
  const isB2bMode = location.pathname === '/' || location.pathname === '/vendas-b2b';

  return (
    <footer className="bg-black py-16 px-6 sm:px-12 border-t border-white/[0.04] relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-12">
        {/* Brand Left Column */}
        <div className="md:col-span-4 space-y-3 text-left">
          <img src="/Logo-Dubola.svg" alt="DUBOLA" className="h-10 w-auto object-contain" />
          <p className="text-[11px] text-zinc-650 font-sans-premium leading-relaxed max-w-xs">
            Condimentos de autor para cozinhas de excelência. Cada produto é resultado de uma obsessão com o sabor perfeito.
          </p>
        </div>

        {/* Sitemap Navigation Links */}
        <div className="md:col-span-3 space-y-4 text-left">
          <h5 className="font-space-premium font-bold text-[11px] text-zinc-600 uppercase tracking-[0.25em]">Navegação</h5>
          <ul className="space-y-2 text-[11px] font-sans-premium text-zinc-600">
            {isB2bMode ? (
              <>
                <li><a href="#beneficios" className="hover:text-white transition-colors">Diferenciais Técnicos</a></li>
                <li><a href="#catalogo" className="hover:text-white transition-colors">Catálogo B2B</a></li>
              </>
            ) : (
              <>
                <li><Link to="/" className="hover:text-white transition-colors">Início</Link></li>
                <li><Link to="/ketchups" className="hover:text-white transition-colors">Linha Ketchup</Link></li>
                <li><Link to="/maioneses" className="hover:text-white transition-colors">Linha Maionese</Link></li>
                <li><Link to="/barbecues" className="hover:text-white transition-colors">Linha Barbecue</Link></li>
                <li><Link to="/mostardas" className="hover:text-white transition-colors">Linha Mostarda</Link></li>
                <li><Link to="/molhos-de-tomate" className="hover:text-white transition-colors">Linha Molhos de Tomate</Link></li>
                <li><Link to="/linha-dubola" className="hover:text-white transition-colors font-bold">Catálogo Completo</Link></li>
                <li><Link to="/vendas-b2b" className="hover:text-[#ff003c] transition-colors font-bold">Área Comercial B2B</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* Logistics and Contact Info */}
        <div className="md:col-span-3 space-y-4 text-left">
          <h5 className="font-space-premium font-bold text-[11px] text-zinc-600 uppercase tracking-[0.25em]">Contato & Logística</h5>
          <ul className="space-y-2 text-[11px] font-sans-premium text-zinc-650">
            <li>comercial@dubola.com.br</li>
            <li>0800 555 9812</li>
            <li>Rodovia Presidente Juscelino Kubitschek – KM 35 Alberto Torres – Areal/ RJ CEP 25.848-080</li>
          </ul>
        </div>

        {/* Social Networks Links */}
        <div className="md:col-span-2 space-y-4 text-left">
          <h5 className="font-space-premium font-bold text-[11px] text-zinc-600 uppercase tracking-[0.25em]">Redes</h5>
          <ul className="space-y-2 text-[11px] font-sans-premium text-zinc-650">
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto border-t border-zinc-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-space-premium font-bold text-zinc-700 tracking-[0.2em] uppercase">
        <p>© {new Date().getFullYear()} Dubola Molhos Especiais Ltda. Todos os direitos reservados.</p>
        <p className="flex items-center gap-1.5">
          Desenvolvido com <span className="text-[#ff003c]">❤</span> para cozinhas de excelência
        </p>
      </div>
    </footer>
  );
}
