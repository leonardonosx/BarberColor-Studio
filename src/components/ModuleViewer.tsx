import React, { useState } from 'react';
import { CheckCircle2, BookOpen, Award, ArrowRight, Eye, X, Sparkles, Palette, Scissors } from 'lucide-react';
import { ConceptPoint, ModuleContent, ModuleId, NavSection } from '../types';
import { ModuleDiagrams } from './ModuleDiagrams';
import { ConceptVisuals } from './ConceptVisuals';
import { LevelColorTable } from './LevelColorTable';

interface ModuleViewerProps {
  module: ModuleContent;
  isCompleted: boolean;
  onToggleComplete: (id: ModuleId) => void;
  onGoToExam: (id: ModuleId) => void;
  onNextModule?: () => void;
  onNavigateSimulator?: (sim: Extract<NavSection, 'sim-color' | 'sim-barber'>) => void;
}

export const ModuleViewer: React.FC<ModuleViewerProps> = ({
  module,
  isCompleted,
  onToggleComplete,
  onGoToExam,
  onNextModule,
  onNavigateSimulator,
}) => {
  const [activePoint, setActivePoint] = useState<ConceptPoint | null>(null);

  return (
    <div className="space-y-6 pb-8">
      {/* Encabezado Editorial del Módulo */}
      <div className="bg-gradient-to-br from-[#141720] via-[#101219] to-[#090A0F] border border-amber-500/20 rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  <BookOpen className="w-3.5 h-3.5" />
                  Módulo {module.number} de 6 • {module.duration}
                </span>
                <button
                  onClick={() => onToggleComplete(module.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    isCompleted
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isCompleted ? 'Módulo Completado' : 'Marcar como Completado'}
                </button>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {module.title}
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">{module.subtitle}</p>
            </div>

            {/* Objetivos */}
            <div className="mt-6 pt-5 border-t border-amber-500/15">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-400 mb-3">
                Objetivos de Aprendizaje
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {module.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Imagen de Referencia Visual del Tema */}
          <div className="lg:col-span-5 bg-[#090A0F] border-t lg:border-t-0 lg:border-l border-amber-500/15 flex flex-col justify-between">
            <div className="relative aspect-video lg:aspect-auto lg:h-full min-h-[210px] overflow-hidden">
              <img
                src={module.imageUrl}
                alt={module.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/85 to-transparent p-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block mb-0.5">
                  Imagen de Referencia
                </span>
                <p className="text-xs text-slate-200 leading-snug">{module.imageCaption}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diagrama Visual Interactivo del Módulo */}
      <ModuleDiagrams moduleId={module.id} />

      {/* Nota de interactividad */}
      <div className="flex items-center gap-2 text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2.5">
        <Eye className="w-4 h-4 shrink-0" />
        <span>
          <strong>Modo Interactivo:</strong> Haz clic en cualquier concepto de las fichas para abrir su explicación ampliada, consejo de salón e imagen de apoyo.
        </span>
      </div>

      {/* Tarjetas Claras de Lectura (Alto Contraste) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {module.cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-[#FAF8F5] text-slate-900 rounded-2xl p-5 sm:p-6 shadow-xl border border-amber-500/20 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
                {card.badge && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-900 text-amber-400 shrink-0">
                    {card.badge}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">{card.summary}</p>

              <div className="space-y-2.5">
                {card.points.map((pt, pIdx) => {
                  const accent = pt.highlight || 'gold';
                  const dotColor =
                    accent === 'emerald'
                      ? 'bg-emerald-600'
                      : accent === 'rose'
                      ? 'bg-rose-600'
                      : accent === 'sky'
                      ? 'bg-sky-600'
                      : accent === 'amber'
                      ? 'bg-orange-600'
                      : 'bg-amber-600';
                  return (
                    <button
                      type="button"
                      key={pIdx}
                      onClick={() => setActivePoint(pt)}
                      className="w-full text-left group rounded-xl bg-white hover:bg-amber-50/70 border border-slate-200 hover:border-amber-500 p-3 shadow-xs transition cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                          <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-800 transition">
                            {pt.label}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full shrink-0">
                          <Eye className="w-3 h-3" />
                          Ver apoyo
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed pl-4">{pt.detail}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabla Técnica (Interactiva en Módulo 1, Estándar en otros módulos) */}
      {module.id === 'mod-1' ? (
        <LevelColorTable />
      ) : (
        module.tableTitle &&
        module.tableHeaders &&
        module.tableRows && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 overflow-hidden">
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-3">
            {module.tableTitle}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-slate-300">
                  {module.tableHeaders.map((h) => (
                    <th key={h} className="py-2.5 px-3 font-bold whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {module.tableRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-800/40 transition">
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={`py-2.5 px-3 ${
                          cIdx === 0 ? 'font-semibold text-amber-300' : 'text-slate-300'
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Barra de Acción Inferior */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
        <button
          onClick={() => onGoToExam(module.id)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition cursor-pointer shadow-lg shadow-amber-500/20"
        >
          <Award className="w-4 h-4" />
          Evaluar Módulo {module.number}
        </button>

        {onNextModule && (
          <button
            onClick={onNextModule}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition cursor-pointer"
          >
            Siguiente Módulo
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* MODAL INTERACTIVO DE CONCEPTO E IMAGEN DE APOYO */}
      {activePoint && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActivePoint(null)}
        >
          <div
            className="bg-[#12141C] border border-amber-500/35 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 block">
                  Módulo {module.number} • Concepto Interactivo
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
                  {activePoint.label}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActivePoint(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                aria-label="Cerrar detalle"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed">{activePoint.detail}</p>

            {activePoint.extendedDetail && (
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activePoint.extendedDetail}
              </div>
            )}

            {/* Apoyo visual interactivo */}
            <ConceptVisuals visualKey={activePoint.visualKey} label={activePoint.label} />

            {/* Imagen de referencia del módulo si no hay visual específico */}
            {!activePoint.visualKey && (
              <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[16/8]">
                <img
                  src={module.imageUrl}
                  alt={activePoint.label}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {activePoint.salonTip && (
              <div className="flex items-start gap-2.5 bg-amber-500/10 border border-amber-500/25 rounded-xl p-3 text-xs text-amber-200">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300">Consejo de Salón: </strong>
                  {activePoint.salonTip}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
              {activePoint.simulatorLink && onNavigateSimulator && (
                <button
                  type="button"
                  onClick={() => {
                    const target = activePoint.simulatorLink!;
                    setActivePoint(null);
                    onNavigateSimulator(target);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition"
                >
                  {activePoint.simulatorLink === 'sim-color' ? (
                    <>
                      <Palette className="w-4 h-4" />
                      Probar en Simulador de Color
                    </>
                  ) : (
                    <>
                      <Scissors className="w-4 h-4" />
                      Practicar en Simulador de Corte
                    </>
                  )}
                </button>
              )}
              <button
                type="button"
                onClick={() => setActivePoint(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs cursor-pointer transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
