# Configuração do Banco de Dados B2B e Automação de Leads (Supabase & CRM)

Este guia orienta o provisionamento do banco de dados e a esteira de vendas para capturar, rastrear e encaminhar os leads da Landing Page Comercial da **Dubola Alimentos**.

---

## 1. Banco de Dados (Supabase - Recomendado)

O serviço `leadService.js` está preparado para salvar os leads diretamente em uma tabela do Supabase. Para criar a estrutura do banco de dados, execute a seguinte query SQL no painel de controle do Supabase (**SQL Editor**):

```sql
-- Criar a tabela de leads comerciais (em conformidade com a LGPD)
CREATE TABLE public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    business_name TEXT NOT NULL,
    cnpj VARCHAR(14) NOT NULL,
    contact_name TEXT NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email TEXT,
    city TEXT NOT NULL,
    state VARCHAR(2) NOT NULL,
    business_type TEXT NOT NULL,
    consumption_monthly INTEGER DEFAULT 0,
    lead_score VARCHAR(10) DEFAULT 'WARM'::text,
    
    -- Metadados de Auditoria LGPD
    lgpd_consent BOOLEAN DEFAULT true NOT NULL,
    lgpd_consent_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    lgpd_consent_ip VARCHAR(45) NOT NULL,
    lgpd_consent_user_agent TEXT NOT NULL,
    lgpd_purpose TEXT NOT NULL,
    
    -- Status da esteira
    crm_synced BOOLEAN DEFAULT false,
    notes TEXT
);

-- Habilitar leitura/escrita pública anônima sob a chave anônima do Supabase
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to leads table" 
ON public.leads 
FOR INSERT 
TO public 
WITH CHECK (true);

CREATE POLICY "Allow authenticated read to leads" 
ON public.leads 
FOR SELECT 
TO authenticated 
USING (true);
```

### Chaves de Conexão (.env)
Adicione as credenciais do Supabase no arquivo `.env` do seu projeto local e nas variáveis de ambiente do serviço de hospedagem (Vercel ou Netlify):

```env
VITE_SUPABASE_URL=https://[seu-projeto].supabase.co
VITE_SUPABASE_ANON_KEY=[sua-chave-anon-publica]
```

---

## 2. Automação da Esteira de Vendas (CRM Webhook)

Para empurrar os leads automaticamente para o seu CRM (HubSpot, RD Station, ActiveCampaign ou Pipefy), configure a URL de um webhook (criado no **Make.com**, **n8n** ou **Zapier**) no seu `.env`:

```env
VITE_CRM_WEBHOOK_URL=https://hook.us1.make.com/[seu-webhook-id]
```

### O Fluxo Ideal no Make/n8n:
1. **Trigger:** Webhook recebe o JSON enviado pelo site.
2. **Action 1 (CRM):** Pesquisa se a empresa (CNPJ) já existe. Se não existir, cria o contato e a oportunidade na esteira de *"Novos Leads - B2B"*.
3. **Action 2 (Distribuição):** 
   - Se `lead_score` for `HOT` (consumo >= 100kg ou rede de franquias), envia um alerta sonoro de alta prioridade no canal do Slack/Discord da equipe comercial e notifica o supervisor.
   - Se for `WARM`, encaminha para a fila padrão de atendimento.
4. **Action 3 (WhatsApp Notifier):** Envia uma mensagem automática via API oficial (ex: Z-API) para o cliente confirmando a triagem de amostras, enquanto a equipe comercial entra em contato manual.

---

## 3. Conformidade com a LGPD (Adequações Técnicas)

A Landing Page coleta e audita os seguintes itens em cada lead:
- **Finalidade Legítima:** O consentimento é condicionado exclusivamente à triagem e envio de propostas e amostras comerciais.
- **Registro do Consentimento:** Salvamos o timestamp exato, o IP do cliente e as informações do navegador (UserAgent).
- **Banner de Cookies:** Para o rastreamento, o site bloqueia a execução de tags de rastreamento (Meta Pixel, Google Analytics) até que o consentimento no Banner de Cookies seja aceito de forma ativa pelo usuário.
