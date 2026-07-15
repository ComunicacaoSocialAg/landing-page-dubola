/**
 * Lead Service - Dubola Alimentos
 * Estructura de Gerenciamento de Leads B2B, Integração com CRM, e Auditoria LGPD
 */

// Obter variáveis de ambiente de forma segura
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const CRM_WEBHOOK_URL = import.meta.env.VITE_CRM_WEBHOOK_URL || '';

/**
 * Função para obter o IP do cliente (essencial para auditoria de consentimento da LGPD)
 */
async function getClientIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(2000) });
    const data = await response.json();
    return data.ip || '0.0.0.0';
  } catch (error) {
    console.warn('Não foi possível obter o IP do cliente para auditoria LGPD:', error);
    return '127.0.0.1';
  }
}

/**
 * Envia o Lead para o Firebase Firestore (REST API - sem dependências de SDK)
 */
async function saveToFirebase(leadData) {
  try {
    const projectId = 'dubola-alimentos-b2b';
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/leads`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: {
          business_name: { stringValue: leadData.business_name },
          cnpj: { stringValue: leadData.cnpj },
          contact_name: { stringValue: leadData.contact_name },
          phone: { stringValue: leadData.phone },
          email: { stringValue: leadData.email || '' },
          city: { stringValue: leadData.city },
          state: { stringValue: leadData.state },
          business_type: { stringValue: leadData.business_type },
          consumption_monthly: { integerValue: leadData.consumption_monthly.toString() },
          lead_score: { stringValue: leadData.lead_score },
          timestamp: { stringValue: leadData.lgpd_consent_timestamp },
          lgpd_purpose: { stringValue: leadData.lgpd_purpose }
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Firebase REST API error: ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Erro ao salvar lead no Firebase, salvando em contingência local:', error);
    // Salva localmente em caso de erro
    const localLeads = JSON.parse(localStorage.getItem('dubola_leads') || '[]');
    localLeads.push({ ...leadData, sync_pending: true });
    localStorage.setItem('dubola_leads', JSON.stringify(localLeads));
    return { success: false, error: error.message };
  }
}

/**
 * Envia uma cópia dos dados do formulário para contato@tortillas.com.br
 */
async function sendEmailCopy(leadData) {
  try {
    const response = await fetch('https://formspree.io/f/mpwazpyp', { // Formspree endpoint para contato@tortillas.com.br
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subject: `[LEAD B2B DUBOLA] ${leadData.business_name}`,
        email_recipient: 'contato@tortillas.com.br',
        empresa: leadData.business_name,
        cnpj: leadData.cnpj,
        contato: leadData.contact_name,
        telefone: leadData.phone,
        email: leadData.email || 'Não informado',
        cidade: `${leadData.city}/${leadData.state}`,
        ramo: leadData.business_type,
        consumo_mensal: `${leadData.consumption_monthly} kg`,
        score: leadData.lead_score,
        data_consentimento: leadData.lgpd_consent_timestamp
      })
    });

    return { success: response.ok };
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Envia o Lead para a esteira de vendas do CRM via Webhook (Make/n8n/Zapier)
 */
async function sendToCrmWebhook(leadData) {
  if (!CRM_WEBHOOK_URL) {
    console.info('Webhook de CRM não configurado. Esteira de automação inativa.');
    return { success: false, reason: 'URL do Webhook não configurada' };
  }

  try {
    const response = await fetch(CRM_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData)
    });

    return { success: response.ok };
  } catch (error) {
    console.error('Erro ao enviar lead para o Webhook do CRM:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Dispara os pixels de rastreamento (Meta Pixel / Google Tag Manager)
 */
export function trackLeadEvent(leadData) {
  // 1. Meta / Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      value: leadData.lead_score === 'HOT' ? 500 : 100,
      currency: 'BRL',
      content_name: 'B2B Lead Proposal',
      content_category: 'Food Service',
      status: leadData.lead_score
    });
  }

  // 2. Google Analytics 4 / Tag Manager
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      event_category: 'B2B Commercial',
      event_label: leadData.business_name,
      value: leadData.lead_score === 'HOT' ? 500 : 100,
      currency: 'BRL',
      lead_score: leadData.lead_score,
      business_type: leadData.business_type
    });
  }
}

/**
 * Processador principal de Leads
 */
export async function submitB2BLead(rawFormData) {
  const ipAddress = await getClientIP();
  
  // Algoritmo de Lead Scoring (Definição de perfil estratégico)
  const isChain = rawFormData.businessType === 'redes' || rawFormData.businessName.toLowerCase().includes('rede') || rawFormData.businessName.toLowerCase().includes('franquia');
  const isHighVolume = parseInt(rawFormData.consumption || '0') >= 100;
  const leadScore = (isChain || isHighVolume) ? 'HOT' : 'WARM';

  // Estrutura de dados normalizada em conformidade com LGPD (Audit trail)
  const leadData = {
    business_name: rawFormData.businessName,
    cnpj: rawFormData.cnpj.replace(/\D/g, ''),
    contact_name: rawFormData.contactName,
    phone: rawFormData.phone.replace(/\D/g, ''),
    email: rawFormData.email || null,
    city: rawFormData.city,
    state: rawFormData.state.toUpperCase(),
    business_type: rawFormData.businessType || 'outros',
    consumption_monthly: parseInt(rawFormData.consumption || '0'),
    lead_score: leadScore,
    
    // Metadados de Consentimento LGPD (Respeitando a finalidade comercial legítima)
    lgpd_consent: true,
    lgpd_consent_timestamp: new Date().toISOString(),
    lgpd_consent_ip: ipAddress,
    lgpd_consent_user_agent: navigator.userAgent,
    lgpd_purpose: 'Contato comercial B2B para proposta de fornecimento de molhos'
  };

  // Executar envios assíncronos em paralelo
  const [dbResult, crmResult, emailResult] = await Promise.all([
    saveToFirebase(leadData),
    sendToCrmWebhook(leadData),
    sendEmailCopy(leadData)
  ]);

  // Executar tracking de pixels
  trackLeadEvent(leadData);

  // Retorna os dados com o score e status do envio para orientar o redirecionamento
  return {
    success: true,
    leadScore,
    leadData,
    dbSaved: dbResult.success,
    crmSent: crmResult.success,
    emailSent: emailResult.success
  };
}
