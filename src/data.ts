import { Company, Sector } from './types';

export const SECTORS: Sector[] = [
  {
    id: 'materiales',
    name: 'Metales & Materiales',
    color: '#38bdf8', // Light sky blue
    glowColor: 'rgba(56, 189, 248, 0.4)',
    description: 'Proveedores clave de metales exóticos, titanio y componentes de alta temperatura para Starship y Raptor.',
    iconName: 'Anvil'
  },
  {
    id: 'semiconductores',
    name: 'Semiconductores & RF',
    color: '#a855f7', // Purple
    glowColor: 'rgba(168, 85, 247, 0.4)',
    description: 'Chips de radiofrecuencia (RF), gestión de potencia y componentes seguros para terminales Starlink.',
    iconName: 'Cpu'
  },
  {
    id: 'infraestructura',
    name: 'Cinfraestructura Espacial',
    color: '#10b981', // Emerald green
    glowColor: 'rgba(16, 185, 129, 0.4)',
    description: 'Nicho espacial con mayor elasticidad temática, servicios lunares e imágenes satelitales.',
    iconName: 'Orbit'
  },
  {
    id: 'energia',
    name: 'Energía & Data Centers',
    color: '#eab308', // Amber yellow
    glowColor: 'rgba(234, 179, 8, 0.4)',
    description: 'Alimentación nuclear, renovable y de gas para la gigantesca infraestructura de entrenamiento de IA de SpaceX.',
    iconName: 'Zap'
  },
  {
    id: 'comunicaciones',
    name: 'Espectro & Comunicaciones',
    color: '#f97316', // Orange
    glowColor: 'rgba(249, 115, 22, 0.4)',
    description: 'Socios estratégicos de espectro inalámbrico y los principales accionistas históricos de SpaceX.',
    iconName: 'Wifi'
  },
  {
    id: 'minerales',
    name: 'Minerales Críticos',
    color: '#f43f5e', // Rose red
    glowColor: 'rgba(244, 63, 94, 0.4)',
    description: 'Proveedores clave de tierras raras, titanio ultra-puro, niobio, zirconio y escanio.',
    iconName: 'Pickaxe'
  },
  {
    id: 'inversores',
    name: 'Exposición Indirecta',
    color: '#6b7280', // Slate gray
    glowColor: 'rgba(107, 114, 128, 0.4)',
    description: 'Fondos de inversión cotizados y vehículos financieros con exposición directa pre-IPO a SpaceX.',
    iconName: 'TrendingUp'
  }
];

