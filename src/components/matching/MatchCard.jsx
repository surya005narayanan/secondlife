import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import MatchScoreRing from './MatchScoreRing';
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Clock, 
  BarChart, 
  Recycle, 
  HelpCircle, 
  Plus, 
  Sparkles, 
  Check, 
  ShieldCheck 
} from 'lucide-react';

export default function MatchCard({ project, rankIndex = 0 }) {
  const { navigate, addComponent, reserveProjectParts, reservedProjects } = useApp();
  const [showWhyModal, setShowWhyModal] = useState(false);

  const { match } = project;
  const isReserved = reservedProjects.some(r => r.projectId === project.id);

  // Status Styling
  const statusStyles = {
    'Ready to Build': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    'Almost Ready': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'Needs More Components': 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    'Low Compatibility': 'bg-white text-[#6B6B6B] border-[#EDEDED]'
  };

  const statusBadge = statusStyles[match.status] || statusStyles['Low Compatibility'];

  // Quick 1-click adder for missing component
  const handleAddMissingPart = (partName) => {
    addComponent({
      name: partName,
      category: 'Sensors',
      quantity: 1,
      condition: 'Good',
      weight: 15,
      description: `Added to fulfill "${project.name}" requirements.`
    });
  };

  const medals = ['🥇', '🥈', '🥉'];
  const rankMedal = rankIndex < 3 ? medals[rankIndex] : null;

  return (
    <div className={`glass-card glass-card-hover rounded-2xl p-6 border transition-all relative overflow-hidden flex flex-col justify-between ${
      match.score >= 90 
        ? 'border-orange-500/40 shadow-lg shadow-orange-950/40' 
        : 'border-[#EDEDED]/80'
    }`}>
      
      {/* Top Banner & Badges */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              {rankMedal && <span className="text-lg">{rankMedal}</span>}
              <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${statusBadge}`}>
                {match.status}
              </span>
              <span className="text-[11px] text-[#6B6B6B] bg-white/80 px-2 py-0.5 rounded font-medium">
                {project.category}
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#202020] group-hover:text-orange-300 transition-colors leading-snug">
              {project.name}
            </h3>
          </div>

          {/* Animated Circular Score */}
          <div className="shrink-0">
            <MatchScoreRing score={match.score} size={68} />
          </div>
        </div>

        {/* Short summary */}
        <p className="text-xs text-[#6B6B6B] line-clamp-2 mb-4 leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Intelligent "Why this match?" reasoning box */}
        <div className="p-3 rounded-xl bg-white/90 border border-[#EDEDED] text-xs mb-4">
          <div className="flex items-center justify-between text-[#6B6B6B] mb-1">
            <span className="font-semibold text-orange-400 flex items-center gap-1.5 text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              Why this recommendation?
            </span>
          </div>
          <p className="text-[#6B6B6B] text-xs leading-relaxed font-normal">
            {match.whyThisProject}
          </p>
        </div>

        {/* Component Availability Breakdown */}
        <div className="space-y-3 mb-4">
          
          {/* Matched Parts */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-orange-400 mb-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Available in Vault ({match.matchedRequired.length + match.matchedOptional.length})</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[...match.matchedRequired, ...match.matchedOptional].map((part, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-1.5 text-xs text-[#202020] bg-[#FFF1E6] border border-orange-500/20 px-2.5 py-1 rounded-lg"
                >
                  <Check className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span className="truncate">{part.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Missing Parts */}
          {(match.missingRequired.length > 0 || match.missingOptional.length > 0) && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-1">
                <Circle className="w-3.5 h-3.5" />
                <span>Missing ({match.missingRequired.length + match.missingOptional.length})</span>
              </div>
              <div className="space-y-1.5">
                {[...match.missingRequired, ...match.missingOptional].map((missing, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs text-[#6B6B6B] bg-white/60 border border-[#EDEDED] px-2.5 py-1.5 rounded-lg"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-xl bg-amber-400/80"></span>
                      <span className="font-medium text-[#202020]">{missing.name}</span>
                      <span className="text-[10px] text-[#6B6B6B]">({missing.needed}x needed)</span>
                    </div>

                    {/* 1-Click Add button for Interactive demo testing */}
                    <button
                      onClick={() => handleAddMissingPart(missing.name)}
                      className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 border border-orange-500/30 rounded transition-colors"
                      title="Add this part to your inventory to update score"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add to Vault</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Specs & Actions */}
      <div className="pt-4 border-t border-[#EDEDED]/80">
        
        {/* Specs: Difficulty, Build Time, Waste Reused */}
        <div className="flex items-center justify-between text-xs text-[#6B6B6B] mb-3.5 font-medium">
          <div className="flex items-center gap-1.5">
            <BarChart className="w-3.5 h-3.5 text-[#6B6B6B]" />
            <span>{project.difficulty}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#6B6B6B]" />
            <span>{project.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-orange-400 font-mono font-semibold">
            <Recycle className="w-3.5 h-3.5" />
            <span>{match.potentialWasteReused}g diverted</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate(`/projects/${project.id}`)}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-white border border-[#EDEDED]/80 text-xs font-semibold text-[#202020] transition-colors"
          >
            <span>View Blueprint</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {isReserved ? (
            <div className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#FFF1E6] border border-orange-500/40 text-orange-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-orange-400" />
              <span>Parts Reserved</span>
            </div>
          ) : match.canBuild ? (
            <button
              onClick={() => reserveProjectParts(project.id)}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 text-xs font-bold shadow-md shadow-orange-500/20 transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Build This!</span>
            </button>
          ) : (
            <button
              onClick={() => navigate(`/projects/${project.id}`)}
              className="w-full flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-white/80 hover:bg-[#FFFDF9] text-[#6B6B6B] text-xs font-medium transition-colors"
            >
              <span>See Missing</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
