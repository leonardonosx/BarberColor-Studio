import React from 'react';
import { CheckCircle2, BookOpen, Award, ArrowRight } from 'lucide-react';
import { ModuleContent, ModuleId } from '../types';
import { ModuleDiagrams } from './ModuleDiagrams';

interface ModuleViewerProps {
  module: ModuleContent;
  isCompleted: boolean;
  onToggleComplete: (id: ModuleId) => void;
  onGoToExam: (id: ModuleId) => void;
  onNextModule?: () => void;
}

export const ModuleViewer: React.FC<ModuleViewerProps> = ({
  module,
  isCompleted,
  onToggleComplete,
  onGoToExam,
  onNextModule,
}) => {
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
                    <div
                      key={pIdx}
                      className="rounded-xl bg-white border border-slate-200 p-3 shadow-xs"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          {pt.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed pl-4">{pt.detail}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabla Técnica (si el módulo incluye tabla) */}
      {module.tableTitle && module.tableHeaders && module.tableRows && (
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
      )}

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
    </div>
  );
};
