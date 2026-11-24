import { ModuleContent } from '../types';

export const MODULES_DATA: ModuleContent[] = [
  {
    id: 'mod-1',
    number: 1,
    title: 'Teoría del Color y Colorimetría Capilar',
    subtitle: 'Círculo cromático, temperatura, armonías y alturas de tono natural',
    duration: '35 min',
    imageUrl: '/images/mod1-colorimetry.svg',
    imageCaption: 'Referencia de Atelier: Muestrario de reflejos (rubios, cobrizos, rojos y castaños) junto a bol y brocha de coloración.',
    objectives: [
      'Dominar la estructura del círculo cromático (primarios, secundarios y terciarios).',
      'Diferenciar temperatura y psicología del color (cálidos, fríos y neutros).',
      'Aplicar armonías cromáticas y la Regla 60-30-10 en diseños capilares.',
      'Identificar las alturas de tono del 1 al 10 y los tipos de melanina capilar.'
    ],
    cards: [
      {
        title: 'El Círculo Cromático',
        badge: 'Fundamento',
        summary: 'Herramienta base para predecir mezclas, neutralizaciones y creación de reflejos en el salón.',
        points: [
          {
            label: 'Colores Primarios',
            detail: 'Amarillo, Azul y Rojo. Son colores puros que no se obtienen mezclando otros pigmentos.',
            highlight: 'gold'
          },
          {
            label: 'Colores Secundarios',
            detail: 'Naranja (Amarillo + Rojo), Verde (Amarillo + Azul) y Violeta (Azul + Rojo).',
            highlight: 'sky'
          },
          {
            label: 'Colores Terciarios',
            detail: 'Surgen al mezclar un primario con un secundario adyacente (ej. Amarillo-Naranja, Azul-Verde, Rojo-Violeta).',
            highlight: 'amber'
          }
        ]
      },
      {
        title: 'Temperatura y Psicología del Color',
        badge: 'Percepción',
        summary: 'La temperatura cromática define la sensación visual y emocional del diseño de color.',
        points: [
          {
            label: 'Colores Cálidos',
            detail: 'Rojos, naranjas y amarillos. Transmiten energía, calidez, cercanía, vitalidad y pasión.',
            highlight: 'amber'
          },
          {
            label: 'Colores Fríos',
            detail: 'Azules, verdes y violetas. Transmiten calma, frescura, serenidad, elegancia y profundidad.',
            highlight: 'sky'
          },
          {
            label: 'Colores Neutros',
            detail: 'Negros, blancos, grises y cafés equilibrados. Aportan sobriedad, balance y transición natural.',
            highlight: 'emerald'
          }
        ]
      },
      {
        title: 'Armonías Cromáticas y Regla 60-30-10',
        badge: 'Composición',
        summary: 'Combinaciones estratégicas para lograr resultados armónicos o neutralizaciones exactas.',
        points: [
          {
            label: 'Complementaria',
            detail: 'Colores opuestos en el círculo (ej. Amarillo vs. Violeta). En colorimetría capilar se usan para neutralizar reflejos indeseados.',
            highlight: 'gold'
          },
          {
            label: 'Análoga y Monocromática',
            detail: 'Análoga: tonos vecinos (ej. dorado y cobrizo). Monocromática: un solo tono en distintas luminosidades.',
            highlight: 'sky'
          },
          {
            label: 'Triádica, Tetrádica y Multicromática',
            detail: 'Triádica: triángulo equilátero (3 tonos). Tetrádica: rectángulo (4 tonos). Multicromática: fusión creativa de múltiples matices.',
            highlight: 'amber'
          },
          {
            label: 'Regla 60-30-10',
            detail: '60% color dominante (base), 30% color secundario (transición/medios) y 10% color de acento (mechas o detalles focales).',
            highlight: 'emerald'
          }
        ]
      },
      {
        title: 'Melanina y Alturas de Tono',
        badge: 'Biología del Color',
        summary: 'El color natural del cabello depende de la proporción y distribución de tres pigmentos melánicos.',
        points: [
          {
            label: 'Eumelanina',
            detail: 'Pigmento granuloso oscuro responsable de los tonos negros, castaños y marrones profundos.',
            highlight: 'gold'
          },
          {
            label: 'Feomelanina',
            detail: 'Pigmento difuso claro responsable de los tonos rubios, dorados y cobrizos suaves.',
            highlight: 'amber'
          },
          {
            label: 'Tricosiderina',
            detail: 'Variante rica en hierro presente en cabellos pelirrojos naturales intensos.',
            highlight: 'rose'
          }
        ]
      }
    ],
    tableTitle: 'Tabla Técnica: Alturas de Tono Natural (1 al 10) y Fondo de Aclaración',
    tableHeaders: ['Altura', 'Tono Natural', 'Fondo de Aclaración', 'Matiz Neutralizante'],
    tableRows: [
      ['1', 'Negro', 'Rojo profundo', 'Verde intenso'],
      ['2', 'Moreno', 'Rojo', 'Verde'],
      ['3', 'Castaño Oscuro', 'Rojo', 'Verde'],
      ['4', 'Castaño', 'Rojo-Naranja', 'Azul-Verde'],
      ['5', 'Castaño Claro', 'Rojo-Naranja', 'Azul-Verde'],
      ['6', 'Rubio Oscuro', 'Naranja', 'Azul'],
      ['7', 'Rubio', 'Naranja-Amarillo', 'Azul-Violeta'],
      ['8', 'Rubio Claro', 'Amarillo-Naranja', 'Violeta-Azul'],
      ['9', 'Rubio Muy Claro', 'Amarillo', 'Violeta'],
      ['10', 'Rubio Platino', 'Amarillo pálido', 'Violeta suave']
    ]
  },
  {
    id: 'mod-2',
    number: 2,
    title: 'Química Capilar y El pH',
    subtitle: 'Escala de pH, manto ácido, estructura de la cutícula y control químico',
    duration: '30 min',
    imageUrl: '/images/mod2-chemistry.svg',
    imageCaption: 'Referencia de Laboratorio: Fibra capilar sellada con brillo especular y sérum acidificante en rango fisiológico (pH 4.5–5.5).',
    objectives: [
      'Comprender la escala de pH de 0 a 14 y su impacto directo en la fibra capilar.',
      'Identificar el rango fisiológico saludable del manto ácido (4.5 - 5.5).',
      'Visualizar el comportamiento de la cutícula ante productos ácidos y alcalinos.',
      'Ejecutar correctamente el viaje del pH durante coloración, decoloración y sellado.'
    ],
    cards: [
      {
        title: 'Escala de pH (0 a 14)',
        badge: 'Química Base',
        summary: 'Mide el potencial de hidrógeno (acidez o alcalinidad) de una solución acuosa.',
        points: [
          {
            label: 'Zona Ácida (0.0 – 6.9)',
            detail: 'Contrae y sella las escamas de la cutícula, aporta brillo y retiene pigmentos y humedad.',
            highlight: 'emerald'
          },
          {
            label: 'Zona Neutra (7.0)',
            detail: 'Equilibrio químico puro (agua destilada). No altera significativamente la carga cuticular.',
            highlight: 'sky'
          },
          {
            label: 'Zona Alcalina (7.1 – 14.0)',
            detail: 'Hincha la fibra y abre la cutícula para permitir el ingreso de tintes o agentes decolorantes.',
            highlight: 'rose'
          }
        ]
      },
      {
        title: 'El Manto Ácido y la Cutícula',
        badge: 'Fisiología',
        summary: 'El cabello y el cuero cabelludo sanos mantienen una barrera protectora ligeramente ácida.',
        points: [
          {
            label: 'Rango Fisiológico Saludable (4.5 – 5.5)',
            detail: 'En este rango las escamas cuticulares permanecen compactas, suaves y alineadas, protegiendo el córtex.',
            highlight: 'emerald'
          },
          {
            label: 'Cutícula Cerrada vs. Abierta',
            detail: 'Una cutícula cerrada refleja la luz (brillo) y evita la pérdida de agua. Una cutícula abierta por exceso alcalino se vuelve áspera, porosa y frágil.',
            highlight: 'gold'
          }
        ]
      },
      {
        title: 'El Viaje del pH en el Salón',
        badge: 'Protocolo Técnico',
        summary: 'Cada servicio químico desplaza el pH del cabello y exige un retorno controlado al estado ácido.',
        points: [
          {
            label: '1. Estado Sano Inicial (pH 5.0)',
            detail: 'Punto de partida ideal antes de realizar cualquier diagnóstico o proceso técnico.',
            highlight: 'emerald'
          },
          {
            label: '2. Coloración Permanente (pH 9.0 – 10.5)',
            detail: 'Alcalinidad moderada-alta para abrir cutícula, activar el peróxido y depositar pigmento en el córtex.',
            highlight: 'amber'
          },
          {
            label: '3. Decoloración (pH 10.5 – 12.0)',
            detail: 'Alcalinidad elevada que oxida rápidamente la melanina; requiere estricto control de tiempo y estado de la hebra.',
            highlight: 'rose'
          },
          {
            label: '4. Sellado Técnico / Acidificación Post-Color (pH 2.5 – 3.5)',
            detail: 'Neutraliza residuos alcalinos, cierra inmediatamente la cutícula y fija el color en el interior.',
            highlight: 'sky'
          }
        ]
      }
    ],
    tableTitle: 'Tabla Técnica: El Viaje del pH en Procesos de Salón',
    tableHeaders: ['Etapa / Proceso', 'Rango de pH', 'Efecto en la Cutícula', 'Acción Recomendada'],
    tableRows: [
      ['Cabello Sano Natural', '4.5 – 5.5', 'Cerrada y compacta', 'Mantenimiento suave'],
      ['Champú Neutro / Limpieza', '6.5 – 7.0', 'Ligeramente relajada', 'Preparación previa'],
      ['Coloración Permanente', '9.0 – 10.5', 'Abierta para depósito', 'Controlar tiempo de pose'],
      ['Decoloración Capilar', '10.5 – 12.0', 'Muy abierta / dilatada', 'Vigilar elasticidad cada 10 min'],
      ['Acidificación / Sellado', '2.5 – 3.5', 'Contracción y sellado total', 'Aplicar al finalizar el servicio']
    ]
  },
  {
    id: 'mod-3',
    number: 3,
    title: 'Tricología y Ficha de Diagnóstico',
    subtitle: 'Semáforo del cuero cabelludo, análisis de la hebra y clasificación capilar',
    duration: '40 min',
    imageUrl: '/images/mod3-trichology.svg',
    imageCaption: 'Referencia Clínica: Lupa diagnóstica para clasificar curvatura (Tipos 1 al 4) y semáforo del cuero cabelludo.',
    objectives: [
      'Evaluar el cuero cabelludo usando el Semáforo de Diagnóstico y detectar alertas rojas.',
      'Medir densidad, grosor, porosidad y elasticidad de la hebra capilar.',
      'Clasificar el cabello del Tipo 1A al Tipo 4C según su patrón de curvatura.',
      'Aplicar protocolos de rescate/reconstrucción y consentimiento informado.'
    ],
    cards: [
      {
        title: 'El Semáforo del Cuero Cabelludo',
        badge: 'Diagnóstico Clínico',
        summary: 'Clasificación visual y táctil para decidir si el cliente es apto para un servicio químico.',
        points: [
          {
            label: 'Luz Verde — Estados Base Aptos',
            detail: 'Eudérmico (equilibrado), Seborreico (exceso graso), Alípico (seco) y Mixto. Requieren adaptación de lavado pero permiten trabajar.',
            highlight: 'emerald'
          },
          {
            label: 'Luz Amarilla — Precaución (Pitiriasis)',
            detail: 'Pitiriasis simple (descamación seca) o Pitiriasis esteatoide (escamas grasas adheridas). Evitar químicos irritantes directos.',
            highlight: 'amber'
          },
          {
            label: 'Luz Roja — Suspender y Derivar al Dermatólogo',
            detail: 'Foliculitis con pus, Dermatitis severa, Pediculosis (piojos/liendres) y Alopecia activa con inflamación. Prohibido aplicar químicos o cortar sin alta médica.',
            highlight: 'rose'
          }
        ]
      },
      {
        title: 'Análisis Físico de la Hebra',
        badge: 'Pruebas de Salón',
        summary: 'Cuatro parámetros determinantes para calcular tiempos de exposición y fuerza de oxidantes.',
        points: [
          {
            label: 'Densidad (Prueba del Espejo)',
            detail: 'Cantidad de folículos por cm². Se observa cuánta piel del cuero cabelludo se transparenta al separar secciones.',
            highlight: 'sky'
          },
          {
            label: 'Grosor (Fino, Medio, Grueso)',
            detail: 'Diámetro individual de la fibra. El cabello fino aclara más rápido pero es más vulnerable a la ruptura.',
            highlight: 'gold'
          },
          {
            label: 'Porosidad (Prueba del Vaso / Tacto)',
            detail: 'Capacidad de absorción: Baja (flota, cutícula muy cerrada), Media (equilibrada), Alta (se hunde rápido, cutícula dañada).',
            highlight: 'amber'
          },
          {
            label: 'Elasticidad',
            detail: 'Capacidad de estirarse en húmedo y volver sin romperse. Elasticidad nula o chiclosa prohíbe decolorar.',
            highlight: 'rose'
          }
        ]
      },
      {
        title: 'Clasificación Capilar (Tipos 1 al 4)',
        badge: 'Morfología',
        summary: 'Sistema estándar de patrones de curvatura para personalizar técnicas de corte e hidratación.',
        points: [
          {
            label: 'Tipo 1 — Liso (1A, 1B, 1C)',
            detail: '1A: muy fino y lacio. 1B: cuerpo medio. 1C: grueso y resistente, con ligera tendencia a ondular en puntas.',
            highlight: 'sky'
          },
          {
            label: 'Tipo 2 — Ondulado (2A, 2B, 2C)',
            detail: 'Forma de "S" suave (2A) hasta ondas marcadas con volumen y encrespamiento (2C).',
            highlight: 'emerald'
          },
          {
            label: 'Tipo 3 — Rizado (3A, 3B, 3C)',
            detail: 'Rizos definidos en espiral: 3A (amplios), 3B (tirabuzones medianos), 3C (rizos cerrados y densos).',
            highlight: 'gold'
          },
          {
            label: 'Tipo 4 — Afro / Muy Rizado (4A, 4B, 4C)',
            detail: '4A: espiral muy pequeña. 4B: patrón en zigzag. 4C: encogimiento máximo y extrema fragilidad mecánica.',
            highlight: 'amber'
          }
        ]
      },
      {
        title: 'Protocolo de Rescate y Consentimiento',
        badge: 'Ética Profesional',
        summary: 'Respaldo técnico y legal antes de intervenir cabellos comprometidos.',
        points: [
          {
            label: 'Tratamientos de Rescate / Reconstrucción',
            detail: 'Si hay porosidad alta o baja elasticidad, aplicar aminoácidos, queratina hidrolizada y lípidos antes de cualquier color.',
            highlight: 'emerald'
          },
          {
            label: 'Consentimiento Informado',
            detail: 'Documento firmado por el cliente donde acepta el diagnóstico real, posibles limitaciones del tono y cuidados en casa.',
            highlight: 'gold'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-4',
    number: 4,
    title: 'Visagismo Profesional y Antropometría',
    subtitle: 'Principios de Claude Juillard, proporciones faciales, morfología y colorimetría de piel',
    duration: '35 min',
    imageUrl: '/images/mod4-visagism.svg',
    imageCaption: 'Referencia de Visagismo: Espejo iluminado de salón con trazado de Los Tres Tercios y Puntos Críticos faciales.',
    objectives: [
      'Aplicar el enfoque analítico, individual, geométrico y multidisciplinar (principios de Claude Juillard).',
      'Medir el rostro con la Regla de los 5 Ojos, Los Tres Tercios y los Puntos Críticos.',
      'Clasificar las 7 formas de rostro y los 3 perfiles faciales.',
      'Determinar el subtono y la estación de color personal (Invierno, Verano, Otoño, Primavera).'
    ],
    cards: [
      {
        title: 'Fundamentos del Visagismo',
        badge: 'Metodología',
        summary: 'Basado en los principios de Claude Juillard para diseñar cortes y colores a la medida.',
        points: [
          {
            label: 'Enfoque Analítico e Individual',
            detail: 'Estudia los rasgos únicos del cliente, su personalidad y estilo de vida antes de proponer un cambio.',
            highlight: 'gold'
          },
          {
            label: 'Enfoque Geométrico y Multidisciplinar',
            detail: 'Combina líneas, volúmenes, luces y sombras para armonizar las proporciones del cráneo y el rostro.',
            highlight: 'sky'
          }
        ]
      },
      {
        title: 'Medidas Clave y Puntos Críticos',
        badge: 'Antropometría',
        summary: 'Referencias anatómicas exactas para equilibrar el diseño de corte y barba.',
        points: [
          {
            label: 'Regla de los 5 Ojos',
            detail: 'El ancho ideal del rostro a la altura de los pómulos equivale aproximadamente a cinco veces el ancho de un ojo.',
            highlight: 'sky'
          },
          {
            label: 'División de Los Tres Tercios',
            detail: 'Tercio Superior (Zona Intelectual), Tercio Medio (Zona Emocional) y Tercio Inferior (Zona Sensitiva).',
            highlight: 'emerald'
          },
          {
            label: 'Cuatro Puntos Críticos',
            detail: 'Triquion (nacimiento frontal del cabello), Glabela (entrecejo), Subnasal (base de la nariz) y Mentoniano (base del mentón).',
            highlight: 'gold'
          }
        ]
      },
      {
        title: 'Morfología y Perfilometría Facial',
        badge: 'Geometría',
        summary: 'Cada estructura ósea requiere compensar volúmenes con el cabello o la barba.',
        points: [
          {
            label: '7 Formas de Rostro',
            detail: 'Ovalado (el más equilibrado), Cuadrado, Redondo, Diamante, Corazón, Rectangular y Triangular.',
            highlight: 'gold'
          },
          {
            label: 'Perfilometría',
            detail: 'Perfil Recto (equilibrado), Cóncavo (mentón y frente prominentes) y Convexo (zona media proyectada hacia adelante).',
            highlight: 'amber'
          }
        ]
      },
      {
        title: 'Colorimetría Facial y Estaciones',
        badge: 'Armonía de Piel',
        summary: 'Selección de tonos de cabello que iluminan la piel y atenúan imperfecciones.',
        points: [
          {
            label: 'Estaciones Frías (Invierno y Verano)',
            detail: 'Subtono rosado/azulado. Invierno: alto contraste (negros, platinos, cenizos). Verano: contraste suave (rubios cenizos, perla).',
            highlight: 'sky'
          },
          {
            label: 'Estaciones Cálidas (Otoño y Primavera)',
            detail: 'Subtono dorado/durazno. Otoño: tonos profundos (cobrizos, chocolates, miel). Primavera: tonos luminosos (dorados claros, caramelo).',
            highlight: 'amber'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-5',
    number: 5,
    title: 'Maestría en Barbería y Bioseguridad',
    subtitle: 'Técnicas de fade, corte a tijera, ritual de afeitado y protocolos sanitarios',
    duration: '45 min',
    imageUrl: '/images/mod5-barbering.svg',
    imageCaption: 'Referencia de Barbería: Transición fluida de degradado (Fade), máquina profesional y navaja con hojilla desechable.',
    objectives: [
      'Ejecutar degradados fluidos sin líneas (Fade), corte a tijera y diseño artístico (Hair Tattoo).',
      'Aplicar el ritual tradicional de afeitado con toalla caliente, aceite y navaja a un pase.',
      'Cumplir rigurosamente con la limpieza, lubricación y esterilización de herramientas.',
      'Planificar la agenda usando tiempos estándar profesionales por servicio.'
    ],
    cards: [
      {
        title: 'Técnicas de Corte y Ritual',
        badge: 'Ejecución',
        summary: 'Precisión milimétrica en el uso de máquinas, tijeras y navaja libre.',
        points: [
          {
            label: 'Degradado Fluido (Fade)',
            detail: 'Transición continua sin líneas marcadas mediante juego de palanca (0.0 a 0.5) y peines guía (#0.5 al #4) con movimiento en cuchara (C-motion).',
            highlight: 'gold'
          },
          {
            label: 'Corte a Tijera y Hair Tattoo',
            detail: 'Tijera filo dulce para líneas limpias y entresacar para texturizar. Hair Tattoo: diseño geométrico con patillera y navaja.',
            highlight: 'sky'
          },
          {
            label: 'Ritual de Afeitado Clásico',
            detail: '1) Toalla caliente para abrir poros y ablandar el vello, 2) Aceite pre-afeitado protector, 3) Espuma tibia, 4) Navaja a un pase a 30° en dirección del crecimiento.',
            highlight: 'amber'
          }
        ]
      },
      {
        title: 'Mantenimiento y Bioseguridad',
        badge: 'Normativa Sanitaria',
        summary: 'La higiene clínica protege la salud del cliente y del profesional en cada servicio.',
        points: [
          {
            label: 'Limpieza y Lubricación Diaria',
            detail: 'Retirar residuos de cabello con cepillo de cerdas, desinfectar cuchillas y aplicar aceite lubricante al inicio y final de la jornada.',
            highlight: 'emerald'
          },
          {
            label: 'Esterilización Germicida y Rayos UV',
            detail: 'Inmersión de peines y tijeras en solución germicida aprobada y almacenamiento en gabinete esterilizador de rayos UV.',
            highlight: 'sky'
          },
          {
            label: 'Hojillas Desechables Obligatorias',
            detail: 'Uso estricto de una hojilla nueva por cada cliente, abriendo el empaque frente a él y descartando en guardián de residuos cortopunzantes.',
            highlight: 'rose'
          }
        ]
      }
    ],
    tableTitle: 'Tabla Técnica: Tiempos Estándar por Servicio en Barbería y Color',
    tableHeaders: ['Servicio Profesional', 'Tiempo Estándar', 'Herramientas Clave'],
    tableRows: [
      ['Corte Fade (Degradado)', '45 min', 'Máquina, peines #0.5–#4, patillera, tijera'],
      ['Diseño y Perfilado de Barba', '30 min', 'Toalla caliente, aceite, patillera, navaja desechable'],
      ['Cubrimiento de Canas', '25 min', 'Tinte tono sobre tono, brocha, oxidante bajo'],
      ['Color Fantasía / Global', '60 – 90 min', 'Decolorante, matizante, sellador ácido']
    ]
  },
  {
    id: 'mod-6',
    number: 6,
    title: 'Fotografía Profesional y Portafolio Digital',
    subtitle: 'Protocolo de captura Antes/Después, iluminación y estrategia de publicación',
    duration: '25 min',
    imageUrl: '/images/mod6-photography.svg',
    imageCaption: 'Referencia de Estudio: Aro de luz frontal sin sombras y encuadre 3/4 con barbilla hacia el hombro.',
    objectives: [
      'Capturar fotografías consistentes del "Antes" y el "Después" sin distorsiones.',
      'Configurar iluminación frontal sin sombras duras y fondos limpios.',
      'Dirigir la pose del modelo (hombros inclinados y barbilla hacia el hombro).',
      'Estructurar publicaciones con foto estrella/carrusel, ficha técnica y CTA.'
    ],
    cards: [
      {
        title: 'Protocolo de Captura Fotográfica',
        badge: 'Producción Visual',
        summary: 'Una buena técnica de corte o color necesita evidencia visual fiel para destacar en el portafolio.',
        points: [
          {
            label: 'Fotografía Clara del "Antes"',
            detail: 'Misma distancia, ángulo y luz que el resultado final para demostrar la transformación real sin trucos.',
            highlight: 'sky'
          },
          {
            label: 'Iluminación Frontal Sin Sombras',
            detail: 'Luz suave frontal (aro o panel LED a 45°-frontal) que revele la textura del fade y el brillo real del matiz sin sombras en el rostro.',
            highlight: 'gold'
          },
          {
            label: 'Fondo Limpio y Pose del Modelo',
            detail: 'Fondo neutro sin desorden visual. Pose recomendada: hombros ligeramente inclinados (3/4) y barbilla orientada hacia el hombro.',
            highlight: 'emerald'
          }
        ]
      },
      {
        title: 'Estrategia de Publicación y Conversión',
        badge: 'Portafolio Digital',
        summary: 'Transforma cada trabajo terminado en una pieza educativa que atraiga nuevos clientes.',
        points: [
          {
            label: 'Carrusel o Foto Estrella',
            detail: 'Primera imagen de alto impacto ("Después"), seguida del detalle lateral del degradado o brillo del color y el "Antes".',
            highlight: 'gold'
          },
          {
            label: 'Descripción Técnica del Procedimiento',
            detail: 'Explica el diagnóstico inicial, fórmula o peines utilizados, y el cuidado posterior recomendado para transmitir autoridad.',
            highlight: 'sky'
          },
          {
            label: 'Llamado a la Acción (CTA) Claro',
            detail: 'Cierra con una invitación directa (ej. "Agenda tu diagnóstico capilar por mensaje directo") para convertir visitas en citas.',
            highlight: 'emerald'
          }
        ]
      }
    ]
  }
];
