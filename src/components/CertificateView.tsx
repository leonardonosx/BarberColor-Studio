import React from 'react';
import { Award, Printer, Lock, ArrowRight } from 'lucide-react';
import { ExamResult } from '../types';
import { BrandLogo } from './BrandLogo';

interface CertificateViewProps {
  studentName: string;
  onChangeStudentName: (name: string) => void;
  finalResult?: ExamResult;
  onGoToFinalExam: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  studentName,
  onChangeStudentName,
  finalResult,
  onGoToFinalExam,
}) => {
  const passed = finalResult?.passed === true;

  if (!passed) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 text-center max-w-2xl mx-auto my-8 space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto">
          <Lock className="w-7 h-7 text-amber-400" />
        </div>
        <h2 className="font-display text-2xl font-bold text-white">
          Diploma Digital de BarberColor Studio
        </h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Para desbloquear y emitir tu certificado oficial de aprobación, debes completar y aprobar el{' '}
          <strong className="text-amber-300">Examen Final Integral</strong> con al menos un 70%.
        </p>
        <button
          onClick={onGoToFinalExam}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition cursor-pointer"
        >
          Ir al Examen Final Integral
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="no-print bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Nombre del Estudiante en el Diploma
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => onChangeStudentName(e.target.value)}
            placeholder="Escribe tu nombre completo"
            className="w-full sm:max-w-xs px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400"
          />
        </div>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition self-start sm:self-end"
        >
          <Printer className="w-4 h-4" />
          Imprimir / Guardar PDF
        </button>
      </div>

      {/* Diploma Visual */}
      <div className="bg-slate-50 text-slate-900 rounded-3xl p-6 sm:p-12 border-8 border-double border-amber-500/70 shadow-2xl max-w-4xl mx-auto relative overflow-hidden">
        <div className="flex flex-col items-center text-center space-y-5 relative z-10">
          <BrandLogo variant="light" showSubtitle />

          <div className="pt-2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">
              Certificado Oficial de Aprobación
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
              Estilismo Capilar, Colorimetría y Barbería
            </h1>
          </div>

          <p className="text-sm text-slate-600">Se otorga el presente reconocimiento académico a:</p>

          <div className="border-b-2 border-amber-600/50 px-8 pb-2 min-w-[260px]">
            <p className="font-display text-2xl sm:text-3xl font-bold text-slate-950 italic">
              {studentName.trim() || 'Estudiante de BarberColor Studio'}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 max-w-xl leading-relaxed">
            Por haber completado satisfactoriamente el currículo teórico-práctico de los 6 módulos de{' '}
            <strong>BarberColor Studio</strong> y aprobado el Examen Final Integral con una calificación de{' '}
            <strong>{finalResult.scorePercent}%</strong> ({finalResult.correctCount}/{finalResult.totalCount} aciertos).
          </p>

          <div className="w-full pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center text-xs text-slate-600">
            <div>
              <p className="font-bold text-slate-900">{finalResult.completedAt}</p>
              <p>Fecha de Emisión</p>
            </div>
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-amber-500/15 border-2 border-amber-600 flex items-center justify-center">
                <Award className="w-8 h-8 text-amber-700" />
              </div>
            </div>
            <div>
              <p className="font-bold text-slate-900">BarberColor Studio</p>
              <p>Dirección Académica</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
