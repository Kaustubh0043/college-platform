'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Loader2, ArrowRight, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)] py-12 px-4 animate-slide-up">
      <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl w-full max-w-md relative overflow-hidden">
        {/* Accent bubble */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-bl-full"></div>
        
        <div className="text-center mb-8 relative z-10">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-500/10 text-blue-600 uppercase tracking-widest mb-2">
            Secure Portal
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">Welcome Back</h2>
          <p className="text-slate-400 text-sm font-semibold mt-1">Sign in to save colleges & post reviews</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-xs font-semibold border border-red-100/50">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:border-blue-500 focus:bg-white transition duration-200 outline-none text-sm font-semibold text-slate-800"
                placeholder="student@university.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:border-blue-500 focus:bg-white transition duration-200 outline-none text-sm font-semibold text-slate-800"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold text-xs shadow-md shadow-blue-100 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
              <>
                Login to Profile
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-xs font-semibold text-slate-400">
          New to the platform?{' '}
          <Link href="/register" className="text-blue-600 font-bold hover:underline">
            Register Account
          </Link>
        </p>
      </div>
    </div>
  );
}

