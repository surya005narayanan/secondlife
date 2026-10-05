import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Cpu, 
  FolderGit2, 
  Recycle, 
  Award, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Mail, 
  ExternalLink 
} from 'lucide-react';

export default function ProfilePage() {
  const { 
    userProfile, 
    metrics, 
    completedProjects, 
    reservedProjects, 
    resetToDefaultData, 
    navigate 
  } = useApp();

  const handleReset = () => {
    if (window.confirm("Reset all inventory, match state, and project reservations back to the initial demo baseline (12 components, 94% match)?")) {
      resetToDefaultData();
      navigate('/dashboard');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-2xl glass-card border border-[#EDEDED] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 rounded-xl blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 text-center sm:text-left">
          
          {/* Avatar with status ring */}
          <div className="relative">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-orange-500/40 shadow-xl"
            />
            <span className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-xl bg-orange-500 border-2 border-slate-950 flex items-center justify-center text-slate-950 text-xs font-bold">
              ✓
            </span>
          </div>

          {/* User Details */}
          <div className="space-y-2 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202020]">
                  {userProfile.name}
                </h1>
                <p className="text-xs text-orange-400 font-mono font-semibold">
                  {userProfile.title}
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-orange-500/10 text-orange-300 border border-orange-500/30 text-xs font-semibold self-center sm:self-auto">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                <span>Verified Maker</span>
              </span>
            </div>

            <p className="text-xs text-[#6B6B6B] max-w-xl leading-relaxed">
              {userProfile.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-[#6B6B6B] font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#6B6B6B]" />
                <span>{userProfile.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#6B6B6B]" />
                <span>Joined {userProfile.joinedDate}</span>
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#6B6B6B]" />
                <span>{userProfile.email}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity & Vault Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 border border-[#EDEDED] text-center">
          <div className="text-xs text-[#6B6B6B] uppercase font-semibold mb-1">Components Added</div>
          <div className="text-2xl font-extrabold text-[#202020] font-mono">{metrics.totalComponentsCount}</div>
          <div className="text-[10px] text-orange-400 mt-1">In Hardware Vault</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-[#EDEDED] text-center">
          <div className="text-xs text-[#6B6B6B] uppercase font-semibold mb-1">Projects Matched</div>
          <div className="text-2xl font-extrabold text-[#202020] font-mono">{metrics.projectsPossibleCount}</div>
          <div className="text-[10px] text-red-400 mt-1">Feasible Blueprints</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-[#EDEDED] text-center">
          <div className="text-xs text-[#6B6B6B] uppercase font-semibold mb-1">Projects Built / Reserved</div>
          <div className="text-2xl font-extrabold text-[#202020] font-mono">{reservedProjects.length + completedProjects.length}</div>
          <div className="text-[10px] text-amber-400 mt-1">Physical builds</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-[#EDEDED] text-center">
          <div className="text-xs text-[#6B6B6B] uppercase font-semibold mb-1">Waste Diverted</div>
          <div className="text-2xl font-extrabold text-orange-400 font-mono">{metrics.totalWasteReusableKg} kg</div>
          <div className="text-[10px] text-amberaccent-400 mt-1">Landfill Diverted</div>
        </div>
      </div>

      {/* Official Achievements Section */}
      <div className="p-6 rounded-2xl glass-card border border-[#EDEDED] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-orange-400" />
            <h2 className="text-base font-bold text-[#202020]">Maker Badges & Achievements</h2>
          </div>
          <span className="text-xs text-orange-400 font-mono font-semibold">
            5 of 5 Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
          {userProfile.badges?.map((badge) => (
            <div
              key={badge.id}
              className="p-4 rounded-2xl bg-white/80 border border-[#EDEDED] hover:border-orange-500/30 transition-all flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-xl flex items-center justify-center shrink-0 border border-orange-500/20">
                {badge.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#202020] flex items-center gap-1.5">
                  <span>{badge.title}</span>
                  <span className="text-[9px] text-orange-400 bg-orange-500/20 px-1 py-0.2 rounded font-mono">
                    UNLOCKED
                  </span>
                </h4>
                <p className="text-[11px] text-[#6B6B6B] mt-1 leading-snug">
                  {badge.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Developer & Advanced Controls */}
      <div className="p-6 rounded-2xl bg-white/60 border border-[#EDEDED] space-y-4">
        <h3 className="text-sm font-bold text-[#202020] flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-[#6B6B6B]" />
          <span>Demo Settings & Reset</span>
        </h3>
        <p className="text-xs text-[#6B6B6B]">
          Restore the application back to the clean initial demo configuration (12 components, Smart Parking Assistant at 94% match, 1.84 kg potential e-waste).
        </p>

        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-semibold text-xs transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Data to Initial Baseline</span>
          </button>

          <span className="text-[11px] font-mono text-[#6B6B6B]">
            Local Storage Revision: v1.0.4
          </span>
        </div>
      </div>
    </div>
  );
}
