import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import DubolaHeader from '../components/DubolaHeader';
import DubolaFooter from '../components/DubolaFooter';
import {
  ArrowRight,
  Search,
  Package,
  Users,
  ChevronRight,
} from 'lucide-react';
import { gsap } from 'gsap';
import Lenis from 'lenis';

// ─────────────────────────────────────────────────────────────
//  CATEGORY META — color dot, label image mapping
// ─────────────────────────────────────────────────────────────
export const CATEGORY_META = {
  todos:    { label: 'Todos',           dot: '#f4f4f5',  image: null },
  ketchup:  { label: 'Ketchup',         dot: '#dc2626',  image: '/linha-ketchups.png' },
  maionese: { label: 'Maionese',        dot: '#3b82f6',  image: '/linha-maioneses.png' },
  barbecue: { label: 'Barbecue',        dot: '#d97706',  image: '/linha-barbecue.png' },
  mostarda: { label: 'Mostarda',        dot: '#eab308',  image: '/linha-mostardas.png' },
  tomate:   { label: 'Molho de Tomate', dot: '#ea580c',  image: '/linha-tomates.png' },
};

// ─────────────────────────────────────────────────────────────
//  CATALOG PRODUCTS — 20 products across 5 lines
// ─────────────────────────────────────────────────────────────
export const CATALOG_PRODUCTS = [
  // ── KETCHUPS (3) ──────────────────────────────────────────
  {
    id: 'ketchup-tradicional',
    category: 'ketchup',
    name: 'Ketchup Tradicional',
    slogan: 'A pureza ancestral do tomate italiano reduzido ao fogo lento.',
    primaryColor: '#dc2626',
    b2cPackaging: 'Vidro Premium 320g',
    b2bPackaging: 'Bag Profissional 1,01 kg',
    badge: 'Rústico & Encorpado',
    glow: 'rgba(220,38,38,0.18)',
  },
  {
    id: 'ketchup-picante',
    category: 'ketchup',
    name: 'Ketchup Picante',
    slogan: 'O calor magnético da Habanero fresca com o frescor do tomate pelati.',
    primaryColor: '#ea580c',
    b2cPackaging: 'Vidro Premium 320g',
    b2bPackaging: 'Bag Profissional 1,01 kg',
    badge: 'Chipotle & Jalapeño',
    glow: 'rgba(234,88,12,0.18)',
  },
  {
    id: 'ketchup-goiaba',
    category: 'ketchup',
    name: 'Ketchup com Goiaba',
    slogan: 'A maior insurreição culinária: a fusão sedosa do tomate com goiaba.',
    primaryColor: '#f43f5e',
    b2cPackaging: 'Vidro Premium 320g',
    b2bPackaging: 'Bag Profissional 1,01 kg',
    badge: 'A Joia da Coroa',
    glow: 'rgba(244,63,94,0.18)',
  },

  // ── MAIONESES (7) ─────────────────────────────────────────
  {
    id: 'maionese-tradicional',
    category: 'maionese',
    name: 'Maionese Tradicional',
    slogan: 'A consagração da emulsão ouro purista de gemas caipiras.',
    primaryColor: '#3b82f6',
    b2cPackaging: 'Vidro Rústico 300g',
    b2bPackaging: 'Bag Profissional 1,01 kg',
    badge: 'Gemas Caipiras Ouro',
    glow: 'rgba(59,130,246,0.18)',
  },
  {
    id: 'maionese-tartaro',
    category: 'maionese',
    name: 'Maionese Tártaro',
    slogan: 'A joia litorânea: acidez refrescante de picles nobres e dill.',
    primaryColor: '#f97316',
    b2cPackaging: 'Vidro Rústico 300g',
    b2bPackaging: 'Bag Profissional 1,01 kg',
    badge: 'Sucesso Litorâneo',
    glow: 'rgba(249,115,22,0.18)',
  },
  {
    id: 'maionese-defumada',
    category: 'maionese',
    name: 'Maionese Defumada',
    slogan: 'A alma do braseiro: defumação a frio em lenha de macieira natural.',
    primaryColor: '#854d0e',
    b2cPackaging: 'Vidro Rústico 300g',
    b2bPackaging: 'Bag Profissional 1,01 kg',
    badge: 'Alma de Pitmaster',
    glow: 'rgba(133,77,14,0.18)',
  },
  {
    id: 'maionese-azeitona',
    category: 'maionese',
    name: 'Maionese de Azeitona',
    slogan: 'A untuosidade mediterrânea com azeitona preta Azapa.',
    primaryColor: '#4d7c0f',
    b2cPackaging: 'Vidro Rústico 300g',
    b2bPackaging: 'Bag Profissional 1,01 kg',
    badge: 'Pungência Mediterrânea',
    glow: 'rgba(77,124,15,0.18)',
  },
  {
    id: 'maionese-ervas',
    category: 'maionese',
    name: 'Maionese de Ervas',
    slogan: 'O frescor do jardim: manjericão fresco, salsinha e hortelã.',
    primaryColor: '#059669',
    b2cPackaging: 'Bisnaga Premium 300g',
    b2bPackaging: 'Bag Profissional 1,01 kg',
    badge: 'Fresco de Jardim',
    glow: 'rgba(5,150,105,0.18)',
  },
  {
    id: 'maionese-alho',
    category: 'maionese',
    name: 'Maionese de Alho',
    slogan: 'A profundidade aromática do alho dourado no azeite de oliva.',
    primaryColor: '#a16207',
    b2cPackaging: 'Bisnaga Premium 300g',
    b2bPackaging: 'Bag Profissional 1,01 kg',
    badge: 'Aioli Gourmet',
    glow: 'rgba(161,98,7,0.18)',
  },
  {
    id: 'maionese-limao',
    category: 'maionese',
    name: 'Maionese de Limão Siciliano',
    slogan: 'A acidez solar e perfumada do limão siciliano em emulsão aveludada.',
    primaryColor: '#65a30d',
    b2cPackaging: 'Bisnaga Premium 300g',
    b2bPackaging: 'Bag Profissional 1,01 kg',
    badge: 'Cítrico Siciliano',
    glow: 'rgba(101,163,13,0.18)',
  },

  // ── BARBECUES (3) ─────────────────────────────────────────
  {
    id: 'barbecue-tradicional',
    category: 'barbecue',
    name: 'Barbecue Tradicional',
    slogan: 'O caramelizado amadeirado da lenha de nogueira Hickory real.',
    primaryColor: '#d97706',
    b2cPackaging: 'Bisnaga Premium 320g',
    b2bPackaging: 'Bag Profissional 1,01 kg',
    badge: 'Lenha Hickory',
    glow: 'rgba(217,119,6,0.18)',
  },
  {
    id: 'barbecue-picante',
    category: 'barbecue',
    name: 'Barbecue Picante',
    slogan: 'A queima sutil da caiena com barbecue rústico.',
    primaryColor: '#b91c1c',
    b2cPackaging: 'Bisnaga Premium 320g',
    b2bPackaging: 'Bag Profissional 1,01 kg',
    badge: 'Chipotle Picante',
    glow: 'rgba(185,28,28,0.18)',
  },
  {
    id: 'barbecue-goiaba',
    category: 'barbecue',
    name: 'Barbecue com Goiaba',
    slogan: 'O clássico americano reencontra o pomar brasileiro.',
    primaryColor: '#f43f5e',
    b2cPackaging: 'Bisnaga Premium 320g',
    b2bPackaging: 'Bag Profissional 1,01 kg',
    badge: 'Agridoce de Goiaba',
    glow: 'rgba(244,63,94,0.18)',
  },

  // ── MOSTARDAS (3) ─────────────────────────────────────────
  {
    id: 'mostarda-tradicional',
    category: 'mostarda',
    name: 'Mostarda Tradicional',
    slogan: 'A picância limpa das sementes de mostarda selecionadas.',
    primaryColor: '#eab308',
    b2cPackaging: 'Bisnaga Premium 320g',
    b2bPackaging: 'Bag Profissional 1,01 kg',
    badge: 'Semente Amarela Rústica',
    glow: 'rgba(234,179,8,0.18)',
  },
  {
    id: 'mostarda-dijon',
    category: 'mostarda',
    name: 'Mostarda Dijon',
    slogan: 'A nobreza aristocrática da semente escura com vinho Chardonnay.',
    primaryColor: '#ca8a04',
    b2cPackaging: 'Bisnaga Premium 320g',
    b2bPackaging: 'Bag Profissional 1,01 kg',
    badge: 'Dijon com Chardonnay',
    glow: 'rgba(202,138,4,0.18)',
  },
  {
    id: 'mostarda-mel',
    category: 'mostarda',
    name: 'Mostarda com Mel',
    slogan: 'O dulçor sedutor do mel de flores silvestres com mostarda.',
    primaryColor: '#f59e0b',
    b2cPackaging: 'Bisnaga Premium 320g',
    b2bPackaging: 'Bag Profissional 1,01 kg',
    badge: 'Mel Silvestre Real',
    glow: 'rgba(245,158,11,0.18)',
  },

  // ── MOLHOS DE TOMATE (4) ─────────────────────────────────
  {
    id: 'tomate-sugo',
    category: 'tomate',
    name: 'Molho Tradicional ao Sugo',
    slogan: 'O molho ancestral de tomates italianos apurados lentamente.',
    primaryColor: '#ea580c',
    b2cPackaging: 'Vidro Hermético 400g',
    b2bPackaging: 'Bag Profissional 1,01 kg',
    badge: 'Tradicional ao Sugo',
    glow: 'rgba(234,88,12,0.18)',
  },
  {
    id: 'tomate-rustico',
    category: 'tomate',
    name: 'Molho de Tomate Rústico',
    slogan: 'A textura rústica dos tomates pelati esmagados artesanalmente.',
    primaryColor: '#ca8a04',
    b2cPackaging: 'Vidro Hermético 400g',
    b2bPackaging: 'Bag Profissional 1,01 kg',
    badge: 'Textura Rústica',
    glow: 'rgba(202,138,4,0.18)',
  },
  {
    id: 'tomate-ervas-alho-poro',
    category: 'tomate',
    name: 'Molho Rústico Alho-Poró & Ervas',
    slogan: 'O atalho aromático: dulçor do alho-poró com ervas finas.',
    primaryColor: '#059669',
    b2cPackaging: 'Vidro Hermético 400g',
    b2bPackaging: 'Bag Profissional 1,01 kg',
    badge: 'Alho-Poró & Tomilho',
    glow: 'rgba(5,150,105,0.18)',
  },
  // Tomate aliases (additional SKUs)
  {
    id: 'tomate-tradicional',
    category: 'tomate',
    name: 'Molho de Tomate Clássico',
    slogan: 'Simplicidade italiana: tomate, azeite, sal. Nada mais necessário.',
    primaryColor: '#dc2626',
    b2cPackaging: 'Vidro Hermético 400g',
    b2bPackaging: 'Bag Profissional 1,01 kg',
    badge: 'Clássico Puro',
    glow: 'rgba(220,38,38,0.18)',
  },
];

