import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Scissors, RotateCcw, Trophy, Sliders, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

type ToolType = 'clipper' | 'trimmer' | 'scissors_straight' | 'scissors_thin' | 'razor';

interface GuardOption {
  id: string;
  label: string;
  mm: number;
}

const GUARDS: GuardOption[] = [
  { id: '0.5', label: '#0.5', mm: 1.5 },
  { id: '1', label: '#1', mm: 3.0 },
  { id: '1.5', label: '#1.5', mm: 4.5 },
  { id: '2', label: '#2', mm: 6.0 },
  { id: '3', label: '#3', mm: 10.0 },
  { id: '4', label: '#4', mm: 13.0 },
];

interface HairCell {
  x: number;
  y: number;
  inHead: boolean;
  zone: 'top' | 'mid' | 'low';
  lengthMm: number;
  density: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  check: (cells: HairCell[]) => boolean;
}

const CHALLENGES: Challenge[] = [
  {
    id: 'fade-mid',
    title: 'Reto 1: Degradado Medio (#1 a #2)',
    description:
      'Ejecuta un degradado medio: rebaja la zona baja a ≤ 3mm (peine #1 o #0.5) y la zona media entre 4mm y 6mm (peine #1.5 o #2) borrando la línea guía.',
    check: (cells) => {
      const lowCells = cells.filter((c) => c.inHead && c.zone === 'low');
      const midCells = cells.filter((c) => c.inHead && c.zone === 'mid');
      const lowCut = lowCells.filter((c) => c.lengthMm <= 3.5).length / Math.max(1, lowCells.length);
      const midCut = midCells.filter((c) => c.lengthMm <= 7.0 && c.lengthMm >= 2.5).length / Math.max(1, midCells.length);
      return lowCut >= 0.45 && midCut >= 0.45;
    },
  },
  {
    id: 'razor-clean',
    title: 'Reto 2: Contorno y Afeitado a Navaja (0mm)',
    description:
      'Utiliza la Navaja de afeitar (0mm) o Patillera para limpiar la zona baja (nuca y patilla) por debajo de 1mm.',
    check: (cells) => {
      const lowCells = cells.filter((c) => c.inHead && c.zone === 'low');
      const shaved = lowCells.filter((c) => c.lengthMm <= 0.8).length / Math.max(1, lowCells.length);
      return shaved >= 0.4;
    },
  },
  {
    id: 'thinning-top',
    title: 'Reto 3: Texturizado Superior a Tijera',
    description:
      'Usa las Tijeras (Filo dulce o Entresacar) en la zona superior para reducir volumen/densidad manteniendo largo ≥ 8mm.',
    check: (cells) => {
      const topCells = cells.filter((c) => c.inHead && c.zone === 'top');
      const textured = topCells.filter((c) => c.lengthMm < 18 || c.density < 0.85).length / Math.max(1, topCells.length);
      return textured >= 0.35;
    },
  },
];

const CANVAS_W = 420;
const CANVAS_H = 440;
const STEP = 9;

function buildInitialCells(): HairCell[] {
  const cells: HairCell[] = [];
  const cx = 210;
  const cy = 205;

  for (let y = 45; y < 350; y += STEP) {
    for (let x = 75; x < 345; x += STEP) {
      // Silueta craneal estilizada (vista lateral/3-4 de barbería)
      const dx = (x - cx) / 118;
      const dy = (y - cy) / 138;
      const inEllipse = dx * dx + dy * dy <= 1.0;

      // Recorte inferior de cuello/cara
      const isFaceCutout = x < 140 && y > 220;
      const isNeckBottom = y > 315 && x > 145 && x < 275;
      const inHead = inEllipse && !isFaceCutout && (y <= 315 || isNeckBottom);

      let zone: 'top' | 'mid' | 'low' = 'top';
      if (y > 235) zone = 'low';
      else if (y > 160) zone = 'mid';

      cells.push({
        x,
        y,
        inHead,
        zone,
        lengthMm: 20,
        density: 1.0,
      });
    }
  }
  return cells;
}

