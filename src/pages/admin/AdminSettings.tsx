import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { settingsService, SiteSettings } from '@/lib/api/services/settings.service';
import {
  Palette,
  Phone,
  CreditCard,
  Globe,
  Building2,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  MapPin,
  Mail,
  Clock,
  Loader2,
  Save,
  Eye,
  EyeOff,
  AlertTriangle,
  Check
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock settings for demo
const mockSettings: SiteSettings = {
  branding: {
    siteName: 'Green Cab Service',
    tagline: 'Your Trusted Travel Partner in Aurangabad',
    logo: '/logo.png',
    favicon: '/favicon.ico',
    primaryColor: '#16a34a',
    secondaryColor: '#166534',
  },
  contact: {
    email: 'info@greencab.in',
    phone: '+91 9876543210',
    whatsapp: '+91 9876543210',
    address: '123 Main Road, Near Railway Station',
    city: 'Aurangabad',
    state: 'Maharashtra',
    pincode: '431001',
    googleMapsUrl: 'https://maps.google.com/?q=Aurangabad',
    businessHours: 'Mon-Sun: 24/7',
  },
  social: {
    facebook: 'https://facebook.com/greencab',
    instagram: 'https://instagram.com/greencab',
    twitter: 'https://twitter.com/greencab',
    youtube: '',
    linkedin: '',
  },
  payment: {
    stripeEnabled: false,
    stripePublishableKey: '',
    stripeSecretKey: '',
    razorpayEnabled: true,
    razorpayKeyId: '',
    razorpayKeySecret: '',
    codEnabled: true,
    currency: 'INR',
    taxPercentage: 18,
  },
  seo: {
    defaultTitle: 'Green Cab Service - Taxi & Tour Booking in Aurangabad',
    defaultDescription: 'Book reliable taxi and tour services in Aurangabad. Airport transfers, local tours, outstation trips, and more.',
    defaultKeywords: ['taxi aurangabad', 'cab service', 'tour booking', 'ajanta ellora tours'],
    googleAnalyticsId: '',
    facebookPixelId: '',
  },
};

export default function AdminSettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<SiteSettings>(mockSettings);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  
  // Password visibility states
  const [showStripeSecret, setShowStripeSecret] = useState(false);
  const [showRazorpaySecret, setShowRazorpaySecret] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const data = await settingsService.getSettings();
      setSettings(data);
    } catch (error) {
      // Use mock data when backend not connected
      setSettings(mockSettings);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveBranding = async () => {
    setSavingSection('branding');
    try {
      await settingsService.updateBranding(settings.branding);
      toast({
        title: 'Branding Updated',
        description: 'Site branding settings have been saved.',
      });
    } catch (error) {
      toast({
        title: 'Settings Saved (Demo)',
        description: 'Connect backend to persist changes.',
      });
    } finally {
      setSavingSection(null);
    }
  };

  const handleSaveContact = async () => {
    setSavingSection('contact');
    try {
      await settingsService.updateContact(settings.contact);
      toast({
        title: 'Contact Info Updated',
        description: 'Contact information has been saved.',
      });
    } catch (error) {
      toast({
        title: 'Settings Saved (Demo)',
        description: 'Connect backend to persist changes.',
      });
    } finally {
      setSavingSection(null);
    }
  };

  const handleSaveSocial = async () => {
    setSavingSection('social');
    try {
      await settingsService.updateSocial(settings.social);
      toast({
        title: 'Social Links Updated',
        description: 'Social media links have been saved.',
      });
    } catch (error) {
      toast({
        title: 'Settings Saved (Demo)',
        description: 'Connect backend to persist changes.',
      });
    } finally {
      setSavingSection(null);
    }
  };

  const handleSavePayment = async () => {
    setSavingSection('payment');
    try {
      await settingsService.updatePayment(settings.payment);
      toast({
        title: 'Payment Settings Updated',
        description: 'Payment configuration has been saved.',
      });
    } catch (error) {
      toast({
        title: 'Settings Saved (Demo)',
        description: 'Connect backend to persist changes.',
      });
    } finally {
      setSavingSection(null);
    }
  };

  const handleSaveSeo = async () => {
    setSavingSection('seo');
    try {
      await settingsService.updateSeo(settings.seo);
      toast({
        title: 'SEO Settings Updated',
        description: 'SEO configuration has been saved.',
      });
    } catch (error) {
      toast({
        title: 'Settings Saved (Demo)',
        description: 'Connect backend to persist changes.',
      });
    } finally {
      setSavingSection(null);
    }
  };

  const updateBranding = (key: keyof SiteSettings['branding'], value: string) => {
    setSettings(prev => ({
      ...prev,
      branding: { ...prev.branding, [key]: value }
    }));
  };

  const updateContact = (key: keyof SiteSettings['contact'], value: string) => {
    setSettings(prev => ({
      ...prev,
      contact: { ...prev.contact, [key]: value }
    }));
  };

  const updateSocial = (key: keyof SiteSettings['social'], value: string) => {
    setSettings(prev => ({
      ...prev,
      social: { ...prev.social, [key]: value }
    }));
  };

  const updatePayment = (key: keyof SiteSettings['payment'], value: string | boolean | number) => {
    setSettings(prev => ({
      ...prev,
      payment: { ...prev.payment, [key]: value }
    }));
  };

  const updateSeo = (key: keyof SiteSettings['seo'], value: string | string[]) => {
    setSettings(prev => ({
      ...prev,
      seo: { ...prev.seo, [key]: value }
    }));
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex h-96 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Configure your website and business settings</p>
        </div>

        <Tabs defaultValue="branding" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="branding" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Branding</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">Social</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payment</span>
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">SEO</span>
            </TabsTrigger>
          </TabsList>

          {/* Branding Tab */}
          <TabsContent value="branding">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  Site Branding
                </CardTitle>
                <CardDescription>
                  Customize your website's appearance and identity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={settings.branding.siteName}
                      onChange={(e) => updateBranding('siteName', e.target.value)}
                      placeholder="Your Business Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                      id="tagline"
                      value={settings.branding.tagline}
                      onChange={(e) => updateBranding('tagline', e.target.value)}
                      placeholder="Your catchy tagline"
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo URL</Label>
                    <Input
                      id="logo"
                      value={settings.branding.logo}
                      onChange={(e) => updateBranding('logo', e.target.value)}
                      placeholder="/logo.png or https://..."
                    />
                    <p className="text-xs text-muted-foreground">
                      Recommended: 200x60px PNG with transparent background
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="favicon">Favicon URL</Label>
                    <Input
                      id="favicon"
                      value={settings.branding.favicon}
                      onChange={(e) => updateBranding('favicon', e.target.value)}
                      placeholder="/favicon.ico"
                    />
                    <p className="text-xs text-muted-foreground">
                      Recommended: 32x32px ICO or PNG
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={settings.branding.primaryColor}
                        onChange={(e) => updateBranding('primaryColor', e.target.value)}
                        className="h-10 w-14 cursor-pointer p-1"
                      />
                      <Input
                        value={settings.branding.primaryColor}
                        onChange={(e) => updateBranding('primaryColor', e.target.value)}
                        placeholder="#16a34a"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={settings.branding.secondaryColor}
                        onChange={(e) => updateBranding('secondaryColor', e.target.value)}
                        className="h-10 w-14 cursor-pointer p-1"
                      />
                      <Input
                        value={settings.branding.secondaryColor}
                        onChange={(e) => updateBranding('secondaryColor', e.target.value)}
                        placeholder="#166534"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveBranding} disabled={savingSection === 'branding'}>
                    {savingSection === 'branding' ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Save Branding
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  Update your business contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.contact.email}
                      onChange={(e) => updateContact('email', e.target.value)}
                      placeholder="info@yourbusiness.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={settings.contact.phone}
                      onChange={(e) => updateContact('phone', e.target.value)}
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input
                    id="whatsapp"
                    value={settings.contact.whatsapp}
                    onChange={(e) => updateContact('whatsapp', e.target.value)}
                    placeholder="+91 9876543210"
                  />
                  <p className="text-xs text-muted-foreground">
                    Include country code for WhatsApp click-to-chat
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Street Address
                  </Label>
                  <Textarea
                    id="address"
                    value={settings.contact.address}
                    onChange={(e) => updateContact('address', e.target.value)}
                    placeholder="123 Main Street, Near Landmark"
                    rows={2}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={settings.contact.city}
                      onChange={(e) => updateContact('city', e.target.value)}
                      placeholder="Aurangabad"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={settings.contact.state}
                      onChange={(e) => updateContact('state', e.target.value)}
                      placeholder="Maharashtra"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      value={settings.contact.pincode}
                      onChange={(e) => updateContact('pincode', e.target.value)}
                      placeholder="431001"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="googleMapsUrl">Google Maps URL</Label>
                    <Input
                      id="googleMapsUrl"
                      value={settings.contact.googleMapsUrl}
                      onChange={(e) => updateContact('googleMapsUrl', e.target.value)}
                      placeholder="https://maps.google.com/?q=..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessHours" className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Business Hours
                    </Label>
                    <Input
                      id="businessHours"
                      value={settings.contact.businessHours}
                      onChange={(e) => updateContact('businessHours', e.target.value)}
                      placeholder="Mon-Sun: 24/7"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveContact} disabled={savingSection === 'contact'}>
                    {savingSection === 'contact' ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Save Contact Info
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Tab */}
          <TabsContent value="social">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Social Media Links
                </CardTitle>
                <CardDescription>
                  Connect your social media profiles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="facebook" className="flex items-center gap-2">
                      <Facebook className="h-4 w-4 text-blue-600" />
                      Facebook
                    </Label>
                    <Input
                      id="facebook"
                      value={settings.social.facebook}
                      onChange={(e) => updateSocial('facebook', e.target.value)}
                      placeholder="https://facebook.com/yourpage"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="flex items-center gap-2">
                      <Instagram className="h-4 w-4 text-pink-600" />
                      Instagram
                    </Label>
                    <Input
                      id="instagram"
                      value={settings.social.instagram}
                      onChange={(e) => updateSocial('instagram', e.target.value)}
                      placeholder="https://instagram.com/yourhandle"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="twitter" className="flex items-center gap-2">
                      <Twitter className="h-4 w-4 text-sky-500" />
                      Twitter / X
                    </Label>
                    <Input
                      id="twitter"
                      value={settings.social.twitter}
                      onChange={(e) => updateSocial('twitter', e.target.value)}
                      placeholder="https://twitter.com/yourhandle"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="youtube" className="flex items-center gap-2">
                      <Youtube className="h-4 w-4 text-red-600" />
                      YouTube
                    </Label>
                    <Input
                      id="youtube"
                      value={settings.social.youtube}
                      onChange={(e) => updateSocial('youtube', e.target.value)}
                      placeholder="https://youtube.com/@yourchannel"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-blue-700" />
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    value={settings.social.linkedin}
                    onChange={(e) => updateSocial('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveSocial} disabled={savingSection === 'social'}>
                    {savingSection === 'social' ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Save Social Links
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment">
            <div className="space-y-6">
              {/* Payment Methods */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure payment gateways and options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      <div>
                        <h4 className="font-medium text-amber-800 dark:text-amber-200">
                          Security Notice
                        </h4>
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                          Secret keys should be stored securely on your backend server. 
                          Only enter them here if this admin panel is connected to a secure backend.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select 
                        value={settings.payment.currency}
                        onValueChange={(value) => updatePayment('currency', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="INR">INR - Indian Rupee (₹)</SelectItem>
                          <SelectItem value="USD">USD - US Dollar ($)</SelectItem>
                          <SelectItem value="EUR">EUR - Euro (€)</SelectItem>
                          <SelectItem value="GBP">GBP - British Pound (£)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxPercentage">Tax Percentage (%)</Label>
                      <Input
                        id="taxPercentage"
                        type="number"
                        min="0"
                        max="100"
                        value={settings.payment.taxPercentage}
                        onChange={(e) => updatePayment('taxPercentage', parseFloat(e.target.value) || 0)}
                        placeholder="18"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Stripe */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900">
                          <CreditCard className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">Stripe</h4>
                          <p className="text-sm text-muted-foreground">
                            International payments & cards
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {settings.payment.stripeEnabled && (
                          <Badge variant="default" className="bg-green-600">
                            <Check className="mr-1 h-3 w-3" />
                            Enabled
                          </Badge>
                        )}
                        <Switch
                          checked={settings.payment.stripeEnabled}
                          onCheckedChange={(checked) => updatePayment('stripeEnabled', checked)}
                        />
                      </div>
                    </div>

                    {settings.payment.stripeEnabled && (
                      <div className="ml-13 grid gap-4 border-l-2 border-violet-200 pl-6 dark:border-violet-800">
                        <div className="space-y-2">
                          <Label htmlFor="stripePublishableKey">Publishable Key</Label>
                          <Input
                            id="stripePublishableKey"
                            value={settings.payment.stripePublishableKey}
                            onChange={(e) => updatePayment('stripePublishableKey', e.target.value)}
                            placeholder="pk_live_..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="stripeSecretKey">Secret Key</Label>
                          <div className="relative">
                            <Input
                              id="stripeSecretKey"
                              type={showStripeSecret ? 'text' : 'password'}
                              value={settings.payment.stripeSecretKey}
                              onChange={(e) => updatePayment('stripeSecretKey', e.target.value)}
                              placeholder="sk_live_..."
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowStripeSecret(!showStripeSecret)}
                            >
                              {showStripeSecret ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Razorpay */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                          <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">Razorpay</h4>
                          <p className="text-sm text-muted-foreground">
                            UPI, cards & Indian payments
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {settings.payment.razorpayEnabled && (
                          <Badge variant="default" className="bg-green-600">
                            <Check className="mr-1 h-3 w-3" />
                            Enabled
                          </Badge>
                        )}
                        <Switch
                          checked={settings.payment.razorpayEnabled}
                          onCheckedChange={(checked) => updatePayment('razorpayEnabled', checked)}
                        />
                      </div>
                    </div>

                    {settings.payment.razorpayEnabled && (
                      <div className="ml-13 grid gap-4 border-l-2 border-blue-200 pl-6 dark:border-blue-800">
                        <div className="space-y-2">
                          <Label htmlFor="razorpayKeyId">Key ID</Label>
                          <Input
                            id="razorpayKeyId"
                            value={settings.payment.razorpayKeyId}
                            onChange={(e) => updatePayment('razorpayKeyId', e.target.value)}
                            placeholder="rzp_live_..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="razorpayKeySecret">Key Secret</Label>
                          <div className="relative">
                            <Input
                              id="razorpayKeySecret"
                              type={showRazorpaySecret ? 'text' : 'password'}
                              value={settings.payment.razorpayKeySecret}
                              onChange={(e) => updatePayment('razorpayKeySecret', e.target.value)}
                              placeholder="Your secret key"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowRazorpaySecret(!showRazorpaySecret)}
                            >
                              {showRazorpaySecret ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Cash on Delivery */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                        <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Cash on Delivery / Pay Later</h4>
                        <p className="text-sm text-muted-foreground">
                          Allow customers to pay at pickup
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {settings.payment.codEnabled && (
                        <Badge variant="default" className="bg-green-600">
                          <Check className="mr-1 h-3 w-3" />
                          Enabled
                        </Badge>
                      )}
                      <Switch
                        checked={settings.payment.codEnabled}
                        onCheckedChange={(checked) => updatePayment('codEnabled', checked)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSavePayment} disabled={savingSection === 'payment'}>
                      {savingSection === 'payment' ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      Save Payment Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* SEO Tab */}
          <TabsContent value="seo">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  SEO & Analytics
                </CardTitle>
                <CardDescription>
                  Optimize your site for search engines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultTitle">Default Page Title</Label>
                  <Input
                    id="defaultTitle"
                    value={settings.seo.defaultTitle}
                    onChange={(e) => updateSeo('defaultTitle', e.target.value)}
                    placeholder="Your Business - Tagline"
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended: 50-60 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultDescription">Default Meta Description</Label>
                  <Textarea
                    id="defaultDescription"
                    value={settings.seo.defaultDescription}
                    onChange={(e) => updateSeo('defaultDescription', e.target.value)}
                    placeholder="Brief description of your business..."
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended: 150-160 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultKeywords">Default Keywords</Label>
                  <Input
                    id="defaultKeywords"
                    value={settings.seo.defaultKeywords.join(', ')}
                    onChange={(e) => updateSeo('defaultKeywords', e.target.value.split(',').map(k => k.trim()))}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                  <p className="text-xs text-muted-foreground">
                    Comma-separated list of keywords
                  </p>
                </div>

                <Separator />

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                    <Input
                      id="googleAnalyticsId"
                      value={settings.seo.googleAnalyticsId}
                      onChange={(e) => updateSeo('googleAnalyticsId', e.target.value)}
                      placeholder="G-XXXXXXXXXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
                    <Input
                      id="facebookPixelId"
                      value={settings.seo.facebookPixelId}
                      onChange={(e) => updateSeo('facebookPixelId', e.target.value)}
                      placeholder="XXXXXXXXXXXXXXXX"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveSeo} disabled={savingSection === 'seo'}>
                    {savingSection === 'seo' ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Save SEO Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
