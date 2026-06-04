'use client';
import { useState } from 'react';
import axios from 'axios';
import { Search, GraduationCap, Trophy, MapPin, IndianRupee, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PredictorPage() {
  const [rank, setRank] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handlePredict = async (e) => {
    e.preventDefault();
    if (!rank) return;
    
    setLoading(true);
    setSearched(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await axios.get(`${apiUrl}/colleges/predict?rank=${rank}`);
      setResults(res.data);
    } catch (err) {
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl animate-slide-up">
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 border border-blue-500/25 mb-4 uppercase tracking-widest">
          Rank Matching Engine
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-800 mb-4 tracking-tight uppercase">
          Admission <span className="text-blue-600">Predictor Tool</span>
        </h1>
        <p className="text-slate-500 max-w-xl mx-auto leading-relaxed text-sm font-semibold">
          Enter your national entrance exam rank (e.g. JEE Main/Advanced) to identify top-tier institutions within your expected cutoff brackets.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl mb-16 max-w-xl mx-auto relative overflow-hidden">
        {/* Subtle decorative accents */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full"></div>
        
        <form onSubmit={handlePredict} className="space-y-6 relative z-10">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">
              Enter Entrance Exam Rank
            </label>
            <div className="relative">
              <Trophy className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" />
              <input
                type="number"
                placeholder="e.g. 2500"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none text-base font-bold text-slate-800 shadow-sm"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                min="1"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-sm shadow-md shadow-blue-100 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Predict Matching Colleges
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {searched && (
        <div className="space-y-8 animate-fade-in">
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2 pb-4 border-b border-slate-100">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            Recommended Colleges for Rank {Number(rank).toLocaleString()}
          </h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((college) => (
                <div key={college.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-start gap-4 group">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0 border border-slate-100">
                    <img 
                      src={college.image_url || 'https://via.placeholder.com/150'} 
                      alt={college.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <h3 className="font-extrabold text-slate-800 text-sm line-clamp-1 uppercase leading-tight mb-1">{college.name}</h3>
                    
                    <div className="flex items-center text-slate-400 text-xs font-semibold mb-3">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      {college.location}
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                      <span className="text-blue-600 font-extrabold text-xs">
                        ₹{Number(college.fees).toLocaleString('en-IN')}
                        <span className="text-[10px] text-slate-400 font-semibold ml-0.5">/ yr</span>
                      </span>
                      <Link 
                        href={`/college/${college.id}`}
                        className="text-[10px] font-black text-slate-400 hover:text-blue-600 transition flex items-center gap-0.5 tracking-wider"
                      >
                        VIEW DETAILS
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 max-w-md mx-auto shadow-sm">
              <p className="text-slate-400 text-sm font-semibold italic">No eligible colleges found.</p>
              <p className="text-slate-400 text-xs mt-1">Try entering a slightly different entrance rank range.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

