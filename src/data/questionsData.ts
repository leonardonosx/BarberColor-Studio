import { Question } from '../types';

export const QUESTIONS_DATA: Question[] = [
  // MÓDULO 1
  {
    id: 'q-m1-1',
    moduleId: 'mod-1',
    type: 'single',
    prompt: 'Según la Regla 60-30-10 aplicada al diseño de color capilar, ¿qué representa el 10%?',
    options: [
      { id: 'a', label: 'El color dominante o base general' },
      { id: 'b', label: 'El color de acento o punto focal (mechas o detalles)' },
      { id: 'c', label: 'El porcentaje de oxidante en la mezcla' },
      { id: 'd', label: 'El tono neutro de transición' }
    ],
    correctOptionIds: ['b'],
    explanation: 'En la Regla 60-30-10, el 60% corresponde al color dominante, el 30% al secundario de transición y el 10% al color de acento que aporta contraste e impacto.'
  },
  {
    id: 'q-m1-2',
    moduleId: 'mod-1',
    type: 'single',
    prompt: 'Si un cabello decolorado a altura 9 presenta un reflejo amarillo indeseado, ¿qué color complementario debes aplicar para neutralizarlo?',
    options: [
      { id: 'a', label: 'Verde' },
      { id: 'b', label: 'Azul' },
      { id: 'c', label: 'Violeta' },
      { id: 'd', label: 'Naranja' }
    ],
    correctOptionIds: ['c'],
    explanation: 'En el círculo cromático, el violeta es el color complementario (opuesto) al amarillo, por lo que lo neutraliza generando un rubio limpio y equilibrado.'
  },
  {
    id: 'q-m1-3',
    moduleId: 'mod-1',
    type: 'multiple',
    prompt: 'Selecciona TODOS los pigmentos naturales (melaninas) que determinan el color del cabello humano:',
    options: [
      { id: 'a', label: 'Eumelanina' },
      { id: 'b', label: 'Queratina alcalina' },
      { id: 'c', label: 'Feomelanina' },
      { id: 'd', label: 'Tricosiderina' }
    ],
    correctOptionIds: ['a', 'c', 'd'],
    explanation: 'Los tres pigmentos melánicos del cabello son Eumelanina (tonos oscuros), Feomelanina (tonos claros/dorados) y Tricosiderina (tonos pelirrojos ricos en hierro).'
  },

  // MÓDULO 2
  {
    id: 'q-m2-1',
    moduleId: 'mod-2',
    type: 'single',
    prompt: '¿Cuál es el rango fisiológico saludable del manto ácido del cabello y cuero cabelludo?',
    options: [
      { id: 'a', label: 'pH 2.5 – 3.5' },
      { id: 'b', label: 'pH 4.5 – 5.5' },
      { id: 'c', label: 'pH 7.0 – 7.5' },
      { id: 'd', label: 'pH 9.0 – 10.5' }
    ],
    correctOptionIds: ['b'],
    explanation: 'El manto ácido saludable se ubica entre pH 4.5 y 5.5, manteniendo la cutícula cerrada, brillante y protegida.'
  },
  {
    id: 'q-m2-2',
    moduleId: 'mod-2',
    type: 'single',
    prompt: 'Al finalizar un servicio de decoloración (pH 10.5 – 12.0), ¿qué rango de pH se requiere para realizar el sellado técnico / acidificación post-color?',
    options: [
      { id: 'a', label: 'pH 2.5 – 3.5' },
      { id: 'b', label: 'pH 7.0' },
      { id: 'c', label: 'pH 8.5 – 9.0' },
      { id: 'd', label: 'pH 11.0' }
    ],
    correctOptionIds: ['a'],
    explanation: 'La acidificación post-color utiliza productos entre pH 2.5 y 3.5 para neutralizar la alcalinidad residual y sellar las escamas de la cutícula.'
  },
  {
    id: 'q-m2-3',
    moduleId: 'mod-2',
    type: 'multiple',
    prompt: 'Marca TODAS las afirmaciones correctas sobre el comportamiento del pH en la cutícula capilar:',
    options: [
      { id: 'a', label: 'Un pH alcalino (7.1 a 14) abre las escamas de la cutícula y dilata la fibra' },
      { id: 'b', label: 'Un pH ácido (0 a 6.9) contrae y sella la cutícula aumentando el brillo' },
      { id: 'c', label: 'La coloración permanente trabaja en rango ácido (3.0)' },
      { id: 'd', label: 'El pH 7.0 corresponde al punto neutro' }
    ],
    correctOptionIds: ['a', 'b', 'd'],
    explanation: 'Los productos alcalinos abren la cutícula, los ácidos la sellan y 7.0 es neutro. La coloración permanente trabaja en medio alcalino (9.0 – 10.5), nunca en 3.0.'
  },

  // MÓDULO 3
  {
    id: 'q-m3-1',
    moduleId: 'mod-3',
    type: 'multiple',
    prompt: 'En el Semáforo del Cuero Cabelludo, ¿cuáles son TODAS las alertas rojas que exigen suspender el servicio y derivar al dermatólogo?',
    options: [
      { id: 'a', label: 'Foliculitis con pus' },
      { id: 'b', label: 'Cuero cabelludo eudérmico' },
      { id: 'c', label: 'Dermatitis severa' },
      { id: 'd', label: 'Pediculosis' },
      { id: 'e', label: 'Alopecia activa' }
    ],
    correctOptionIds: ['a', 'c', 'd', 'e'],
    explanation: 'Foliculitis con pus, dermatitis severa, pediculosis y alopecia son alertas rojas clínicas. El estado eudérmico es un cuero cabelludo sano y equilibrado (luz verde).'
  },
  {
    id: 'q-m3-2',
    moduleId: 'mod-3',
    type: 'single',
    prompt: 'En la prueba del vaso para medir porosidad, si el cabello se hunde rápidamente hasta el fondo, indica:',
    options: [
      { id: 'a', label: 'Porosidad baja (cutícula muy cerrada)' },
      { id: 'b', label: 'Porosidad media (equilibrada)' },
      { id: 'c', label: 'Porosidad alta (cutícula abierta o dañada)' },
      { id: 'd', label: 'Alta densidad folicular' }
    ],
    correctOptionIds: ['c'],
    explanation: 'Un cabello con porosidad alta absorbe agua de inmediato debido a su cutícula abierta o dañada, por lo que se hunde rápidamente.'
  },
  {
    id: 'q-m3-3',
    moduleId: 'mod-3',
    type: 'single',
    prompt: '¿Qué tipo de cabello corresponde al patrón Afro / muy rizado con encogimiento máximo (4A–4C)?',
    options: [
      { id: 'a', label: 'Tipo 1' },
      { id: 'b', label: 'Tipo 2' },
      { id: 'c', label: 'Tipo 3' },
      { id: 'd', label: 'Tipo 4' }
    ],
    correctOptionIds: ['d'],
    explanation: 'La clasificación capilar divide el cabello en Tipo 1 (Liso), Tipo 2 (Ondulado), Tipo 3 (Rizado) y Tipo 4 (Afro: 4A, 4B, 4C).'
  },

  // MÓDULO 4
  {
    id: 'q-m4-1',
    moduleId: 'mod-4',
    type: 'single',
    prompt: 'En antropometría facial, ¿cuál es el punto crítico ubicado exactamente en el nacimiento frontal del cabello?',
    options: [
      { id: 'a', label: 'Glabela' },
      { id: 'b', label: 'Triquion' },
      { id: 'c', label: 'Subnasal' },
      { id: 'd', label: 'Mentoniano' }
    ],
    correctOptionIds: ['b'],
    explanation: 'El Triquion marca el nacimiento frontal del cabello (inicio del tercio superior), la Glabela el entrecejo, Subnasal la base de la nariz y Mentoniano la base del mentón.'
  },
  {
    id: 'q-m4-2',
    moduleId: 'mod-4',
    type: 'multiple',
    prompt: 'Según los principios de Claude Juillard en Visagismo, selecciona TODOS los enfoques que integran su metodología:',
    options: [
      { id: 'a', label: 'Enfoque analítico' },
      { id: 'b', label: 'Enfoque individual' },
      { id: 'c', label: 'Enfoque geométrico' },
      { id: 'd', label: 'Enfoque multidisciplinar' },
      { id: 'e', label: 'Enfoque estandarizado único' }
    ],
    correctOptionIds: ['a', 'b', 'c', 'd'],
    explanation: 'El visagismo profesional se fundamenta en un enfoque analítico, individual, geométrico y multidisciplinar adaptado a cada persona.'
  },
  {
    id: 'q-m4-3',
    moduleId: 'mod-4',
    type: 'single',
    prompt: '¿Qué estaciones de colorimetría facial pertenecen a los subtonos de piel cálidos?',
    options: [
      { id: 'a', label: 'Invierno y Verano' },
      { id: 'b', label: 'Otoño y Primavera' },
      { id: 'c', label: 'Invierno y Otoño' },
      { id: 'd', label: 'Verano y Primavera' }
    ],
    correctOptionIds: ['b'],
    explanation: 'Otoño y Primavera corresponden a subtonos cálidos (dorados/durazno), mientras que Invierno y Verano pertenecen a subtonos fríos.'
  },

  // MÓDULO 5
  {
    id: 'q-m5-1',
    moduleId: 'mod-5',
    type: 'single',
    prompt: '¿Cuál es el tiempo estándar profesional recomendado para ejecutar un Corte Fade (Degradado)?',
    options: [
      { id: 'a', label: '15 minutos' },
      { id: 'b', label: '25 minutos' },
      { id: 'c', label: '45 minutos' },
      { id: 'd', label: '90 minutos' }
    ],
    correctOptionIds: ['c'],
    explanation: 'El tiempo estándar para un Corte Fade es de 45 minutos (30 min para Diseño de Barba, 25 min para Cubrimiento de Canas y 60–90 min para Color Fantasía).'
  },
  {
    id: 'q-m5-2',
    moduleId: 'mod-5',
    type: 'multiple',
    prompt: 'Selecciona TODOS los pasos obligatorios del protocolo de bioseguridad y mantenimiento en barbería:',
    options: [
      { id: 'a', label: 'Limpieza y lubricación diaria de máquinas' },
      { id: 'b', label: 'Esterilización con germicidas y rayos UV' },
      { id: 'c', label: 'Reutilizar la misma hojilla si el cliente anterior estaba sano' },
      { id: 'd', label: 'Uso estricto de hojillas desechables nuevas por cada cliente' }
    ],
    correctOptionIds: ['a', 'b', 'd'],
    explanation: 'Nunca se debe reutilizar una hojilla desechable. Es obligatorio usar una hojilla nueva por cliente, limpiar/lubricar máquinas diariamente y esterilizar con germicidas y rayos UV.'
  },
  {
    id: 'q-m5-3',
    moduleId: 'mod-5',
    type: 'single',
    prompt: '¿A cuántos milímetros de longitud equivale el peine guía #2 de la máquina (Clipper)?',
    options: [
      { id: 'a', label: '1.5 mm' },
      { id: 'b', label: '3 mm' },
      { id: 'c', label: '6 mm' },
      { id: 'd', label: '10 mm' }
    ],
    correctOptionIds: ['c'],
    explanation: 'El peine #0.5 equivale a 1.5 mm, el #1 a 3 mm, el #1.5 a 4.5 mm, el #2 a 6 mm, el #3 a 10 mm y el #4 a 13 mm.'
  },

  // MÓDULO 6
  {
    id: 'q-m6-1',
    moduleId: 'mod-6',
    type: 'single',
    prompt: 'Para la fotografía del "Después" en el portafolio digital, ¿qué tipo de iluminación y pose se recomienda?',
    options: [
      { id: 'a', label: 'Contraluz fuerte y modelo mirando al suelo' },
      { id: 'b', label: 'Iluminación frontal sin sombras, hombros ligeramente inclinados y barbilla hacia el hombro' },
      { id: 'c', label: 'Luz cenital amarilla y fondo con herramientas desordenadas' },
      { id: 'd', label: 'Flash directo en habitación oscura' }
    ],
    correctOptionIds: ['b'],
    explanation: 'La iluminación frontal sin sombras revela el degradado y el color real; la pose con hombros ligeramente inclinados y barbilla hacia el hombro estiliza el perfil.'
  },
  {
    id: 'q-m6-2',
    moduleId: 'mod-6',
    type: 'multiple',
    prompt: 'Marca TODOS los elementos clave de una estrategia efectiva de publicación para el portafolio:',
    options: [
      { id: 'a', label: 'Carrusel o foto estrella de alta calidad' },
      { id: 'b', label: 'Descripción técnica del procedimiento realizado' },
      { id: 'c', label: 'Llamado a la Acción (CTA) claro para atraer clientes' },
      { id: 'd', label: 'Omitir la foto del "Antes" para no mostrar el proceso' }
    ],
    correctOptionIds: ['a', 'b', 'c'],
    explanation: 'Un portafolio profesional combina foto estrella/carrusel (incluyendo Antes y Después), descripción técnica del servicio y un CTA claro.'
  },

  // EXAMEN FINAL INTEGRAL (mix de los 6 módulos)
  {
    id: 'q-fin-1',
    moduleId: 'final',
    type: 'single',
    prompt: 'Un cliente llega con cabello rubio decolorado (altura 8) y reflejo naranja-amarillo intenso. ¿Qué matizante neutraliza mejor ese fondo?',
    options: [
      { id: 'a', label: 'Rojo intenso' },
      { id: 'b', label: 'Violeta-Azul' },
      { id: 'c', label: 'Verde puro' },
      { id: 'd', label: 'Dorado cálido' }
    ],
    correctOptionIds: ['b'],
    explanation: 'Para neutralizar naranja-amarillo (altura 8) se combina azul (opuesto al naranja) y violeta (opuesto al amarillo).'
  },
  {
    id: 'q-fin-2',
    moduleId: 'final',
    type: 'single',
    prompt: '¿Cuál es el pH aproximado de una mezcla de decoloración capilar activa?',
    options: [
      { id: 'a', label: '4.5 – 5.5' },
      { id: 'b', label: '7.0' },
      { id: 'c', label: '10.5 – 12.0' },
      { id: 'd', label: '2.5 – 3.5' }
    ],
    correctOptionIds: ['c'],
    explanation: 'La decoloración requiere alta alcalinidad (pH 10.5 – 12.0) para dilatar la cutícula y oxidar la melanina.'
  },
  {
    id: 'q-fin-3',
    moduleId: 'final',
    type: 'multiple',
    prompt: 'Antes de realizar un servicio químico en cabello con porosidad alta y elasticidad comprometida, ¿qué acciones son OBLIGATORIAS?',
    options: [
      { id: 'a', label: 'Aplicar tratamiento de rescate / reconstrucción capilar' },
      { id: 'b', label: 'Firmar el consentimiento informado con el cliente' },
      { id: 'c', label: 'Decolorar inmediatamente a 40 volúmenes para acelerar el proceso' },
      { id: 'd', label: 'Evaluar si es necesario posponer el servicio químico' }
    ],
    correctOptionIds: ['a', 'b', 'd'],
    explanation: 'Ante porosidad alta y baja elasticidad, se debe reconstruir la fibra, firmar el consentimiento informado y, si la hebra está muy dañada, posponer el proceso químico.'
  },
  {
    id: 'q-fin-4',
    moduleId: 'final',
    type: 'single',
    prompt: 'En la División de Los Tres Tercios del rostro, ¿a qué zona corresponde el tercio medio (de la Glabela al punto Subnasal)?',
    options: [
      { id: 'a', label: 'Zona Intelectual' },
      { id: 'b', label: 'Zona Emocional' },
      { id: 'c', label: 'Zona Sensitiva' },
      { id: 'd', label: 'Zona Craneal' }
    ],
    correctOptionIds: ['b'],
    explanation: 'El tercio superior es la Zona Intelectual, el tercio medio (ojos/nariz) es la Zona Emocional y el tercio inferior (boca/mentón) es la Zona Sensitiva.'
  },
  {
    id: 'q-fin-5',
    moduleId: 'final',
    type: 'multiple',
    prompt: 'En el ritual de afeitado clásico de barbería, selecciona TODOS los elementos que forman parte del procedimiento correcto:',
    options: [
      { id: 'a', label: 'Toalla caliente para ablandar el vello y abrir poros' },
      { id: 'b', label: 'Aceite pre-afeitado para proteger la piel' },
      { id: 'c', label: 'Técnica de navaja a un pase con hojilla desechable nueva' },
      { id: 'd', label: 'Pasar la navaja en seco sin lubricación' }
    ],
    correctOptionIds: ['a', 'b', 'c'],
    explanation: 'El ritual clásico incluye toalla caliente, aceite pre-afeitado y técnica de navaja a un pase con hojilla nueva por cliente.'
  },
  {
    id: 'q-fin-6',
    moduleId: 'final',
    type: 'single',
    prompt: '¿Qué tiempo estándar debes agendar para un servicio de Diseño de Barba profesional?',
    options: [
      { id: 'a', label: '10 minutos' },
      { id: 'b', label: '30 minutos' },
      { id: 'c', label: '60 minutos' },
      { id: 'd', label: '90 minutos' }
    ],
    correctOptionIds: ['b'],
    explanation: 'El tiempo estándar para un Diseño de Barba completo con ritual es de 30 minutos.'
  }
];
