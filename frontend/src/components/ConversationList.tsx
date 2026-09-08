import { ConversationSummary } from "../lib/types";
import { InstagramIcon, WhatsAppIcon } from "./icons";

interface Props {
  conversations: ConversationSummary[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function ConversationList({ conversations, selectedId, onSelect }: Props) {
  return (
    <div className="w-80 shrink-0 border-r border-ink-900/6 overflow-y-auto bg-white">
      {conversations.map((c) => {
        const active = selectedId === c.id;
        return (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`w-full text-left px-4 py-3.5 border-b border-ink-900/5 transition-colors ${
              active ? "bg-brand-50" : "hover:bg-cream-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                  active ? "bg-brand-gradient text-white" : "bg-cream-100 text-ink-500"
                }`}
              >
                {c.channel === "WHATSAPP" ? (
                  <WhatsAppIcon className="w-4 h-4" />
                ) : (
                  <InstagramIcon className="w-4 h-4" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-sm text-ink-900 truncate">
                    {c.leadName ?? "Без имени"}
                  </span>
                </div>
                <div className="text-xs text-ink-400">
                  {c.ownerType === "BOT" ? "🤖 бот отвечает" : "👤 менеджер ведёт"}
                </div>
              </div>
            </div>
          </button>
        );
      })}
      {conversations.length === 0 && <p className="p-4 text-sm text-ink-400">Пока нет диалогов</p>}
    </div>
  );
}
