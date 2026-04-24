const ITEMS = [
  { icon: 'bolt', label: 'POWER', value: '120 HP' },
  { icon: 'speed', label: '0-100 KM/H', value: '< 4s' },
  { icon: 'fitness_center', label: 'WEIGHT', value: '< 300 kg' },
  { icon: 'public', label: 'CATEGORY', value: 'FS Combustion' },
  { icon: 'engineering', label: 'TEAM', value: '70+ Engineers' },
  { icon: 'workspace_premium', label: 'FOUNDED', value: '2025' },
  { icon: 'settings', label: 'DRIVETRAIN', value: 'RWD' }
];

export default function Marquee() {
  const loop = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="border-y border-white/5 bg-ink-900/40 overflow-hidden py-5">
      <div className="flex gap-12 w-max animate-marquee">
        {loop.map((it, i) => (
          <div key={i} className="flex items-center gap-3 shrink-0">
            <span className="material-symbols-outlined text-brand-400 text-[20px]">{it.icon}</span>
            <span className="mono-label">{it.label}</span>
            <span className="text-white font-bold text-sm tracking-tight">{it.value}</span>
            <span className="w-1 h-1 rounded-full bg-white/20 ml-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
