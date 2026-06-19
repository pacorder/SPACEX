import React, { useState, useMemo } from 'react';
import { Company } from '../types';
import { COMPANIES, SECTORS } from '../data';
import * as Icons from 'lucide-react';

interface CompanyTableProps {
  onSelectCompany: (company: Company) => void;
  selectedCompanyId: string | null;
  activeSectorId: string | null;
  onSelectSector: (sectorId: string | null) => void;
}

type SortKey = 'name' | 'marketCap' | 'growthYtd' | 'priority';

export default function CompanyTable({
  onSelectCompany,
  selectedCompanyId,
  activeSectorId,
  onSelectSector
}: CompanyTableProps) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [ascending, setAscending] = useState(true);

  // Sorting & filtering logic
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setAscending(!ascending);
    } else {
      setSortKey(key);
      setAscending(true);
    }
  };

  const filteredAndSortedCompanies = useMemo(() => {
    let result = [...COMPANIES];

    // Filter by sector id if selected
    if (activeSectorId) {
      result = result.filter((c) => c.category === activeSectorId);
    }

    // Filter by search bar query
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.ticker.toLowerCase().includes(query) ||
          c.role.toLowerCase().includes(query)
      );
    }

    // Sort key
    result.sort((a, b) => {
      let valA: any = a[sortKey];
      let valB: any = b[sortKey];

      // Custom numeric sorting for market cap/growth values
      if (sortKey === 'marketCap') {
        const parseCap = (val: string) => {
          if (val.includes('T')) return parseFloat(val.replace(/[^\d.]/g, '')) * 1000;
          return parseFloat(val.replace(/[^\d.]/g, '')) || 0;
        };
        valA = parseCap(a.marketCap);
        valB = parseCap(b.marketCap);
      } else if (sortKey === 'growthYtd') {
        valA = parseFloat(a.growthYtd.replace('%', '').replace('+', '')) || 0;
        valB = parseFloat(b.growthYtd.replace('%', '').replace('+', '')) || 0;
      }

      if (valA < valB) return ascending ? -1 : 1;
      if (valA > valB) return ascending ? 1 : -1;
      return 0;
    });

    return result;
  }, [search, sortKey, ascending, activeSectorId]);

  return (
    <div className="glass-panel border border-white/5 rounded-3xl p-6 flex flex-col h-full text-[#fafafa]">
      {/* Search and Filters Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Icons.Sliders className="w-5 h-5 text-blue-400" />
          <h3 className="font-display font-medium text-sm tracking-widest uppercase">
            Socios del Ecosistema SpaceX
          </h3>
        </div>
        
        {/* Search Bar Input */}
        <div className="relative w-full md:w-64">
          <Icons.Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por Empresa o Ticker..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-950/75 border border-white/5 rounded-xl text-sm placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-sans transition text-zinc-300"
          />
        </div>
      </div>

      {/* Sector Category quick filters pills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <button
          onClick={() => onSelectSector(null)}
          className={`px-3 py-1 text-[10px] uppercase font-mono tracking-wider rounded-lg border transition ${
            !activeSectorId
              ? 'bg-blue-500/10 border-blue-500/50 text-blue-400 font-bold'
              : 'bg-zinc-900/40 border-white/5 text-zinc-400 hover:border-zinc-800 hover:text-zinc-300'
          }`}
        >
          TODOS LOS SECTORES
        </button>
        {SECTORS.map((sector) => {
          const isSelected = activeSectorId === sector.id;
          return (
            <button
              key={sector.id}
              onClick={() => onSelectSector(isSelected ? null : sector.id)}
              className={`px-3 py-1 text-[10px] uppercase font-mono tracking-wider rounded-lg border transition ${
                isSelected
                  ? 'bg-blue-500/10 border-blue-500/40 text-blue-400 font-bold'
                  : 'bg-zinc-900/40 border-white/5 text-zinc-400 hover:border-zinc-800 hover:text-zinc-300'
              }`}
            >
              {sector.name}
            </button>
          );
        })}
      </div>

      {/* Grid Company table */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-white/5 text-[10px] text-zinc-400 uppercase font-mono tracking-wider">
              <th className="py-2.5 px-3 cursor-pointer hover:text-zinc-200" onClick={() => handleSort('name')}>
                <div className="flex items-center gap-1">
                  <span>Empresa</span>
                  {sortKey === 'name' && (ascending ? <Icons.ArrowUpRight className="w-3 h-3 rotate-45" /> : <Icons.ArrowUpRight className="w-3 h-3 rotate-135" />)}
                </div>
              </th>
              <th className="py-2.5 px-3 cursor-pointer hover:text-zinc-200" onClick={() => handleSort('priority')}>
                <div className="flex items-center gap-1">
                  <span>Prioridad</span>
                  {sortKey === 'priority' && (ascending ? <Icons.ArrowUpRight className="w-3 h-3 rotate-45" /> : <Icons.ArrowUpRight className="w-3 h-3 rotate-135" />)}
                </div>
              </th>
              <th className="py-2.5 px-3 cursor-pointer hover:text-zinc-200" onClick={() => handleSort('marketCap')}>
                <div className="flex items-center gap-1">
                  <span>Market Cap</span>
                  {sortKey === 'marketCap' && (ascending ? <Icons.ArrowUpRight className="w-3 h-3 rotate-45" /> : <Icons.ArrowUpRight className="w-3 h-3 rotate-135" />)}
                </div>
              </th>
              <th className="py-2.5 px-3 cursor-pointer hover:text-zinc-200" onClick={() => handleSort('growthYtd')}>
                <div className="flex items-center gap-1">
                  <span>Rend. YTD</span>
                  {sortKey === 'growthYtd' && (ascending ? <Icons.ArrowUpRight className="w-3 h-3 rotate-45" /> : <Icons.ArrowUpRight className="w-3 h-3 rotate-135" />)}
                </div>
              </th>
              <th className="py-2.5 px-3">Función en SpaceX</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs">
            {filteredAndSortedCompanies.length > 0 ? (
              filteredAndSortedCompanies.map((company) => {
                const isSelected = selectedCompanyId === company.id;
                const priorityBadgeColor =
                  company.priority === 'Alta'
                    ? 'bg-rose-500/10 text-rose-400 border-rose-900/30'
                    : company.priority === 'Media'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-900/30'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-900/30';

                return (
                  <tr
                    key={company.id}
                    className={`hover:bg-zinc-900/30 transition-all cursor-pointer ${
                      isSelected ? 'bg-blue-500/5 border-l-2 border-blue-500' : ''
                    }`}
                    onClick={() => onSelectCompany(company)}
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-medium text-zinc-100">{company.name}</span>
                        <span className="font-mono text-[9px] px-1.5 py-0.5 bg-zinc-900 border border-white/5 rounded text-zinc-400 uppercase">{company.ticker}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 text-[9px] uppercase font-mono tracking-wider border rounded-md ${priorityBadgeColor}`}>
                        {company.priority}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-zinc-300">{company.marketCap}</td>
                    <td className="py-3 px-3 font-mono text-emerald-400 font-semibold">{company.growthYtd}</td>
                    <td className="py-3 px-3 text-zinc-400 max-w-xs truncate">{company.role}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-zinc-500 font-sans">
                  No se encontraron empresas que coincidan con la búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
