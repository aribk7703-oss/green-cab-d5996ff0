import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { tours as initialTours, Tour } from '@/data/tours';

interface ToursContextType {
  tours: Tour[];
  addTour: (tour: Omit<Tour, 'id'>) => void;
  updateTour: (id: string, tour: Partial<Tour>) => void;
  deleteTour: (id: string) => void;
  getTourById: (id: string) => Tour | undefined;
}

const ToursContext = createContext<ToursContextType | undefined>(undefined);

export function ToursProvider({ children }: { children: ReactNode }) {
  const [tours, setTours] = useState<Tour[]>(() => {
    const stored = localStorage.getItem('admin_tours');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return initialTours;
      }
    }
    return initialTours;
  });

  useEffect(() => {
    localStorage.setItem('admin_tours', JSON.stringify(tours));
  }, [tours]);

  const addTour = (tourData: Omit<Tour, 'id'>) => {
    const newTour: Tour = {
      ...tourData,
      id: crypto.randomUUID(),
    };
    setTours(prev => [...prev, newTour]);
  };

  const updateTour = (id: string, tourData: Partial<Tour>) => {
    setTours(prev =>
      prev.map(tour => (tour.id === id ? { ...tour, ...tourData } : tour))
    );
  };

  const deleteTour = (id: string) => {
    setTours(prev => prev.filter(tour => tour.id !== id));
  };

  const getTourById = (id: string) => {
    return tours.find(tour => tour.id === id);
  };

  return (
    <ToursContext.Provider
      value={{
        tours,
        addTour,
        updateTour,
        deleteTour,
        getTourById,
      }}
    >
      {children}
    </ToursContext.Provider>
  );
}

export function useTours() {
  const context = useContext(ToursContext);
  if (context === undefined) {
    throw new Error('useTours must be used within a ToursProvider');
  }
  return context;
}
