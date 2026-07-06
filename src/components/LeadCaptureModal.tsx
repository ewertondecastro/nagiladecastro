"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { submitLead } from "@/lib/leadCapture";
import { whatsAppUrl } from "@/lib/whatsapp";
import type { LocaleDict, ProductItem } from "@/types/locale";

interface Props {
  leadForm: LocaleDict["leadForm"];
  item: ProductItem;
  locale: string;
  onClose: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LeadCaptureModal({ leadForm, item, locale, onClose }: Props) {
  const [form, setForm] = useState({ name: "", email: "", city: "", state: "", country: "" });
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Fecha no ESC e trava o scroll do fundo enquanto o modal está aberto.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  function deliver() {
    if (item.downloadUrl) {
      const a = document.createElement("a");
      a.href = item.downloadUrl;
      if (item.downloadFilename) a.download = item.downloadFilename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else if (item.whatsappText) {
      window.open(whatsAppUrl(item.whatsappText), "_blank", "noopener,noreferrer");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const values = Object.values(form).map((v) => v.trim());
    if (values.some((v) => v.length === 0)) {
      setError(leadForm.errorRequired);
      return;
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      setError(leadForm.errorEmail);
      return;
    }

    setStatus("sending");
    const resource = `${item.titleLine1} ${item.titleLine2}`.trim();
    try {
      await submitLead({
        name: form.name.trim(),
        email: form.email.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        country: form.country.trim(),
        resource,
        locale,
      });
      deliver();
      onClose();
    } catch {
      // Não perde o lead nem trava o usuário: entrega mesmo assim.
      deliver();
      onClose();
    }
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const inputClass =
    "w-full bg-background border border-cream-line px-4 py-2.5 font-barlow text-text-primary text-[15px] outline-none focus:border-rose-accent transition-colors duration-200";
  const labelClass =
    "block font-barlow-condensed text-[11px] tracking-[0.2em] uppercase text-text-secondary mb-1.5";

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md bg-background border border-cream-line shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={leadForm.cancel}
          className="absolute top-4 right-4 text-text-secondary hover:text-rose-accent text-2xl leading-none transition-colors duration-200"
        >
          &times;
        </button>

        <div className="p-8 md:p-10">
          <span className="font-barlow-condensed text-[10px] tracking-[0.3em] uppercase text-rose-accent">
            {leadForm.eyebrow}
          </span>
          <h3
            className="font-playfair text-text-primary mt-2 mb-2 leading-tight"
            style={{ fontSize: "clamp(24px, 3vw, 32px)" }}
          >
            {leadForm.title}
          </h3>
          <p className="font-barlow text-text-secondary text-[15px] leading-relaxed mb-6">
            {leadForm.subtitle}
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className={labelClass} htmlFor="lc-name">{leadForm.name}</label>
              <input id="lc-name" className={inputClass} value={form.name} onChange={set("name")} autoComplete="name" />
            </div>
            <div>
              <label className={labelClass} htmlFor="lc-email">{leadForm.email}</label>
              <input id="lc-email" type="email" className={inputClass} value={form.email} onChange={set("email")} autoComplete="email" />
            </div>
            <div>
              <label className={labelClass} htmlFor="lc-city">{leadForm.city}</label>
              <input id="lc-city" className={inputClass} value={form.city} onChange={set("city")} autoComplete="address-level2" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass} htmlFor="lc-state">{leadForm.state}</label>
                <input id="lc-state" className={inputClass} value={form.state} onChange={set("state")} autoComplete="address-level1" />
              </div>
              <div>
                <label className={labelClass} htmlFor="lc-country">{leadForm.country}</label>
                <input id="lc-country" className={inputClass} value={form.country} onChange={set("country")} autoComplete="country-name" />
              </div>
            </div>

            {error && (
              <p className="font-barlow text-[13px] text-rose-accent">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full font-barlow-condensed text-xs tracking-widest uppercase px-5 py-3 bg-rose-accent text-background font-semibold hover:bg-text-primary transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? leadForm.sending : leadForm.submit}
            </button>

            <p className="font-barlow text-[11px] leading-relaxed text-text-muted text-center">
              {leadForm.privacy}
            </p>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
