import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Company, Sector } from '../types';
import { COMPANIES, SECTORS, SUPPLIER_RELATIONS } from '../data';
import * as Icons from 'lucide-react';

interface NetworkGraphProps {
  onSelectCompany: (company: Company) => void;
  selectedCompanyId: string | null;
  activeSectorId: string | null;
  onSelectSector: (sectorId: string | null) => void;
}

export default function NetworkGraph({
  onSelectCompany,
  selectedCompanyId,
  activeSectorId,
  onSelectSector
}: NetworkGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showB2BRelations, setShowB2BRelations] = useState(true);

  // Handle resizing of the container securely
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: Math.max(entry.contentRect.width, 500),
          height: Math.max(entry.contentRect.height, 500)
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Recenter views
  const resetZoomPan = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Helper to get raw numeric value for market cap in billions of USD
  const getCompanyMarketCapValue = (capStr: string): number => {
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
    return 1.5; // Default for funds
  };

  // Compute logarithmic circle node radius based on Market Cap (range: 6.5px to 20px)
  const getRadiusForMarketCap = (capStr: string): number => {
    const capValue = getCompanyMarketCapValue(capStr);
    const calculated = Math.log2(capValue + 1.2) * 1.8 + 6;
    return Math.max(6.5, Math.min(20, calculated));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isInteractive = 
      target.tagName === 'circle' || 
      target.tagName === 'text' || 
      target.tagName === 'path' || 
      target.closest('.btn-interactive') ||
      target.closest('button');
      
    if (isInteractive) {
      return; // don't drag if interacting with buttons, nodes, text labels, or conduits
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Pre-calculate beautiful orbital coords around central SpaceX
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;

  // Let's place the 7 sectors in a circular orbit around SpaceX
  const sectorRadius = Math.min(dimensions.width, dimensions.height) * 0.22;
  const sectorPositions = SECTORS.reduce((acc, sector, index) => {
    const angle = (index * 2 * Math.PI) / SECTORS.length - Math.PI / 2;
    acc[sector.id] = {
      x: centerX + Math.cos(angle) * sectorRadius,
      y: centerY + Math.sin(angle) * sectorRadius,
      angle
    };
    return acc;
  }, {} as Record<string, { x: number; y: number; angle: number }>);

  // Group companies by category/sector
  const companiesBySector = COMPANIES.reduce((acc, company) => {
    if (!acc[company.category]) {
      acc[company.category] = [];
    }
    acc[company.category].push(company);
    return acc;
  }, {} as Record<string, Company[]>);

  // Define position of each individual company sphere
  const companyPositions: Record<string, { x: number; y: number }> = {};
  
  COMPANIES.forEach((company) => {
    const sectorPos = sectorPositions[company.category];
    if (!sectorPos) return;

    // Filter siblings in this category
    const siblings = COMPANIES.filter(c => company.category === c.category);
    const sibIndex = siblings.findIndex(c => c.id === company.id);

    // Orbit companies around the sector sphere
    const offsetRadius = 65; // Distance from sector node
    const baseAngle = sectorPos.angle;
    const spreadAngle = Math.PI / 2.2; 
    let angleOffset = 0;
    if (siblings.length > 1) {
      angleOffset = (sibIndex - (siblings.length - 1) / 2) * (spreadAngle / siblings.length);
    }
    const finalAngle = baseAngle + angleOffset + Math.PI; // push outwards

    companyPositions[company.id] = {
      x: sectorPos.x + Math.cos(finalAngle) * offsetRadius,
      y: sectorPos.y + Math.sin(finalAngle) * offsetRadius
    };
  });

  return (
    <div 
      className="relative w-full h-full glass-panel border border-white/5 rounded-3xl overflow-hidden select-none cursor-grab active:cursor-grabbing"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Starry/Grid Layer */}
      <div className="absolute inset-0 bg-[#09090b] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.06),rgba(0,0,0,0))]" />
      <div className="absolute inset-0" style={{ 
        backgroundImage: 'radial-gradient(rgba(240, 240, 240, 0.03) 1px, transparent 1px)', 
        backgroundSize: '24px 24px' 
      }} />

      {/* Top Banner Control bar */}
      <div className="absolute top-4 left-6 z-10 flex flex-col gap-1 pointer-events-none">
        <h3 className="font-display font-bold text-lg tracking-wider text-slate-100 uppercase">
          Ecosistema Tecnológico de SpaceX
        </h3>
        <p className="text-xs text-zinc-400 font-sans">
          Arrastra el mapa · Presiona en cualquier nodo para explorar interacciones y datos clave.
        </p>
      </div>

      {/* Control Buttons */}
      <div className="absolute top-4 right-6 z-10 flex items-center gap-2">
        <button 
          onClick={() => setZoom(prev => Math.min(prev + 0.15, 2))}
          className="btn-interactive w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-blue-400 transition"
          title="Acercar"
        >
          <Icons.Plus className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setZoom(prev => Math.max(prev - 0.15, 0.5))}
          className="btn-interactive w-9 h-9 flex items-center justify-center rounded-xl bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-blue-400 transition"
          title="Alejar"
        >
          <Icons.Minus className="w-5 h-5" />
        </button>
        <button 
          onClick={resetZoomPan}
          className="btn-interactive px-3 h-9 flex items-center gap-1.5 rounded-xl bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-blue-400 text-xs font-mono transition"
          title="Restablecer"
        >
          <Icons.Compass className="w-4 h-4" />
          <span>Centrar</span>
        </button>

        <button 
          onClick={() => setShowB2BRelations(prev => !prev)}
          className={`btn-interactive px-3.5 h-9 flex items-center gap-2 rounded-xl border text-xs font-mono transition ${
            showB2BRelations 
              ? 'bg-blue-600/10 border-blue-500 text-blue-400 font-bold' 
              : 'bg-zinc-900 border-white/5 text-zinc-400 hover:text-zinc-200'
          }`}
          title="Alternar conexiones entre proveedores (B2B)"
        >
          <Icons.Share2 className="w-4 h-4" />
          <span>Suministro B2B: {showB2BRelations ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Legend & Stats Overlay */}
      <div className="absolute bottom-4 left-6 z-10 hidden md:flex items-center gap-6 glass-panel py-2.5 px-4 rounded-xl border border-white/5 text-xs text-zinc-300">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
          <span>Prioridad Alta</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          <span>Prioridad Media</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span>Prioridad Especulativa</span>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <svg 
        className="w-full h-full"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        {/* SVG Marker Definitions for beautiful glowing curved arrows */}
        <defs>
          <filter id="glow-spacex" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-node" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Glowing Arrow markers dynamically colored */}
          {SECTORS.map((sector) => (
            <marker
              key={`arrow-${sector.id}`}
              id={`arrow-${sector.id}`}
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill={sector.color} />
            </marker>
          ))}
        </defs>

        {/* Orbit Grid guides circles */}
        <circle 
          cx={centerX} 
          cy={centerY} 
          r={sectorRadius} 
          fill="none" 
          stroke="rgba(59, 130, 246, 0.08)" 
          strokeWidth="1.5" 
          strokeDasharray="4 6" 
        />

        {/* INTERACTION CONNECTIONS (Bezier curves with speed currents flowing into SpaceX) */}
        {SECTORS.map((sector) => {
          const sectorPos = sectorPositions[sector.id];
          const isDimmed = activeSectorId && activeSectorId !== sector.id;

          // Curve equation: M x1 y1 Q cx cy x2 y2
          // Control point is pulled slightly towards the center of space to create beautiful curvature orbits
          const ctrlX = (centerX + sectorPos.x) / 2 + (sectorPos.y - centerY) * 0.12;
          const ctrlY = (centerY + sectorPos.y) / 2 + (centerX - sectorPos.x) * 0.12;

          return (
            <g key={`link-sector-${sector.id}`} className="transition-opacity duration-300" style={{ opacity: isDimmed ? 0.15 : 1 }}>
              {/* Backing structural conduit */}
              <path
                d={`M ${sectorPos.x} ${sectorPos.y} Q ${ctrlX} ${ctrlY} ${centerX} ${centerY}`}
                fill="none"
                stroke="rgba(255, 255, 255, 0.02)"
                strokeWidth="2.5"
              />
              
              {/* Glowing animated pulse wire */}
              <path
                d={`M ${sectorPos.x} ${sectorPos.y} Q ${ctrlX} ${ctrlY} ${centerX} ${centerY}`}
                fill="none"
                stroke={sector.color}
                strokeWidth="1.5"
                strokeOpacity="0.45"
                markerEnd={`url(#arrow-${sector.id})`}
                strokeDasharray="8 12"
                style={{
                  strokeDashoffset: hoveredNode === sector.id ? -100 : 0,
                  transition: 'stroke-dashoffset 4s linear'
                }}
              />
            </g>
          );
        })}

        {/* Links from companies to their respective parent sectors */}
        {COMPANIES.map((company) => {
          const sectorPos = sectorPositions[company.category];
          const compPos = companyPositions[company.id];
          const parentSector = SECTORS.find(s => s.id === company.category);
          if (!sectorPos || !compPos || !parentSector) return null;

          const isDimmed = (activeSectorId && activeSectorId !== company.category) ||
                           (selectedCompanyId && selectedCompanyId !== company.id && hoveredNode !== company.id);

          return (
            <g key={`link-comp-${company.id}`} className="transition-opacity duration-300" style={{ opacity: isDimmed ? 0.1 : 0.8 }}>
              {/* Elegant thin laser guides */}
              <line
                x1={compPos.x}
                y1={compPos.y}
                x2={sectorPos.x}
                y2={sectorPos.y}
                stroke={parentSector.color}
                strokeWidth="1"
                strokeDasharray="3 3"
                strokeOpacity="0.5"
              />
            </g>
          );
        })}

        {/* INTERCOMPANY B2B SUPPLY-CHAIN CONNECTIONS */}
        {showB2BRelations && SUPPLIER_RELATIONS.map((rel, idx) => {
          const pFrom = companyPositions[rel.fromId];
          const pTo = companyPositions[rel.toId];
          if (!pFrom || !pTo) return null;

          const isHighlighted = 
            selectedCompanyId === rel.fromId || 
            selectedCompanyId === rel.toId ||
            hoveredNode === rel.fromId || 
            hoveredNode === rel.toId;

          const isAnyActive = !!selectedCompanyId || !!hoveredNode;
          const isDimmed = isAnyActive && !isHighlighted;

          // Compute a curved Bezier offset
          const midX = (pFrom.x + pTo.x) / 2;
          const midY = (pFrom.y + pTo.y) / 2;
          const dx = pTo.x - pFrom.x;
          const dy = pTo.y - pFrom.y;
          
          // Bend the lines elegantly based on relative offsets
          const percent = 0.16;
          const ctrlX = midX - dy * percent;
          const ctrlY = midY + dx * percent;

          return (
            <g 
              key={`b2b-link-${idx}`} 
              className="transition-opacity duration-300"
              style={{ opacity: isDimmed ? 0.04 : isHighlighted ? 1.0 : 0.35 }}
            >
              {/* Visual curve track B2B */}
              <path
                d={`M ${pFrom.x} ${pFrom.y} Q ${ctrlX} ${ctrlY} ${pTo.x} ${pTo.y}`}
                fill="none"
                stroke={isHighlighted ? '#fbbf24' : 'rgba(245, 158, 11, 0.4)'}
                strokeWidth={isHighlighted ? 2.2 : 1.2}
                strokeDasharray={isHighlighted ? '0' : '4 3'}
              />

              {/* Animated high-fidelity glowing flows along curves */}
              {isHighlighted && (
                <path
                  d={`M ${pFrom.x} ${pFrom.y} Q ${ctrlX} ${ctrlY} ${pTo.x} ${pTo.y}`}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="2.2"
                  strokeDasharray="6 12"
                  className="flow-active"
                />
              )}

              {/* Dynamic supply value info/label overlay popup and positioning */}
              {isHighlighted && (
                <foreignObject
                  x={ctrlX - 65}
                  y={ctrlY - 14}
                  width="130"
                  height="34"
                  className="overflow-visible pointer-events-none select-none"
                >
                  <div className="bg-zinc-950/95 border border-amber-500/50 text-[8.5px] font-mono text-amber-400 px-2 py-0.5 rounded shadow-[0_0_12px_rgba(245,158,11,0.2)] text-center leading-tight backdrop-blur">
                    <span className="font-bold uppercase block text-[8px] tracking-wider text-amber-500">{rel.type}</span>
                    <span className="text-zinc-300 block truncate">{rel.description}</span>
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}

        {/* SECTORS NODES (Large Orbiting Spheres) */}
        {SECTORS.map((sector) => {
          const pos = sectorPositions[sector.id];
          const isSelected = activeSectorId === sector.id;
          const isDimmed = activeSectorId && !isSelected;
          const isHovered = hoveredNode === sector.id;

          return (
            <g 
              key={`node-sector-${sector.id}`} 
              className="cursor-pointer transition-opacity duration-350"
              style={{ opacity: isDimmed ? 0.25 : 1 }}
              onClick={() => onSelectSector(isSelected ? null : sector.id)}
              onMouseEnter={() => setHoveredNode(sector.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Outer decorative targeting rings */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={24}
                fill="none"
                stroke={sector.color}
                strokeWidth="1"
                strokeOpacity={isHovered || isSelected ? '0.6' : '0.15'}
                strokeDasharray="4 3"
                className="transition-all duration-300"
              />
              
              {/* Main sector orb with custom shade */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={16}
                fill={`url(#grad-sector-${sector.id})`}
                filter="url(#glow-node)"
                className="transition-all duration-300"
              />

              {/* Radial gradient per sector element */}
              <defs>
                <radialGradient id={`grad-sector-${sector.id}`} cx="35%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                  <stop offset="30%" stopColor={sector.color} />
                  <stop offset="100%" stopColor="#09090b" />
                </radialGradient>
              </defs>

              {/* Dynamic text labels for sectors */}
              <text
                x={pos.x}
                y={pos.y - 28}
                textAnchor="middle"
                className="font-display font-medium text-[10px] tracking-wider fill-zinc-200"
              >
                {sector.name.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* COMPANIES NODES (Glowing spheres orbiting their sector, sized by market capitalization) */}
        {COMPANIES.map((company) => {
          const pos = companyPositions[company.id];
          const sector = SECTORS.find(s => s.id === company.category);
          if (!pos || !sector) return null;

          const isSelected = selectedCompanyId === company.id;
          const isDimmed = (activeSectorId && activeSectorId !== company.category) ||
                           (selectedCompanyId && !isSelected);
          const isHovered = hoveredNode === company.id;

          // Priority-based glow color
          const priorityColor = company.priority === 'Alta' ? '#f43f5e' : company.priority === 'Media' ? '#eab308' : '#10b981';

          // Call our new dynamic physical size radius
          const nodeRadius = getRadiusForMarketCap(company.marketCap);

          return (
            <g
              key={`node-comp-${company.id}`}
              className="cursor-pointer transition-opacity duration-350"
              style={{ opacity: isDimmed ? 0.25 : 1 }}
              onClick={() => onSelectCompany(company)}
              onMouseEnter={() => setHoveredNode(company.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Invisible touch/click generous hit-area buffer for extremely high precision and easy selection */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={Math.max(22, nodeRadius + 12)}
                fill="transparent"
                className="cursor-pointer"
              />

              {/* Glowing anchor aura when hovered/selected */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isHovered || isSelected ? nodeRadius + 6 : nodeRadius + 3}
                fill="none"
                stroke={priorityColor}
                strokeWidth="1.5"
                strokeOpacity={isHovered || isSelected ? '0.85' : '0'}
                className="transition-all duration-300"
              />

              {/* Company glow core orb */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={nodeRadius}
                fill={`url(#grad-comp-${company.id})`}
                filter={isHovered || isSelected ? 'url(#glow-node)' : undefined}
                className="transition-all duration-300"
              />

              <defs>
                <radialGradient id={`grad-comp-${company.id}`} cx="35%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                  <stop offset="40%" stopColor={sector.color} />
                  <stop offset="100%" stopColor="#09090b" />
                </radialGradient>
              </defs>

              {/* Short Ticker labels, placed dynamically relative to node size */}
              <text
                x={pos.x}
                y={pos.y + nodeRadius + 11}
                textAnchor="middle"
                className="font-mono text-[9px] font-medium tracking-wide fill-zinc-400 select-none pointer-events-none"
              >
                {company.ticker}
              </text>
            </g>
          );
        })}

        {/* CENTRAL MASSIVE NODE: SPACEX PLANET */}
        <g 
          className="cursor-pointer"
          onMouseEnter={() => setHoveredNode('spacex')}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={resetZoomPan}
        >
          {/* Animated rotating tech rings */}
          <circle
            cx={centerX}
            cy={centerY}
            r={54}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="0.75"
            strokeOpacity="0.2"
            strokeDasharray="14 10"
            className="animate-[spin_100s_linear_infinite]"
          />
          <circle
            cx={centerX}
            cy={centerY}
            r={48}
            fill="none"
            stroke="#a855f7"
            strokeWidth="1"
            strokeOpacity="0.3"
            strokeDasharray="5 78"
            className="animate-[spin_25s_linear_infinite_reverse]"
          />

          {/* Central Sphere Halo */}
          <circle
            cx={centerX}
            cy={centerY}
            r={36}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeOpacity="0.1"
            filter="url(#glow-spacex)"
          />

          {/* Central Sphere */}
          <circle
            cx={centerX}
            cy={centerY}
            r={32}
            className="pulsing-star"
            fill="url(#spacex-radial-gradient)"
          />

          <defs>
            <radialGradient id="spacex-radial-gradient" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="25%" stopColor="#2563eb" />
              <stop offset="70%" stopColor="#18181b" />
              <stop offset="100%" stopColor="#09090b" />
            </radialGradient>
          </defs>

          {/* Core Labels */}
          <text
            x={centerX}
            y={centerY - 2}
            textAnchor="middle"
            className="font-display font-medium tracking-widest text-[11px] fill-slate-100 uppercase pointer-events-none"
          >
            SPACEX
          </text>
          <text
            x={centerX}
            y={centerY + 9}
            textAnchor="middle"
            className="font-mono text-[7px] font-bold tracking-wider fill-blue-400 pointer-events-none"
          >
            NASDAQ: SPCX
          </text>
        </g>
      </svg>
    </div>
  );
}
