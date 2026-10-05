import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import MatchCard from '../components/matching/MatchCard';
import { 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  Filter, 
  Recycle, 
  ArrowRight, 
  Info,
  Plus 
} from 'lucide-react';

export default function MatchPage({ onOpenAddModal }) {
  const { rankedProjects, components, navigate, addMissingBuzzerForDemo } = useApp();

  const [filterTier, setFilterTier] = useState('all'); // 'all', 'ready', 'almost', 'needs-more'

  const filteredProjects = useMemo(() => {
    if (filterTier === 'ready') {
      return rankedProjects.filter((p) => p.match.score >= 90);
    } else if (filterTier === 'almost') {
      return rankedProjects.filter((p) => p.match.score >= 70 && p.match.score < 90);
    } else if (filterTier === 'needs-more') {
      return rankedProjects.filter((p) => p.match.score >= 40 && p.match.score < 70);
    }
    return rankedProjects;
  }, [rankedProjects, filterTier]);

  const readyCount = rankedProjects.filter((p) => p.match.score >= 90).length;
  const almostCount = rankedProjects.filter((p) => p.match.score >= 70 && p.match.score < 90).length;
  const needsMoreCount = rankedProjects.filter((p) => p.match.score >= 40 && p.match.score < 70).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Title & Introduction */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Deterministic Scoring Algorithm (70% Req / 20% Opt / 10% Qty)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202020] tracking-tight">
            What Can I Build?
          </h1>
          <p className="text-sm text-[#6B6B6B] mt-1 max-w-2xl font-normal">
            Your components are the starting point. Let's find their next life. We evaluated your {components.length} vault components against {rankedProjects.length} open hardware blueprints.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={addMissingBuzzerForDemo}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#FFF1E6] hover:bg-orange-900 border border-orange-500/40 text-orange-300 text-xs font-semibold transition-all shadow-sm"
            title="Step 5: Add Buzzer to instantly make Smart Parking 100% build-ready"
          >
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>1-Click Demo: Unlock 100%</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 text-xs font-bold shadow-lg shadow-orange-500/20 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ Add Component</span>
          </button>
        </div>
      </div>

      {/* Current Active Inventory Strip */}
      <div className="p-4 rounded-2xl bg-white/70 border border-[#EDEDED]">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-orange-400" />
            <span>Active Vault Input Baseline ({components.length} components)</span>
          </span>
          <button
            onClick={() => navigate('/components')}
            className="text-[11px] text-orange-400 hover:text-orange-300 font-semibold"
          >
            Edit Vault →
          </button>
        </div>

        {/* Horizontal scroll of pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {components.map((c) => (
            <span
              key={c.id}
              className="px-2.5 py-1 rounded-lg bg-[#FFFDF9] border border-[#EDEDED] text-[#6B6B6B] whitespace-nowrap font-mono flex items-center gap-1.5 shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-xl bg-orange-400"></span>
              <span>{c.name}</span>
              <span className="text-[#6B6B6B] text-[10px]">({c.quantity}x)</span>
            </span>
          ))}
        </div>
      </div>

      {/* Matching Tier Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#EDEDED]">
        <button
          onClick={() => setFilterTier('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
            filterTier === 'all'
              ? 'bg-white text-[#202020] border border-[#EDEDED]'
              : 'text-[#6B6B6B] hover:text-[#202020] hover:bg-white'
          }`}
        >
          <span>All Match Results</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FFFDF9] font-mono">
            {rankedProjects.length}
          </span>
        </button>

        <button
          onClick={() => setFilterTier('ready')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
            filterTier === 'ready'
              ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40 font-bold'
              : 'text-[#6B6B6B] hover:text-orange-300 hover:bg-orange-500/10'
          }`}
        >
          <span className="w-2 h-2 rounded-xl bg-orange-400"></span>
          <span>Ready to Build (90-100%)</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FFF1E6] font-mono text-orange-300 border border-orange-500/30">
            {readyCount}
          </span>
        </button>

        <button
          onClick={() => setFilterTier('almost')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
            filterTier === 'almost'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
              : 'text-[#6B6B6B] hover:text-amber-300 hover:bg-amber-500/10'
          }`}
        >
          <span className="w-2 h-2 rounded-xl bg-amber-400"></span>
          <span>Almost Ready (70-89%)</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 font-mono text-amber-300 border border-amber-500/30">
            {almostCount}
          </span>
        </button>

        <button
          onClick={() => setFilterTier('needs-more')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
            filterTier === 'needs-more'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold'
              : 'text-[#6B6B6B] hover:text-sky-300 hover:bg-sky-500/10'
          }`}
        >
          <span className="w-2 h-2 rounded-xl bg-sky-400"></span>
          <span>Needs More Parts (40-69%)</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-950 font-mono text-sky-300 border border-sky-500/30">
            {needsMoreCount}
          </span>
        </button>
      </div>

      {/* Ranked Project Cards Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <MatchCard
              key={project.id}
              project={project}
              rankIndex={idx}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl glass-card border border-[#EDEDED] max-w-xl mx-auto my-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
            <Info className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-[#202020] mb-2">
            No projects in this compatibility tier
          </h3>
          <p className="text-xs text-[#6B6B6B] mb-6 leading-relaxed">
            "You're close. Add these components to unlock more projects." Click below to see all matches or add missing components to your vault.
          </p>
          <button
            onClick={() => setFilterTier('all')}
            className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 text-xs font-bold transition-colors"
          >
            Show All Projects
          </button>
        </div>
      )}
    </div>
  );
}
