import React, { useState } from 'react';
import { Sparkles, Eye } from 'lucide-react';

interface LevelRow {
  level: number;
  name: string;
  naturalHex: string;
  reflectName: string;
  reflectHex: string;
  tonerName: string;
  tonerHex: string;
  neutralizedHex: string;
  note: string;
}

const LEVELS: LevelRow[] = [
  {
    level: 1,
    name: 'Negro',
    naturalHex: '#121216',
    reflectName: 'Rojo profundo',
    reflectHex: '#7F1D1D',
    tonerName: 'Verde intenso',
    tonerHex: '#15803D',
    neutralizedHex: '#2B2623',
    note: 'Máxima concentración de eumelanina. El fondo rojo profundo requiere matiz verde intenso para evitar reflejos cálidos.',
  },
  {
    level: 2,
    name: 'Moreno',
    naturalHex: '#231814',
    reflectName: 'Rojo',
    reflectHex: '#991B1B',
    tonerName: 'Verde',
    tonerHex: '#16A34A',
    neutralizedHex: '#352D28',
    note: 'Base muy oscura con subtono rojizo al aclarar. El verde neutraliza el exceso de rojo.',
  },
  {
    level: 3,
    name: 'Castaño Oscuro',
    naturalHex: '#362218',
    reflectName: 'Rojo',
    reflectHex: '#B91C1C',
    tonerName: 'Verde',
    tonerHex: '#22C55E',
    neutralizedHex: '#463A32',
    note: 'Al iniciar aclaración revela pigmento rojo puro; matizar con base verde o ceniza profundo.',
  },
  {
    level: 4,
    name: 'Castaño',
    naturalHex: '#4E3121',
    reflectName: 'Rojo-Naranja',
    reflectHex: '#DC2626',
    tonerName: 'Azul-Verde',
    tonerHex: '#0D9488',
    neutralizedHex: '#5B4D42',
    note: 'Equilibrio entre rojo y naranja. Se neutraliza combinando pigmento azul y verde.',
  },
  {
    level: 5,
    name: 'Castaño Claro',
    naturalHex: '#69452D',
    reflectName: 'Rojo-Naranja',
    reflectHex: '#EA580C',
    tonerName: 'Azul-Verde',
    tonerHex: '#14B8A6',
    neutralizedHex: '#706052',
    note: 'Altura clásica de transición. Su fondo cálido cobrizo-rojizo se enfría con azul-verde.',
  },
  {
    level: 6,
    name: 'Rubio Oscuro',
    naturalHex: '#845B38',
    reflectName: 'Naranja',
    reflectHex: '#F97316',
    tonerName: 'Azul',
    tonerHex: '#2563EB',
    neutralizedHex: '#877666',
    note: 'Fondo naranja puro. El matizante azul (cenizo) es su complementario exacto.',
  },
  {
    level: 7,
    name: 'Rubio',
    naturalHex: '#A57848',
    reflectName: 'Naranja-Amarillo',
    reflectHex: '#FB923C',
    tonerName: 'Azul-Violeta',
    tonerHex: '#4F46E5',
    neutralizedHex: '#9E8D7B',
    note: 'Fondo dorado-cobrizo. Requiere azul-violeta para lograr un rubio medio natural sin reflejo naranja.',
  },
  {
    level: 8,
    name: 'Rubio Claro',
    naturalHex: '#C5995B',
    reflectName: 'Amarillo-Naranja',
    reflectHex: '#FBBF24',
    tonerName: 'Violeta-Azul',
    tonerHex: '#6366F1',
    neutralizedHex: '#B9A996',
    note: 'Predomina el amarillo con ligero naranja. Un matiz violeta-azul lo transforma en rubio beige frío.',
  },
  {
    level: 9,
    name: 'Rubio Muy Claro',
    naturalHex: '#DEC07C',
    reflectName: 'Amarillo',
    reflectHex: '#FDE047',
    tonerName: 'Violeta',
    tonerHex: '#9333EA',
    neutralizedHex: '#D8CFC2',
    note: 'Fondo amarillo limpio (interior de cáscara de plátano). El violeta lo neutraliza a rubio perlado.',
  },
  {
    level: 10,
    name: 'Rubio Platino',
    naturalHex: '#EFE2B8',
    reflectName: 'Amarillo pálido',
    reflectHex: '#FEF08A',
    tonerName: 'Violeta suave',
    tonerHex: '#A855F7',
    neutralizedHex: '#EAE5DC',
    note: 'Aclaración máxima con mínimo pigmento amarillo pálido. Un toque suave de violeta deja un platino puro.',
  },
];

type PreviewMode = 'natural' | 'reflect' | 'neutralized';

