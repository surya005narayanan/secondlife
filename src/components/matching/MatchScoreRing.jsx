import React from 'react';

export default function MatchScoreRing({ score = 0, size = 70, strokeWidth = 6, showLabel = true }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.min(100, Math.max(0, score));
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  let strokeColor = '#10b981'; // orange
  let textColor = 'text-orange-400';
  let glowColor = 'rgba(16, 185, 129, 0.4)';

  if (clampedScore < 40) {
    strokeColor = '#64748b'; // slate
    textColor = 'text-[#6B6B6B]';
    glowColor = 'transparent';
  } else if (clampedScore < 70) {
    strokeColor = '#38bdf8'; // sky
    textColor = 'text-sky-400';
    glowColor = 'rgba(56, 189, 248, 0.3)';
  } else if (clampedScore < 90) {
    strokeColor = '#f59e0b'; // amber
    textColor = 'text-amber-400';
    glowColor = 'rgba(245, 158, 11, 0.3)';
  }

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1e293b"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress stroke */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          style={{
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.4s ease',
            filter: `drop-shadow(0 0 6px ${glowColor})`
          }}
        />
      </svg>
      {showLabel && (
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className={`font-mono font-extrabold ${textColor} text-sm leading-none`}>
            {clampedScore}%
          </span>
          <span className="text-[9px] uppercase tracking-wider text-[#6B6B6B] font-semibold mt-0.5">
            Match
          </span>
        </div>
      )}
    </div>
  );
}
