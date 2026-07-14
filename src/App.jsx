import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DubolaHomeView from './views/DubolaHomeView';
import DubolaKetchupsView from './views/DubolaKetchupsView';
import DubolaView from './views/DubolaView'; // Maioneses
import DubolaBarbecueView from './views/DubolaBarbecueView';
import DubolaMostardaView from './views/DubolaMostardaView';
import DubolaTomateView from './views/DubolaTomateView';
import DubolaLineView from './views/DubolaLineView';
import DubolaProductDetailView from './views/DubolaProductDetailView';
import DubolaCommercialCatalogView from './views/DubolaCommercialCatalogView';
import DubolaB2BView from './views/DubolaB2BView';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota inicial principal: Landing Page B2B Comercial (Ativo) */}
        <Route path="/" element={<DubolaB2BView />} />
        
        {/* Visualização interna do site do consumidor (Inativo/Em desenvolvimento) */}
        <Route path="/site-preview" element={<DubolaHomeView />} />
        
        {/* Landing page específica de Maioneses (spotlight Tártaro) */}
        <Route path="/maioneses" element={<DubolaView />} />
        
        {/* Landing page específica dos Ketchups */}
        <Route path="/ketchups" element={<DubolaKetchupsView />} />
        
        {/* Landing page específica de Barbecue */}
        <Route path="/barbecues" element={<DubolaBarbecueView />} />
        
        {/* Landing page específica de Mostardas */}
        <Route path="/mostardas" element={<DubolaMostardaView />} />

        {/* Landing page específica de Molhos de Tomate */}
        <Route path="/molhos-de-tomate" element={<DubolaTomateView />} />
        
        {/* Página da Linha Completa de produtos */}
        <Route path="/linha-dubola" element={<DubolaLineView />} />
        
        {/* Nova página do Catálogo Comercial B2B / Apresentação */}
        <Route path="/apresentacao-comercial" element={<DubolaCommercialCatalogView />} />
        <Route path="/catalogo" element={<Navigate to="/apresentacao-comercial" replace />} />
        
        {/* Página de detalhes do produto dinâmico */}
        <Route path="/produto/:productId" element={<DubolaProductDetailView />} />

        {/* Redirecionamentos para a nova home comercial B2B */}
        <Route path="/vendas-b2b" element={<Navigate to="/" replace />} />
        <Route path="/b2b" element={<Navigate to="/" replace />} />
        <Route path="/foodservice" element={<Navigate to="/" replace />} />

        {/* Redirecionamentos para compatibilidade legada */}
        <Route path="/dubola" element={<Navigate to="/maioneses" replace />} />
        <Route path="/barbecue" element={<Navigate to="/barbecues" replace />} />
        
        {/* Redirecionamento de fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
