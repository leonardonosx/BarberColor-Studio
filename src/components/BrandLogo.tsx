import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'compact' | 'light';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  showSubtitle = false,
  className = '',
}) => {
  const isLight = variant === 'light';
  const isCompact = variant === 'compact';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Isotipo geométrico BarberColor Studio */}
      <div
        className={`relative flex items-center justify-center rounded-xl border ${
          isLight
            ? 'bg-slate-900 border-amber-600/40 shadow-md'
            : 'bg-gradient-to-br from-amber-500/20 via-amber-400/10 to-slate-900 border-amber-500/40 shadow-lg shadow-amber-500/10'
        } ${isCompact ? 'w-9 h-9' : 'w-11 h-11'} shrink-0`}
      >
        <svg
          viewBox="0 0 40 40"
          className={isCompact ? 'w-6 h-6' : 'w-7 h-7'}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Aro cromático exterior */}
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke="url(#bc-gold-grad)"
            strokeWidth="2.2"
            strokeDasharray="72 14"
            strokeLinecap="round"
          />
          {/* Gota de colorimetría */}
          <path
            d="M20 7.5C20 7.5 13 15.5 13 21.5C13 25.366 16.134 28.5 20 28.5C23.866 28.5 27 25.366 27 21.5C27 15.5 20 7.5 20 7.5Z"
            stroke="#F59E0B"
            strokeWidth="2"
            fill="url(#bc-drop-grad)"
            fillOpacity="0.25"
          />
          {/* Hojas cruzadas de tijera / navaja de barbería */}
          <path
            d="M14.5 26.5L25.5 13.5M25.5 26.5L14.5 13.5"
            stroke="#FDE68A"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="20" cy="20" r="2" fill="#D4AF37" />
          <defs>
            <linearGradient id="bc-gold-grad" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE68A" />
              <stop offset="0.5" stopColor="#D4AF37" />
              <stop offset="1" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="bc-drop-grad" x1="20" y1="8" x2="20" y2="29" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F59E0B" />
              <stop offset="1" stopColor="#D4AF37" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Logotipo tipográfico */}
      <div className="min-w-0">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`font-display font-bold tracking-tight ${
              isCompact ? 'text-base' : 'text-lg'
            } ${isLight ? 'text-slate-900' : 'text-white'}`}
          >
            BarberColor
          </span>
          <span
            className={`font-semibold uppercase tracking-widest ${
              isCompact ? 'text-[10px]' : 'text-xs'
            } ${isLight ? 'text-amber-700' : 'text-amber-400'}`}
          >
            Studio
          </span>
        </div>
        {showSubtitle && (
          <p
            className={`text-[11px] mt-1 leading-tight ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            Academia Interactiva de Estilismo Capilar, Colorimetría y Barbería
          </p>
        )}
      </div>
    </div>
  );
};
