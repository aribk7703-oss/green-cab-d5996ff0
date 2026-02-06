import { useState } from 'react';
import { format, addDays, isBefore, startOfDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Users, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface TourAvailabilityCalendarProps {
  tourSlug: string;
  tourPrice: number;
  tourTitle: string;
}

export function TourAvailabilityCalendar({ tourSlug, tourPrice, tourTitle }: TourAvailabilityCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [guests, setGuests] = useState(2);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const today = startOfDay(new Date());
  const minDate = addDays(today, 1); // Minimum 1 day in advance
  const maxDate = addDays(today, 365); // Maximum 1 year in advance

  const handleGuestChange = (delta: number) => {
    setGuests(prev => Math.min(Math.max(1, prev + delta), 20));
  };

  const totalPrice = tourPrice * guests;

  // Disable past dates and dates more than a year out
  const disabledDays = (date: Date) => {
    return isBefore(date, minDate) || isBefore(maxDate, date);
  };

  return (
    <div className="space-y-4">
      {/* Date Picker */}
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-2 block">
          Select Travel Date
        </label>
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
              {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                setIsCalendarOpen(false);
              }}
              disabled={disabledDays}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
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
              disabled={guests >= 20}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      {selectedDate && (
        <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              ₹{tourPrice.toLocaleString()} × {guests} guests
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
          {selectedDate ? 'Reserve Now' : 'Select a Date to Continue'}
        </Link>
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        You won't be charged yet
      </p>
    </div>
  );
}
