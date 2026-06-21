import React, { useState } from 'react';
import { Company } from './types';
import { COMPANIES, SECTORS, SPACEX_STATS } from './data';
import NetworkGraph from './components/NetworkGraph';
import CompanyDetailCard from './components/CompanyDetailCard';
import CompanyTable from './components/CompanyTable';
import InvestmentSimulator from './components/InvestmentSimulator';
import MineralsTable from './components/MineralsTable';
import CapMarketTreemap from './components/CapMarketTreemap';
import OrbitalBlog from './components/OrbitalBlog';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type MainTabId = 'landing' | 'ecosystem' | 'treemap' | 'partners' | 'blog';
type PartnersSubTabId = 'list' | 'simulator' | 'minerals';

export default function App() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [activeSectorId, setActiveSectorId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<MainTabId>('landing');
  const [partnersSubTab, setPartnersSubTab] = useState<PartnersSubTabId>('list');

  const handleSelectCompany = (company: Company) => {
    setSelectedCompany(company);
    setActiveTab('ecosystem'); // Automatically switch to interactive graph to inspect
  };

  const handleSelectSector = (sectorId: string | null) => {
    setActiveSectorId(sectorId);
    if (sectorId && selectedCompany && selectedCompany.category !== sectorId) {
      setSelectedCompany(null);
    }
  };

  const handleClearCompanySelection = () => {
    setSelectedCompany(null);
  };

  const navigateToSectorOnGraph = (sectorId: string) => {
    setActiveSectorId(sectorId);
    setSelectedCompany(null);
    setActiveTab('ecosystem');
  };

  return (
    <div className="min-h-screen bg-[#070709] text-[#fafafa] flex flex-col font-sans relative overflow-x-hidden selection:bg-blue-600/30 selection:text-white">
      
      {/* Glow ambient clusters in the background */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[400px] right-[-200px] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[100px] left-[-200px] w-[600px] h-[600px] bg-purple-950/20 rounded-full blur-[160px] pointer-events-none" />

      {/* Primary Top Header Navigation & Cosmic Brand Banner */}
      <header className="border-b border-white/5 bg-[#070709]/85 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          
          {/* Left Brand Header */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:scale-105 transition-all">
              <Icons.Orbit className="w-6 h-6 text-white animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-blue-400 uppercase bg-blue-500/10 px-1.5 py-0.5 rounded leading-none">LEO ORBITAL</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h1 className="font-display font-black text-lg tracking-tight text-white leading-tight">
                SPACEX <span className="text-zinc-500 font-light">SUPERCYCLE</span>
              </h1>
            </div>
          </div>

          {/* Center Dynamic Navigation Menus */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-950/70 p-1.5 rounded-2xl border border-white/5">
            <button
              onClick={() => setActiveTab('landing')}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition ${
                activeTab === 'landing'
                  ? 'bg-zinc-900 border border-white/5 text-white font-bold shadow-lg'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span>Presentación</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('ecosystem');
                // clear company or sector to showcase full network initially
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition flex items-center gap-1.5 ${
                activeTab === 'ecosystem'
                  ? 'bg-zinc-900 border border-white/5 text-blue-400 font-bold shadow-lg'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icons.Compass className="w-3.5 h-3.5" />
              <span>Ecosistema</span>
            </button>

            <button
              onClick={() => setActiveTab('treemap')}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition flex items-center gap-1.5 ${
                activeTab === 'treemap'
                  ? 'bg-zinc-900 border border-white/5 text-emerald-400 font-bold shadow-lg'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icons.LayoutDashboard className="w-3.5 h-3.5 rotate-45" />
              <span>Capitalización</span>
            </button>

            <button
              onClick={() => setActiveTab('partners')}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition flex items-center gap-1.5 ${
                activeTab === 'partners'
                  ? 'bg-zinc-900 border border-white/5 text-violet-400 font-bold shadow-lg'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icons.Shield className="w-3.5 h-3.5" />
              <span>Lista de Socios</span>
            </button>

            <button
              onClick={() => setActiveTab('blog')}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition flex items-center gap-1.5 ${
                activeTab === 'blog'
                  ? 'bg-zinc-900 border border-white/5 text-amber-400 font-bold shadow-lg'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icons.Bookmark className="w-3.5 h-3.5" />
              <span>Blog Co-Orbital</span>
            </button>
          </nav>



          {/* Mobile responsive drawer toggle warning */}
          <div className="md:hidden flex items-center gap-3">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as MainTabId)}
              className="bg-zinc-950 border border-white/10 text-xs text-zinc-300 font-mono rounded-xl px-3 py-1.5"
            >
              <option value="landing">1. Presentación</option>
              <option value="ecosystem">2. Ecosistema</option>
              <option value="treemap">3. Capitalización</option>
              <option value="partners">4. Lista de Socios</option>
              <option value="blog">5. Blog Co-Orbital</option>
            </select>
          </div>

        </div>
      </header>

      {/* Main Core View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 flex flex-col gap-8 z-10">
        
        <AnimatePresence mode="wait">
          
          {/* TAB 1: HERO SPOTLIGHT LANDING PAGE PRESENTATION */}
          {activeTab === 'landing' && (
            <motion.div
              key="view-landing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Grand Visual Billboard */}
              <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-b from-zinc-950 to-zinc-900 p-8 md:p-12 shadow-2xl flex flex-col justify-between min-h-[460px]">
                
                {/* Embedded technical blueprints grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
                <div className="absolute -right-12 -top-12 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
                <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-[110px] pointer-events-none" />

                {/* Subheader and Category label */}
                <div className="space-y-4 max-w-3xl z-10 text-left">
                  <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-950 rounded-full px-3 py-1 text-[10px] uppercase font-mono tracking-widest text-blue-400">
                    <Icons.Orbit className="w-3.5 h-3.5 text-blue-400 rotate-45" />
                    <span>Lanzamiento Estratégico Nasdaq • Junio 2026</span>
                  </div>
                  
                  <h2 className="font-serif-italic text-4xl sm:text-5xl lg:text-6.5xl text-white tracking-tight leading-[1.1] pb-2">
                    SpaceX, el Sol Gravitacional <br className="hidden sm:inline" />
                    de la Nueva Era Industrial.
                  </h2>
                  
                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans max-w-2xl">
                    La salida a bolsa de la corporación espacial de Elon Musk con una valoración de <strong className="text-white">~$1.77 billones de dólares</strong> desencadena una perturbación en cadena. Similar al impacto de Nvidia en el ecosistema de IA, SpaceX actúa como un centro gravitacional que impulsa masivamente la demanda global de aleaciones exóticas, semiconductores térmicos de banda ancha, infraestructuras de datos orbitales LEO y energía renovable de respaldo continuo.
                  </p>
                </div>

                {/* Grid of core metrics styled beautifully like high-tech control panels */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 z-10 text-left">
                  <div className="bg-zinc-950/60 border border-white/5 rounded-2xl p-4.5 backdrop-blur-md">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">VALORACIÓN</span>
                    <span className="text-2xl sm:text-3.5xl font-black font-display text-blue-400 block tracking-tight mt-1">{SPACEX_STATS.valuation}</span>
                    <p className="text-[10px] font-mono text-zinc-600 mt-1">Estimación bursátil global</p>
                  </div>

                  <div className="bg-zinc-950/60 border border-white/5 rounded-2xl p-4.5 backdrop-blur-md">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">RECAUDACIÓN OPI</span>
                    <span className="text-2xl sm:text-3.5xl font-black font-display text-emerald-400 block tracking-tight mt-1">{SPACEX_STATS.ipoRevenue}</span>
                    <p className="text-[10px] font-mono text-zinc-600 mt-1">Flujo de caja inmediato</p>
                  </div>

                  <div className="bg-zinc-950/60 border border-white/5 rounded-2xl p-4.5 backdrop-blur-md">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">CAPACIDAD LEO</span>
                    <span className="text-2xl sm:text-3.5xl font-black font-display text-purple-400 block tracking-tight mt-1">+6,500</span>
                    <p className="text-[10px] font-mono text-zinc-600 mt-1">Satélites en órbita activa</p>
                  </div>

                  <div className="bg-zinc-950/60 border border-white/5 rounded-2xl p-4.5 backdrop-blur-md">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">MERCADO DIRECTO (TAM)</span>
                    <span className="text-2xl sm:text-3.5xl font-black font-display text-amber-500 block tracking-tight mt-1">{SPACEX_STATS.tam}</span>
                    <p className="text-[10px] font-mono text-zinc-600 mt-1">Servicios globales para 2030</p>
                  </div>
                </div>

              </div>

              {/* Action Call buttons to access other tabs */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-zinc-950 border border-white/5 text-left">
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-sm tracking-wide text-zinc-100 uppercase">Explora la Red Neuronal Bursátil</h4>
                  <p className="text-xs text-zinc-500">Utiliza los visualizadores espaciales interactivos para trazar conexiones, o revisa mapas de calor de rentabilidad.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    onClick={() => setActiveTab('ecosystem')}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-mono text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl transition font-bold shadow-lg shadow-blue-600/10"
                  >
                    <span>Abrir Gráfico Interactivo</span>
                    <Icons.Compass className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab('treemap')}
                    className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-200 font-mono text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl transition"
                  >
                    <span>Mapa de Fricción</span>
                    <Icons.LayoutDashboard className="w-4 h-4 rotate-45 text-emerald-400" />
                  </button>
                </div>
              </div>

              {/* The Three Strategic Columns of SpaceX's Orbital Pull */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Column 1: Suministro de Energía Continuo */}
                <div 
                  onClick={() => navigateToSectorOnGraph('energia')}
                  className="rounded-2xl border border-white/5 bg-zinc-950/40 p-6 hover:border-white/10 hover:bg-zinc-900/30 cursor-pointer transition text-left group"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                    <Icons.Zap className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="font-display font-semibold text-base text-zinc-200 group-hover:text-amber-400 transition">
                    Infraestructura de Energía Base
                  </h3>
                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                    Las estaciones de enlace satelital terrestres y los centros de datos de ruteo Starlink demandan un respaldo de energía limpia continuo (24/7 de energía nuclear y solar).
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider">
                    <span>Ver Proveedores Clave (CEG, NEE, VST)</span>
                    <Icons.ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                  </div>
                </div>

                {/* Column 2: Aleaciones Metálicas & Escudos */}
                <div 
                  onClick={() => navigateToSectorOnGraph('materiales')}
                  className="rounded-2xl border border-white/5 bg-zinc-950/40 p-6 hover:border-white/10 hover:bg-zinc-900/30 cursor-pointer transition text-left group"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                    <Icons.Layers className="w-5 h-5 text-sky-400" />
                  </div>
                  <h3 className="font-display font-semibold text-base text-zinc-200 group-hover:text-sky-400 transition">
                    Súperaleaciones & Química Compleja
                  </h3>
                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                    El titanio ultraligero y el niobio aeroespacial son insumos indispensables para el fundido térmico de toberas críticas operando a más de 2,400°C.
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono text-sky-500 font-bold uppercase tracking-wider">
                    <span>Ver Metalurgias (MTRN, NB, IPX, HWM)</span>
                    <Icons.ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                  </div>
                </div>

                {/* Column 3: Redes de Banda Ancha e Intercepción IA */}
                <div 
                  onClick={() => navigateToSectorOnGraph('semiconductores')}
                  className="rounded-2xl border border-white/5 bg-zinc-950/40 p-6 hover:border-white/10 hover:bg-zinc-900/30 cursor-pointer transition text-left group"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                    <Icons.Cpu className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="font-display font-semibold text-base text-zinc-200 group-hover:text-purple-400 transition">
                    Semiconductores & Banda mmWave
                  </h3>
                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                    Las telecomunicaciones de órbita baja operan a través de terminales ópticas integradas y bloques de amplificadores de radiofrecuencia en Banda E con tecnología GaN.
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono text-purple-500 font-bold uppercase tracking-wider">
                    <span>Ver Semiconductores (STM, FTC, CRS)</span>
                    <Icons.ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                  </div>
                </div>

              </div>

            </motion.div>
          )}

          {/* TAB 2: INTERACTIVE ECOSYSTEM NETWORK GRAPH & DETAILED COMPANY INSPECTOR */}
          {activeTab === 'ecosystem' && (
            <motion.div
              key="view-ecosystem"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px] lg:h-[650px] min-h-[500px]"
            >
              {/* Left panel: Orbital connection graph (2/3 width) */}
              <div className="lg:col-span-2 h-full rounded-3xl overflow-hidden relative">
                <NetworkGraph
                  onSelectCompany={handleSelectCompany}
                  selectedCompanyId={selectedCompany ? selectedCompany.id : null}
                  activeSectorId={activeSectorId}
                  onSelectSector={handleSelectSector}
                />
              </div>

              {/* Right panel: Active inspected node description (1/3 width) */}
              <div className="h-full rounded-3xl">
                <CompanyDetailCard
                  company={selectedCompany}
                  onClear={handleClearCompanySelection}
                />
              </div>
            </motion.div>
          )}

          {/* TAB 3: CAPITALIZATION HEAT TREEMAP - NASDAQ / FINVIZ STYLE */}
          {activeTab === 'treemap' && (
            <motion.div
              key="view-treemap"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <CapMarketTreemap
                companies={COMPANIES}
                onSelectCompany={handleSelectCompany}
                selectedCompanyId={selectedCompany ? selectedCompany.id : null}
              />
            </motion.div>
          )}

          {/* TAB 4: PARTNERS LIST COMPREHENSIVE TOOLS HUB (TABLES & SIMULATOR) */}
          {activeTab === 'partners' && (
            <motion.div
              key="view-partners"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Sub-navigation items bar */}
              <div className="flex border-b border-white/5 gap-2 pb-px relative">
                <button
                  onClick={() => setPartnersSubTab('list')}
                  className={`px-5 py-3 text-xs font-display font-semibold uppercase tracking-wider border-b-2 transition duration-200 flex items-center gap-2 ${
                    partnersSubTab === 'list'
                      ? 'border-blue-500 text-blue-400 font-bold'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Icons.Sliders className="w-4 h-4 text-inherit" />
                  <span>Tabla Integral de Socios</span>
                </button>

                <button
                  onClick={() => setPartnersSubTab('simulator')}
                  className={`px-5 py-3 text-xs font-display font-semibold uppercase tracking-wider border-b-2 transition duration-200 flex items-center gap-2 ${
                    partnersSubTab === 'simulator'
                      ? 'border-blue-500 text-blue-400 font-bold'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Icons.TrendingUp className="w-4 h-4 text-inherit" />
                  <span>Simulador de Portafolio</span>
                </button>

                <button
                  onClick={() => setPartnersSubTab('minerals')}
                  className={`px-5 py-3 text-xs font-display font-semibold uppercase tracking-wider border-b-2 transition duration-200 flex items-center gap-2 ${
                    partnersSubTab === 'minerals'
                      ? 'border-blue-500 text-blue-400 font-bold'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Icons.Pickaxe className="w-4 h-4 text-inherit" />
                  <span>Minerales & Commodities</span>
                </button>
              </div>

              {/* Hub Container Frame */}
              <div className="min-h-[460px]">
                <AnimatePresence mode="wait">
                  {partnersSubTab === 'list' && (
                    <motion.div
                      key="subtab-list"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.15 }}
                    >
                      <CompanyTable
                        onSelectCompany={handleSelectCompany}
                        selectedCompanyId={selectedCompany ? selectedCompany.id : null}
                        activeSectorId={activeSectorId}
                        onSelectSector={handleSelectSector}
                      />
                    </motion.div>
                  )}

                  {partnersSubTab === 'simulator' && (
                    <motion.div
                      key="subtab-simulator"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.15 }}
                    >
                      <InvestmentSimulator
                        companies={COMPANIES}
                        onSelectCompany={handleSelectCompany}
                      />
                    </motion.div>
                  )}

                  {partnersSubTab === 'minerals' && (
                    <motion.div
                      key="subtab-minerals"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.15 }}
                    >
                      <MineralsTable />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* TAB 5: DYNAMIC CO-ORBITAL INTERCOMPANY BLOG */}
          {activeTab === 'blog' && (
            <motion.div
              key="view-blog"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <OrbitalBlog />
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Footer bar exactly aligned */}
      <footer className="border-t border-slate-900 bg-slate-950/70 py-6 mt-12 text-xs text-slate-500 font-mono text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 Ecosistema SpaceX. Salida a Bolsa Nasdaq (June 12, 2026).</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 transition cursor-pointer">Seguridad</span>
            <span className="hover:text-slate-300 transition cursor-pointer">Metodología</span>
            <span className="hover:text-slate-300 transition cursor-pointer">Fuentes de Datos</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
