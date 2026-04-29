'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
  const [selectedColleges, setSelectedColleges] = useState([]);

  const addToCompare = (college) => {
    if (selectedColleges.find((c) => c.id === college.id)) {
      return; // Already added
    }
    if (selectedColleges.length >= 3) {
      alert('You can compare up to 3 colleges only.');
      return;
    }
    setSelectedColleges([...selectedColleges, college]);
  };

  const removeFromCompare = (collegeId) => {
    setSelectedColleges(selectedColleges.filter((c) => c.id !== collegeId));
  };

  const clearComparison = () => {
    setSelectedColleges([]);
  };

  return (
    <ComparisonContext.Provider
      value={{ selectedColleges, addToCompare, removeFromCompare, clearComparison }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => useContext(ComparisonContext);
