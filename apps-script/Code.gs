/**
 * Nagila Decastro — Endpoint de captura de leads
 *
 * Recebe os cadastros do site, grava cada um numa aba da planilha
 * e envia um e-mail de aviso.
 *
 * ── Como publicar ──────────────────────────────────────────────
 * 1. Crie uma planilha nova no Google Sheets (ex.: "Leads Nagila").
 * 2. Menu Extensões > Apps Script. Apague o conteúdo e cole ESTE código.
 * 3. Ajuste NOTIFY_EMAIL abaixo (pode ter vários, separados por vírgula).
 * 4. Salvar (ícone de disquete).
 * 5. Implantar > Nova implantação.
 *      - Tipo (engrenagem): App da Web
 *      - Executar como: Eu
 *      - Quem tem acesso: Qualquer pessoa
 *    Clique em Implantar e autorize (a primeira vez pede permissão).
 * 6. Copie a URL que termina em /exec.
 * 7. No site, cole essa URL em FALLBACK_ENDPOINT (src/lib/leadCapture.ts)
 *    OU defina a env NEXT_PUBLIC_LEAD_ENDPOINT no Netlify e faça deploy.
 *
 * Sempre que mudar este código, faça "Gerenciar implantações" >
 * editar > Nova versão, para a URL passar a usar a versão nova.
 * ───────────────────────────────────────────────────────────────
 */

var NOTIFY_EMAIL = "nagiladecastro@icloud.com"; // separe vários por vírgula
var SHEET_NAME = "Leads";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        "Data/Hora", "Nome", "E-mail", "Cidade", "Estado",
        "País", "Material", "Idioma", "Página"
      ]);
    }

    var now = new Date();
    sheet.appendRow([
      now,
      data.name || "",
      data.email || "",
      data.city || "",
      data.state || "",
      data.country || "",
      data.resource || "",
      data.locale || "",
      data.page || ""
    ]);

    sendNotification(data, now);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function sendNotification(data, now) {
  if (!NOTIFY_EMAIL) return;
  var subject = "Novo lead — " + (data.resource || "material") +
                " (" + (data.name || "sem nome") + ")";
  var body =
    "Novo cadastro no site da Nagila:\n\n" +
    "Nome:    " + (data.name || "") + "\n" +
    "E-mail:  " + (data.email || "") + "\n" +
    "Cidade:  " + (data.city || "") + "\n" +
    "Estado:  " + (data.state || "") + "\n" +
    "País:    " + (data.country || "") + "\n\n" +
    "Material: " + (data.resource || "") + "\n" +
    "Idioma:   " + (data.locale || "") + "\n" +
    "Data:     " + now + "\n" +
    "Página:   " + (data.page || "") + "\n";
  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Teste rápido no navegador: abrir a URL /exec deve responder um JSON.
function doGet() {
  return json({ ok: true, message: "Nagila lead endpoint online" });
}
