import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useTours } from '@/contexts/ToursContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  Loader2,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { USE_MOCK_API } from '@/lib/api/mock';
import { Tour } from '@/data/tours';

// Simulate network delay for mock mode
const simulateDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export default function AdminTours() {
  const { tours: contextTours, deleteTour: contextDeleteTour } = useTours();
  const [tours, setTours] = useState<Tour[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedTours, setSelectedTours] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<string>('');

  // Load tours from context (simulating API fetch)
  useEffect(() => {
    const loadTours = async () => {
      setIsLoading(true);
      try {
        if (USE_MOCK_API) {
          await simulateDelay(500);
        }
        setTours(contextTours);
      } catch (error) {
        console.error('Failed to fetch tours:', error);
        toast.error('Failed to load tours');
      } finally {
        setIsLoading(false);
      }
    };

    loadTours();
  }, [contextTours]);

  const filteredTours = tours.filter(tour =>
    tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string, title: string) => {
    setDeletingId(id);
    try {
      if (USE_MOCK_API) {
        await simulateDelay(400);
      }
      contextDeleteTour(id);
      setTours(prev => prev.filter(t => t.id !== id));
      setSelectedTours(prev => prev.filter(tourId => tourId !== id));
      toast.success(`"${title}" has been deleted`);
    } catch (error) {
      console.error('Failed to delete tour:', error);
      toast.error('Failed to delete tour');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTours(filteredTours.map(t => t.id));
    } else {
      setSelectedTours([]);
    }
  };

  const handleSelectTour = (tourId: string, checked: boolean) => {
    if (checked) {
      setSelectedTours(prev => [...prev, tourId]);
    } else {
      setSelectedTours(prev => prev.filter(id => id !== tourId));
    }
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedTours.length === 0) return;
    
    if (bulkAction === 'delete') {
      for (const id of selectedTours) {
        const tour = tours.find(t => t.id === id);
        if (tour) {
          await handleDelete(id, tour.title);
        }
      }
      setSelectedTours([]);
      setBulkAction('');
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">All Tours</h1>
            <p className="text-muted-foreground">Manage your tour packages ({tours.length} total)</p>
          </div>
          <Link to="/admin/tours/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Tour
            </Button>
          </Link>
        </div>

        {/* Filters & Actions */}
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Select value={bulkAction} onValueChange={setBulkAction}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Bulk Actions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="delete">Delete Selected</SelectItem>
                    <SelectItem value="publish">Publish</SelectItem>
                    <SelectItem value="unpublish">Unpublish</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  onClick={handleBulkAction}
                  disabled={!bulkAction || selectedTours.length === 0}
                >
                  Apply
                </Button>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10"
                  />
                </div>
                <Button variant="outline">Search</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tours Table */}
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50 text-left text-sm">
                    <th className="p-4">
                      <Checkbox 
                        checked={selectedTours.length === filteredTours.length && filteredTours.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="p-4 font-medium text-muted-foreground">Name</th>
                    <th className="p-4 font-medium text-muted-foreground">Location</th>
                    <th className="p-4 font-medium text-muted-foreground">Price</th>
                    <th className="p-4 font-medium text-muted-foreground">Status</th>
                    <th className="p-4 font-medium text-muted-foreground">Category</th>
                    <th className="p-4 text-right font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTours.map((tour) => (
                    <tr key={tour.id} className="border-b transition-colors hover:bg-muted/30">
                      <td className="p-4">
                        <Checkbox 
                          checked={selectedTours.includes(tour.id)}
                          onCheckedChange={(checked) => handleSelectTour(tour.id, checked as boolean)}
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-16 overflow-hidden rounded-lg">
                            <img
                              src={tour.images[0] || tour.image}
                              alt={tour.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <Link 
                              to={`/admin/tours/${tour.id}/edit`}
                              className="font-medium text-primary hover:underline"
                            >
                              {tour.title}
                            </Link>
                            <p className="text-xs text-muted-foreground">{tour.duration}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {tour.location}
                      </td>
                      <td className="p-4">
                        <span className="font-medium">₹{tour.price.toLocaleString()}</span>
                      </td>
                      <td className="p-4">
                        <Badge 
                          variant={tour.featured ? "default" : "secondary"}
                          className={tour.featured ? "bg-primary" : ""}
                        >
                          {tour.featured ? 'Published' : 'Draft'}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {tour.category}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link to={`/tours/${tour.slug}`} target="_blank">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link to={`/admin/tours/${tour.id}/edit`}>
                            <Button variant="outline" size="sm" className="gap-1">
                              <Edit className="h-3 w-3" />
                              Edit
                            </Button>
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                disabled={deletingId === tour.id}
                              >
                                {deletingId === tour.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredTours.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground">No tours found</p>
                <Link to="/admin/tours/create" className="mt-4">
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Create your first tour
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination info */}
        {filteredTours.length > 0 && (
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>
              Showing {filteredTours.length} of {tours.length} tours
              {selectedTours.length > 0 && ` (${selectedTours.length} selected)`}
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
