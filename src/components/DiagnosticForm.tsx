import React, { useEffect, useState } from 'react';
import {
  FileText,
  Download,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Printer,
  ShieldCheck,
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { BrandLogo } from './BrandLogo';

interface DiagnosticData {
  clientName: string;
  date: string;
  serviceRequested: string;
  barberName: string;

  // 1. Semáforo
  scalpBase: string[];
  pityriasis: string;
  risks: string[];
  obsState: string;
  obsAnomaly: boolean;
  sensState: string;
  sensAnomaly: boolean;
  glandAnomaly: boolean;

  // 2. Hebra
  density: string;
  thickness: string;
  porosity: string;
  elasticity: string;
  hairType: string;

  // 3. Colorimetría
  naturalLevel: string;
  melanin: string;
  grayPercent: string;
  hasPreviousChem: 'Sí' | 'No' | '';
  previousChemDetails: string;

  // 4. Visagismo
  faceShape: string;
  profile: string;
  skullNotes: string[];
  skullType: string;
  clientType: string;
  bodyType: string;
  skinTemp: string;

  // 5. Prescripción y Consentimiento
  suggestedTreatment: string;
  rescueLine: string[];
  rescueOther: string;
  suggestedStyle: string;
  consentAccepted: boolean;
  clientSignature: string;
  barberSignature: string;
}

const STORAGE_KEY = 'barbercolor_studio_diagnostic_v1';

const EMPTY_DATA: DiagnosticData = {
  clientName: '',
  date: new Date().toISOString().split('T')[0],
  serviceRequested: '',
  barberName: '',
  scalpBase: [],
  pityriasis: 'Ninguna',
  risks: [],
  obsState: 'Normal',
  obsAnomaly: false,
  sensState: 'Normal',
  sensAnomaly: false,
  glandAnomaly: false,
  density: '',
  thickness: '',
  porosity: '',
  elasticity: '',
  hairType: '',
  naturalLevel: '',
  melanin: '',
  grayPercent: '',
  hasPreviousChem: '',
  previousChemDetails: '',
  faceShape: '',
  profile: '',
  skullNotes: [],
  skullType: '',
  clientType: '',
  bodyType: '',
  skinTemp: '',
  suggestedTreatment: '',
  rescueLine: [],
  rescueOther: '',
  suggestedStyle: '',
  consentAccepted: false,
  clientSignature: '',
  barberSignature: '',
};

const SAMPLE_DATA: DiagnosticData = {
  clientName: 'Camila Mendoza',
  date: new Date().toISOString().split('T')[0],
  serviceRequested: 'Balayage Dorado + Corte en Capas',
  barberName: 'Estilista BarberColor Studio',
  scalpBase: ['Normal (Eudérmico)'],
  pityriasis: 'Ninguna',
  risks: [],
  obsState: 'Normal',
  obsAnomaly: false,
  sensState: 'Normal',
  sensAnomaly: false,
  glandAnomaly: false,
  density: 'Media',
  thickness: 'Medio',
  porosity: 'Alta (Dañada/Química)',
  elasticity: 'Regular (Frágil)',
  hairType: '2B (Onda definida)',
  naturalLevel: '5',
  melanin: 'Feomelanina (Amarillo)',
  grayPercent: '25%',
  hasPreviousChem: 'Sí',
  previousChemDetails: 'Decoloración previa hace 6 meses en medios y puntas',
  faceShape: 'Ovalado',
  profile: 'Recto',
  skullNotes: [],
  skullType: 'Mesocéfalo equilibrado',
  clientType: 'Clásico moderno',
  bodyType: 'Armónico',
  skinTemp: 'Cálida (Otoño / Primavera)',
  suggestedTreatment: 'Reconstrucción de aminoácidos previa y sellado ácido post-color (pH 3.0)',
  rescueLine: ['Reconstrucción Intensiva'],
  rescueOther: '',
  suggestedStyle: 'Capas largas con contorno frontal iluminado (Regla 60-30-10)',
  consentAccepted: true,
  clientSignature: 'Camila Mendoza',
  barberSignature: 'Estilista BarberColor Studio',
};

export const DiagnosticForm: React.FC = () => {
  const [data, setData] = useState<DiagnosticData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...EMPTY_DATA, ...JSON.parse(saved) };
    } catch {
      // ignore storage errors
    }
    return EMPTY_DATA;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore storage errors
    }
  }, [data]);

  const toggleArrayItem = (field: 'scalpBase' | 'risks' | 'skullNotes' | 'rescueLine', value: string) => {
    setData((prev) => {
      const list = prev[field];
      const next = list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
      return { ...prev, [field]: next };
    });
  };

  const hasRedAlert = data.risks.length > 0 || data.obsAnomaly || data.sensAnomaly || data.glandAnomaly;

  const handleDownloadPdf = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'letter' });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 15;
    let y = 16;

    const checkPage = (needed = 14) => {
      if (y + needed > 262) {
        doc.addPage();
        y = 18;
      }
    };

    const drawSectionHeader = (title: string) => {
      checkPage(14);
      doc.setFillColor(17, 20, 29);
      doc.rect(margin, y, pageW - margin * 2, 7.5, 'F');
      doc.setTextColor(245, 196, 81);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(title, margin + 3, y + 5.2);
      y += 11;
      doc.setTextColor(30, 41, 59);
    };

    const drawLineField = (label: string, value: string) => {
      checkPage(8);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.text(`${label}:`, margin, y);
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(value || '—', pageW - margin * 2 - 48);
      doc.text(lines, margin + 48, y);
      y += Math.max(6, lines.length * 4.8);
    };

    // Encabezado oficial BarberColor Studio
    doc.setFillColor(11, 13, 18);
    doc.rect(0, 0, pageW, 26, 'F');
    doc.setTextColor(212, 175, 55);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.text('BARBERCOLOR STUDIO', margin, 11.5);
    doc.setTextColor(226, 232, 240);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.text('FICHA DE DIAGNÓSTICO PROFESIONAL — TRICOLOGÍA, COLORIMETRÍA Y VISAGISMO', margin, 18.5);
    y = 34;

    // Datos generales
    doc.setTextColor(30, 41, 59);
    drawLineField('Nombre del Cliente', data.clientName);
    drawLineField('Fecha', data.date);
    drawLineField('Servicio Solicitado', data.serviceRequested);
    drawLineField('Barbero / Estilista', data.barberName);
    y += 2;

    // 1. Semáforo
    drawSectionHeader('1. ANÁLISIS DEL CUERO CABELLUDO (EL SEMÁFORO)');
    drawLineField('Estado Base', data.scalpBase.join(', ') || 'No especificado');
    drawLineField('Pitiriasis (Caspa)', data.pityriasis || 'Ninguna');
    drawLineField('Riesgos / Patologías', data.risks.join(', ') || 'Ninguno detectado');
    drawLineField(
      'Observación / Sensibilidad',
      `Obs: ${data.obsState}${data.obsAnomaly ? ' (Anomalía Caspa)' : ''} | Sens: ${data.sensState}${data.sensAnomaly ? ' (Irritación/Heridas)' : ''}${data.glandAnomaly ? ' | Foliculitis/Pus' : ''}`
    );
    if (hasRedAlert) {
      checkPage(10);
      doc.setTextColor(185, 28, 28);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text('ALERTA ROJA: Se detectaron anomalías de riesgo. Suspender servicio y derivar al dermatólogo.', margin, y);
      y += 7;
      doc.setTextColor(30, 41, 59);
    }
    y += 2;

    // 2. Hebra
    drawSectionHeader('2. ANÁLISIS DE LA HEBRA Y CLASIFICACIÓN CAPILAR');
    drawLineField('Densidad (Espejo)', data.density);
    drawLineField('Grosor (Textura)', data.thickness);
    drawLineField('Porosidad (Vaso/Tacto)', data.porosity);
    drawLineField('Elasticidad', data.elasticity);
    drawLineField('Tipo de Cabello', data.hairType);
    y += 2;

    // 3. Colorimetría
    drawSectionHeader('3. COLORIMETRÍA (SERVICIOS QUÍMICOS)');
    drawLineField('Altura de Tono Natural', data.naturalLevel ? `Altura ${data.naturalLevel}` : '—');
    drawLineField('Pigmento Predominante', data.melanin);
    drawLineField('% de Canas', data.grayPercent);
    drawLineField(
      'Historial Químico',
      data.hasPreviousChem ? `${data.hasPreviousChem}${data.previousChemDetails ? ` — ${data.previousChemDetails}` : ''}` : '—'
    );
    y += 2;

    // 4. Morfología y Visagismo
    drawSectionHeader('4. MORFOLOGÍA Y DISEÑO (VISAGISMO)');
    drawLineField('Forma del Rostro', data.faceShape);
    drawLineField('Perfil', data.profile);
    drawLineField('Reseñas del Cráneo', data.skullNotes.join(', ') || 'Ninguna');
    drawLineField('Tipo de Cráneo', data.skullType);
    drawLineField('Tipo de Cliente', data.clientType);
    drawLineField('Tipo de Cuerpo', data.bodyType);
    drawLineField('Temperatura de Piel', data.skinTemp);
    y += 2;

    // 5. Recomendación y Consentimiento
    drawSectionHeader('5. RECOMENDACIÓN PROFESIONAL Y CONSENTIMIENTO INFORMADO');
    drawLineField('Tratamiento Sugerido', data.suggestedTreatment);
    drawLineField(
      'Tratamiento de Rescate',
      [...data.rescueLine, data.rescueOther].filter(Boolean).join(', ') || '—'
    );
    drawLineField('Peinado / Corte Sugerido', data.suggestedStyle);
    y += 2;

    checkPage(26);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.8);
    doc.text(
      `[${data.consentAccepted ? 'X' : ' '}] Confirmo que he sido informado sobre el estado de mi cabello y acepto los procedimientos sugeridos por el profesional.`,
      margin,
      y,
      { maxWidth: pageW - margin * 2 }
    );
    y += 12;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(`Firma del Cliente: ${data.clientSignature || '______________________'}`, margin, y);
    doc.text(`Firma del Barbero: ${data.barberSignature || '______________________'}`, pageW / 2 + 5, y);

    const safeName = (data.clientName || 'Cliente').replace(/[^a-zA-Z0-9_-]/g, '_');
    doc.save(`Ficha-Diagnostico-${safeName}-BarberColor-Studio.pdf`);
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Encabezado y Acciones */}
      <div className="no-print bg-gradient-to-r from-[#141720] via-[#101219] to-[#090A0F] border border-amber-500/25 rounded-3xl p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xl">
        <div>
          <BrandLogo variant="compact" className="mb-2" />
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-400" />
            Ficha de Diagnóstico Profesional
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Registra el análisis tricológico, colorimétrico y de visagismo del cliente, y descarga el informe en PDF.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setData(SAMPLE_DATA)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Cargar Ejemplo
          </button>
          <button
            type="button"
            onClick={() => setData({ ...EMPTY_DATA, date: new Date().toISOString().split('T')[0] })}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Limpiar
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            Imprimir
          </button>
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition cursor-pointer shadow-lg shadow-amber-500/20"
          >
            <Download className="w-4 h-4" />
            Descargar PDF
          </button>
        </div>
      </div>

      {/* Alerta Roja Automática */}
      {hasRedAlert && (
        <div className="bg-rose-500/15 border border-rose-500/40 rounded-2xl p-4 flex items-start gap-3 text-rose-200">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <strong className="text-rose-300 block">ALERTA ROJA CLÍNICA DETECTADA</strong>
            Si observa parásitos (pediculosis), foliculitis con pus o inflamación severa, suspenda el servicio químico o de corte y refiera al dermatólogo.
          </div>
        </div>
      )}

      {/* Cuerpo del Formulario (Tarjeta Marfil Editorial) */}
      <div className="bg-[#FAF8F5] text-slate-900 rounded-3xl p-5 sm:p-8 border border-amber-500/25 shadow-2xl space-y-8">
        {/* Datos Generales */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-6 border-b border-slate-200">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Nombre del Cliente</label>
            <input
              type="text"
              value={data.clientName}
              onChange={(e) => setData({ ...data, clientName: e.target.value })}
              placeholder="Ej. Ana García"
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:border-amber-600"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Fecha</label>
            <input
              type="date"
              value={data.date}
              onChange={(e) => setData({ ...data, date: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:border-amber-600"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Servicio Solicitado</label>
            <input
              type="text"
              value={data.serviceRequested}
              onChange={(e) => setData({ ...data, serviceRequested: e.target.value })}
              placeholder="Ej. Fade + Color"
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:border-amber-600"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Barbero / Estilista</label>
            <input
              type="text"
              value={data.barberName}
              onChange={(e) => setData({ ...data, barberName: e.target.value })}
              placeholder="Nombre del profesional"
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-sm focus:outline-none focus:border-amber-600"
            />
          </div>
        </section>

        {/* 1. ANÁLISIS DEL CUERO CABELLUDO (El Semáforo) */}
        <section className="space-y-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              1. Análisis del Cuero Cabelludo (El Semáforo)
            </h2>
            <p className="text-xs text-slate-600">
              Marca el estado observado. Si detectas anomalías en rojo, suspende el servicio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Estado Base */}
            <div className="bg-white rounded-2xl p-4 border border-emerald-200 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                Estado Base (Verde)
              </span>
              {['Normal (Eudérmico)', 'Graso (Seborreico)', 'Seco (Alípico)', 'Mixto'].map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.scalpBase.includes(opt)}
                    onChange={() => toggleArrayItem('scalpBase', opt)}
                    className="w-4 h-4 accent-emerald-600"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            {/* Pitiriasis */}
            <div className="bg-white rounded-2xl p-4 border border-amber-200 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block">
                Pitiriasis / Caspa (Amarillo)
              </span>
              {['Seca (Simple)', 'Grasa (Esteatoide)', 'Ninguna'].map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="pityriasis"
                    checked={data.pityriasis === opt}
                    onChange={() => setData({ ...data, pityriasis: opt })}
                    className="w-4 h-4 accent-amber-600"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            {/* Riesgos */}
            <div className="bg-white rounded-2xl p-4 border border-rose-300 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block">
                Riesgos / Patologías (Rojo)
              </span>
              {[
                'Foliculitis (Pus/Inflamación)',
                'Dermatitis / Eccemas',
                'Pediculosis (Piojos)',
                'Alopecia (Parches/Difusa)',
              ].map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer text-rose-900">
                  <input
                    type="checkbox"
                    checked={data.risks.includes(opt)}
                    onChange={() => toggleArrayItem('risks', opt)}
                    className="w-4 h-4 accent-rose-600"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tabla compacta Observación / Sensibilidad / Glándulas */}
          <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 p-3">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600">
                  <th className="py-2 px-2">Estado</th>
                  <th className="py-2 px-2">Normal</th>
                  <th className="py-2 px-2">Graso</th>
                  <th className="py-2 px-2">Seco</th>
                  <th className="py-2 px-2">Mixto</th>
                  <th className="py-2 px-2 text-rose-700">Anomalía (Riesgo)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 px-2 font-bold">Observación</td>
                  {['Normal', 'Graso', 'Seco', 'Mixto'].map((st) => (
                    <td key={`obs-${st}`} className="py-2 px-2">
                      <input
                        type="radio"
                        name="obsState"
                        checked={data.obsState === st}
                        onChange={() => setData({ ...data, obsState: st })}
                        className="accent-amber-600"
                      />
                    </td>
                  ))}
                  <td className="py-2 px-2">
                    <label className="inline-flex items-center gap-1.5 text-rose-700 font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.obsAnomaly}
                        onChange={(e) => setData({ ...data, obsAnomaly: e.target.checked })}
                        className="accent-rose-600"
                      />
                      Caspa (Pitiriasis)
                    </label>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-2 font-bold">Sensibilidad</td>
                  {['Normal', 'Graso', 'Seco', 'Mixto'].map((st) => (
                    <td key={`sens-${st}`} className="py-2 px-2">
                      <input
                        type="radio"
                        name="sensState"
                        checked={data.sensState === st}
                        onChange={() => setData({ ...data, sensState: st })}
                        className="accent-amber-600"
                      />
                    </td>
                  ))}
                  <td className="py-2 px-2">
                    <label className="inline-flex items-center gap-1.5 text-rose-700 font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.sensAnomaly}
                        onChange={(e) => setData({ ...data, sensAnomaly: e.target.checked })}
                        className="accent-rose-600"
                      />
                      Irritación / Heridas
                    </label>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-2 font-bold">Glándulas</td>
                  <td className="py-2 px-2 text-slate-600">Equilibrio</td>
                  <td className="py-2 px-2 text-slate-600">Exceso</td>
                  <td className="py-2 px-2 text-slate-600">Falta</td>
                  <td className="py-2 px-2 text-slate-400">-</td>
                  <td className="py-2 px-2">
                    <label className="inline-flex items-center gap-1.5 text-rose-700 font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.glandAnomaly}
                        onChange={(e) => setData({ ...data, glandAnomaly: e.target.checked })}
                        className="accent-rose-600"
                      />
                      Foliculitis / Pus
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 2. ANÁLISIS DE LA HEBRA */}
        <section className="space-y-4 pt-4 border-t border-slate-200">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            2. Análisis de la Hebra y Clasificación Capilar
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Densidad (Espejo)', field: 'density' as const, opts: ['Baja', 'Media', 'Alta'] },
              { label: 'Grosor (Textura)', field: 'thickness' as const, opts: ['Fino', 'Medio', 'Grueso (Recio)'] },
              {
                label: 'Porosidad (Vaso/Tacto)',
                field: 'porosity' as const,
                opts: ['Baja (Resistente)', 'Media (Saludable)', 'Alta (Dañada/Química)'],
              },
              {
                label: 'Elasticidad',
                field: 'elasticity' as const,
                opts: ['Buena (Retorna)', 'Regular (Frágil)', 'Mala (Se rompe/Chicloso)'],
              },
            ].map((group) => (
              <div key={group.field} className="bg-white rounded-2xl p-3.5 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-800 block">{group.label}</span>
                {group.opts.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="radio"
                      name={group.field}
                      checked={data[group.field] === opt}
                      onChange={() => setData({ ...data, [group.field]: opt })}
                      className="accent-amber-600"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>

          {/* Clasificación Tipos 1-4 */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-800 block">
              Clasificación del Tipo de Cabello (Tipos 1 al 4)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {[
                { title: 'Tipo 1 (Liso)', opts: ['1A (Fino)', '1B (Medio)', '1C (Grueso)'] },
                { title: 'Tipo 2 (Ondulado)', opts: ['2A (Onda suave)', '2B (Onda definida)', '2C (S)'] },
                { title: 'Tipo 3 (Rizado)', opts: ['3A (Espiral ancho)', '3B (Resorte)', '3C (Tirabuzón)'] },
                { title: 'Tipo 4 (Afro)', opts: ['4A (Zig-Zag)', '4B (Muy denso)', '4C (Sin definición)'] },
              ].map((cat) => (
                <div key={cat.title} className="space-y-1.5">
                  <span className="font-bold text-amber-800 block">{cat.title}</span>
                  {cat.opts.map((o) => (
                    <label key={o} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hairType"
                        checked={data.hairType === o}
                        onChange={() => setData({ ...data, hairType: o })}
                        className="accent-amber-600"
                      />
                      <span>{o}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. COLORIMETRÍA */}
        <section className="space-y-4 pt-4 border-t border-slate-200">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            3. Colorimetría (Servicios Químicos)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800 block">Altura de Tono Natural (1 al 10)</span>
              <div className="flex flex-wrap gap-1.5">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((lvl) => (
                  <button
                    type="button"
                    key={lvl}
                    onClick={() => setData({ ...data, naturalLevel: lvl })}
                    className={`w-8 h-8 rounded-lg text-xs font-bold cursor-pointer transition ${
                      data.naturalLevel === lvl
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800 block">Pigmento Predominante (Melanina)</span>
              <div className="flex flex-wrap gap-3 text-xs">
                {['Eumelanina (Frío)', 'Feomelanina (Amarillo)', 'Tricosiderina (Rojo)'].map((mel) => (
                  <label key={mel} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="melanin"
                      checked={data.melanin === mel}
                      onChange={() => setData({ ...data, melanin: mel })}
                      className="accent-amber-600"
                    />
                    <span>{mel}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800 block">% de Canas</span>
              <div className="flex flex-wrap gap-2">
                {['0%', '25%', '50%', '75%', '100%'].map((pct) => (
                  <button
                    type="button"
                    key={pct}
                    onClick={() => setData({ ...data, grayPercent: pct })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition ${
                      data.grayPercent === pct
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {pct}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800 block">Historial Químico (¿Procesos previos?)</span>
              <div className="flex items-center gap-4 text-xs">
                {(['Sí', 'No'] as const).map((ans) => (
                  <label key={ans} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="hasPreviousChem"
                      checked={data.hasPreviousChem === ans}
                      onChange={() => setData({ ...data, hasPreviousChem: ans })}
                      className="accent-amber-600"
                    />
                    <span>{ans}</span>
                  </label>
                ))}
              </div>
              <input
                type="text"
                value={data.previousChemDetails}
                onChange={(e) => setData({ ...data, previousChemDetails: e.target.value })}
                placeholder="¿Cuáles procesos? (alisados, tintes, decoloración...)"
                className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>
        </section>

        {/* 4. MORFOLOGÍA Y DISEÑO (VISAGISMO) */}
        <section className="space-y-4 pt-4 border-t border-slate-200">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            4. Morfología y Diseño (Visagismo)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800 block">Forma del Rostro</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Ovalado',
                  'Cuadrado',
                  'Redondo',
                  'Diamante',
                  'Corazón',
                  'Rectangular',
                  'Alargado',
                  'Triangular',
                  'Triangular Invertido',
                ].map((shape) => (
                  <button
                    type="button"
                    key={shape}
                    onClick={() => setData({ ...data, faceShape: shape })}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition ${
                      data.faceShape === shape
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-3">
              <div>
                <span className="text-xs font-bold text-slate-800 block mb-1.5">Perfil</span>
                <div className="flex gap-3 text-xs">
                  {['Recto', 'Cóncavo', 'Convexo'].map((p) => (
                    <label key={p} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="profile"
                        checked={data.profile === p}
                        onChange={() => setData({ ...data, profile: p })}
                        className="accent-amber-600"
                      />
                      <span>{p}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-800 block mb-1.5">Reseñas del Cráneo</span>
                <div className="flex flex-wrap gap-3 text-xs">
                  {['Protuberancias', 'Cicatrices', 'Zonas de baja densidad'].map((note) => (
                    <label key={note} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.skullNotes.includes(note)}
                        onChange={() => toggleArrayItem('skullNotes', note)}
                        className="accent-amber-600"
                      />
                      <span>{note}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: 'Tipo de Cráneo', field: 'skullType' as const, placeholder: 'Ej. Mesocéfalo' },
              { label: 'Tipo de Cliente', field: 'clientType' as const, placeholder: 'Ej. Ejecutivo / Urbano' },
              { label: 'Tipo de Cuerpo', field: 'bodyType' as const, placeholder: 'Ej. Atlético / Armónico' },
              { label: 'Temperatura de Piel', field: 'skinTemp' as const, placeholder: 'Ej. Cálida / Fría' },
            ].map((inp) => (
              <div key={inp.field} className="bg-white rounded-xl p-3 border border-slate-200">
                <label className="text-xs font-bold text-slate-700 block mb-1">{inp.label}</label>
                <input
                  type="text"
                  value={data[inp.field]}
                  onChange={(e) => setData({ ...data, [inp.field]: e.target.value })}
                  placeholder={inp.placeholder}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-amber-600"
                />
              </div>
            ))}
          </div>
        </section>

        {/* 5. RECOMENDACIÓN Y CONSENTIMIENTO INFORMADO */}
        <section className="space-y-4 pt-4 border-t border-slate-200">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            5. Recomendación Profesional (Prescripción) y Consentimiento
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2">
              <label className="text-xs font-bold text-slate-800 block">Tratamiento Sugerido</label>
              <textarea
                rows={2}
                value={data.suggestedTreatment}
                onChange={(e) => setData({ ...data, suggestedTreatment: e.target.value })}
                placeholder="Describe el protocolo recomendado según el diagnóstico..."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-amber-600"
              />
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800 block">Tratamiento de Rescate</span>
              <div className="flex flex-wrap gap-3 text-xs">
                {['Reconstrucción Intensiva', 'Hidratación / Sellado Ácido', 'Otro'].map((opt) => (
                  <label key={opt} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.rescueLine.includes(opt)}
                      onChange={() => toggleArrayItem('rescueLine', opt)}
                      className="accent-amber-600"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
              {data.rescueLine.includes('Otro') && (
                <input
                  type="text"
                  value={data.rescueOther}
                  onChange={(e) => setData({ ...data, rescueOther: e.target.value })}
                  placeholder="Especifica otro tratamiento..."
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                />
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200">
            <label className="text-xs font-bold text-slate-800 block mb-1">Peinado / Corte Sugerido</label>
            <input
              type="text"
              value={data.suggestedStyle}
              onChange={(e) => setData({ ...data, suggestedStyle: e.target.value })}
              placeholder="Ej. Degradado medio con textura superior..."
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-amber-600"
            />
          </div>

          {/* Consentimiento Informado */}
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-amber-700" />
              Consentimiento Informado
            </div>
            <label className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={data.consentAccepted}
                onChange={(e) => setData({ ...data, consentAccepted: e.target.checked })}
                className="w-4 h-4 mt-0.5 accent-amber-600 shrink-0"
              />
              <span className="italic">
                Confirmo que he sido informado sobre el estado de mi cabello y acepto los procedimientos sugeridos por el profesional.
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Firma del Cliente</label>
                <input
                  type="text"
                  value={data.clientSignature}
                  onChange={(e) => setData({ ...data, clientSignature: e.target.value })}
                  placeholder="Nombre completo del cliente"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-amber-300 text-sm font-display italic focus:outline-none focus:border-amber-600"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Firma del Barbero / Estilista</label>
                <input
                  type="text"
                  value={data.barberSignature}
                  onChange={(e) => setData({ ...data, barberSignature: e.target.value })}
                  placeholder="Nombre del profesional"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-amber-300 text-sm font-display italic focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>
          </div>

          {/* Consejos de uso */}
          <div className="bg-slate-900 text-slate-200 rounded-2xl p-4 space-y-1.5 text-xs">
            <span className="font-bold text-amber-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Consejos al usar esta herramienta:
            </span>
            <p>1. <strong>Educación, no solo venta:</strong> Al explicar la porosidad alta o el estado de la hebra, justificas técnicamente el tratamiento de rescate.</p>
            <p>2. <strong>Seguridad legal:</strong> El consentimiento informado respalda al profesional si un cabello previamente dañado no resiste un proceso químico fuerte.</p>
            <p>3. <strong>Archivo de Clientes:</strong> Descarga el PDF en cada visita para llevar el historial y evolución capilar de cada cliente.</p>
          </div>
        </section>
      </div>
    </div>
  );
};
