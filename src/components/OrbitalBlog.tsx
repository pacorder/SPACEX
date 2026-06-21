import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  category: string;
  summary: string;
  visualIcon: React.ReactNode;
  content: string[];
  companiesInvolved: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'spacex-google',
    title: 'El Nexo SpaceX-Alphabet: Más allá de la órbita de Google Cloud',
    subtitle: 'La conexión de fibra, datos orbitales y la alianza de $1,000M que impulsa la constelación Starlink.',
    author: {
      name: 'Dr. Alejandro Marín',
      role: 'Analista de Infraestructura Espacial',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120'
    },
    date: 'Junio 21, 2026',
    readTime: '6 min de lectura',
    category: 'Infraestructura de Datos',
    visualIcon: <Icons.Chrome className="w-10 h-10 text-indigo-400" />,
    summary: 'La histórica alianza multimillonaria entre SpaceX y Google no se limita al capital. Google Cloud actúa como el cerebro de ruteo terrestre para la red Starlink, aprovechando su red de fibra submarina privada para transferir terabytes de telemetría en microsegundos.',
    companiesInvolved: ['SPACEX', 'GOOG', 'GOOGL'],
    content: [
      'Cuando Alphabet lideró una ronda de inversión de $1,000 millones de dólares en SpaceX junto con Fidelity, muchos creyeron que se trataba de una mera jugada financiera pasiva. La realidad tecnológica ha demostrado ser infinitamente más profunda: Google y SpaceX han entrelazado sus sistemas neuronales a nivel de protocolo de red.',
      'Starlink opera con miles de satélites en Órbita Terrestre Baja (LEO). Sin embargo, un satélite en el espacio es inútil sin una "salida a tierra" de ultra-baja latencia. Aquí es donde entra Google Cloud. SpaceX ubica terminales satelitales (gateways) directamente dentro de las propiedades y centros de datos de Google. El tráfico de red sube del usuario a la constelación Starlink, rebota por enlaces ópticos (láser) inter-satelitales, y desciende directamente al nodo de Google más cercano sin tocar las redes públicas congestionadas de Internet.',
      'Esto habilita que servicios críticos como computación en el borde (Edge computing), bases de datos globales y telemetría avanzada corran a velocidades imperceptibles. Para el inversionista, esto convierte a Alphabet en el partner estratégico definitivo e insustituible para la masificación comercial de Starlink.',
      'Adicionalmente, SpaceX utiliza motores de inteligencia artificial entrenados con herramientas de Google para predecir anomalías atmosféricas y calcular la reorientación milimétrica de las antenas de fase de su constelación en tiempo real.'
    ]
  },
  {
    id: 'niocorp-materion',
    title: 'La Alianza del Niobio: NioCorp & Materion en la Frontera de Súperaleaciones',
    subtitle: 'Cómo el niobio refinado domésticamente en Nebraska se convierte en el escudo térmico de los motores Merlin.',
    author: {
      name: 'Ing. Elena Rostova',
      role: 'Metalúrgica Principal de Materiales Avanzados',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120'
    },
    date: 'Junio 15, 2026',
    readTime: '5 min de lectura',
    category: 'Metales & Materiales',
    visualIcon: <Icons.Layers className="w-10 h-10 text-sky-400" />,
    summary: 'Los cohetes Falcon 9 de SpaceX desafían temperaturas extremas de reentrada. La aleación C-103, basada en niobio de NioCorp refinado por Materion, previene la fatiga estructural crítica en las toberas de escape.',
    companiesInvolved: ['NB', 'MTRN'],
    content: [
      'El niobio (Nb) es catalogado como un mineral de seguridad nacional crítica por los gobiernos más importantes del mundo debido a su fusión exorbitante a 2,477°C. La mayor parte de la oferta global proviene de minas extranjeras controladas de manera geopolíticamente compleja. En este escenario, el megaproyecto de NioCorp en Elk Creek, Nebraska, se convierte en la única fuente de niobio masiva en suelo norteamericano.',
      'Sin embargo, el niobio crudo no se vierte directo en un molde. Requiere un proceso de refinamiento de pureza superior y formulado de aleaciones aeroespaciales específicas. Ahbì es donde entra Materion Corporation. Materion purifica el concentrado de niobio de NioCorp y produce láminas de la aleación legendaria C-103 (compuesta de 89% Niobio, 10% Hafnio y 1% Titanio).',
      'Esta súper-aleación posee un coeficiente de expansión térmica mínimo y una resistencia superlativa al choque térmico. SpaceX compra de manera continua los lotes metálicos de Materion para moldear el "baffle" (deflector térmico) y el cono de extensión de la tobera de los motores Merlin 1D+, asegurando que los vehículos de clase orbital regresen intactos a las plataformas flotantes.',
      'El impacto económico para ambas empresas es obvio: asegurar un contrato exclusivo o preferente con SpaceX genera flujos de efectivo multianuales sumamente previsibles en un sector de alta barrera de entrada.'
    ]
  },
  {
    id: 'iperionx-howmet',
    title: 'La Metalurgia Circular del Titanio Aeroespacial',
    subtitle: 'La irrupción verde de IperionX purificando chatarra que Howmet convierte en herrajes ligeros.',
    author: {
      name: 'Manuel Sotomayor',
      role: 'Consultor de Economía Circular y Sostenibilidad',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120'
    },
    date: 'Mayo 28, 2026',
    readTime: '4 min de lectura',
    category: 'Manufactura Crítica',
    visualIcon: <Icons.ShieldAlert className="w-10 h-10 text-violet-400" />,
    summary: 'El titanio tradicional tiene una huella de carbono colosal y despilfarra el 70% del metal virgen durante el corte. IperionX está revirtiendo esto mediante reciclaje molecular, y abasteciendo plantas clave como la fundición de Howmet.',
    companiesInvolved: ['IPX', 'HWM'],
    content: [
      'La refinación tradicional de titanio mediante el proceso Kroll es ineficiente, costosa y altamente emisora de CO2. Además, durante el fresado de piezas estructurales externas para cohetes y naves espaciales, se genera un residuo de viruta que usualmente es descartado.',
      'La startup revolucionaria IperionX patentó una tecnología capaz de reducir el desecho metálico de titanio de grado militar de vuelta a polvo fino con calidad de inyección sin fundir el material. Logran purificar chatarra aeroespacial y producir titanio 100% regenerado comercial.',
      'Howmet Aerospace (quien opera las prensas mecánicas más colosales del hemisferio occidental) utiliza este titanio circular purificado de IperionX en su complejo de fraguado a presión extrema. Forjan de manera precisa soportes angulares del chasis, juntas de tanques propulsores de oxígeno criogénico y herrajes refractores de SpaceX.',
      'Esta integración reduce drásticamente el costo por kilo lanzado de la corporación espacial de Elon Musk, acelerando el margen de ganancia de los viajes comerciales y los despliegues de constelaciones pesadas.'
    ]
  },
  {
    id: 'filtronic-rocketlab',
    title: 'Satélites Gigantes, Enlaces Microscópicos: El impacto RF de Filtronic',
    subtitle: 'Por qué el hardware de radiofrecuencia mmWave de alta densidad determina quién domina la carrera LEO.',
    author: {
      name: 'Dra. Sylvia Vance',
      role: 'Directora de Telecomunicaciones Avanzadas',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'
    },
    date: 'Mayo 12, 2026',
    readTime: '5 min de lectura',
    category: 'Telecomunicaciones & Networking',
    visualIcon: <Icons.Radio className="w-10 h-10 text-pink-400" />,
    summary: 'Filtronic fabrica amplificadores y bloques de transceptores en banda E para canales ópticos inter-satélite y enlaces de retorno a tierra, convirtiéndose en el habilitador oculto de la transmisión ultra veloz de datos.',
    companiesInvolved: ['FTC', 'RKLB'],
    content: [
      'Al enviar miles de satélites al espacio, el verdadero cuello de botella no es el cohete, sino la cantidad de información que se puede transmitir a través del espectro electromagnético. La banda Ka tradicional está al borde del colapso de densidad.',
      'Filtronic plc ha liderado la transición industrial hacia las frecuencias milimétricas superiores en la "Banda E" (entre 71 y 86 GHz). Sus transceptores integrados y amplificadores monolíticos de microondas proveen anchos de banda simétricos de hasta 10 Gbps por canal óptico o de radio enlace.',
      'Rocket Lab (competidor y a la vez integrador de herrajes en el ecosistema espacial) adquiere de forma directa los sistemas de RF de Filtronic para sus naves satelitales "Photon". Estas naves nodrizas asisten la puesta en órbita y las comunicaciones de SpaceX y otras megaconstelaciones civiles y militares.',
      'El inversor que rastrea los componentes internos de la electrónica aeroespacial sabe que firmas como Filtronic controlan la propiedad intelectual exclusiva de los filtros y transceptores que previenen la interferencia cósmica.'
    ]
  }
];

