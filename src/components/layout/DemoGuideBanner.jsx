import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ChevronDown, ChevronUp, ArrowRight, CheckCircle2, RotateCcw, Zap } from 'lucide-react';

export default function DemoGuideBanner() {
  const {
    demoStep,
    setDemoStep,
    navigate,
    addMissingBuzzerForDemo,
    resetToDefaultData,
    metrics
  } = useApp();

  const [isOpen, setIsOpen] = useState(true);

  const DEMO_STEPS = [
    {
      num: 1,
      title: "Dashboard Overview",
      desc: "Show 12 Parts, 8 Projects, 94% Best Match, 1.84kg E-Waste",
      action: () => {
        setDemoStep(1);
        navigate('/dashboard');
      }
    },
    {
      num: 2,
      title: "What Can I Build?",
      desc: "Navigate to the AI Project Matcher page",
      action: () => {
        setDemoStep(2);
        navigate('/match');
      }
    },
    {
      num: 3,
      title: "Inspect Top Match",
      desc: "View Smart Parking Assistant (currently at 94% Match)",
      action: () => {
        setDemoStep(3);
        navigate('/match');
      }
    },
    {
      num: 4,
      title: "Examine Missing Parts",
      desc: "Open Smart Parking details to reveal missing buzzer",
      action: () => {
        setDemoStep(4);
        navigate('/projects/smart-parking');
      }
    },
    {
      num: 5,
      title: "1-Click Add Missing Buzzer",
      desc: "Add Buzzer -> Instantly watch score jump from 94% to 100%!",
      isHighlight: true,
      action: () => {
        addMissingBuzzerForDemo();
        navigate('/projects/smart-parking');
      }
    },
    {
      num: 6,
      title: "Verify E-Waste Impact",
      desc: "Inspect +420g hazardous e-waste diverted impact card",
      action: () => {
        setDemoStep(6);
        navigate('/impact');
      }
    },
    {
      num: 7,
      title: "AI Optical Scanner",
      desc: "Simulate AI vision scanning scrap components from photo",
      action: () => {
        setDemoStep(7);
        navigate('/scan');
      }
    },
    {
      num: 8,
      title: "Merge & Recalculate",
      desc: "Add detected parts and watch live project possibilities expand",
      action: () => {
        setDemoStep(8);
        navigate('/match');
      }
    }
  ];

  return (
    <div className="bg-white border-b border-t border-[#F97316]/20 text-[#202020] text-xs shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        
        {/* Left Indicator */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-xl bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-xl h-2.5 w-2.5 bg-orange-500"></span>
          </span>
          <div className="flex items-center gap-1.5 font-bold tracking-wide uppercase text-[#F97316] text-[11px]">
            <Zap className="w-3.5 h-3.5 fill-[#F97316]" />
            <span>INTERACTIVE DEMO GUIDE</span>
          </div>
          <span className="hidden sm:inline-block text-[#6B6B6B]">•</span>
          <span className="hidden md:inline-block text-[#6B6B6B] font-medium">
            Active: <strong className="text-[#202020]">Step {demoStep}: {DEMO_STEPS[demoStep - 1]?.title}</strong>
          </span>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2">
          {/* Quick 100% trigger button */}
          <button
            onClick={addMissingBuzzerForDemo}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FFF1E6] text-[#F97316] border border-[#FB923C]/40 hover:bg-[#FFFDF9] transition-all font-semibold text-[11px]"
            title="Step 5: Instantly add missing buzzer and trigger 100% Ready To Build score"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
            <span className="hidden sm:inline">Demo Step 5:</span> Add Buzzer (94% → 100%)
          </button>

          <button
            onClick={resetToDefaultData}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#FFFDF9] hover:bg-[#EDEDED]/50 text-[#6B6B6B] hover:text-[#202020] border border-[#EDEDED] transition-all text-[11px]"
            title="Reset all states back to initial 12 components"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-md text-[#6B6B6B] hover:text-[#202020] hover:bg-white"
            aria-label="Toggle demo bar details"
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Step-by-Step Flow Controls */}
      {isOpen && (
        <div className="max-w-7xl mx-auto px-4 pb-2.5 pt-1 border-t border-[#EDEDED]/60 overflow-x-auto">
          <div className="flex items-center gap-1.5 min-w-max">
            {DEMO_STEPS.map((step) => {
              const isCurrent = demoStep === step.num;
              return (
                <button
                  key={step.num}
                  onClick={step.action}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-left transition-all ${
                    isCurrent
                      ? 'bg-[#F97316] text-white font-bold shadow-sm scale-[1.02]'
                      : step.isHighlight
                      ? 'bg-[#FFF1E6] text-[#F97316] border border-[#FB923C]/40 font-medium'
                      : 'bg-[#FFFDF9] text-[#6B6B6B] hover:bg-white hover:text-[#202020] border border-[#EDEDED]'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-xl flex items-center justify-center text-[10px] font-mono ${
                    isCurrent ? 'bg-white text-[#F97316] font-bold' : 'bg-[#EDEDED]/50 text-[#6B6B6B]'
                  }`}>
                    {step.num}
                  </span>
                  <span className="text-[11px] whitespace-nowrap">{step.title}</span>
                  {isCurrent && <ArrowRight className="w-3 h-3 ml-0.5" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