// ─────────────────────────────────────────────────────────────
//  STATS BAR DATA
// ─────────────────────────────────────────────────────────────
const STATS = [
  { value: '3',  label: 'Ketchups' },
  { value: '7',  label: 'Maioneses' },
  { value: '3',  label: 'Barbecues' },
  { value: '3',  label: 'Mostardas' },
  { value: '4',  label: 'Molhos de Tomate' },
  { value: 'B2C & Food Service', label: 'Distribuição' },
];

// ─────────────────────────────────────────────────────────────
//  PRODUCT CARD COMPONENT
// ─────────────────────────────────────────────────────────────
function ProductCard({ prod, b2bMode }) {
  const catMeta = CATEGORY_META[prod.category] || {};
  const catImage = catMeta.image;

  return (
    <Link
      to={`/produto/${prod.id}`}
      className="catalog-card group relative flex flex-col bg-zinc-950 overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_var(--glow)] border-l-[3px]"
      style={{
        '--glow': prod.glow,
        borderLeftColor: prod.primaryColor,
      }}
    >
      {/* Category image – right-aligned, slightly cropped */}
      {catImage && (
        <div className="relative w-full h-44 overflow-hidden bg-black/60 flex items-center justify-end">
          <img
            src={catImage}
            alt={catMeta.label}
            className="h-full w-auto max-w-[85%] object-cover object-center opacity-80 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-500 select-none pointer-events-none"
            draggable={false}
          />
          {/* Fade overlay from left so the card bg bleeds in cleanly */}
          <div
            className="absolute inset-y-0 left-0 w-2/3 pointer-events-none"
            style={{
              background: `linear-gradient(to right, #09090b 0%, transparent 100%)`,
            }}
          />
          {/* Glow pulse on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 80% 50%, ${prod.glow} 0%, transparent 70%)`,
            }}
          />
        </div>
      )}

      {/* Card body */}
      <div className="flex flex-col flex-1 px-6 py-5 gap-4">

        {/* Top row: category label + badge */}
        <div className="flex items-center justify-between">
          <span
            className="text-[9px] font-space-premium font-bold tracking-[0.22em] uppercase"
            style={{ color: prod.primaryColor }}
          >
            {catMeta.label}
          </span>
          <span className="text-[9px] font-space-premium font-bold tracking-widest text-zinc-500 uppercase">
            {prod.badge}
          </span>
        </div>

        {/* Product name */}
        <h3
          className="font-rockwell text-xl sm:text-2xl font-bold text-white uppercase leading-tight group-hover:text-white transition-colors duration-200"
          style={{ textShadow: `0 0 0 transparent` }}
        >
          <span
            className="group-hover:opacity-100 transition-all duration-200"
            style={{ '--hover-color': prod.primaryColor }}
          >
            {prod.name}
          </span>
        </h3>

        {/* Slogan */}
        <p className="text-[11px] text-zinc-500 font-sans-premium italic leading-snug">
          &ldquo;{prod.slogan}&rdquo;
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom row: packaging + CTA */}
        <div className="border-t border-white/[0.05] pt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Package size={11} style={{ color: prod.primaryColor }} />
            <span className="text-[10px] font-space-premium text-zinc-500 uppercase tracking-wide">
              {b2bMode ? prod.b2bPackaging : prod.b2cPackaging}
            </span>
          </div>
          <span className="text-[10px] font-space-premium font-bold text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-200 tracking-wide flex items-center gap-1 whitespace-nowrap">
            Ver produto <ChevronRight size={11} />
          </span>
        </div>
      </div>

      {/* Bottom color accent line on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: prod.primaryColor }}
      />
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────
//  MAIN VIEW
// ─────────────────────────────────────────────────────────────
export default function DubolaLineView() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [b2bMode, setB2bMode]               = useState(false);
  const [searchQuery, setSearchQuery]       = useState('');
  const gridRef = useRef(null);

  // ── Lenis smooth scroll ────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // ── GSAP stagger on filter change ─────────────────────────
  useEffect(() => {
    const cards = document.querySelectorAll('.catalog-card');
    if (!cards.length) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.65, stagger: 0.06, ease: 'power3.out', clearProps: 'transform' }
    );
  }, [activeCategory, searchQuery]);

  // ── Filter ─────────────────────────────────────────────────
  const filteredProducts = CATALOG_PRODUCTS.filter((prod) => {
    const matchesCat    = activeCategory === 'todos' || prod.category === activeCategory;
    const q             = searchQuery.toLowerCase();
    const matchesSearch = prod.name.toLowerCase().includes(q) || prod.slogan.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  // ── Category pills ─────────────────────────────────────────
  const PILLS = Object.entries(CATEGORY_META).map(([id, meta]) => ({ id, ...meta }));

  return (
    <div className="relative w-full min-h-screen bg-black text-[#f4f4f5] overflow-x-hidden selection:bg-[#ff003c]/30 selection:text-white">

      {/* Subtle grid texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]"
        style={{
          backgroundImage:
            'linear-gradient(to right,#808080 1px,transparent 1px),linear-gradient(to bottom,#808080 1px,transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <DubolaHeader b2bMode={b2bMode} setB2bMode={setB2bMode} />

      {/* ══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full pt-20 pb-16 sm:pt-28 sm:pb-20 px-6 sm:px-12 overflow-hidden">
        {/* Ambient red glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[640px] h-[320px] rounded-full blur-[120px] bg-[#ff003c]/6 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Eyebrow */}
          <p className="text-[10px] font-space-premium font-bold tracking-[0.3em] text-zinc-600 uppercase mb-5">
            Catálogo Completo — Dubola Alimentos
          </p>

          {/* Headline */}
          <h1 className="font-rockwell text-5xl sm:text-7xl lg:text-[90px] font-bold text-white uppercase leading-[0.92] tracking-tight mb-6">
            A LINHA<br />
            <span className="gradient-text-gold">COMPLETA.</span>
          </h1>

          {/* Sub */}
          <p className="text-sm sm:text-base text-zinc-500 font-sans-premium leading-relaxed max-w-xl mb-10">
            20 produtos. 5 linhas. Uma obsessão: o sabor perfeito.
          </p>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2">
            {PILLS.map(({ id, label, dot }) => {
              const isActive = activeCategory === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveCategory(id)}
                  className={`flex items-center gap-2 px-4 py-2 text-[10px] font-space-premium font-bold tracking-widest uppercase border transition-all duration-200 ${
                    isActive
                      ? 'border-white/20 bg-white/8 text-white'
                      : 'border-white/[0.06] bg-transparent text-zinc-600 hover:border-white/10 hover:text-zinc-300'
                  }`}
                >
                  <span
                    className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                    style={{ backgroundColor: isActive ? dot : '#3f3f46' }}
                  />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════════════════════ */}
      <div className="w-full border-y border-white/[0.05] bg-zinc-950/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-4 flex flex-wrap items-center gap-0 divide-x divide-white/[0.05]">
          {STATS.map((s, i) => (
            <div key={i} className="px-5 first:pl-0 last:pr-0 flex items-center gap-2 py-1">
              <span className="font-rockwell text-sm font-bold text-white">{s.value}</span>
              <span className="text-[9px] font-space-premium tracking-widest text-zinc-600 uppercase">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          GRID SECTION
      ═══════════════════════════════════════════════════════ */}
      <section id="grid" className="max-w-7xl mx-auto px-6 sm:px-12 py-14 space-y-10 relative z-10">

        {/* Search + mode indicator row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[10px] font-space-premium text-zinc-600 tracking-widest uppercase">
            {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex items-center gap-2 bg-zinc-950 border border-zinc-900 px-4 py-2 w-full sm:w-60 focus-within:border-zinc-700 transition-colors">
              <Search size={13} className="text-zinc-600 flex-shrink-0" />
              <input
                type="text"
                placeholder="Buscar produto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-[11px] text-white placeholder-zinc-700 font-sans-premium"
              />
            </div>

            {/* B2B inline toggle */}
            <button
              onClick={() => setB2bMode(!b2bMode)}
              className="text-[9px] font-space-premium font-bold tracking-widest border border-zinc-900 bg-zinc-950 text-zinc-500 hover:text-white hover:border-zinc-700 px-4 py-2 uppercase transition-all whitespace-nowrap"
            >
              Modo: <span className="text-white">{b2bMode ? 'Food Service' : 'Consumidor'}</span>
            </button>
          </div>
        </div>

        {/* Product grid */}
        {filteredProducts.length > 0 ? (
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]"
          >
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} prod={prod} b2bMode={b2bMode} />
            ))}
          </div>
        ) : (
          <div className="py-28 text-center space-y-3">
            <p className="text-3xl">🏜</p>
            <h4 className="font-space-premium font-bold text-zinc-500 text-xs uppercase tracking-widest">
              Nenhum produto encontrado
            </h4>
            <p className="text-[11px] text-zinc-700 font-sans-premium max-w-xs mx-auto">
              Ajuste o filtro de categoria ou o termo de busca.
            </p>
          </div>
        )}
      </section>

      <DubolaFooter />

    </div>
  );
}
