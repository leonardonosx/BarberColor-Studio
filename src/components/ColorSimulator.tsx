import React, { useState } from 'react';
import { Palette, Sparkles, Sliders, CheckCircle2, AlertTriangle } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

type SimTab = 'mixer' | 'neutralize' | 'rule603010';
type HarmonyType = 'Complementaria' | 'Análoga' | 'Triádica' | 'Tetrádica';

interface BaseColor {
  name: string;
  hex: string;
  hue: number;
  category: 'Primario' | 'Secundario';
  temp: 'Cálido' | 'Frío';
}

const BASE_COLORS: BaseColor[] = [
  { name: 'Amarillo', hex: '#FACC15', hue: 50, category: 'Primario', temp: 'Cálido' },
  { name: 'Naranja', hex: '#F97316', hue: 24, category: 'Secundario', temp: 'Cálido' },
  { name: 'Rojo', hex: '#EF4444', hue: 0, category: 'Primario', temp: 'Cálido' },
  { name: 'Violeta', hex: '#9333EA', hue: 272, category: 'Secundario', temp: 'Frío' },
  { name: 'Azul', hex: '#2563EB', hue: 220, category: 'Primario', temp: 'Frío' },
  { name: 'Verde', hex: '#16A34A', hue: 142, category: 'Secundario', temp: 'Frío' },
];

interface BleachedLevel {
  id: string;
  level: string;
  reflect: string;
  baseHex: string;
  idealMatiz: string;
  neutralHex: string;
  explanation: string;
}

const BLEACHED_LEVELS: BleachedLevel[] = [
  {
    id: 'lvl-9-10',
    level: 'Altura 9 – 10 (Rubio Muy Claro / Platino)',
    reflect: 'Reflejo Amarillo Indeseado',
    baseHex: '#FDE047',
    idealMatiz: 'Violeta',
    neutralHex: '#E7E2D8',
    explanation: 'El matizante Violeta es opuesto al Amarillo en el círculo cromático, neutralizando el tono dorado hacia un rubio beige/perlado limpio.',
  },
  {
    id: 'lvl-8',
    level: 'Altura 8 (Rubio Claro)',
    reflect: 'Reflejo Amarillo-Naranja',
    baseHex: '#FDBA74',
    idealMatiz: 'Azul-Violeta',
    neutralHex: '#C7B8A5',
    explanation: 'Al tener carga amarilla y naranja, requiere un matizante dual Azul-Violeta para neutralizar ambos reflejos cálidos.',
  },
  {
    id: 'lvl-6-7',
    level: 'Altura 6 – 7 (Rubio Oscuro / Medio)',
    reflect: 'Reflejo Naranja Intenso',
    baseHex: '#F97316',
    idealMatiz: 'Azul',
    neutralHex: '#9C8A78',
    explanation: 'El pigmento Azul neutraliza el Naranja (su complementario directo), logrando un castaño claro o rubio oscuro cenizo.',
  },
  {
    id: 'lvl-2-3',
    level: 'Altura 2 – 3 (Castaño Oscuro)',
    reflect: 'Reflejo Rojo Residual',
    baseHex: '#DC2626',
    idealMatiz: 'Verde',
    neutralHex: '#5C4D42',
    explanation: 'El matizante Verde contrarresta el fondo Rojo residual en bases oscuras, evitando tonos rojizos no deseados.',
  },
];

const MATIZANTES = [
  { name: 'Violeta', hex: '#9333EA' },
  { name: 'Azul-Violeta', hex: '#6366F1' },
  { name: 'Azul', hex: '#2563EB' },
  { name: 'Verde', hex: '#16A34A' },
  { name: 'Dorado (Cálido)', hex: '#EAB308' },
];

