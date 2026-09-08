import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";
import Logo from "../components/Logo";
import { CheckIcon, EyeIcon, EyeOffIcon, SparkleIcon } from "../components/icons";

const HIGHLIGHTS = [
  "Единый инбокс WhatsApp и Instagram",
  "AI-квалификация лидов на лету",
  "Канбан-воронка от обращения до сделки",
];

export default function Login() {
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();
      login(data.token, data.email, data.name);
      navigate("/dashboard");
    } catch {
      setError("Неверный email или пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-cream-50">
      {/* Brand side */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-ink-950 text-cream-50 p-12">
        <div className="pointer-events-none absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-brand-gradient opacity-25 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-15%] right-[-10%] w-[360px] h-[360px] rounded-full bg-brand-gradient opacity-20 blur-3xl" />

        <Logo light />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-1.5 text-xs font-semibold text-cream-100">
            <SparkleIcon className="w-3.5 h-3.5 text-brand-400" />
            AI SDR для WhatsApp и Instagram
          </span>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight leading-tight">
            Каждый диалог — под контролем, каждый лид — доведён до визита
          </h1>
          <ul className="mt-8 space-y-3">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-center gap-3 text-sm text-ink-200">
                <span className="w-5 h-5 rounded-full bg-brand-gradient flex items-center justify-center shrink-0">
                  <CheckIcon className="w-3 h-3 text-white" />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-ink-400">© {new Date().getFullYear()} Visitly</p>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-10">
            <Logo />
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-ink-950">С возвращением</h2>
          <p className="mt-2 text-sm text-ink-500">Войдите, чтобы открыть инбокс и воронку лидов.</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <label className="block">
              <span className="block text-xs font-semibold text-ink-600 mb-1.5">Логин</span>
              <input
                className="w-full rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-300 outline-none transition-shadow focus:ring-2 focus:ring-brand-400/60 focus:border-brand-400"
                type="text"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin"
              />
            </label>
            <label className="block">
              <span className="block text-xs font-semibold text-ink-600 mb-1.5">Пароль</span>
              <div className="relative">
                <input
                  className="w-full rounded-xl border border-ink-900/10 bg-white pl-4 pr-11 py-3 text-sm text-ink-900 placeholder:text-ink-300 outline-none transition-shadow focus:ring-2 focus:ring-brand-400/60 focus:border-brand-400"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-ink-400 hover:text-ink-700 transition-colors"
                  aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                </button>
              </div>
            </label>

            {error && (
              <p className="rounded-lg bg-red-50 border border-red-100 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              className="w-full rounded-xl bg-brand-gradient text-white font-semibold py-3 text-sm shadow-soft hover:opacity-90 transition-opacity disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? "Входим…" : "Войти"}
            </button>
          </form>

          <Link to="/" className="mt-8 block text-center text-xs font-medium text-ink-400 hover:text-ink-600">
            ← На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
