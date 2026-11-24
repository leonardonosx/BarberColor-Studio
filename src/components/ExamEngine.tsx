import React, { useState, useMemo } from 'react';
import { CheckCircle2, XCircle, Award, ClipboardCheck, RotateCcw, ArrowRight } from 'lucide-react';
import { ExamResult, ModuleId, Question } from '../types';
import { MODULES_DATA } from '../data/modulesData';
import { QUESTIONS_DATA } from '../data/questionsData';

interface ExamEngineProps {
  selectedExamId: ModuleId | 'final';
  onSelectExam: (id: ModuleId | 'final') => void;
  examResults: Record<string, ExamResult>;
  onSaveResult: (result: ExamResult) => void;
  onGoToCertificate: () => void;
}

export function isQuestionCorrect(question: Question, selectedIds: string[]): boolean {
  const expected = [...question.correctOptionIds].sort();
  const actual = [...selectedIds].sort();
  if (expected.length !== actual.length) return false;
  return expected.every((val, idx) => val === actual[idx]);
}

export const ExamEngine: React.FC<ExamEngineProps> = ({
  selectedExamId,
  onSelectExam,
  examResults,
  onSaveResult,
  onGoToCertificate,
}) => {
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const questions = useMemo(
    () => QUESTIONS_DATA.filter((q) => q.moduleId === selectedExamId),
    [selectedExamId]
  );

  const handleExamSwitch = (id: ModuleId | 'final') => {
    onSelectExam(id);
    setAnswers({});
    setSubmitted(false);
  };

  const handleSingleChange = (qId: string, optionId: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: [optionId] }));
  };

  const handleMultipleChange = (qId: string, optionId: string) => {
    if (submitted) return;
    setAnswers((prev) => {
      const current = prev[qId] || [];
      const exists = current.includes(optionId);
      const updated = exists ? current.filter((id) => id !== optionId) : [...current, optionId];
      return { ...prev, [qId]: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let correctCount = 0;
    questions.forEach((q) => {
      if (isQuestionCorrect(q, answers[q.id] || [])) {
        correctCount++;
      }
    });
    const totalCount = questions.length;
    const scorePercent = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    const passed = scorePercent >= 70;

    setSubmitted(true);
    onSaveResult({
      examId: selectedExamId,
      scorePercent,
      correctCount,
      totalCount,
      passed,
      completedAt: new Date().toLocaleDateString('es-ES'),
    });
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const currentScore = useMemo(() => {
    if (!submitted) return null;
    let correctCount = 0;
    questions.forEach((q) => {
      if (isQuestionCorrect(q, answers[q.id] || [])) correctCount++;
    });
    const scorePercent = Math.round((correctCount / Math.max(1, questions.length)) * 100);
    return { correctCount, totalCount: questions.length, scorePercent, passed: scorePercent >= 70 };
  }, [answers, questions, submitted]);

  return (
    <div className="space-y-6 pb-8">
      {/* Selector de Evaluación */}
      <div className="bg-gradient-to-r from-slate-900 via-[#13161F] to-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold text-white flex items-center gap-2">
              <ClipboardCheck className="w-6 h-6 text-amber-400" />
              Sistema de Evaluaciones
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Preguntas de selección simple (radio) y múltiple (checkbox). Nota mínima de aprobación: 70%.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {MODULES_DATA.map((m) => {
            const res = examResults[m.id];
            const active = selectedExamId === m.id;
            return (
              <button
                key={m.id}
                onClick={() => handleExamSwitch(m.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  active
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span>Módulo {m.number}</span>
                {res?.passed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
              </button>
            );
          })}
          <button
            onClick={() => handleExamSwitch('final')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 border ${
              selectedExamId === 'final'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Examen Final Integral
          </button>
        </div>
      </div>

      {/* Resultado resumido tras enviar */}
      {submitted && currentScore && (
        <div
          className={`rounded-2xl p-5 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            currentScore.passed
              ? 'bg-emerald-500/10 border-emerald-500/30'
              : 'bg-rose-500/10 border-rose-500/30'
          }`}
        >
          <div>
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                currentScore.passed ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {currentScore.passed ? 'Evaluación Aprobada' : 'Requiere Repaso'}
            </span>
            <h2 className="text-2xl font-bold text-white mt-0.5">
              Calificación: {currentScore.scorePercent}% ({currentScore.correctCount}/{currentScore.totalCount} aciertos)
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer transition"
            >
              <RotateCcw className="w-4 h-4" />
              Reintentar
            </button>
            {selectedExamId === 'final' && currentScore.passed && (
              <button
                onClick={onGoToCertificate}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer transition"
              >
                Ver Diploma Oficial
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Cuestionario */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {questions.map((q, idx) => {
          const userSelected = answers[q.id] || [];
          const correct = submitted ? isQuestionCorrect(q, userSelected) : false;

          return (
            <div
              key={q.id}
              className="bg-slate-50 text-slate-900 border border-slate-200 rounded-2xl p-5 shadow-md space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      q.type === 'multiple'
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {q.type === 'multiple' ? 'Selección Múltiple (Checkboxes)' : 'Selección Simple (Radio)'}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {idx + 1}. {q.prompt}
                  </h3>
                </div>
                {submitted && (
                  <span className="shrink-0">
                    {correct ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-rose-600" />
                    )}
                  </span>
                )}
              </div>

              <div className="space-y-2 pt-1">
                {q.options.map((opt) => {
                  const checked = userSelected.includes(opt.id);
                  const isExpected = q.correctOptionIds.includes(opt.id);

                  let optionClass = 'bg-white border-slate-200 hover:border-amber-400';
                  if (submitted) {
                    if (isExpected) optionClass = 'bg-emerald-50 border-emerald-500 text-emerald-950';
                    else if (checked && !isExpected) optionClass = 'bg-rose-50 border-rose-500 text-rose-950';
                  } else if (checked) {
                    optionClass = 'bg-amber-50 border-amber-500';
                  }

                  return (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition ${optionClass}`}
                    >
                      <input
                        type={q.type === 'single' ? 'radio' : 'checkbox'}
                        name={q.id}
                        value={opt.id}
                        checked={checked}
                        disabled={submitted}
                        onChange={() =>
                          q.type === 'single'
                            ? handleSingleChange(q.id, opt.id)
                            : handleMultipleChange(q.id, opt.id)
                        }
                        className="w-4 h-4 accent-amber-600 shrink-0"
                      />
                      <span className="font-medium">{opt.label}</span>
                    </label>
                  );
                })}
              </div>

              {submitted && (
                <div className="mt-2 p-3 rounded-xl bg-slate-900 text-slate-100 text-xs leading-relaxed">
                  <strong className="text-amber-400">Explicación técnica: </strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}

        {!submitted && (
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition cursor-pointer shadow-lg shadow-amber-500/20"
            >
              Enviar Evaluación y Ver Resultados
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
