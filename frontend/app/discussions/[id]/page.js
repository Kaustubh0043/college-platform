'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { User, Clock, MessageSquare, Send, Loader2, ArrowLeft, Sparkles, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function DiscussionDetailPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answerContent, setAnswerContent] = useState('');
  const { user } = useAuth();

  const fetchQuestion = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await axios.get(`${apiUrl}/discussions/${id}`);
      setQuestion(res.data);
    } catch (err) {
      console.error('Error fetching question:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const handlePostAnswer = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please login to post an answer');
    if (!answerContent.trim()) return alert('Please enter an answer');
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('token');
      await axios.post(`${apiUrl}/discussions/${id}/answers`, 
        { content: answerContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAnswerContent('');
      fetchQuestion();
    } catch (err) {
      console.error('Error posting answer:', err);
    }
  };

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-screen gap-3 bg-slate-50/50">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Loading discussion...</p>
    </div>
  );

  if (!question) return (
    <div className="container mx-auto px-4 py-24 text-center max-w-md animate-fade-in">
      <h2 className="text-2xl font-black text-slate-800 mb-2">Discussion Thread Not Found</h2>
      <p className="text-slate-500 mb-6 font-semibold">We couldn't retrieve the thread for this discussion ID.</p>
      <Link href="/discussions" className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 transition">
        Back to Discussions
      </Link>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl animate-slide-up">
      <Link href="/discussions" className="inline-flex items-center text-slate-400 hover:text-blue-600 mb-8 font-semibold transition group text-sm">
        <ArrowLeft className="w-4 h-4 mr-1.5 group-hover:-translate-x-0.5 transition" />
        Back to Community
      </Link>

      {/* Main Question Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl mb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 mb-4 leading-snug">{question.title}</h1>
        
        <div className="flex items-center text-xs font-bold text-slate-400 mb-6 pb-6 border-b border-slate-50 gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center font-black text-[10px]">
              {question.user_name ? question.user_name[0].toUpperCase() : 'U'}
            </div>
            <span className="text-slate-600">{question.user_name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{new Date(question.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>

        <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-wrap font-medium">
          {question.content}
        </p>
      </div>

      {/* Answers Feed */}
      <div className="space-y-6">
        <h2 className="text-lg font-black text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-100">
          <MessageCircle className="w-5 h-5 text-blue-600" />
          Answers ({question.answers?.length || 0})
        </h2>

        {question.answers && question.answers.length > 0 ? (
          <div className="space-y-4 pl-4 sm:pl-8 border-l-2 border-slate-100">
            {question.answers.map((ans) => (
              <div key={ans.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative group">
                <div className="absolute top-6 -left-[25px] w-6 h-px bg-slate-200"></div>
                <div className="absolute top-[21px] -left-[30px] w-2.5 h-2.5 bg-slate-200 rounded-full border border-white"></div>
                
                <div className="flex items-center text-xs font-bold text-slate-400 mb-3 gap-2">
                  <div className="w-5 h-5 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center font-black text-[9px]">
                    {ans.user_name ? ans.user_name[0].toUpperCase() : 'A'}
                  </div>
                  <span className="text-slate-600">{ans.user_name}</span>
                  <span>•</span>
                  <span>{new Date(ans.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm font-medium">{ans.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400 text-sm font-semibold italic">No answers posted yet.</p>
            <p className="text-slate-400 text-xs mt-1">Be the first to share your advice below!</p>
          </div>
        )}

        {/* Answer Submission box */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl mt-12 border border-slate-100 shadow-sm">
          <h3 className="text-base font-black text-slate-800 mb-4 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-500" />
            Your Answer
          </h3>
          
          {user ? (
            <form onSubmit={handlePostAnswer} className="space-y-4">
              <textarea
                rows="4"
                placeholder="Share your perspective, experience, or advice..."
                className="w-full px-5 py-4 bg-white border border-slate-100 rounded-2xl focus:border-blue-500 transition duration-200 shadow-sm outline-none text-sm font-semibold text-slate-800 resize-none"
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
                required
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition flex items-center gap-1.5 shadow-md shadow-blue-100 text-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Post Answer
              </button>
            </form>
          ) : (
            <div className="text-center p-6 bg-white rounded-2xl border border-slate-100">
              <p className="text-slate-500 text-xs font-semibold mb-4 leading-relaxed">
                You must be logged in to participate in community discussion threads.
              </p>
              <Link
                href="/login"
                className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-100 transition"
              >
                Login to Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

