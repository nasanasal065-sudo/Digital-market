import React, { useState } from 'react';
import { generateProductConcept } from '../services/geminiService';
import { Product, ProductType } from '../types';
import { Sparkles, Zap, Brain, Loader2 } from 'lucide-react';

interface AIAgentLabProps {
  onProductCreated: (product: Product) => void;
}

const AIAgentLab: React.FC<AIAgentLabProps> = ({ onProductCreated }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastLog, setLastLog] = useState<string>('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setLastLog('Initializing Gemini 2.5 Flash Agent...');
    
    // Simulate steps for effect
    setTimeout(() => setLastLog('Connecting to Quantum Neural Net...'), 800);
    setTimeout(() => setLastLog('Synthesizing DNA Signature...'), 1600);

    const result = await generateProductConcept(prompt);

    if (result) {
      setLastLog('Compiling Asset Bundle...');
      const newProduct: Product = {
        id: `gen-${Date.now()}`,
        title: result.title || 'Unknown Asset',
        description: result.description || 'No description data.',
        price: result.price || 99.00,
        type: result.type || ProductType.LOGO_BUNDLE,
        size: '400GB',
        tags: result.tags || ['AI', 'Generated'],
        imageUrl: `https://picsum.photos/400/400?random=${Date.now()}`,
        dnaSignature: result.dnaSignature || `DNA-${Date.now()}`,
        generatedBy: 'Cortana-Live-Agent-X'
      };

      onProductCreated(newProduct);
      setPrompt('');
      setLastLog(`Success: ${newProduct.title} added to Marketplace.`);
    } else {
      setLastLog('Error: Quantum Interference Detected. Generation Failed.');
    }
    
    setIsGenerating(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-tech font-bold text-white mb-2 text-glow">
          AI AGENT LAB
        </h2>
        <p className="text-cyan-400 font-mono">Create. Evolve. Deploy.</p>
      </div>

      <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur shadow-[0_0_50px_rgba(8,145,178,0.2)]">
        
        {/* Holographic Input Area */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-slate-300 mb-2 font-tech tracking-wider uppercase">
            Product Instruction Protocol
          </label>
          <div className="relative">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the digital asset (e.g., 'A cyberpunk financial spreadsheet for crypto' or '400GB bundle of organic logo templates')"
              className="w-full h-32 bg-black/50 border border-slate-700 rounded-xl p-4 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono resize-none"
              disabled={isGenerating}
            />
            <div className="absolute bottom-4 right-4 text-xs text-slate-500">
              CORTANA LLM CONNECTED
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
              <Brain size={16} className="text-purple-500" />
              <span className="text-xs">MODEL: GEMINI-2.5-FLASH</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
              <Zap size={16} className="text-yellow-500" />
              <span className="text-xs">SPEED: ULTRA</span>
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className={`
              relative overflow-hidden group px-8 py-4 rounded-xl font-bold font-tech tracking-widest text-lg transition-all duration-300
              ${isGenerating ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(8,145,178,0.6)]'}
            `}
          >
            <span className="relative z-10 flex items-center space-x-2">
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>PROCESSING DNA...</span>
                </>
              ) : (
                <>
                  <Sparkles />
                  <span>INITIATE GENERATION</span>
                </>
              )}
            </span>
            {/* Background Glow Effect */}
            {!isGenerating && (
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            )}
          </button>
        </div>

        {/* Live Logs */}
        <div className="mt-8 border-t border-slate-800 pt-6">
          <div className="font-mono text-sm text-green-400">
            <span className="text-slate-500 mr-2">[{new Date().toLocaleTimeString()}]</span>
            {lastLog || "Ready for input..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgentLab;