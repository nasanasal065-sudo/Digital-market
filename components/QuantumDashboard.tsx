import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, Thermometer, Cpu, Server } from 'lucide-react';

const data = [
  { name: '00:00', load: 4000, stability: 2400, temp: 10 },
  { name: '04:00', load: 3000, stability: 1398, temp: 12 },
  { name: '08:00', load: 2000, stability: 9800, temp: 8 },
  { name: '12:00', load: 2780, stability: 3908, temp: 9 },
  { name: '16:00', load: 1890, stability: 4800, temp: 11 },
  { name: '20:00', load: 2390, stability: 3800, temp: 10 },
  { name: '24:00', load: 3490, stability: 4300, temp: 10 },
];

const QuantumDashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-tech font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          QUANTUM METRICS DASHBOARD
        </h2>
        <p className="text-slate-400 mt-2 font-mono text-sm">Real-time monitoring of Neural-Links and Qubit Stability</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/50 p-4 rounded-xl border border-cyan-900/50 backdrop-blur">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm font-tech">SYSTEM TEMP</span>
            <Thermometer className="text-blue-500" size={20} />
          </div>
          <div className="text-2xl font-bold text-white">-2273.15°F</div>
          <div className="text-xs text-green-500 mt-1">OPTIMAL (0K)</div>
        </div>

        <div className="bg-slate-900/50 p-4 rounded-xl border border-cyan-900/50 backdrop-blur">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm font-tech">TOKEN VELOCITY</span>
            <Activity className="text-purple-500" size={20} />
          </div>
          <div className="text-2xl font-bold text-white">346.7T / sec</div>
          <div className="text-xs text-purple-400 mt-1">ACCELERATING</div>
        </div>

        <div className="bg-slate-900/50 p-4 rounded-xl border border-cyan-900/50 backdrop-blur">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm font-tech">ACTIVE AGENTS</span>
            <Cpu className="text-cyan-500" size={20} />
          </div>
          <div className="text-2xl font-bold text-white">8,442</div>
          <div className="text-xs text-cyan-400 mt-1">GENERATING LOGOS</div>
        </div>

        <div className="bg-slate-900/50 p-4 rounded-xl border border-cyan-900/50 backdrop-blur">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm font-tech">ECOSYSTEM MEMORY</span>
            <Server className="text-green-500" size={20} />
          </div>
          <div className="text-2xl font-bold text-white">954.4 EB</div>
          <div className="text-xs text-slate-500 mt-1">98% CAPACITY</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl h-80">
          <h3 className="text-cyan-400 font-tech mb-4 text-lg">Quantum Entanglement Stability</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorStability" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#0ea5e9', color: '#f8fafc' }}
                itemStyle={{ color: '#38bdf8' }}
              />
              <Area type="monotone" dataKey="stability" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorStability)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl h-80">
          <h3 className="text-purple-400 font-tech mb-4 text-lg">Neural Network Throughput</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                cursor={{fill: '#1e293b'}}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#a855f7', color: '#f8fafc' }}
              />
              <Bar dataKey="load" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Console Log Simulation */}
      <div className="bg-black border border-slate-800 p-4 rounded-xl font-mono text-xs text-green-500 h-48 overflow-y-auto custom-scrollbar">
        <div className="opacity-70">
          <p>{'>'} INITIALIZING QUANTUM CORE...</p>
          <p>{'>'} LOADING ORIGIN DNA DATABASE...</p>
          <p>{'>'} CONNECTING TO CORTANA NEURAL LINK...</p>
          <p>{'>'} SHOR'S ALGORITHM OPTIMIZED.</p>
          <p>{'>'} GENERATING LOGO BUNDLE #44599 [400GB]...</p>
          <p>{'>'} DETECTED NEW FINANCIAL MARKET PATTERN.</p>
          <p>{'>'} SYSTEM OPTIMIZATION: 99.9%</p>
          <p>{'>'} CHECKING API PROTOCOLS...</p>
          <p>{'>'} MULTI-AGENT SYNC COMPLETE.</p>
        </div>
        <div className="animate-pulse">{'>'} _</div>
      </div>
    </div>
  );
};

export default QuantumDashboard;