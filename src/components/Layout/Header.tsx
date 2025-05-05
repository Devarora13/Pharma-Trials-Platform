
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FlaskConical, LogOut, Settings, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { MobileMenu } from "@/components/Layout/MobileMenu";

type HeaderProps = {
  userRole?: "pharma" | "hospital" | "regulator" | null;
  userName?: string | null;
  userEmail?: string | null;
};

const Header = ({ userRole, userName, userEmail }: HeaderProps) => {
  const { profile, signOut } = useAuth();
  
  // Use context values if props are not provided
  const displayName = userName || profile?.fullName || profile?.email || "";
  const displayEmail = userEmail || profile?.email || "";
  const role = userRole || profile?.role || null;

  // Get role dashboard path
  const getRolePath = () => {
    if (role === "pharma") return "/pharma";
    if (role === "hospital") return "/hospital";
    if (role === "regulator") return "/regulator";
    return "/";
  };

  return (
    <header className="sticky top-0 z-10 border-b bg-card shadow-sm">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="block md:hidden">
          <MobileMenu />
        </div>
        <Link to="/" className="flex items-center gap-2 md:mr-6">
          <div className="bg-veridose-600 p-1.5 rounded-md">
            <FlaskConical className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold hidden md:block">VeriDose</span>
        </Link>
        
        {role && (
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to={getRolePath()} className="hover:text-foreground/80">
              Dashboard
            </Link>
            {role === "pharma" && (
              <>
                <Link to="/pharma/drugs" className="hover:text-foreground/80">
                  Drugs
                </Link>
                <Link to="/pharma/trials" className="hover:text-foreground/80">
                  Trials
                </Link>
              </>
            )}
            {role === "hospital" && (
              <>
                <Link to="/hospital/trials" className="hover:text-foreground/80">
                  Active Trials
                </Link>
                <Link to="/hospital/patients" className="hover:text-foreground/80">
                  Patients
                </Link>
              </>
            )}
            {role === "regulator" && (
              <>
                <Link to="/regulator/submissions" className="hover:text-foreground/80">
                  Submissions
                </Link>
                <Link to="/regulator/verified" className="hover:text-foreground/80">
                  Verified
                </Link>
              </>
            )}
          </div>
        )}
        
        <div className="ml-auto flex items-center gap-2">
          {role ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {displayEmail}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
