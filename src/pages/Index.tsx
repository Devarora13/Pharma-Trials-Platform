
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Database, 
  FileCheck, 
  FlaskConical, 
  Shield, 
  Sparkles, 
  Zap,
  Lock,
  ChartBar,
  QrCode,
  CheckCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();
  const { user, role } = useAuth();

  const goToDashboard = () => {
    if (role === "pharma") navigate("/pharma");
    else if (role === "hospital") navigate("/hospital");
    else if (role === "regulator") navigate("/regulator");
    else navigate("/auth");
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, 
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="border-b py-4 bg-white shadow-sm">
          <div className="container flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="veridose-gradient p-1.5 rounded-md shadow-sm">
                <FlaskConical className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-veridose-700">VeriDose</span>
            </div>
            <div className="flex gap-2">
              {user ? (
                <Button onClick={goToDashboard}>
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link to="/auth">Log In</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/auth">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 veridose-gradient opacity-90"></div>
          <div className="relative container z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center text-white"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Blockchain-Verified Clinical Trial Management
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                VeriDose combines AI anomaly detection with blockchain verification
                to ensure the integrity and reliability of clinical trial data.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-veridose-700 hover:bg-white/90"
                  asChild
                >
                  <Link to="/auth">Get Started</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-4">Key Platform Features</h2>
            <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              VeriDose streamlines Phase III clinical trials with advanced security, verification, and reporting.
            </p>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div className="bg-card p-8 rounded-xl shadow-sm border" variants={item}>
                <div className="h-14 w-14 rounded-full bg-veridose-100 flex items-center justify-center mb-6">
                  <FlaskConical className="h-7 w-7 text-veridose-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Pharmaceutical Management</h3>
                <p className="text-muted-foreground">
                  Create and manage drug trials, assign batches to hospitals, and monitor results
                  from a centralized dashboard with real-time analytics.
                </p>
              </motion.div>
              
              <motion.div className="bg-card p-8 rounded-xl shadow-sm border" variants={item}>
                <div className="h-14 w-14 rounded-full bg-veridose-100 flex items-center justify-center mb-6">
                  <Sparkles className="h-7 w-7 text-veridose-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Anomaly Detection</h3>
                <p className="text-muted-foreground">
                  Advanced AI algorithms automatically detect anomalies in patient data, 
                  ensuring data quality and research integrity at every step.
                </p>
              </motion.div>
              
              <motion.div className="bg-card p-8 rounded-xl shadow-sm border" variants={item}>
                <div className="h-14 w-14 rounded-full bg-veridose-100 flex items-center justify-center mb-6">
                  <Database className="h-7 w-7 text-veridose-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Blockchain Verification</h3>
                <p className="text-muted-foreground">
                  All trial results are hashed and recorded on the Ethereum blockchain,
                  providing immutable proof of data integrity and transparency.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-4">How VeriDose Works</h2>
            <p className="text-center text-lg text-muted-foreground mb-16 max-w-2xl mx-auto">
              Our streamlined workflow ensures data integrity from trial creation through regulatory approval
            </p>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Connection line */}
              <div className="absolute top-16 bottom-16 left-[48px] md:left-1/2 w-1 md:w-0.5 bg-veridose-200 -z-10 md:translate-x-0"></div>
              
              <div className="space-y-12 md:space-y-0">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                  <div className="flex-none flex items-center space-x-4 md:w-1/2 md:justify-end">
                    <div className="flex-none flex h-12 w-12 rounded-full bg-veridose-600 text-white items-center justify-center shadow-md">
                      <FlaskConical className="h-6 w-6" />
                    </div>
                    <div className="md:hidden text-xl font-semibold">Trial Creation</div>
                  </div>
                  
                  <div className="pt-2 pl-16 md:pl-0 md:w-1/2">
                    <h3 className="hidden md:block text-xl font-semibold mb-2">Trial Creation</h3>
                    <p className="text-muted-foreground">
                      Pharmaceutical companies create drug trials, define parameters, and generate unique batch IDs. Each trial contains critical information about dosage, side effects, and instructions.
                    </p>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                  <div className="flex-none flex items-center space-x-4 md:w-1/2 md:justify-end md:order-last">
                    <div className="flex-none flex h-12 w-12 rounded-full bg-veridose-500 text-white items-center justify-center shadow-md">
                      <QrCode className="h-6 w-6" />
                    </div>
                    <div className="md:hidden text-xl font-semibold">Hospital Assignment</div>
                  </div>
                  
                  <div className="pt-2 pl-16 md:pl-0 md:w-1/2">
                    <h3 className="hidden md:block text-xl font-semibold mb-2">Hospital Assignment</h3>
                    <p className="text-muted-foreground">
                      Trials are assigned to hospitals with QR codes for verification and tracking. Hospitals receive trials with sample size requirements and detailed instructions.
                    </p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                  <div className="flex-none flex items-center space-x-4 md:w-1/2 md:justify-end">
                    <div className="flex-none flex h-12 w-12 rounded-full bg-veridose-500 text-white items-center justify-center shadow-md">
                      <FileCheck className="h-6 w-6" />
                    </div>
                    <div className="md:hidden text-xl font-semibold">Data Collection</div>
                  </div>
                  
                  <div className="pt-2 pl-16 md:pl-0 md:w-1/2">
                    <h3 className="hidden md:block text-xl font-semibold mb-2">Data Collection</h3>
                    <p className="text-muted-foreground">
                      Hospitals record patient data throughout the trial, tracking vital statistics, side effects, and overall health outcomes. The platform ensures all required data points are captured.
                    </p>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                  <div className="flex-none flex items-center space-x-4 md:w-1/2 md:justify-end md:order-last">
                    <div className="flex-none flex h-12 w-12 rounded-full bg-veridose-600 text-white items-center justify-center shadow-md">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div className="md:hidden text-xl font-semibold">AI Analysis</div>
                  </div>
                  
                  <div className="pt-2 pl-16 md:pl-0 md:w-1/2">
                    <h3 className="hidden md:block text-xl font-semibold mb-2">AI Analysis</h3>
                    <p className="text-muted-foreground">
                      When data collection is complete, our AI analyzes all patient records for anomalies, ensuring data accuracy and highlighting potential issues for review.
                    </p>
                  </div>
                </div>
                
                {/* Step 5 */}
                <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                  <div className="flex-none flex items-center space-x-4 md:w-1/2 md:justify-end">
                    <div className="flex-none flex h-12 w-12 rounded-full bg-veridose-700 text-white items-center justify-center shadow-md">
                      <Lock className="h-6 w-6" />
                    </div>
                    <div className="md:hidden text-xl font-semibold">Blockchain Verification</div>
                  </div>
                  
                  <div className="pt-2 pl-16 md:pl-0 md:w-1/2">
                    <h3 className="hidden md:block text-xl font-semibold mb-2">Blockchain Verification</h3>
                    <p className="text-muted-foreground">
                      Trial results are hashed and permanently recorded on the Ethereum blockchain, creating tamper-proof verification of the data's integrity and timestamp.
                    </p>
                  </div>
                </div>
                
                {/* Step 6 */}
                <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                  <div className="flex-none flex items-center space-x-4 md:w-1/2 md:justify-end md:order-last">
                    <div className="flex-none flex h-12 w-12 rounded-full bg-veridose-800 text-white items-center justify-center shadow-md">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div className="md:hidden text-xl font-semibold">Regulatory Approval</div>
                  </div>
                  
                  <div className="pt-2 pl-16 md:pl-0 md:w-1/2">
                    <h3 className="hidden md:block text-xl font-semibold mb-2">Regulatory Approval</h3>
                    <p className="text-muted-foreground">
                      Regulators review blockchain-verified data and AI analysis reports, then approve or reject trial results with confidence in the integrity of the entire process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Role-based Section */}
        <section className="py-16 bg-gradient-to-b from-background to-secondary/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-4">Role-Based Platform Access</h2>
            <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              VeriDose provides tailored tools and dashboards for each stakeholder in the clinical trial process
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border rounded-xl overflow-hidden bg-card transition-shadow hover:shadow-md">
                <div className="veridose-gradient p-4 text-white">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <FlaskConical className="h-5 w-5" />
                    Pharmaceutical Admin
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-veridose-600 flex-shrink-0 mt-0.5" />
                      <span>Create new drug trials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-veridose-600 flex-shrink-0 mt-0.5" />
                      <span>Manage dosage information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-veridose-600 flex-shrink-0 mt-0.5" />
                      <span>Assign trials to hospitals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-veridose-600 flex-shrink-0 mt-0.5" />
                      <span>Generate batch QR codes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-veridose-600 flex-shrink-0 mt-0.5" />
                      <span>View aggregated results</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="border rounded-xl overflow-hidden bg-card transition-shadow hover:shadow-md">
                <div className="bg-veridose-500 p-4 text-white">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <FileCheck className="h-5 w-5" />
                    Hospital Staff
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-veridose-600 flex-shrink-0 mt-0.5" />
                      <span>View assigned trials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-veridose-600 flex-shrink-0 mt-0.5" />
                      <span>Record patient data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-veridose-600 flex-shrink-0 mt-0.5" />
                      <span>Track completion progress</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-veridose-600 flex-shrink-0 mt-0.5" />
                      <span>Submit final reports</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-veridose-600 flex-shrink-0 mt-0.5" />
                      <span>Access AI analysis results</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="border rounded-xl overflow-hidden bg-card transition-shadow hover:shadow-md">
                <div className="bg-veridose-700 p-4 text-white">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Government Regulator
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-veridose-600 flex-shrink-0 mt-0.5" />
                      <span>Review submitted trial data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-veridose-600 flex-shrink-0 mt-0.5" />
                      <span>Analyze anomaly detection results</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-veridose-600 flex-shrink-0 mt-0.5" />
                      <span>Verify blockchain records</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-veridose-600 flex-shrink-0 mt-0.5" />
                      <span>Approve or reject submissions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-veridose-600 flex-shrink-0 mt-0.5" />
                      <span>Monitor compliance metrics</span>
                    </li>
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
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-veridose-600 hover:bg-veridose-700 text-white"
                  asChild
                >
                  <Link to="/auth">Sign Up Now</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-veridose-600 text-veridose-600 hover:bg-veridose-50"
                >
                  Request Demo
                </Button>
              </div>
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
    </div>
  );
};

export default Index;
