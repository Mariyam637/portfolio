import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { initialPortfolioData } from '../data/initialPortfolioData';

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(initialPortfolioData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.getPublicData();
      if (res && res.success && res.data) {
        setData(res.data);
      }
    } catch (err) {
      // If the backend API is offline or deployed as static frontend on Vercel,
      // gracefully preserve verified initial data without throwing an error screen
      console.warn('API unavailable or returned non-JSON, using verified portfolio data:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, loading, error, refreshData: fetchData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
