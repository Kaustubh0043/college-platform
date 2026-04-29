'use client';
import { useState } from 'react';
import axios from 'axios';
import { Search, GraduationCap, Trophy, MapPin, IndianRupee, Loader2 } from 'lucide-react';
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
      const res = await axios.get(`http://localhost:5000/api/colleges/predict?rank=${rank}`);
      setResults(res.data);
    } catch (err) {
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          College <span className="text-blue-600">Predictor Tool</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Enter your entrance exam rank (e.g., JEE) to discover which prestigious institutions you are eligible for based on previous cutoff trends.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 mb-12 max-w-2xl mx-auto">
        <form onSubmit={handlePredict} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
              Enter Your Rank
            </label>
            <div className="relative">
              <Trophy className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 w-6 h-6" />
              <input
                type="number"
                placeholder="e.g. 5000"
                className="w-full pl-14 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none text-lg font-semibold text-gray-800"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center shadow-lg shadow-blue-100 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Predict My Colleges'}
          </button>
        </form>
      </div>

      {searched && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <GraduationCap className="w-8 h-8 text-blue-600 mr-3" />
            Recommended Colleges for Rank {rank}
          </h2>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((college) => (
                <div key={college.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-start space-x-4">
                  <img 
                    src={college.image_url} 
                    alt={college.name} 
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-grow">
                    <h3 className="font-bold text-gray-900 mb-1">{college.name}</h3>
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <MapPin className="w-3 h-3 mr-1" />
                      {college.location}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-blue-600 font-bold text-sm">
                        ₹{Number(college.fees).toLocaleString('en-IN')} / yr
                      </span>
                      <Link 
                        href={`/college/${college.id}`}
                        className="text-xs font-bold text-gray-400 hover:text-blue-600 transition"
                      >
                        VIEW DETAILS →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-medium">No colleges found for this rank. Try a different range.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
