import React, { useState } from 'react';
import { ProductData } from '../types';
import { Icons } from '../constants';
import { SustainabilityChart } from './SustainabilityChart';
import { AIAssistant } from './AIAssistant';

interface ProductViewProps {
  product: ProductData;
  onBack: () => void;
}

export const ProductView: React.FC<ProductViewProps> = ({ product, onBack }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'trace' | 'impact'>('info');

  const NutriScore = ({ score }: { score: string }) => {
    const scores = [
        { l: 'A', c: '#038141' },
        { l: 'B', c: '#85BB2F' },
        { l: 'C', c: '#FECB02' },
        { l: 'D', c: '#EE8100' },
        { l: 'E', c: '#E63E11' }
    ];
    return (
        <div className="flex rounded-md overflow-hidden border border-slate-200">
            {scores.map((s) => (
                <div 
                    key={s.l} 
                    className={`w-8 h-10 flex items-center justify-center text-white font-bold text-sm transition-all ${
                        score === s.l ? 'opacity-100 scale-110 z-10 shadow-md' : 'opacity-30 grayscale'
                    }`}
                    style={{ backgroundColor: s.c }}
                >
                    {s.l}
                </div>
            ))}
        </div>
    );
  };

  const EcoScore = ({ score }: { score: string }) => {
     const config: any = {
         'A': { color: '#1E8F4E', width: 'w-full' },
         'B': { color: '#2ECC71', width: 'w-4/5' },
         'C': { color: '#F1C40F', width: 'w-3/5' },
         'D': { color: '#E67E22', width: 'w-2/5' },
         'E': { color: '#E74C3C', width: 'w-1/5' },
     };
     const c = config[score] || config['A'];
     
     return (
         <div className="relative w-12 h-12">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={c.color} strokeWidth="4" strokeDasharray={`${score === 'A' ? 100 : score === 'B' ? 80 : 60}, 100`} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-700">
                {score}
            </div>
         </div>
     );
  };

  return (
    <div className="min-h-screen bg-slate-50 relative">
      {/* Immersive Hero */}
      <div className="fixed top-0 left-0 w-full h-[55vh] z-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/10"></div>
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-lg border border-white/20 rounded-full text-white hover:bg-white/30 transition-all z-20"
        >
          <Icons.ArrowLeft />
        </button>
      </div>

      {/* Scrollable Content Sheet */}
      <div className="relative z-10 pt-[45vh]">
        <div className="bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] min-h-[55vh] pb-24 animate-in slide-in-from-bottom-24 duration-700">
            
            {/* Header Content */}
            <div className="px-8 pt-8 pb-6 border-b border-slate-100">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <span className="inline-block px-3 py-1 bg-gs1-orange/10 text-gs1-orange text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                            {product.brand}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-2">{product.name}</h1>
                        <p className="text-slate-400 font-mono text-sm">GTIN: {product.gtin}</p>
                    </div>
                    {/* QR Placeholder */}
                    <div className="hidden md:block bg-white p-2 rounded-xl shadow-lg border border-slate-100">
                        <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                            <Icons.Scan />
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 p-1 bg-slate-100/80 rounded-xl overflow-x-auto no-scrollbar">
                    {['info', 'trace', 'impact'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`flex-1 py-2.5 px-4 text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
                                activeTab === tab 
                                ? 'bg-white text-gs1-blue shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {tab === 'info' && 'Overview'}
                            {tab === 'trace' && 'Journey'}
                            {tab === 'impact' && 'Impact'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-8 max-w-4xl mx-auto">
                {activeTab === 'info' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <p className="text-lg text-slate-600 leading-relaxed font-light">
                        {product.description}
                    </p>
                    
                    {/* Key Attributes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                <Icons.Leaf /> Ingredients
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {product.ingredients.map((ing, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-slate-50 text-slate-700 text-sm rounded-lg border border-slate-200">
                                        {ing}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="font-bold text-slate-900">Nutrition & Ecology</h3>
                            <div className="flex items-center gap-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-xs font-semibold text-slate-400 uppercase">Nutri-Score</span>
                                    <NutriScore score={product.nutriScore} />
                                </div>
                                <div className="w-px h-12 bg-slate-200"></div>
                                <div className="flex flex-col items-center gap-2">
                                    <span className="text-xs font-semibold text-slate-400 uppercase">Eco-Score</span>
                                    <div className="flex items-center gap-2">
                                        <EcoScore score={product.ecoScore} />
                                        <span className="font-bold text-slate-700 text-lg">{product.ecoScore}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                )}

                {activeTab === 'trace' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Product Journey</h3>
                                <p className="text-sm text-slate-500 mt-1">From source to shelf</p>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Batch ID</div>
                                <div className="font-mono font-medium text-slate-700 bg-white px-2 py-1 rounded border border-slate-200">
                                    {product.traceability.batchCode}
                                </div>
                            </div>
                        </div>

                        <div className="relative pl-4">
                            {/* Line */}
                            <div className="absolute left-[27px] top-4 bottom-12 w-0.5 bg-gradient-to-b from-gs1-blue/20 to-gs1-blue/5"></div>
                            
                            <div className="space-y-10">
                                {product.traceability.journeySteps.map((step, idx) => {
                                    const isLast = idx === product.traceability.journeySteps.length - 1;
                                    return (
                                        <div key={idx} className="relative flex items-start gap-6 group">
                                            {/* Dot */}
                                            <div className={`
                                                relative z-10 w-6 h-6 rounded-full border-4 flex-shrink-0 mt-1 transition-all duration-300
                                                ${isLast 
                                                    ? 'bg-gs1-blue border-blue-100 shadow-[0_0_0_4px_rgba(0,44,108,0.1)] scale-110' 
                                                    : 'bg-white border-slate-300'
                                                }
                                            `}>
                                                {isLast && <div className="absolute inset-0 bg-gs1-blue rounded-full animate-ping opacity-20"></div>}
                                            </div>
                                            
                                            {/* Content */}
                                            <div className={`flex-1 p-4 rounded-xl transition-all ${isLast ? 'bg-white shadow-lg shadow-slate-200/50 border border-slate-100' : ''}`}>
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className={`font-bold text-lg ${isLast ? 'text-gs1-blue' : 'text-slate-800'}`}>
                                                        {step.status}
                                                    </span>
                                                    <span className="text-xs font-medium text-slate-400 bg-white px-2 py-1 rounded-full border border-slate-100">
                                                        {step.date}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-500 text-sm">
                                                    <Icons.MapPin />
                                                    {step.location}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-6 p-6 bg-indigo-900 rounded-2xl text-white overflow-hidden relative">
                         <div className="relative z-10 flex items-center gap-4">
                             <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                                 <Icons.Globe />
                             </div>
                             <div>
                                 <div className="text-indigo-200 text-xs uppercase tracking-wider font-semibold">Origin Verified</div>
                                 <div className="text-xl font-bold">{product.traceability.origin}</div>
                                 <div className="text-indigo-200 text-sm mt-1">{product.traceability.manufacturer}</div>
                             </div>
                         </div>
                         {/* Decor */}
                         <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                    </div>
                  </div>
                )}

                {activeTab === 'impact' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                     <SustainabilityChart data={product.sustainability} />
                     
                     <div className="grid grid-cols-2 gap-4">
                        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 flex flex-col items-center justify-center text-center">
                            <div className="text-4xl font-bold text-gs1-orange mb-2">{product.sustainability.recyclability}%</div>
                            <div className="text-sm font-semibold text-orange-800">Recyclability</div>
                            <div className="text-xs text-orange-600 mt-1">Packaging Material</div>
                        </div>
                        <div className="bg-cyan-50 p-6 rounded-2xl border border-cyan-100 flex flex-col items-center justify-center text-center">
                            <div className="text-4xl font-bold text-gs1-sky mb-2">{product.sustainability.waterUsage}L</div>
                            <div className="text-sm font-semibold text-cyan-800">Water Footprint</div>
                            <div className="text-xs text-cyan-600 mt-1">Per Unit Produced</div>
                        </div>
                     </div>
                     
                     <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
                         <div className="relative z-10">
                            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <Icons.Leaf /> Eco-Fact
                            </h4>
                            <p className="text-slate-300 leading-relaxed">
                                {product.sustainability.packaging} used in this product reduces plastic waste by 20% compared to industry standards.
                            </p>
                         </div>
                         <div className="absolute -right-4 -bottom-4 text-slate-800 opacity-20 transform rotate-12">
                             <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm0-18c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8z"/></svg>
                         </div>
                     </div>
                  </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};