'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Star, MapPin, IndianRupee, Loader2 } from 'lucide-react';
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
  const { addToCompare, selectedColleges } = useComparison();

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await axios.get(`${apiUrl}/colleges`, {
        params: { search, location, maxFee, page, limit: 6 }
      });
      setColleges(res.data.colleges || []);
      setTotalPages(res.data.pagination?.totalPages || 1);
    } catch (err) {
      console.error('Error fetching colleges:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchColleges();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filters Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search colleges..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Location..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              placeholder="Max Fees..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
              value={maxFee}
              onChange={(e) => setMaxFee(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center shadow-md shadow-blue-100"
          >
            <Filter className="w-4 h-4 mr-2" />
            Apply Filters
          </button>
        </form>
      </div>

      {/* Results Section */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {colleges.map((college) => (
              <div key={college.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                {/* Modern Branded Banner */}
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-6 text-center">
                    {/* Subtle Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                    
                    <h3 className="text-white text-xl font-black tracking-tight leading-tight drop-shadow-md uppercase">
                      {college.name}
                    </h3>
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center shadow-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="text-sm font-bold text-gray-800">{college.rating}</span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 min-h-[56px] line-clamp-2">
                    {college.name || 'Untitled College'}
                  </h3>
                  
                  <div className="flex items-center text-gray-500 mb-3">
                    <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
                    <span className="text-sm truncate">{college.location || 'Location not specified'}</span>
                  </div>
                  
                  <div className="flex items-center text-blue-600 font-bold text-lg mb-6 mt-auto">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    {college.fees ? Number(college.fees).toLocaleString('en-IN') : 'N/A'} 
                    <span className="text-xs font-normal text-gray-400 ml-1">/ year</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href={`/college/${college.id}`}
                      className="text-center py-2.5 border border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition text-sm"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => addToCompare(college)}
                      disabled={selectedColleges.find(c => c.id === college.id)}
                      className={`py-2.5 rounded-xl font-semibold transition text-sm ${
                        selectedColleges.find(c => c.id === college.id)
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-100'
                      }`}
                    >
                      {selectedColleges.find(c => c.id === college.id) ? 'Added' : 'Compare'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-xl font-bold transition ${
                    page === p ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {colleges.length === 0 && !loading && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <h2 className="text-2xl font-bold text-gray-400 mb-2">No colleges found</h2>
          <p className="text-gray-500">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
}
