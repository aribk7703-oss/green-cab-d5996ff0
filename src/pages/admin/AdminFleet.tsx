import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { fleetService } from '@/lib/api';
import type { Vehicle, VehicleFormData } from '@/lib/api';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Loader2, 
  RefreshCw,
  Car,
  Image as ImageIcon,
  Search,
  Users,
  Briefcase,
  IndianRupee
} from 'lucide-react';
import { toast } from 'sonner';

// Mock fleet data
const mockFleet: Vehicle[] = [
  {
    _id: '1',
    name: 'Swift Dzire',
    slug: 'swift-dzire',
    type: 'sedan',
    seatingCapacity: 4,
    luggageCapacity: '2 large bags',
    pricePerKm: 12,
    basePrice: 1500,
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400',
    features: ['AC', 'Music System', 'First Aid Kit'],
    isAvailable: true,
    isActive: true,
    order: 1,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    _id: '2',
    name: 'Toyota Innova Crysta',
    slug: 'innova-crysta',
    type: 'suv',
    seatingCapacity: 7,
    luggageCapacity: '4 large bags',
    pricePerKm: 18,
    basePrice: 2500,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400',
    features: ['AC', 'Music System', 'USB Charging', 'First Aid Kit', 'Spacious'],
    isAvailable: true,
    isActive: true,
    order: 2,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    _id: '3',
    name: 'Tempo Traveller',
    slug: 'tempo-traveller',
    type: 'tempo',
    seatingCapacity: 12,
    luggageCapacity: '10 large bags',
    pricePerKm: 25,
    basePrice: 4000,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
    features: ['AC', 'Music System', 'Push Back Seats', 'First Aid Kit'],
    isAvailable: false,
    isActive: true,
    order: 3,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    _id: '4',
    name: 'Mercedes S-Class',
    slug: 'mercedes-s-class',
    type: 'luxury',
    seatingCapacity: 4,
    luggageCapacity: '3 large bags',
    pricePerKm: 45,
    basePrice: 8000,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400',
    features: ['AC', 'Premium Sound', 'Leather Seats', 'WiFi', 'Refreshments'],
    isAvailable: true,
    isActive: true,
    order: 4,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
];

const vehicleTypes = ['sedan', 'suv', 'tempo', 'bus', 'luxury'] as const;

const defaultFormData: VehicleFormData = {
  name: '',
  type: 'sedan',
  seatingCapacity: 4,
  luggageCapacity: '',
  pricePerKm: 0,
  basePrice: 0,
  image: '',
  features: [],
  isAvailable: true,
  isActive: true,
  order: 0,
};

export default function AdminFleet() {
  const [fleet, setFleet] = useState<Vehicle[]>(mockFleet);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState<VehicleFormData>(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [featuresInput, setFeaturesInput] = useState('');

  const fetchFleet = async () => {
    setIsLoading(true);
    try {
      const data = await fleetService.getAll();
      setFleet(data);
    } catch {
      setFleet(mockFleet);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFleet();
  }, []);

  const filteredFleet = fleet.filter(v =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCreateDialog = () => {
    setEditingVehicle(null);
    setFormData(defaultFormData);
    setFeaturesInput('');
    setIsDialogOpen(true);
  };

  const openEditDialog = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      type: vehicle.type,
      seatingCapacity: vehicle.seatingCapacity,
      luggageCapacity: vehicle.luggageCapacity,
      pricePerKm: vehicle.pricePerKm,
      basePrice: vehicle.basePrice,
      image: vehicle.image,
      features: vehicle.features,
      isAvailable: vehicle.isAvailable,
      isActive: vehicle.isActive,
      order: vehicle.order,
    });
    setFeaturesInput(vehicle.features.join(', '));
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.pricePerKm) {
      toast.error('Please fill in required fields');
      return;
    }

    setIsSubmitting(true);
    const dataToSubmit = {
      ...formData,
      features: featuresInput.split(',').map(f => f.trim()).filter(Boolean),
    };

    try {
      if (editingVehicle) {
        await fleetService.update(editingVehicle._id, dataToSubmit);
        setFleet(prev =>
          prev.map(v => v._id === editingVehicle._id ? { ...v, ...dataToSubmit, updatedAt: new Date().toISOString() } : v)
        );
        toast.success('Vehicle updated successfully');
      } else {
        const newVehicle = await fleetService.create(dataToSubmit);
        setFleet(prev => [...prev, newVehicle]);
        toast.success('Vehicle added successfully');
      }
      setIsDialogOpen(false);
    } catch {
      if (editingVehicle) {
        setFleet(prev =>
          prev.map(v => v._id === editingVehicle._id ? { ...v, ...dataToSubmit, updatedAt: new Date().toISOString() } : v)
        );
        toast.success('Vehicle updated (demo mode)');
      } else {
        const newVehicle: Vehicle = {
          _id: Date.now().toString(),
          ...dataToSubmit,
          slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setFleet(prev => [...prev, newVehicle]);
        toast.success('Vehicle added (demo mode)');
      }
      setIsDialogOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fleetService.delete(id);
      setFleet(prev => prev.filter(v => v._id !== id));
      toast.success('Vehicle deleted successfully');
    } catch {
      setFleet(prev => prev.filter(v => v._id !== id));
      toast.success('Vehicle deleted (demo mode)');
    }
  };

  const handleToggleAvailability = async (id: string, isAvailable: boolean) => {
    try {
      await fleetService.toggleAvailability(id, isAvailable);
      setFleet(prev =>
        prev.map(v => v._id === id ? { ...v, isAvailable } : v)
      );
      toast.success(`Vehicle marked as ${isAvailable ? 'available' : 'unavailable'}`);
    } catch {
      setFleet(prev =>
        prev.map(v => v._id === id ? { ...v, isAvailable } : v)
      );
      toast.success(`Vehicle marked as ${isAvailable ? 'available' : 'unavailable'} (demo mode)`);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Fleet Management</h1>
            <p className="text-muted-foreground">Manage your vehicle fleet and pricing</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchFleet} disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            </Button>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Vehicle
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search vehicles..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
          ) : filteredFleet.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <Car className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No vehicles found</h3>
              <p className="text-muted-foreground">Add your first vehicle to the fleet</p>
              <Button className="mt-4" onClick={openCreateDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Vehicle
              </Button>
            </div>
          ) : (
            filteredFleet.map((vehicle) => (
              <Card key={vehicle._id} className="overflow-hidden">
                <div className="relative h-40 bg-muted">
                  {vehicle.image ? (
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute left-2 top-2">
                    <Badge variant="secondary" className="capitalize">
                      {vehicle.type}
                    </Badge>
                  </div>
                  <div className="absolute right-2 top-2">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                      vehicle.isAvailable 
                        ? 'bg-primary/90 text-primary-foreground' 
                        : 'bg-destructive/90 text-destructive-foreground'
                    }`}>
                      {vehicle.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{vehicle.name}</h3>
                  <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {vehicle.seatingCapacity}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5" />
                      {vehicle.luggageCapacity}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-lg font-bold text-primary">
                    <IndianRupee className="h-4 w-4" />
                    {vehicle.pricePerKm}/km
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Switch
                      checked={vehicle.isAvailable}
                      onCheckedChange={(checked) => handleToggleAvailability(vehicle._id, checked)}
                    />
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(vehicle)}>
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
                            <AlertDialogTitle>Delete Vehicle</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{vehicle.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(vehicle._id)}>
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
              <DialogTitle>{editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</DialogTitle>
              <DialogDescription>
                {editingVehicle ? 'Update the vehicle details below' : 'Fill in the details for your new vehicle'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Vehicle Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Toyota Innova Crysta"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Vehicle Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as typeof vehicleTypes[number] }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleTypes.map(type => (
                        <SelectItem key={type} value={type} className="capitalize">{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="seatingCapacity">Seating Capacity</Label>
                  <Input
                    id="seatingCapacity"
                    type="number"
                    value={formData.seatingCapacity}
                    onChange={(e) => setFormData(prev => ({ ...prev, seatingCapacity: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="luggageCapacity">Luggage Capacity</Label>
                  <Input
                    id="luggageCapacity"
                    value={formData.luggageCapacity}
                    onChange={(e) => setFormData(prev => ({ ...prev, luggageCapacity: e.target.value }))}
                    placeholder="e.g., 2 large bags"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="pricePerKm">Price per KM (₹) *</Label>
                  <Input
                    id="pricePerKm"
                    type="number"
                    value={formData.pricePerKm}
                    onChange={(e) => setFormData(prev => ({ ...prev, pricePerKm: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="basePrice">Base Price (₹)</Label>
                  <Input
                    id="basePrice"
                    type="number"
                    value={formData.basePrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, basePrice: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/vehicle.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label>Features (comma separated)</Label>
                <Input
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="AC, Music System, USB Charging, First Aid Kit"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    id="isAvailable"
                    checked={formData.isAvailable}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isAvailable: checked }))}
                  />
                  <Label htmlFor="isAvailable">Available for booking</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                  />
                  <Label htmlFor="isActive">Active on website</Label>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
