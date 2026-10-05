import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Heart, 
  Recycle, 
  Plus, 
  Sparkles, 
  Share2, 
  MessageSquare, 
  X, 
  ExternalLink 
} from 'lucide-react';

export default function CommunityPage() {
  const { community, toggleCommunityLike, addCommunityProject } = useApp();

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    components: '',
    difficulty: 'Medium',
    wasteReused: 350
  });

  const handleShareSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    addCommunityProject({
      title: formData.title,
      description: formData.description,
      components: formData.components.split(',').map(s => s.trim()).filter(Boolean),
      difficulty: formData.difficulty,
      wasteReused: Number(formData.wasteReused) || 350
    });

    setFormData({
      title: '',
      description: '',
      components: '',
      difficulty: 'Medium',
      wasteReused: 350
    });
    setIsShareModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5 text-orange-400" />
            <span>Global Makers Circle</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202020] tracking-tight">
            Community Repurposing Showcase
          </h1>
          <p className="text-sm text-[#6B6B6B] mt-1 max-w-2xl font-normal">
            Explore inventive machines built by creators worldwide from discarded appliances, old toys, and salvaged sensors.
          </p>
        </div>

        <button
          onClick={() => setIsShareModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs shadow-lg shadow-orange-500/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Post Your Build</span>
        </button>
      </div>

      {/* Community Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {community.map((item) => (
          <div
            key={item.id}
            className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-[#EDEDED] flex flex-col justify-between group"
          >
            {/* Project Image Banner */}
            <div className="relative h-44 overflow-hidden bg-white">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-xl bg-[#FFFDF9]/80  text-[10px] font-mono text-orange-400 font-semibold border border-[#EDEDED]">
                ♻ {item.wasteReused}g diverted
              </div>
              <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-white/90 text-[10px] font-mono text-[#6B6B6B] border border-[#EDEDED]">
                {item.difficulty}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                {/* Creator header */}
                <div className="flex items-center gap-2.5 mb-2.5">
                  <img
                    src={item.avatar}
                    alt={item.creator}
                    className="w-7 h-7 rounded-xl object-cover border border-orange-500/30"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-[#202020] leading-tight">
                      {item.creator}
                    </h5>
                    <span className="text-[10px] text-[#6B6B6B]">
                      {item.role} • {item.date}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[#202020] group-hover:text-orange-300 transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#6B6B6B] line-clamp-2 mt-1.5 leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Used Components Chips */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {item.components.map((c, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-orange-300 border border-orange-500/20"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Interactive Bar */}
              <div className="pt-3 border-t border-[#EDEDED]/80 flex items-center justify-between">
                <button
                  onClick={() => toggleCommunityLike(item.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-all ${
                    item.hasLiked
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'text-[#6B6B6B] hover:text-rose-400 hover:bg-white'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${item.hasLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                  <span>{item.likes}</span>
                </button>

                <div className="flex items-center gap-1 text-[11px] text-[#6B6B6B]">
                  <span className="px-2 py-1 rounded bg-white border border-[#EDEDED]">
                    Upcycled Hardware
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#FFFDF9]/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white border border-[#EDEDED]/80 rounded-2xl shadow-2xl p-6 text-[#202020] space-y-4">
            <div className="flex items-center justify-between border-b border-[#EDEDED] pb-3">
              <h3 className="text-base font-bold text-[#202020]">Share Your Repurposed Build</h3>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="text-[#6B6B6B] hover:text-[#202020]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleShareSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#6B6B6B] mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solar Balcony Air Quality Sentinel"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDEDED] text-xs text-[#202020] focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6B6B6B] mb-1">Story / Repurposing Technique</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Explain what junk you salvaged and how you wired it up..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDEDED] text-xs text-[#202020] focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#6B6B6B] mb-1">Salvaged Components (comma separated)</label>
                  <input
                    type="text"
                    placeholder="Arduino, LCD, Old Fan"
                    value={formData.components}
                    onChange={(e) => setFormData({ ...formData, components: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDEDED] text-xs text-[#202020] focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6B6B6B] mb-1">Estimated Diverted Weight (g)</label>
                  <input
                    type="number"
                    value={formData.wasteReused}
                    onChange={(e) => setFormData({ ...formData, wasteReused: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#EDEDED] text-xs text-[#202020] focus:outline-none focus:ring-2 focus:ring-orange-500/40"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#EDEDED]">
                <button
                  type="button"
                  onClick={() => setIsShareModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white text-[#6B6B6B] text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 text-xs font-bold shadow-md shadow-orange-500/20"
                >
                  Publish to Community
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
