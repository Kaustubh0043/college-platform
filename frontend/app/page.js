'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Star, MapPin, IndianRupee, Loader2, ArrowRight, X, BarChart3, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useComparison } from '@/context/ComparisonContext';

export default function Home() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [maxFee, setMaxFee] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { addToCompare, removeFromCompare, clearComparison, selectedColleges, isLoaded: comparisonContextLoaded } = useComparison();

  // Load initial cache from localStorage (SWR pattern)
  useEffect(() => {
    const cached = localStorage.getItem('cached_colleges_page_1');
    if (cached && page === 1 && !search && !location && !maxFee) {
      try {
        const { colleges: list, totalPages: pages } = JSON.parse(cached);
        setColleges(list);
        setTotalPages(pages);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const fetchColleges = async (showLoadingIndicator = true) => {
    if (showLoadingIndicator) {
      setLoading(true);
    }
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await axios.get(`${apiUrl}/colleges`, {
        params: { search, location, maxFee, page, limit: 6 }
      });
      const data = res.data.colleges || [];
      const totalP = res.data.pagination?.totalPages || 1;
      
      setColleges(data);
      setTotalPages(totalP);

      // Save to cache for return visits
      if (page === 1 && !search && !location && !maxFee) {
        localStorage.setItem('cached_colleges_page_1', JSON.stringify({
          colleges: data,
          totalPages: totalP
        }));
      }
    } catch (err) {
      console.error('Error fetching colleges:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If we have cached data, fetch in the background without showing full loader
    const cached = typeof window !== 'undefined' ? localStorage.getItem('cached_colleges_page_1') : null;
    const hasCache = cached && page === 1 && !search && !location && !maxFee;
    fetchColleges(!hasCache);
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchColleges(true);
  };

  const handleReset = () => {
    setSearch('');
    setLocation('');
    setMaxFee('');
    setPage(1);
    setTimeout(() => fetchColleges(true), 0);
  };

  return (
    <div className="relative min-h-screen pb-32">
      {/* Premium Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 py-16 sm:py-24 text-white">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400 via-indigo-900 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full blur-[128px] opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500 rounded-full blur-[128px] opacity-20"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/25 mb-4 uppercase tracking-widest">
            🇮🇳 India's Premier College Guide
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6">
            Discover Your Perfect <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Academic Future</span>
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-8">
            Compare side-by-side rankings, cutoffs, and genuine reviews of 30+ elite Indian engineering, management, and arts institutions.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        {/* Sleek Floating Filters Board */}
        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-slate-100 mb-12">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Search College Name</label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="e.g. IIT Madras..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:border-blue-500 focus:bg-white transition duration-200 outline-none text-slate-800 text-sm font-semibold"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Preferred Location</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="e.g. Pune, Delhi..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:border-blue-500 focus:bg-white transition duration-200 outline-none text-slate-800 text-sm font-semibold"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Maximum Fees (Per Year)</label>
              <div className="relative">
                <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="number"
                  placeholder="e.g. 500000"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:border-blue-500 focus:bg-white transition duration-200 outline-none text-slate-800 text-sm font-semibold"
                  value={maxFee}
                  onChange={(e) => setMaxFee(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition duration-200 flex items-center justify-center text-sm gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              <button
                type="submit"
                className="py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-100 hover:shadow-lg transition-all duration-200 flex items-center justify-center text-sm gap-1.5 cursor-pointer"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-80 gap-3">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Fetching Colleges...</p>
          </div>
        ) : (
          <div className="animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {colleges.map((college) => {
                const isSelected = selectedColleges.some(c => c.id === college.id);
                return (
                  <div key={college.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full group">
                    {/* College Banner Card */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      {(!college.image_url || college.image_url.includes('placehold.co')) ? (
                        <div className={`absolute inset-0 bg-gradient-to-br ${
                          [
                            'from-blue-600 to-indigo-850',
                            'from-violet-600 to-indigo-900',
                            'from-emerald-600 to-teal-850',
                            'from-rose-500 to-rose-800',
                            'from-amber-500 to-orange-750',
                            'from-purple-600 to-indigo-800',
                          ][Number(college.id) % 6]
                        } flex items-center justify-center`}>
                          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                        </div>
                      ) : (
                        <img
                          src={college.image_url}
                          alt={college.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                      
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-xl flex items-center shadow-sm">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
                        <span className="text-xs font-black text-slate-800">{Number(college.rating).toFixed(1)}</span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="text-white text-base font-black uppercase tracking-wide truncate drop-shadow-md">
                          {college.name}
                        </h4>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 italic">
                        "{college.description || 'Discover a rich learning ecosystem dedicated to empowering excellence.'}"
                      </p>

                      <div className="mt-auto space-y-3.5 pt-4 border-t border-slate-50">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            Location
                          </span>
                          <span className="text-slate-700 font-bold max-w-[180px] truncate">
                            {college.location}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                            <IndianRupee className="w-4 h-4 text-slate-400" />
                            Tuition Fees
                          </span>
                          <span className="text-blue-600 font-extrabold text-base">
                            ₹{college.fees ? Number(college.fees).toLocaleString('en-IN') : 'N/A'}
                            <span className="text-[10px] text-slate-400 font-medium ml-0.5">/ yr</span>
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-6">
                        <Link
                          href={`/college/${college.id}`}
                          className="text-center py-2.5 border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 hover:border-slate-300 transition duration-200 text-xs"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => isSelected ? removeFromCompare(college.id) : addToCompare(college)}
                          className={`py-2.5 rounded-2xl font-bold transition duration-200 text-xs cursor-pointer flex items-center justify-center gap-1 ${
                            isSelected
                              ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100/50'
                              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-100'
                          }`}
                        >
                          {isSelected ? 'Selected' : 'Compare'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-16 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-11 h-11 rounded-2xl font-bold transition duration-200 text-sm cursor-pointer ${
                      page === p
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {colleges.length === 0 && !loading && (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200 max-w-xl mx-auto shadow-sm">
            <h2 className="text-xl font-bold text-slate-700 mb-2">No institutions found</h2>
            <p className="text-slate-400 text-sm mb-6">We couldn't find colleges matching your current criteria.</p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 transition"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Floating Comparison Drawer (Bottom Dock) */}
      {comparisonContextLoaded && selectedColleges.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4 animate-slide-up">
          <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 text-white p-4 rounded-3xl shadow-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/25">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Comparison Engine</p>
                <p className="text-sm font-bold text-white">
                  {selectedColleges.length} {selectedColleges.length === 1 ? 'College' : 'Colleges'} Selected
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearComparison}
                className="p-2 text-slate-400 hover:text-white transition duration-200 text-xs font-bold uppercase tracking-wider"
              >
                Clear
              </button>
              <Link
                href="/compare"
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-1 shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20 transition-all duration-200"
              >
                Compare Now
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

