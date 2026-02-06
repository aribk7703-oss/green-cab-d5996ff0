import { useState } from 'react';
import { format, parseISO, isSameDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Users, Minus, Plus, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import type { TourDeparture } from '@/data/tours';

interface TourAvailabilityCalendarProps {
  tourSlug: string;
  tourPrice: number;
  tourTitle: string;
  departures?: TourDeparture[];
  maxGroupSize?: number;
}

export function TourAvailabilityCalendar({ 
  tourSlug, 
  tourPrice, 
  tourTitle,
  departures = [],
  maxGroupSize = 20
}: TourAvailabilityCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [guests, setGuests] = useState(2);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Parse departure dates for availability checking
  const availableDates = departures.map(d => parseISO(d.date));
  
  // Get selected departure details
  const selectedDeparture = selectedDate 
    ? departures.find(d => isSameDay(parseISO(d.date), selectedDate))
    : undefined;

  // Max guests is limited by spots available for the selected departure
  const maxGuests = selectedDeparture 
    ? Math.min(selectedDeparture.spotsAvailable, maxGroupSize)
    : maxGroupSize;

  const handleGuestChange = (delta: number) => {
    setGuests(prev => Math.min(Math.max(1, prev + delta), maxGuests));
  };

  // Reset guests if they exceed available spots when date changes
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const departure = departures.find(d => isSameDay(parseISO(d.date), date));
      if (departure && guests > departure.spotsAvailable) {
        setGuests(departure.spotsAvailable);
      }
    }
    setIsCalendarOpen(false);
  };

  // Use departure-specific price or default tour price
  const effectivePrice = selectedDeparture?.price ?? tourPrice;
  const totalPrice = effectivePrice * guests;

  // Only enable dates that have departures
  const disabledDays = (date: Date) => {
    return !availableDates.some(availableDate => isSameDay(date, availableDate));
  };

  // Custom day content to show availability
  const modifiers = {
    available: availableDates,
    lowAvailability: departures
      .filter(d => d.spotsAvailable <= 3)
      .map(d => parseISO(d.date)),
  };

  const modifiersStyles = {
    available: {
      fontWeight: '600' as const,
      backgroundColor: 'hsl(var(--primary) / 0.1)',
      borderRadius: '50%',
    },
    lowAvailability: {
      backgroundColor: 'hsl(var(--destructive) / 0.15)',
      color: 'hsl(var(--destructive))',
      fontWeight: '700' as const,
      borderRadius: '50%',
    },
  };

  // If no departures available
  if (departures.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 p-4 rounded-lg bg-muted/50 border border-border text-muted-foreground">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">No departures currently scheduled. Contact us for custom dates.</p>
        </div>
        <Button variant="outline" size="lg" className="w-full" asChild>
          <Link to="/contact">Enquire About This Tour</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Upcoming Departures List */}
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-2 block">
          Available Departures
        </label>
        <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
          {departures.slice(0, 4).map((departure) => {
            const date = parseISO(departure.date);
            const isSelected = selectedDate && isSameDay(date, selectedDate);
            const isLowAvailability = departure.spotsAvailable <= 3;
            
            return (
              <button
                key={departure.date}
                type="button"
                onClick={() => handleDateSelect(date)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-lg border transition-all text-left",
                  isSelected 
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                <div>
                  <p className="font-medium text-sm">
                    {format(date, 'EEEE, MMM d, yyyy')}
                  </p>
                  <p className={cn(
                    "text-xs",
                    isLowAvailability ? "text-destructive font-medium" : "text-muted-foreground"
                  )}>
                    {isLowAvailability 
                      ? `Only ${departure.spotsAvailable} spots left!`
                      : `${departure.spotsAvailable} spots available`
                    }
                  </p>
                </div>
                {departure.price && departure.price !== tourPrice && (
                  <span className="text-sm font-semibold text-primary">
                    ₹{departure.price.toLocaleString()}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Date Picker for more dates */}
      <div>
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal h-12",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : "View all departure dates"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={disabledDays}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
            <div className="px-3 pb-3 flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-2">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-primary/20"></span>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-destructive/20"></span>
                <span>Low availability</span>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Guest Selector */}
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-2 block">
          Number of Guests
        </label>
        <div className="flex items-center justify-between h-12 px-4 rounded-md border border-input bg-background">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleGuestChange(-1)}
              disabled={guests <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{guests}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleGuestChange(1)}
              disabled={guests >= maxGuests}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {selectedDeparture && guests >= selectedDeparture.spotsAvailable && (
          <p className="text-xs text-destructive mt-1">
            Maximum spots available for this departure
          </p>
        )}
      </div>

      {/* Price Summary */}
      {selectedDate && (
        <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              ₹{effectivePrice.toLocaleString()} × {guests} guests
            </span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Service fee</span>
            <span>₹{Math.round(totalPrice * 0.05).toLocaleString()}</span>
          </div>
          <div className="pt-2 border-t border-border flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-primary">
              ₹{Math.round(totalPrice * 1.05).toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* Book Button */}
      <Button
        variant="accent"
        size="lg"
        className="w-full"
        disabled={!selectedDate}
        asChild
      >
        <Link
          to={selectedDate ? `/booking/${tourSlug}?date=${format(selectedDate, 'yyyy-MM-dd')}&guests=${guests}` : '#'}
        >
          {selectedDate ? 'Reserve Now' : 'Select a Departure Date'}
        </Link>
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        You won't be charged yet
      </p>
    </div>
  );
}
