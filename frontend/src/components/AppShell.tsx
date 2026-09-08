import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../lib/auth";
import Logo from "./Logo";
import { ChartIcon, InboxIcon, KanbanIcon, LogOutIcon } from "./icons";

const NAV = [
  { to: "/dashboard", label: "Дашборд", icon: ChartIcon },
  { to: "/inbox", label: "Инбокс", icon: InboxIcon },
  { to: "/leads", label: "Лиды", icon: KanbanIcon },
];

interface AppShellProps {
  children: ReactNode;
  title: string;
  actions?: ReactNode;
  fullBleed?: boolean;
}

export default function AppShell({ children, title, actions, fullBleed = false }: AppShellProps) {
  const location = useLocation();
  const { name, email, logout } = useAuth();
  const initial = (name ?? email ?? "?").trim().slice(0, 1).toUpperCase();

  return (
    <div className="h-screen flex bg-cream-50">
      <aside className="w-60 shrink-0 bg-ink-950 text-cream-50 flex flex-col">
        <div className="h-16 flex items-center px-5 border-b border-white/10">
          <Logo light />
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((item) => {
            const active = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active ? "bg-white/10 text-white" : "text-ink-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-3 rounded-xl px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-xs font-bold text-white shrink-0">
              {initial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white truncate">{name ?? "Менеджер"}</p>
              <p className="text-xs text-ink-400 truncate">{email}</p>
            </div>
            <button
              onClick={logout}
              title="Выйти"
              className="text-ink-400 hover:text-white transition-colors shrink-0"
            >
              <LogOutIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 shrink-0 flex items-center justify-between px-6 border-b border-ink-900/8 bg-white/70 backdrop-blur">
          <h1 className="text-lg font-bold text-ink-950">{title}</h1>
          {actions}
        </header>
        <div className={`flex-1 min-h-0 ${fullBleed ? "" : "overflow-y-auto p-6"}`}>{children}</div>
      </div>
    </div>
  );
}
