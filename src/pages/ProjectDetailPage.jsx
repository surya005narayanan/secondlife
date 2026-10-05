import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import MatchScoreRing from '../components/matching/MatchScoreRing';
import { 
  ArrowLeft, 
  Clock, 
  BarChart, 
  Recycle, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Code2, 
  Wrench, 
  ChevronRight 
} from 'lucide-react';

export default function ProjectDetailPage({ projectId }) {
  const { 
    projects, 
    components, 
    navigate, 
    addComponent, 
    reserveProjectParts, 
    reservedProjects, 
    toggleProjectComplete, 
    completedProjects,
    addToast 
  } = useApp();

  const [copiedCode, setCopiedCode] = useState(false);

  // Find project
  const project = projects.find((p) => p.id === projectId) || projects[0];

  // Re-calculate match using AppContext's rankedProjects or calculate directly
  const { match } = useApp().rankedProjects.find(p => p.id === project.id) || { match: { score: 0 } };

  const isReserved = reservedProjects.some(r => r.projectId === project.id);
  const isCompleted = completedProjects.includes(project.id);

  const handleCopyCode = () => {
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet);
      setCopiedCode(true);
      addToast({
        title: 'Firmware Copied',
        message: 'Arduino C++ sketch copied to clipboard!',
        type: 'info'
      });
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleAddMissingPart = (partName) => {
    addComponent({
      name: partName,
      category: 'Sensors',
      quantity: 1,
      condition: 'Good',
      weight: 15,
      description: `Added to complete "${project.name}".`
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      
      {/* Top Navigation Back Button */}
      <button
        onClick={() => navigate('/match')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#6B6B6B] hover:text-orange-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Matches</span>
      </button>

      {/* Hero Header Card */}
      <div className="p-6 sm:p-8 rounded-2xl glass-card border border-[#EDEDED] shadow-2xl relative overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-xl blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase bg-orange-500/20 text-orange-300 border border-orange-500/30 px-2.5 py-0.5 rounded font-bold">
                {project.category}
              </span>
              <span className="text-xs font-mono uppercase bg-white text-[#6B6B6B] px-2.5 py-0.5 rounded font-medium">
                {project.difficulty} Difficulty
              </span>
              {isCompleted && (
                <span className="text-xs font-mono bg-orange-500 text-slate-950 font-bold px-2.5 py-0.5 rounded flex items-center gap-1">
                  ✓ Built & Active
                </span>
              )}
              {isReserved && !isCompleted && (
                <span className="text-xs font-mono bg-sky-500/20 text-sky-300 border border-sky-500/40 px-2.5 py-0.5 rounded font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Parts Reserved
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#202020] tracking-tight leading-tight">
              {project.name}
            </h1>

            <p className="text-sm text-[#6B6B6B] leading-relaxed font-normal">
              {project.description}
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[#6B6B6B] font-medium">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#6B6B6B]" />
                <span>Build Time: <strong className="text-[#202020]">{project.estimatedTime}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-orange-400 font-mono">
                <Recycle className="w-4 h-4" />
                <span>E-Waste Diverted: <strong className="text-orange-300">{project.wasteWeight}g</strong></span>
              </div>
            </div>
          </div>

          {/* Large Compatibility Ring & Build Action */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/90 border border-[#EDEDED] text-center shrink-0 w-full lg:w-64">
            <MatchScoreRing score={match.score} size={90} strokeWidth={8} />
            <div className="mt-3 font-bold text-sm text-[#202020]">
              {match.status}
            </div>
            <p className="text-[11px] text-[#6B6B6B] mt-1 mb-4">
              {match.canBuild ? 'All required parts found in vault!' : 'Missing some components'}
            </p>

            {isReserved ? (
              <button
                onClick={() => toggleProjectComplete(project.id)}
                className="w-full py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>{isCompleted ? 'Mark In Progress' : 'Mark Project Built!'}</span>
              </button>
            ) : match.canBuild ? (
              <button
                onClick={() => reserveProjectParts(project.id)}
                className="w-full py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs shadow-xl shadow-orange-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Build This Project</span>
              </button>
            ) : (
              <button
                disabled
                className="w-full py-2.5 px-4 rounded-xl bg-white text-[#6B6B6B] text-xs font-semibold cursor-not-allowed"
              >
                Parts Incomplete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Schematic Summary Banner */}
      {project.schematicSummary && (
        <div className="p-4 rounded-2xl bg-[#FFF1E6] border border-orange-500/20 flex items-start gap-3 text-xs text-[#6B6B6B]">
          <Wrench className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-orange-300">Wiring & Pinout Architecture: </span>
            <span>{project.schematicSummary}</span>
          </div>
        </div>
      )}

      {/* 3 Component Requirement Sections: You Have, Missing, Optional */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Section 1: You Have */}
        <div className="glass-card rounded-2xl p-5 border border-[#EDEDED]">
          <div className="flex items-center gap-2 text-orange-400 font-bold text-sm mb-3">
            <CheckCircle2 className="w-4 h-4" />
            <span>You Have ({match.matchedRequired.length})</span>
          </div>
          <p className="text-[11px] text-[#6B6B6B] mb-3">Present in your hardware vault</p>
          
          <div className="space-y-2">
            {match.matchedRequired.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-[#FFF1E6] border border-orange-500/30 flex items-center justify-between text-xs"
              >
                <span className="font-medium text-[#202020] flex items-center gap-2">
                  <span className="text-orange-400 font-bold">✓</span>
                  <span>{item.name}</span>
                </span>
                <span className="text-[11px] font-mono text-orange-300 bg-orange-500/20 px-1.5 py-0.5 rounded">
                  {item.available} in vault
                </span>
              </div>
            ))}
            {match.matchedRequired.length === 0 && (
              <div className="text-xs text-[#6B6B6B] italic py-2">No required parts matched yet.</div>
            )}
          </div>
        </div>

        {/* Section 2: Missing */}
        <div className="glass-card rounded-2xl p-5 border border-[#EDEDED]">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-3">
            <Circle className="w-4 h-4" />
            <span>Missing Essential ({match.missingRequired.length})</span>
          </div>
          <p className="text-[11px] text-[#6B6B6B] mb-3">Needed before system will run</p>

          <div className="space-y-2">
            {match.missingRequired.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-white border border-[#EDEDED] flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-medium text-amber-300 block">{item.name}</span>
                  <span className="text-[10px] text-[#6B6B6B]">Need: {item.needed} unit</span>
                </div>
                <button
                  onClick={() => handleAddMissingPart(item.name)}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/40 rounded-lg transition-colors"
                  title="Add to vault now"
                >
                  <Plus className="w-3 h-3 stroke-[3]" />
                  <span>Add</span>
                </button>
              </div>
            ))}
            {match.missingRequired.length === 0 && (
              <div className="p-3 rounded-xl bg-[#FFF1E6] border border-orange-500/20 text-xs text-orange-300 font-medium text-center">
                ✓ All essential components present!
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Optional */}
        <div className="glass-card rounded-2xl p-5 border border-[#EDEDED]">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Optional Enhancements ({match.matchedOptional.length + match.missingOptional.length})</span>
          </div>
          <p className="text-[11px] text-[#6B6B6B] mb-3">Adds sound/visual telemetry</p>

          <div className="space-y-2">
            {/* Matched optional */}
            {match.matchedOptional.map((item, idx) => (
              <div
                key={`matched-${idx}`}
                className="p-2.5 rounded-xl bg-[#FFF1E6] border border-orange-500/20 flex items-center justify-between text-xs"
              >
                <span className="font-medium text-[#202020]">✓ {item.name}</span>
                <span className="text-[10px] text-orange-400 font-mono">Present</span>
              </div>
            ))}

            {/* Missing optional */}
            {match.missingOptional.map((item, idx) => (
              <div
                key={`miss-${idx}`}
                className="p-2.5 rounded-xl bg-white border border-[#EDEDED] flex items-center justify-between text-xs"
              >
                <span className="font-medium text-[#6B6B6B]">○ {item.name}</span>
                <button
                  onClick={() => handleAddMissingPart(item.name)}
                  className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold bg-white hover:bg-[#FFFDF9] text-[#6B6B6B] rounded transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step-by-Step Build Guide */}
      <div className="p-6 rounded-2xl glass-card border border-[#EDEDED] space-y-4">
        <h2 className="text-lg font-bold text-[#202020] flex items-center gap-2">
          <Wrench className="w-5 h-5 text-orange-400" />
          <span>Step-by-Step Construction Guide</span>
        </h2>
        <p className="text-xs text-[#6B6B6B]">
          Follow these procedures to safely repurpose components into this build.
        </p>

        <div className="space-y-3 pt-2">
          {project.steps?.map((stepItem) => (
            <div
              key={stepItem.step}
              className="p-4 rounded-2xl bg-white/70 border border-[#EDEDED] flex items-start gap-3.5 hover:border-orange-500/30 transition-colors"
            >
              <div className="w-7 h-7 rounded-xl bg-orange-500/10 text-orange-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-orange-500/20 mt-0.5">
                {stepItem.step}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-[#202020] mb-1">
                  {stepItem.title}
                </h4>
                <p className="text-xs text-[#6B6B6B] leading-relaxed font-normal">
                  {stepItem.instruction}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded Firmware Code Snippet */}
      {project.codeSnippet && (
        <div className="p-6 rounded-2xl glass-card border border-[#EDEDED] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-orange-400" />
              <h2 className="text-base font-bold text-[#202020]">Microcontroller Firmware</h2>
              <span className="text-[10px] font-mono bg-white text-[#6B6B6B] px-2 py-0.5 rounded">
                Arduino C++ / ESP-IDF
              </span>
            </div>

            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-orange-500/20 hover:text-orange-300 border border-[#EDEDED] text-xs font-semibold text-[#202020] transition-all"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied!' : 'Copy Sketch'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#EDEDED] text-xs text-orange-300 font-mono overflow-x-auto max-h-80 selection:bg-orange-800">
            <code>{project.codeSnippet}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
