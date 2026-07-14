/**
 * ChefVirtual — IA recipe generator powered by Dubola
 * Uses Gemini (primary) with OpenAI as fallback
 * The AI always features Dubola ketchups as protagonists
 */
import { useState, useRef, useEffect } from 'react';
import {
  Sparkles, ChefHat, Send, RefreshCw, Loader2,
  UtensilsCrossed, Clock, Users, Flame, Star,
  Copy, Check, ChevronDown, Zap,
} from 'lucide-react';

// ─── DYNAMIC CONFIGURATIONS MATRIX ──────────────────────────────────────────
const PRODUCT_CONFIGS = {
  ketchups: {
    name: 'Ketchups',
    fullName: 'Ketchup',
    glowColor: 'rgba(220, 38, 38, 0.3)',
    textColor: 'text-red-500',
    hoverText: 'hover:text-red-400',
    borderColor: 'border-red-500/30',
    focusBorder: 'focus:border-red-500/50',
    btnGrad: 'from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 shadow-[0_10px_30px_rgba(220,38,38,0.25)] hover:shadow-[0_15px_40px_rgba(220,38,38,0.4)]',
    bgGlow: 'bg-red-950/30',
    bgGlowSecondary: 'bg-red-900/10',
    bulletColor: 'bg-red-500',
    badgeStyle: 'bg-red-500/10 border-red-500/25 text-red-400',
    ctaText: 'Comprar Ketchup Dubola',
    suggestions: [
      { label: '🥩 Picanha + queijo', value: 'picanha, queijo coalho, alho, manteiga, pão de alho' },
      { label: '🍔 Smash Burger', value: 'carne moída, pão brioche, queijo cheddar, cebola, alface' },
      { label: '🍗 Frango na airfryer', value: 'frango, limão, alho, azeite, páprica defumada' },
      { label: '🥚 Omelete gourmet', value: 'ovos, queijo parmesão, cogumelo, ervas finas, manteiga' },
    ],
    context: `Você é o Chef Virtual da Dubola, uma marca premium brasileira de condimentos artesanais.
LINHA DE KETCHUPS DUBOLA (protagonistas obrigatórios em toda receita):
• Ketchup Tradicional Dubola: tomates pelati italianos, levemente adocicado, acidez equilibrada. Ideal para hambúrgueres, pizzas, batatas fritas, molhos.
• Ketchup Picante Dubola: pimenta calabresa real, ardência progressiva e perfumada. Ideal para carnes, frango, petiscos, marinadas.
• Ketchup com Goiaba Dubola: fusão brasileira de tomate pelati + polpa de goiaba vermelha. Doçura tropical que corta gordura. Incrível com carnes nobres, queijos, charcutaria, brisket.

REGRAS OBRIGATÓRIAS:
1. O ketchup Dubola DEVE ser protagonista — não coadjuvante.
2. Mencione qual ketchup usar e por quê.
3. Seja um chef estrelado, mas acessível — linguagem apaixonada pelo sabor.
4. Foque em sabores reais, técnicas concretas, não exagere em ingredientes.
5. Sempre formate a receita com: título, badge de dificuldade, tempo, ingredientes e modo de preparo.
6. Responda SEMPRE em português brasileiro.
7. Inclua uma dica de chef no final.`,
    promptLabel: 'O Ketchup Dubola certo para isso',
    ingredientLabel: 'Ketchup [Tipo] Dubola',
    demoRecipe: `## SMASH BURGER DUBOLA DA DESTRUIÇÃO

**Dificuldade:** Fácil | **Tempo:** 20 min | **Porções:** 2 pessoas

**O Ketchup Dubola certo para isso:**
O **Ketchup com Goiaba Dubola** é a escolha perfeita. A doçura tropical da goiaba corta a gordura da carne, criando um contraste fascinante que transforma um simples hambúrguer em experiência gastronômica.

### Ingredientes
- 300g de carne moída (80/20)
- 2 pães brioche
- 2 fatias de queijo cheddar
- Cebola roxa em rodelas
- Folhas de alface crespa
- Ketchup com Goiaba Dubola — 3 colheres generosas
- Sal e pimenta-do-reino a gosto
- Manteiga para tostar o pão

### Modo de Preparo
1. Divida a carne em 2 bolinhas de 150g e tempere generosamente com sal e pimenta.
2. Aqueça uma frigideira de ferro em fogo altíssimo até soltar fumaça.
3. Coloque a bolinha e pressione com a espátula até achatar completamente — o smash cria a crosta dourada.
4. Após 90 segundos, vire e adicione o cheddar imediatamente.
5. Toste o pão com manteiga na mesma frigideira por 30 segundos.
6. Monte: alface, carne com queijo, cebola roxa e finalize com o Ketchup com Goiaba Dubola.

### 💡 Dica do Chef
Não mexa na carne após amassar — a crosta (Maillard) é o segredo. O Ketchup com Goiaba Dubola deve ser aplicado quente, logo antes de fechar o hambúrguer, para que o calor intensifique os aromas tropicais.

---
*Esta receita foi criada pelo Chef Virtual Dubola, powered by IA.*`
  },
  barbecue: {
    name: 'Barbecue',
    fullName: 'Barbecue',
    glowColor: 'rgba(234, 88, 12, 0.3)',
    textColor: 'text-orange-550',
    hoverText: 'hover:text-orange-400',
    borderColor: 'border-orange-500/30',
    focusBorder: 'focus:border-orange-500/50',
    btnGrad: 'from-orange-600 to-amber-800 hover:from-orange-500 hover:to-amber-700 shadow-[0_10px_30px_rgba(234,88,12,0.25)] hover:shadow-[0_15px_40px_rgba(234,88,12,0.4)]',
    bgGlow: 'bg-orange-950/30',
    bgGlowSecondary: 'bg-orange-900/10',
    bulletColor: 'bg-orange-500',
    badgeStyle: 'bg-orange-500/10 border-orange-500/25 text-orange-400',
    ctaText: 'Comprar Barbecue Dubola',
    suggestions: [
      { label: '🐷 Costelinha suína', value: 'costelinha de porco, alho, sal grosso, pimenta preta' },
      { label: '🍗 Asinhas de frango', value: 'asas de frango, limão, alho, cebolinha, azeite' },
      { label: '🍔 Burger defumado', value: 'blend bovino, pão australiano, bacon, queijo cheddar' },
      { label: '🧀 Queijo Coalho na brasa', value: 'queijo coalho em espeto, orégano, azeite' },
    ],
    context: `Você é o Chef Virtual da Dubola, uma marca premium brasileira de condimentos artesanais.
LINHA DE MOLHOS BARBECUE DUBOLA (protagonistas obrigatórios em toda receita):
• Barbecue Tradicional Dubola (Hickory): açúcar mascavo caramelizado e defumado em lenha Hickory real. Perfeito para laquear costelinhas de porco na brasa e brisket.
• Barbecue Picante Dubola: barbecue rústico com pimenta caiena moída e chipotle defumado. Ideal para carnes na brasa, hambúrgueres e asas de frango com final de boca picante.
• Barbecue com Goiaba Dubola: fusão agridoce perfeita de barbecue defumado clássico e polpa de goiaba vermelha. Excepcional para lombo suíno, queijo coalho grelhado e asas de frango.

REGRAS OBRIGATÓRIAS:
1. O molho barbecue Dubola DEVE ser protagonista — não coadjuvante.
2. Mencione qual barbecue usar e por quê.
3. Seja um chef estrelado, mas acessível — linguagem apaixonada pelo sabor.
4. Foque em sabores reais, técnicas concretas, não exagere em ingredientes.
5. Sempre formate a receita com: título, badge de dificuldade, tempo, ingredientes e modo de preparo.
6. Responda SEMPRE em português brasileiro.
7. Inclua uma dica de chef no final.`,
    promptLabel: 'O Barbecue Dubola certo para isso',
    ingredientLabel: 'Barbecue [Tipo] Dubola',
    demoRecipe: `## COSTELINHAS LAQUEADAS DUBOLA HICKORY

**Dificuldade:** Média | **Tempo:** 1h 30 min | **Porções:** 4 pessoas

**O Barbecue Dubola certo para isso:**
O **Barbecue Tradicional Dubola** é ideal. A defumação em lenha Hickory real e o açúcar mascavo caramelizado formam um glaze brilhante e amadeirado que protege e realça a suculência da costelinha.

### Ingredientes
- 1 rack de costelinha suína (900g)
- Barbecue Tradicional Dubola — 1/2 xícara
- Sal grosso e pimenta preta
- 2 colheres de sopa de manteiga noisette
- Alho amassado para temperar

### Modo de Preparo
1. Tempere a costelinha com sal grosso, alho e pimenta preta.
2. Envolva em papel alumínio duplo e asse a 180°C por 1 hora e 15 minutos até amaciar.
3. Retire o alumínio e pincele abundantemente o Barbecue Tradicional Dubola.
4. Asse a 220°C por mais 15 minutos, aplicando novas camadas de barbecue a cada 5 minutos até laquear e brilhar.

### 💡 Dica do Chef
Pincele o barbecue nos últimos minutos de cozimento para que o açúcar caramelize sob o calor sem queimar a fumaça.

---
*Esta receita foi criada pelo Chef Virtual Dubola, powered by IA.*`
  },
  mostardas: {
    name: 'Mostardas',
    fullName: 'Mostarda',
    glowColor: 'rgba(234, 179, 8, 0.3)',
    textColor: 'text-yellow-500',
    hoverText: 'hover:text-yellow-400',
    borderColor: 'border-yellow-500/30',
    focusBorder: 'focus:border-yellow-500/50',
    btnGrad: 'from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 shadow-[0_10px_30px_rgba(234,179,8,0.25)] hover:shadow-[0_15px_40px_rgba(234,179,8,0.4)]',
    bgGlow: 'bg-yellow-950/30',
    bgGlowSecondary: 'bg-yellow-900/10',
    bulletColor: 'bg-yellow-500',
    badgeStyle: 'bg-yellow-500/10 border-yellow-500/25 text-yellow-400',
    ctaText: 'Comprar Mostarda Dubola',
    suggestions: [
      { label: '🥩 Medalhão de mignon', value: 'filet mignon, manteiga, tomilho, flor de sal, pimenta do reino' },
      { label: '🥗 Salada de Figos & Parma', value: 'rúcula selvagem, figos frescos, presunto parma, queijo de cabra' },
      { label: '🍗 Frango crocante', value: 'peito de frango, farinha panko, ovos, alho, limão' },
      { label: '🌭 Hot dog artesanal', value: 'salsicha frankfurt, pão de brioche, cebola caramelizada' },
    ],
    context: `Você é o Chef Virtual da Dubola, uma marca premium brasileira de condimentos artesanais.
LINHA DE MOSTARDAS DUBOLA (protagonistas obrigatórios em toda receita):
• Mostarda Tradicional Dubola: sementes amarelas selecionadas moídas a frio com vinagre aromático. Sabor limpo e picante. Ideal para sanduíches, hot dogs gourmet, vinagrete.
• Mostarda Dijon Dubola: sementes escuras de mostarda moídas na pedra e infusionadas com vinho Chardonnay seco. Picância nasal profunda e acidez elegante. Ideal para medalhão mignon, molho beurre blanc.
• Mostarda com Mel Dubola: sementes amarelas com mel puro de flores silvestres. Emulsão aveludada, adocicada e suave. Incrível para saladas, frango empanado, queijos finos.

REGRAS OBRIGATÓRIAS:
1. A mostarda Dubola DEVE ser protagonista — não coadjuvante.
2. Mencione qual mostarda usar e por quê.
3. Seja um chef estrelado, mas acessível — linguagem apaixonada pelo sabor.
4. Foque em sabores reais, técnicas concretas, não exagere em ingredientes.
5. Sempre formate a receita com: título, badge de dificuldade, tempo, ingredientes e modo de preparo.
6. Responda SEMPRE em português brasileiro.
7. Inclua uma dica de chef no final.`,
    promptLabel: 'A Mostarda Dubola certa para isso',
    ingredientLabel: 'Mostarda [Tipo] Dubola',
    demoRecipe: `## MEDALHÃO DE MIGNON AO BEURRE DIJON

**Dificuldade:** Média | **Tempo:** 20 min | **Porções:** 2 pessoas

**A Mostarda Dubola certa para isso:**
A **Mostarda Dijon Dubola** com Chardonnay é a escolha perfeita. Sua picância limpa e acidez cortam a riqueza untuosa da carne vermelha e da manteiga, criando um espelho de molho digno de bistrô.

### Ingredientes
- 2 medalhões de filet mignon (200g cada)
- Mostarda Dijon Dubola — 3 colheres de sopa
- 2 colheres de sopa de manteiga sem sal
- Ramos de tomilho fresco
- Flor de sal e pimenta-do-reino moída na hora

### Modo de Preparo
1. Tempere os medalhões com flor de sal e pimenta-do-reino.
2. Aqueça uma frigideira de ferro e sele a carne por 3 minutos de cada lado em fogo alto.
3. Adicione a manteiga e o tomilho. Regue os medalhões continuamente com a manteiga derretida (butter basting) por 2 minutos.
4. Retire a carne e deixe descansar por 3 minutos. Na frigideira morna com os sucos da carne, junte a mostarda Dijon e misture para criar um molho emulsionado.
5. Monte servindo os medalhões sobre um espelho do molho Dijon.

### 💡 Dica do Chef
Nunca cozinhe a mostarda Dijon em fogo alto direto; o calor excessivo destrói as notas voláteis do vinho branco e a picância nasal característica da semente.

---
*Esta receita foi criada pelo Chef Virtual Dubola, powered by IA.*`
  },
  maioneses: {
    name: 'Maioneses',
    fullName: 'Maionese',
    glowColor: 'rgba(234, 179, 8, 0.3)',
    textColor: 'text-yellow-400',
    hoverText: 'hover:text-yellow-300',
    borderColor: 'border-yellow-400/30',
    focusBorder: 'focus:border-yellow-400/50',
    btnGrad: 'from-yellow-500 to-amber-700 hover:from-yellow-400 hover:to-amber-600 shadow-[0_10px_30px_rgba(234,179,8,0.25)] hover:shadow-[0_15px_40px_rgba(234,179,8,0.4)]',
    bgGlow: 'bg-yellow-950/30',
    bgGlowSecondary: 'bg-yellow-900/10',
    bulletColor: 'bg-yellow-400',
    badgeStyle: 'bg-yellow-400/10 border-yellow-400/25 text-yellow-300',
    ctaText: 'Comprar Maionese Dubola',
    suggestions: [
      { label: '🐟 Peixe Grelhado', value: 'filé de salmão ou peixe branco, limão, azeite, sal, pimenta' },
      { label: '🍟 Batatas Rústicas', value: 'batatas Asterix, alecrim, alho, azeite, flor de sal' },
      { label: '🥪 Sanduíche de Parma', value: 'pão ciabatta, presunto parma, rúcula, tomate seco' },
      { label: '🍤 Camarão Grelhado', value: 'camarões limpos, alho, manteiga, salsa' },
    ],
    context: `Você é o Chef Virtual da Dubola, uma marca premium brasileira de condimentos artesanais.
LINHA DE MAIONESES DUBOLA (protagonistas obrigatórios em toda receita):
• Maionese Tradicional Dubola: gemas caipiras selecionadas, limão siciliano orgânico fresco e mostarda em grãos.
• Maionese Tártaro Dubola: picles nobres de pepino agridoce, cebola roxa fresca, salsa e endro (dill). Par supremo para peixes e frutos do mar.
• Maionese Defumada Dubola: fumaça natural de lenha de macieira. Notas amadeiradas profundas perfeitas para hambúrgueres e batatas.
• Maionese de Azeitona Dubola: azeitonas pretas nobres Azapa, trazendo coloração purpúrea elegante e sabor salino.
• Maionese de Ervas Dubola: salsa, cebolete e manjericão fresco batidos. Leve e refrescante.
• Maionese de Alho Dubola: alho fresco assado lentamente no azeite de oliva extra virgem.
• Maionese de Limão Siciliano Dubola: suco e raspa de limão siciliano orgânico prensados a frio.

REGRAS OBRIGATÓRIAS:
1. A maionese Dubola DEVE ser protagonista — não coadjuvante.
2. Mencione qual maionese usar e por quê.
3. Seja um chef estrelado, mas acessível — linguagem apaixonada pelo sabor.
4. Foque em sabores reais, técnicas concretas, não exagere em ingredientes.
5. Sempre formate a receita com: título, badge de dificuldade, tempo, ingredientes e modo de preparo.
6. Responda SEMPRE em português brasileiro.
7. Inclua uma dica de chef no final.`,
    promptLabel: 'A Maionese Dubola certa para isso',
    ingredientLabel: 'Maionese [Tipo] Dubola',
    demoRecipe: `## SALMÃO GRELHADO COM MAIONESE TÁRTARO DUBOLA

**Dificuldade:** Fácil | **Tempo:** 15 min | **Porções:** 2 pessoas

**A Maionese Dubola certa para isso:**
A **Maionese Tártaro Dubola** é a rainha da harmonização. A acidez do picles agridoce e o dill fresco cortam a gordura natural do salmão, enriquecendo o prato com cremosidade aromática.

### Ingredientes
- 2 filés de salmão com pele (200g cada)
- Maionese Tártaro Dubola — 4 colheres de sopa
- Raspas de limão siciliano
- Azeite de oliva extra virgem
- Sal marinho e cebolinha fresca

### Modo de Preparo
1. Tempere os filés de salmão com sal marinho e um fio de azeite.
2. Aqueça a frigideira e coloque o salmão com a pele para baixo. Deixe grelhar por 4 minutos sem mexer, até a pele ficar crocante.
3. Vire e grelhe por mais 2 minutos apenas para selar o topo.
4. Sirva os filés quentes coroados com uma colherada generosa de Maionese Tártaro Dubola gelada e raspas de limão siciliano.

### 💡 Dica do Chef
O choque térmico do peixe fumegante com a maionese tártaro fria libera os óleos essenciais do endro e do limão siciliano, potencializando o sabor marinho.

---
*Esta receita foi criada pelo Chef Virtual Dubola, powered by IA.*`
  }
};

