'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, User, Clock, Plus, Loader2, MessageCircle, ArrowRight, X, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function DiscussionPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useAuth();

  const fetchQuestions = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await axios.get(`${apiUrl}/discussions`);
      setQuestions(res.data);
    } catch (err) {
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please login to post a question');
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('token');
      await axios.post(`${apiUrl}/discussions`, 
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle('');
      setContent('');
      setShowModal(false);
      fetchQuestions();
    } catch (err) {
      console.error('Error posting question:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 border border-blue-500/25 mb-3 uppercase tracking-widest">
            Student Forum Hub
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 mb-2 tracking-tight uppercase">
            Community <span className="text-blue-600">Discussions</span>
          </h1>
          <p className="text-slate-500 text-sm font-semibold">
            Ask questions, share experiences, and receive feedback from peers across India.
          </p>
        </div>
        <button
          onClick={() => {
            if (!user) {
              alert('Please login to ask a question');
              return;
            }
            setShowModal(true);
          }}
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-2xl font-bold transition shadow-lg shadow-blue-100 cursor-pointer text-sm gap-2"
        >
          <Plus className="w-4 h-4" />
          Ask a Question
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center h-80 gap-3">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Loading discussions...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q) => (
            <Link 
              key={q.id} 
              href={`/discussions/${q.id}`}
              className="block bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200/50 transition-all duration-300 group"
            >
              <h2 className="text-lg font-extrabold text-slate-800 mb-2 group-hover:text-blue-600 transition leading-snug">
                {q.title}
              </h2>
              <p className="text-slate-500 line-clamp-2 mb-4 text-sm leading-relaxed font-medium">
                {q.content}
              </p>
              
              <div className="flex flex-wrap items-center text-xs font-bold text-slate-400 gap-4 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center font-black text-[10px]">
                    {q.user_name ? q.user_name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="text-slate-600">{q.user_name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{new Date(q.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="ml-auto text-blue-600 flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5" />
                  View Thread
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                </div>
              </div>
            </Link>
          ))}
          {questions.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm">
              <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-bold text-sm">No discussions created yet.</p>
              <p className="text-slate-400 text-xs mt-1">Start the conversation by asking a new question!</p>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-1.5">
              <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
              Ask a New Question
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Subject Title</label>
                <input
                  type="text"
                  placeholder="e.g. Which course is better at BITS Pilani?"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:border-blue-500 focus:bg-white transition outline-none text-sm font-semibold text-slate-800"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Description details</label>
                <textarea
                  rows="4"
                  placeholder="Provide context, details, and cutoff questions here..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:border-blue-500 focus:bg-white transition outline-none text-sm font-semibold text-slate-800 resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-2.5 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3.5 rounded-xl font-bold text-slate-400 hover:bg-slate-50 transition cursor-pointer text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold transition shadow-lg shadow-blue-100 cursor-pointer text-xs flex items-center justify-center gap-1.5"
                >
                  Post Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

