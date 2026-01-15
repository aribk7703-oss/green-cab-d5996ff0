import { useState, useEffect } from 'react';
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
import { USE_MOCK_API } from '@/lib/api/mock';

const categories = ['Adventure', 'Beach', 'Cultural', 'Nature', 'Wildlife', 'Honeymoon', 'Family', 'Pilgrimage', 'Heritage'];

interface TourFormData {
  title: string;
  slug: string;
  location: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  duration: string;
  durationDays: number;
  rating: number;
  reviewCount: number;
  category: string;
  featured: boolean;
  popular: boolean;
  images: string[];
  image: string;
  highlights: string[];
  itinerary: { day: number; title: string; description: string }[];
  inclusions: string[];
  exclusions: string[];
  maxGroupSize: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
}

const defaultFormData: TourFormData = {
  title: '',
  slug: '',
  location: '',
  description: '',
  shortDescription: '',
  price: 0,
  originalPrice: undefined,
  duration: '',
  durationDays: 1,
  rating: 4.5,
  reviewCount: 0,
  category: 'Adventure',
  featured: false,
  popular: false,
  images: [],
  image: '',
  highlights: [''],
  itinerary: [{ day: 1, title: '', description: '' }],
  inclusions: [''],
  exclusions: [''],
  maxGroupSize: 15,
  difficulty: 'Easy',
};

// Simulate network delay for mock mode
const simulateDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export default function TourForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addTour, updateTour, getTourById } = useTours();
  const isEditing = !!id;

  const [formData, setFormData] = useState<TourFormData>(defaultFormData);
  const [isLoadingTour, setIsLoadingTour] = useState(isEditing);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch tour data for editing
  useEffect(() => {
    const fetchTour = async () => {
      if (!id) return;
      
      setIsLoadingTour(true);
      try {
        if (USE_MOCK_API) {
          // Simulate API delay
          await simulateDelay(500);
        }
        
        const tour = getTourById(id);
        if (tour) {
          setFormData({
            title: tour.title,
            slug: tour.slug,
            location: tour.location,
            description: tour.description,
            shortDescription: tour.shortDescription || '',
            price: tour.price,
            originalPrice: tour.originalPrice,
            duration: tour.duration,
            durationDays: tour.durationDays || 1,
            rating: tour.rating,
            reviewCount: tour.reviewCount || 0,
            category: tour.category,
            featured: tour.featured || false,
            popular: tour.popular || false,
            images: tour.images || [],
            image: tour.image || '',
            highlights: tour.highlights?.length ? tour.highlights : [''],
            itinerary: tour.itinerary?.length ? tour.itinerary : [{ day: 1, title: '', description: '' }],
            inclusions: tour.inclusions?.length ? tour.inclusions : [''],
            exclusions: tour.exclusions?.length ? tour.exclusions : [''],
            maxGroupSize: tour.maxGroupSize || 15,
            difficulty: tour.difficulty || 'Easy',
          });
        } else {
          toast.error('Tour not found');
          navigate('/admin/tours');
        }
      } catch (error) {
        console.error('Failed to fetch tour:', error);
        toast.error('Failed to load tour data');
      } finally {
        setIsLoadingTour(false);
      }
    };

    fetchTour();
  }, [id, getTourById, navigate]);

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
    const cleanedData: Omit<Tour, 'id'> = {
      title: formData.title,
      slug: formData.slug || generateSlug(formData.title),
      location: formData.location,
      description: formData.description,
      shortDescription: formData.shortDescription || formData.description.slice(0, 150),
      price: formData.price,
      originalPrice: formData.originalPrice,
      duration: formData.duration,
      durationDays: formData.durationDays,
      rating: formData.rating,
      reviewCount: formData.reviewCount,
      category: formData.category,
      featured: formData.featured,
      popular: formData.popular,
      image: formData.images[0] || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop',
      images: formData.images.length > 0 ? formData.images : [
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop'
      ],
      highlights: formData.highlights.filter(h => h.trim()),
      inclusions: formData.inclusions.filter(i => i.trim()),
      exclusions: formData.exclusions.filter(e => e.trim()),
      itinerary: formData.itinerary.filter(i => i.title.trim()),
      maxGroupSize: formData.maxGroupSize,
      difficulty: formData.difficulty,
    };

    try {
      if (USE_MOCK_API) {
        // Simulate API delay
        await simulateDelay(600);
      }

      if (isEditing && id) {
        updateTour(id, cleanedData);
        toast.success('Tour updated successfully');
      } else {
        addTour(cleanedData);
        toast.success('Tour created successfully');
      }
      navigate('/admin/tours');
    } catch (error) {
      console.error('Failed to save tour:', error);
      toast.error('Something went wrong');
    }

    setIsSubmitting(false);
  };

  if (isLoadingTour) {
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

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Textarea
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                    placeholder="Brief description for cards and previews..."
                    rows={2}
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
                  <Label htmlFor="originalPrice">Original Price (₹)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    value={formData.originalPrice || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value ? Number(e.target.value) : undefined }))}
                    placeholder="55999"
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
                  <Label htmlFor="durationDays">Duration (Days)</Label>
                  <Input
                    id="durationDays"
                    type="number"
                    min="1"
                    value={formData.durationDays}
                    onChange={(e) => setFormData(prev => ({ ...prev, durationDays: Number(e.target.value) }))}
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
                      <SelectValue placeholder="Select category" />
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

                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value: 'Easy' | 'Moderate' | 'Challenging') => setFormData(prev => ({ ...prev, difficulty: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="Challenging">Challenging</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxGroupSize">Max Group Size</Label>
                  <Input
                    id="maxGroupSize"
                    type="number"
                    min="1"
                    value={formData.maxGroupSize}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxGroupSize: Number(e.target.value) }))}
                  />
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
