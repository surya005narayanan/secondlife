import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Recycle, 
  Search, 
  Sparkles, 
  Menu, 
  X, 
  LayoutDashboard, 
  Cpu, 
  FolderGit2, 
  Camera, 
  BarChart3, 
  Users, 
  UserCheck 
} from 'lucide-react';

export default function Navbar() {
  const { 
    activeRoute, 
    navigate, 
    setIsCommandPaletteOpen, 
    metrics, 
    userProfile 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Components', path: '/components', icon: Cpu },
    { label: 'What Can I Build?', path: '/match', icon: Sparkles, highlight: true },
    { label: 'Projects', path: '/projects', icon: FolderGit2 },
    { label: 'AI Scanner', path: '/scan', icon: Camera },
    { label: 'Impact', path: '/impact', icon: BarChart3 },
    { label: 'Community', path: '/community', icon: Users }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#EDEDED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Logo & Tagline */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[#F97316] group-hover:scale-105 transition-transform">
              <span className="text-2xl">🐘</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-[#202020] group-hover:text-[#F97316] transition-colors">
                  SecondLife
                </span>
              </div>
              <p className="text-[10px] text-[#6B6B6B] font-medium hidden sm:block tracking-wide">
                Don't throw it away. Build something with it.
              </p>
            </div>
          </button>
        </div>

        {/* Global Search Bar (Ctrl+K) */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 bg-[#FFFDF9] hover:bg-[#FFF1E6] border border-[#EDEDED] hover:border-[#F97316] rounded-xl text-xs text-[#6B6B6B] transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-[#F97316]" />
              <span>Search components, projects, categories...</span>
            </div>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-[#6B6B6B] bg-white border border-[#EDEDED] rounded">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right actions: Quick stats & Profile */}
        <div className="flex items-center gap-3">
          
          {/* Quick Metrics Badges (Desktop) */}
          <div className="hidden lg:flex items-center gap-2">
            <div 
              onClick={() => navigate('/components')}
              className="cursor-pointer px-2.5 py-1 rounded-lg bg-white border border-[#EDEDED] hover:border-[#F97316] text-xs flex items-center gap-1.5 transition-colors"
              title="Components in Vault"
            >
              <Cpu className="w-3.5 h-3.5 text-[#F97316]" />
              <span className="text-[#6B6B6B]">Inventory:</span>
              <strong className="text-[#202020] font-mono">{metrics.totalComponentsCount}</strong>
            </div>

            <div 
              onClick={() => navigate('/impact')}
              className="cursor-pointer px-2.5 py-1 rounded-lg bg-[#FFF1E6] border border-[#FB923C]/50 hover:border-[#F97316] text-xs flex items-center gap-1.5 transition-colors"
              title="Potential E-Waste Diverted"
            >
              <span className="text-[#F97316] font-bold">♻</span>
              <span className="text-[#c2410c]">Diverted:</span>
              <strong className="text-[#9a3412] font-mono">{metrics.totalWasteReusableKg} kg</strong>
            </div>
          </div>

          {/* Search Trigger for Mobile/Tablet */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="md:hidden p-2 rounded-xl text-[#6B6B6B] hover:text-[#202020] hover:bg-white"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* User Profile Avatar Link */}
          <button
            onClick={() => navigate('/profile')}
            className={`flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-xl border transition-all ${
              activeRoute === '/profile'
                ? 'bg-[#FFF1E6] border-[#FB923C]/50 text-[#F97316]'
                : 'bg-white border-[#EDEDED] hover:border-[#F97316] text-[#6B6B6B]'
            }`}
          >
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-7 h-7 rounded-lg object-cover border border-[#EDEDED]"
            />
            <span className="text-xs font-semibold hidden sm:inline">{userProfile.name}</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#6B6B6B] hover:text-[#202020] hover:bg-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EDEDED] bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeRoute === item.path;
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#FFF1E6] text-[#F97316] border border-[#FB923C]/50 font-semibold'
                    : 'text-[#6B6B6B] hover:bg-[#FFFDF9] hover:text-[#202020]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#F97316]' : 'text-[#6B6B6B]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.highlight && (
                  <span className="text-[10px] font-mono uppercase bg-[#FFF1E6] text-[#F97316] px-2 py-0.5 rounded font-bold">
                    AI
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