export default function OrbitalBlog() {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const selectedPost = BLOG_POSTS.find(p => p.id === selectedPostId);

  return (
    <div className="glass-panel border border-white/5 rounded-3xl p-6 flex flex-col h-full text-[#fafafa]">
      
      {/* Header controls */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <Icons.Bookmark className="w-5 h-5 text-amber-500" />
          <div>
            <h3 className="font-display font-medium text-sm tracking-widest uppercase">
              Blog Co-Orbital & Nexos del Ecosistema
            </h3>
            <p className="text-[11px] text-zinc-500 font-sans">
              Análisis técnico profundo de la interconexión e indirectos de suministro que aceleran a SpaceX.
            </p>
          </div>
        </div>
        {selectedPost && (
          <button
            onClick={() => setSelectedPostId(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/5 text-[11px] text-zinc-400 hover:text-white transition font-mono uppercase"
          >
            <Icons.ChevronLeft className="w-3.5 h-3.5" />
            Volver al listado
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!selectedPost ? (
          <motion.div
            key="blog-list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {BLOG_POSTS.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPostId(post.id)}
                className="group relative rounded-2xl bg-zinc-950/70 border border-white/5 hover:border-white/20 p-5 cursor-pointer flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.05)] text-left"
              >
                {/* Header detail */}
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-amber-500 uppercase bg-amber-500/10 px-2.5 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                      {post.readTime}
                    </span>
                  </div>

                  <h4 className="font-display font-semibold text-base text-zinc-100 group-hover:text-amber-400 transition-colors line-clamp-2">
                    {post.title}
                  </h4>

                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                {/* Bottom author alignment */}
                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full bg-zinc-900 border border-white/10 shrink-0 object-cover"
                    />
                    <div className="leading-tight">
                      <span className="text-[10px] font-medium text-zinc-300 block">{post.author.name}</span>
                      <span className="text-[8px] text-zinc-500 block font-mono uppercase">{post.author.role}</span>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition duration-300 shrink-0">
                    <Icons.ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-amber-400 transition" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.article
            key="blog-detail"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl bg-zinc-950/40 border border-white/5 p-6 md:p-8 space-y-6 text-left max-w-4xl mx-auto"
          >
            {/* Meta details header info */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 font-mono">
              <span className="text-amber-500 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded tracking-wider uppercase text-[9px]">
                {selectedPost.category}
              </span>
              <span>•</span>
              <span>{selectedPost.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Icons.Clock className="w-3.5 h-3.5 text-zinc-600" />
                {selectedPost.readTime}
              </span>
            </div>

            {/* Title & Subtitle block */}
            <div className="space-y-3">
              <h3 className="font-serif-italic text-2xl md:text-3.5xl text-zinc-100 leading-snug">
                {selectedPost.title}
              </h3>
              <p className="text-sm md:text-base text-zinc-400 italic font-serif">
                {selectedPost.subtitle}
              </p>
            </div>

            {/* Author layout block */}
            <div className="flex items-center gap-3 border-y border-white/5 py-4">
              <img
                src={selectedPost.author.avatar}
                alt={selectedPost.author.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full border border-white/10 shrink-0 object-cover"
              />
              <div className="leading-tight">
                <span className="text-xs font-semibold text-zinc-200 block">{selectedPost.author.name}</span>
                <span className="text-[9px] text-zinc-500 block uppercase font-mono tracking-wider">{selectedPost.author.role}</span>
              </div>
            </div>

            {/* Article Content Markdown elements */}
            <div className="space-y-5 font-sans leading-relaxed text-sm md:text-base text-zinc-300">
              {selectedPost.content.map((paragraph, idx) => {
                if (idx === 0) {
                  return (
                    <p key={idx} className="first-letter:text-4xl first-letter:font-serif-italic first-letter:text-amber-500 first-letter:mr-2 first-letter:float-left first-letter:leading-none text-zinc-200">
                      {paragraph}
                    </p>
                  );
                }
                return <p key={idx}>{paragraph}</p>;
              })}
            </div>

            {/* Connective tag nodes info bar */}
            <div className="border-t border-white/5 pt-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Icons.Cpu className="w-4 h-4 text-zinc-500" />
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">SOCIOS RELACIONADOS:</span>
                <div className="flex gap-1.5">
                  {selectedPost.companiesInvolved.map(comp => (
                    <span
                      key={comp}
                      className="text-[9px] font-mono font-bold text-zinc-300 bg-zinc-900 border border-white/5 px-2 py-0.5 rounded uppercase"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedPostId(null)}
                className="text-[11px] font-mono text-zinc-400 hover:text-white transition uppercase flex items-center gap-1.5"
              >
                <span>Volver al Blog</span>
                <Icons.ArrowLeft className="w-3.5 h-3.5 scale-x-[-1]" />
              </button>
            </div>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}
