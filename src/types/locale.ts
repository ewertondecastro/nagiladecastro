export type Locale = "pt" | "en" | "es";

export interface LocaleDict {
  meta: {
    title: string;
    description: string;
    locale: string;
  };
  nav: {
    pt: string;
    en: string;
    es: string;
  };
  hero: {
    tags: string;
    firstName: string;
    lastName: string;
    tagline: string[];
    location: string;
    scrollLabel: string;
  };
  quote: {
    text: string;
    attribution: string;
  };
  about: {
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    body: string[];
    partner: {
      label: string;
      handle: string;
      url: string;
    };
  };
  family: {
    titleLine1: string;
    titleLine2: string;
    body: string[];
  };
  services: {
    sectionTitle: string;
    sectionSubtitle: string;
    cards: Array<{
      number: string;
      titleLine1: string;
      titleLine2: string;
      description: string;
      cta: string;
      ctaUrl: string;
    }>;
  };
  instagram: {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    handle: string;
    cta: string;
    url: string;
  };
  footer: {
    name: string;
    copy: string;
  };
}
