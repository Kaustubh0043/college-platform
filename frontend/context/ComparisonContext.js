'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const cached = localStorage.getItem('selected_colleges');
    if (cached) {
      try {
        setSelectedColleges(JSON.parse(cached));
      } catch (e) {
        console.error('Error parsing selected colleges from localStorage:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  const addToCompare = (college) => {
    if (selectedColleges.find((c) => c.id === college.id)) {
      return; // Already added
    }
    if (selectedColleges.length >= 3) {
      alert('You can compare up to 3 colleges only.');
      return;
    }
    const updated = [...selectedColleges, college];
    setSelectedColleges(updated);
    localStorage.setItem('selected_colleges', JSON.stringify(updated));
  };

  const removeFromCompare = (collegeId) => {
    const updated = selectedColleges.filter((c) => c.id !== collegeId);
    setSelectedColleges(updated);
    localStorage.setItem('selected_colleges', JSON.stringify(updated));
  };

  const clearComparison = () => {
    setSelectedColleges([]);
    localStorage.removeItem('selected_colleges');
  };

  return (
    <ComparisonContext.Provider
      value={{ selectedColleges, addToCompare, removeFromCompare, clearComparison, isLoaded }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => useContext(ComparisonContext);
