import { FormEvent, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { BookingResponse, BookingStatus, LeadResponse } from "../lib/types";
import AppShell from "../components/AppShell";
import { CheckIcon } from "../components/icons";

const STATUS_LABELS: Record<BookingStatus, string> = {
  PENDING: "Ожидает подтверждения",
  CONFIRMED: "Подтверждено",
  CANCELLED: "Отменено",
};

const STATUS_STYLES: Record<BookingStatus, string> = {
  PENDING: "bg-brand-50 text-brand-700",
  CONFIRMED: "bg-emerald-50 text-emerald-700",
  CANCELLED: "bg-ink-100 text-ink-400 line-through",
};

function formatSchedule(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("ru-RU", { day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit" });
}

export default function Bookings() {
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [leadId, setLeadId] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => api.get<BookingResponse[]>("/bookings"),
  });

  const { data: leads = [] } = useQuery({
    queryKey: ["leads"],
    queryFn: () => api.get<LeadResponse[]>("/leads"),
  });

  const setStatus = async (id: string, status: BookingStatus) => {
    await api.patch(`/bookings/${id}`, { status });
    queryClient.invalidateQueries({ queryKey: ["bookings"] });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!leadId || !scheduledAt) return;
    setSaving(true);
    try {
      await api.post("/bookings", {
        leadId,
        scheduledAt: new Date(scheduledAt).toISOString(),
        notes: notes.trim() || null,
      });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      setFormOpen(false);
      setLeadId("");
      setScheduledAt("");
      setNotes("");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppShell
      title="Записи"
      actions={
        <button
          onClick={() => setFormOpen((v) => !v)}
          className="rounded-xl bg-brand-gradient text-white text-sm font-semibold px-4 py-2 shadow-soft hover:opacity-90 transition-opacity"
        >
          + Новая запись
        </button>
      }
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {formOpen && (
          <form onSubmit={onSubmit} className="bg-white rounded-2xl border border-ink-900/6 shadow-card p-5 space-y-4">
            <label className="block">
              <span className="block text-xs font-semibold text-ink-600 mb-1.5">Лид</span>
              <select
                className="w-full rounded-xl border border-ink-900/10 bg-cream-50 px-3 py-2.5 text-sm text-ink-900 outline-none focus:ring-2 focus:ring-brand-400/60"
                value={leadId}
                onChange={(e) => setLeadId(e.target.value)}
                required
              >
                <option value="">Выберите лида…</option>
                {leads.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name ?? "Без имени"} — {l.phone ?? l.instagramHandle ?? "?"}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="block text-xs font-semibold text-ink-600 mb-1.5">Дата и время визита</span>
              <input
                type="datetime-local"
                className="w-full rounded-xl border border-ink-900/10 bg-cream-50 px-3 py-2.5 text-sm text-ink-900 outline-none focus:ring-2 focus:ring-brand-400/60"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                required
              />
            </label>
            <label className="block">
              <span className="block text-xs font-semibold text-ink-600 mb-1.5">Заметки (необязательно)</span>
              <textarea
                className="w-full rounded-xl border border-ink-900/10 bg-cream-50 px-3 py-2.5 text-sm text-ink-900 outline-none focus:ring-2 focus:ring-brand-400/60"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Город, что обсудили, пожелания…"
              />
            </label>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-brand-gradient text-white text-sm font-semibold px-4 py-2.5 shadow-soft hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {saving ? "Сохраняю…" : "Записать"}
            </button>
          </form>
        )}

        <div className="space-y-3">
          {bookings.map((b) => (
            <div key={b.id} className="bg-white rounded-2xl border border-ink-900/6 shadow-card p-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold text-sm text-ink-900">{b.leadName ?? "Без имени"}</p>
                <p className="text-xs text-ink-500 mt-0.5">{b.leadPhone ?? "—"}</p>
                <p className="text-sm text-ink-700 mt-2 font-medium">{formatSchedule(b.scheduledAt)}</p>
                {b.notes && <p className="text-xs text-ink-400 mt-1 whitespace-pre-wrap">{b.notes}</p>}
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[b.status]}`}>
                  {STATUS_LABELS[b.status]}
                </span>
                {b.status === "PENDING" && (
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setStatus(b.id, "CONFIRMED")}
                      title="Подтвердить"
                      className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                    >
                      <CheckIcon className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setStatus(b.id, "CANCELLED")}
                      title="Отменить"
                      className="text-xs px-2 py-1 rounded-lg bg-ink-50 text-ink-500 hover:bg-ink-100 transition-colors"
                    >
                      Отменить
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {bookings.length === 0 && (
            <div className="rounded-2xl border border-dashed border-ink-900/10 py-10 text-center text-sm text-ink-300">
              Пока нет записей на визит
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