export const COMPANIES: Company[] = [
  // 1. Materiales Avanzados
  {
    id: 'mtrn',
    name: 'Materion Corp',
    ticker: 'MTRN',
    category: 'materiales',
    priority: 'Alta',
    marketCap: '$4.6B',
    growthYtd: '+72%',
    growth12m: '+180%',
    role: 'Suministrador exclusivo de niobio metálico',
    description: 'Empresa especializada en metales avanzados de alto rendimiento. Suministra niobio metálico de grado aeroespacial a SpaceX, esencial para las toberas y componentes de los motores Raptor de Starship que deben soportar temperaturas extremas.',
    risks: 'Dependencia del suministro de materia prima bruta y costes energéticos elevados de refinación.'
  },
  {
    id: 'crs',
    name: 'Carpenter Technology',
    ticker: 'CRS',
    category: 'materiales',
    priority: 'Alta',
    marketCap: '$5.2B',
    growthYtd: '+36%',
    growth12m: '+93%',
    role: 'Aleaciones magnéticas y estructurales',
    description: 'Socio de confianza para el desarrollo de metales especiales de alta fidelidad desde los tiempos de la era Apollo. Suben de valor a la par del incremento en la cuota de producción y lanzamientos de cohetes Starship por su enorme requerimiento de materiales súper-aleados.',
    risks: 'Limitaciones en la capacidad instalada frente a un incremento acelerado de pedidos.'
  },
  {
    id: 'hwm',
    name: 'Howmet Aerospace',
    ticker: 'HWM',
    category: 'materiales',
    priority: 'Alta',
    marketCap: '$35.0B',
    growthYtd: '+45%',
    growth12m: '+78%',
    role: 'Componentes de titanio forjado y aleaciones complejas',
    description: 'Gigante de capitalización robusta que ofrece un perfil de riesgo-retorno más defensivo en el ecosistema. Fabrica piezas estructurales forjadas de alta complejidad para la armada de propulsores Super Heavy y naves espaciales de SpaceX.',
    risks: 'Exposición mayoritaria a la aviación comercial general, que puede sufrir ciclos de desaceleración.'
  },
  // 2. Semiconductores
  {
    id: 'stm',
    name: 'STMicroelectronics',
    ticker: 'STM',
    category: 'semiconductores',
    priority: 'Alta',
    marketCap: '$33.1B',
    growthYtd: '+147%',
    growth12m: '+210%',
    role: 'Chips RF y microcontroladores Starlink',
    description: 'Proveedor tecnológico clave por más de 10 años, suministrando los componentes de silicio esenciales para las terminales de internet satelital de Starlink. Ha despachado cerca de 5,000 millones de chips y prevé duplicar esta cifra hacia el 2027 a medida que la terminal gane tracción global.',
    risks: 'Margen de ganancias expuesto a la negociación agresiva de costes por volumen de SpaceX.'
  },
  {
    id: 'ftc',
    name: 'Filtronic',
    ticker: 'FTC',
    category: 'semiconductores',
    priority: 'Especulativa',
    marketCap: '£300M',
    growthYtd: '+185%',
    growth12m: '+320%',
    role: 'Componentes de radiofrecuencia y microondas',
    description: 'Considerada una \'joya oculta\' de pequeña capitalización británica en el sector. Mantiene una relación histórica con SpaceX para el suministro de tecnología de hardware de radiofrecuencia avanzado de muy alta frecuencia, optimizando las subidas y bajadas de datos de los satélites Starlink.',
    risks: 'Muy alta volatilidad debido a su baja capitalización y dependencia significativa de contratos específicos.'
  },
  // 3. Infraestructura Espacial
  {
    id: 'rklb',
    name: 'Rocket Lab',
    ticker: 'RKLB',
    category: 'infraestructura',
    priority: 'Media',
    marketCap: '$14.2B',
    growthYtd: '+98%',
    growth12m: '+240%',
    role: 'Lanzador alternativo y fabricante de componentes satelitales',
    description: 'La segunda fuerza espacial más confiable del planeta. Aunque compite parcialmente con Falcon 9, se beneficia de la expansión monumental del mercado espacial. Fabrica paneles solares espaciales y subsistemas de satélite de los cuales SpaceX es cliente indirecto.',
    risks: 'Gasto de capital (capex) muy elevado para el desarrollo del cohete reutilizable Neutrón.'
  },
  {
    id: 'rdw',
    name: 'Redwire Space',
    ticker: 'RDW',
    category: 'infraestructura',
    priority: 'Especulativa',
    marketCap: '$980M',
    growthYtd: '+120%',
    growth12m: '+290%',
    role: 'Infraestructura orbital y manufactura espacial',
    description: 'Líder en tecnología de energía solar desplegable y manufactura en órbita. Diseña y fabrica componentes clave que permiten operaciones espaciales prolongadas para misiones comerciales y gubernamentales aliadas de SpaceX.',
    risks: 'Historial de flujo de caja libre negativo y retrasos ocasionales en la adjudicación de contratos del sector público.'
  },
  {
    id: 'lunr',
    name: 'Intuitive Machines',
    ticker: 'LUNR',
    category: 'infraestructura',
    priority: 'Media',
    marketCap: '$1.4B',
    growthYtd: '+110%',
    growth12m: '+340%',
    role: 'Misiones robóticas lunares',
    description: 'Directamente vinculada con los lanzamientos de SpaceX, ya que sus módulos lunares (Nova-C) se envían al espacio exclusivamente mediante cohetes Falcon 9. Es beneficiaria del programa Artemis de la NASA junto con el sistema Starship HLS.',
    risks: 'Éxito técnico binario (altísimo riesgo de falla en los aterrizajes lunares robóticos).'
  },
  {
    id: 'pl',
    name: 'Planet Labs',
    ticker: 'PL',
    category: 'infraestructura',
    priority: 'Media',
    marketCap: '$840M',
    growthYtd: '+12%',
    growth12m: '+25%',
    role: 'Imágenes geoespaciales y datos de la Tierra',
    description: 'Posee la flota de satélites de observación de la Tierra más grande del mundo. Utiliza los lanzamientos compartidos de SpaceX (rideshare) para desplegar sus satélites, integrando luego sus datos geoespaciales en proyectos conjuntos.',
    risks: 'Monetización lenta de su biblioteca de imágenes de IA y competencia de satélites gubernamentales.'
  },
  // 4. Energía
  {
    id: 'vst',
    name: 'Vistra Energy',
    ticker: 'VST',
    category: 'energia',
    priority: 'Media',
    marketCap: '$38.2B',
    growthYtd: '+115%',
    growth12m: '+220%',
    role: 'Energía nuclear y de gas para supercomputación de IA',
    description: 'Productor independiente de energía con un enfoque creciente en tecnología libre de emisiones. SpaceX requiere una potencia descomunal en sus centros de proceso de datos terrestres para modelar el comportamiento dinámico de los cohetes y procesar las flotas de satélites mediante Inteligencia Artificial.',
    risks: 'Regulaciones estrictas sobre emisiones estatales y volatilidad en los precios de los commodities de combustibles.'
  },
  {
    id: 'nee',
    name: 'NextEra Energy',
    ticker: 'NEE',
    category: 'energia',
    priority: 'Media',
    marketCap: '$145.0B',
    growthYtd: '+14%',
    growth12m: '+32%',
    role: 'Energía limpia y renovable a gran escala',
    description: 'El mayor generador mundial de energía eólica y solar. Ha entablado conversaciones para suministrar energía 100% verde a los complejos de lanzamiento y centros de datos de SpaceX en Texas y Florida.',
    risks: 'Sensible a las tasas de interés globales para el financiamiento de sus plantas de gran tamaño.'
  },
  {
    id: 'ceg',
    name: 'Constellation Energy',
    ticker: 'CEG',
    category: 'energia',
    priority: 'Alta',
    marketCap: '$67.5B',
    growthYtd: '+89%',
    growth12m: '+165%',
    role: 'Energía nuclear segura de carga base',
    description: 'El mayor operador de plantas nucleares de EE.UU. Es el candidato más fuerte para implementar fuentes de energía limpia de carga base continua (24/7) para soportar las masivas instalaciones de Inteligencia Artificial que SpaceX entrena comercialmente en tierra.',
    risks: 'Altos costos operativos y riguroso control regulatorio federal de seguridad nuclear.'
  },
  // 5. Comunicaciones y Espectro
  {
    id: 'sats',
    name: 'EchoStar Corp',
    ticker: 'SATS',
    category: 'comunicaciones',
    priority: 'Alta',
    marketCap: '$6.5B',
    growthYtd: '+210%',
    growth12m: '+410%',
    role: 'Venta de licencias de espectro clave',
    description: 'Socio de alto nivel. SpaceX compró licencias de espectro inalámbrico a EchoStar por valor de ~$17,000 millones de dólares (pagadero en efectivo y participación accionaria en SpaceX), convirtiendo a EchoStar en uno de los mayores tenedores externos de acciones privadas de SpaceX de cara a su OPI.',
    risks: 'Deuda corporativa muy elevada y ejecución desafiante de su red inalámbrica minorista.'
  },
  {
    id: 'goog',
    name: 'Alphabet (Google)',
    ticker: 'GOOGL',
    category: 'comunicaciones',
    priority: 'Alta',
    marketCap: '$2.1T',
    growthYtd: '+28%',
    growth12m: '+40%',
    role: 'Inversionista histórico estratégico de SpaceX',
    description: 'Invirtió $900 millones de dólares en SpaceX en 2015 para financiar la expansión inicial de Starlink, obteniendo una participación del 6-7%. Esta inversión inicial se ha multiplicado exponencialmente tras la valorización de SpaceX a ~$1.77 billones de dólares.',
    risks: 'Riesgos globales de monopolio y escrutinio continuo sobre sus motores de búsqueda y herramientas de IA.',
    originalShareholder: true
  },
  // 6. Minerales Críticos
  {
    id: 'ipx',
    name: 'IperionX',
    ticker: 'IPX',
    category: 'minerales',
    priority: 'Media',
    marketCap: '$420M',
    growthYtd: '+95%',
    growth12m: '+210%',
    role: 'Fabricante doméstico de titanio circular sostenible',
    description: 'Mantiene una patente única para procesar titanio de manera limpia, barata y circular en EE.UU. Su proyecto de minerales críticos en Tennessee es vital para garantizar el suministro de titanio, tierras raras y zirconio de origen doméstico para la industria espacial sin depender de China o Rusia.',
    risks: 'Fase de comercialización temprana; requiere validar su escalabilidad industrial este año.'
  },
  {
    id: 'nb',
    name: 'NioCorp Developments',
    ticker: 'NB',
    category: 'minerales',
    priority: 'Especulativa',
    marketCap: '$170M',
    growthYtd: '+18%',
    growth12m: '+45%',
    role: 'Depósito masivo de niobio, escanio y titanio',
    description: 'Desarrollador del masivo proyecto Elk Creek en Nebraska, el depósito de niobio, titanio y escanio de mayor ley en América del Norte. El niobio y el escanio son considerados materias primas geoestratégicas ultra-críticas para aleaciones de supercomputadoras y motores espaciales Raptor.',
    risks: 'Nivel alto de riesgo de financiamiento pendiente para la construcción completa de su mina subterránea.'
  },
  // 7. Inversores Indirectos
  {
    id: 'arkvx',
    name: 'ARK Venture Fund',
    ticker: 'ARKVX',
    category: 'inversores',
    priority: 'Especulativa',
    marketCap: 'Fondo Abierto',
    growthYtd: '+32%',
    growth12m: '+54%',
    role: 'Acceso minorista a SpaceX pre-OPI',
    description: 'Vehículo administrado por Cathie Wood que ofrece a inversores individuales acceso regulado a empresas de tecnología privadas de alto calibre, manteniendo una participación de alta ponderación en SpaceX desde antes del debut oficial en bolsa.',
    risks: 'Tasas de administración altas y extrema sensibilidad a las oscilaciones de las narrativas de tecnologías de frontera.'
  },
  {
    id: 'dxyz',
    name: 'Destiny Tech100',
    ticker: 'DXYZ',
    category: 'inversores',
    priority: 'Especulativa',
    marketCap: '$380M',
    growthYtd: '+310%',
    growth12m: '+620%',
    role: 'Fondo cerrado que cotiza en bolsa',
    description: 'Fondo público que invierte en una cartera de 100 de las mejores corporaciones tecnológicas privadas del mundo. SpaceX es su mayor tenencia individual, representando más de un tercio del valor neto de sus activos, lo que la convierte en un proxy de trading muy volátil.',
    risks: 'Cotiza con una prima drástica sobre el valor intrínseco de sus activos netos subyacentes.'
  }
];

