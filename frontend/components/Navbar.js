'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useComparison } from '@/context/ComparisonContext';
import { Search, Heart, User, LogOut, BarChart2 } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { selectedColleges } = useComparison();

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          College<span className="text-gray-800">Discovery</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">Explore</Link>
          <Link href="/compare" className="text-gray-600 hover:text-blue-600 font-medium flex items-center">
            Compare
            {selectedColleges.length > 0 && (
              <span className="ml-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {selectedColleges.length}
              </span>
            )}
          </Link>
          <Link href="/predict" className="text-gray-600 hover:text-blue-600 font-medium">Predictor</Link>
          <Link href="/discussions" className="text-gray-600 hover:text-blue-600 font-medium">Community</Link>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <Link href="/saved" className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                <Heart className="w-5 h-5" />
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                  {user.name[0]}
                </div>
                <button 
                  onClick={logout}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login" className="px-4 py-2 text-gray-600 font-medium">Login</Link>
              <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
