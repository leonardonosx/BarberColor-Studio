import React from 'react';
import { ModuleId } from '../types';

export const ModuleDiagrams: React.FC<{ moduleId: ModuleId }> = ({ moduleId }) => {
  switch (moduleId) {
    case 'mod-1':
      return <ColorWheelDiagram />;
    case 'mod-2':
      return <PhCuticleDiagram />;
    case 'mod-3':
      return <TrichologyDiagram />;
    case 'mod-4':
      return <VisagismDiagram />;
    case 'mod-5':
      return <BarberGuardsDiagram />;
    case 'mod-6':
      return <PhotographyDiagram />;
  }
};

const ColorWheelDiagram: React.FC = () => {
  const segments = [
    { label: 'Amarillo (P)', color: '#FACC15', type: 'Primario' },
    { label: 'Amarillo-Naranja (T)', color: '#FB923C', type: 'Terciario' },
    { label: 'Naranja (S)', color: '#F97316', type: 'Secundario' },
    { label: 'Rojo-Naranja (T)', color: '#EA580C', type: 'Terciario' },
    { label: 'Rojo (P)', color: '#EF4444', type: 'Primario' },
    { label: 'Rojo-Violeta (T)', color: '#DB2777', type: 'Terciario' },
    { label: 'Violeta (S)', color: '#9333EA', type: 'Secundario' },
    { label: 'Azul-Violeta (T)', color: '#6366F1', type: 'Terciario' },
    { label: 'Azul (P)', color: '#2563EB', type: 'Primario' },
    { label: 'Azul-Verde (T)', color: '#0D9488', type: 'Terciario' },
    { label: 'Verde (S)', color: '#16A34A', type: 'Secundario' },
    { label: 'Amarillo-Verde (T)', color: '#84CC16', type: 'Terciario' },
  ];

  const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const createArc = (cx: number, cy: number, rIn: number, rOut: number, startAngle: number, endAngle: number) => {
    const p1 = polarToCartesian(cx, cy, rOut, startAngle);
    const p2 = polarToCartesian(cx, cy, rOut, endAngle);
    const p3 = polarToCartesian(cx, cy, rIn, endAngle);
    const p4 = polarToCartesian(cx, cy, rIn, startAngle);
    return `M ${p1.x} ${p1.y} A ${rOut} ${rOut} 0 0 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${rIn} ${rIn} 0 0 0 ${p4.x} ${p4.y} Z`;
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-56 h-56 shrink-0">
          <svg viewBox="0 0 220 220" className="w-full h-full drop-shadow-xl">
            {segments.map((seg, i) => {
              const start = i * 30 - 15;
              const end = start + 30;
              return (
                <path
                  key={seg.label}
                  d={createArc(110, 110, 44, 96, start, end)}
                  fill={seg.color}
                  stroke="#0B0D12"
                  strokeWidth="2"
                />
              );
            })}
            <circle cx="110" cy="110" r="38" fill="#13161F" stroke="#D4AF37" strokeWidth="1.5" />
            <text x="110" y="106" textAnchor="middle" fill="#FDE68A" fontSize="10" fontWeight="700">
              CÍRCULO
            </text>
            <text x="110" y="120" textAnchor="middle" fill="#CBD5E1" fontSize="9">
              CROMÁTICO
            </text>
          </svg>
        </div>
        <div className="flex-1 space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
            Diagrama Visual: Círculo Cromático y Temperatura
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Los colores opuestos a 180° se neutralizan entre sí (ej. <strong className="text-yellow-300">Amarillo</strong> ↔ <strong className="text-purple-300">Violeta</strong>, <strong className="text-orange-300">Naranja</strong> ↔ <strong className="text-blue-300">Azul</strong>, <strong className="text-red-300">Rojo</strong> ↔ <strong className="text-emerald-300">Verde</strong>).
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
            <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-2">
              <span className="text-[11px] font-semibold text-amber-300 block">Primarios (P)</span>
              <span className="text-[11px] text-slate-400">Amarillo, Azul, Rojo</span>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-2">
              <span className="text-[11px] font-semibold text-sky-300 block">Secundarios (S)</span>
              <span className="text-[11px] text-slate-400">Naranja, Verde, Violeta</span>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-2 col-span-2 sm:col-span-1">
              <span className="text-[11px] font-semibold text-emerald-300 block">Regla 60-30-10</span>
              <span className="text-[11px] text-slate-400">Base / Medio / Acento</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PhCuticleDiagram: React.FC = () => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5">
      <div>
        <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-3">
          Escala Visual de pH (0 – 14) y Viaje del Salón
        </h4>
        <div className="relative h-8 rounded-xl overflow-hidden flex text-[10px] font-bold text-slate-950 shadow-inner">
          <div className="flex-1 bg-rose-500 flex items-center justify-center">0-2</div>
          <div className="flex-1 bg-orange-400 flex items-center justify-center">2.5-3.5 Sellado</div>
          <div className="flex-1 bg-emerald-400 flex items-center justify-center">4.5-5.5 Sano</div>
          <div className="flex-1 bg-sky-300 flex items-center justify-center">7.0 Neutro</div>
          <div className="flex-1 bg-indigo-400 flex items-center justify-center text-white">9-10.5 Tinte</div>
          <div className="flex-1 bg-purple-600 flex items-center justify-center text-white">10.5-12 Decol.</div>
        </div>
        <div className="flex justify-between text-[11px] text-slate-400 mt-1.5">
          <span>Ácidos (0 – 6.9)</span>
          <span>Neutro (7.0)</span>
          <span>Alcalinos (7.1 – 14)</span>
        </div>
      </div>

      {/* Diagrama Cutícula */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="bg-slate-950/70 border border-emerald-500/30 rounded-xl p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-400">Cutícula Cerrada / Sana</span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">pH 4.5 – 5.5</span>
          </div>
          <svg viewBox="0 0 220 64" className="w-full h-16">
            <rect x="10" y="20" width="200" height="24" rx="8" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" />
            {[25, 55, 85, 115, 145, 175].map((x) => (
              <path key={x} d={`M${x} 20 L${x + 22} 20 L${x + 18} 25 L${x - 2} 25 Z`} fill="#34D399" opacity="0.8" />
            ))}
            {[25, 55, 85, 115, 145, 175].map((x) => (
              <path key={`b-${x}`} d={`M${x} 44 L${x + 22} 44 L${x + 18} 39 L${x - 2} 39 Z`} fill="#34D399" opacity="0.8" />
            ))}
          </svg>
          <p className="text-[11px] text-slate-400 mt-1">Escamas compactas: máximo brillo y retención de pigmento.</p>
        </div>

        <div className="bg-slate-950/70 border border-rose-500/30 rounded-xl p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-rose-400">Cutícula Abierta / Dilatada</span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">pH 9.0 – 12.0</span>
          </div>
          <svg viewBox="0 0 220 64" className="w-full h-16">
            <rect x="10" y="22" width="200" height="20" rx="6" fill="#1E293B" stroke="#F43F5E" strokeWidth="1.5" />
            {[25, 55, 85, 115, 145, 175].map((x) => (
              <path key={x} d={`M${x} 22 L${x + 18} 10 L${x + 22} 13 L${x + 6} 22 Z`} fill="#FB7185" />
            ))}
            {[25, 55, 85, 115, 145, 175].map((x) => (
              <path key={`b-${x}`} d={`M${x} 42 L${x + 18} 54 L${x + 22} 51 L${x + 6} 42 Z`} fill="#FB7185" />
            ))}
          </svg>
          <p className="text-[11px] text-slate-400 mt-1">Escamas levantadas: permite ingreso químico pero requiere sellado ácido.</p>
        </div>
      </div>
    </div>
  );
};

const TrichologyDiagram: React.FC = () => {
  const types = [
    {
      name: 'Tipo 1 (Liso)',
      sub: '1A • 1B • 1C',
      path: 'M 15 10 L 15 58',
      color: '#38BDF8',
    },
    {
      name: 'Tipo 2 (Ondulado)',
      sub: '2A • 2B • 2C',
      path: 'M 15 10 Q 25 20 15 30 Q 5 40 15 50 L 15 58',
      color: '#34D399',
    },
    {
      name: 'Tipo 3 (Rizado)',
      sub: '3A • 3B • 3C',
      path: 'M 15 8 C 28 14, 2 22, 15 28 C 28 34, 2 42, 15 48 C 24 52, 10 56, 15 60',
      color: '#FBBF24',
    },
    {
      name: 'Tipo 4 (Afro)',
      sub: '4A • 4B • 4C',
      path: 'M 15 8 L 22 14 L 8 20 L 22 26 L 8 32 L 22 38 L 8 44 L 22 50 L 12 56',
      color: '#FB923C',
    },
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
      <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
        Clasificación de Curvatura Capilar (Tipos 1 al 4)
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {types.map((t) => (
          <div key={t.name} className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-col items-center text-center">
            <svg viewBox="0 0 30 66" className="w-10 h-16 mb-2">
              <path d={t.path} fill="none" stroke={t.color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xs font-bold text-slate-100">{t.name}</span>
            <span className="text-[11px] text-slate-400 mt-0.5">{t.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const VisagismDiagram: React.FC = () => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-52 h-60 shrink-0 bg-slate-950/70 border border-slate-800 rounded-xl p-3">
          <svg viewBox="0 0 180 210" className="w-full h-full">
            {/* Contorno rostro ovalado */}
            <ellipse cx="90" cy="108" rx="50" ry="72" fill="#1E293B" stroke="#D4AF37" strokeWidth="1.8" />
            {/* Líneas de los 3 tercios */}
            <line x1="20" y1="54" x2="160" y2="54" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="20" y1="92" x2="160" y2="92" stroke="#34D399" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="20" y1="134" x2="160" y2="134" stroke="#FBBF24" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="20" y1="180" x2="160" y2="180" stroke="#F43F5E" strokeWidth="1" strokeDasharray="3 3" />

            {/* Ojos (Regla de los 5 ojos) */}
            <ellipse cx="70" cy="96" rx="9" ry="4" fill="#CBD5E1" opacity="0.7" />
            <ellipse cx="110" cy="96" rx="9" ry="4" fill="#CBD5E1" opacity="0.7" />

            {/* Puntos Críticos */}
            <circle cx="90" cy="54" r="3.5" fill="#38BDF8" />
            <text x="96" y="51" fill="#38BDF8" fontSize="8" fontWeight="700">Triquion</text>

            <circle cx="90" cy="92" r="3.5" fill="#34D399" />
            <text x="96" y="89" fill="#34D399" fontSize="8" fontWeight="700">Glabela</text>

            <circle cx="90" cy="134" r="3.5" fill="#FBBF24" />
            <text x="96" y="131" fill="#FBBF24" fontSize="8" fontWeight="700">Subnasal</text>

            <circle cx="90" cy="180" r="3.5" fill="#F43F5E" />
            <text x="96" y="192" fill="#F43F5E" fontSize="8" fontWeight="700">Mentoniano</text>
          </svg>
        </div>

        <div className="flex-1 space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
            Mapa Antropométrico: Los Tres Tercios y Puntos Críticos
          </h4>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-center justify-between bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-800">
              <span className="font-semibold text-sky-300">1. Tercio Superior (Triquion → Glabela)</span>
              <span className="text-slate-400">Zona Intelectual</span>
            </div>
            <div className="flex items-center justify-between bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-800">
              <span className="font-semibold text-emerald-300">2. Tercio Medio (Glabela → Subnasal)</span>
              <span className="text-slate-400">Zona Emocional</span>
            </div>
            <div className="flex items-center justify-between bg-slate-950/60 px-3 py-2 rounded-lg border border-slate-800">
              <span className="font-semibold text-amber-300">3. Tercio Inferior (Subnasal → Mentoniano)</span>
              <span className="text-slate-400">Zona Sensitiva</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            <strong>Regla de los 5 Ojos:</strong> El ancho horizontal ideal del rostro equivale a 5 veces el ancho de un ojo.
          </p>
        </div>
      </div>
    </div>
  );
};

const BarberGuardsDiagram: React.FC = () => {
  const guards = [
    { num: 'Navaja', mm: '0.0 mm', h: 2 },
    { num: '0.0–0.5', mm: '0.5–1.0 mm', h: 6 },
    { num: '#0.5', mm: '1.5 mm', h: 10 },
    { num: '#1', mm: '3.0 mm', h: 16 },
    { num: '#1.5', mm: '4.5 mm', h: 22 },
    { num: '#2', mm: '6.0 mm', h: 28 },
    { num: '#3', mm: '10.0 mm', h: 36 },
    { num: '#4', mm: '13.0 mm', h: 44 },
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
      <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-3">
        Progresión Milimétrica de Peines Guía (Fade)
      </h4>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 items-end pt-2">
        {guards.map((g) => (
          <div key={g.num} className="bg-slate-950/70 border border-slate-800 rounded-lg p-2 flex flex-col items-center">
            <div className="h-12 flex items-end justify-center w-full mb-1.5">
              <div
                className="w-5 rounded-t bg-gradient-to-t from-amber-600 to-amber-300"
                style={{ height: `${g.h}px` }}
              />
            </div>
            <span className="text-xs font-bold text-white">{g.num}</span>
            <span className="text-[10px] text-slate-400">{g.mm}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PhotographyDiagram: React.FC = () => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
      <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-3">
        Esquema de Iluminación Frontal y Pose 3/4
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
          <span className="font-bold text-amber-300 block mb-1">1. Luz Frontal Suave</span>
          <p className="text-slate-400">Evita sombras duras bajo los ojos o cuello; resalta transiciones de degradado y reflejos reales.</p>
        </div>
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
          <span className="font-bold text-emerald-300 block mb-1">2. Pose del Modelo</span>
          <p className="text-slate-400">Hombros ligeramente inclinados en ángulo 3/4 y barbilla orientada hacia el hombro para definir la mandíbula.</p>
        </div>
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
          <span className="font-bold text-sky-300 block mb-1">3. Antes / Después + CTA</span>
          <p className="text-slate-400">Carrusel coherente con fondo neutro, descripción técnica del proceso y Llamado a la Acción claro.</p>
        </div>
      </div>
    </div>
  );
};
