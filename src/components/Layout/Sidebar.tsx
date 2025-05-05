
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Database,
  FileCheck,
  FlaskConical,
  Home,
  Hospital,
  LayoutDashboard,
  Pill,
  QrCode,
  Shield,
  Users,
} from "lucide-react";

type SidebarProps = {
  className?: string;
  userRole?: "pharma" | "hospital" | "regulator" | null;
};

const Sidebar = ({ className, userRole }: SidebarProps) => {
  const navigation = {
    pharma: [
      { name: "Dashboard", href: "/pharma", icon: LayoutDashboard },
      { name: "Drugs", href: "/pharma/drugs", icon: Pill },
      { name: "Trials", href: "/pharma/trials", icon: FlaskConical },
      { name: "Hospitals", href: "/pharma/hospitals", icon: Hospital },
      { name: "Reports", href: "/pharma/reports", icon: FileCheck },
    ],
    hospital: [
      { name: "Dashboard", href: "/hospital", icon: LayoutDashboard },
      { name: "Active Trials", href: "/hospital/trials", icon: FlaskConical },
      { name: "Patient Records", href: "/hospital/patients", icon: Users },
      { name: "Submit Report", href: "/hospital/submit", icon: FileCheck },
      { name: "QR Codes", href: "/hospital/qr", icon: QrCode },
    ],
    regulator: [
      { name: "Dashboard", href: "/regulator", icon: LayoutDashboard },
      { name: "Trial Submissions", href: "/regulator/submissions", icon: FileCheck },
      { name: "Verified Results", href: "/regulator/verified", icon: Shield },
      { name: "Blockchain Records", href: "/regulator/blockchain", icon: Database },
    ],
  };

  const links = userRole ? navigation[userRole] : [];

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-40 h-screen w-64 border-r bg-sidebar transition-transform md:translate-x-0 -translate-x-full md:relative",
        className
      )}
    >
      <div className="flex h-full flex-col overflow-y-auto">
        <div className="h-16 flex items-center veridose-gradient px-4 gap-2">
          <div className="bg-white p-1.5 rounded-md shadow-sm">
            <FlaskConical className="h-7 w-7 text-veridose-700" />
          </div>
          <span className="text-white text-xl font-bold">VeriDose</span>
        </div>
        <div className="flex flex-col gap-1 px-2 py-4">
          <Link to="/" className="mb-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
          <Separator className="my-2 bg-sidebar-border" />
          {links.map((link) => (
            <Link key={link.name} to={link.href}>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.name}
              </Button>
            </Link>
          ))}
        </div>
        <div className="mt-auto px-4 py-4">
          <div className="rounded-md border bg-sidebar-accent p-3">
            <h4 className="text-xs font-semibold text-sidebar-foreground">
              VeriDose Platform
            </h4>
            <p className="mt-1 text-xs text-sidebar-foreground/80">
              Blockchain-verified clinical trial management
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
