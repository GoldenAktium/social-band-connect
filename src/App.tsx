
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import FindBands from "./pages/FindBands";
import FindMusicians from "./pages/FindMusicians";
import FindMusic from "./pages/FindMusic";
import MusicianProfile from "./pages/MusicianProfile";
import BandProfile from "./pages/BandProfile";
import NotFound from "./pages/NotFound";
import UserTypeSelection from "./components/UserTypeSelection";
import MusicianOnboarding from "./components/MusicianOnboarding";
import BandOnboarding from "./components/BandOnboarding";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import MusicUpload from "./components/MusicUpload";
import { AuthProvider } from "./context/AuthContext";
import AuthRoute from "./components/AuthRoute";
import Groups from "./pages/Groups";
import GroupDetail from "./pages/GroupDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            
            <Route path="/dashboard" element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            } />
            
            <Route path="/find-bands" element={<FindBands />} />
            <Route path="/find-musicians" element={<FindMusicians />} />
            <Route path="/find-music" element={<FindMusic />} />
            
            {/* New profile routes */}
            <Route path="/musician/:id" element={<MusicianProfile />} />
            <Route path="/band/:id" element={<BandProfile />} />
            
            {/* Group routes */}
            <Route path="/groups" element={
              <AuthRoute>
                <Groups />
              </AuthRoute>
            } />
            
            <Route path="/group/:id" element={
              <AuthRoute>
                <GroupDetail />
              </AuthRoute>
            } />
            
            <Route path="/upload-music" element={
              <AuthRoute>
                <div className="min-h-screen flex items-center justify-center p-4">
                  <MusicUpload />
                </div>
              </AuthRoute>
            } />
            
            <Route path="/signup" element={<div className="min-h-screen flex items-center justify-center p-4"><SignupForm /></div>} />
            <Route path="/login" element={<div className="min-h-screen flex items-center justify-center p-4"><LoginForm /></div>} />
            <Route path="/user-type" element={
              <AuthRoute>
                <div className="min-h-screen flex items-center justify-center p-4">
                  <UserTypeSelection />
                </div>
              </AuthRoute>
            } />
            
            <Route path="/musician-onboarding" element={
              <AuthRoute>
                <div className="min-h-screen flex items-center justify-center p-4">
                  <MusicianOnboarding />
                </div>
              </AuthRoute>
            } />
            
            <Route path="/band-onboarding" element={
              <AuthRoute>
                <div className="min-h-screen flex items-center justify-center p-4">
                  <BandOnboarding />
                </div>
              </AuthRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
