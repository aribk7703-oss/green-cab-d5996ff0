import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useTours } from '@/contexts/ToursContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  MapPin,
  Clock,
  Star
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminTours() {
  const { tours, deleteTour } = useTours();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTours = tours.filter(tour =>
    tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string, title: string) => {
    deleteTour(id);
    toast.success(`"${title}" has been deleted`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Tours</h1>
            <p className="text-muted-foreground">Manage your tour packages</p>
          </div>
          <Link to="/admin/tours/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Tour
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tours by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tours Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTours.map((tour) => (
            <Card key={tour.id} className="overflow-hidden shadow-sm transition-shadow hover:shadow-md">
              <div className="relative aspect-video">
                <img
                  src={tour.images[0]}
                  alt={tour.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute right-2 top-2">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                    tour.featured 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-background/80 text-foreground'
                  }`}>
                    {tour.featured ? 'Featured' : tour.category}
                  </span>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-1 text-lg">{tour.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {tour.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {tour.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                    {tour.rating}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    ₹{tour.price.toLocaleString()}
                  </span>
                  <div className="flex gap-1">
                    <Link to={`/tours/${tour.slug}`} target="_blank">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to={`/admin/tours/${tour.id}/edit`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Tour</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{tour.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(tour.id, tour.title)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTours.length === 0 && (
          <Card className="shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No tours found</p>
              <Link to="/admin/tours/create" className="mt-4">
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Create your first tour
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
