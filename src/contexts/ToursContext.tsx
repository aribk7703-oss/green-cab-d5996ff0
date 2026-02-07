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
        const parsedTours = JSON.parse(stored) as Tour[];
        // Merge stored tours with initial tours to get new properties (like departures)
        return parsedTours.map(storedTour => {
          const initialTour = initialTours.find(t => t.id === storedTour.id || t.slug === storedTour.slug);
          if (initialTour) {
            // Merge: keep stored tour data but add any new properties from initialTours
            return {
              ...initialTour, // base properties including new ones
              ...storedTour, // override with any user-modified properties (including departures)
            };
          }
          return storedTour;
        });
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
