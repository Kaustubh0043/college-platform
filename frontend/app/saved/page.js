'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, MapPin, IndianRupee, Loader2, Heart, ArrowLeft, ArrowRight } from 'lucide-react';
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
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await axios.get(`${apiUrl}/colleges/saved`);
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
    <div className="flex flex-col justify-center items-center h-screen gap-3 bg-slate-50/50">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Loading Saved List...</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl animate-slide-up">
      <div className="mb-10">
        <Link href="/" className="inline-flex items-center text-slate-400 hover:text-blue-600 mb-3 font-semibold transition group text-sm">
          <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-0.5 transition" />
          Back to Explore
        </Link>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight flex items-center uppercase">
          <Heart className="w-8 h-8 text-red-500 mr-3 fill-red-500 animate-pulse" />
          My Saved Colleges
        </h1>
      </div>

      {colleges.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 max-w-md mx-auto shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-700 mb-2">Your Saved List is Empty</h2>
          <p className="text-slate-400 text-xs mb-6">Start exploring colleges to build your list.</p>
          <Link href="/" className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 transition">
            Explore Colleges
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {colleges.map((college) => (
            <div key={college.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full group">
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={college.image_url || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80'}
                  alt={college.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
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
              
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-6 italic">
                  "{college.description || 'Discover a rich learning ecosystem dedicated to empowering excellence.'}"
                </p>

                <div className="mt-auto space-y-3 pt-4 border-t border-slate-50">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      Location
                    </span>
                    <span className="text-slate-700 font-bold max-w-[160px] truncate">
                      {college.location}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold flex items-center gap-1.5">
                      <IndianRupee className="w-3.5 h-3.5 text-slate-400" />
                      Tuition Fees
                    </span>
                    <span className="text-blue-600 font-extrabold text-sm">
                      ₹{college.fees ? Number(college.fees).toLocaleString('en-IN') : 'N/A'}
                      <span className="text-[9px] text-slate-400 font-semibold ml-0.5">/ yr</span>
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50">
                  <Link
                    href={`/college/${college.id}`}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition duration-200 text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-100 cursor-pointer"
                  >
                    View Institution Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