const buildPrompt = (config) => `${config.context}

Quando o usuário disser o que tem na geladeira, crie UMA receita completa em markdown usando este formato exato:

## [NOME DA RECEITA EM MAIÚSCULAS]

**Dificuldade:** [Fácil / Médio / Avançado] | **Tempo:** [XX min] | **Porções:** [X pessoas]

**${config.promptLabel}:**
[Explique qual produto Dubola usar e POR QUÊ é a escolha perfeita para esta receita]

### Ingredientes
- [item]
- [item]
- ${config.ingredientLabel} — [quantidade]

### Modo de Preparo
1. [passo]
2. [passo]
...

### 💡 Dica do Chef
[Uma dica técnica premium que faz a diferença]

---
*Esta receita foi criada pelo Chef Virtual Dubola, powered by IA.*`;

// ─── API CALLS ────────────────────────────────────────────────────────────────
async function callGemini(userMessage, systemPrompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') throw new Error('NO_KEY');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: userMessage }] }],
        generationConfig: {
          temperature: 0.85,
          maxOutputTokens: 1200,
          topP: 0.95,
        },
      }),
    }
  );

  if (!response.ok) throw new Error(`Gemini error: ${response.status}`);
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

async function callOpenAI(userMessage, systemPrompt) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey || apiKey === 'your_openai_api_key_here') throw new Error('NO_KEY');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.85,
      max_tokens: 1200,
    }),
  });

  if (!response.ok) throw new Error(`OpenAI error: ${response.status}`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

async function generateRecipe(ingredients, systemPrompt, productLine) {
  const lineName = productLine === 'ketchups' ? 'ketchups' : (productLine === 'barbecue' ? 'molhos barbecue' : (productLine === 'mostardas' ? 'mostardas' : 'maioneses'));
  const message = `Tenho na geladeira: ${ingredients}. Crie uma receita incrível usando os produtos da linha de ${lineName} Dubola como protagonistas.`;
  try {
    return await callGemini(message, systemPrompt);
  } catch (e) {
    if (e.message === 'NO_KEY') {
      try { return await callOpenAI(message, systemPrompt); } catch {}
    }
    throw e;
  }
}

// ─── MARKDOWN RENDERER ───────────────────────────────────────────────────────
function RecipeMarkdown({ text, config }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-3 text-sm font-sans leading-relaxed">
      {lines.map((line, i) => {
        if (line.startsWith('## ')) {
          return (
            <h3 key={i} className="font-display text-2xl sm:text-3xl font-black text-white uppercase leading-tight pt-2">
              {line.replace('## ', '')}
            </h3>
          );
        }
        if (line.startsWith('### ')) {
          return (
            <h4 key={i} className={`text-xs font-bold ${config.textColor} uppercase tracking-widest pt-3 border-t border-white/5`}>
              {line.replace('### ', '')}
            </h4>
          );
        }
        if (line.startsWith('**') && line.includes('Dificuldade')) {
          const parts = line.replace(/\*\*/g, '').split('|');
          return (
            <div key={i} className="flex flex-wrap gap-3">
              {parts.map((p, j) => (
                <span key={j} className="inline-flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  {j === 0 && <Star size={10} className="text-yellow-400" />}
                  {j === 1 && <Clock size={10} className="text-blue-400" />}
                  {j === 2 && <Users size={10} className="text-green-400" />}
                  {p.trim()}
                </span>
              ))}
            </div>
          );
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return (
            <p key={i} className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
              {line.replace(/\*\*/g, '')}
            </p>
          );
        }
        if (/^\*\*.*\*\*/.test(line)) {
          return (
            <p key={i} className="text-zinc-300 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: line.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white">$1</strong>')
              }}
            />
          );
        }
        if (line.startsWith('- ')) {
          return (
            <div key={i} className="flex items-start gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${config.bulletColor} mt-2 shrink-0`} />
              <span className="text-zinc-300"
                dangerouslySetInnerHTML={{
                  __html: line.replace('- ', '').replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white">$1</strong>')
                }}
              />
            </div>
          );
        }
        if (/^\d+\./.test(line)) {
          const num = line.match(/^(\d+)\./)?.[1];
          return (
            <div key={i} className="flex items-start gap-3">
              <span className={`w-5 h-5 rounded-full bg-zinc-900 border ${config.borderColor} ${config.textColor} text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5`}>
                {num}
              </span>
              <span className="text-zinc-300 flex-1"
                dangerouslySetInnerHTML={{
                  __html: line.replace(/^\d+\.\s*/, '').replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white">$1</strong>')
                }}
              />
            </div>
          );
        }
        if (line.startsWith('### 💡') || line.includes('Dica do Chef')) {
          return (
            <div key={i} className="flex items-center gap-2 pt-1">
              <Flame size={13} className="text-orange-400 shrink-0" />
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Dica do Chef</span>
            </div>
          );
        }
        if (line.startsWith('---') || line.startsWith('*Esta receita')) {
          return (
            <p key={i} className="text-[10px] text-zinc-600 italic pt-2 border-t border-white/5">
              {line.replace(/---/, '').replace(/\*/g, '')}
            </p>
          );
        }
        if (line.trim() === '') return <div key={i} className="h-1" />;

        return (
          <p key={i} className="text-zinc-400 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: line.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white">$1</strong>')
            }}
          />
        );
      })}
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function ChefVirtual({ productLine = 'ketchups' }) {
  const config = PRODUCT_CONFIGS[productLine] || PRODUCT_CONFIGS.ketchups;
  const systemPrompt = buildPrompt(config);

  const [input, setInput] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [usedDemo, setUsedDemo] = useState(false);
  const textareaRef = useRef(null);
  const resultRef = useRef(null);

  const hasGeminiKey = import.meta.env.VITE_GEMINI_API_KEY &&
    import.meta.env.VITE_GEMINI_API_KEY !== 'your_gemini_api_key_here';
  const hasOpenAIKey = import.meta.env.VITE_OPENAI_API_KEY &&
    import.meta.env.VITE_OPENAI_API_KEY !== 'your_openai_api_key_here';
  const hasAnyKey = hasGeminiKey || hasOpenAIKey;

  const handleGenerate = async (ingredientsOverride) => {
    const ingredients = ingredientsOverride || input.trim();
    if (!ingredients) return;

    setLoading(true);
    setError('');
    setRecipe('');
    setUsedDemo(false);

    if (!hasAnyKey) {
      // Demo mode — show example recipe
      await new Promise(r => setTimeout(r, 1800));
      setRecipe(config.demoRecipe);
      setUsedDemo(true);
      setLoading(false);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      return;
    }

    try {
      const text = await generateRecipe(ingredients, systemPrompt, productLine);
      setRecipe(text);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch (err) {
      setError('Não conseguimos conectar com o chef agora. Tente novamente em instantes.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(recipe);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleGenerate();
    }
  };

  return (
    <section
      id="chef-virtual"
      className="relative py-28 sm:py-36 bg-black border-t border-white/[0.04] overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] ${config.bgGlow}`} />
        <div className={`absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] ${config.bgGlowSecondary}`} />
      </div>

      {/* Ambient grid */}
      <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 z-10">

        {/* ── HEADER ── */}
        <div className="text-center space-y-5 mb-14">
          <div className={`inline-flex items-center gap-2.5 bg-white/5 border border-white/10 px-5 py-2 rounded-full ${config.textColor}`}>
            <Sparkles size={13} className="animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase">
              {hasAnyKey ? 'Powered by IA — Gemini + OpenAI' : 'Demo Mode — Configure sua API Key'}
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white uppercase leading-[0.92] tracking-tight">
            SEU CHEFE VIRTUAL,<br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${productLine === 'ketchups' ? 'from-[#ff003c] to-[#ff6b35]' : (productLine === 'barbecue' ? 'from-orange-500 to-amber-500' : 'from-yellow-400 to-amber-500')}`}>
              POWERED BY DUBOLA.
            </span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Diga o que tem na geladeira. Nossa IA cria uma receita personalizada com as {config.name.toLowerCase()} Dubola como protagonistas. Culinária de autor, sem precisar ser chef.
          </p>

          {!hasAnyKey && (
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 px-4 py-2 rounded-full">
              <Zap size={11} className="text-amber-400" />
              <span className="text-[10px] text-amber-300 font-bold tracking-wider">
                Modo demonstração ativo — adicione sua API key no .env para receitas reais
              </span>
            </div>
          )}
        </div>

        {/* ── INPUT AREA ── */}
        <div className="bg-zinc-950/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-5 shadow-2xl">

          {/* Suggestions */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Sugestões rápidas</p>
            <div className="flex flex-wrap gap-2">
              {config.suggestions.map((s) => (
                <button
                  key={s.value}
                  onClick={() => { setInput(s.value); handleGenerate(s.value); }}
                  className={`text-[11px] font-medium text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/10 ${config.hoverText} ${config.focusBorder} px-3 py-1.5 rounded-full transition-all`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Textarea */}
          <div className="relative">
            <div className={`absolute top-4 left-4 ${config.textColor} pointer-events-none`}>
              <UtensilsCrossed size={16} />
            </div>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ex: tenho frango, limão, alho, batata e pimentão na geladeira..."
              rows={3}
              className={`w-full bg-black/40 border border-white/10 ${config.focusBorder} rounded-2xl pl-11 pr-4 py-4 text-white placeholder-zinc-600 text-sm resize-none outline-none transition-colors font-sans leading-relaxed`}
            />
            <p className="absolute bottom-3 right-4 text-[10px] text-zinc-700">⌘ + Enter para gerar</p>
          </div>

          {/* Generate button */}
          <button
            onClick={() => handleGenerate()}
            disabled={loading || !input.trim()}
            className={`w-full flex items-center justify-center gap-3 bg-gradient-to-r ${config.btnGrad} disabled:from-zinc-800 disabled:to-zinc-700 disabled:cursor-not-allowed text-white font-black text-xs uppercase tracking-widest py-5 rounded-2xl transition-all disabled:shadow-none`}
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                <span>O Chef está criando sua receita...</span>
              </>
            ) : (
              <>
                <ChefHat size={15} />
                <span>Criar Receita com {config.fullName} Dubola</span>
                <Send size={12} />
              </>
            )}
          </button>
        </div>

        {/* ── ERROR ── */}
        {error && (
          <div className="mt-6 flex items-center gap-3 bg-red-950/40 border border-red-900/50 rounded-2xl p-4">
            <Flame size={16} className="text-red-400 shrink-0" />
            <p className="text-sm text-red-300">{error}</p>
            <button onClick={() => handleGenerate()} className="ml-auto text-[10px] text-red-400 hover:text-white font-bold uppercase tracking-wider flex items-center gap-1">
              <RefreshCw size={11} /> Tentar novamente
            </button>
          </div>
        )}

        {/* ── RECIPE RESULT ── */}
        {recipe && (
          <div
            ref={resultRef}
            className="mt-8 bg-zinc-950/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Result header */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl bg-white/5 border ${config.borderColor} flex items-center justify-center`}>
                  <ChefHat size={14} className={config.textColor} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Receita gerada pelo Chef Virtual Dubola</p>
                  {usedDemo && (
                    <p className="text-[9px] text-amber-550">Modo demonstração — configure API key para receitas reais</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleGenerate()}
                  className="flex items-center gap-1.5 text-[10px] text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg transition-all font-bold uppercase tracking-wider"
                >
                  <RefreshCw size={11} /> Nova
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-[10px] text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg transition-all font-bold uppercase tracking-wider"
                >
                  {copied ? <><Check size={11} className="text-green-400" /> Copiado!</> : <><Copy size={11} /> Copiar</>}
                </button>
              </div>
            </div>

            {/* Recipe content */}
            <div className="px-6 sm:px-8 py-8">
              <RecipeMarkdown text={recipe} config={config} />
            </div>

            {/* CTA footer */}
            <div className="px-6 sm:px-8 pb-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-white/[0.06]">
                <p className="text-xs text-zinc-500 flex-1">
                  Gostou da receita? Adquira as {config.name.toLowerCase()} Dubola e experimente hoje mesmo.
                </p>
                <a
                  href="#onde-comprar"
                  className={`flex items-center gap-2 bg-gradient-to-r ${config.btnGrad} text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-xl transition-all`}
                >
                  <span>{config.ctaText}</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── BOTTOM INDICATORS ── */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-center">
          {[
            { icon: <Zap size={14} className="text-yellow-400" />, label: 'Resposta em segundos' },
            { icon: <ChefHat size={14} className={config.textColor} />, label: 'Culinária de autor' },
            { icon: <Star size={14} className="text-amber-400" />, label: 'Dubola como protagonista' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-zinc-500">
              {item.icon}
              <span className="text-[11px] font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

