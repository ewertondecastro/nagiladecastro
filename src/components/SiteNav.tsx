"use client";

import { Nav } from "@/components/v2/chrome";
import type { LocaleDict, Locale } from "@/types/locale";

// Menu do site: agora é o mesmo menu do visual novo da home, em todas as
// páginas. As props continuam aqui para as páginas não precisarem mudar.
export default function SiteNav(_props: { dict: LocaleDict; locale: Locale }) {
  return <Nav />;
}
