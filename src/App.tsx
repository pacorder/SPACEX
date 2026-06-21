import React, { useState } from 'react';
import { Company } from './types';
import { COMPANIES, SECTORS, SPACEX_STATS } from './data';
import NetworkGraph from './components/NetworkGraph';
import CompanyDetailCard from './components/CompanyDetailCard';
import CompanyTable from './components/CompanyTable';
import InvestmentSimulator from './components/InvestmentSimulator';
import MineralsTable from './components/MineralsTable';
import CapMarketTreemap from './components/CapMarketTreemap';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type TabId = 'list' | 'simulator' | 'minerals' | 'treemap';

export default function App() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [activeSectorId, setActiveSectorId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('list');

  const handleSelectCompany = (company: Company) => {
    setSelectedCompany(company);
  };

  const handleSelectSector = (sectorId: string | null) => {
    setActiveSectorId(sectorId);
    // Clear company selection if user selects/filters another sector
    if (sectorId && selectedCompany && selectedCompany.category !== sectorId) {
      setSelectedCompany(null);
    }
  };

  const handleClearCompanySelection = () => {
    setSelectedCompany(null);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex flex-col font-sans relative">
      
      {/* Structural Ambient Starry Sky background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(24,24,27,0.5)_0%,rgba(9,9,11,1)_100%)] pointer-events-none" />

      {/* Main Top Header Navbar */}
      <header className="border-b border-white/5 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center glow-blue">
              <Icons.Orbit className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-blue-400 tracking-wider uppercase block font-bold">SpaceX Supercycle</span>
              <h1 className="font-display font-bold text-base tracking-wide text-[#fafafa]">
                Ecosistema Tecnológico de SpaceX
              </h1>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8 font-mono text-xs text-zinc-400">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase block">VALORACIÓN</span>
              <span className="font-bold text-zinc-200">{SPACEX_STATS.valuation}</span>
            </div>
            <div className="w-px h-6 bg-white/5" />
            <div>
              <span className="text-[10px] text-zinc-500 uppercase block">RECAUDACIÓN OPI</span>
              <span className="font-bold text-emerald-400">{SPACEX_STATS.ipoRevenue}</span>
            </div>
            <div className="w-px h-6 bg-white/5" />
            <div>
              <span className="text-[10px] text-zinc-500 uppercase block">POTENCIAL IA</span>
              <span className="font-bold text-purple-400">90% +</span>
            </div>
          </div>
        </div>
      </header>

      {/* Primary Container layout dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 flex flex-col gap-8">
        
        {/* HERO LANDING PAGE INTRO */}
        <section id="hero-landing-page" className="glass-panel border border-white/5 rounded-3xl p-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-12 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 pulse-dot" />
              <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em]">Superciclo de Tecnología Aeroespacial</span>
            </div>
            
            <h2 className="font-serif-italic text-4xl lg:text-5xl text-slate-100 leading-tight">
              SpaceX: El Sol Gravitacional de la Nueva Era
            </h2>
            
            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
              La histórica salida de <strong className="text-white">SpaceX</strong> a bolsa en el Nasdaq con una valoración de <strong className="text-blue-400">~$1.77 billones de dólares</strong> marca un punto de inflexión civilizatorio. Similar al impacto de Nvidia en el ecosistema de IA, SpaceX actúa como catalizador de un nuevo nicho de inversión que impulsa de forma masiva a proveedores estratégicos de semiconductores, energía limpia, metales complejos y componentes de órbita terrestre.
            </p>
          </div>

          {/* Quick Bento Stats Panel */}
          <div className="w-full md:w-auto flex flex-col gap-3 min-w-[280px]">
            <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block">VALORACIÓN OPI</span>
                <span className="text-2xl font-bold font-display text-blue-400">{SPACEX_STATS.valuation}</span>
              </div>
              <div className="w-px h-10 bg-white/5" />
              <div>
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block text-right">RECAUDACIÓN</span>
                <span className="text-2xl font-bold font-display text-emerald-400 text-right">{SPACEX_STATS.ipoRevenue}</span>
              </div>
            </div>
            <div className="bg-zinc-900/50 p-3.5 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Mercado Potencial (TAM)</span>
                <span className="text-[8px] bg-purple-500/10 text-purple-400 border border-purple-950 font-mono px-1.5 py-0.5 rounded uppercase">IA e Infraestructura</span>
              </div>
              <span className="text-2xl font-bold font-display text-purple-400">{SPACEX_STATS.tam}</span>
            </div>
          </div>
        </section>
        
        {/* Top interactive panel / Bento Grid section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px] lg:h-[620px] min-h-[500px]">
          {/* Left panel: Orbital connection graph (2/3 width) */}
          <div className="lg:col-span-2 h-full rounded-3xl overflow-hidden glow-blue relative">
            <NetworkGraph
              onSelectCompany={handleSelectCompany}
              selectedCompanyId={selectedCompany ? selectedCompany.id : null}
              activeSectorId={activeSectorId}
              onSelectSector={handleSelectSector}
            />
          </div>

          {/* Right panel: Active inspected node description (1/3 width) */}
          <div className="h-full rounded-3xl glow-blue">
            <CompanyDetailCard
              company={selectedCompany}
              onClear={handleClearCompanySelection}
            />
          </div>
        </section>

        {/* Tab Navigator bar */}
        <section className="flex flex-col gap-5 mt-4">
          <div className="flex border-b border-white/5 gap-1.5 pb-px relative">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-5 py-2.5 text-xs font-display font-semibold uppercase tracking-wider border-b-2 transition duration-200 flex items-center gap-2 ${
                activeTab === 'list'
                  ? 'border-blue-500 text-blue-400 font-bold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icons.Sliders className="w-4 h-4" />
              <span>Lista de Socios</span>
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-5 py-2.5 text-xs font-display font-semibold uppercase tracking-wider border-b-2 transition duration-200 flex items-center gap-2 ${
                activeTab === 'simulator'
                  ? 'border-blue-500 text-blue-400 font-bold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icons.TrendingUp className="w-4 h-4" />
              <span>Portafolio de Inversión</span>
            </button>
            <button
              onClick={() => setActiveTab('minerals')}
              className={`px-5 py-2.5 text-xs font-display font-semibold uppercase tracking-wider border-b-2 transition duration-200 flex items-center gap-2 ${
                activeTab === 'minerals'
                  ? 'border-blue-500 text-blue-400 font-bold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icons.Pickaxe className="w-4 h-4" />
              <span>Minerales & Commodities</span>
            </button>
            <button
              onClick={() => setActiveTab('treemap')}
              className={`px-5 py-2.5 text-xs font-display font-semibold uppercase tracking-wider border-b-2 transition duration-200 flex items-center gap-2 ${
                activeTab === 'treemap'
                  ? 'border-blue-500 text-blue-400 font-bold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
              title="Treemap de Capitalización"
            >
              <Icons.LayoutDashboard className="w-4 h-4 rotate-45" />
              <span>Mapa de Capitalización</span>
            </button>
          </div>

          {/* Tab view area */}
          <div className="min-h-[420px] transition-all">
            <AnimatePresence mode="wait">
              {activeTab === 'list' && (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <CompanyTable
                    onSelectCompany={handleSelectCompany}
                    selectedCompanyId={selectedCompany ? selectedCompany.id : null}
                    activeSectorId={activeSectorId}
                    onSelectSector={handleSelectSector}
                  />
                </motion.div>
              )}

              {activeTab === 'simulator' && (
                <motion.div
                  key="simulator"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <InvestmentSimulator
                    companies={COMPANIES}
                    onSelectCompany={handleSelectCompany}
                  />
                </motion.div>
              )}

              {activeTab === 'minerals' && (
                <motion.div
                  key="minerals"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <MineralsTable />
                </motion.div>
              )}

              {activeTab === 'treemap' && (
                <motion.div
                  key="treemap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <CapMarketTreemap
                    companies={COMPANIES}
                    onSelectCompany={handleSelectCompany}
                    selectedCompanyId={selectedCompany ? selectedCompany.id : null}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Footer bar */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 mt-12 text-xs text-slate-500 font-mono text-center">
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
