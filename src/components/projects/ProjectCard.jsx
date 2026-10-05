import React from 'react';
import { useApp } from '../../context/AppContext';
import MatchScoreRing from '../matching/MatchScoreRing';
import { 
  Clock, 
  BarChart, 
  Recycle, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function ProjectCard({ project }) {
  const { navigate, reservedProjects, completedProjects } = useApp();
  const { match } = project;

  const isReserved = reservedProjects.some(r => r.projectId === project.id);
  const isCompleted = completedProjects.includes(project.id);

  // Difficulty badge colors
  const diffStyles = {
    Easy: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    Hard: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
  };

  return (
    <div className="bg-white hover:border-[#F97316]/50 rounded-2xl p-5 border border-[#EDEDED] flex flex-col justify-between group relative overflow-hidden shadow-sm transition-all hover:-translate-y-0.5">
      
      {/* Top Section */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase bg-white text-[#6B6B6B] px-2 py-0.5 rounded font-semibold">
              {project.category}
            </span>
            <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${diffStyles[project.difficulty] || diffStyles.Easy}`}>
              {project.difficulty}
            </span>
            {isCompleted && (
              <span className="text-[10px] font-mono bg-[#FFF1E6] text-[#F97316] border border-[#FB923C]/40 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                ✓ Built
              </span>
            )}
            {isReserved && !isCompleted && (
              <span className="text-[10px] font-mono bg-sky-500/20 text-sky-300 border border-sky-500/40 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Reserved
              </span>
            )}
          </div>

          {/* Mini score badge */}
          <div className="shrink-0 flex items-center gap-1 bg-white border border-[#EDEDED] rounded-lg px-2 py-1">
            <span className="text-[10px] text-[#6B6B6B] font-semibold">Match:</span>
            <span className={`text-xs font-mono font-bold ${
              match.score >= 90 ? 'text-[#F97316]' : match.score >= 70 ? 'text-amber-500' : 'text-[#6B6B6B]'
            }`}>
              {match.score}%
            </span>
          </div>
        </div>

        {/* Project Name */}
        <h4 className="text-base font-bold text-[#202020] group-hover:text-[#F97316] transition-colors leading-snug line-clamp-1 mb-1.5">
          {project.name}
        </h4>

        {/* Short Description */}
        <p className="text-xs text-[#6B6B6B] line-clamp-2 leading-relaxed mb-4">
          {project.shortDescription}
        </p>

        {/* Component Pills */}
        <div className="mb-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#6B6B6B] mb-1.5 flex items-center gap-1">
            <Cpu className="w-3 h-3" />
            <span>Key Components ({project.components.length}):</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {project.components.slice(0, 4).map((c, i) => {
              const isMatched = match.matchedRequired.some(m => m.name === c.name) || match.matchedOptional.some(m => m.name === c.name);
              return (
                <span
                  key={i}
                  className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${
                    isMatched
                      ? 'bg-[#FFF1E6] text-[#F97316] border border-[#FB923C]/30'
                      : 'bg-white text-[#6B6B6B] border border-[#EDEDED]'
                  }`}
                >
                  {isMatched ? '✓ ' : '○ '}{c.name}
                </span>
              );
            })}
            {project.components.length > 4 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-[#6B6B6B] font-mono">
                +{project.components.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Info & Action */}
      <div className="pt-3 border-t border-[#EDEDED]/80">
        <div className="flex items-center justify-between text-xs text-[#6B6B6B] mb-3 font-medium">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#6B6B6B]" />
            <span>{project.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1 text-[#F97316] font-mono">
            <Recycle className="w-3.5 h-3.5" />
            <span>{project.wasteWeight}g waste reused</span>
          </div>
        </div>

        <button
          onClick={() => navigate(`/projects/${project.id}`)}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white hover:bg-[#F97316] hover:text-white border border-[#EDEDED] hover:border-[#F97316] text-xs font-semibold text-[#202020] transition-all shadow-sm"
        >
          <span>View Blueprint & Steps</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
