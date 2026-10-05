import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { identifyComponents } from '../services/scanner';
import { demoScanPresets } from '../data/demoScans';
import { 
  Camera, 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  ArrowRight, 
  RefreshCw, 
  Layers, 
  Sliders, 
  Activity, 
  Radio, 
  Zap, 
  Image as ImageIcon 
} from 'lucide-react';

export default function ScannerPage() {
  const { addMultipleComponents, navigate, setDemoStep } = useApp();

  const [imagePreview, setImagePreview] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState({ step: 0, totalSteps: 5, label: '', percent: 0 });
  const [detectionResult, setDetectionResult] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Trigger simulated AI identification
  const runScanProcess = async (fileOrUrl, options = {}) => {
    setIsScanning(true);
    setDetectionResult(null);

    try {
      const result = await identifyComponents(fileOrUrl, options, (progress) => {
        setScanProgress(progress);
      });

      setDetectionResult(result.components);
      setDemoStep(8);
    } catch (err) {
      console.error("Scan error:", err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    runScanProcess(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      runScanProcess(file);
    }
  };

  const handleSelectPreset = (preset) => {
    setImagePreview(preset.thumbnail);
    runScanProcess(preset.thumbnail, { presetId: preset.id });
  };

  const handleAddAllDetected = () => {
    if (!detectionResult) return;
    addMultipleComponents(detectionResult);
    navigate('/match');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      
      {/* Title & Introduction */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span>Simulated Computer Vision Pipeline</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202020] tracking-tight">
          Scan My Electronics
        </h1>
        <p className="text-sm text-[#6B6B6B] mt-1 max-w-2xl font-normal">
          Upload a workbench photo or junk drawer snapshot. SecondLife's optical recognition identifies microcontrollers, sensors, and actuators to recommend immediate builds.
        </p>
      </div>

      {/* Preset Demo Photos (1-Click Demo Convenience) */}
      <div className="p-4 rounded-2xl bg-white/60 border border-[#EDEDED]">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#6B6B6B] mb-2.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span>Quick Demo Benchmarks (1-Click Sample Scans):</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {demoScanPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              disabled={isScanning}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-[#FFFDF9] border border-[#EDEDED] hover:border-orange-500/40 text-left transition-all hover:bg-white disabled:opacity-50 group"
            >
              <img
                src={preset.thumbnail}
                alt={preset.name}
                className="w-12 h-12 rounded-lg object-cover border border-[#EDEDED] shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#202020] group-hover:text-orange-300 truncate">
                  {preset.name}
                </div>
                <div className="text-[10px] text-[#6B6B6B] line-clamp-1 mt-0.5">
                  {preset.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative p-8 sm:p-12 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center overflow-hidden ${
          isDragging
            ? 'border-orange-400 bg-[#FFF1E6] scale-[1.01]'
            : 'border-[#EDEDED]/80 hover:border-orange-500/40 bg-white/40 hover:bg-white/60'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* Display Current Photo or Empty Prompt */}
        {imagePreview ? (
          <div className="relative max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl border border-[#EDEDED]">
            <img
              src={imagePreview}
              alt="Scan preview"
              className="w-full h-64 object-cover"
            />
            {/* Animated Laser Scanning Beam */}
            {isScanning && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent shadow-[0_0_15px_#10b981] animate-scan z-20" />
            )}
            <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-[#FFFDF9]/80 rounded-lg text-[10px] text-[#6B6B6B] font-mono">
              Click to replace image
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center">
              <UploadCloud className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#202020]">
                Drag and drop your electronic parts photo here
              </p>
              <p className="text-xs text-[#6B6B6B] mt-1">
                Supports JPG, PNG, WEBP (or click one of the presets above)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Real-time Scanning Progress Card */}
      {isScanning && (
        <div className="p-6 rounded-2xl bg-white border border-orange-500/40 shadow-xl space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-orange-400 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-orange-400" />
              <span>{scanProgress.label}</span>
            </span>
            <span className="font-mono text-[#202020] font-bold">{scanProgress.percent}%</span>
          </div>

          <div className="w-full bg-[#FFFDF9] h-2 rounded-xl overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-500 to-red-400 h-full rounded-xl transition-all duration-300 shadow-[0_0_10px_#10b981]"
              style={{ width: `${scanProgress.percent}%` }}
            />
          </div>

          <div className="text-[11px] text-[#6B6B6B] flex justify-between">
            <span>Stage {scanProgress.step} of {scanProgress.totalSteps}</span>
            <span>Simulated Inference Engine</span>
          </div>
        </div>
      )}

      {/* Detection Results */}
      {detectionResult && !isScanning && (
        <div className="p-6 rounded-2xl glass-card border border-orange-500/30 shadow-2xl space-y-5 animate-in slide-in-from-bottom-2">
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-orange-400 font-bold text-base">
                <CheckCircle2 className="w-5 h-5" />
                <span>Detection Results ({detectionResult.length} Components Identified)</span>
              </div>
              <p className="text-xs text-[#6B6B6B] mt-0.5">
                Model confidence ratings based on component package markings and PCB pin footprints.
              </p>
            </div>

            <button
              onClick={handleAddAllDetected}
              className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              <span>Add Detected Components to Vault</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Detected List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {detectionResult.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/80 border border-[#EDEDED] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#202020] leading-snug">
                      {item.name}
                    </h4>
                    <span className="text-[10px] text-[#6B6B6B]">
                      {item.category} • {item.weight}g
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded">
                    {item.confidence}% Match
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Architecture disclaimer pill */}
          <div className="p-3 rounded-xl bg-[#FFFDF9]/60 border border-[#EDEDED]/80 text-[11px] text-[#6B6B6B] flex items-center justify-between">
            <span>Ready for Gemini Vision / Edge Model Webhook Integration</span>
            <span className="font-mono text-orange-400">STATUS: 200 OK</span>
          </div>
        </div>
      )}
    </div>
  );
}
