import React from 'react';
import { Product } from '../types';
import { ShoppingCart, HardDrive, Cpu, Database } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="relative group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col h-full">
      {/* Image / Preview Area */}
      <div className="relative h-48 overflow-hidden bg-slate-950">
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
        />
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur text-cyan-400 text-xs px-2 py-1 rounded border border-cyan-900">
          {product.size || 'UNKNOWN SIZE'}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent h-20"></div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-cyan-600 border border-cyan-900/50 px-2 py-0.5 rounded">
            {product.type}
          </span>
          <div className="flex items-center space-x-1 text-xs text-slate-500">
            <Cpu size={12} />
            <span>{product.generatedBy || 'Unknown Agent'}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 leading-tight font-tech group-hover:text-cyan-300 transition-colors">
          {product.title}
        </h3>
        
        <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-1">
          {product.description}
        </p>

        {/* DNA Signature */}
        <div className="flex items-center space-x-2 text-[10px] text-slate-600 font-mono mb-4 bg-slate-950 p-2 rounded">
          <Database size={10} className="text-purple-500" />
          <span className="truncate">{product.dnaSignature}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800">
          <span className="text-xl font-bold text-cyan-400">
            ${product.price.toFixed(2)}
          </span>
          <button 
            onClick={() => onAddToCart(product)}
            className="flex items-center space-x-2 bg-cyan-900/30 hover:bg-cyan-600 text-cyan-400 hover:text-white px-4 py-2 rounded-lg transition-all duration-200 border border-cyan-800 hover:border-cyan-400"
          >
            <ShoppingCart size={16} />
            <span className="text-sm font-semibold">ACQUIRE</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;