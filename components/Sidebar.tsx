import React from 'react';
import { X, Layers, Database, Cpu, Shield, Globe, Zap, Network, Activity } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, setActiveView }) => {
  const menuItems = [
    { id: 'market', icon: <Layers className="w-5 h-5" />, label: 'Ecosystem Market' },
    { id: 'lab', icon: <Cpu className="w-5 h-5" />, label: 'AI Agent Lab' },
    { id: 'dashboard', icon: <Activity className="w-5 h-5" />, label: 'Quantum Metrics' },
    { id: 'dna', icon: <Database className="w-5 h-5" />, label: 'Origin DNA Database' },
    { id: 'neural', icon: <Network className="w-5 h-5" />, label: 'Neural Link Config' },
    { id: 'security', icon: <Shield className="w-5 h-5" />, label: 'Shield Protocols' },
    { id: 'automation', icon: <Zap className="w-5 h-5" />, label: 'Automation Flows' },
    { id: 'global', icon: <Globe className="w-5 h-5" />, label: 'Global Node Map' },
  ];

  return (
    <div className={`fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Sidebar Content */}
      <div className="relative w-80 h-full bg-slate-900 border-r border-cyan-500/30 shadow-[0_0_50px_rgba(8,145,178,0.3)] flex flex-col">
        <div className="p-6 border-b border-cyan-500/20 flex justify-between items-center bg-slate-950">
          <h2 className="text-2xl font-tech font-bold text-cyan-400 tracking-wider">SYSTEM MENU</h2>
          <button onClick={onClose} className="text-cyan-400 hover:text-white transition-colors">
            <X size={28} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id);
                onClose();
              }}
              className="w-full flex items-center space-x-4 p-4 rounded-lg hover:bg-cyan-900/20 hover:border-l-4 hover:border-cyan-400 transition-all duration-200 group text-left"
            >
              <div className="text-cyan-600 group-hover:text-cyan-300 transition-colors">
                {item.icon}
              </div>
              <span className="text-slate-300 group-hover:text-white font-tech tracking-wide text-lg">
                {item.label}
              </span>
            </button>
          ))}
          
          <div className="mt-8 px-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-widest">Advanced Layers</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-slate-400 p-2 bg-slate-950 rounded border border-slate-800">
                <span>Quantum Encryption</span>
                <span className="text-green-500 text-xs">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-400 p-2 bg-slate-950 rounded border border-slate-800">
                <span>Neuron Chips</span>
                <span className="text-cyan-500 text-xs">-2273°C</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-400 p-2 bg-slate-950 rounded border border-slate-800">
                <span>Compression</span>
                <span className="text-yellow-500 text-xs">ULTRA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-cyan-500/20 bg-slate-950">
          <div className="text-xs text-center text-cyan-700 font-mono">
            SYSTEM VERSION 9.4.2<br/>
            CORTANA KERNEL ONLINE
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;