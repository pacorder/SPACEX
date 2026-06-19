import React, { useState } from 'react';
import { Company } from '../types';
import { COMPANIES } from '../data';
import * as Icons from 'lucide-react';
import { motion } from 'motion/react';

interface InvestmentSimulatorProps {
  companies: Company[];
  onSelectCompany: (company: Company) => void;
}

export default function InvestmentSimulator({ companies, onSelectCompany }: InvestmentSimulatorProps) {
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const initialBudget = 10000;

  // Calculate current allocated total securely using Object.keys
  const totalAllocated = Object.keys(allocations).reduce((acc: number, key) => acc + (allocations[key] || 0), 0);
  const remainingBudget = initialBudget - totalAllocated;

  const handleAllocate = (companyId: string, amount: number) => {
    const current = allocations[companyId] || 0;
    const nextValue = Math.max(0, current + amount);
    
    // Check if within budget limits
    if (amount > 0 && remainingBudget < amount) return;

    setAllocations((prev) => {
      const updated = { ...prev };
      if (nextValue === 0) {
        delete updated[companyId];
      } else {
        updated[companyId] = nextValue;
      }
      return updated;
    });
  };

  const handleReset = () => {
    setAllocations({});
  };

  // Compile portfolio metrics
  const portfolioStats = () => {
    if (totalAllocated === 0) {
      return { avgYtd: 0, avg12m: 0, riskScore: 'Bajo' };
    }

    let weightedYtdSum = 0;
    let weighted12mSum = 0;
    let highRiskCount = 0;
    let medRiskCount = 0;

    Object.keys(allocations).forEach((compId) => {
      const amount = allocations[compId] || 0;
      const company = COMPANIES.find(c => c.id === compId);
      if (!company) return;

      const ytd = parseFloat(company.growthYtd.replace('%', '').replace('+', '')) || 0;
      const m12 = parseFloat(company.growth12m.replace('%', '').replace('+', '')) || 0;
      const weight = amount / totalAllocated;

      weightedYtdSum += ytd * weight;
      weighted12mSum += m12 * weight;

      if (company.priority === 'Especulativa') {
        highRiskCount += amount;
      } else if (company.priority === 'Media') {
        medRiskCount += amount;
      }
    });

    // Estimate overall portfolio risk
    const highRiskRatio = highRiskCount / totalAllocated;
    const medRiskRatio = medRiskCount / totalAllocated;
    let riskScore = 'Bajo';
    if (highRiskRatio > 0.40) {
      riskScore = 'Extremo 🔴';
    } else if (highRiskRatio > 0.15 || medRiskRatio > 0.50) {
      riskScore = 'Moderado 🟡';
    } else {
      riskScore = 'Conservador 🟢';
    }

    return {
      avgYtd: Math.round(weightedYtdSum),
      avg12m: Math.round(weighted12mSum),
      riskScore
    };
  };

  const stats = portfolioStats();

  return (
    <div className="glass-panel border border-white/5 rounded-3xl p-6 flex flex-col h-full text-[#fafafa]">
      {/* Title */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Icons.TrendingUp className="w-5 h-5 text-blue-400" />
          <h3 className="font-display font-medium text-sm tracking-widest uppercase">
            Simulador de Portafolio SpaceX
          </h3>
        </div>
        <button 
          onClick={handleReset}
          className="text-xs font-mono text-zinc-500 hover:text-rose-450 flex items-center gap-1 transition"
          title="Reiniciar simulador"
        >
          <Icons.RefreshCw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Overview stats metrics */}
      <div className="grid grid-cols-3 gap-3 mb-6 bg-zinc-900/50 p-4 rounded-2xl border border-white/5 font-mono text-center">
        <div>
          <span className="text-[9px] text-zinc-500 block uppercase mb-1 tracking-wider">Rendimiento YTD</span>
          <span className="text-sm font-bold text-emerald-400">
            {totalAllocated > 0 ? `+${stats.avgYtd}%` : '0%'}
          </span>
        </div>
        <div>
          <span className="text-[9px] text-zinc-500 block uppercase mb-1 tracking-wider">Rendimiento 12M</span>
          <span className="text-sm font-bold text-blue-400">
            {totalAllocated > 0 ? `+${stats.avg12m}%` : '0%'}
          </span>
        </div>
        <div>
          <span className="text-[9px] text-zinc-500 block uppercase mb-1 tracking-wider">Riesgo Global</span>
          <span className="text-xs font-bold text-zinc-300">
            {totalAllocated > 0 ? stats.riskScore : 'Ninguno'}
          </span>
        </div>
      </div>

      {/* Budget bars */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-400">Asignado: <span className="text-emerald-400 font-bold">${totalAllocated.toLocaleString()}</span> / $10,000 USD</span>
          <span className="text-zinc-400">Restante: <span className="text-blue-400 font-bold">${remainingBudget.toLocaleString()}</span></span>
        </div>
        <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-white/5">
          <motion.div 
            className="bg-blue-600 h-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"
            initial={{ width: 0 }}
            animate={{ width: `${(totalAllocated / initialBudget) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Scrollable investment allocation list */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 max-h-[360px]">
        {COMPANIES.map((company) => {
          const invested = allocations[company.id] || 0;
          return (
            <div 
              key={company.id}
              className="flex items-center justify-between glass-panel p-3 rounded-2xl border border-white/5 hover:border-zinc-800 transition-all"
            >
              <div className="flex flex-col gap-0.5 cursor-pointer max-w-[55%]" onClick={() => onSelectCompany(company)}>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-medium text-sm text-zinc-200 truncate">{company.name}</span>
                  <span className="font-mono text-[9px] px-1.5 py-0.5 bg-zinc-900 text-zinc-400 rounded-md border border-white/5 uppercase">{company.ticker}</span>
                </div>
                <span className="text-[10px] text-zinc-500 truncate">{company.role}</span>
              </div>

              {/* Action allocations controls */}
              <div className="flex items-center gap-2.5">
                <button
                  disabled={invested === 0}
                  onClick={() => handleAllocate(company.id, -500)}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg bg-zinc-900 border border-white/10 hover:bg-zinc-800 text-zinc-300 transition ${invested === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                >
                  <Icons.Minus className="w-3.5 h-3.5" />
                </button>
                
                <div className="w-16 text-center font-mono">
                  <span className={`text-xs font-bold ${invested > 0 ? 'text-emerald-400' : 'text-zinc-500'}`}>
                    ${invested.toLocaleString()}
                  </span>
                </div>

                <button
                  disabled={remainingBudget < 500}
                  onClick={() => handleAllocate(company.id, 500)}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg bg-zinc-900 border border-white/10 hover:bg-zinc-800 text-zinc-300 transition ${remainingBudget < 500 ? 'opacity-30 cursor-not-allowed' : ''}`}
                >
                  <Icons.Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer warning */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-start gap-2 text-[10px] text-zinc-500 font-sans">
        <Icons.Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <p>
          Este simulador es de carácter didáctico. Los rendimientos reflejan el crecimiento del estudio de SpaceX del 2026. No constituye asesoramiento financiero.
        </p>
      </div>
    </div>
  );
}
