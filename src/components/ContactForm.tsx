"use client";

import { useState } from "react";
import { submitLead } from "@/lib/leadCapture";
import type { LocaleDict } from "@/types/locale";

interface Props {
  dict: LocaleDict;
}

const inputClass =
  "w-full bg-background border border-cream-line px-4 py-3 font-barlow text-[16px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-olive transition-colors duration-200";
const labelClass =
  "font-barlow-condensed text-[11px] tracking-[0.2em] uppercase text-text-secondary mb-2 block";

export default function ContactForm({ dict }: Props) {
  const { contact, leadForm, meta } = dict;

  const [values, setValues] = useState({
    name: "",
    email: "",
    interest: "",
    city: "",
    state: "",
    country: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  function set(field: keyof typeof values, v: string) {
    setValues((prev) => ({ ...prev, [field]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!values.name.trim() || !values.email.trim() || !values.interest) {
      setError(leadForm.errorRequired);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      setError(leadForm.errorEmail);
      return;
    }
    setStatus("sending");
    try {
      const res = await submitLead({
        name: values.name.trim(),
        email: values.email.trim(),
        city: values.city.trim(),
        state: values.state.trim(),
        country: values.country.trim(),
        interesse: values.interest,
        resource: `Contato — ${values.interest}`,
        resourceKey: "",
        locale: meta.locale,
      });
      if (res.ok) {
        setStatus("done");
      } else {
        setStatus("error");
        setError(leadForm.errorGeneric);
      }
    } catch {
      setStatus("error");
      setError(leadForm.errorGeneric);
    }
  }

  if (status === "done") {
    return (
      <div className="w-full max-w-xl mx-auto text-center py-10">
        <div className="w-10 h-px bg-terracotta mx-auto mb-6" aria-hidden="true" />
        <p className="font-playfair italic text-text-primary" style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}>
          {contact.formSuccess}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl mx-auto text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} htmlFor="cf-name">{leadForm.name}</label>
          <input id="cf-name" className={inputClass} value={values.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
        </div>
        <div>
          <label className={labelClass} htmlFor="cf-email">{leadForm.email}</label>
          <input id="cf-email" type="email" className={inputClass} value={values.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
        </div>
      </div>

      <div className="mt-5">
        <label className={labelClass} htmlFor="cf-interest">{contact.interestLabel}</label>
        <select
          id="cf-interest"
          className={`${inputClass} appearance-none cursor-pointer`}
          value={values.interest}
          onChange={(e) => set("interest", e.target.value)}
        >
          <option value="" disabled>
            {contact.interestPlaceholder}
          </option>
          {contact.interestOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
        <div>
          <label className={labelClass} htmlFor="cf-city">{leadForm.city}</label>
          <input id="cf-city" className={inputClass} value={values.city} onChange={(e) => set("city", e.target.value)} autoComplete="address-level2" />
        </div>
        <div>
          <label className={labelClass} htmlFor="cf-state">{leadForm.state}</label>
          <input id="cf-state" className={inputClass} value={values.state} onChange={(e) => set("state", e.target.value)} autoComplete="address-level1" />
        </div>
        <div>
          <label className={labelClass} htmlFor="cf-country">{leadForm.country}</label>
          <input id="cf-country" className={inputClass} value={values.country} onChange={(e) => set("country", e.target.value)} autoComplete="country-name" />
        </div>
      </div>

      {error && (
        <p className="mt-4 font-barlow text-[15px] text-olive">{error}</p>
      )}

      <div className="mt-7 flex flex-col items-center gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center font-barlow-condensed text-sm tracking-[0.2em] uppercase px-10 py-4 bg-terracotta text-background font-semibold hover:bg-text-primary transition-colors duration-200 disabled:opacity-60"
        >
          {status === "sending" ? contact.formSending : contact.formSubmit}
        </button>
        <p className="font-barlow text-[13px] text-text-muted text-center max-w-md">
          {leadForm.privacy}
        </p>
      </div>
    </form>
  );
}