export interface SupplierRelation {
  fromId: string;
  toId: string;
  type: string;
  description: string;
}

export const SUPPLIER_RELATIONS: SupplierRelation[] = [
  { fromId: 'nb', toId: 'mtrn', type: 'Suministro', description: 'NioCorp suministra niobio crudo a Materion para refinación de súper-aleaciones' },
  { fromId: 'ipx', toId: 'hwm', type: 'Suministro', description: 'IperionX procesa titanio circular purificado doméstico para las forjas de Howmet' },
  { fromId: 'stm', toId: 'sats', type: 'Tecnológico', description: 'STMicroelectronics produce los componentes de transceptores integrados de EchoStar' },
  { fromId: 'ftc', toId: 'rklb', type: 'Tecnológico', description: 'Filtronic fabrica módulos de radiofrecuencia de alta frecuencia para los satélites de Rocket Lab' },
  { fromId: 'ceg', toId: 'vst', type: 'Red Eléctrica', description: 'Constellation provee respaldo de energía limpia de carga base continua a las redes de Vistra' },
  { fromId: 'nee', toId: 'vst', type: 'Red Eléctrica', description: 'NextEra y Vistra co-desarrollan almacenamiento masivo de baterías e infraestructura solar' },
  { fromId: 'hwm', toId: 'rklb', type: 'Infraestructura', description: 'Howmet moldea carcasas térmicas y de titanio forjado ligero para los cohetes de Rocket Lab' },
  { fromId: 'rdw', toId: 'lunr', type: 'Infraestructura', description: 'Redwire suministra arreglos solares ROC desplegables ultraligeros para Intuitive Machines' },
  { fromId: 'pl', toId: 'goog', type: 'Datos', description: 'Planet Labs procesa flotas de telemetría e imágenes satelitales en Google Cloud' }
];

export const SPACEX_STATS = {
  valuation: '$1.77T',
  ipoRevenue: '$75.0B',
  tam: '$28.5T',
  launchDate: '12 de Junio de 2026',
  listing: 'Nasdaq (SPCX)',
  headline: 'La mayor Oferta Pública de Venta de la historia superando a Saudi Aramco.'
};
