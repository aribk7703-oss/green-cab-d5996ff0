import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Plus, Trash2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TourDeparture } from '@/data/tours';

interface DepartureManagerProps {
  departures: TourDeparture[];
  onChange: (departures: TourDeparture[]) => void;
  defaultPrice: number;
}

export function DepartureManager({ departures, onChange, defaultPrice }: DepartureManagerProps) {
  const [newDate, setNewDate] = useState<Date | undefined>();
  const [newSpots, setNewSpots] = useState(15);
  const [newPrice, setNewPrice] = useState<number | undefined>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleAddDeparture = () => {
    if (!newDate) return;

    const dateString = format(newDate, 'yyyy-MM-dd');
    
    // Check if date already exists
    if (departures.some(d => d.date === dateString)) {
      return;
    }

    const newDeparture: TourDeparture = {
      date: dateString,
      spotsAvailable: newSpots,
      price: newPrice,
    };

    onChange([...departures, newDeparture].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    ));

    // Reset form
    setNewDate(undefined);
    setNewSpots(15);
    setNewPrice(undefined);
  };

  const handleRemoveDeparture = (date: string) => {
    onChange(departures.filter(d => d.date !== date));
  };

  const handleUpdateSpots = (date: string, spots: number) => {
    onChange(departures.map(d => 
      d.date === date ? { ...d, spotsAvailable: Math.max(0, spots) } : d
    ));
  };

  const handleUpdatePrice = (date: string, price: number | undefined) => {
    onChange(departures.map(d => 
      d.date === date ? { ...d, price } : d
    ));
  };

  const sortedDepartures = [...departures].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const pastDepartures = sortedDepartures.filter(d => new Date(d.date) < new Date());
  const upcomingDepartures = sortedDepartures.filter(d => new Date(d.date) >= new Date());

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Departure Dates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add new departure */}
        <div className="rounded-lg border border-dashed p-4 space-y-4">
          <h4 className="font-medium text-sm text-muted-foreground">Add New Departure</h4>
          
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="space-y-2">
              <Label className="text-xs">Date</Label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newDate ? format(newDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={newDate}
                    onSelect={(date) => {
                      setNewDate(date);
                      setIsCalendarOpen(false);
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs">Spots Available</Label>
              <Input
                type="number"
                min="1"
                max="100"
                value={newSpots}
                onChange={(e) => setNewSpots(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Custom Price (₹)</Label>
              <Input
                type="number"
                placeholder={defaultPrice.toString()}
                value={newPrice ?? ''}
                onChange={(e) => setNewPrice(e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>

            <div className="flex items-end">
              <Button
                type="button"
                onClick={handleAddDeparture}
                disabled={!newDate}
                className="w-full"
              >
                <Plus className="mr-1 h-4 w-4" />
                Add
              </Button>
            </div>
          </div>
        </div>

        {/* Existing departures */}
        {upcomingDepartures.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm flex items-center gap-2">
              Upcoming Departures 
              <span className="text-muted-foreground font-normal">({upcomingDepartures.length})</span>
            </h4>
            <div className="space-y-2">
              {upcomingDepartures.map((departure) => (
                <div
                  key={departure.date}
                  className="flex items-center gap-3 rounded-lg border p-3 bg-muted/30"
                >
                  <div className="flex-1 grid gap-3 sm:grid-cols-4 items-center">
                    <div>
                      <p className="font-medium text-sm">
                        {format(parseISO(departure.date), 'EEE, MMM d, yyyy')}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Label className="text-xs text-muted-foreground shrink-0">Spots:</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={departure.spotsAvailable}
                        onChange={(e) => handleUpdateSpots(departure.date, Number(e.target.value))}
                        className="h-8 w-20"
                      />
                      {departure.spotsAvailable <= 3 && departure.spotsAvailable > 0 && (
                        <span className="text-xs text-destructive font-medium">Low!</span>
                      )}
                      {departure.spotsAvailable === 0 && (
                        <span className="text-xs text-destructive font-medium">Sold out</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Label className="text-xs text-muted-foreground shrink-0">Price:</Label>
                      <Input
                        type="number"
                        placeholder={`₹${defaultPrice}`}
                        value={departure.price ?? ''}
                        onChange={(e) => handleUpdatePrice(departure.date, e.target.value ? Number(e.target.value) : undefined)}
                        className="h-8 w-28"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleRemoveDeparture(departure.date)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past departures (collapsed) */}
        {pastDepartures.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm flex items-center gap-2 text-muted-foreground">
              <AlertTriangle className="h-4 w-4" />
              Past Departures 
              <span className="font-normal">({pastDepartures.length})</span>
            </h4>
            <div className="space-y-2 opacity-60">
              {pastDepartures.slice(0, 3).map((departure) => (
                <div
                  key={departure.date}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <p className="text-sm">
                    {format(parseISO(departure.date), 'EEE, MMM d, yyyy')}
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleRemoveDeparture(departure.date)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {pastDepartures.length > 3 && (
                <p className="text-xs text-muted-foreground text-center">
                  +{pastDepartures.length - 3} more past departures
                </p>
              )}
            </div>
          </div>
        )}

        {departures.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No departure dates scheduled</p>
            <p className="text-xs">Add departure dates above to enable bookings</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

