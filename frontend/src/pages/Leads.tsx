import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { FunnelStage, LeadResponse } from "../lib/types";
import { STAGES, STAGE_LABELS } from "../lib/funnel";
import LeadCard from "../components/LeadCard";
import AppShell from "../components/AppShell";

export default function Leads() {
  const queryClient = useQueryClient();
  const { data: leads = [] } = useQuery({
    queryKey: ["leads"],
    queryFn: () => api.get<LeadResponse[]>("/leads"),
  });

  const moveStage = async (id: string, funnelStage: FunnelStage) => {
    await api.patch(`/leads/${id}`, { funnelStage });
    queryClient.invalidateQueries({ queryKey: ["leads"] });
  };

  return (
    <AppShell title="Лиды" fullBleed>
      <div className="h-full overflow-x-auto p-6 flex gap-4">
        {STAGES.map((stage) => {
          const stageLeads = leads.filter((l) => l.funnelStage === stage);
          return (
            <div key={stage} className="w-72 shrink-0 flex flex-col">
              <div className="flex items-center justify-between mb-3 px-1">
                <h2 className="font-bold text-sm text-ink-800">{STAGE_LABELS[stage]}</h2>
                <span className="text-xs font-semibold text-ink-400 bg-white border border-ink-900/6 rounded-full px-2 py-0.5">
                  {stageLeads.length}
                </span>
              </div>
              <div className="space-y-3 overflow-y-auto pb-4">
                {stageLeads.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} stages={STAGES} onMove={moveStage} />
                ))}
                {stageLeads.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-ink-900/10 py-6 text-center text-xs text-ink-300">
                    Нет лидов
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
