import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Recycle, 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  CheckCircle2, 
  ShieldCheck, 
  BarChart3, 
  Layers, 
  Radio, 
  Zap, 
  Workflow, 
  Award 
} from 'lucide-react';

export default function LandingPage() {
  const { navigate, metrics } = useApp();

  const stats = [
    { value: '10,000+', label: 'Components Reusable', sub: 'Across 15+ micro-categories' },
    { value: '2,500+', label: 'Projects Possible', sub: 'From beginner to robotics' },
    { value: '1.8T', label: 'E-Waste Potentially Diverted', sub: 'Toxic materials kept from landfills' },
    { value: '85%', label: 'Average Match Accuracy', sub: 'Deterministic compatibility scoring' }
  ];

  const floatingComponents = [
    { name: 'Arduino Uno', category: 'MCU', top: '10%', left: '4%', delay: 'animate-float-slow' },
    { name: 'HC-SR04 Sonar', category: 'Sensor', top: '18%', right: '6%', delay: 'animate-float-delayed' },
    { name: 'SG90 Micro Servo', category: 'Motor', bottom: '22%', left: '8%', delay: 'animate-float-delayed' },
    { name: '16x2 LCD Display', category: 'Display', bottom: '15%', right: '5%', delay: 'animate-float-slow' },
    { name: 'Diffused LEDs', category: 'Passive', top: '55%', right: '2%', delay: 'animate-float-slow' }
  ];

  return (
    <div className="min-h-screen bg-white text-[#202020] relative overflow-hidden">
      
      {/* Background accents (very subtle light orange) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#FFF1E6] blur-[100px] rounded-full pointer-events-none opacity-50" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        
        {/* Floating Component Badges (Desktop) */}
        <div className="hidden lg:block">
          {floatingComponents.map((item, idx) => (
            <div
              key={idx}
              className={`absolute ${item.delay} px-4 py-2.5 rounded-2xl bg-white border border-[#EDEDED] shadow-sm flex items-center gap-3 text-xs pointer-events-none z-10`}
              style={{ top: item.top, bottom: item.bottom, left: item.left, right: item.right }}
            >
              <div className="w-2 h-2 rounded-full bg-[#F97316]" />
              <div className="text-left">
                <span className="font-bold text-[#202020] block">{item.name}</span>
                <span className="text-[10px] text-[#F97316] font-mono">{item.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Startup Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF1E6] text-[#F97316] text-xs font-semibold mb-12">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Circular Electronics Platform</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-[#202020] max-w-4xl mx-auto leading-[1.1] mb-8">
          Don't throw it away. <br />
          <span className="text-[#F97316]">
            Build something with it.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-[#6B6B6B] max-w-2xl mx-auto mb-14 leading-relaxed font-normal">
          Turn forgotten electronics into useful projects with intelligent component matching.
        </p>

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-20">
          <button
            onClick={() => navigate('/match')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#F97316] hover:bg-[#ea580c] text-white font-bold text-sm transition-all hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2"
          >
            <span>Find My Projects</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={() => navigate('/projects')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[#F97316] border border-[#F97316] hover:bg-[#FFFDF9] font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm hover:-translate-y-0.5"
          >
            <span>Explore Projects</span>
          </button>
        </div>

        {/* Visual Transformation Flow Card */}
        <div className="max-w-5xl mx-auto p-8 sm:p-12 rounded-3xl bg-white border border-[#EDEDED] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
          
          <div className="flex items-center justify-center mb-10">
            <span className="text-[#6B6B6B] font-medium tracking-wide uppercase text-sm">──────────── What Can You Build? ────────────</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 items-center">
            
            <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#EDEDED] text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-white border border-[#EDEDED] flex items-center justify-center mb-4 shadow-sm">
                <Cpu className="w-8 h-8 text-[#6B6B6B]" />
              </div>
              <h4 className="font-bold text-base text-[#202020] mb-2">Old Electronics</h4>
              <p className="text-[13px] text-[#6B6B6B] leading-relaxed">Junk drawer dev boards, sensors, and cables</p>
            </div>

            <div className="hidden sm:flex justify-center text-[#F97316]">
              <ArrowRight className="w-8 h-8" />
            </div>

            <div className="p-6 rounded-2xl bg-[#FFF1E6] border border-[#FB923C]/30 text-center relative shadow-sm">
              <div className="w-16 h-16 mx-auto rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                <Sparkles className="w-8 h-8 text-[#F97316]" />
              </div>
              <h4 className="font-bold text-base text-[#F97316] mb-2">AI Match Matrix</h4>
              <p className="text-[13px] text-[#F97316]/80 leading-relaxed">Intelligent scoring & feasibility analysis</p>
            </div>

            <div className="hidden sm:flex justify-center text-[#F97316]">
              <ArrowRight className="w-8 h-8" />
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#EDEDED] text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-white border border-[#EDEDED] flex items-center justify-center mb-4 shadow-sm">
                <Recycle className="w-8 h-8 text-[#22c55e]" />
              </div>
              <h4 className="font-bold text-base text-[#202020] mb-2">Second Life</h4>
              <p className="text-[13px] text-[#6B6B6B] leading-relaxed">Autonomous systems & zero-waste builds</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section className="py-24 bg-[#FFFDF9] border-t border-[#EDEDED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-center mb-16">
            <span className="text-[#6B6B6B] font-medium tracking-wide uppercase text-sm">──────────── Platform Impact ────────────</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, idx) => (
              <div 
                key={idx} 
                className="p-8 rounded-2xl bg-white border border-[#EDEDED] hover:border-[#FB923C]/50 hover:-translate-y-1 transition-all text-center shadow-sm"
              >
                <div className="text-4xl font-extrabold text-[#F97316] mb-3">
                  {s.value}
                </div>
                <div className="text-base font-bold text-[#202020] mb-2">{s.label}</div>
                <div className="text-sm text-[#6B6B6B]">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 4-Pillar Narrative Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="p-8 rounded-2xl bg-white border border-[#EDEDED] shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#FFF1E6] text-[#F97316] flex items-center justify-center font-bold mb-6 text-lg">
              01
            </div>
            <h3 className="text-lg font-bold text-[#202020] mb-3">The E-Waste Crisis</h3>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">
              Over 53 million metric tons of electronic waste are discarded annually. Millions of fully operational microcontrollers, sensors, and displays end up in landfills.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[#EDEDED] shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#FFF1E6] text-[#F97316] flex items-center justify-center font-bold mb-6 text-lg">
              02
            </div>
            <h3 className="text-lg font-bold text-[#202020] mb-3">The SecondLife Idea</h3>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">
              Instead of buying new parts, SecondLife flips the question: "Given the scrap components I already own, what valuable machine can I construct?"
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[#EDEDED] shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#FFF1E6] text-[#F97316] flex items-center justify-center font-bold mb-6 text-lg">
              03
            </div>
            <h3 className="text-lg font-bold text-[#202020] mb-3">Smart Matching</h3>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">
              Our deterministic algorithm factors in required pins, optional sensors, and quantities to output transparent feasibility ratings.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[#EDEDED] shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#FFF1E6] text-[#22c55e] flex items-center justify-center font-bold mb-6 text-lg">
              04
            </div>
            <h3 className="text-lg font-bold text-[#202020] mb-3">Direct Offset</h3>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">
              Every completed build directly reduces raw material extraction and preserves heavy metals.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="p-16 rounded-3xl bg-[#FFF1E6] border border-[#FB923C]/30 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202020] mb-4">
              Ready to give your hardware a second life?
            </h2>
            <p className="text-[#6B6B6B] text-lg max-w-2xl mx-auto mb-10">
              Open your dashboard right now to view your live inventory matches or scan parts from your workbench drawer.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-10 py-4 rounded-xl bg-[#F97316] hover:bg-[#ea580c] text-white font-bold text-base transition-all hover:-translate-y-0.5 shadow-md inline-block"
            >
              Launch Dashboard & Build →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
