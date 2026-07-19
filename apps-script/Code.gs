/**
 * Nagila Decastro: Endpoint de captura de leads (gate de verdade)
 *
 * Recebe os cadastros do site, grava na planilha, envia e-mail de aviso
 * e SÓ ENTÃO devolve o link secreto de download. Como o link nunca
 * aparece no código da página, não dá pra baixar sem preencher.
 *
 * Como atualizar (você já publicou uma vez):
 * 1. Extensões > Apps Script na planilha.
 * 2. Apague tudo e cole ESTE código. Salvar (disquete).
 * 3. Implantar > Gerenciar implantações > (lápis para editar) >
 *    Versão: Nova versão > Implantar. A URL /exec continua a mesma.
 *
 * IMPORTANTE: os links em RESOURCES abaixo são secretos. Não divulgue.
 */

var NOTIFY_EMAIL = "nagiladecastro@icloud.com"; // separe vários por vírgula
var SHEET_NAME = "Leads";

// Mapa dos materiais gratuitos: chave -> link secreto, nome do arquivo, rótulo.
var RESOURCES = {
  "cartoes": {
    url: "https://nagiladecastro.netlify.app/guides/dl-71c61bf8c3f36a188763.pdf",
    filename: "Cartoes-de-Portugues-para-os-Pequenos.pdf",
    label: "Cartões de Português para os Pequenos"
  },
  "sono": {
    url: "https://nagiladecastro.netlify.app/guides/dl-c397bd0e1e0faf240556.pdf",
    filename: "Guia-Primeiros-30-dias-do-sono.pdf",
    label: "Guia: Primeiros 30 dias do sono"
  }
};

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var res = RESOURCES[data.resourceKey] || null;
    var label = res ? res.label : (data.resource || "");

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        "Data/Hora", "Nome", "E-mail", "Cidade", "Estado",
        "País", "Material", "Interesse", "Idioma", "Página"
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
      label,
      data.interesse || "",
      data.locale || "",
      data.page || ""
    ]);

    sendNotification(data, label, now);

    return json({
      ok: true,
      downloadUrl: res ? res.url : "",
      downloadFilename: res ? res.filename : ""
    });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function sendNotification(data, label, now) {
  if (!NOTIFY_EMAIL) return;
  var subject = "Novo lead: " + (label || "material") +
                " (" + (data.name || "sem nome") + ")";
  var body =
    "Novo cadastro no site da Nagila:\n\n" +
    "Nome:    " + (data.name || "") + "\n" +
    "E-mail:  " + (data.email || "") + "\n" +
    "Cidade:  " + (data.city || "") + "\n" +
    "Estado:  " + (data.state || "") + "\n" +
    "País:    " + (data.country || "") + "\n\n" +
    (data.interesse ? "Interesse: " + data.interesse + "\n" : "") +
    "Material: " + (label || "") + "\n" +
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
