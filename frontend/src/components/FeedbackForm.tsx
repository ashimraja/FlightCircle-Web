import React, { useState } from "react";
import { useI18n } from "../i18n/I18nProvider";

export default function FeedbackForm({ onDone }: { onDone?: () => void }) {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Placeholder: send to server or analytics
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setDone(true);
    console.log("Feedback submitted:", { name, email, message });
    if (onDone) onDone();
  };

  if (done)
    return (
      <div className="space-y-4">
        <p className="text-lg font-semibold">{t("feedback.thanks")}</p>
        <p className="text-sm text-slate-600">{t("feedback.thanks_note")}</p>
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("feedback.name_label")}
          className="peer w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder-transparent focus:border-transparent focus:ring-2 focus:ring-brand transition-shadow shadow-sm"
        />
        <label className="absolute left-4 top-3 -translate-y-1/2 bg-white px-1 text-sm text-slate-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand pointer-events-none">
          {t("feedback.name_label")}
        </label>
      </div>

      <div className="relative">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("feedback.email_label")}
          className="peer w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder-transparent focus:border-transparent focus:ring-2 focus:ring-brand transition-shadow shadow-sm"
        />
        <label className="absolute left-4 top-3 -translate-y-1/2 bg-white px-1 text-sm text-slate-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand pointer-events-none">
          {t("feedback.email_label")}
        </label>
      </div>

      <div className="relative">
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder={t("feedback.message_label")}
          className="peer w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder-transparent focus:border-transparent focus:ring-2 focus:ring-brand transition-shadow shadow-sm resize-none"
        />
        <label className="absolute left-4 top-3 -translate-y-1/2 bg-white px-1 text-sm text-slate-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-brand pointer-events-none">
          {t("feedback.message_label")}
        </label>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-3xl bg-brand px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:shadow-lg hover:bg-brand-dark disabled:opacity-60"
        >
          {submitting ? t("feedback.submitting") : t("feedback.submit")}
        </button>
      </div>
    </form>
  );
}
