export function AbstractOverlay({ index, viewBox = "0 0 400 300" }: { index: number; viewBox?: string }) {
  const variant = index % 6;
  const s = "rgba(0,0,0,0.07)";
  const d = "rgba(0,0,0,0.05)";
  const f = "rgba(0,0,0,0.035)";
  return (
    <svg width="100%" height="100%" viewBox={viewBox} preserveAspectRatio="none" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
      {variant === 0 && (
        <>
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1={-50 + i * 28} y1={0} x2={i * 28 + 80} y2={300} stroke={s} strokeWidth="0.7" />
          ))}
          <circle cx="310" cy="80" r="50" fill="none" stroke={d} strokeWidth="1.2" />
          <circle cx="310" cy="80" r="30" fill="none" stroke={d} strokeWidth="0.6" />
          {Array.from({ length: 7 }).map((_, i) => (
            <circle key={i} cx={50 + i * 40} cy={250} r="2.5" fill={d} />
          ))}
          <rect x="60" y="40" width="80" height="60" rx="4" fill="none" stroke={f} strokeWidth="0.8" strokeDasharray="5 4" />
        </>
      )}
      {variant === 1 && (
        <>
          {Array.from({ length: 10 }).map((_, r) =>
            Array.from({ length: 18 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={22 + c * 22} cy={20 + r * 28} r="1.4" fill={d} />
            ))
          )}
          <polygon points="300,50 340,90 260,90" fill="none" stroke={s} strokeWidth="1.2" />
          <polygon points="80,180 110,210 50,210" fill="none" stroke={f} strokeWidth="1" />
          <rect x="240" y="180" width="100" height="70" rx="6" fill="none" stroke={s} strokeWidth="0.8" strokeDasharray="6 4" />
        </>
      )}
      {variant === 2 && (
        <>
          {Array.from({ length: 7 }).map((_, i) => (
            <circle key={i} cx="200" cy="350" r={80 + i * 40} fill="none" stroke={s} strokeWidth="0.7" />
          ))}
          <line x1="0" y1="150" x2="400" y2="150" stroke={f} strokeWidth="0.5" strokeDasharray="3 6" />
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={i} x={30 + i * 70} y="30" width="8" height="8" rx="1" fill={d} transform={`rotate(45, ${34 + i * 70}, 34)`} />
          ))}
          <circle cx="340" cy="60" r="20" fill={f} />
          <circle cx="60" cy="80" r="14" fill="none" stroke={d} strokeWidth="1" />
        </>
      )}
      {variant === 3 && (
        <>
          {Array.from({ length: 5 }).map((_, i) => (
            <path key={i} d={`M0 ${50 + i * 50} Q100 ${20 + i * 40},200 ${60 + i * 45} T400 ${40 + i * 48}`} fill="none" stroke={s} strokeWidth="0.8" />
          ))}
          <circle cx="340" cy="50" r="22" fill={f} />
          <circle cx="70" cy="240" r="16" fill="none" stroke={d} strokeWidth="1.5" />
          <circle cx="70" cy="240" r="6" fill={d} />
          <polygon points="280,220 310,200 340,220 340,250 310,270 280,250" fill="none" stroke={d} strokeWidth="1" />
        </>
      )}
      {variant === 4 && (
        <>
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`h${i}`} x1={0} y1={i * 26} x2={400} y2={i * 26} stroke={f} strokeWidth="0.3" />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 30} y1={0} x2={i * 30} y2={300} stroke={f} strokeWidth="0.3" />
          ))}
          <polygon points="300,60 330,40 360,60 360,100 330,120 300,100" fill="none" stroke={s} strokeWidth="1.2" />
          <polygon points="60,180 85,165 110,180 110,210 85,225 60,210" fill="none" stroke={d} strokeWidth="1" />
          <circle cx="200" cy="150" r="35" fill="none" stroke={f} strokeWidth="0.8" strokeDasharray="4 4" />
        </>
      )}
      {variant === 5 && (
        <>
          <path d="M0 80 H100 V180 H220 V100 H350 V220 H400" fill="none" stroke={s} strokeWidth="0.9" />
          <path d="M0 200 H70 V120 H160 V240 H280 V140 H400" fill="none" stroke={d} strokeWidth="0.6" />
          {[[100,80],[100,180],[220,100],[350,100],[70,200],[160,120],[280,140]].map(([cx,cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3.5" fill={d} />
          ))}
          <rect x="290" y="40" width="60" height="40" rx="4" fill="none" stroke={f} strokeWidth="0.8" />
          <circle cx="50" cy="50" r="18" fill="none" stroke={f} strokeWidth="0.7" strokeDasharray="3 3" />
        </>
      )}
    </svg>
  );
}
