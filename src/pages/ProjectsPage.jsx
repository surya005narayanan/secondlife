import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import ProjectCard from '../components/projects/ProjectCard';
import { PROJECT_CATEGORIES, PROJECT_DIFFICULTIES } from '../data/initialProjects';
import { 
  FolderGit2, 
  Search, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  SlidersHorizontal,
  Clock 
} from 'lucide-react';

export default function ProjectsPage() {
  const { rankedProjects, navigate } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [onlyBuildable, setOnlyBuildable] = useState(false);

  const filteredProjects = useMemo(() => {
    return rankedProjects.filter((p) => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.components.some(c => c.name.toLowerCase().includes(q));

      // Category
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;

      // Difficulty
      const matchesDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;

      // "Can I build this?" toggle
      const matchesBuildable = !onlyBuildable || p.match.canBuild || p.match.score >= 90;

      return matchesQuery && matchesCategory && matchesDiff && matchesBuildable;
    });
  }, [rankedProjects, searchQuery, selectedCategory, selectedDifficulty, onlyBuildable]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202020] tracking-tight">
              Hardware Blueprints
            </h1>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-xl bg-orange-500/20 text-orange-300 border border-orange-500/30">
              {rankedProjects.length} Open Builds
            </span>
          </div>
          <p className="text-sm text-[#6B6B6B]">
            Engineered schematics, bill of materials, and firmware designed specifically for recycled silicon.
          </p>
        </div>

        <button
          onClick={() => navigate('/match')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs shadow-lg shadow-orange-500/20 transition-all active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
          <span>Match My Vault</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white/60 border border-[#EDEDED] space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          
          {/* Search Input */}
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-[#6B6B6B] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search blueprints by name, required sensor, or use case..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FFFDF9]/80 border border-[#EDEDED] text-xs text-[#202020] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6B6B6B] font-medium whitespace-nowrap">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FFFDF9]/80 border border-[#EDEDED] text-xs text-[#202020] focus:outline-none focus:ring-2 focus:ring-orange-500/40"
            >
              {PROJECT_DIFFICULTIES.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* "Can I Build This?" Toggle */}
          <div className="flex items-center justify-between md:justify-end gap-3 px-2">
            <label className="text-xs font-semibold text-[#6B6B6B] flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyBuildable}
                onChange={(e) => setOnlyBuildable(e.target.checked)}
                className="w-4 h-4 rounded border-[#EDEDED] text-orange-500 focus:ring-orange-400 bg-[#FFFDF9] accent-orange-500"
              />
              <span className="text-orange-300">Can I build this? (≥90%)</span>
            </label>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1">
          <span className="text-[11px] font-semibold text-[#6B6B6B] uppercase tracking-wider mr-1">
            Category:
          </span>
          {PROJECT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-orange-500 text-slate-950 font-bold shadow-sm shadow-orange-500/20'
                    : 'bg-[#FFFDF9]/60 hover:bg-white text-[#6B6B6B] border border-[#EDEDED]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Projects */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl glass-card border border-[#EDEDED] max-w-xl mx-auto my-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4">
            <FolderGit2 className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-[#202020] mb-2">
            No blueprints match current filters
          </h3>
          <p className="text-xs text-[#6B6B6B] mb-6 leading-relaxed">
            Try unchecking "Can I build this?" or clearing your search term to see all 12 blueprints.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedDifficulty('All');
              setOnlyBuildable(false);
            }}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#FFFDF9] text-xs font-semibold text-[#202020] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
