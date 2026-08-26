'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, IndianRupee, Star, CheckCircle2, User, Heart, Loader2, ArrowLeft, Send, Sparkles, Globe, FileText, Download, Eye, X } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function CollegeDetail() {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Review posting state
  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  // Brochure and Inquiry states
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', phone: '', query: '' });
  const [submittingInquiry, setSubmittingInquiry] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  const { user } = useAuth();


  const fetchCollege = async (showLoadingIndicator = true) => {
    if (showLoadingIndicator) setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await axios.get(`${apiUrl}/colleges/${id}`);
      setCollege(res.data);
    } catch (err) {
      console.error('Error fetching college:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollege(true);
  }, [id]);

  const handleSave = async () => {
    if (!user) {
      alert('Please login to save colleges.');
      return;
    }
    setSaving(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      await axios.post(`${apiUrl}/colleges/save`, { collegeId: id });
      alert('College saved to your profile!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving college');
    } finally {
      setSaving(false);
    }
  };

  const handlePostReview = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please login to post a review');
    if (!commentInput.trim()) return alert('Please enter a comment');

    setSubmittingReview(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('token');
      await axios.post(`${apiUrl}/colleges/${id}/reviews`,
        { rating: ratingInput, comment: commentInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentInput('');
      setRatingInput(5);
      fetchCollege(false); // Silent reload to update list & rating in real time
      alert('Review posted successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error posting review');
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleOpenInquiry = () => {
    setInquiryForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      query: ''
    });
    setInquirySuccess(false);
    setShowInquiryModal(true);
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setSubmittingInquiry(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      await axios.post(`${apiUrl}/colleges/${id}/inquire`, inquiryForm);
      setInquirySuccess(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting inquiry');
    } finally {
      setSubmittingInquiry(false);
    }
  };


  if (loading) return (
    <div className="flex flex-col justify-center items-center h-screen gap-3 bg-slate-50/50">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Loading details...</p>
    </div>
  );

  if (!college) return (
    <div className="container mx-auto px-4 py-24 text-center max-w-md animate-fade-in">
      <h2 className="text-2xl font-black text-slate-800 mb-2">College Not Found</h2>
      <p className="text-slate-500 mb-6">We couldn't retrieve the information for this college ID.</p>
      <Link href="/" className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 transition">
        Back to Listings
      </Link>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl animate-slide-up">
      <Link href="/" className="inline-flex items-center text-slate-400 hover:text-blue-600 mb-8 font-semibold transition group text-sm">
        <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-0.5 transition" />
        Back to Listings
      </Link>

      {/* Main Banner Header card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden mb-12">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 relative min-h-[300px] bg-slate-100">
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
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 4px 4px, white 1.5px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              </div>
            ) : (
              <img
                src={college.image_url}
                alt={college.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/40 to-transparent"></div>
            
            <div className="absolute bottom-8 left-8 right-8">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-500 text-white mb-3 uppercase tracking-wider">
                Elite Rank
              </span>
              <h2 className="text-white text-3xl sm:text-4xl font-black uppercase tracking-wide drop-shadow-lg leading-tight">
                {college.name}
              </h2>
            </div>
          </div>

          <div className="lg:w-1/2 p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-800 uppercase tracking-tight">{college.name}</h1>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="p-3 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 hover:scale-105 transition-all duration-200 disabled:opacity-50 cursor-pointer shadow-sm shadow-red-100"
                  title="Save College"
                >
                  <Heart className={`w-5 h-5 ${saving ? 'animate-pulse' : ''}`} />
                </button>
              </div>
              
              <div className="flex items-center text-slate-500 mb-4 font-semibold">
                <MapPin className="w-5 h-5 mr-2 text-slate-400" />
                {college.location}
              </div>

              <div className="flex items-center text-blue-600 font-black text-2xl mb-8">
                <IndianRupee className="w-5 h-5 mr-0.5" />
                {college.fees.toLocaleString('en-IN')} 
                <span className="text-xs font-semibold text-slate-400 ml-1.5">/ academic year</span>
              </div>

              <div className="flex items-center gap-6 mb-8 py-4 border-y border-slate-50">
                <div className="flex items-center bg-amber-50 text-amber-800 px-3.5 py-1.5 rounded-2xl font-black text-sm border border-amber-100">
                  <Star className="w-4 h-4 text-amber-500 mr-1.5 fill-amber-500" />
                  {Number(college.rating).toFixed(1)} / 5.0
                </div>
                <div className="text-sm font-bold text-slate-400">
                  <span className="text-slate-700 font-extrabold">{college.reviews?.length || 0}</span> Student Reviews
                </div>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed text-sm italic bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              "{college.description || 'This institution provides world-class educational spaces, exceptional teaching standards, and comprehensive career development pipelines.'}"
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Courses & Reviews */}
        <div className="lg:col-span-2 space-y-8">
          {/* Courses Offered */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Programs & Degrees Offered
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {(college.courses || []).map((course, idx) => (
                <div key={idx} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center hover:bg-slate-50 transition duration-150">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-3.5 shadow-sm shadow-blue-400"></div>
                  <span className="font-extrabold text-slate-700 text-sm">{course}</span>
                </div>
              ))}
              {(college.courses || []).length === 0 && (
                <p className="text-slate-400 text-sm italic">General Academic Curriculums</p>
              )}
            </div>
          </div>

          {/* Student Reviews Section */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-black text-slate-800 mb-6">Student Feedback Forum</h2>
            
            {college.reviews && college.reviews.length > 0 ? (
              <div className="space-y-6">
                {college.reviews.map((review) => (
                  <div key={review.id} className="border-b border-slate-50 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-9 h-9 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center font-extrabold mr-3 text-sm">
                          {review.user_name ? review.user_name[0].toUpperCase() : 'S'}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{review.user_name || 'Anonymous User'}</p>
                          <div className="flex text-amber-500 mt-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < review.rating ? 'fill-amber-500 text-amber-500' : 'text-slate-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-slate-400">
                        {new Date(review.created_at).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className="text-slate-600 italic text-sm pl-12">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-400 text-sm font-semibold italic">No student reviews posted yet.</p>
                <p className="text-slate-400 text-xs mt-1">Be the first to submit your academic experience below!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Admission CTA & Real-Time Review form */}
        <div className="space-y-8">
          {/* Real-Time Review Form */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-md">
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-500" />
              Write a Review
            </h3>

            {user ? (
              <form onSubmit={handlePostReview} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Rating Score</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatingInput(star)}
                        className="focus:outline-none transition hover:scale-110 cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= ratingInput
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-slate-200 hover:text-amber-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Your Experience</label>
                  <textarea
                    rows="4"
                    placeholder="Share your campus, facility, or study experience..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:border-blue-500 focus:bg-white transition duration-200 outline-none text-slate-800 text-sm font-semibold shadow-sm resize-none"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-1.5 shadow-md shadow-blue-100 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            ) : (
              <div className="text-center p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                <p className="text-slate-500 text-xs font-semibold mb-4 leading-relaxed">
                  You must be registered and logged in to share a review for this institution.
                </p>
                <Link
                  href="/login"
                  className="inline-block px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-100 transition duration-200"
                >
                  Login to Profile
                </Link>
              </div>
            )}
          </div>

          {/* Admission sticky Card */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl text-white">
            <h3 className="text-xl font-black mb-4">Admissions Guide</h3>
            <p className="mb-6 text-slate-300 text-sm leading-relaxed">
              Get personalized counselor guidelines for enrollment deadlines and cutoff structures at {college.name}.
            </p>
            <button 
              onClick={handleOpenInquiry}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold hover:shadow-lg transition-all duration-200 text-sm shadow-lg shadow-blue-600/10 cursor-pointer"
            >
              Inquire Now
            </button>
            <p className="mt-4 text-[10px] text-center text-slate-500 font-bold uppercase tracking-wider">
              Official Admission Channel
            </p>
          </div>

          {/* Official Prospectus & Site Connections */}
          <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-md space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Institutional Assets</h3>
              <p className="text-slate-500 text-xs font-semibold mt-1">Official materials published by the college administration.</p>
            </div>
            
            <div className="space-y-3">
              {college.official_website && (
                <a 
                  href={college.official_website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl font-bold transition flex items-center justify-center gap-2 text-xs text-slate-700 shadow-sm"
                >
                  <Globe className="w-4 h-4 text-slate-500" />
                  Visit Official Website
                </a>
              )}
              
              {college.brochure_url && (
                <>
                  <button 
                    onClick={() => setShowBrochureModal(true)}
                    className="w-full py-3 px-4 bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-2xl font-bold transition flex items-center justify-center gap-2 text-xs text-blue-700 shadow-sm cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-blue-500" />
                    View Brochure Inline
                  </button>
                  
                  <a 
                    href={college.brochure_url} 
                    download 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition flex items-center justify-center gap-2 text-xs shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    Download Brochure PDF
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Brochure PDF Viewer Modal */}
      {showBrochureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 w-full max-w-5xl h-[85vh] flex flex-col animate-scale-up">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Institutional Prospectus</h3>
                <p className="text-xs text-slate-500 font-semibold">{college.name}</p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={college.brochure_url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PDF
                </a>
                <button
                  onClick={() => setShowBrochureModal(false)}
                  className="p-2 bg-slate-200 hover:bg-slate-350 text-slate-650 rounded-xl transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-grow bg-slate-100 relative">
              <iframe
                src={college.brochure_url}
                className="w-full h-full border-none"
                title={`${college.name} Brochure`}
              />
            </div>
          </div>
        </div>
      )}

      {/* Admissions Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 w-full max-w-lg flex flex-col animate-scale-up">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Admissions Inquiry</h3>
                <p className="text-xs text-slate-500 font-semibold">Request information from {college.name}</p>
              </div>
              <button
                onClick={() => {
                  setShowInquiryModal(false);
                  setInquirySuccess(false);
                }}
                className="p-2 bg-slate-200 hover:bg-slate-350 text-slate-600 rounded-xl transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6">
              {inquirySuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-black text-slate-800">Inquiry Submitted!</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Your inquiry has been successfully transmitted to the admissions channel. The prospectus/counselor guidelines will be sent to your registered email shortly.
                  </p>
                  <button
                    onClick={() => {
                      setShowInquiryModal(false);
                      setInquirySuccess(false);
                    }}
                    className="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md transition cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:border-blue-500 focus:bg-white transition outline-none text-slate-800 text-sm font-semibold"
                      placeholder="e.g. Rahul Sharma"
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:border-blue-500 focus:bg-white transition outline-none text-slate-800 text-sm font-semibold"
                        placeholder="name@example.com"
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:border-blue-500 focus:bg-white transition outline-none text-slate-800 text-sm font-semibold"
                        placeholder="+91 XXXXX XXXXX"
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Message / Question</label>
                    <textarea
                      rows="3"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:border-blue-500 focus:bg-white transition outline-none text-slate-800 text-sm font-semibold resize-none"
                      placeholder="Ask about admissions, cutoffs, hostels, or courses..."
                      value={inquiryForm.query}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, query: e.target.value })}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={submittingInquiry}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs hover:shadow-lg transition flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50 cursor-pointer animate-fade-in"
                  >
                    {submittingInquiry ? 'Sending Inquiry...' : 'Submit Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


