import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import ComponentCard from '../components/components/ComponentCard';
import EditComponentModal from '../components/components/EditComponentModal';
import { COMPONENT_CATEGORIES, COMPONENT_CONDITIONS } from '../data/initialComponents';
import { 
  Plus, 
  Camera, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Cpu, 
  Layers, 
  RefreshCw,
  Box 
} from 'lucide-react';

export default function ComponentsPage({ onOpenAddModal }) {
  const { components, navigate, resetToDefaultData } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [sortBy, setSortBy] = useState('recently-added'); // 'name', 'weight', 'quantity', 'recently-added'
  const [editingComponent, setEditingComponent] = useState(null);

  // Filter & Sort
  const filteredComponents = useMemo(() => {
    return components
      .filter((c) => {
        // Search filter
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !q ||
          c.name.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          (c.description && c.description.toLowerCase().includes(q)) ||
          (c.tags && c.tags.some(t => t.toLowerCase().includes(q)));

        // Category filter
        const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;

        // Condition filter
        const matchesCondition = selectedCondition === 'All' || c.condition === selectedCondition;

        return matchesQuery && matchesCategory && matchesCondition;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sortBy === 'weight') {
          return (b.weight || 0) - (a.weight || 0);
        } else if (sortBy === 'quantity') {
          return (b.quantity || 1) - (a.quantity || 1);
        }
        // Recently added: reverse or keep original order
        return 0;
      });
  }, [components, searchQuery, selectedCategory, selectedCondition, sortBy]);

  // Aggregate stats
  const totalWeightGrams = components.reduce((acc, c) => acc + (c.weight || 20) * (c.quantity || 1), 0);
  const totalUnits = components.reduce((acc, c) => acc + (c.quantity || 1), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202020] tracking-tight">
              My Components
            </h1>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-xl bg-orange-500/20 text-orange-300 border border-orange-500/30">
              {components.length} Items ({totalUnits} Units)
            </span>
          </div>
          <p className="text-sm text-[#6B6B6B]">
            Give your unused electronics a second life. Inventory drives all AI match recommendations.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/scan')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white hover:bg-white border border-[#EDEDED]/80 hover:border-orange-500/40 text-[#202020] text-xs font-semibold transition-all shadow-sm"
          >
            <Camera className="w-4 h-4 text-orange-400" />
            <span>Scan Electronics</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 text-xs font-bold shadow-lg shadow-orange-500/20 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ Add Component</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white/60 border border-[#EDEDED] space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          
          {/* Search Input */}
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-[#6B6B6B] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search components by name, keyword, or IC tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FFFDF9]/80 border border-[#EDEDED] text-xs text-[#202020] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-[#6B6B6B] hover:text-[#202020]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Condition Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6B6B6B] font-medium whitespace-nowrap">Condition:</span>
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FFFDF9]/80 border border-[#EDEDED] text-xs text-[#202020] focus:outline-none focus:ring-2 focus:ring-orange-500/40"
            >
              {COMPONENT_CONDITIONS.map(cond => (
                <option key={cond} value={cond}>{cond}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-[#6B6B6B] shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FFFDF9]/80 border border-[#EDEDED] text-xs text-[#202020] focus:outline-none focus:ring-2 focus:ring-orange-500/40"
            >
              <option value="recently-added">Recently Added</option>
              <option value="name">Name (A-Z)</option>
              <option value="weight">Heaviest Weight</option>
              <option value="quantity">Highest Quantity</option>
            </select>
          </div>
        </div>

        {/* Category Horizontal Scrolling Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1">
          <span className="text-[11px] font-semibold text-[#6B6B6B] uppercase tracking-wider mr-1">
            Category:
          </span>
          {COMPONENT_CATEGORIES.map((cat) => {
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

      {/* Components Grid */}
      {filteredComponents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredComponents.map((comp) => (
            <ComponentCard
              key={comp.id}
              component={comp}
              onEdit={(c) => setEditingComponent(c)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-2xl glass-card border border-[#EDEDED] max-w-xl mx-auto my-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4">
            <Box className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-[#202020] mb-2">
            No components match your search filters
          </h3>
          <p className="text-xs text-[#6B6B6B] mb-6 leading-relaxed">
            "Your electronics deserve a second chance." Adjust your filters or add missing boards and modules to expand matching potential.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedCondition('All');
              }}
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#FFFDF9] text-xs font-semibold text-[#202020] transition-colors"
            >
              Reset Filters
            </button>
            <button
              onClick={onOpenAddModal}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 text-xs font-bold transition-colors"
            >
              + Add Component
            </button>
          </div>
        </div>
      )}

      {/* Edit Component Modal */}
      <EditComponentModal
        component={editingComponent}
        isOpen={Boolean(editingComponent)}
        onClose={() => setEditingComponent(null)}
      />
    </div>
  );
}
