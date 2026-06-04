'use client';
import { useComparison } from '@/context/ComparisonContext';
import { X, IndianRupee, Star, MapPin, Trash2, ArrowLeft, Loader2, Plus } from 'lucide-react';
import Link from 'next/link';

export default function ComparePage() {
  const { selectedColleges, removeFromCompare, clearComparison, isLoaded } = useComparison();

  if (!isLoaded) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-3">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Loading Comparison...</p>
      </div>
    );
  }

  if (selectedColleges.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-xl animate-fade-in">
        <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm text-slate-400">
          <Trash2 className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Your Comparison is Empty</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Select colleges from the discovery directory to compare their tuition fees, student ratings, and location details side-by-side.
        </p>
        <Link href="/" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold transition shadow-lg shadow-blue-100 cursor-pointer">
          Browse Colleges
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <Link href="/" className="inline-flex items-center text-slate-400 hover:text-blue-600 mb-3 font-semibold transition group text-sm">
            <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-0.5 transition" />
            Back to Discovery
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">Compare Institutions</h1>
        </div>
        
        {selectedColleges.length > 0 && (
          <button
            onClick={clearComparison}
            className="flex items-center justify-center text-red-600 hover:bg-red-50/50 hover:text-red-700 px-5 py-3 rounded-2xl transition font-bold border border-transparent hover:border-red-100 text-sm cursor-pointer"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Comparison Sheet
          </button>
        )}
      </div>

      {selectedColleges.length === 1 && (
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-amber-100 text-amber-800 p-2 rounded-xl mt-0.5 sm:mt-0 font-black text-xs">TIP</div>
            <div>
              <p className="text-sm font-bold text-slate-800">Add one more college to compare</p>
              <p className="text-xs text-slate-500">You need at least 2 colleges side-by-side to perform a comparison analysis.</p>
            </div>
          </div>
          <Link href="/" className="inline-flex items-center bg-white border border-amber-200 text-amber-700 hover:bg-amber-100/30 px-4 py-2 rounded-xl text-xs font-bold transition">
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add College
          </Link>
        </div>
      )}

      {/* Comparison Grid Sheet */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-6 text-slate-400 font-bold uppercase text-[10px] tracking-wider w-1/4">Key Metrics</th>
              {selectedColleges.map((college) => (
                <th key={college.id} className="p-6 w-1/4">
                  <div className="relative bg-white p-4 rounded-2xl border border-slate-100 shadow-sm group">
                    <button
                      onClick={() => removeFromCompare(college.id)}
                      className="absolute -top-2.5 -right-2.5 bg-white shadow-md text-slate-400 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition duration-200 border border-slate-50 cursor-pointer"
                      title="Remove from comparison"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="h-28 w-full rounded-xl overflow-hidden mb-4 bg-slate-50">
                      <img
                        src={college.image_url || 'https://via.placeholder.com/400x200'}
                        alt={college.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                      />
                    </div>
                    <h3 className="font-extrabold text-slate-800 text-sm line-clamp-2 leading-tight uppercase">
                      {college.name}
                    </h3>
                  </div>
                </th>
              ))}
              {/* Fill remaining empty headers up to 3 columns total for structure balance */}
              {Array.from({ length: Math.max(0, 3 - selectedColleges.length) }).map((_, i) => (
                <th key={`empty-h-${i}`} className="p-6 w-1/4 opacity-30">
                  <div className="border border-dashed border-slate-200 rounded-2xl h-44 flex flex-col items-center justify-center text-center px-4 bg-slate-50/20">
                    <Plus className="w-5 h-5 text-slate-400 mb-2" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Compare Slot</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {/* Location row */}
            <tr>
              <td className="p-6 font-bold text-slate-500 text-xs uppercase tracking-wider bg-slate-50/30">Location</td>
              {selectedColleges.map((college) => (
                <td key={college.id} className="p-6 text-slate-700 font-semibold text-sm">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                    {college.location}
                  </div>
                </td>
              ))}
              {Array.from({ length: Math.max(0, 3 - selectedColleges.length) }).map((_, i) => (
                <td key={`empty-loc-${i}`} className="p-6 text-slate-300 text-xs italic">Empty slot</td>
              ))}
            </tr>
            {/* Fees row */}
            <tr>
              <td className="p-6 font-bold text-slate-500 text-xs uppercase tracking-wider bg-slate-50/30">Annual Fees</td>
              {selectedColleges.map((college) => (
                <td key={college.id} className="p-6 font-extrabold text-blue-600 text-base">
                  <span className="flex items-center">
                    <IndianRupee className="w-3.5 h-3.5 mr-0.5 text-blue-600" />
                    {college.fees ? Number(college.fees).toLocaleString('en-IN') : 'N/A'}
                  </span>
                </td>
              ))}
              {Array.from({ length: Math.max(0, 3 - selectedColleges.length) }).map((_, i) => (
                <td key={`empty-fee-${i}`} className="p-6 text-slate-300 text-xs italic">Empty slot</td>
              ))}
            </tr>
            {/* Rating row */}
            <tr>
              <td className="p-6 font-bold text-slate-500 text-xs uppercase tracking-wider bg-slate-50/30">Student Rating</td>
              {selectedColleges.map((college) => (
                <td key={college.id} className="p-6">
                  <div className="flex items-center bg-amber-50 text-amber-800 px-3 py-1.5 rounded-xl w-fit font-extrabold text-xs border border-amber-100">
                    <Star className="w-3.5 h-3.5 mr-1 fill-amber-500 text-amber-500" />
                    {Number(college.rating).toFixed(1)} / 5.0
                  </div>
                </td>
              ))}
              {Array.from({ length: Math.max(0, 3 - selectedColleges.length) }).map((_, i) => (
                <td key={`empty-rate-${i}`} className="p-6 text-slate-300 text-xs italic">Empty slot</td>
              ))}
            </tr>
            {/* Top Courses row */}
            <tr>
              <td className="p-6 font-bold text-slate-500 text-xs uppercase tracking-wider bg-slate-50/30">Top Courses</td>
              {selectedColleges.map((college) => (
                <td key={college.id} className="p-6">
                  <div className="flex flex-wrap gap-1.5">
                    {(college.courses || []).slice(0, 4).map((course, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide">
                        {course}
                      </span>
                    ))}
                    {(college.courses || []).length === 0 && (
                      <span className="text-slate-400 text-xs italic">General Degrees</span>
                    )}
                  </div>
                </td>
              ))}
              {Array.from({ length: Math.max(0, 3 - selectedColleges.length) }).map((_, i) => (
                <td key={`empty-course-${i}`} className="p-6 text-slate-300 text-xs italic">Empty slot</td>
              ))}
            </tr>
            {/* Action row */}
            <tr>
              <td className="p-6 font-bold text-slate-500 text-xs uppercase tracking-wider bg-slate-50/30">Listing Link</td>
              {selectedColleges.map((college) => (
                <td key={college.id} className="p-6">
                  <Link
                    href={`/college/${college.id}`}
                    className="block text-center py-2.5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition duration-200 text-xs shadow-md shadow-blue-100"
                  >
                    View Details
                  </Link>
                </td>
              ))}
              {Array.from({ length: Math.max(0, 3 - selectedColleges.length) }).map((_, i) => (
                <td key={`empty-action-${i}`} className="p-6 text-slate-300 text-xs italic">Empty slot</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

