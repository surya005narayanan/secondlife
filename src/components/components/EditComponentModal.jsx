import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { COMPONENT_CATEGORIES, COMPONENT_CONDITIONS } from '../../data/initialComponents';
import { X, Edit2, Check, Trash2 } from 'lucide-react';

export default function EditComponentModal({ component, isOpen, onClose }) {
  const { updateComponent, deleteComponent } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Sensors',
    quantity: 1,
    condition: 'Used',
    weight: 20,
    description: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (component) {
      setFormData({
        name: component.name || '',
        category: component.category || 'Sensors',
        quantity: component.quantity || 1,
        condition: component.condition || 'Used',
        weight: component.weight || 20,
        description: component.description || ''
      });
    }
  }, [component]);

  if (!isOpen || !component) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Component name is required';
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

    updateComponent(component.id, {
      name: formData.name,
      category: formData.category,
      quantity: Number(formData.quantity),
      condition: formData.condition,
      weight: Number(formData.weight),
      description: formData.description
    });

    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to remove "${component.name}" from your inventory?`)) {
      deleteComponent(component.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#FFFDF9]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-[#EDEDED]/80 rounded-2xl shadow-2xl overflow-hidden text-[#202020]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EDEDED] bg-white/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Edit2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#202020]">Edit Component</h3>
              <p className="text-xs text-[#6B6B6B]">{component.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6B6B6B] hover:text-[#202020] hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#6B6B6B] mb-1">Component Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3.5 py-2 rounded-xl bg-white/80 border text-sm text-[#202020] focus:outline-none focus:ring-2 focus:ring-orange-500/40 ${
                errors.name ? 'border-rose-500' : 'border-[#EDEDED]'
              }`}
            />
            {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
          </div>

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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#6B6B6B] mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className={`w-full px-3 py-2 rounded-xl bg-white/80 border text-sm text-[#202020] focus:outline-none focus:ring-2 focus:ring-orange-500/40 ${
                  errors.quantity ? 'border-rose-500' : 'border-[#EDEDED]'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6B6B6B] mb-1">Estimated Weight (g)</label>
              <input
                type="number"
                min="1"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className={`w-full px-3 py-2 rounded-xl bg-white/80 border text-sm text-[#202020] focus:outline-none focus:ring-2 focus:ring-orange-500/40 ${
                  errors.weight ? 'border-rose-500' : 'border-[#EDEDED]'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6B6B6B] mb-1">Description / Notes</label>
            <textarea
              rows="2"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/80 border border-[#EDEDED] text-sm text-[#202020] focus:outline-none focus:ring-2 focus:ring-orange-500/40"
            />
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-[#EDEDED]">
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-1.5 px-3 py-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl text-xs font-medium transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>

            <div className="flex items-center gap-2">
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
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
