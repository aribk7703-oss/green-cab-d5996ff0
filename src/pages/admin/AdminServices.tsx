import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ImageUpload } from '@/components/admin/ImageUpload';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { servicesService } from '@/lib/api';
import { mockApiService, USE_MOCK_API } from '@/lib/api/mock';
import type { Service, ServiceFormData } from '@/lib/api';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Loader2, 
  RefreshCw,
  Briefcase,
  Image as ImageIcon,
  Search
} from 'lucide-react';
import { toast } from 'sonner';

// Mock services data
const mockServices: Service[] = [
  {
    _id: '1',
    name: 'Airport Transfer',
    slug: 'airport-transfer',
    description: 'Reliable airport pickup and drop service to Aurangabad Airport',
    shortDescription: 'Comfortable airport transfers',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400',
    isActive: true,
    order: 1,
    seo: { title: 'Airport Transfer Service', description: 'Book airport transfer', keywords: ['airport', 'transfer'] },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    _id: '2',
    name: 'Outstation Taxi',
    slug: 'outstation-taxi',
    description: 'One-way and round-trip taxi service to nearby cities',
    shortDescription: 'Travel to nearby cities',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400',
    isActive: true,
    order: 2,
    seo: { title: 'Outstation Taxi', description: 'Book outstation taxi', keywords: ['outstation', 'taxi'] },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    _id: '3',
    name: 'Local Sightseeing',
    slug: 'local-sightseeing',
    description: 'Explore Aurangabad city attractions with our guided tours',
    shortDescription: 'City tours and sightseeing',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400',
    isActive: true,
    order: 3,
    seo: { title: 'Local Sightseeing', description: 'Book city tour', keywords: ['sightseeing', 'tour'] },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    _id: '4',
    name: 'Corporate Rentals',
    slug: 'corporate-rentals',
    description: 'Monthly car rental solutions for businesses',
    shortDescription: 'Business car rentals',
    image: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=400',
    isActive: false,
    order: 4,
    seo: { title: 'Corporate Rentals', description: 'Book corporate rental', keywords: ['corporate', 'rental'] },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
];

const defaultFormData: ServiceFormData = {
  name: '',
  description: '',
  shortDescription: '',
  image: '',
  icon: '',
  isActive: true,
  order: 0,
  seo: { title: '', description: '', keywords: [] },
};

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [keywordsInput, setKeywordsInput] = useState('');

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      if (USE_MOCK_API) {
        const data = await mockApiService.services.getAll();
        setServices(data);
      } else {
        const data = await servicesService.getAll();
        setServices(data);
      }
    } catch {
      try {
        const data = await mockApiService.services.getAll();
        setServices(data);
      } catch {
        setServices(mockServices);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCreateDialog = () => {
    setEditingService(null);
    setFormData(defaultFormData);
    setKeywordsInput('');
    setIsDialogOpen(true);
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      shortDescription: service.shortDescription,
      image: service.image,
      icon: service.icon,
      isActive: service.isActive,
      order: service.order,
      seo: service.seo,
    });
    setKeywordsInput(service.seo.keywords.join(', '));
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.description) {
      toast.error('Please fill in required fields');
      return;
    }

    setIsSubmitting(true);
    const dataToSubmit = {
      ...formData,
      seo: {
        ...formData.seo,
        keywords: keywordsInput.split(',').map(k => k.trim()).filter(Boolean),
      },
    };

    try {
      const api = USE_MOCK_API ? mockApiService.services : servicesService;
      if (editingService) {
        const updated = await api.update(editingService._id, dataToSubmit);
        setServices(prev =>
          prev.map(s => s._id === editingService._id ? updated : s)
        );
        toast.success('Service updated successfully');
      } else {
        const newService = await api.create(dataToSubmit);
        setServices(prev => [...prev, newService]);
        toast.success('Service created successfully');
      }
      setIsDialogOpen(false);
    } catch {
      toast.error('Failed to save service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const api = USE_MOCK_API ? mockApiService.services : servicesService;
      await api.delete(id);
      setServices(prev => prev.filter(s => s._id !== id));
      toast.success('Service deleted successfully');
    } catch {
      toast.error('Failed to delete service');
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const api = USE_MOCK_API ? mockApiService.services : servicesService;
      await api.toggleActive(id, isActive);
      setServices(prev =>
        prev.map(s => s._id === id ? { ...s, isActive } : s)
      );
      toast.success(`Service ${isActive ? 'enabled' : 'disabled'}`);
    } catch {
      toast.error('Failed to update service');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Services</h1>
            <p className="text-muted-foreground">Manage your taxi and tour services</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchServices} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            </Button>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-40 animate-pulse bg-muted" />
                <CardContent className="p-4 space-y-2">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                </CardContent>
              </Card>
            ))
          ) : filteredServices.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No services found</h3>
              <p className="text-muted-foreground">Create your first service to get started</p>
              <Button className="mt-4" onClick={openCreateDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Service
              </Button>
            </div>
          ) : (
            filteredServices.map((service) => (
              <Card key={service._id} className="overflow-hidden">
                <div className="relative h-40 bg-muted">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute right-2 top-2">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                      service.isActive 
                        ? 'bg-primary/90 text-primary-foreground' 
                        : 'bg-muted/90 text-muted-foreground'
                    }`}>
                      {service.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{service.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {service.shortDescription}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <Switch
                      checked={service.isActive}
                      onCheckedChange={(checked) => handleToggleActive(service._id, checked)}
                    />
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(service)}>
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
                            <AlertDialogTitle>Delete Service</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{service.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(service._id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
              <DialogDescription>
                {editingService ? 'Update the service details below' : 'Fill in the details for your new service'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Service Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Airport Transfer"
                  />
                </div>
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
                  placeholder="Detailed description of the service"
                  rows={4}
                />
              </div>

              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                label="Service Image"
              />

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
                <Label>SEO Keywords</Label>
                <Input
                  value={keywordsInput}
                  onChange={(e) => setKeywordsInput(e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                />
                <Label htmlFor="isActive">Service is active and visible on website</Label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingService ? 'Update Service' : 'Create Service'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
