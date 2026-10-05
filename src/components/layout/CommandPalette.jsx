import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Cpu, FolderGit2, Compass, Sparkles, X, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

export default function CommandPalette() {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    components,
    projects,
    navigate,
    resetToDefaultData,
    addMissingBuzzerForDemo
  } = useApp();

  const [query, setQuery] = useState('');

  const filteredResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return {
        quickPages: [
          { name: 'Dashboard', path: '/dashboard', icon: Compass },
          { name: 'My Components', path: '/components', icon: Cpu },
          { name: 'AI Project Matcher', path: '/match', icon: Sparkles, badge: 'Key Feature' },
          { name: 'Browse Projects', path: '/projects', icon: FolderGit2 },
          { name: 'AI Component Scanner', path: '/scan', icon: Sparkles },
          { name: 'Impact Dashboard', path: '/impact', icon: ShieldCheck }
        ],
        components: components.slice(0, 4),
        projects: projects.slice(0, 4)
      };
    }

    return {
      quickPages: [
        { name: 'Dashboard', path: '/dashboard', icon: Compass },
        { name: 'My Components', path: '/components', icon: Cpu },
        { name: 'AI Project Matcher', path: '/match', icon: Sparkles },
        { name: 'Browse Projects', path: '/projects', icon: FolderGit2 },
        { name: 'AI Component Scanner', path: '/scan', icon: Sparkles },
        { name: 'Impact Dashboard', path: '/impact', icon: ShieldCheck }
      ].filter(p => p.name.toLowerCase().includes(q)),
      components: components.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        (c.tags && c.tags.some(t => t.toLowerCase().includes(q)))
      ).slice(0, 6),
      projects: projects.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
      ).slice(0, 6)
    };
  }, [query, components, projects]);

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#FFFDF9]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-[#EDEDED]/60 rounded-2xl shadow-2xl overflow-hidden text-[#202020]">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#EDEDED] bg-white/60">
          <Search className="w-5 h-5 text-orange-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type a component name, project, category, or command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-[#202020] placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 rounded-lg hover:bg-white text-[#6B6B6B] hover:text-[#202020]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          
          {/* Quick Navigation Pages */}
          {filteredResults.quickPages.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#6B6B6B] px-3 mb-1.5">
                Quick Navigation
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {filteredResults.quickPages.map((page) => {
                  const Icon = page.icon;
                  return (
                    <button
                      key={page.path}
                      onClick={() => {
                        navigate(page.path);
                        setIsCommandPaletteOpen(false);
                      }}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#202020] hover:bg-orange-500/10 hover:text-orange-300 hover:border-orange-500/30 border border-transparent transition-all text-left"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-orange-400" />
                        <span>{page.name}</span>
                      </div>
                      {page.badge && (
                        <span className="text-[10px] bg-orange-500/20 text-orange-300 px-1.5 py-0.5 rounded font-mono">
                          {page.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Matched Projects */}
          {filteredResults.projects.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#6B6B6B] px-3 mb-1.5">
                Projects ({filteredResults.projects.length})
              </div>
              <div className="space-y-1">
                {filteredResults.projects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      navigate(`/projects/${proj.id}`);
                      setIsCommandPaletteOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/80 transition-all text-left group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-[#202020] group-hover:text-orange-300 flex items-center gap-2">
                        <span>{proj.name}</span>
                        <span className="text-[10px] bg-white text-[#6B6B6B] px-1.5 py-0.5 rounded">
                          {proj.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#6B6B6B] line-clamp-1 mt-0.5">
                        {proj.shortDescription}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#6B6B6B] group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Components */}
          {filteredResults.components.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#6B6B6B] px-3 mb-1.5">
                Inventory Components ({filteredResults.components.length})
              </div>
              <div className="space-y-1">
                {filteredResults.components.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => {
                      navigate('/components');
                      setIsCommandPaletteOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/80 transition-all text-left group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Cpu className="w-4 h-4 text-orange-400" />
                      <div>
                        <div className="text-xs font-semibold text-[#202020] group-hover:text-orange-300">
                          {comp.name}
                        </div>
                        <div className="text-[10px] text-[#6B6B6B]">
                          {comp.category} • {comp.quantity} in stock • {comp.condition}
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] text-orange-400 font-mono bg-orange-500/10 px-2 py-0.5 rounded">
                      {comp.weight}g
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="border-t border-[#EDEDED] pt-2 px-1 flex items-center justify-between text-xs text-[#6B6B6B]">
            <button
              onClick={() => {
                addMissingBuzzerForDemo();
                setIsCommandPaletteOpen(false);
              }}
              className="flex items-center gap-1.5 hover:text-orange-300 transition-colors py-1 px-2 rounded hover:bg-white"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Demo Quick Action: Add Buzzer (Unlock 100% Match)</span>
            </button>
            <button
              onClick={() => {
                resetToDefaultData();
                setIsCommandPaletteOpen(false);
              }}
              className="flex items-center gap-1.5 hover:text-[#202020] transition-colors py-1 px-2 rounded hover:bg-white"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#6B6B6B]" />
              <span>Reset Demo State</span>
            </button>
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-[#EDEDED] bg-white/80 text-[11px] text-[#6B6B6B] flex justify-between items-center">
          <span>Navigate with mouse or click items</span>
          <span>Press <kbd className="px-1.5 py-0.5 bg-white text-[#6B6B6B] rounded text-[10px]">Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
