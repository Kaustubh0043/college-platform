'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { User, Clock, MessageCircle, Send, Loader2, ArrowLeft } from 'lucide-react';
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
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
    </div>
  );

  if (!question) return <div className="text-center py-20">Question not found</div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Link href="/discussions" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-8 font-semibold transition group">
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition" />
        Back to Discussions
      </Link>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">{question.title}</h1>
        <div className="flex items-center text-sm text-gray-400 mb-8 pb-8 border-b border-gray-50">
          <div className="flex items-center mr-6">
            <User className="w-5 h-5 mr-2 text-blue-500" />
            <span className="font-bold text-gray-700">{question.user_name}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            {new Date(question.created_at).toLocaleDateString()}
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">{question.content}</p>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <MessageCircle className="w-6 h-6 mr-3 text-blue-600" />
          Answers ({question.answers?.length || 0})
        </h2>

        {question.answers?.map((ans) => (
          <div key={ans.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm ml-8 relative">
            <div className="absolute top-6 -left-4 w-8 h-px bg-gray-200"></div>
            <div className="flex items-center text-sm text-gray-400 mb-4">
              <span className="font-bold text-gray-700 flex items-center">
                <User className="w-4 h-4 mr-1 text-blue-500" />
                {ans.user_name}
              </span>
              <span className="mx-2">•</span>
              <span>{new Date(ans.created_at).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-600 leading-relaxed">{ans.content}</p>
          </div>
        ))}

        <div className="bg-gray-50 p-8 rounded-3xl mt-12 border-2 border-dashed border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Your Answer</h3>
          <form onSubmit={handlePostAnswer} className="space-y-4">
            <textarea
              rows="4"
              placeholder="Share your thoughts..."
              className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-blue-500 transition shadow-sm outline-none text-gray-800"
              value={answerContent}
              onChange={(e) => setAnswerContent(e.target.value)}
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center shadow-lg shadow-blue-100"
            >
              <Send className="w-5 h-5 mr-2" />
              Post Answer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
