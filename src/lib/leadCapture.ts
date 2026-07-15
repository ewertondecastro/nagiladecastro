// Lead capture, envia o cadastro para o Google Apps Script,
// que grava na planilha e dispara o e-mail de aviso.
//
// Configuração: cole a URL /exec do seu Apps Script em FALLBACK_ENDPOINT
// abaixo, OU defina a env NEXT_PUBLIC_LEAD_ENDPOINT (ex.: no Netlify).
// A env, se existir, tem prioridade.

const FALLBACK_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbw-jRrLn6lFpbCV8s9C-q_TbQwQ3XJzga-utodQeZ6WrpbW4uz5gUfiNizCUIkGJSI-/exec";

export const LEAD_ENDPOINT =
  process.env.NEXT_PUBLIC_LEAD_ENDPOINT || FALLBACK_ENDPOINT;

export const LEAD_ENDPOINT_CONFIGURED = LEAD_ENDPOINT.trim().length > 0;

export interface LeadPayload {
  name: string;
  email: string;
  city: string;
  state: string;
  country: string;
  resource: string;
  locale: string;
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  if (!LEAD_ENDPOINT_CONFIGURED) {
    // Endpoint ainda não configurado, não bloqueia o usuário,
    // mas avisa no console para não perdermos leads silenciosamente.
    console.warn(
      "[leadCapture] NEXT_PUBLIC_LEAD_ENDPOINT / FALLBACK_ENDPOINT vazio, lead não enviado."
    );
    return;
  }

  await fetch(LEAD_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      ...payload,
      submittedAt: new Date().toISOString(),
      page: typeof window !== "undefined" ? window.location.href : "",
    }),
  });
}
