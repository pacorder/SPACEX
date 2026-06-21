import React from 'react';
import { Company } from '../types';
import { SPACEX_STATS, SUPPLIER_RELATIONS } from '../data';
import * as Icons from 'lucide-react';

interface CompanyDetailCardProps {
  company: Company | null;
  onClear: () => void;
}

export default function CompanyDetailCard({ company, onClear }: CompanyDetailCardProps) {
  // If no company is selected, show an elegant interactive Explorer cockpit guide
  if (!company) {
    return (
      <div className="glass-panel border border-white/5 rounded-3xl p-6 h-full flex flex-col justify-between text-[#fafafa] relative overflow-hidden">
        {/* Decorative Ambient Radial Gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 pulse-dot"></div>
            <span className="font-mono text-[9px] text-zinc-400 font-bold uppercase tracking-[0.2em]">Centro de Análisis OSINT</span>
          </div>

          <div className="space-y-1">
            <h1 className="font-serif-italic text-3xl text-slate-100">
              Cockpit de Control
            </h1>
            <p className="text-xs text-zinc-400 font-sans">
              Asistente en tiempo real para el mapeo geoestratégico de capital del superciclo aeroespacial.
            </p>
          </div>

          {/* Quick instructions with high fidelity icons */}
          <div className="space-y-4 pt-1">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Icons.MousePointer className="w-4 h-4 text-blue-400" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono text-zinc-300 font-semibold block uppercase">1. Selección Interactiva</span>
                <span className="text-[11px] text-zinc-400 block font-sans">Haz clic en cualquier nodo orbital del gráfico (por ej., <strong className="text-zinc-300 hover:text-white">TSA</strong> o <strong className="text-zinc-300 hover:text-white">ALB</strong>) para desplegar su ficha técnica y ponderaciones de riesgo.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Icons.Filter className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono text-zinc-300 font-semibold block uppercase">2. Filtro de Sectores</span>
                <span className="text-[11px] text-zinc-400 block font-sans">Usa la barra inferior para aislar subsectores como <strong className="text-emerald-400">Microchips</strong>, <strong className="text-emerald-400">Energía Espacial</strong> o <strong className="text-emerald-400">Minerales Críticos</strong>.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Icons.Sliders className="w-4 h-4 text-purple-400" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono text-zinc-300 font-semibold block uppercase">3. Simulador de Portafolio</span>
                <span className="text-[11px] text-zinc-400 block font-sans">Pestaña "Simulador" permite construir hipotéticas carteras asignando presupuesto de $10,000 USD y estimar rendimientos promedio YTD.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Status bar inside page margins inside the Cockpit card container */}
        <div className="ring-1 ring-white/5 bg-zinc-900/40 p-4 rounded-2xl flex flex-col gap-1">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Estado de la Red</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot" />
            <span className="font-mono text-[9px] text-emerald-400 font-semibold uppercase">Explorador Listo · Seleccione un Nodo</span>
          </div>
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

        {/* B2B Ecosystem Connections Section */}
        {(() => {
          const inwardConnections = SUPPLIER_RELATIONS.filter(r => r.toId === company.id);
          const outwardConnections = SUPPLIER_RELATIONS.filter(r => r.fromId === company.id);

          if (inwardConnections.length === 0 && outwardConnections.length === 0) return null;

          return (
            <div className="bg-zinc-950/40 p-3 rounded-2xl border border-white/5 space-y-2">
              <div className="flex items-center gap-1.5 border-b border-white/5 pb-1.5">
                <Icons.Share2 className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-[0.1em]">Conexiones B2B del Ecosistema</span>
              </div>
              <div className="space-y-2 font-sans max-h-[140px] overflow-y-auto pr-1">
                {inwardConnections.map((conn, idx) => (
                  <div key={`in-${idx}`} className="text-[11px] leading-snug text-zinc-300 bg-zinc-900/30 p-1.5 rounded-lg border border-white/5">
                    <span className="font-mono text-[8px] font-bold text-amber-400 uppercase bg-amber-500/10 px-1.5 py-0.5 rounded mr-1">Insumo</span>
                    Se abastece de la red de <span className="font-mono font-bold text-amber-500">{conn.fromId.toUpperCase()}</span>.
                    <p className="text-[10px] text-zinc-500 mt-0.5">{conn.description}</p>
                  </div>
                ))}
                {outwardConnections.map((conn, idx) => (
                  <div key={`out-${idx}`} className="text-[11px] leading-snug text-zinc-300 bg-zinc-900/30 p-1.5 rounded-lg border border-white/5">
                    <span className="font-mono text-[8px] font-bold text-blue-400 uppercase bg-blue-500/10 px-1.5 py-0.5 rounded mr-1">Suministro</span>
                    Vende recursos clave a <span className="font-mono font-bold text-blue-400">{conn.toId.toUpperCase()}</span>.
                    <p className="text-[10px] text-zinc-500 mt-0.5">{conn.description}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

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
