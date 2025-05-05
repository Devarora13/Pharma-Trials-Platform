
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PharmaAdminDashboard from "./pages/PharmaAdmin/PharmaAdminDashboard";
import HospitalDashboard from "./pages/Hospital/HospitalDashboard";
import RegulatorDashboard from "./pages/Regulator/RegulatorDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pharma" element={<PharmaAdminDashboard />} />
          <Route path="/hospital" element={<HospitalDashboard />} />
          <Route path="/regulator" element={<RegulatorDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
