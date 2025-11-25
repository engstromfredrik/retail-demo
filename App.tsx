import React, { useState, useEffect } from 'react';
import { ResolverConfig, ViewMode, ProductData } from './types';
import { DEFAULT_RESOLVER_URL, MOCK_PRODUCTS, Icons } from './constants';
import { ProductView } from './components/ProductView';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.SCAN);
  const [config, setConfig] = useState<ResolverConfig>({
    baseUrl: DEFAULT_RESOLVER_URL,
    useMockData: true
  });
  
  // Initialize input from URL param if present
  const [gtinInput, setGtinInput] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('gtin') || '';
    }
    return '';
  });

  const [currentProduct, setCurrentProduct] = useState<ProductData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Core resolution logic separated from event handlers
  const performResolution = async (gtin: string, currentConfig: ResolverConfig) => {
    setError(null);
    setLoading(true);

    // Simulate network delay for realism
    await new Promise(r => setTimeout(r, 800));

    if (currentConfig.useMockData) {
      const product = MOCK_PRODUCTS[gtin];
      if (product) {
        setCurrentProduct(product);
        setViewMode(ViewMode.PRODUCT);
      } else {
        setError("GTIN not found. Try one of the quick options below.");
        setViewMode(ViewMode.SCAN);
      }
    } else {
      setError(`Resolution to ${currentConfig.baseUrl} is not active in this demo.`);
      setViewMode(ViewMode.SCAN);
    }
    setLoading(false);
  };

  useEffect(() => {
    // 1. Load Config
    const savedConfigStr = localStorage.getItem('resolverConfig');
    let activeConfig = config;
    
    if (savedConfigStr) {
      activeConfig = JSON.parse(savedConfigStr);
      setConfig(activeConfig);
    }

    // 2. Check for GTIN query param to auto-resolve
    const params = new URLSearchParams(window.location.search);
    const gtinParam = params.get('gtin');

    if (gtinParam) {
      // Trigger resolution with the loaded config
      performResolution(gtinParam, activeConfig);
    }
  }, []);

  const handleResolve = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    performResolution(gtinInput, config);
  };

  const handleConfigSave = (newConfig: ResolverConfig) => {
    setConfig(newConfig);
    localStorage.setItem('resolverConfig', JSON.stringify(newConfig));
    setViewMode(ViewMode.SCAN);
  };

  const ConfigView = () => (
    <div className="max-w-md mx-auto w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 animate-in zoom-in-95 duration-300">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-800">
            <div className="p-2 bg-slate-100 rounded-lg"><Icons.Settings /></div>
            Resolver Settings
        </h2>
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">Resolver Endpoint</label>
                <input 
                    type="text" 
                    value={config.baseUrl}
                    onChange={(e) => setConfig({...config, baseUrl: e.target.value})}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gs1-orange/20 focus:border-gs1-orange outline-none transition-all font-mono text-sm"
                />
            </div>
            <label className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors group">
                <input 
                    type="checkbox" 
                    checked={config.useMockData}
                    onChange={(e) => setConfig({...config, useMockData: e.target.checked})}
                    className="w-5 h-5 accent-gs1-orange rounded focus:ring-gs1-orange"
                />
                <div className="flex-1">
                    <div className="font-semibold text-slate-800">Demo Mode</div>
                    <div className="text-xs text-slate-500">Use local mock data instead of live API</div>
                </div>
            </label>
        </div>
        <div className="mt-8 flex gap-3">
            <button 
                onClick={() => setViewMode(ViewMode.SCAN)}
                className="flex-1 py-3.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
                Cancel
            </button>
            <button 
                onClick={() => handleConfigSave(config)}
                className="flex-1 py-3.5 rounded-xl bg-gs1-orange text-white font-semibold shadow-lg shadow-gs1-orange/30 hover:bg-orange-600 transition-all transform hover:-translate-y-0.5"
            >
                Save
            </button>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-gs1-orange/20 selection:text-gs1-orange">
        {/* Background Patterns */}
        <div className="fixed inset-0 z-0 opacity-40 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        {viewMode === ViewMode.SCAN && (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10">
                <div className="w-full max-w-lg">
                    {/* Header */}
                    <div className="text-center mb-12 animate-in slide-in-from-bottom-8 duration-700 fade-in">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-gs1-blue to-blue-600 rounded-3xl shadow-xl shadow-blue-900/10 mb-8 transform rotate-3 hover:rotate-6 transition-transform duration-500">
                            <div className="text-white"><Icons.Scan /></div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                            Digital Link
                            <span className="text-gs1-orange">.</span>
                        </h1>
                        <p className="text-lg text-slate-500 max-w-xs mx-auto leading-relaxed">
                            Experience the future of retail transparency and engagement.
                        </p>
                    </div>

                    {/* Search Box */}
                    <div className="bg-white p-2 rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 transform transition-all hover:scale-[1.01] focus-within:scale-[1.01] focus-within:ring-4 focus-within:ring-gs1-orange/10 mb-8 animate-in slide-in-from-bottom-6 duration-700 delay-100 fade-in fill-mode-backwards">
                        <form onSubmit={handleResolve} className="flex items-center">
                            <div className="pl-5 pr-3 text-slate-400">
                                <Icons.Search />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Enter GTIN (e.g., 950600...)"
                                value={gtinInput}
                                onChange={(e) => setGtinInput(e.target.value)}
                                className="flex-1 p-4 bg-transparent outline-none text-lg text-slate-800 placeholder:text-slate-300 font-medium"
                            />
                            <button 
                                type="submit"
                                disabled={loading}
                                className="bg-gs1-orange text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-colors disabled:opacity-70 shadow-lg shadow-gs1-orange/20"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : 'Resolve'}
                            </button>
                        </form>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl text-sm text-center border border-red-100 animate-in fade-in slide-in-from-top-2">
                            {error}
                        </div>
                    )}

                    {/* Quick Links */}
                    <div className="text-center animate-in slide-in-from-bottom-4 duration-700 delay-200 fade-in fill-mode-backwards">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Demo Products</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {Object.entries(MOCK_PRODUCTS).map(([gtin, prod]) => (
                                <button
                                    key={gtin}
                                    onClick={() => {
                                        setGtinInput(gtin);
                                        // Trigger resolution immediately for better UX
                                        performResolution(gtin, config);
                                    }}
                                    className="group flex items-center gap-3 pl-2 pr-4 py-2 bg-white border border-slate-200 rounded-full hover:border-gs1-blue hover:shadow-lg hover:shadow-blue-900/5 transition-all"
                                >
                                    <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden">
                                        <img src={prod.image} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-xs font-bold text-slate-700 group-hover:text-gs1-blue transition-colors">{prod.brand}</div>
                                        <div className="text-[10px] text-slate-400 font-mono">{gtin}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Footer Settings */}
                    <div className="mt-16 text-center animate-in fade-in duration-1000 delay-300">
                        <button 
                            onClick={() => setViewMode(ViewMode.SETTINGS)}
                            className="text-slate-400 hover:text-slate-600 inline-flex items-center gap-2 text-sm font-medium transition-colors px-4 py-2 rounded-lg hover:bg-slate-100"
                        >
                            <Icons.Settings /> 
                            <span>Configure Resolver</span>
                        </button>
                    </div>
                </div>
            </div>
        )}

        {viewMode === ViewMode.PRODUCT && currentProduct && (
            <ProductView 
                product={currentProduct} 
                onBack={() => {
                    setCurrentProduct(null);
                    setViewMode(ViewMode.SCAN);
                    // Optional: clear URL param on back
                    if (window.history.pushState) {
                        const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                        window.history.pushState({path:newurl},'',newurl);
                    }
                    setGtinInput('');
                }} 
            />
        )}

        {viewMode === ViewMode.SETTINGS && (
            <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
                 <ConfigView />
            </div>
        )}
    </div>
  );
}

export default App;