import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useTours } from '@/contexts/ToursContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Plus, Trash2, Upload, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Tour } from '@/data/tours';

const categories = ['Adventure', 'Beach', 'Cultural', 'Nature', 'Wildlife', 'Honeymoon', 'Family', 'Pilgrimage'];

interface TourFormData {
  title: string;
  slug: string;
  location: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  category: string;
  featured: boolean;
  popular: boolean;
  images: string[];
  highlights: string[];
  itinerary: { day: number; title: string; description: string }[];
  inclusions: string[];
  exclusions: string[];
}

const defaultFormData: TourFormData = {
  title: '',
  slug: '',
  location: '',
  description: '',
  price: 0,
  duration: '',
  rating: 4.5,
  category: 'Adventure',
  featured: false,
  popular: false,
  images: [],
  highlights: [''],
  itinerary: [{ day: 1, title: '', description: '' }],
  inclusions: [''],
  exclusions: [''],
};

export default function TourForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tours, addTour, updateTour, getTourById } = useTours();
  const isEditing = !!id;

  const existingTour = isEditing ? getTourById(id) : undefined;

  const [formData, setFormData] = useState<TourFormData>(() => {
    if (existingTour) {
      return {
        title: existingTour.title,
        slug: existingTour.slug,
        location: existingTour.location,
        description: existingTour.description,
        price: existingTour.price,
        duration: existingTour.duration,
        rating: existingTour.rating,
        category: existingTour.category,
        featured: existingTour.featured || false,
        popular: existingTour.popular || false,
        images: existingTour.images,
        highlights: existingTour.highlights || [''],
        itinerary: existingTour.itinerary || [{ day: 1, title: '', description: '' }],
        inclusions: existingTour.inclusions || [''],
        exclusions: existingTour.exclusions || [''],
      };
    }
    return defaultFormData;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // For demo, we'll use placeholder URLs. In production, you'd upload to storage.
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, reader.result as string],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addArrayItem = (field: 'highlights' | 'inclusions' | 'exclusions') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const updateArrayItem = (field: 'highlights' | 'inclusions' | 'exclusions', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const removeArrayItem = (field: 'highlights' | 'inclusions' | 'exclusions', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const addItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { day: prev.itinerary.length + 1, title: '', description: '' }],
    }));
  };

  const updateItinerary = (index: number, field: 'title' | 'description', value: string) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeItineraryDay = (index: number) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary
        .filter((_, i) => i !== index)
        .map((item, i) => ({ ...item, day: i + 1 })),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate
    if (!formData.title || !formData.location || !formData.price) {
      toast.error('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    // Clean up empty array items
    const cleanedData = {
      ...formData,
      highlights: formData.highlights.filter(h => h.trim()),
      inclusions: formData.inclusions.filter(i => i.trim()),
      exclusions: formData.exclusions.filter(e => e.trim()),
      itinerary: formData.itinerary.filter(i => i.title.trim()),
      images: formData.images.length > 0 ? formData.images : [
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop'
      ],
    };

    try {
      if (isEditing) {
        updateTour(id, cleanedData);
        toast.success('Tour updated successfully');
      } else {
        addTour(cleanedData as Omit<Tour, 'id'>);
        toast.success('Tour created successfully');
      }
      navigate('/admin/tours');
    } catch {
      toast.error('Something went wrong');
    }

    setIsSubmitting(false);
  };

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => navigate('/admin/tours')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-display text-3xl font-bold text-foreground">
              {isEditing ? 'Edit Tour' : 'Create New Tour'}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Update tour details' : 'Add a new tour package'}
            </p>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              isEditing ? 'Update Tour' : 'Create Tour'
            )}
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic Info */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Kashmir Valley Explorer"
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="kashmir-valley-explorer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Kashmir, India"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the tour experience..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="group relative aspect-video overflow-hidden rounded-lg border">
                      <img
                        src={image}
                        alt={`Tour ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <label className="flex aspect-video cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 transition-colors hover:border-primary/50 hover:bg-muted/50">
                    <div className="text-center">
                      <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                      <span className="mt-1 block text-xs text-muted-foreground">Upload</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Itinerary</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={addItineraryDay}>
                  <Plus className="mr-1 h-3 w-3" />
                  Add Day
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.itinerary.map((day, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-medium text-primary">Day {day.day}</span>
                      {formData.itinerary.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-destructive"
                          onClick={() => removeItineraryDay(index)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <Input
                        placeholder="Day title (e.g., Arrival in Srinagar)"
                        value={day.title}
                        onChange={(e) => updateItinerary(index, 'title', e.target.value)}
                      />
                      <Textarea
                        placeholder="Day description..."
                        value={day.description}
                        onChange={(e) => updateItinerary(index, 'description', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Highlights, Inclusions, Exclusions */}
            <div className="grid gap-6 md:grid-cols-3">
              {(['highlights', 'inclusions', 'exclusions'] as const).map((field) => (
                <Card key={field} className="shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base capitalize">{field}</CardTitle>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => addArrayItem(field)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {formData[field].map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder={`Add ${field.slice(0, -1)}...`}
                          value={item}
                          onChange={(e) => updateArrayItem(field, index, e.target.value)}
                          className="text-sm"
                        />
                        {formData[field].length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 shrink-0 text-destructive"
                            onClick={() => removeArrayItem(field, index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing & Duration */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Pricing & Duration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                    placeholder="45999"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="6 Days / 5 Nights"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: Number(e.target.value) }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Category & Status */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Category & Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Featured Tour</Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="popular">Popular Tour</Label>
                  <Switch
                    id="popular"
                    checked={formData.popular}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, popular: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
