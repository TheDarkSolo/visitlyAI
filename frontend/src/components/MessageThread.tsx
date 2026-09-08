import { MessageResponse, MessageSender } from "../lib/types";

interface Props {
  messages: MessageResponse[];
}

const senderStyles: Record<MessageSender, string> = {
  LEAD: "bg-white border border-ink-900/6 self-start rounded-tl-sm text-ink-800",
  BOT: "bg-ink-900 text-cream-50 self-end rounded-tr-sm",
  MANAGER: "bg-brand-gradient text-white self-end rounded-tr-sm",
};

const senderLabel: Record<MessageSender, string> = {
  LEAD: "Клиент",
  BOT: "Бот",
  MANAGER: "Менеджер",
};

export default function MessageThread({ messages }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3 bg-cream-50">
      {messages.map((m) => (
        <div key={m.id} className={`max-w-md flex flex-col ${m.sender === "LEAD" ? "items-start" : "items-end"}`}>
          <div className={`px-4 py-2.5 rounded-2xl shadow-sm ${senderStyles[m.sender]}`}>
            <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.content}</p>
          </div>
          <p className="mt-1 px-1 text-[11px] text-ink-400">
            {senderLabel[m.sender]} · {new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      ))}
      {messages.length === 0 && (
        <div className="flex-1 flex items-center justify-center text-sm text-ink-400">Сообщений пока нет</div>
      )}
    </div>
  );
}
