import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  Recycle, 
  Cpu, 
  FolderGit2, 
  IndianRupee, 
  TrendingUp, 
  Leaf, 
  Droplet, 
  ShieldAlert, 
  Sparkles 
} from 'lucide-react';

export default function ImpactPage() {
  const { metrics, components, rankedProjects } = useApp();

  // 1. Components By Category (Donut Chart Data)
  const categoryData = useMemo(() => {
    const counts = {};
    components.forEach((c) => {
      const cat = c.category || 'Other';
      counts[cat] = (counts[cat] || 0) + (c.quantity || 1);
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [components]);

  // 2. Component Condition Distribution (Donut Chart Data)
  const conditionData = useMemo(() => {
    const counts = {};
    components.forEach((c) => {
      const cond = c.condition || 'Used';
      counts[cond] = (counts[cond] || 0) + (c.quantity || 1);
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [components]);

  // 3. Projects By Category (Bar Chart Data)
  const projectCategoryData = useMemo(() => {
    const counts = {};
    rankedProjects.forEach((p) => {
      const cat = p.category || 'IoT';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [rankedProjects]);

  // 4. E-Waste Reused Over Time (Line Chart Data)
  const timelineData = [
    { month: 'Jun', divertedKg: 0.35, parts: 4 },
    { month: 'Jul', divertedKg: 0.65, parts: 8 },
    { month: 'Aug', divertedKg: 0.95, parts: 14 },
    { month: 'Sep', divertedKg: 1.40, parts: 19 },
    { month: 'Oct', divertedKg: metrics.totalWasteReusableKg, parts: metrics.totalComponentsCount }
  ];

  const PIE_COLORS = ['#10b981', '#34d399', '#06b6d4', '#38bdf8', '#818cf8', '#f59e0b', '#fb7185', '#a3e635'];
  const CONDITION_COLORS = {
    New: '#10b981',
    Good: '#38bdf8',
    Used: '#f59e0b',
    Salvage: '#f43f5e'
  };

  // Custom Dark Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-[#EDEDED] p-3 rounded-xl shadow-xl text-xs text-[#202020]">
          <p className="font-bold text-orange-400 mb-1">{label || payload[0].name}</p>
          <p className="text-[#6B6B6B] font-mono">
            {payload[0].value} {payload[0].unit || 'units'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-semibold mb-2">
          <Recycle className="w-3.5 h-3.5 text-orange-400" />
          <span>Real-time Sustainability Ledger</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202020] tracking-tight">
          Your Second Life Impact
        </h1>
        <p className="text-sm text-[#6B6B6B] mt-1 max-w-2xl font-normal">
          Every repurposed capacitor, leaded pin, and silicon wafer avoids landfill toxicity. Here is your personal ecological score.
        </p>
      </div>

      {/* 4 Official Impact Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* E-Waste Reused */}
        <div className="glass-card rounded-2xl p-5 border border-[#EDEDED]">
          <div className="flex items-center justify-between text-[#6B6B6B] mb-2 text-xs font-semibold uppercase">
            <span>E-Waste Reused</span>
            <Recycle className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-3xl font-extrabold text-[#202020] font-mono">
            {metrics.totalWasteReusableKg} <span className="text-sm font-sans font-normal text-[#6B6B6B]">kg</span>
          </div>
          <div className="text-[11px] text-orange-400 mt-2 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+420g with top build</span>
          </div>
        </div>

        {/* Components Repurposed */}
        <div className="glass-card rounded-2xl p-5 border border-[#EDEDED]">
          <div className="flex items-center justify-between text-[#6B6B6B] mb-2 text-xs font-semibold uppercase">
            <span>Components Repurposed</span>
            <Cpu className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-3xl font-extrabold text-[#202020] font-mono">
            {metrics.totalComponentsCount}
          </div>
          <div className="text-[11px] text-red-400 mt-2 font-medium">
            Active in hardware vault
          </div>
        </div>

        {/* Projects Enabled */}
        <div className="glass-card rounded-2xl p-5 border border-[#EDEDED]">
          <div className="flex items-center justify-between text-[#6B6B6B] mb-2 text-xs font-semibold uppercase">
            <span>Projects Enabled</span>
            <FolderGit2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-[#202020] font-mono">
            {metrics.projectsPossibleCount}
          </div>
          <div className="text-[11px] text-amber-400 mt-2 font-medium">
            {metrics.readyToBuildCount} immediately buildable
          </div>
        </div>

        {/* Estimated Value Recovered */}
        <div className="glass-card rounded-2xl p-5 border border-[#EDEDED]">
          <div className="flex items-center justify-between text-[#6B6B6B] mb-2 text-xs font-semibold uppercase">
            <span>Value Recovered</span>
            <IndianRupee className="w-4 h-4 text-amberaccent-400" />
          </div>
          <div className="text-3xl font-extrabold text-[#202020] font-mono">
            ₹{metrics.estimatedValueRecovered.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-amberaccent-400 mt-2 font-medium">
            Saved vs buying brand new
          </div>
        </div>
      </div>

      {/* Environmental Equivalents Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#FFF1E6] border border-orange-500/20 flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-[#6B6B6B] font-semibold uppercase">Carbon Avoided</div>
            <div className="text-sm font-bold text-[#202020] mt-0.5">
              {(metrics.totalWasteReusableKg * 2.8).toFixed(1)} kg CO₂e Offset
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-500/20 flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400">
            <Droplet className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-[#6B6B6B] font-semibold uppercase">Water Conserved</div>
            <div className="text-sm font-bold text-[#202020] mt-0.5">
              {Math.round(metrics.totalWasteReusableKg * 420)} Liters in Semiconductor Fab
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/20 flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-[#6B6B6B] font-semibold uppercase">Toxic Heavy Metals</div>
            <div className="text-sm font-bold text-[#202020] mt-0.5">
              {Math.round(metrics.totalWasteReusableKg * 14)}g Lead & Cadmium Neutralized
            </div>
          </div>
        </div>
      </div>

      {/* 4 Interactive Recharts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: E-Waste Reused Over Time (Line Chart) */}
        <div className="glass-card rounded-2xl p-6 border border-[#EDEDED]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#202020]">E-Waste Reused Over Time</h3>
              <p className="text-xs text-[#6B6B6B]">Cumulative hardware weight diverted (kg)</p>
            </div>
            <span className="text-xs font-mono text-orange-400 font-bold bg-orange-500/10 px-2 py-0.5 rounded">
              Monthly Growth
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 2.5]} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="divertedKg"
                  name="Diverted Weight"
                  unit="kg"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Projects By Category (Bar Chart) */}
        <div className="glass-card rounded-2xl p-6 border border-[#EDEDED]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#202020]">Projects By Category</h3>
              <p className="text-xs text-[#6B6B6B]">Distribution of available engineering domains</p>
            </div>
            <span className="text-xs font-mono text-[#6B6B6B] bg-white px-2 py-0.5 rounded">
              {rankedProjects.length} Blueprints
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectCategoryData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Projects" unit="blueprints" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Components By Category (Donut Chart) */}
        <div className="glass-card rounded-2xl p-6 border border-[#EDEDED]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#202020]">Components By Category</h3>
              <p className="text-xs text-[#6B6B6B]">Vault composition by hardware taxonomy</p>
            </div>
            <span className="text-xs font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">
              Live Vault
            </span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Component Condition Distribution (Donut Chart) */}
        <div className="glass-card rounded-2xl p-6 border border-[#EDEDED]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#202020]">Component Condition</h3>
              <p className="text-xs text-[#6B6B6B]">Physical health and salvage quality ratio</p>
            </div>
            <span className="text-xs font-mono text-[#6B6B6B] bg-white px-2 py-0.5 rounded">
              Physical Health
            </span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={conditionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {conditionData.map((entry) => (
                    <Cell key={`cond-${entry.name}`} fill={CONDITION_COLORS[entry.name] || '#64748b'} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
