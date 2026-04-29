'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, IndianRupee, Star, CheckCircle2, User, Heart, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function CollegeDetail() {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/colleges/${id}`);
        setCollege(res.data);
      } catch (err) {
        console.error('Error fetching college:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCollege();
  }, [id]);

  const handleSave = async () => {
    if (!user) {
      alert('Please login to save colleges.');
      return;
    }
    setSaving(true);
    try {
      await axios.post('http://localhost:5000/api/colleges/save', { collegeId: id });
      alert('College saved to your profile!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving college');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
    </div>
  );

  if (!college) return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h2 className="text-2xl font-bold text-gray-800">College not found</h2>
      <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">Back to list</Link>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Listings
      </Link>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-12 text-center h-full">
              {/* Subtle Pattern Overlay */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
              
              <h3 className="text-white text-4xl font-black tracking-tight leading-tight drop-shadow-xl uppercase">
                {college.name}
              </h3>
            </div>
          </div>
          <div className="md:w-1/2 p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-extrabold text-gray-900">{college.name}</h1>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="p-3 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition disabled:opacity-50"
              >
                <Heart className={`w-6 h-6 ${saving ? 'animate-pulse' : ''}`} />
              </button>
            </div>
            
            <div className="flex items-center text-gray-600 mb-4 text-lg">
              <MapPin className="w-5 h-5 mr-2" />
              {college.location}
            </div>

            <div className="flex items-center text-blue-600 font-bold text-2xl mb-6">
              <IndianRupee className="w-6 h-6 mr-1" />
              {college.fees.toLocaleString('en-IN')} <span className="text-sm font-normal text-gray-500 ml-1">/ year</span>
            </div>

            <div className="flex items-center mb-8">
              <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-lg">
                <Star className="w-5 h-5 text-yellow-500 mr-1 fill-yellow-500" />
                <span className="font-bold text-yellow-700">{college.rating}</span>
              </div>
              <span className="text-gray-400 mx-4">|</span>
              <span className="text-gray-600">{college.reviews?.length || 0} Reviews</span>
            </div>

            <p className="text-gray-700 leading-relaxed text-lg italic">
              "{college.description || 'No description available for this institution.'}"
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Courses Section */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-2xl shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <CheckCircle2 className="w-6 h-6 text-green-500 mr-2" />
              Courses Offered
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(college.courses || []).map((course, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="font-medium text-gray-800">{course}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
            {college.reviews && college.reviews.length > 0 ? (
              <div className="space-y-6">
                {college.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <User className="w-6 h-6 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{review.user_name}</p>
                          <div className="flex text-yellow-500">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 italic">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-1">
          <div className="bg-blue-600 p-8 rounded-2xl shadow-md text-white sticky top-24">
            <h3 className="text-xl font-bold mb-4">Admissions Open</h3>
            <p className="mb-6 opacity-90">Get expert guidance for your admission process at {college.name}.</p>
            <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg">
              Apply Now
            </button>
            <p className="mt-4 text-xs text-center opacity-70">Official Partner Information</p>
          </div>
        </div>
      </div>
    </div>
  );
}
