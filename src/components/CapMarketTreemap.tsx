import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Company } from '../types';
import { SECTORS } from '../data';
import * as Icons from 'lucide-react';

interface CapMarketTreemapProps {
  companies: Company[];
  onSelectCompany: (company: Company) => void;
  selectedCompanyId: string | null;
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

// Translate market cap string into billions of USD numeric representation for sizing
function parseMarketCapToValue(capStr: string): number {
  if (!capStr) return 1.0;
  const str = capStr.toUpperCase();
  if (str.includes('T')) {
    const num = parseFloat(str.replace(/[^0-9.]/g, ''));
    return num * 1000; // 1T = 1000B
  }
  if (str.includes('B')) {
    const num = parseFloat(str.replace(/[^0-9.]/g, ''));
    return num;
  }
  if (str.includes('M')) {
    const num = parseFloat(str.replace(/[^0-9.]/g, ''));
    return num / 1000; // 1M = 0.001B
  }
  return 1.5; // Default fallback
}

// Parse YTD growth string to get raw signed float value
function parseGrowthToNumber(growthStr: string): number {
  if (!growthStr) return 0;
  const cleanStr = growthStr.replace(/[^0-9.-]/g, '');
  const val = parseFloat(cleanStr);
  return isNaN(val) ? 0 : val;
}

// Get the high-fidelity background color representing the exact performance change interval
function getPerformanceColor(growthStr: string): string {
  const value = parseGrowthToNumber(growthStr);
  
  // High Gains
  if (value >= 120) return '#00ae55'; // Extremely bright neon performance green
  if (value >= 70) return '#009444';  // Solid bright expansion green
  if (value >= 30) return '#007137';  // Rich robust dark green
  if (value >= 10) return '#005929';  // Heavy positive dark green
  if (value > 2) return '#00421e';   // Subtle dynamic shadow green
  
  // Near flat
  if (value >= -2 && value <= 2) return '#374151'; // Cool metal flat slate gray

  // Losses
  if (value < -12) return '#d92c20';  // Deep negative warning crimson
  return '#9c2420';                   // Restrained caution red
}

// Get appropriate styled company vector logo or initials block
function getCompanyLogo(ticker: string, sizeClass = "w-5 h-5") {
  const t = ticker.toUpperCase();
  if (t === 'MTRN') return <Icons.Layers className={`${sizeClass} text-sky-400`} />;
  if (t === 'CRS') return <Icons.Activity className={`${sizeClass} text-cyan-400`} />;
  if (t === 'HWM') return <Icons.ShieldAlert className={`${sizeClass} text-violet-400`} />;
  if (t === 'STM') return <Icons.Cpu className={`${sizeClass} text-purple-300`} />;
  if (t === 'FTC') return <Icons.Radio className={`${sizeClass} text-pink-300`} />;
  if (t === 'RKLB') return <Icons.Rocket className={`${sizeClass} text-emerald-400`} />;
  if (t === 'LUNR') return <Icons.Orbit className={`${sizeClass} text-amber-300`} />;
  if (t === 'ASTS') return <Icons.Signal className={`${sizeClass} text-orange-400`} />;
  if (t === 'PL') return <Icons.Globe className={`${sizeClass} text-teal-400`} />;
  if (t === 'CEG') return <Icons.Zap className={`${sizeClass} text-yellow-300`} />;
  if (t === 'NEE') return <Icons.Sun className={`${sizeClass} text-green-400`} />;
  if (t === 'VST') return <Icons.Gauge className={`${sizeClass} text-zinc-300`} />;
  if (t === 'BA') return <Icons.Plane className={`${sizeClass} text-slate-100`} />;
  if (t === 'T') return <Icons.Wifi className={`${sizeClass} text-blue-400`} />;
  if (t === 'GOOG' || t === 'GOOGL') return <Icons.Chrome className={`${sizeClass} text-indigo-300`} />;
  if (t === 'ARKX') return <Icons.TrendingUp className={`${sizeClass} text-emerald-500`} />;
  if (t === 'ARKV') return <Icons.Compass className={`${sizeClass} text-pink-400`} />;
  
  return <div className="font-mono text-[9px] font-bold text-zinc-300 tracking-tighter">{ticker.substring(0, 2)}</div>;
}

// Slice-and-dice treemap algorithm optimized for boxy aspect ratios
function divideAndLayout(
  items: { id: string; value: number }[],
  rect: Rect,
  isVertical: boolean
): { id: string; rect: Rect }[] {
  if (items.length === 0) return [];
  if (items.length === 1) {
    return [{ id: items[0].id, rect }];
  }

  const totalValue = items.reduce((sum, item) => sum + item.value, 0);
  if (totalValue <= 0) {
    const length = items.length;
    const step = isVertical ? rect.h / length : rect.w / length;
    return items.map((item, idx) => ({
      id: item.id,
      rect: {
        x: isVertical ? rect.x : rect.x + idx * step,
        y: isVertical ? rect.y + idx * step : rect.y,
        w: isVertical ? rect.w : step,
        h: isVertical ? step : rect.h,
      },
    }));
  }

  let splitIndex = 0;
  let minDiff = Infinity;
  let currentSum = 0;
  for (let i = 0; i < items.length - 1; i++) {
    currentSum += items[i].value;
    const diff = Math.abs(currentSum - (totalValue - currentSum));
    if (diff < minDiff) {
      minDiff = diff;
      splitIndex = i;
    }
  }

  const leftSide = items.slice(0, splitIndex + 1);
  const rightSide = items.slice(splitIndex + 1);

  const leftValueSum = leftSide.reduce((sum, item) => sum + item.value, 0);
  const splitRatio = leftValueSum / totalValue;

  let leftRect: Rect;
  let rightRect: Rect;

  if (isVertical) {
    const splitH = rect.h * splitRatio;
    leftRect = { x: rect.x, y: rect.y, w: rect.w, h: splitH };
    rightRect = { x: rect.x, y: rect.y + splitH, w: rect.w, h: rect.h - splitH };
  } else {
    const splitW = rect.w * splitRatio;
    leftRect = { x: rect.x, y: rect.y, w: splitW, h: rect.h };
    rightRect = { x: rect.x + splitW, y: rect.y, w: rect.w - splitW, h: rect.h };
  }

  const nextIsVertical = !isVertical;

  return [
    ...divideAndLayout(leftSide, leftRect, nextIsVertical),
    ...divideAndLayout(rightSide, rightRect, nextIsVertical),
  ];
}

export default function CapMarketTreemap({
  companies,
  onSelectCompany,
  selectedCompanyId
}: CapMarketTreemapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scalingMode, setScalingMode] = useState<'ponderado' | 'real'>('ponderado');
  const [activeSectorId, setActiveSectorId] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 480 });
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: Math.max(entry.contentRect.width, 300),
          height: Math.max(entry.contentRect.height, 420)
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredCompanies = useMemo(() => {
    if (!activeSectorId) return companies;
    return companies.filter(c => c.category === activeSectorId);
  }, [companies, activeSectorId]);

  const treemapLayout = useMemo(() => {
    if (filteredCompanies.length === 0) return [];

    const rawItems = filteredCompanies.map(c => {
      const realValue = parseMarketCapToValue(c.marketCap);
      let mathValue = realValue;

      if (scalingMode === 'ponderado') {
        mathValue = Math.log2(realValue + 1.5) * 14 + 12;
      }

      return {
        id: c.id,
        value: mathValue,
        realValue
      };
    });

    rawItems.sort((a, b) => b.value - a.value);

    // Grid spacing matches the pixel border gap of the screenshot
    const padding = 1.5;
    const initialRect: Rect = {
      x: padding,
      y: padding,
      w: dimensions.width - padding * 2,
      h: dimensions.height - padding * 2
    };

    const calculatedItems = divideAndLayout(rawItems, initialRect, dimensions.width < dimensions.height);

    return calculatedItems.map((calculated) => {
      const company = companies.find((c) => c.id === calculated.id)!;
      const sector = SECTORS.find((s) => s.id === company.category)!;

      return {
        company,
        sector,
        rect: calculated.rect
      };
    });
  }, [filteredCompanies, companies, scalingMode, dimensions]);

  return (
    <div className="glass-panel border border-white/5 rounded-3xl p-6 flex flex-col h-full text-[#fafafa] relative overflow-hidden">
      
      {/* Trading heatmap navigation breadcrumb - Exactly matched to the screenshot's left corner structure */}
      <div className="flex items-center justify-between gap-4 mb-4 pb-2">
        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
          <button 
            onClick={() => setActiveSectorId(null)}
            className="hover:text-white transition duration-150 font-medium flex items-center gap-1"
          >
            <Icons.ChevronLeft className="w-4 h-4 text-zinc-500" />
            <span>Todo</span>
          </button>
          <span className="text-zinc-600 font-mono">/</span>
          <span className="text-zinc-100 font-semibold font-mono tracking-wide">
            {activeSectorId 
              ? SECTORS.find(s => s.id === activeSectorId)?.name 
              : 'Ecosistema Global SpaceX'
            }
          </span>
        </div>

        {/* Action Toggle controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setScalingMode('ponderado')}
              className={`px-3 py-1 rounded-lg text-[9px] font-mono tracking-wider transition ${
                scalingMode === 'ponderado'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-zinc-500 hover:text-zinc-350'
              }`}
            >
              VISTA BALANCEADA (LECTURA)
            </button>
            <button
              onClick={() => setScalingMode('real')}
              className={`px-3 py-1 rounded-lg text-[9px] font-mono tracking-wider transition ${
                scalingMode === 'real'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-zinc-500 hover:text-zinc-350'
              }`}
            >
              ESCALA REAL
            </button>
          </div>
        </div>
      </div>

      {/* Selector of Sub-Sectors with dynamic indicators */}
      <div className="flex flex-wrap gap-1.5 mb-4 max-h-[80px] overflow-y-auto pr-1">
        <button
          onClick={() => setActiveSectorId(null)}
          className={`px-3 py-1 text-[9px] uppercase font-mono tracking-widest rounded-lg border transition duration-150 ${
            !activeSectorId
              ? 'bg-zinc-800 border-zinc-700 text-white font-bold'
              : 'bg-zinc-950/65 border-white/5 text-zinc-400 hover:border-zinc-800 hover:text-zinc-200'
          }`}
        >
          TODOS LOS PROVEEDORES
        </button>
        {SECTORS.map((sector) => {
          const isSelected = activeSectorId === sector.id;
          return (
            <button
              key={sector.id}
              onClick={() => setActiveSectorId(isSelected ? null : sector.id)}
              className={`px-3 py-1 text-[9px] uppercase font-mono tracking-widest rounded-lg border transition duration-150 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-zinc-800 border-zinc-700 text-white font-bold'
                  : 'bg-zinc-950/65 border-white/5 text-zinc-400 hover:border-zinc-800 hover:text-zinc-200'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sector.color }} />
              {sector.name}
            </button>
          );
        })}
      </div>

      {/* Main Heatmap Workspace Container */}
      <div className="flex-1 w-full min-h-[440px] relative mt-1" ref={containerRef}>
        <div 
          className="absolute inset-0 select-none overflow-hidden rounded-xl bg-zinc-950 border border-zinc-900"
          style={{ width: dimensions.width, height: dimensions.height }}
        >
          {/* Zoom floating controls - matches the overlay (+/-) on the right from the screenshot */}
          <div className="absolute right-4 bottom-4 z-40 flex flex-col bg-zinc-950/90 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <button 
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.1, 1.4))}
              className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 border-b border-white/5 active:bg-zinc-800 transition"
              title="Ajustar Zoom +"
            >
              <Icons.Plus className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setZoomLevel(1)}
              className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 border-b border-white/5 active:bg-zinc-800 transition text-[9px] font-mono"
              title="Restaurar escala"
            >
              100%
            </button>
            <button 
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.1, 0.75))}
              className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 active:bg-zinc-800 transition"
              title="Ajustar Zoom -"
            >
              <Icons.Minus className="w-4 h-4" />
            </button>
          </div>

          {/* Scale Legend reference bar */}
          <div className="absolute left-4 bottom-4 z-40 bg-zinc-950/85 border border-white/5 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-xl">
            <span className="text-[8px] font-mono text-rose-400 font-bold">-10%</span>
            <div className="w-24 h-2 rounded bg-gradient-to-r from-red-700 via-zinc-700 to-emerald-600" />
            <span className="text-[8px] font-mono text-emerald-400 font-bold">+180% YTD</span>
          </div>

          <AnimatePresence mode="popLayout">
            <div 
              className="w-full h-full relative transition-transform duration-300 origin-center" 
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {treemapLayout.map(({ company, sector, rect }) => {
                const isSelected = selectedCompanyId === company.id;
                
                const widthVal = Math.max(2, rect.w);
                const heightVal = Math.max(2, rect.h);
                const leftVal = rect.x;
                const topVal = rect.y;

                // Color based on the precise stock-heat performance scale index
                const tileBgColor = getPerformanceColor(company.growthYtd);

                return (
                  <motion.div
                    key={`stock-tile-${company.id}`}
                    layoutId={`stock-tile-${company.id}`}
                    className={`absolute overflow-hidden cursor-pointer flex flex-col justify-between items-center transition-all ${
                      isSelected 
                        ? 'ring-4 ring-offset-2 ring-offset-black ring-blue-500 z-30 shadow-[0_0_24px_rgba(59,130,246,0.6)]' 
                        : 'hover:opacity-95 border-b border-r border-[#000000a6]'
                    }`}
                    style={{
                      left: leftVal,
                      top: topVal,
                      width: widthVal,
                      height: heightVal,
                      backgroundColor: tileBgColor
                    }}
                    onClick={() => onSelectCompany(company)}
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.98, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                  >
                    {/* Tiny sector color bar on the very top edge */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1.5 opacity-65"
                      style={{ backgroundColor: sector.color }}
                    />

                    {/* Centered content block structured exactly like the stock heatmap image */}
                    <div className="flex-1 w-full flex flex-col items-center justify-center p-2 text-center gap-1.5">
                      
                      {/* Logo badge overlay - visible if box is large enough */}
                      {widthVal > 90 && heightVal > 85 && (
                        <div className="w-8 h-8 rounded-full bg-black/35 flex items-center justify-center border border-white/5 shrink-0 shadow-lg">
                          {getCompanyLogo(company.ticker, "w-4.5 h-4.5")}
                        </div>
                      )}

                      {/* Large prominent Stock Ticker text */}
                      <span className={`font-sans font-bold tracking-tight text-white leading-none ${
                        widthVal > 140 ? 'text-lg lg:text-xl' : widthVal > 70 ? 'text-sm' : 'text-[10px]'
                      }`}>
                        {company.ticker}
                      </span>

                      {/* Performance percentage delta label */}
                      <span className={`font-sans font-semibold tracking-wide block leading-none text-white/90 ${
                        widthVal > 140 ? 'text-sm lg:text-base' : 'text-[10px]'
                      }`}>
                        {company.growthYtd}
                      </span>
                    </div>

                    {/* Additional Details (Company Name / Sector label) on bottom margin if space permits */}
                    {widthVal > 150 && heightVal > 120 && (
                      <div className="w-full bg-black/15 px-3 py-1.5 flex justify-between items-center border-t border-white/5 z-10">
                        <span className="text-[9px] font-medium text-zinc-300 truncate tracking-wide max-w-[65%]">
                          {company.name}
                        </span>
                        <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest shrink-0">
                          {company.marketCap}
                        </span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
