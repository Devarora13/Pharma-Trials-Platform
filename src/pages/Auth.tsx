
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/Auth/LoginForm";
import SignupForm from "@/components/Auth/SignupForm";
import { FlaskConical } from "lucide-react";

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);
  const { user, role, isLoading } = useAuth();

  const toggleMode = () => {
    setShowLogin(!showLogin);
  };

  // If authenticated, redirect to the appropriate dashboard
  if (!isLoading && user) {
    if (role === "pharma") return <Navigate to="/pharma" />;
    if (role === "hospital") return <Navigate to="/hospital" />;
    if (role === "regulator") return <Navigate to="/regulator" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <div className="bg-veridose-600 p-1.5 rounded-md shadow-sm">
            <FlaskConical className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-veridose-700">VeriDose</span>
        </div>
        
        {showLogin ? (
          <LoginForm onToggleMode={toggleMode} />
        ) : (
          <SignupForm onToggleMode={toggleMode} />
        )}
      </div>
    </div>
  );
};

export default Auth;
