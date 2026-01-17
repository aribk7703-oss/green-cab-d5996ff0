import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { locationsService } from '@/lib/api/services/locations.service';
import { mockLocationsService } from '@/lib/api/mock/mockLocationsService';
import { USE_MOCK_API } from '@/lib/api/mock';
import type { Location, LocationFormData, LocationCategory } from '@/lib/api/types/location';
import { LOCATION_CATEGORIES } from '@/lib/api/types/location';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Loader2, 
  RefreshCw,
  MapPin,
  Image as ImageIcon,
  Search,
  Star,
  Church,
  Mountain,
  Waves,
  Landmark,
  Filter
} from 'lucide-react';
import { toast } from 'sonner';

const categoryIcons: Record<LocationCategory, typeof Church> = {
  Spiritual: Church,
  Heritage: Landmark,
  Nature: Mountain,
  Coastal: Waves,
};

const categoryColors: Record<LocationCategory, string> = {
  Spiritual: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  Heritage: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  Nature: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  Coastal: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
};

const defaultFormData: LocationFormData = {
  name: '',
  description: '',
  shortDescription: '',
  category: 'Heritage',
  image: '',
  gallery: [],
  address: '',
  highlights: [],
  bestTimeToVisit: '',
  entryFee: '',
  timings: '',
  isActive: true,
  isFeatured: false,
  order: 0,
  seo: { title: '', description: '', keywords: [] },
};

