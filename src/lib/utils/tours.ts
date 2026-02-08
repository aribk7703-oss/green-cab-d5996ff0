import { format } from 'date-fns';
import type { Tour } from '@/data/tours';

export function getNextDeparture(tour: Tour) {
  if (!tour.departures || tour.departures.length === 0) {
    return null;
  }

  const now = new Date();
  now.setHours(0, 0, 0, 0); // Start of today

  // Find the first departure that is today or in the future
  const nextDeparture = tour.departures
    .filter(d => new Date(d.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .at(0);

  return nextDeparture ? nextDeparture.date : null;
}

export function formatDepartureDate(date: string): string {
  return format(new Date(date), 'MMM d, yyyy');
}
