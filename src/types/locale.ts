export type Locale = "pt" | "en" | "es";
export type MentoriaSlug = "sono" | "maternidade" | "homeschool" | "meti";

export interface MentoriaDetail {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  intro: string;
  whyTitle: string;
  whyBody: string[];
  journeyTitle: string;
  journeyBody: string[];
  forWhomTitle: string;
  forWhomItems: string[];
  ctaLabel: string;
  ctaWhatsappText: string;
  backToHome: string;
}

export interface MentoriaCard {
  slug: MentoriaSlug;
  number: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  learnMore: string;
  contactCta: string;
  whatsappText: string;
  detail: MentoriaDetail;
}

export interface ProductItem {
  kind: "free" | "paid";
  badge: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  cta: string;
  whatsappText?: string;
  downloadUrl?: string;
  downloadFilename?: string;
  // Quando true, abre o formulário de captura antes de entregar o material.
  gated?: boolean;
}

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
    credentials: {
      label: string;
      items: string[];
    };
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
    cards: MentoriaCard[];
  };
  products: {
    sectionTitle: string;
    sectionSubtitle: string;
    placeholderNote: string;
    items: ProductItem[];
  };
  leadForm: {
    eyebrow: string;
    title: string;
    subtitle: string;
    name: string;
    email: string;
    city: string;
    state: string;
    country: string;
    submit: string;
    sending: string;
    cancel: string;
    errorRequired: string;
    errorEmail: string;
    errorGeneric: string;
    privacy: string;
  };
  contact: {
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