export default function AdminLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState<LocationFormData>(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [highlightsInput, setHighlightsInput] = useState('');
  const [keywordsInput, setKeywordsInput] = useState('');

  const api = USE_MOCK_API ? mockLocationsService : locationsService;

  const fetchLocations = async () => {
    setIsLoading(true);
    try {
      const data = await api.getAll();
      setLocations(data);
    } catch {
      toast.error('Failed to load locations');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const filteredLocations = locations.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || l.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const openCreateDialog = () => {
    setEditingLocation(null);
    setFormData(defaultFormData);
    setHighlightsInput('');
    setKeywordsInput('');
    setIsDialogOpen(true);
  };

  const openEditDialog = (location: Location) => {
    setEditingLocation(location);
    setFormData({
      name: location.name,
      description: location.description,
      shortDescription: location.shortDescription,
      category: location.category,
      image: location.image,
      gallery: location.gallery,
      address: location.address,
      coordinates: location.coordinates,
      highlights: location.highlights,
      bestTimeToVisit: location.bestTimeToVisit,
      entryFee: location.entryFee,
      timings: location.timings,
      isActive: location.isActive,
      isFeatured: location.isFeatured,
      order: location.order,
      seo: location.seo,
    });
    setHighlightsInput(location.highlights.join(', '));
    setKeywordsInput(location.seo.keywords.join(', '));
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.description || !formData.category) {
      toast.error('Please fill in required fields');
      return;
    }

    setIsSubmitting(true);
    const dataToSubmit: LocationFormData = {
      ...formData,
      highlights: highlightsInput.split(',').map(h => h.trim()).filter(Boolean),
      seo: {
        ...formData.seo,
        keywords: keywordsInput.split(',').map(k => k.trim()).filter(Boolean),
      },
    };

    try {
      if (editingLocation) {
        const updated = await api.update(editingLocation._id, dataToSubmit);
        setLocations(prev => prev.map(l => l._id === editingLocation._id ? updated : l));
        toast.success('Location updated successfully');
      } else {
        const newLocation = await api.create(dataToSubmit);
        setLocations(prev => [...prev, newLocation]);
        toast.success('Location created successfully');
      }
      setIsDialogOpen(false);
    } catch {
      toast.error('Failed to save location');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(id);
      setLocations(prev => prev.filter(l => l._id !== id));
      toast.success('Location deleted successfully');
    } catch {
      toast.error('Failed to delete location');
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      await api.toggleActive(id, isActive);
      setLocations(prev => prev.map(l => l._id === id ? { ...l, isActive } : l));
      toast.success(`Location ${isActive ? 'enabled' : 'disabled'}`);
    } catch {
      toast.error('Failed to update location');
    }
  };

  const handleToggleFeatured = async (id: string, isFeatured: boolean) => {
    try {
      await api.toggleFeatured(id, isFeatured);
      setLocations(prev => prev.map(l => l._id === id ? { ...l, isFeatured } : l));
      toast.success(`Location ${isFeatured ? 'featured' : 'unfeatured'}`);
    } catch {
      toast.error('Failed to update location');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Locations</h1>
            <p className="text-muted-foreground">Manage tourist destinations and attractions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchLocations} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            </Button>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Location
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          {LOCATION_CATEGORIES.map(category => {
            const Icon = categoryIcons[category];
            const count = locations.filter(l => l.category === category).length;
            return (
              <Card key={category} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCategoryFilter(category)}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className={`rounded-lg p-3 ${categoryColors[category]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-sm text-muted-foreground">{category}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search locations..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {LOCATION_CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Locations Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : filteredLocations.length === 0 ? (
              <div className="py-12 text-center">
                <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No locations found</h3>
                <p className="text-muted-foreground">Create your first location to get started</p>
                <Button className="mt-4" onClick={openCreateDialog}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Location
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead className="text-center">Featured</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLocations.map((location) => {
                    const CategoryIcon = categoryIcons[location.category];
                    return (
                      <TableRow key={location._id}>
                        <TableCell>
                          <div className="h-12 w-12 overflow-hidden rounded-lg bg-muted">
                            {location.image ? (
                              <img src={location.image} alt={location.name} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full items-center justify-center">
                                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{location.name}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1">{location.shortDescription}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={categoryColors[location.category]}>
                            <CategoryIcon className="mr-1 h-3 w-3" />
                            {location.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[200px]">
                          <p className="truncate text-sm text-muted-foreground">{location.address}</p>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleToggleFeatured(location._id, !location.isFeatured)}
                          >
                            <Star className={`h-4 w-4 ${location.isFeatured ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                          </Button>
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={location.isActive}
                            onCheckedChange={(checked) => handleToggleActive(location._id, checked)}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(location)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Location</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{location.name}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(location._id)}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Create/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingLocation ? 'Edit Location' : 'Add New Location'}</DialogTitle>
              <DialogDescription>
                {editingLocation ? 'Update the location details below' : 'Fill in the details for your new location'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="font-medium">Basic Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Location Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Ajanta Caves"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: LocationCategory) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {LOCATION_CATEGORIES.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Input
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                    placeholder="Brief description for cards"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Full Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Detailed description of the location"
                    rows={4}
                  />
                </div>
              </div>

              {/* Location Details */}
              <div className="space-y-4">
                <h3 className="font-medium">Location Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Full address"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="bestTimeToVisit">Best Time to Visit</Label>
                    <Input
                      id="bestTimeToVisit"
                      value={formData.bestTimeToVisit}
                      onChange={(e) => setFormData(prev => ({ ...prev, bestTimeToVisit: e.target.value }))}
                      placeholder="e.g., October to March"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="entryFee">Entry Fee</Label>
                    <Input
                      id="entryFee"
                      value={formData.entryFee || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, entryFee: e.target.value }))}
                      placeholder="e.g., ₹40 (Indian)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timings">Timings</Label>
                    <Input
                      id="timings"
                      value={formData.timings || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, timings: e.target.value }))}
                      placeholder="e.g., 9 AM - 5 PM"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="highlights">Highlights (comma-separated)</Label>
                  <Input
                    id="highlights"
                    value={highlightsInput}
                    onChange={(e) => setHighlightsInput(e.target.value)}
                    placeholder="UNESCO Heritage, Ancient Caves, Rock-cut Art"
                  />
                </div>
              </div>

              {/* Media */}
              <div className="space-y-4">
                <h3 className="font-medium">Media</h3>
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="order">Display Order</Label>
                    <Input
                      id="order"
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                </div>
              </div>

              {/* SEO */}
              <div className="space-y-4">
                <h3 className="font-medium">SEO Settings</h3>
                <div className="space-y-2">
                  <Label>SEO Title</Label>
                  <Input
                    value={formData.seo.title}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      seo: { ...prev.seo, title: e.target.value }
                    }))}
                    placeholder="SEO optimized title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>SEO Description</Label>
                  <Textarea
                    value={formData.seo.description}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      seo: { ...prev.seo, description: e.target.value }
                    }))}
                    placeholder="Meta description for search engines"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>SEO Keywords (comma-separated)</Label>
                  <Input
                    value={keywordsInput}
                    onChange={(e) => setKeywordsInput(e.target.value)}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                  />
                  <Label htmlFor="isActive">Active on website</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isFeatured: checked }))}
                  />
                  <Label htmlFor="isFeatured">Featured location</Label>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingLocation ? 'Update Location' : 'Create Location'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
