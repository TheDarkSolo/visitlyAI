import { FunnelStage, LeadResponse } from "../lib/types";
import { STAGE_LABELS } from "../lib/funnel";

interface Props {
  lead: LeadResponse;
  stages: FunnelStage[];
  onMove: (id: string, stage: FunnelStage) => void;
}

export default function LeadCard({ lead, stages, onMove }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-ink-900/6 shadow-card p-4 space-y-2">
      <p className="font-semibold text-sm text-ink-900">{lead.name ?? "Без имени"}</p>
      <p className="text-xs text-ink-500">{lead.phone ?? lead.instagramHandle ?? "—"}</p>
      <div className="flex flex-wrap gap-1.5">
        {lead.budget && (
          <span className="text-[11px] font-medium bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full">
            {lead.budget}
          </span>
        )}
        {lead.projectType && (
          <span className="text-[11px] font-medium bg-cream-100 text-ink-600 px-2 py-0.5 rounded-full">
            {lead.projectType}
          </span>
        )}
      </div>
      <select
        className="text-xs border border-ink-900/10 rounded-lg px-2 py-1.5 w-full mt-1 bg-cream-50 text-ink-700 outline-none focus:ring-2 focus:ring-brand-400/60"
        value={lead.funnelStage}
        onChange={(e) => onMove(lead.id, e.target.value as FunnelStage)}
      >
        {stages.map((s) => (
          <option key={s} value={s}>
            {STAGE_LABELS[s]}
          </option>
        ))}
      </select>
    </div>
  );
}
