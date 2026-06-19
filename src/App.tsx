import React, { useState } from 'react';
import { Company } from './types';
import { COMPANIES, SECTORS, SPACEX_STATS } from './data';
import NetworkGraph from './components/NetworkGraph';
import CompanyDetailCard from './components/CompanyDetailCard';
import CompanyTable from './components/CompanyTable';
import InvestmentSimulator from './components/InvestmentSimulator';
import MineralsTable from './components/MineralsTable';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type TabId = 'list' | 'simulator' | 'minerals';

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
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 flex flex-col gap-6">
        
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
