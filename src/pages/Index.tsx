
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/Auth/LoginForm";
import { Database, FileCheck, FlaskConical, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (email: string, password: string, role: "pharma" | "hospital" | "regulator") => {
    // In a real implementation, this would authenticate with Supabase
    // For demo purposes, we navigate to the respective dashboard
    switch (role) {
      case "pharma":
        navigate("/pharma");
        break;
      case "hospital":
        navigate("/hospital");
        break;
      case "regulator":
        navigate("/regulator");
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {!showLogin ? (
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="border-b py-4">
            <div className="container flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-veridose-600 p-1.5 rounded-md shadow-sm">
                  <FlaskConical className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-veridose-700">VeriDose</span>
              </div>
              <Button onClick={() => setShowLogin(true)}>Sign In</Button>
            </div>
          </header>

          {/* Hero Section */}
          <section className="py-16 md:py-24 veridose-gradient text-white">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Blockchain-Verified Clinical Trial Management
                </h1>
                <p className="text-lg md:text-xl mb-8">
                  VeriDose combines AI anomaly detection with blockchain verification
                  to ensure the integrity and reliability of clinical trial data.
                </p>
                <Button 
                  size="lg" 
                  className="bg-white text-veridose-700 hover:bg-white/90"
                  onClick={() => setShowLogin(true)}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 bg-secondary/30">
            <div className="container">
              <h2 className="text-3xl font-bold text-center mb-12">Key Platform Features</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card p-6 rounded-lg shadow-sm border">
                  <div className="h-12 w-12 rounded-full bg-veridose-100 flex items-center justify-center mb-4">
                    <FlaskConical className="h-6 w-6 text-veridose-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Pharmaceutical Management</h3>
                  <p className="text-muted-foreground">
                    Create and manage drug trials, assign batches to hospitals, and monitor results
                    from a centralized dashboard.
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-sm border">
                  <div className="h-12 w-12 rounded-full bg-veridose-100 flex items-center justify-center mb-4">
                    <FileCheck className="h-6 w-6 text-veridose-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">AI Anomaly Detection</h3>
                  <p className="text-muted-foreground">
                    Advanced AI algorithms automatically detect anomalies in patient data, 
                    ensuring data quality and research integrity.
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-sm border">
                  <div className="h-12 w-12 rounded-full bg-veridose-100 flex items-center justify-center mb-4">
                    <Database className="h-6 w-6 text-veridose-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Blockchain Verification</h3>
                  <p className="text-muted-foreground">
                    All trial results are hashed and recorded on the Ethereum blockchain,
                    providing immutable proof of data integrity.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Role-based Section */}
          <section className="py-16">
            <div className="container">
              <h2 className="text-3xl font-bold text-center mb-12">Role-Based Platform Access</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-veridose-600 p-4 text-white">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <FlaskConical className="h-5 w-5" />
                      Pharmaceutical Admin
                    </h3>
                  </div>
                  <div className="p-5">
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>Create new drug trials</li>
                      <li>Manage dosage information</li>
                      <li>Assign trials to hospitals</li>
                      <li>Generate batch QR codes</li>
                      <li>View aggregated results</li>
                    </ul>
                  </div>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-veridose-500 p-4 text-white">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <FileCheck className="h-5 w-5" />
                      Hospital Staff
                    </h3>
                  </div>
                  <div className="p-5">
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>View assigned trials</li>
                      <li>Record patient data</li>
                      <li>Track completion progress</li>
                      <li>Submit final reports</li>
                      <li>Access AI analysis results</li>
                    </ul>
                  </div>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-veridose-700 p-4 text-white">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Government Regulator
                    </h3>
                  </div>
                  <div className="p-5">
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>Review submitted trial data</li>
                      <li>Analyze anomaly detection results</li>
                      <li>Verify blockchain records</li>
                      <li>Approve or reject submissions</li>
                      <li>Monitor compliance metrics</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-veridose-50">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Ready to Enhance Your Clinical Trial Platform?</h2>
                <p className="text-lg mb-8 text-muted-foreground">
                  Join the growing network of pharmaceutical companies, hospitals, and regulators
                  using VeriDose to ensure clinical trial integrity and streamline the approval process.
                </p>
                <Button 
                  size="lg" 
                  className="bg-veridose-600 hover:bg-veridose-700 text-white"
                  onClick={() => setShowLogin(true)}
                >
                  Sign In to Platform
                </Button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-auto py-8 bg-veridose-800 text-white">
            <div className="container">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                  <FlaskConical className="h-5 w-5" />
                  <span className="font-bold">VeriDose</span>
                </div>
                <div className="text-sm text-white/70">
                  © 2025 VeriDose. All rights reserved.
                </div>
                <div className="flex gap-6 mt-4 md:mt-0">
                  <a href="#" className="text-white/70 hover:text-white">Terms</a>
                  <a href="#" className="text-white/70 hover:text-white">Privacy</a>
                  <a href="#" className="text-white/70 hover:text-white">Contact</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
          <LoginForm onLogin={handleLogin} />
          <div className="mt-4">
            <Button variant="link" onClick={() => setShowLogin(false)}>
              Back to Home
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
