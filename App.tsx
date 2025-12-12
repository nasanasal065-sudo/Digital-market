import React, { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, NAV_LINKS } from './constants';
import { Product } from './types';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import AIAgentLab from './components/AIAgentLab';
import QuantumDashboard from './components/QuantumDashboard';
import { Menu, Search, Hexagon } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('market');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');

  // Sticky header logic
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProductCreated = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    setActiveView('market');
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500 selection:text-white">
      
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-white/5 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="text-cyan-400 hover:text-white transition-colors p-2 hover:bg-cyan-900/20 rounded-lg"
            >
              <Menu size={28} />
            </button>
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveView('market')}>
              <Hexagon className="text-cyan-500 fill-cyan-500/20 animate-pulse-fast" size={32} />
              <div>
                <h1 className="text-xl font-bold font-tech leading-none text-white tracking-wider">CORTANA</h1>
                <span className="text-[10px] text-cyan-500 tracking-[0.2em] font-mono">QUANTUM NEXUS</span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1 bg-slate-900/50 rounded-full px-4 py-2 border border-slate-700 focus-within:border-cyan-500 transition-colors w-96">
            <Search size={18} className="text-slate-500" />
            <input 
              type="text" 
              placeholder="Search Origin DNA Database..." 
              className="bg-transparent border-none focus:outline-none text-sm w-full text-white placeholder-slate-500 font-mono"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            {NAV_LINKS.map(link => (
              <button 
                key={link.id}
                onClick={() => setActiveView(link.id)}
                className={`text-sm font-bold font-tech uppercase tracking-wide transition-colors ${activeView === link.id ? 'text-cyan-400 text-glow' : 'text-slate-400 hover:text-white'}`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        setActiveView={setActiveView}
      />

      {/* Main Content Area */}
      <main className="pt-24 pb-12 container mx-auto px-4 min-h-screen">
        
        {/* View Switcher */}
        {activeView === 'market' && (
          <div className="animate-fade-in-up">
            <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-3xl font-tech font-bold text-white">ECOSYSTEM MARKETPLACE</h2>
                <p className="text-slate-400 font-mono text-sm mt-1">Available Assets: {products.length} | Neural Network: ONLINE</p>
              </div>
              <div className="flex space-x-2">
                 {['ALL', 'BUNDLES', 'EBOOKS', 'AI'].map(filter => (
                   <button key={filter} className="text-xs font-bold px-3 py-1 border border-slate-700 rounded hover:bg-cyan-900/30 hover:text-cyan-400 transition-colors text-slate-500">
                     {filter}
                   </button>
                 ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={(p) => alert(`Initiating Quantum Transfer for: ${p.title}`)} 
                />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 text-slate-500 font-mono">
                NO ASSETS FOUND IN CURRENT SECTOR.
              </div>
            )}
          </div>
        )}

        {activeView === 'lab' && <AIAgentLab onProductCreated={handleProductCreated} />}
        
        {activeView === 'dashboard' && <QuantumDashboard />}

        {activeView === 'dna' && (
          <div className="flex items-center justify-center h-[60vh] flex-col text-center">
             <Hexagon size={64} className="text-purple-500 animate-spin-slow mb-4" />
             <h2 className="text-2xl font-tech text-white">ORIGIN DNA DATABASE</h2>
             <p className="text-slate-500 font-mono mt-2">Access Restricted. Level 5 Clearance Required.</p>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 mt-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Hexagon className="text-cyan-600" size={20} />
              <span className="font-tech font-bold text-lg text-white">CORTANA NEXUS</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              Powered by Quantum AGI and Gemini 2.5 Flash. The world's first autonomous digital asset ecosystem.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 font-tech">SYSTEMS</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>Quantum Core</li>
              <li>Neural Link</li>
              <li>Automation API</li>
              <li>Origin DNA</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 font-tech">LEGAL</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>Terms of Entanglement</li>
              <li>Privacy Protocols</li>
              <li>AI Ethics License</li>
            </ul>
          </div>
          <div className="font-mono text-xs text-slate-600">
            <p>SERVER STATUS: ONLINE</p>
            <p>TEMP: 10K</p>
            <p>LOCATION: CLOUD NODE 7</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;