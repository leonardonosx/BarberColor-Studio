import React, { useState } from 'react';

interface ConceptVisualsProps {
  visualKey?: string;
  label: string;
}

export const ConceptVisuals: React.FC<ConceptVisualsProps> = ({ visualKey, label }) => {
  const [activeZone, setActiveZone] = useState<'60' | '30' | '10'>('60');

  if (visualKey === 'rule-60-30-10') {
    const zoneInfo = {
      '60': {
        title: '60% Color Dominante (Base)',
        desc: 'Cubre raíces y la mayor parte de la masa capilar. Define la altura principal (ej. Castaño 4 o Rubio Oscuro 6) y da estabilidad visual al diseño.',
        color: '#4A3728',
      },
      '30': {
        title: '30% Color Secundario (Transición)',
        desc: 'Se aplica en medios o difuminados (balayage/babylights) para conectar la base con el acento sin cortes bruscos.',
        color: '#B8864B',
      },
      '10': {
        title: '10% Color de Acento (Focal)',
        desc: 'Contorno frontal (money piece) o mechas puntuales de máxima luz que enmarcan el rostro y atraen la mirada.',
        color: '#FDE047',
      },
    }[activeZone];

    return (
      <div className="bg-[#0B0D12] border border-amber-500/25 rounded-2xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
            Esquema Interactivo: Haz clic en cada proporción
          </span>
        </div>

        {/* Barra interactiva 60 / 30 / 10 */}
        <div className="h-11 rounded-xl overflow-hidden flex border border-slate-700 cursor-pointer">
          <button
            type="button"
            onClick={() => setActiveZone('60')}
            className={`h-full flex items-center justify-center text-xs font-bold transition ${
              activeZone === '60' ? 'ring-2 ring-inset ring-white text-white' : 'text-white/80 opacity-85 hover:opacity-100'
            }`}
            style={{ width: '60%', backgroundColor: '#4A3728' }}
          >
            60% Base
          </button>
          <button
            type="button"
            onClick={() => setActiveZone('30')}
            className={`h-full flex items-center justify-center text-xs font-bold transition ${
              activeZone === '30' ? 'ring-2 ring-inset ring-white text-slate-950' : 'text-slate-950 opacity-85 hover:opacity-100'
            }`}
            style={{ width: '30%', backgroundColor: '#B8864B' }}
          >
            30% Medio
          </button>
          <button
            type="button"
            onClick={() => setActiveZone('10')}
            className={`h-full flex items-center justify-center text-xs font-bold transition ${
              activeZone === '10' ? 'ring-2 ring-inset ring-slate-950 text-slate-950' : 'text-slate-950 opacity-85 hover:opacity-100'
            }`}
            style={{ width: '10%', backgroundColor: '#FDE047' }}
          >
            10%
          </button>
        </div>

        {/* Ilustración SVG de Cabellera con Zonas */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          <div className="sm:col-span-5 flex justify-center bg-slate-950/70 rounded-xl p-3 border border-slate-800">
            <svg viewBox="0 0 160 150" className="w-36 h-32">
              {/* 60% Base Dominante */}
              <path
                d="M80 12 C42 12 22 45 22 95 L38 138 L122 138 L138 95 C138 45 118 12 80 12 Z"
                fill="#4A3728"
                stroke={activeZone === '60' ? '#FDE68A' : '#1E293B'}
                strokeWidth={activeZone === '60' ? '3' : '1.5'}
                opacity={activeZone === '60' ? 1 : 0.65}
              />
              {/* 30% Transición Secundaria */}
              <path
                d="M36 68 C48 82 55 110 52 138 L108 138 C105 110 112 82 124 68 C105 90 55 90 36 68 Z"
                fill="#B8864B"
                stroke={activeZone === '30' ? '#FDE68A' : 'none'}
                strokeWidth="2.5"
                opacity={activeZone === '30' ? 1 : 0.75}
              />
              {/* 10% Acento Frontal */}
              <path
                d="M52 28 C44 58 46 95 54 132 L62 132 C55 95 54 60 60 32 Z"
                fill="#FDE047"
                stroke={activeZone === '10' ? '#FFFFFF' : 'none'}
                strokeWidth="2"
                opacity={activeZone === '10' ? 1 : 0.7}
              />
              <path
                d="M108 28 C116 58 114 95 106 132 L98 132 C105 95 106 60 100 32 Z"
                fill="#FDE047"
                stroke={activeZone === '10' ? '#FFFFFF' : 'none'}
                strokeWidth="2"
                opacity={activeZone === '10' ? 1 : 0.7}
              />
            </svg>
          </div>
          <div className="sm:col-span-7 space-y-1.5">
            <h4 className="text-sm font-bold text-amber-300">{zoneInfo.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{zoneInfo.desc}</p>
          </div>
        </div>
      </div>
    );
  }

  if (visualKey === 'primary-colors') {
    return (
      <div className="bg-[#0B0D12] border border-amber-500/25 rounded-2xl p-4 flex items-center justify-around gap-3">
        {[
          { name: 'Amarillo', hex: '#FACC15' },
          { name: 'Azul', hex: '#2563EB' },
          { name: 'Rojo', hex: '#EF4444' },
        ].map((c) => (
          <div key={c.name} className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full border-2 border-white/20 shadow-lg" style={{ backgroundColor: c.hex }} />
            <span className="text-xs font-bold text-slate-200">{c.name}</span>
          </div>
        ))}
      </div>
    );
  }

  if (visualKey === 'complementary') {
    const pairs = [
      { a: 'Amarillo', ha: '#FACC15', b: 'Violeta', hb: '#9333EA' },
      { a: 'Naranja', ha: '#F97316', b: 'Azul', hb: '#2563EB' },
      { a: 'Rojo', ha: '#EF4444', b: 'Verde', hb: '#16A34A' },
    ];
    return (
      <div className="bg-[#0B0D12] border border-amber-500/25 rounded-2xl p-4 space-y-2.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
          Pares Opuestos de Neutralización
        </span>
        {pairs.map((p) => (
          <div key={p.a} className="flex items-center justify-between bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-800 text-xs">
            <span className="flex items-center gap-2 font-semibold text-white">
              <span className="w-4 h-4 rounded-full" style={{ backgroundColor: p.ha }} />
              {p.a}
            </span>
            <span className="text-amber-400 font-bold">↔ Neutraliza ↔</span>
            <span className="flex items-center gap-2 font-semibold text-white">
              {p.b}
              <span className="w-4 h-4 rounded-full" style={{ backgroundColor: p.hb }} />
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (visualKey === 'porosity') {
    return (
      <div className="bg-[#0B0D12] border border-amber-500/25 rounded-2xl p-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-3">
          Prueba del Vaso de Agua (Porosidad)
        </span>
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { title: 'Baja', pos: 'Flota arriba', y: 24, color: '#38BDF8' },
            { title: 'Media', pos: 'Suspensión media', y: 48, color: '#34D399' },
            { title: 'Alta', pos: 'Se hunde rápido', y: 74, color: '#FB7185' },
          ].map((item) => (
            <div key={item.title} className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 flex flex-col items-center">
              <svg viewBox="0 0 60 90" className="w-14 h-20">
                <rect x="10" y="10" width="40" height="72" rx="4" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
                <rect x="12" y="20" width="36" height="60" fill="#0284C7" fillOpacity="0.25" />
                <path d={`M18 ${item.y} Q30 ${item.y - 4} 42 ${item.y}`} stroke={item.color} strokeWidth="3" strokeLinecap="round" fill="none" />
              </svg>
              <span className="text-xs font-bold text-white mt-1">{item.title}</span>
              <span className="text-[10px] text-slate-400">{item.pos}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0D12] border border-amber-500/25 rounded-2xl p-4 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v4l3 3" />
        </svg>
      </div>
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
          Guía Visual de Salón
        </span>
        <p className="text-xs text-slate-300 mt-0.5">
          Concepto clave de <strong>{label}</strong> integrado en el protocolo técnico de BarberColor Studio.
        </p>
      </div>
    </div>
  );
};
