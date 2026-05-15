export const WHATSAPP_PHONE = "15086489484";

export function whatsAppUrl(text: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}
