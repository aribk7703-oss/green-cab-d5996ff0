import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { ToursProvider } from "@/contexts/ToursContext";
import Index from "./pages/Index";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import Booking from "./pages/Booking";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Fleet from "./pages/Fleet";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import DynamicPage from "./pages/DynamicPage";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTours from "./pages/admin/AdminTours";
import TourForm from "./pages/admin/TourForm";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminServices from "./pages/admin/AdminServices";
import AdminFleet from "./pages/admin/AdminFleet";
import AdminLocations from "./pages/admin/AdminLocations";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminPages from "./pages/admin/AdminPages";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminAuthProvider>
          <ToursProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/tours/:slug" element={<TourDetail />} />
              <Route path="/booking/:slug" element={<Booking />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/fleet" element={<Fleet />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/packages" element={<Tours />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destinations/:slug" element={<DestinationDetail />} />
              
              {/* Static Pages from CMS */}
              <Route path="/terms" element={<DynamicPage slug="terms" />} />
              <Route path="/privacy" element={<DynamicPage slug="privacy" />} />
              <Route path="/faq" element={<DynamicPage slug="faq" />} />
              <Route path="/page/:slug" element={<DynamicPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/bookings" element={<AdminBookings />} />
              <Route path="/admin/tours" element={<AdminTours />} />
              <Route path="/admin/tours/create" element={<TourForm />} />
              <Route path="/admin/tours/:id/edit" element={<TourForm />} />
              <Route path="/admin/services" element={<AdminServices />} />
              <Route path="/admin/fleet" element={<AdminFleet />} />
              <Route path="/admin/locations" element={<AdminLocations />} />
              <Route path="/admin/blog" element={<AdminBlog />} />
              <Route path="/admin/pages" element={<AdminPages />} />
              <Route path="/admin/media" element={<AdminMedia />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ToursProvider>
        </AdminAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
