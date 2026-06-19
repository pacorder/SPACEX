import React from 'react';
import { Company } from '../types';
import { SPACEX_STATS } from '../data';
import * as Icons from 'lucide-react';

interface CompanyDetailCardProps {
  company: Company | null;
  onClear: () => void;
}

export default function CompanyDetailCard({ company, onClear }: CompanyDetailCardProps) {
  // If no company is selected, show general SpaceX IPO data sheet
  if (!company) {
    return (
      <div className="glass-panel border border-white/5 rounded-3xl p-6 h-full flex flex-col justify-between text-[#fafafa] relative overflow-hidden">
        {/* Decorative Grid Line style */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 pulse-dot"></div>
            <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em]">Ecosistema Global</span>
          </div>

          <div>
            <h1 className="font-serif-italic text-4xl mb-1 text-slate-100">
              SpaceX (SPCX)
            </h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono mt-1">{SPACEX_STATS.listing} · {SPACEX_STATS.launchDate}</p>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            {SPACEX_STATS.headline} El superciclo aeroespacial y de Internet global de Starlink cataliza una inmensa red de suministro tecnológico de hardware, energía, chips y minerales críticos de vanguardia.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-zinc-900/50 p-3 rounded-2xl border border-white/5">
              <span className="text-[9px] text-zinc-500 font-mono block uppercase tracking-wider">Valoración</span>
              <span className="text-lg font-bold font-display text-blue-400">{SPACEX_STATS.valuation}</span>
            </div>
            <div className="bg-zinc-900/50 p-3 rounded-2xl border border-white/5">
              <span className="text-[9px] text-zinc-500 font-mono block uppercase tracking-wider">Recaudación</span>
              <span className="text-lg font-bold font-display text-emerald-400">{SPACEX_STATS.ipoRevenue}</span>
            </div>
          </div>

          <div className="bg-zinc-900/50 p-3.5 rounded-2xl border border-white/5">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider">Potencial de Mercado (TAM)</span>
              <span className="text-[8px] bg-purple-500/10 text-purple-400 border border-purple-950 font-mono px-1.5 py-0.5 rounded">IA Espacial</span>
            </div>
            <span className="text-xl font-bold font-display text-purple-400">{SPACEX_STATS.tam}</span>
            <p className="text-[10px] text-zinc-400 mt-1">Con más del 90% enfocado en infraestructura e inteligencia artificial empresarial en el espacio.</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
          <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">El Efecto SpaceX</h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Similar a la revolución de Nvidia en IA, la cotización formal de SpaceX en los mercados internacionales impulsa un superciclo que eleva la valoración relativa de todos sus socios críticos.
          </p>
        </div>
      </div>
    );
  }

  // Priority layout settings
  const priorityColor =
    company.priority === 'Alta'
      ? 'border-rose-950 bg-rose-500/10 text-rose-400'
      : company.priority === 'Media'
      ? 'border-amber-950 bg-amber-500/10 text-amber-400'
      : 'border-emerald-950 bg-emerald-500/10 text-emerald-400';

  return (
    <div className="glass-panel border border-white/5 rounded-3xl p-6 h-full flex flex-col justify-between text-[#fafafa] relative">
      <div className="space-y-5">
        {/* Header toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 pulse-dot"></div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-500">Selected Entity</span>
          </div>
          <button
            onClick={onClear}
            className="w-7 h-7 flex items-center justify-center rounded-xl bg-zinc-900 border border-white/10 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition"
            title="Cerrar detalles"
          >
            <Icons.X className="w-4 h-4" />
          </button>
        </div>

        {/* Company Title */}
        <div>
          <div className="flex items-baseline gap-2">
            <h1 className="font-serif-italic text-4xl mb-1 text-slate-100">
              {company.name}
            </h1>
            <span className="font-mono text-sm text-blue-400 font-bold">{company.ticker}</span>
          </div>
          <span className={`inline-block px-2.5 py-0.5 mt-2 text-[9px] uppercase font-mono tracking-widest border rounded-md ${priorityColor}`}>
            Socio Prioridad {company.priority}
          </span>
        </div>

        {/* Stats segment */}
        <div className="grid grid-cols-3 gap-2.5 bg-zinc-900/50 p-3.5 rounded-2xl border border-white/5 text-center font-mono">
          <div>
            <span className="text-[9px] text-zinc-500 block mb-0.5">MARKET CAP</span>
            <span className="text-xs font-semibold text-zinc-200">{company.marketCap}</span>
          </div>
          <div>
            <span className="text-[9px] text-zinc-500 block mb-0.5">REND. YTD</span>
            <span className="text-xs font-bold text-emerald-400">{company.growthYtd}</span>
          </div>
          <div>
            <span className="text-[9px] text-zinc-500 block mb-0.5">REND. 12M</span>
            <span className="text-xs font-bold text-blue-400">{company.growth12m}</span>
          </div>
        </div>

        {/* Specific Role */}
        <div className="bg-zinc-900/50 p-3.5 rounded-2xl border border-white/5 flex items-start gap-2.5">
          <Icons.Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="text-[10px] text-zinc-500 font-mono block uppercase">Rol de Suministro</span>
            <span className="text-xs font-semibold text-zinc-100">{company.role}</span>
          </div>
        </div>

        {/* Descriptive details */}
        <div className="space-y-1.5">
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Análisis de Integración</span>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            {company.description}
          </p>
        </div>
      </div>

      {/* Risks Analysis */}
      <div className="mt-6 pt-4 border-t border-white/5 space-y-1.5">
        <div className="flex items-center gap-1.5">
          <Icons.Info className="w-3.5 h-3.5 text-amber-500" />
          <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Factores de Riesgo</h4>
        </div>
        <p className="text-[11px] text-zinc-400 leading-relaxed">
          {company.risks}
        </p>
      </div>
    </div>
  );
}
