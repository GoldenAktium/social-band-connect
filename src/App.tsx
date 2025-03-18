
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import UserTypeSelection from "./components/UserTypeSelection";
import MusicianOnboarding from "./components/MusicianOnboarding";
import BandOnboarding from "./components/BandOnboarding";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<div className="min-h-screen flex items-center justify-center p-4"><SignupForm /></div>} />
          <Route path="/login" element={<div className="min-h-screen flex items-center justify-center p-4"><LoginForm /></div>} />
          <Route path="/user-type" element={<div className="min-h-screen flex items-center justify-center p-4"><UserTypeSelection /></div>} />
          <Route path="/musician-onboarding" element={<div className="min-h-screen flex items-center justify-center p-4"><MusicianOnboarding /></div>} />
          <Route path="/band-onboarding" element={<div className="min-h-screen flex items-center justify-center p-4"><BandOnboarding /></div>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
