import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Cpu, 
  Activity, 
  Radio, 
  Zap, 
  Sliders, 
  Layers, 
  Wifi, 
  HardDrive, 
  Cable, 
  Box, 
  Edit3, 
  Trash2, 
  Plus, 
  Minus 
} from 'lucide-react';

const CATEGORY_ICONS = {
  Microcontrollers: Cpu,
  Sensors: Activity,
  Displays: Layers,
  Motors: Sliders,
  Power: Zap,
  'Passive Components': Radio,
  Communication: Wifi,
  'PC Components': HardDrive,
  Cables: Cable,
  Other: Box
};

export default function ComponentCard({ component, onEdit }) {
  const { deleteComponent, quickAdjustQuantity } = useApp();

  const IconComponent = CATEGORY_ICONS[component.category] || Box;

  // Condition Badge Colors
  const conditionBadgeStyles = {
    New: 'bg-[#FFF1E6] text-[#F97316] border-[#FB923C]/30',
    Good: 'bg-sky-50 text-sky-600 border-sky-200',
    Used: 'bg-amber-50 text-amber-600 border-amber-200',
    Salvage: 'bg-rose-50 text-rose-600 border-rose-200'
  };

  const badgeStyle = conditionBadgeStyles[component.condition] || 'bg-white text-[#6B6B6B] border-[#EDEDED]';

  return (
    <div className="bg-white hover:border-[#F97316]/50 rounded-2xl p-5 border border-[#EDEDED] flex flex-col justify-between group relative overflow-hidden shadow-sm transition-all hover:-translate-y-0.5">
      
      {/* Decorative subtle ambient highlight */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#F97316]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#F97316]/10 transition-all" />

      <div>
        {/* Top bar: Category & Condition */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-[#6B6B6B] font-medium">
            <IconComponent className="w-3.5 h-3.5 text-[#F97316]" />
            <span>{component.category}</span>
          </div>
          <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${badgeStyle}`}>
            {component.condition}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-[#202020] group-hover:text-[#F97316] transition-colors leading-snug line-clamp-1">
          {component.name}
        </h4>

        {/* Description */}
        {component.description && (
          <p className="text-xs text-[#6B6B6B] line-clamp-2 mt-1.5 leading-relaxed">
            {component.description}
          </p>
        )}
      </div>

      {/* Stats bar: Quantity & Weight */}
      <div className="mt-4 pt-3.5 border-t border-[#EDEDED]/80">
        <div className="flex items-center justify-between mb-3 text-xs">
          
          {/* Quantity with quick +/- stepper */}
          <div className="flex items-center gap-2">
            <span className="text-[#6B6B6B]">Qty:</span>
            <div className="flex items-center bg-white border border-[#EDEDED] rounded-lg p-0.5">
              <button
                onClick={() => quickAdjustQuantity(component.id, -1)}
                className="w-5 h-5 flex items-center justify-center text-[#6B6B6B] hover:text-[#202020] hover:bg-white rounded transition-colors"
                title="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center font-mono font-bold text-[#202020] text-xs">
                {component.quantity}
              </span>
              <button
                onClick={() => quickAdjustQuantity(component.id, 1)}
                className="w-5 h-5 flex items-center justify-center text-[#6B6B6B] hover:text-[#202020] hover:bg-white rounded transition-colors"
                title="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Weight */}
          <div className="text-right">
            <span className="text-[#6B6B6B]">Unit: </span>
            <span className="font-mono font-bold text-[#F97316]">
              {component.weight}g
            </span>
          </div>
        </div>

        {/* Actions: Edit & Delete */}
        <div className="flex items-center justify-between pt-2 border-t border-[#EDEDED]/50">
          <span className="text-[11px] text-[#6B6B6B] font-mono">
            Total: {(component.weight * component.quantity)}g
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onEdit(component)}
              className="flex items-center gap-1 text-[11px] text-[#6B6B6B] hover:text-[#F97316] hover:bg-[#FFF1E6] px-2 py-1 rounded-md transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm(`Delete ${component.name}?`)) {
                  deleteComponent(component.id);
                }
              }}
              className="flex items-center gap-1 text-[11px] text-[#6B6B6B] hover:text-rose-400 hover:bg-white px-2 py-1 rounded-md transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
