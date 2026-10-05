import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COMPONENT_CATEGORIES, COMPONENT_CONDITIONS } from '../../data/initialComponents';
import { X, Cpu, Plus, Sparkles, Scale, Layers } from 'lucide-react';

export default function AddComponentModal({ isOpen, onClose }) {
  const { addComponent } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Sensors',
    quantity: 1,
    condition: 'Used',
    weight: 20,
    description: ''
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Component name is required';
    }
    if (Number(formData.quantity) <= 0 || isNaN(formData.quantity)) {
      errs.quantity = 'Quantity must be at least 1';
    }
    if (Number(formData.weight) <= 0 || isNaN(formData.weight)) {
      errs.weight = 'Weight must be greater than 0g';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    addComponent({
      name: formData.name,
      category: formData.category,
      quantity: Number(formData.quantity),
      condition: formData.condition,
      weight: Number(formData.weight),
      description: formData.description
    });

    // Reset & close
    setFormData({
      name: '',
      category: 'Sensors',
      quantity: 1,
      condition: 'Used',
      weight: 20,
      description: ''
    });
    setErrors({});
    onClose();
  };

  // Quick preset chips for rapid demo filling
  const presetChips = [
    { name: 'Active Buzzer Module', category: 'Sensors', weight: 12, condition: 'New' },
    { name: 'Raspberry Pi Pico', category: 'Microcontrollers', weight: 15, condition: 'Good' },
    { name: '0.96 inch I2C OLED Display', category: 'Displays', weight: 14, condition: 'New' },
    { name: 'PIR Motion Sensor HC-SR501', category: 'Sensors', weight: 16, condition: 'Good' },
    { name: '18650 Li-ion Cell (Salvaged)', category: 'Power', weight: 45, condition: 'Salvage' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#FFFDF9]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-[#EDEDED]/80 rounded-2xl shadow-2xl overflow-hidden text-[#202020]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EDEDED] bg-white/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#202020]">Add Electronic Component</h3>
              <p className="text-xs text-[#6B6B6B]">Expand your inventory to unlock more project matches</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6B6B6B] hover:text-[#202020] hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick presets for fast entry */}
        <div className="px-6 pt-3 pb-1 border-b border-[#EDEDED]/60 bg-white/30">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#6B6B6B] mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-orange-400" />
            <span>Quick Presets:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pb-2">
            {presetChips.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => setFormData({ ...formData, ...preset })}
                className="text-[11px] px-2 py-0.5 rounded-md bg-white hover:bg-orange-500/20 hover:text-orange-300 border border-[#EDEDED] hover:border-orange-500/30 text-[#6B6B6B] transition-colors text-left"
              >
                + {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          
          {/* Component Name */}
          <div>
            <label className="block text-xs font-semibold text-[#6B6B6B] mb-1">
              Component Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Active Buzzer Module, Arduino Uno, HC-SR04..."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3.5 py-2 rounded-xl bg-white/80 border text-sm text-[#202020] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40 ${
                errors.name ? 'border-rose-500' : 'border-[#EDEDED]'
              }`}
            />
            {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Category & Condition Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#6B6B6B] mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/80 border border-[#EDEDED] text-sm text-[#202020] focus:outline-none focus:ring-2 focus:ring-orange-500/40"
              >
                {COMPONENT_CATEGORIES.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B6B6B] mb-1">Condition</label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/80 border border-[#EDEDED] text-sm text-[#202020] focus:outline-none focus:ring-2 focus:ring-orange-500/40"
              >
                {COMPONENT_CONDITIONS.filter(c => c !== 'All').map(cond => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quantity & Weight Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#6B6B6B] mb-1">
                Quantity <span className="text-rose-400">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className={`w-full px-3 py-2 rounded-xl bg-white/80 border text-sm text-[#202020] focus:outline-none focus:ring-2 focus:ring-orange-500/40 ${
                  errors.quantity ? 'border-rose-500' : 'border-[#EDEDED]'
                }`}
              />
              {errors.quantity && <p className="text-rose-400 text-xs mt-1">{errors.quantity}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B6B6B] mb-1">
                Estimated Weight (grams) <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl bg-white/80 border text-sm text-[#202020] focus:outline-none focus:ring-2 focus:ring-orange-500/40 ${
                    errors.weight ? 'border-rose-500' : 'border-[#EDEDED]'
                  }`}
                />
                <span className="absolute right-3 top-2.5 text-xs text-[#6B6B6B] font-mono">g</span>
              </div>
              {errors.weight && <p className="text-rose-400 text-xs mt-1">{errors.weight}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-[#6B6B6B] mb-1">Description / Notes</label>
            <textarea
              rows="2"
              placeholder="e.g. Extracted from an old smoke detector, tested functional with multimeter..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/80 border border-[#EDEDED] text-sm text-[#202020] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#EDEDED]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#EDEDED] text-[#6B6B6B] hover:bg-white text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 text-xs font-bold shadow-lg shadow-orange-500/20 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Save Component</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