export const BarberSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cellsRef = useRef<HairCell[]>(buildInitialCells());
  const isDrawingRef = useRef<boolean>(false);

  const [tool, setTool] = useState<ToolType>('clipper');
  const [guard, setGuard] = useState<GuardOption>(GUARDS[3]); // #2 (6mm)
  const [lever, setLever] = useState<number>(0); // 0.0 (cerrada) a 0.5 (abierta)
  const [activeChallengeIdx, setActiveChallengeIdx] = useState<number>(0);
  const [challengeDone, setChallengeDone] = useState<boolean>(false);
  const [avgMm, setAvgMm] = useState<number>(20);
  const [lastCutInfo, setLastCutInfo] = useState<string>('Listo para cortar — desliza sobre el maniquí');

  const getEffectiveTargetMm = useCallback((): number => {
    switch (tool) {
      case 'clipper':
        return Number((guard.mm + lever * 1.5).toFixed(1));
      case 'trimmer':
        return 0.4;
      case 'razor':
        return 0.0;
      case 'scissors_straight':
        return 11.0;
      case 'scissors_thin':
        return 16.0;
    }
  }, [tool, guard, lever]);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // Fondo de estudio oscuro
    const bgGrad = ctx.createRadialGradient(210, 210, 40, 210, 210, 260);
    bgGrad.addColorStop(0, '#1E2433');
    bgGrad.addColorStop(1, '#0B0D12');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Silueta base de piel del maniquí (cabeza + cuello + oreja)
    ctx.save();
    ctx.fillStyle = '#D9A782';
    ctx.strokeStyle = '#9A6B4C';
    ctx.lineWidth = 2;

    // Cuello
    ctx.beginPath();
    ctx.roundRect(160, 295, 100, 110, 18);
    ctx.fill();
    ctx.stroke();

    // Cabeza
    ctx.beginPath();
    ctx.ellipse(210, 210, 116, 136, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Oreja lateral referencia
    ctx.fillStyle = '#C9936D';
    ctx.beginPath();
    ctx.ellipse(145, 232, 13, 24, -0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Líneas guía sutiles de zonas (Top / Mid / Low)
    ctx.save();
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.18)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(85, 160);
    ctx.lineTo(335, 160);
    ctx.moveTo(85, 235);
    ctx.lineTo(335, 235);
    ctx.stroke();
    ctx.restore();

    // Renderizar hebras de cabello según longitud (mm) y densidad
    const cells = cellsRef.current;
    for (let i = 0; i < cells.length; i++) {
      const c = cells[i];
      if (!c.inHead) continue;

      if (c.lengthMm <= 0.2) {
        // Navaja 0mm: piel limpia, sin hebra
        continue;
      }

      const norm = Math.min(1, c.lengthMm / 20);
      const alpha = Math.min(0.96, (0.22 + norm * 0.75) * c.density);
      const strokeLen = 2 + norm * 11;

      ctx.strokeStyle = `rgba(24, 24, 30, ${alpha.toFixed(2)})`;
      ctx.lineWidth = 1.2 + norm * 1.8;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(c.x, c.y);
      ctx.lineTo(c.x + (norm > 0.5 ? 2 : 0.6), c.y - strokeLen);
      ctx.stroke();
    }

    // Etiquetas de guía en el lienzo
    ctx.fillStyle = 'rgba(253, 230, 138, 0.55)';
    ctx.font = '600 10px Inter, sans-serif';
    ctx.fillText('ZONA SUPERIOR', 260, 148);
    ctx.fillText('ZONA MEDIA (FADE)', 248, 226);
    ctx.fillText('ZONA BAJA / NUCA', 248, 295);
  }, []);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const applyCutAt = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = CANVAS_W / rect.width;
      const scaleY = CANVAS_H / rect.height;
      const px = (clientX - rect.left) * scaleX;
      const py = (clientY - rect.top) * scaleY;

      const targetMm = getEffectiveTargetMm();
      const radius = tool === 'trimmer' || tool === 'razor' ? 18 : 26;
      const cells = cellsRef.current;
      let changed = false;

      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        if (!c.inHead) continue;
        const dist = Math.hypot(c.x - px, c.y - py);
        if (dist <= radius) {
          if (tool === 'scissors_thin') {
            if (c.density > 0.45) {
              c.density = Math.max(0.45, c.density - 0.12);
              changed = true;
            }
          } else if (c.lengthMm > targetMm) {
            c.lengthMm = targetMm;
            changed = true;
          }
        }
      }

      if (changed) {
        drawCanvas();
        const headCells = cells.filter((c) => c.inHead);
        const totalMm = headCells.reduce((acc, c) => acc + c.lengthMm, 0);
        setAvgMm(Number((totalMm / headCells.length).toFixed(1)));
        setLastCutInfo(
          tool === 'scissors_thin'
            ? 'Texturizando volumen con tijera de entresacar'
            : `Rebaje aplicado a ${targetMm} mm`
        );

        const currentChallenge = CHALLENGES[activeChallengeIdx];
        if (currentChallenge && currentChallenge.check(cells)) {
          setChallengeDone(true);
        }
      }
    },
    [activeChallengeIdx, drawCanvas, getEffectiveTargetMm, tool]
  );

  const handleReset = () => {
    cellsRef.current = buildInitialCells();
    setAvgMm(20);
    setChallengeDone(false);
    setLastCutInfo('Maniquí reiniciado a 20 mm');
    drawCanvas();
  };

  const handleChallengeChange = (idx: number) => {
    setActiveChallengeIdx(idx);
    setChallengeDone(CHALLENGES[idx].check(cellsRef.current));
  };

  const targetMm = getEffectiveTargetMm();

  return (
    <div className="space-y-6 pb-8">
      {/* Encabezado con Branding BarberColor Studio */}
      <div className="bg-gradient-to-r from-slate-900 via-[#13161F] to-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <BrandLogo variant="compact" className="mb-2" />
          <h1 className="font-display text-2xl font-bold text-white">
            Simulador de Corte de Barbería (Canvas 2D)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Practica degradados, selección de peines guía, juego de palanca, tijera y navaja.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-4 h-4" />
          Reiniciar Maniquí
        </button>
      </div>

      {/* Distribución Doble Panel en Escritorio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Panel Izquierdo: Herramientas y Modo Reto */}
        <div className="lg:col-span-5 space-y-5">
          {/* Selección de Herramienta */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Scissors className="w-4 h-4" />
              Herramientas de Barbería
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
              {[
                { id: 'clipper' as ToolType, label: 'Máquina (Clipper)' },
                { id: 'trimmer' as ToolType, label: 'Patillera (0.4mm)' },
                { id: 'razor' as ToolType, label: 'Navaja (0.0mm)' },
                { id: 'scissors_straight' as ToolType, label: 'Tijera Filo Dulce' },
                { id: 'scissors_thin' as ToolType, label: 'Tijera Entresacar' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTool(t.id)}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition cursor-pointer text-left ${
                    tool === t.id
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Controles específicos de Máquina (Peines + Palanca) */}
            {tool === 'clipper' && (
              <div className="pt-3 border-t border-slate-800 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">
                    Peines Guía (Guards)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {GUARDS.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => setGuard(g)}
                        className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                          guard.id === g.id
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xs font-bold block">{g.label}</span>
                        <span className="text-[10px] text-slate-400">{g.mm} mm</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span className="flex items-center gap-1">
                      <Sliders className="w-3.5 h-3.5 text-amber-400" />
                      Palanca Ajustable
                    </span>
                    <span className="font-bold text-amber-300">
                      {lever === 0 ? 'Cerrada (0.0)' : lever === 0.5 ? 'Abierta (0.5)' : `Intermedia (${lever})`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={0.5}
                    step={0.1}
                    value={lever}
                    onChange={(e) => setLever(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs">
              <span className="text-slate-400">Altura efectiva de corte:</span>
              <span className="font-bold text-amber-300 text-sm">{targetMm} mm</span>
            </div>
          </div>

          {/* Modo Reto Guiado */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Modo Reto Guiado
              </h2>
              <div className="flex gap-1">
                {CHALLENGES.map((ch, idx) => (
                  <button
                    key={ch.id}
                    onClick={() => handleChallengeChange(idx)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold cursor-pointer transition ${
                      activeChallengeIdx === idx
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-2">
              <h3 className="text-xs font-bold text-white">{CHALLENGES[activeChallengeIdx].title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {CHALLENGES[activeChallengeIdx].description}
              </p>
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                  challengeDone
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {challengeDone ? '¡Reto Superado!' : 'En progreso — desliza sobre el lienzo'}
              </div>
            </div>
          </div>
        </div>

        {/* Panel Derecho: Lienzo Canvas 2D Táctil */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-3">
            <span>{lastCutInfo}</span>
            <span className="font-semibold text-amber-300">Promedio: {avgMm} mm</span>
          </div>

          <div className="w-full max-w-[420px] rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl bg-[#0B0D12]">
            <canvas
              ref={canvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              style={{ touchAction: 'none' }}
              className="w-full h-auto block cursor-crosshair select-none"
              onMouseDown={(e) => {
                isDrawingRef.current = true;
                applyCutAt(e.clientX, e.clientY);
              }}
              onMouseMove={(e) => {
                if (!isDrawingRef.current) return;
                applyCutAt(e.clientX, e.clientY);
              }}
              onMouseUp={() => {
                isDrawingRef.current = false;
              }}
              onMouseLeave={() => {
                isDrawingRef.current = false;
              }}
              onTouchStart={(e) => {
                isDrawingRef.current = true;
                const touch = e.touches[0];
                if (touch) applyCutAt(touch.clientX, touch.clientY);
              }}
              onTouchMove={(e) => {
                if (!isDrawingRef.current) return;
                const touch = e.touches[0];
                if (touch) applyCutAt(touch.clientX, touch.clientY);
              }}
              onTouchEnd={() => {
                isDrawingRef.current = false;
              }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-3 text-center">
            Desliza con el ratón o el dedo sobre el maniquí para rebajar el cabello según la herramienta activa.
          </p>
        </div>
      </div>
    </div>
  );
};
