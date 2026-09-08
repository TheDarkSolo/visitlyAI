import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { ConversationSummary, LeadResponse } from "../lib/types";
import { STAGES, STAGE_LABELS } from "../lib/funnel";
import AppShell from "../components/AppShell";
import { ArrowRightIcon, BotIcon, InboxIcon, KanbanIcon, UsersIcon } from "../components/icons";

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof InboxIcon;
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl bg-white border border-ink-900/6 shadow-card p-5">
      <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center text-white">
        <Icon className="w-5 h-5" />
      </div>
      <p className="mt-4 text-2xl font-extrabold text-ink-950">{value}</p>
      <p className="text-sm text-ink-500">{label}</p>
      {hint && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
    </div>
  );
}

export default function Dashboard() {
  const { data: conversations = [] } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => api.get<ConversationSummary[]>("/conversations"),
  });
  const { data: leads = [] } = useQuery({
    queryKey: ["leads"],
    queryFn: () => api.get<LeadResponse[]>("/leads"),
  });

  const stats = useMemo(() => {
    const open = conversations.filter((c) => c.status === "OPEN").length;
    const withManager = conversations.filter((c) => c.ownerType === "MANAGER").length;
    const advanced = leads.filter((l) => l.funnelStage === "BOOKED" || l.funnelStage === "VISITED" || l.funnelStage === "SOLD").length;
    const byStage = STAGES.map((stage) => ({
      stage,
      count: leads.filter((l) => l.funnelStage === stage).length,
    }));
    const maxCount = Math.max(1, ...byStage.map((s) => s.count));
    return { open, withManager, advanced, byStage, maxCount };
  }, [conversations, leads]);

  const recent = useMemo(
    () =>
      [...conversations]
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 5),
    [conversations],
  );

  return (
    <AppShell title="Дашборд">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={UsersIcon} label="Всего лидов" value={leads.length} />
          <StatCard icon={InboxIcon} label="Открытых диалогов" value={stats.open} />
          <StatCard
            icon={BotIcon}
            label="У менеджера"
            value={stats.withManager}
            hint={`${conversations.length - stats.withManager} ведёт бот`}
          />
          <StatCard icon={KanbanIcon} label="Дошли до записи" value={stats.advanced} hint="Booked · Visited · Sold" />
        </div>

        <div className="grid lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3 rounded-2xl bg-white border border-ink-900/6 shadow-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-ink-950">Воронка лидов</h2>
              <Link
                to="/leads"
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-800"
              >
                Открыть канбан <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="mt-6 space-y-4">
              {stats.byStage.map(({ stage, count }) => (
                <div key={stage}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium text-ink-700">{STAGE_LABELS[stage]}</span>
                    <span className="text-ink-400">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-cream-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-brand-gradient"
                      style={{ width: `${(count / stats.maxCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              {leads.length === 0 && <p className="text-sm text-ink-400">Пока нет лидов в воронке.</p>}
            </div>
          </div>

          <div className="lg:col-span-2 rounded-2xl bg-white border border-ink-900/6 shadow-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-ink-950">Последние диалоги</h2>
              <Link
                to="/inbox"
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-800"
              >
                Инбокс <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="mt-4 space-y-1">
              {recent.map((c) => (
                <Link
                  key={c.id}
                  to="/inbox"
                  className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 -mx-3 hover:bg-cream-50 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink-900 truncate">{c.leadName ?? "Без имени"}</p>
                    <p className="text-xs text-ink-400">{c.channel === "WHATSAPP" ? "WhatsApp" : "Instagram"}</p>
                  </div>
                  <span
                    className={`text-[11px] font-semibold px-2 py-1 rounded-full shrink-0 ${
                      c.ownerType === "BOT" ? "bg-brand-50 text-brand-700" : "bg-ink-100 text-ink-600"
                    }`}
                  >
                    {c.ownerType === "BOT" ? "Бот" : "Менеджер"}
                  </span>
                </Link>
              ))}
              {recent.length === 0 && <p className="text-sm text-ink-400">Пока нет диалогов.</p>}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
