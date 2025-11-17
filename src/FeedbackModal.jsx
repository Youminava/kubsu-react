import React, { useEffect, useRef, useState } from "react";

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || ""; 

const LS_KEY = "feedbackFormData";

export default function FeedbackModal({ open, onRequestClose }) {
  const [form, setForm] = useState({
    fio: "",
    email: "",
    phone: "",
    org: "",
    message: "",
    consent: false,
  });
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const firstFieldRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setForm((prev) => ({ ...prev, ...parsed }));
      }
    } catch (_) {
    }
  }, []);

  useEffect(() => {
    if (open && firstFieldRef.current) {
      firstFieldRef.current.focus();
    }

    const onKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        e.preventDefault();
        onRequestClose?.();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onRequestClose]);

  useEffect(() => {
    try {
      const { consent, ...toSave } = form; 
      localStorage.setItem(LS_KEY, JSON.stringify(toSave));
    } catch (_) {
    }
  }, [form]);

  if (!open) return null;

  const updateField = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const clearForm = () => {
    setForm({ fio: "", email: "", phone: "", org: "", message: "", consent: false });
    try {
      localStorage.removeItem(LS_KEY);
    } catch (_) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "idle", message: "" });

    if (!form.consent) {
      setStatus({ type: "error", message: "Необходимо согласие на обработку персональных данных." });
      return;
    }

    if (!FORM_ENDPOINT) {
      setStatus({ type: "error", message: "Endpoint для отправки формы не настроен. Укажите VITE_FORM_ENDPOINT в .env." });
      return;
    }

    try {
      setStatus({ type: "loading", message: "Отправка..." });
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          full_name: form.fio,
          email: form.email,
          phone: form.phone,
          organization: form.org,
          message: form.message,
          consent: form.consent ? "yes" : "no",
          _source: "kubsu-react-feedback",
        }),
        mode: "cors",
      });

      const ok = res.ok;
      let detail = "";
      try { detail = await res.text(); } catch (_) {}

      if (!ok) {
        throw new Error(detail || `Ошибка отправки (${res.status})`);
      }

      setStatus({ type: "success", message: "Сообщение успешно отправлено!" });
      clearForm();
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Произошла ошибка при отправке." });
    }
  };

  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) onRequestClose?.();
  };

  return (
    <div className="modal-overlay" onClick={onOverlayClick} aria-hidden={!open}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="feedback-title">
        <div className="modal-header">
          <h3 id="feedback-title">Обратная связь</h3>
          <button className="modal-close" aria-label="Закрыть" onClick={() => onRequestClose?.()}>×</button>
        </div>
        <form className="feedback-form" onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            <div className="field">
              <label htmlFor="fio">ФИО</label>
              <input
                ref={firstFieldRef}
                id="fio"
                name="fio"
                type="text"
                value={form.fio}
                onChange={updateField}
                placeholder="Иванов Иван Иванович"
                autoComplete="name"
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={updateField}
                placeholder="name@example.com"
                autoComplete="email"
              />
            </div>
            <div className="field">
              <label htmlFor="phone">Телефон</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                pattern="^\+?[0-9\s\-()]{7,18}$"
                value={form.phone}
                onChange={updateField}
                placeholder="+7 (___) ___-__-__"
                autoComplete="tel"
              />
            </div>
            <div className="field">
              <label htmlFor="org">Организация</label>
              <input
                id="org"
                name="org"
                type="text"
                value={form.org}
                onChange={updateField}
                placeholder="ООО «Пример»"
                autoComplete="organization"
              />
            </div>
            <div className="field">
              <label htmlFor="message">Сообщение</label>
              <textarea
                id="message"
                name="message"
                required
                rows={3}
                value={form.message}
                onChange={updateField}
                placeholder="Кратко опишите ваш вопрос"
              />
            </div>
            <label className="consent">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                checked={form.consent}
                onChange={updateField}
                required
              />
              <span>
                Согласен(а) с политикой обработки персональных данных
              </span>
            </label>
            {status.type !== "idle" && status.message && (
              <div className={`status ${status.type}`}>{status.message}</div>
            )}
          </div>
          <div className="modal-actions">
            <button type="button" className="btn secondary" onClick={() => onRequestClose?.()}>Отмена</button>
            <button type="submit" className="btn primary" disabled={status.type === "loading"}>
              {status.type === "loading" ? "Отправка..." : "Отправить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
