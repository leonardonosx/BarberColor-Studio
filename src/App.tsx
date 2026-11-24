import { useEffect, useState } from 'react';
import {
  Home,
  BookOpen,
  Palette,
  Scissors,
  ClipboardCheck,
  Award,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { BrandLogo } from './components/BrandLogo';
import { MODULES_DATA } from './data/modulesData';
import { ModuleViewer } from './components/ModuleViewer';
import { ColorSimulator } from './components/ColorSimulator';
import { BarberSimulator } from './components/BarberSimulator';
import { ExamEngine } from './components/ExamEngine';
import { CertificateView } from './components/CertificateView';
import { ExamResult, ModuleId, NavSection, UserProgress } from './types';

const STORAGE_KEY = 'barbercolor_studio_progress_v1';

const DEFAULT_PROGRESS: UserProgress = {
  completedModules: [],
  examResults: {},
  studentName: '',
};

export function App() {
  const [section, setSection] = useState<NavSection>('home');
  const [selectedExamId, setSelectedExamId] = useState<ModuleId | 'final'>('mod-1');
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...DEFAULT_PROGRESS, ...JSON.parse(saved) };
    } catch {
      // ignore storage errors
    }
    return DEFAULT_PROGRESS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore storage errors
    }
  }, [progress]);

  const toggleModuleComplete = (id: ModuleId) => {
    setProgress((prev) => {
      const exists = prev.completedModules.includes(id);
      const completedModules = exists
        ? prev.completedModules.filter((m) => m !== id)
        : [...prev.completedModules, id];
      return { ...prev, completedModules };
    });
  };

  const handleSaveExamResult = (result: ExamResult) => {
    setProgress((prev) => ({
      ...prev,
      examResults: {
        ...prev.examResults,
        [result.examId]: result,
      },
    }));
  };

  const goToExam = (examId: ModuleId | 'final') => {
    setSelectedExamId(examId);
    setSection('exams');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (target: NavSection) => {
    setSection(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeModuleIndex = MODULES_DATA.findIndex((m) => m.id === section);
  const activeModule = activeModuleIndex >= 0 ? MODULES_DATA[activeModuleIndex] : null;
  const completedCount = progress.completedModules.length;
  const progressPct = Math.round((completedCount / MODULES_DATA.length) * 100);

  return (
    <div className="min-h-screen bg-[#0B0D12] text-slate-100 flex flex-col lg:flex-row">
      {/* BARRA LATERAL FIJA (ESCRITORIO) */}
      <aside className="no-print hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 lg:left-0 bg-[#11141D] border-r border-slate-800/90 z-30">
        <div className="p-5 border-b border-slate-800/80">
          <BrandLogo showSubtitle />
        </div>

        {/* Barra de Progreso */}
        <div className="px-5 py-3.5 border-b border-slate-800/80 bg-slate-950/40">
          <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1.5">
            <span>Progreso Académico</span>
            <span className="text-amber-400">{progressPct}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Navegación Lateral */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          <button
            onClick={() => navigateTo('home')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              section === 'home'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-800/70'
            }`}
          >
            <Home className="w-4 h-4" />
            Inicio / Bienvenida
          </button>

          <div className="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Currículo (6 Módulos)
          </div>
          {MODULES_DATA.map((m) => {
            const active = section === m.id;
            const done = progress.completedModules.includes(m.id);
            return (
              <button
                key={m.id}
                onClick={() => navigateTo(m.id)}
                className={`w-full flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition cursor-pointer text-left ${
                  active
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <span className="truncate">
                  {m.number}. {m.title}
                </span>
                {done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
              </button>
            );
          })}

          <div className="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Laboratorios Prácticos
          </div>
          <button
            onClick={() => navigateTo('sim-color')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              section === 'sim-color'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-300 hover:bg-slate-800/70'
            }`}
          >
            <Palette className="w-4 h-4" />
            Simulador de Color
          </button>
          <button
            onClick={() => navigateTo('sim-barber')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              section === 'sim-barber'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-300 hover:bg-slate-800/70'
            }`}
          >
            <Scissors className="w-4 h-4" />
            Simulador de Corte
          </button>

          <div className="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Evaluación y Diploma
          </div>
          <button
            onClick={() => navigateTo('exams')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              section === 'exams'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-300 hover:bg-slate-800/70'
            }`}
          >
            <ClipboardCheck className="w-4 h-4" />
            Exámenes Interactivos
          </button>
          <button
            onClick={() => navigateTo('certificate')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              section === 'certificate'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-300 hover:bg-slate-800/70'
            }`}
          >
            <Award className="w-4 h-4" />
            Certificado Oficial
          </button>
        </nav>
      </aside>

      {/* ENCABEZADO COMPACTO MÓVIL / TABLET */}
      <header className="no-print lg:hidden sticky top-0 z-30 bg-[#11141D]/95 backdrop-blur border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <BrandLogo variant="compact" />
        <button
          onClick={() => navigateTo('certificate')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold"
        >
          <Award className="w-3.5 h-3.5" />
          Diploma
        </button>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 lg:pl-72 pb-24 lg:pb-8">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* PANTALLA DE BIENVENIDA — ESTÉTICA ATELIER / SALÓN DE BELLEZA */}
          {section === 'home' && (
            <div className="space-y-10">
              <section className="relative rounded-3xl overflow-hidden border border-amber-500/25 shadow-2xl min-h-[340px] flex items-end">
                <img
                  src="/images/hero-salon.svg"
                  alt="BarberColor Studio Atelier"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/80 to-[#090A0F]/30" />

                <div className="relative z-10 p-6 sm:p-10 max-w-3xl space-y-4">
                  <BrandLogo showSubtitle />
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-400 pt-2">
                    Atelier de Alta Peluquería, Colorimetría &amp; Barbería
                  </p>
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    Domina el Arte Capilar con Precisión Científica y Estética de Salón
                  </h1>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                    Explora 6 módulos visuales con referencias de salón, evaluaciones interactivas de selección simple y múltiple, simulador cromático y laboratorio de corte en Canvas 2D.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => navigateTo('mod-1')}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-sm transition cursor-pointer shadow-lg shadow-amber-500/25"
                    >
                      <BookOpen className="w-4 h-4" />
                      Comenzar Módulo 1
                    </button>
                    <button
                      onClick={() => navigateTo('sim-color')}
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#141720]/90 backdrop-blur border border-amber-500/30 hover:border-amber-400 text-white font-semibold text-sm transition cursor-pointer"
                    >
                      <Palette className="w-4 h-4 text-amber-400" />
                      Simulador de Color
                    </button>
                    <button
                      onClick={() => navigateTo('sim-barber')}
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#141720]/90 backdrop-blur border border-amber-500/30 hover:border-amber-400 text-white font-semibold text-sm transition cursor-pointer"
                    >
                      <Scissors className="w-4 h-4 text-amber-400" />
                      Simulador de Corte
                    </button>
                  </div>
                </div>
              </section>

              {/* Resumen de los 6 Módulos con Imágenes de Referencia */}
              <section className="space-y-5">
                <div className="flex items-center justify-between border-b border-amber-500/15 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 block">
                      Currículo Editorial
                    </span>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2 mt-0.5">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                      Plan de Estudios (6 Módulos)
                    </h2>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-300">
                    {completedCount} de 6 completados
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {MODULES_DATA.map((m) => {
                    const done = progress.completedModules.includes(m.id);
                    const examRes = progress.examResults[m.id];
                    return (
                      <button
                        key={m.id}
                        onClick={() => navigateTo(m.id)}
                        className="group bg-[#12141C] hover:bg-[#171A24] border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden text-left transition cursor-pointer flex flex-col justify-between shadow-lg"
                      >
                        <div>
                          {/* Imagen de Referencia del Módulo */}
                          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#090A0F]">
                            <img
                              src={m.imageUrl}
                              alt={m.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-transparent to-transparent" />
                            <div className="absolute top-3 left-3 flex items-center gap-2">
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#090A0F]/85 backdrop-blur text-amber-300 border border-amber-500/30">
                                Módulo {m.number}
                              </span>
                            </div>
                            {done && (
                              <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40">
                                <CheckCircle2 className="w-3 h-3" />
                                Completado
                              </span>
                            )}
                          </div>

                          <div className="p-5 pb-3">
                            <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-300 transition leading-snug">
                              {m.title}
                            </h3>
                            <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                              {m.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="px-5 py-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                          <span className="text-slate-400">
                            {examRes ? `Quiz: ${examRes.scorePercent}%` : m.duration}
                          </span>
                          <span className="inline-flex items-center gap-1 font-semibold text-amber-400">
                            Explorar tema <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>
          )}

          {/* MÓDULO ACTIVO */}
          {activeModule && (
            <ModuleViewer
              module={activeModule}
              isCompleted={progress.completedModules.includes(activeModule.id)}
              onToggleComplete={toggleModuleComplete}
              onGoToExam={(id) => goToExam(id)}
              onNextModule={
                activeModuleIndex < MODULES_DATA.length - 1
                  ? () => navigateTo(MODULES_DATA[activeModuleIndex + 1].id)
                  : undefined
              }
            />
          )}

          {/* SIMULADORES */}
          {section === 'sim-color' && <ColorSimulator />}
          {section === 'sim-barber' && <BarberSimulator />}

          {/* EXÁMENES */}
          {section === 'exams' && (
            <ExamEngine
              selectedExamId={selectedExamId}
              onSelectExam={setSelectedExamId}
              examResults={progress.examResults}
              onSaveResult={handleSaveExamResult}
              onGoToCertificate={() => navigateTo('certificate')}
            />
          )}

          {/* CERTIFICADO */}
          {section === 'certificate' && (
            <CertificateView
              studentName={progress.studentName}
              onChangeStudentName={(name) =>
                setProgress((prev) => ({ ...prev, studentName: name }))
              }
              finalResult={progress.examResults['final']}
              onGoToFinalExam={() => goToExam('final')}
            />
          )}
        </div>
      </main>

      {/* BARRA DE NAVEGACIÓN INFERIOR FIJA (MÓVIL / TABLET) */}
      <nav className="no-print lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#11141D]/95 backdrop-blur border-t border-slate-800 px-2 py-1.5 grid grid-cols-5 gap-1">
        {[
          { id: 'home' as NavSection, label: 'Inicio', icon: Home },
          {
            id: (activeModule ? activeModule.id : 'mod-1') as NavSection,
            label: 'Módulos',
            icon: BookOpen,
            isActive: Boolean(activeModule),
          },
          { id: 'sim-color' as NavSection, label: 'Color', icon: Palette },
          { id: 'sim-barber' as NavSection, label: 'Corte', icon: Scissors },
          { id: 'exams' as NavSection, label: 'Examen', icon: ClipboardCheck },
        ].map((item) => {
          const Icon = item.icon;
          const active = item.isActive ?? section === item.id;
          return (
            <button
              key={item.label}
              onClick={() => navigateTo(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 rounded-xl text-[10px] font-semibold transition ${
                active ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default App;
