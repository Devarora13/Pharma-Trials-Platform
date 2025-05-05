
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import PharmaAdminDashboard from "./pages/PharmaAdmin/PharmaAdminDashboard";
import HospitalDashboard from "./pages/Hospital/HospitalDashboard";
import RegulatorDashboard from "./pages/Regulator/RegulatorDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/pharma" 
              element={
                <ProtectedRoute requiredRole="pharma">
                  <PharmaAdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/hospital" 
              element={
                <ProtectedRoute requiredRole="hospital">
                  <HospitalDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/regulator" 
              element={
                <ProtectedRoute requiredRole="regulator">
                  <RegulatorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
