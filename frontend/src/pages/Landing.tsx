import { Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import Logo from "../components/Logo";
import {
  ArrowRightIcon,
  BotIcon,
  CalendarIcon,
  ChartIcon,
  CheckIcon,
  DocsIcon,
  InboxIcon,
  InstagramIcon,
  KanbanIcon,
  SparkleIcon,
  UsersIcon,
  WhatsAppIcon,
} from "../components/icons";

const STEPS = [
  {
    title: "Лид пишет в WhatsApp или Instagram",
    text: "Заявка с рекламы попадает в единый поток обращений сразу после первого сообщения — без ручного переноса и потерь.",
  },
  {
    title: "AI-агент квалифицирует",
    text: "Бот на LLM выясняет бюджет, тип объекта, сроки и наличие архитектора по сценарию, заданному в системном промпте.",
  },
  {
    title: "Записывает на визит в офис",
    text: "Квалифицированный лид приглашается на встречу, событие бронируется в календаре — дальше в дело вступает менеджер.",
  },
  {
    title: "Менеджер закрывает сделку",
    text: "В любой момент диалог можно перехватить в общем инбоксе — бот сразу замолкает, пока разговор не вернут обратно.",
  },
];

const FEATURES = [
  {
    icon: InboxIcon,
    title: "Общий инбокс с live-обновлениями",
    text: "Все переписки WhatsApp и Instagram — в одном окне, с обновлением в реальном времени по WebSocket.",
  },
  {
    icon: BotIcon,
    title: "Перехват диалога в один клик",
    text: "Менеджер забирает диалог у бота, когда нужно вмешаться, и возвращает обратно, когда всё под контролем.",
  },
  {
    icon: KanbanIcon,
    title: "Канбан-доска лидов",
    text: "Воронка «Обращение → Квалифицирован → Записан → Пришёл → Сделка» с перетаскиванием карточек между стадиями.",
  },
  {
    icon: CalendarIcon,
    title: "Запись на визит в календарь",
    text: "Бот предлагает слоты и бронирует встречу в офисе, не дожидаясь, пока менеджер освободится.",
  },
  {
    icon: DocsIcon,
    title: "Выжимки диалогов",
    text: "Ключевые вводные по лиду — бюджет, метраж, сроки — собираются в структурированную заметку для менеджера.",
  },
  {
    icon: ChartIcon,
    title: "Статистика по воронке",
    text: "Сколько лидов обработано, сколько дошло до визита и сделки — видно на дашборде без выгрузок и таблиц.",
  },
];

export default function Landing() {
  const { token } = useAuth();

  return (
    <div className="min-h-screen bg-cream-50 text-ink-900">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-ink-900/5 bg-cream-50/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-600">
            <a href="#features" className="hover:text-ink-900 transition-colors">
              Возможности
            </a>
            <a href="#how" className="hover:text-ink-900 transition-colors">
              Как это работает
            </a>
            <a href="#channels" className="hover:text-ink-900 transition-colors">
              Каналы
            </a>
          </nav>
          <Link
            to={token ? "/dashboard" : "/login"}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 text-cream-50 text-sm font-semibold px-5 py-2.5 hover:bg-ink-800 transition-colors"
          >
            {token ? "Открыть CRM" : "Войти"}
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 right-[-10%] w-[520px] h-[520px] rounded-full bg-brand-gradient opacity-20 blur-3xl" />
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-2 gap-14 items-center relative">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white border border-ink-900/8 shadow-soft px-4 py-1.5 text-xs font-semibold text-ink-600">
              <SparkleIcon className="w-3.5 h-3.5 text-brand-600" />
              AI SDR для WhatsApp и Instagram
            </span>
            <h1 className="mt-6 text-4xl md:text-[3.25rem] leading-[1.08] font-extrabold tracking-tight text-ink-950">
              Ни один лид из Instagram
              <br />
              не остаётся <span className="text-brand-700">без ответа</span>
            </h1>
            <p className="mt-6 text-lg text-ink-600 max-w-md leading-relaxed">
              Visitly отвечает клиентам в WhatsApp и Instagram мгновенно, выясняет бюджет и сроки,
              бронирует визит в офис — а менеджер в любой момент может перехватить разговор.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to={token ? "/dashboard" : "/login"}
                className="inline-flex items-center gap-2 rounded-full bg-brand-gradient text-white text-sm font-semibold px-6 py-3.5 shadow-soft hover:opacity-90 transition-opacity"
              >
                {token ? "Открыть CRM" : "Войти в CRM"}
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <a href="#how" className="text-sm font-semibold text-ink-700 hover:text-ink-900 transition-colors">
                Как это устроено →
              </a>
            </div>
          </div>

          {/* Chat mockup */}
          <div className="relative">
            <div className="mx-auto max-w-sm rounded-[28px] border border-ink-900/8 bg-white shadow-soft p-5">
              <div className="flex items-center gap-3 pb-4 border-b border-ink-900/6">
                <div className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center text-white">
                  <WhatsAppIcon className="w-[18px] h-[18px]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-900">Studio Assistant</p>
                  <p className="text-xs text-ink-400">отвечает мгновенно</p>
                </div>
              </div>
              <div className="pt-4 space-y-3">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-cream-100 px-3.5 py-2.5 text-sm text-ink-800">
                  Здравствуйте! Хочу узнать про ремонт квартиры 65 м²
                </div>
                <div className="max-w-[85%] ml-auto rounded-2xl rounded-tr-sm bg-ink-900 text-cream-50 px-3.5 py-2.5 text-sm">
                  Добрый день 👋 Подскажите, пожалуйста, ориентировочный бюджет и есть ли уже дизайн-проект?
                </div>
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-cream-100 px-3.5 py-2.5 text-sm text-ink-800">
                  Бюджет около 3 млн, проекта пока нет
                </div>
                <div className="max-w-[85%] ml-auto rounded-2xl rounded-tr-sm bg-ink-900 text-cream-50 px-3.5 py-2.5 text-sm">
                  Отлично, подходит под наш формат. Когда удобно заглянуть в шоурум на 30 минут?
                </div>
              </div>
            </div>

            <div className="absolute -left-6 -bottom-6 hidden sm:flex items-center gap-2 rounded-2xl bg-white shadow-soft border border-ink-900/8 px-4 py-3">
              <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                <CheckIcon className="w-4 h-4 text-brand-700" />
              </div>
              <div>
                <p className="text-xs font-semibold text-ink-900">Лид квалифицирован</p>
                <p className="text-[11px] text-ink-400">записан на визит</p>
              </div>
            </div>

            <div className="absolute -right-4 -top-6 hidden sm:flex items-center gap-2 rounded-2xl bg-ink-900 text-cream-50 shadow-soft px-4 py-2.5">
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
              <p className="text-xs font-semibold">Ответ за секунды</p>
            </div>
          </div>
        </div>
      </section>

      {/* Channels */}
      <section id="channels" className="border-y border-ink-900/6 bg-white/60">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <p className="text-sm font-semibold text-ink-400 uppercase tracking-wide shrink-0">
            Работает там, где ваши лиды
          </p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4 text-ink-700">
            <span className="inline-flex items-center gap-2 font-semibold">
              <WhatsAppIcon className="w-5 h-5 text-brand-600" /> WhatsApp
            </span>
            <span className="inline-flex items-center gap-2 font-semibold">
              <InstagramIcon className="w-5 h-5 text-brand-600" /> Instagram Direct
            </span>
            <span className="inline-flex items-center gap-2 font-semibold">
              <CalendarIcon className="w-5 h-5 text-brand-600" /> Google Calendar
            </span>
            <span className="inline-flex items-center gap-2 font-semibold">
              <DocsIcon className="w-5 h-5 text-brand-600" /> Google Docs
            </span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink-950">Как это работает</h2>
          <p className="mt-3 text-ink-600">
            От первого сообщения до сделки — один непрерывный сценарий, без ручных передач между
            системами.
          </p>
        </div>
        <div className="mt-14 grid md:grid-cols-2 gap-x-10 gap-y-12">
          {STEPS.map((step, i) => (
            <div key={step.title} className="flex gap-5">
              <div className="shrink-0 w-11 h-11 rounded-2xl bg-ink-900 text-cream-50 flex items-center justify-center font-bold">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-bold text-ink-900">{step.title}</h3>
                <p className="mt-1.5 text-sm text-ink-600 leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-ink-950 text-cream-50">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-xl">
            <h2 className="text-3xl font-extrabold tracking-tight">Всё для отдела продаж студии</h2>
            <p className="mt-3 text-ink-300">
              Инбокс, CRM и аналитика в одном приложении — не нужно сверяться с тремя вкладками.
            </p>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/[0.08] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center text-white">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-ink-300 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="relative overflow-hidden rounded-[32px] bg-brand-gradient px-8 py-16 md:px-16 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_60%)]" />
          <UsersIcon className="mx-auto w-10 h-10 text-white/90" />
          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Готовы перестать терять лиды?
          </h2>
          <p className="mt-3 text-white/90 max-w-lg mx-auto">
            Войдите в CRM, чтобы увидеть текущие диалоги, воронку лидов и подключить бота на свой поток
            обращений.
          </p>
          <Link
            to={token ? "/dashboard" : "/login"}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink-950 text-white text-sm font-semibold px-7 py-3.5 hover:bg-ink-900 transition-colors"
          >
            {token ? "Открыть CRM" : "Войти в CRM"}
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink-900/6">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo />
          <p className="text-xs text-ink-400">© {new Date().getFullYear()} Visitly. Внутренний продукт.</p>
        </div>
      </footer>
    </div>
  );
}
