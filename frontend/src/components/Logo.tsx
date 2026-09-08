interface LogoProps {
  className?: string;
  markOnly?: boolean;
  light?: boolean;
}

export default function Logo({ className = "", markOnly = false, light = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img src="/logo.svg" alt="Visitly" className="w-8 h-8 rounded-[9px] shrink-0" />
      {!markOnly && (
        <span className={`text-lg font-bold tracking-tight ${light ? "text-white" : "text-ink-900"}`}>
          Visitly
        </span>
      )}
    </div>
  );
}
