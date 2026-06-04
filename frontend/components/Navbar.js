'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useComparison } from '@/context/ComparisonContext';
import { Heart, LogOut, Menu, X, BarChart3, GraduationCap, Compass, MessageSquare } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { selectedColleges } = useComparison();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Explore', icon: Compass },
    { href: '/compare', label: 'Compare', icon: BarChart3, badge: selectedColleges.length },
    { href: '/predict', label: 'Predictor', icon: GraduationCap },
    { href: '/discussions', label: 'Community', icon: MessageSquare },
  ];

  const isActive = (path) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-2xl font-black text-blue-600 tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">College</span>
          <span className="text-slate-800">Discovery</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map(({ href, label, icon: Icon, badge }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                  active
                    ? 'text-blue-600 bg-blue-50/50'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{label}</span>
                {badge > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white animate-pulse">
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Profile / CTAs */}
        <div className="flex items-center space-x-3">
          {user ? (
            <div className="flex items-center space-x-2">
              <Link
                href="/saved"
                className={`p-2.5 text-slate-500 hover:text-red-500 hover:bg-red-50/50 rounded-xl transition-all duration-200 ${
                  isActive('/saved') ? 'text-red-500 bg-red-50/30' : ''
                }`}
              >
                <Heart className={`w-5 h-5 ${isActive('/saved') ? 'fill-red-500' : ''}`} />
              </Link>
              <div className="h-6 w-px bg-slate-200"></div>
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center font-extrabold shadow-sm shadow-blue-200 text-sm">
                  {user.name[0].toUpperCase()}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-bold text-slate-800 line-clamp-1">{user.name}</p>
                  <p className="text-[10px] text-slate-400 font-medium">Student</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2.5 text-slate-500 hover:text-red-500 hover:bg-red-50/50 rounded-xl transition-all duration-200"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/login" className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-all">
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-100 hover:shadow-lg transition-all duration-200"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl md:hidden transition-all"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 py-4 space-y-2 animate-slide-up">
          {navLinks.map(({ href, label, icon: Icon, badge }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  active ? 'text-blue-600 bg-blue-50/70' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{label}</span>
                </div>
                {badge > 0 && (
                  <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-extrabold text-white">
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
          {!user && (
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100 mt-4">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 text-sm font-bold bg-blue-600 text-white rounded-xl shadow-md"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
