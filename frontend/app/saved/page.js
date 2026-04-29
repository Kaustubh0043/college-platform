'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, MapPin, IndianRupee, Loader2, Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function SavedColleges() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    const fetchSaved = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/colleges/saved');
        setColleges(res.data);
      } catch (err) {
        console.error('Error fetching saved colleges:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchSaved();
  }, [user, authLoading]);

  if (loading || authLoading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Explore
      </Link>
      
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center">
        <Heart className="w-8 h-8 text-red-500 mr-3 fill-red-500" />
        My Saved Colleges
      </h1>

      {colleges.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
          <h2 className="text-2xl font-bold text-gray-400 mb-4">You haven't saved any colleges yet.</h2>
          <Link href="/" className="text-blue-600 font-bold hover:underline">Start exploring colleges</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college) => (
            <div key={college.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-48 relative">
                <img
                  src={college.image_url || 'https://via.placeholder.com/400x200'}
                  alt={college.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg text-sm font-bold flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
                  {college.rating}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{college.name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{college.location}</span>
                </div>
                <div className="flex items-center text-blue-600 font-bold text-lg mb-4">
                  <IndianRupee className="w-4 h-4 mr-1" />
                  {college.fees.toLocaleString('en-IN')} / year
                </div>
                <Link
                  href={`/college/${college.id}`}
                  className="block w-full text-center py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
