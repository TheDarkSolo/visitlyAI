import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useAuth } from "../lib/auth";
import { createStompClient } from "../lib/ws";
import { ConversationSummary, MessageResponse } from "../lib/types";
import ConversationList from "../components/ConversationList";
import MessageThread from "../components/MessageThread";
import AppShell from "../components/AppShell";
import { BotIcon, UsersIcon } from "../components/icons";

export default function Inbox() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const { data: conversations = [] } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => api.get<ConversationSummary[]>("/conversations"),
  });

  const { data: messages = [] } = useQuery({
    queryKey: ["messages", selectedId],
    queryFn: () => api.get<MessageResponse[]>(`/conversations/${selectedId}/messages`),
    enabled: !!selectedId,
  });

  const selected = useMemo(
    () => conversations.find((c) => c.id === selectedId) ?? null,
    [conversations, selectedId],
  );

  // Live-updates the conversation list (new leads, ownership changes).
  useEffect(() => {
    if (!token) return;
    const client = createStompClient(token);
    client.onConnect = () => {
      client.subscribe("/topic/inbox", (frame) => {
        const updated: ConversationSummary[] = JSON.parse(frame.body);
        queryClient.setQueryData<ConversationSummary[]>(["conversations"], (prev = []) => {
          const byId = new Map(prev.map((c) => [c.id, c]));
          for (const u of updated) byId.set(u.id, u);
          return Array.from(byId.values()).sort(
            (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
          );
        });
      });
    };
    client.activate();
    return () => {
      client.deactivate();
    };
  }, [token, queryClient]);

  // Live-appends new messages to the open thread.
  useEffect(() => {
    if (!token || !selectedId) return;
    const client = createStompClient(token);
    client.onConnect = () => {
      client.subscribe(`/topic/conversations/${selectedId}`, (frame) => {
        const message: MessageResponse = JSON.parse(frame.body);
        queryClient.setQueryData<MessageResponse[]>(["messages", selectedId], (prev = []) => [...prev, message]);
      });
    };
    client.activate();
    return () => {
      client.deactivate();
    };
  }, [token, selectedId, queryClient]);

  const takeover = async () => {
    if (!selectedId) return;
    await api.post(`/conversations/${selectedId}/takeover`);
    queryClient.invalidateQueries({ queryKey: ["conversations"] });
  };

  const release = async () => {
    if (!selectedId) return;
    await api.post(`/conversations/${selectedId}/release`);
    queryClient.invalidateQueries({ queryKey: ["conversations"] });
  };

  const send = async () => {
    if (!selectedId || !draft.trim()) return;
    await api.post(`/conversations/${selectedId}/messages`, { text: draft });
    setDraft("");
  };

  return (
    <AppShell title="Инбокс" fullBleed>
      <div className="h-full flex">
        <ConversationList conversations={conversations} selectedId={selectedId} onSelect={setSelectedId} />
        <div className="flex-1 flex flex-col min-w-0">
          {selected ? (
            <>
              <div className="flex justify-between items-center px-6 py-3 border-b border-ink-900/6 bg-white">
                <span className="inline-flex items-center gap-2 text-sm text-ink-600">
                  {selected.ownerType === "BOT" ? (
                    <BotIcon className="w-4 h-4 text-brand-600" />
                  ) : (
                    <UsersIcon className="w-4 h-4 text-ink-500" />
                  )}
                  {selected.ownerType === "BOT" ? "Бот отвечает автоматически" : "Диалог у менеджера"}
                </span>
                {selected.ownerType === "BOT" ? (
                  <button
                    onClick={takeover}
                    className="text-xs font-semibold bg-ink-900 text-white px-4 py-2 rounded-full hover:bg-ink-800 transition-colors"
                  >
                    Перехватить
                  </button>
                ) : (
                  <button
                    onClick={release}
                    className="text-xs font-semibold bg-cream-100 text-ink-700 px-4 py-2 rounded-full hover:bg-cream-200 transition-colors"
                  >
                    Вернуть боту
                  </button>
                )}
              </div>
              <MessageThread messages={messages} />
              {selected.ownerType === "MANAGER" && (
                <div className="p-4 border-t border-ink-900/6 bg-white flex gap-2">
                  <input
                    className="flex-1 rounded-xl border border-ink-900/10 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-400/60 focus:border-brand-400"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder="Написать клиенту..."
                  />
                  <button
                    onClick={send}
                    className="bg-brand-gradient text-white text-sm font-semibold px-5 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Отправить
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-sm text-ink-400 bg-cream-50">
              Выберите диалог слева
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
