import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Equipment from "./pages/Equipment";
import About from "./pages/About";
import Providers from "./pages/Providers";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import CustomerData from "./pages/CustomerData";
import Profile from "./pages/Profile";
import AdminRequests from "./pages/AdminRequests";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/customer-data" element={<CustomerData />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin/requests" element={<AdminRequests />} />
            <Route path="/home" element={<Layout><Home /></Layout>} />
            <Route path="/equipment" element={<Layout><Equipment /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/providers" element={<Layout><Providers /></Layout>} />
            <Route path="/renters" element={<Layout><Equipment /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