function hexToRgb(hex: string) {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function mixHexColors(hexA: string, hexB: string, ratioB: number): string {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const t = ratioB / 100;
  const r = Math.round(a.r * (1 - t) + b.r * t);
  const g = Math.round(a.g * (1 - t) + b.g * t);
  const bl = Math.round(a.b * (1 - t) + b.b * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

function getHueFromRgb(hexA: string, hexB: string, ratioB: number): { hue: number; temp: 'Cálido' | 'Frío' | 'Neutro' } {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const t = ratioB / 100;
  const r = (a.r * (1 - t) + b.r * t) / 255;
  const g = (a.g * (1 - t) + b.g * t) / 255;
  const bl = (a.b * (1 - t) + b.b * t) / 255;
  const max = Math.max(r, g, bl);
  const min = Math.min(r, g, bl);
  const d = max - min;
  if (d < 0.12) return { hue: 0, temp: 'Neutro' };
  let h = 0;
  if (max === r) h = ((g - bl) / d) % 6;
  else if (max === g) h = (bl - r) / d + 2;
  else h = (r - g) / d + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  const temp = h >= 85 && h <= 290 ? 'Frío' : 'Cálido';
  return { hue: h, temp };
}

function getHarmonyColors(baseHue: number, harmony: HarmonyType): string[] {
  const toHsl = (h: number) => `hsl(${((h % 360) + 360) % 360}, 78%, 54%)`;
  switch (harmony) {
    case 'Complementaria':
      return [toHsl(baseHue), toHsl(baseHue + 180)];
    case 'Análoga':
      return [toHsl(baseHue - 30), toHsl(baseHue), toHsl(baseHue + 30)];
    case 'Triádica':
      return [toHsl(baseHue), toHsl(baseHue + 120), toHsl(baseHue + 240)];
    case 'Tetrádica':
      return [toHsl(baseHue), toHsl(baseHue + 60), toHsl(baseHue + 180), toHsl(baseHue + 240)];
  }
}

export const ColorSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SimTab>('mixer');

  // Tab 1: Mixer
  const [colorA, setColorA] = useState<BaseColor>(BASE_COLORS[0]); // Amarillo
  const [colorB, setColorB] = useState<BaseColor>(BASE_COLORS[2]); // Rojo
  const [ratio, setRatio] = useState<number>(50);
  const [harmony, setHarmony] = useState<HarmonyType>('Complementaria');

  const mixedRgb = mixHexColors(colorA.hex, colorB.hex, ratio);
  const { hue: mixedHue, temp: mixedTemp } = getHueFromRgb(colorA.hex, colorB.hex, ratio);
  const harmonyPalette = getHarmonyColors(mixedHue, harmony);

  // Tab 2: Neutralize
  const [selectedLevel, setSelectedLevel] = useState<BleachedLevel>(BLEACHED_LEVELS[0]);
  const [selectedMatiz, setSelectedMatiz] = useState<string>('Violeta');
  const [tonerIntensity, setTonerIntensity] = useState<number>(80);

  const isCorrectMatiz = selectedMatiz === selectedLevel.idealMatiz;
  const selectedMatizHex = MATIZANTES.find((m) => m.name === selectedMatiz)?.hex || '#9333EA';
  const strandResultColor = isCorrectMatiz
    ? mixHexColors(selectedLevel.baseHex, selectedLevel.neutralHex, tonerIntensity)
    : mixHexColors(selectedLevel.baseHex, selectedMatizHex, Math.min(tonerIntensity, 65));

  // Tab 3: 60-30-10
  const [dominantColor, setDominantColor] = useState('#3B2F2F');
  const [secondaryColor, setSecondaryColor] = useState('#A67C52');
  const [accentColor, setAccentColor] = useState('#FDE047');

  return (
    <div className="space-y-6 pb-8">
      {/* Encabezado del Simulador con Branding BarberColor Studio */}
      <div className="bg-gradient-to-r from-slate-900 via-[#13161F] to-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <BrandLogo variant="compact" className="mb-2" />
          <h1 className="font-display text-2xl font-bold text-white">
            Simulador de Teoría del Color
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Mezclador cromático, laboratorio de neutralización y probador de la Regla 60-30-10.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'mixer' as SimTab, label: 'Mezclador', icon: Palette },
            { id: 'neutralize' as SimTab, label: 'Neutralización', icon: Sparkles },
            { id: 'rule603010' as SimTab, label: 'Regla 60-30-10', icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  active
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: MEZCLADOR CROMÁTICO */}
      {activeTab === 'mixer' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              1. Selección de Pigmentos Base
            </h2>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Pigmento A ({colorA.name} — {colorA.category})
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {BASE_COLORS.map((c) => (
                  <button
                    key={`a-${c.name}`}
                    onClick={() => setColorA(c)}
                    className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                      colorA.name === c.name
                        ? 'border-amber-400 bg-slate-800'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full mx-auto block mb-1 border border-white/20" style={{ backgroundColor: c.hex }} />
                    <span className="text-[11px] font-medium text-slate-200">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Pigmento B ({colorB.name} — {colorB.category})
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {BASE_COLORS.map((c) => (
                  <button
                    key={`b-${c.name}`}
                    onClick={() => setColorB(c)}
                    className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                      colorB.name === c.name
                        ? 'border-amber-400 bg-slate-800'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full mx-auto block mb-1 border border-white/20" style={{ backgroundColor: c.hex }} />
                    <span className="text-[11px] font-medium text-slate-200">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                <span>{colorA.name}: {100 - ratio}%</span>
                <span>{colorB.name}: {ratio}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={ratio}
                onChange={(e) => setRatio(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              2. Resultado y Armonías Cromáticas
            </h2>

            <div className="flex items-center gap-4 bg-slate-950/70 border border-slate-800 rounded-xl p-4">
              <div
                className="w-20 h-20 rounded-2xl border-2 border-white/20 shadow-lg shrink-0"
                style={{ backgroundColor: mixedRgb }}
              />
              <div>
                <span className="text-xs text-slate-400 block">Tono Resultante</span>
                <p className="text-lg font-bold text-white">
                  {colorA.name} + {colorB.name}
                </p>
                <span
                  className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    mixedTemp === 'Cálido'
                      ? 'bg-orange-500/20 text-orange-300'
                      : mixedTemp === 'Frío'
                      ? 'bg-sky-500/20 text-sky-300'
                      : 'bg-slate-700 text-slate-200'
                  }`}
                >
                  Temperatura: {mixedTemp}
                </span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Visualizar Armonía
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {(['Complementaria', 'Análoga', 'Triádica', 'Tetrádica'] as HarmonyType[]).map((h) => (
                  <button
                    key={h}
                    onClick={() => setHarmony(h)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                      harmony === h
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                {harmonyPalette.map((col, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full h-12 rounded-xl border border-white/15 shadow"
                      style={{ backgroundColor: col }}
                    />
                    <span className="text-[10px] text-slate-400">Tono {idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LABORATORIO DE NEUTRALIZACIÓN */}
      {activeTab === 'neutralize' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              1. Fondo de Aclaración y Matizante
            </h2>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Selecciona la Altura y Reflejo Indeseado
              </label>
              <div className="space-y-2">
                {BLEACHED_LEVELS.map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition cursor-pointer ${
                      selectedLevel.id === lvl.id
                        ? 'border-amber-400 bg-slate-800'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold text-white block">{lvl.level}</span>
                      <span className="text-[11px] text-slate-400">{lvl.reflect}</span>
                    </div>
                    <span
                      className="w-7 h-7 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: lvl.baseHex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Aplicar Matizante Complementario
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {MATIZANTES.map((m) => (
                  <button
                    key={m.name}
                    onClick={() => setSelectedMatiz(m.name)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                      selectedMatiz === m.name
                        ? 'border-amber-400 bg-slate-800 text-white'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: m.hex }} />
                    <span className="truncate">{m.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Concentración del Matizante</span>
                <span>{tonerIntensity}%</span>
              </div>
              <input
                type="range"
                min={20}
                max={100}
                value={tonerIntensity}
                onChange={(e) => setTonerIntensity(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-5">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4">
                2. Mechón de Prueba Visual (Antes vs. Matizado)
              </h2>

              <div className="grid grid-cols-2 gap-4 bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
                {/* Mechón Antes */}
                <div className="flex flex-col items-center">
                  <span className="text-[11px] font-semibold text-slate-400 mb-2">Sin Matizar</span>
                  <svg viewBox="0 0 80 140" className="w-20 h-36 drop-shadow-md">
                    <path
                      d="M40 8 C22 35, 18 85, 28 132 C38 136, 46 136, 54 130 C62 85, 58 35, 40 8 Z"
                      fill={selectedLevel.baseHex}
                      stroke="#ffffff30"
                      strokeWidth="1.5"
                    />
                    <path d="M36 20 Q30 70 35 125" stroke="#ffffff40" strokeWidth="2" fill="none" />
                  </svg>
                </div>

                {/* Mechón Resultado */}
                <div className="flex flex-col items-center">
                  <span className="text-[11px] font-semibold text-amber-300 mb-2">Resultado Matizado</span>
                  <svg viewBox="0 0 80 140" className="w-20 h-36 drop-shadow-md">
                    <path
                      d="M40 8 C22 35, 18 85, 28 132 C38 136, 46 136, 54 130 C62 85, 58 35, 40 8 Z"
                      fill={strandResultColor}
                      stroke="#ffffff40"
                      strokeWidth="1.5"
                    />
                    <path d="M36 20 Q30 70 35 125" stroke="#ffffff55" strokeWidth="2.2" fill="none" />
                  </svg>
                </div>
              </div>
            </div>

            <div
              className={`rounded-xl p-4 border ${
                isCorrectMatiz
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                {isCorrectMatiz ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Neutralización Exitosa ({selectedMatiz})
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    Matizante Incorrecto para este Reflejo
                  </>
                )}
              </div>
              <p className="text-xs leading-relaxed opacity-90">
                {isCorrectMatiz
                  ? selectedLevel.explanation
                  : `El matizante ${selectedMatiz} no es complementario al reflejo seleccionado. Prueba con ${selectedLevel.idealMatiz} para neutralizar correctamente.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: REGLA 60-30-10 */}
      {activeTab === 'rule603010' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Asignación de Proporciones (60% / 30% / 10%)
            </h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="text-xs font-bold text-white block">60% Color Dominante (Base)</span>
                  <span className="text-[11px] text-slate-400">Cubre la mayor parte de la cabellera</span>
                </div>
                <input
                  type="color"
                  value={dominantColor}
                  onChange={(e) => setDominantColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                />
              </div>

              <div className="flex items-center justify-between bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="text-xs font-bold text-white block">30% Color Secundario (Transición)</span>
                  <span className="text-[11px] text-slate-400">Medios o difuminado intermedio</span>
                </div>
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                />
              </div>

              <div className="flex items-center justify-between bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="text-xs font-bold text-white block">10% Color de Acento (Detalle)</span>
                  <span className="text-[11px] text-slate-400">Contorno frontal, mechas o brillo focal</span>
                </div>
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Vista Previa del Equilibrio Cromático
            </h2>

            {/* Barra proporcional */}
            <div className="h-12 w-full rounded-xl overflow-hidden flex border border-slate-700 shadow-inner">
              <div className="h-full flex items-center justify-center text-xs font-bold text-white/90 shadow-inner" style={{ width: '60%', backgroundColor: dominantColor }}>
                60%
              </div>
              <div className="h-full flex items-center justify-center text-xs font-bold text-slate-950" style={{ width: '30%', backgroundColor: secondaryColor }}>
                30%
              </div>
              <div className="h-full flex items-center justify-center text-xs font-bold text-slate-950" style={{ width: '10%', backgroundColor: accentColor }}>
                10%
              </div>
            </div>

            {/* Tarjeta de diseño capilar */}
            <div className="rounded-2xl p-5 border border-slate-700 space-y-3" style={{ backgroundColor: dominantColor }}>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-slate-950" style={{ backgroundColor: accentColor }}>
                Acento 10% (Iluminación)
              </span>
              <div className="rounded-xl p-4" style={{ backgroundColor: secondaryColor }}>
                <p className="text-xs font-bold text-slate-950">
                  Zona Secundaria (30%) — Transición armónica sobre la base dominante (60%).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
