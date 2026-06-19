import React from 'react';
import * as Icons from 'lucide-react';

interface MineralRow {
  mineral: string;
  use: string;
  company: string;
  ticker: string;
  priority: string;
}

const MINERALS_DATA: MineralRow[] = [
  {
    mineral: 'Niobio',
    use: 'Motores Raptor (resistencia térmica extrema, toberas de escape)',
    company: 'Materion Corp / NioCorp',
    ticker: 'MTRN / NB',
    priority: 'Crítico'
  },
  {
    mineral: 'Titanio',
    use: 'Estructura rígida de cohetes, tanques de combustible y Starship',
    company: 'IperionX / Howmet',
    ticker: 'IPX / HWM',
    priority: 'Estratégico'
  },
  {
    mineral: 'Tierras raras',
    use: 'Electrónica de navegación, sensores de precisión, actuadores de timón',
    company: 'IperionX',
    ticker: 'IPX',
    priority: 'Crítico'
  },
  {
    mineral: 'Escanio',
    use: 'Aleaciones de aluminio superligeras en fuselaje de lanzadores',
    company: 'NioCorp Developments',
    ticker: 'NB',
    priority: 'Frontera'
  },
  {
    mineral: 'Zirconio',
    use: 'Recubrimientos térmicos protectores contra reingreso atmosférico',
    company: 'IperionX',
    ticker: 'IPX',
    priority: 'Estratégico'
  }
];

export default function MineralsTable() {
  return (
    <div className="glass-panel border border-white/5 rounded-3xl p-6 flex flex-col h-full text-[#fafafa]">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
        <Icons.Pickaxe className="w-5 h-5 text-blue-400" />
        <h3 className="font-display font-medium text-sm tracking-widest uppercase">
          Minerales Críticos & Commodities
        </h3>
      </div>

      <p className="text-xs text-zinc-400 mb-6 leading-relaxed font-sans">
        El cuello de botella de la exploración interplanetaria reside en la disponibilidad de metales exóticos que soporten condiciones extremas de radiación y fusión térmica.
      </p>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-white/5 text-[10px] text-zinc-400 uppercase font-mono tracking-wider">
              <th className="py-2.5 px-3">Mineral</th>
              <th className="py-2.5 px-3">Uso Aeroespacial (SpaceX)</th>
              <th className="py-2.5 px-3">Empresa Proveedora</th>
              <th className="py-2.5 px-3">Ticker</th>
              <th className="py-2.5 px-3 text-right">Estatus Norteamericano</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs text-zinc-300">
            {MINERALS_DATA.map((row, index) => {
              const statusColor = 
                row.priority === 'Crítico' 
                  ? 'bg-rose-500/10 text-rose-400 border-rose-900/30' 
                  : row.priority === 'Estratégico'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-900/30'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-900/30';

              return (
                <tr key={index} className="hover:bg-zinc-900/20 transition-all">
                  <td className="py-3 px-3 font-display font-medium text-[#fafafa]">{row.mineral}</td>
                  <td className="py-3 px-3 text-zinc-400 max-w-xs leading-normal">{row.use}</td>
                  <td className="py-3 px-3 text-zinc-400">{row.company}</td>
                  <td className="py-3 px-3 font-mono text-blue-400 font-semibold">{row.ticker}</td>
                  <td className="py-3 px-3 text-right">
                    <span className={`px-2 py-0.5 text-[9px] uppercase font-mono tracking-wider border rounded-md ${statusColor}`}>
                      {row.priority}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
