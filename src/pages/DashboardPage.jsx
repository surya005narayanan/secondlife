import React from 'react';
import { useApp } from '../context/AppContext';
import MatchScoreRing from '../components/matching/MatchScoreRing';
import { 
  Sparkles, 
  Cpu, 
  FolderGit2, 
  Recycle, 
  ArrowRight, 
  Plus, 
  Camera, 
  CheckCircle2, 
  Circle, 
  Clock, 
  BarChart, 
  Layers, 
  TrendingUp, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';

export default function DashboardPage({ onOpenAddModal }) {
  const { 
    metrics, 
    rankedProjects, 
    components, 
    navigate, 
    userProfile, 
    reservedProjects 
  } = useApp();

  // Top 3 Recommended Projects
  const topProjects = rankedProjects.slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">👋</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202020] tracking-tight">
              Good morning, {userProfile.name}
            </h1>
          </div>
          <p className="text-sm text-[#6B6B6B]">
            Let's see what your electronics can become.
          </p>
        </div>

        {/* Quick Top Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/scan')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#FFFDF9] border border-[#EDEDED] hover:border-[#F97316] text-[#202020] text-xs font-semibold transition-all shadow-sm"
          >
            <Camera className="w-4 h-4 text-[#F97316]" />
            <span>Scan Drawer</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#ea580c] text-white text-xs font-bold shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ Add Component</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Metric 1: Components Available */}
        <div 
          onClick={() => navigate('/components')}
          className="cursor-pointer glass-card glass-card-hover rounded-2xl p-5 border border-[#EDEDED] flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[#6B6B6B] mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Components Available</span>
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#202020] font-mono">
              {metrics.uniqueComponentsCount}
            </span>
            <span className="text-xs text-orange-400 font-medium flex items-center gap-0.5">
              {metrics.totalComponentsCount} total units
            </span>
          </div>
          <p className="text-[11px] text-[#6B6B6B] mt-2">Unique types in vault</p>
        </div>

        {/* Metric 2: Projects Possible */}
        <div 
          onClick={() => navigate('/match')}
          className="cursor-pointer glass-card glass-card-hover rounded-2xl p-5 border border-[#EDEDED] flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[#6B6B6B] mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Projects Possible</span>
            <div className="p-2 rounded-xl bg-red-500/10 text-red-400">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#202020] font-mono">
              {metrics.projectsPossibleCount}
            </span>
            <span className="text-xs text-red-400 font-medium">
              {metrics.readyToBuildCount} build-ready
            </span>
          </div>
          <p className="text-[11px] text-[#6B6B6B] mt-2">Feasible with current parts</p>
        </div>

        {/* Metric 3: Best Match Score */}
        <div 
          onClick={() => navigate('/match')}
          className="cursor-pointer glass-card glass-card-hover rounded-2xl p-5 border border-[#EDEDED] flex flex-col justify-between relative overflow-hidden"
        >
          <div className="flex items-center justify-between text-[#6B6B6B] mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Best Match</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 font-mono">
              {metrics.bestMatchScore}%
            </span>
            <span className="text-[11px] font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">
              High Feasibility
            </span>
          </div>
          <p className="text-[11px] text-[#6B6B6B] mt-2">
            Top build: {rankedProjects[0]?.name || 'Smart Parking Assistant'}
          </p>
        </div>

        {/* Metric 4: E-Waste Reusable */}
        <div 
          onClick={() => navigate('/impact')}
          className="cursor-pointer glass-card glass-card-hover rounded-2xl p-5 border border-[#EDEDED] flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[#6B6B6B] mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">E-Waste Reusable</span>
            <div className="p-2 rounded-xl bg-amberaccent-400/10 text-amberaccent-400">
              <Recycle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#202020] font-mono">
              {metrics.totalWasteReusableKg} <span className="text-sm font-sans font-normal text-[#6B6B6B]">kg</span>
            </span>
            <span className="text-xs text-amberaccent-400 font-medium">
              ≈ ₹{metrics.estimatedValueRecovered}
            </span>
          </div>
          <p className="text-[11px] text-[#6B6B6B] mt-2">Diverted from toxic landfills</p>
        </div>
      </div>

      {/* Hero Action Card: "What can I build?" */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#FFF1E6] border border-[#FB923C]/30 shadow-sm relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
        
        <div className="space-y-3 max-w-2xl relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202020] tracking-tight">
            What can I build?
          </h2>
          <p className="text-base text-[#6B6B6B] leading-relaxed font-normal">
            Tell us what electronics you have and we'll find projects you can build.
          </p>
        </div>

        <div className="relative z-10 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => navigate('/match')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#F97316] hover:bg-[#ea580c] text-white font-bold text-sm shadow-md transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>Find My Projects →</span>
          </button>
        </div>
      </div>

      {/* Top Project Matches Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-[#202020] flex items-center gap-2">
              <span>Top Recommended Builds</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
                Sorted by Compatibility
              </span>
            </h2>
            <p className="text-xs text-[#6B6B6B]">
              Evaluated against your {metrics.totalComponentsCount} inventory parts
            </p>
          </div>

          <button
            onClick={() => navigate('/match')}
            className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1"
          >
            <span>View All Matches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Top Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {topProjects.map((project, index) => {
            const { match } = project;
            const isReserved = reservedProjects.some(r => r.projectId === project.id);

            return (
              <div
                key={project.id}
                className="glass-card glass-card-hover rounded-2xl p-5 border border-[#EDEDED] flex flex-col justify-between relative group"
              >
                <div>
                  {/* Card Header with Score Ring */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase bg-white text-[#6B6B6B] px-2 py-0.5 rounded font-semibold">
                        {project.category}
                      </span>
                      <h3 className="text-base font-bold text-[#202020] mt-1.5 group-hover:text-orange-300 transition-colors line-clamp-1">
                        {project.name}
                      </h3>
                    </div>
                    <div className="shrink-0">
                      <MatchScoreRing score={match.score} size={54} strokeWidth={5} />
                    </div>
                  </div>

                  {/* Components checklist */}
                  <div className="space-y-1.5 my-3 text-xs">
                    {/* Available */}
                    {[...match.matchedRequired, ...match.matchedOptional].slice(0, 3).map((part, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[#6B6B6B]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                        <span className="truncate">{part.name}</span>
                      </div>
                    ))}

                    {/* Missing */}
                    {match.missingRequired.slice(0, 2).map((missing, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-amber-400/90 font-medium">
                        <Circle className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Missing: {missing.name}</span>
                      </div>
                    ))}
                    {match.missingOptional.slice(0, 1).map((opt, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[#6B6B6B]">
                        <Circle className="w-3.5 h-3.5 text-[#6B6B6B] shrink-0" />
                        <span className="truncate">Optional: {opt.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specs & Button */}
                <div className="pt-3 border-t border-[#EDEDED]/80">
                  <div className="flex items-center justify-between text-xs text-[#6B6B6B] mb-3">
                    <span>{project.difficulty}</span>
                    <span className="text-orange-400 font-mono font-medium">
                      {project.wasteWeight}g reused
                    </span>
                  </div>

                  <button
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-orange-500 hover:text-slate-950 border border-[#EDEDED]/80 hover:border-orange-500 text-xs font-semibold text-[#202020] transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Vault Summary Strip */}
      <div className="p-4 rounded-2xl bg-white/60 border border-[#EDEDED] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-[#202020]">Local Inventory Persistence Active</div>
            <div className="text-[#6B6B6B]">All modifications are preserved in browser storage without external cloud tracking.</div>
          </div>
        </div>

        <button
          onClick={() => navigate('/components')}
          className="text-orange-400 hover:text-orange-300 font-semibold whitespace-nowrap"
        >
          Manage All {metrics.totalComponentsCount} Components →
        </button>
      </div>
    </div>
  );
}