export const LevelColorTable: React.FC = () => {
  const [selected, setSelected] = useState<LevelRow>(LEVELS[6]); // Altura 7 por defecto
  const [mode, setMode] = useState<PreviewMode>('natural');

  const activeHex =
    mode === 'natural'
      ? selected.naturalHex
      : mode === 'reflect'
      ? selected.reflectHex
      : selected.neutralizedHex;

  const activeLabel =
    mode === 'natural'
      ? `Tono Natural: ${selected.name} (Altura ${selected.level})`
      : mode === 'reflect'
      ? `Fondo de Aclaración: ${selected.reflectName}`
      : `Cabello Matizado con ${selected.tonerName}`;

  return (
    <div className="bg-slate-900/90 border border-amber-500/25 rounded-2xl p-5 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
            Tabla Técnica Interactiva: Alturas de Tono Natural (1 al 10) y Fondo de Aclaración
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            Haz clic en cualquier altura o color de la tabla para previsualizar el resultado real en el cabello.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Tabla Interactiva */}
        <div className="lg:col-span-7 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300">
                <th className="py-2 px-2 font-bold">Altura</th>
                <th className="py-2 px-2 font-bold">Tono Natural</th>
                <th className="py-2 px-2 font-bold">Fondo Aclaración</th>
                <th className="py-2 px-2 font-bold">Matiz Neutralizante</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {LEVELS.map((row) => {
                const isRowActive = selected.level === row.level;
                return (
                  <tr
                    key={row.level}
                    onClick={() => setSelected(row)}
                    className={`cursor-pointer transition ${
                      isRowActive
                        ? 'bg-amber-500/15 ring-1 ring-inset ring-amber-500/40'
                        : 'hover:bg-slate-800/50'
                    }`}
                  >
                    <td className="py-2 px-2 font-bold text-amber-300">{row.level}</td>
                    <td className="py-2 px-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(row);
                          setMode('natural');
                        }}
                        className="inline-flex items-center gap-2 text-slate-200 hover:text-white cursor-pointer"
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-white/25 shrink-0 shadow"
                          style={{ backgroundColor: row.naturalHex }}
                        />
                        <span>{row.name}</span>
                      </button>
                    </td>
                    <td className="py-2 px-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(row);
                          setMode('reflect');
                        }}
                        className="inline-flex items-center gap-2 text-slate-200 hover:text-white cursor-pointer"
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-white/25 shrink-0 shadow"
                          style={{ backgroundColor: row.reflectHex }}
                        />
                        <span>{row.reflectName}</span>
                      </button>
                    </td>
                    <td className="py-2 px-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(row);
                          setMode('neutralized');
                        }}
                        className="inline-flex items-center gap-2 text-slate-200 hover:text-white cursor-pointer"
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-white/25 shrink-0 shadow"
                          style={{ backgroundColor: row.tonerHex }}
                        />
                        <span>{row.tonerName}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Visor de Cabello Resultante */}
        <div className="lg:col-span-5 bg-[#0B0D12] border border-amber-500/25 rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Vista en Cabello — Altura {selected.level}
            </span>
          </div>

          {/* Botones de estado (Natural / Fondo / Matizado) */}
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => setMode('natural')}
              className={`py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition ${
                mode === 'natural'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Natural
            </button>
            <button
              type="button"
              onClick={() => setMode('reflect')}
              className={`py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition ${
                mode === 'reflect'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Aclarado
            </button>
            <button
              type="button"
              onClick={() => setMode('neutralized')}
              className={`py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition ${
                mode === 'neutralized'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Matizado
            </button>
          </div>

          {/* Silueta de Cabello con Color Resultante */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col items-center">
            <svg viewBox="0 0 180 185" className="w-40 h-44 drop-shadow-2xl">
              <defs>
                <linearGradient id="hair-sheen" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.28" />
                </linearGradient>
              </defs>
              {/* Rostro base */}
              <ellipse cx="90" cy="84" rx="34" ry="44" fill="#D9A782" />
              {/* Masa capilar con color dinámico */}
              <path
                d="M90 14 C44 14 24 52 24 106 C24 134 32 162 44 174 L60 164 C54 136 52 98 58 64 C66 48 114 48 122 64 C128 98 126 136 120 164 L136 174 C148 162 156 134 156 106 C156 52 136 14 90 14 Z"
                fill={activeHex}
                stroke="#FFFFFF25"
                strokeWidth="1.5"
              />
              {/* Flequillo / Volumen superior */}
              <path
                d="M52 54 C65 26 115 26 128 54 C112 42 68 42 52 54 Z"
                fill={activeHex}
              />
              {/* Brillo especular sobre la cabellera */}
              <path
                d="M90 14 C44 14 24 52 24 106 C24 134 32 162 44 174 L60 164 C54 136 52 98 58 64 C66 48 114 48 122 64 C128 98 126 136 120 164 L136 174 C148 162 156 134 156 106 C156 52 136 14 90 14 Z"
                fill="url(#hair-sheen)"
              />
              <path d="M44 62 Q36 105 44 150" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M136 62 Q144 105 136 150" stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="3" strokeLinecap="round" fill="none" />
            </svg>

            <div className="text-center mt-2 space-y-1">
              <p className="text-xs font-bold text-white">{activeLabel}</p>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-amber-300">
                {activeHex}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 border border-slate-800 rounded-xl p-3">
            {selected.note}
          </p>
        </div>
      </div>
    </div>
  );
};
