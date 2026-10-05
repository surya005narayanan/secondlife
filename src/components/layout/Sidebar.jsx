import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Cpu, 
  Sparkles, 
  FolderGit2, 
  Camera, 
  BarChart3, 
  Users, 
  User, 
  Plus, 
  Recycle, 
  ArrowUpRight 
} from 'lucide-react';

export default function Sidebar({ onOpenAddModal }) {
  const { activeRoute, navigate, metrics } = useApp();

  const mainNavigation = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Components', path: '/components', icon: Cpu, badge: metrics.totalComponentsCount },
    { label: 'What Can I Build?', path: '/match', icon: Sparkles, isAi: true, badge: `${metrics.bestMatchScore}%` },
    { label: 'Browse Projects', path: '/projects', icon: FolderGit2, badge: '12' },
    { label: 'AI Scanner', path: '/scan', icon: Camera, isNew: true },
    { label: 'Impact Analytics', path: '/impact', icon: BarChart3 },
    { label: 'Community Hub', path: '/community', icon: Users },
    { label: 'Maker Profile', path: '/profile', icon: User }
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#EDEDED] flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      
      {/* Navigation List */}
      <div className="p-4 space-y-1.5 flex-1">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B6B6B] px-3 py-1">
          Navigation
        </div>

        {mainNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeRoute === item.path || (item.path !== '/' && activeRoute.startsWith(item.path));
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-[#FFF1E6] text-[#F97316] border border-[#FB923C]/30 shadow-sm shadow-[#F97316]/5'
                  : 'text-[#6B6B6B] hover:text-[#202020] hover:bg-[#FFFDF9] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-1 rounded-lg ${isActive ? 'bg-[#FFF1E6] text-[#F97316]' : 'text-[#6B6B6B] group-hover:text-[#F97316] group-hover:bg-[#FFFDF9]'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span>{item.label}</span>
              </div>

              {/* Badges */}
              {item.isAi ? (
                <span className="text-[10px] font-mono font-bold bg-[#FFF1E6] text-[#F97316] px-1.5 py-0.5 rounded border border-[#FB923C]/30">
                  {item.badge}
                </span>
              ) : item.isNew ? (
                <span className="text-[9px] font-mono uppercase bg-[#F97316] text-white font-bold px-1.5 py-0.5 rounded">
                  SCAN
                </span>
              ) : item.badge !== undefined ? (
                <span className="text-[10px] font-mono text-[#6B6B6B] bg-[#FFFDF9] border border-[#EDEDED] px-2 py-0.5 rounded">
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}

        {/* Quick Action Button: Add Component */}
        <div className="pt-4">
          <button
            onClick={onOpenAddModal}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#F97316] hover:bg-[#ea580c] text-white font-bold text-xs rounded-xl shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ Add Component</span>
          </button>
        </div>
      </div>

      {/* Vault Status Card */}
      <div className="p-4 border-t border-[#EDEDED] bg-white">
        <div className="p-3.5 rounded-xl bg-[#FFFDF9] border border-[#EDEDED] text-xs">
          <div className="flex items-center justify-between text-[#6B6B6B] mb-1.5">
            <span className="font-semibold text-[11px] uppercase tracking-wider text-[#6B6B6B] flex items-center gap-1.5">
              <Recycle className="w-3.5 h-3.5 text-orange-400" />
              E-Waste Metric
            </span>
            <span className="text-[10px] font-mono text-orange-400">Live</span>
          </div>
          
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-extrabold text-[#202020] font-mono">
              {metrics.totalWasteReusableKg} <span className="text-xs text-[#6B6B6B] font-sans font-normal">kg</span>
            </span>
            <button
              onClick={() => navigate('/impact')}
              className="text-[11px] text-orange-400 hover:text-orange-300 flex items-center gap-0.5 font-semibold"
            >
              Impact <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Progress bar to next sustainability tier */}
          <div className="w-full bg-white h-1.5 rounded-xl mt-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#FB923C] to-[#F97316] h-full rounded-xl transition-all duration-500"
              style={{ width: `${Math.min(100, (metrics.totalWasteReusableKg / 5) * 100)}%` }}
            />
          </div>
          <p className="text-[10px] text-[#6B6B6B] mt-1.5">
            {metrics.projectsPossibleCount} builds ready in your region
          </p>
        </div>
      </div>
    </aside>
  );
}
