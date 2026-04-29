'use client';
import { useComparison } from '@/context/ComparisonContext';
import { X, IndianRupee, Star, MapPin, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ComparePage() {
  const { selectedColleges, removeFromCompare, clearComparison } = useComparison();

  if (selectedColleges.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Comparison List is Empty</h2>
        <p className="text-gray-600 mb-8">Select colleges from the explore page to compare them side-by-side.</p>
        <Link href="/" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
          Go to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <Link href="/" className="flex items-center text-gray-600 hover:text-blue-600 mb-2 transition">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Discovery
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900">Compare Colleges</h1>
        </div>
        <button
          onClick={clearComparison}
          className="flex items-center text-red-600 font-bold hover:bg-red-50 px-4 py-2 rounded-lg transition"
        >
          <Trash2 className="w-5 h-5 mr-2" />
          Clear All
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-6 text-gray-400 font-medium uppercase text-xs w-1/4">Feature</th>
              {selectedColleges.map((college) => (
                <th key={college.id} className="p-6 w-1/4 min-w-[250px]">
                  <div className="relative">
                    <button
                      onClick={() => removeFromCompare(college.id)}
                      className="absolute -top-2 -right-2 bg-white shadow-md text-red-500 p-1 rounded-full hover:bg-red-50 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <img
                      src={college.image_url || 'https://via.placeholder.com/400x200'}
                      alt={college.name}
                      className="w-full h-32 object-cover rounded-xl mb-4"
                    />
                    <h3 className="font-bold text-gray-900 line-clamp-2">{college.name}</h3>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-6 font-bold text-gray-700">Location</td>
              {selectedColleges.map((college) => (
                <td key={college.id} className="p-6 text-gray-600 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  {college.location}
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-6 font-bold text-gray-700">Fees (per year)</td>
              {selectedColleges.map((college) => (
                <td key={college.id} className="p-6 font-extrabold text-blue-600 text-lg">
                  <span className="flex items-center">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    {college.fees.toLocaleString('en-IN')}
                  </span>
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-6 font-bold text-gray-700">Rating</td>
              {selectedColleges.map((college) => (
                <td key={college.id} className="p-6">
                  <div className="flex items-center bg-yellow-50 text-yellow-700 px-3 py-1 rounded-lg w-fit font-bold">
                    <Star className="w-4 h-4 mr-1 fill-yellow-500 text-yellow-500" />
                    {college.rating}
                  </div>
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-6 font-bold text-gray-700">Top Courses</td>
              {selectedColleges.map((college) => (
                <td key={college.id} className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {(college.courses || []).slice(0, 3).map((course, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        {course}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-bold text-gray-700">Action</td>
              {selectedColleges.map((college) => (
                <td key={college.id} className="p-6">
                  <Link
                    href={`/college/${college.id}`}
                    className="block text-center py-2 bg-gray-900 text-white rounded-lg font-bold hover:bg-black transition shadow-lg"
                  >
                    View Details
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
