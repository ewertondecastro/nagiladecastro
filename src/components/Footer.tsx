import { Footer as V2Footer } from "@/components/v2/chrome";
import type { LocaleDict, Locale } from "@/types/locale";

// Rodapé do site: o mesmo do visual novo, em todas as páginas.
export default function Footer(_props: { dict: LocaleDict; locale?: Locale }) {
  return <V2Footer />;
}
