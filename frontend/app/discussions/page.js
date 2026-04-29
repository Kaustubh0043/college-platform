'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, User, Clock, Plus, Loader2 } from 'lucide-react';
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
      const res = await axios.get('http://localhost:5000/api/discussions');
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
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/discussions', 
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
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Community <span className="text-blue-600">Discussions</span></h1>
          <p className="text-gray-600">Ask questions, share experiences, and help fellow students.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 md:mt-0 flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
        >
          <Plus className="w-5 h-5 mr-2" />
          Ask a Question
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q) => (
            <Link 
              key={q.id} 
              href={`/discussions/${q.id}`}
              className="block bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">{q.title}</h2>
              <p className="text-gray-600 line-clamp-2 mb-4 text-sm leading-relaxed">{q.content}</p>
              <div className="flex items-center text-xs text-gray-400 space-x-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1 text-blue-500" />
                  {q.user_name}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {new Date(q.created_at).toLocaleDateString()}
                </div>
                <div className="flex items-center text-blue-600 font-bold">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  View Discussion
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Ask a New Question</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">Title</label>
                <input
                  type="text"
                  placeholder="What's your question?"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-blue-500 focus:bg-white transition outline-none text-gray-800"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">Content</label>
                <textarea
                  rows="4"
                  placeholder="Provide more details..."
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-blue-500 focus:bg-white transition outline-none text-gray-800"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
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
