// Lead capture, envia o cadastro para o Google Apps Script,
// que grava na planilha, dispara o e-mail e devolve o link secreto
// de download (gate de verdade: o link nunca fica no código da página).
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
  resourceKey: string;
  locale: string;
}

export interface LeadResult {
  ok: boolean;
  downloadUrl?: string;
  downloadFilename?: string;
}

// Envia o lead e retorna o link de download que o servidor liberou.
// Usa mode "cors" com body text/plain (requisição "simples", sem preflight),
// para conseguir LER a resposta do Apps Script.
export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  if (!LEAD_ENDPOINT_CONFIGURED) {
    console.warn(
      "[leadCapture] NEXT_PUBLIC_LEAD_ENDPOINT / FALLBACK_ENDPOINT vazio, lead não enviado."
    );
    return { ok: false };
  }

  const res = await fetch(LEAD_ENDPOINT, {
    method: "POST",
    mode: "cors",
    redirect: "follow",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      ...payload,
      submittedAt: new Date().toISOString(),
      page: typeof window !== "undefined" ? window.location.href : "",
    }),
  });

  const data = (await res.json()) as LeadResult;
  return data;
}
