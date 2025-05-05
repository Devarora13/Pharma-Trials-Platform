
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const { role } = useAuth();

  // Get role dashboard path
  const getRolePath = () => {
    if (role === "pharma") return "/pharma";
    if (role === "hospital") return "/hospital";
    if (role === "regulator") return "/regulator";
    return "/";
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle>VeriDose</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-6">
          <Link 
            to={getRolePath()} 
            className="px-2 py-1 hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          
          {role === "pharma" && (
            <>
              <Link 
                to="/pharma/drugs" 
                className="px-2 py-1 hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Drugs
              </Link>
              <Link 
                to="/pharma/trials" 
                className="px-2 py-1 hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Trials
              </Link>
              <Link 
                to="/pharma/hospitals" 
                className="px-2 py-1 hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Hospitals
              </Link>
              <Link 
                to="/pharma/reports" 
                className="px-2 py-1 hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Reports
              </Link>
            </>
          )}
          
          {role === "hospital" && (
            <>
              <Link 
                to="/hospital/trials" 
                className="px-2 py-1 hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Active Trials
              </Link>
              <Link 
                to="/hospital/patients" 
                className="px-2 py-1 hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Patient Records
              </Link>
              <Link 
                to="/hospital/submit" 
                className="px-2 py-1 hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Submit Report
              </Link>
              <Link 
                to="/hospital/qr" 
                className="px-2 py-1 hover:text-primary"
                onClick={() => setOpen(false)}
              >
                QR Codes
              </Link>
            </>
          )}
          
          {role === "regulator" && (
            <>
              <Link 
                to="/regulator/submissions" 
                className="px-2 py-1 hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Trial Submissions
              </Link>
              <Link 
                to="/regulator/verified" 
                className="px-2 py-1 hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Verified Results
              </Link>
              <Link 
                to="/regulator/blockchain" 
                className="px-2 py-1 hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Blockchain Records
              </Link>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
