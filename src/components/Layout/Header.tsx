
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Bell, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type HeaderProps = {
  userRole?: "pharma" | "hospital" | "regulator" | null;
  userName?: string | null;
  userEmail?: string | null;
};

const Header = ({ userRole, userName, userEmail }: HeaderProps) => {
  const [notifications] = useState(2);
  
  // This would typically connect to Supabase auth in a real implementation
  const handleSignOut = () => {
    console.log("Sign out clicked");
    window.location.href = "/";
  };

  const getRoleColor = (role?: string | null) => {
    switch (role) {
      case "pharma":
        return "bg-veridose-600 text-white";
      case "hospital":
        return "bg-veridose-500 text-white";
      case "regulator":
        return "bg-veridose-700 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getRoleBadgeText = (role?: string | null) => {
    switch (role) {
      case "pharma":
        return "Pharmaceutical Admin";
      case "hospital":
        return "Hospital Staff";
      case "regulator":
        return "Government Regulator";
      default:
        return "Guest";
    }
  };

  return (
    <header className="border-b bg-card">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4 lg:gap-6">
          <h2 className="text-xl font-bold tracking-tight md:block">
            {userRole ? (
              <>
                {userRole === "pharma" && "Pharmaceutical Dashboard"}
                {userRole === "hospital" && "Hospital Dashboard"}
                {userRole === "regulator" && "Regulatory Dashboard"}
              </>
            ) : (
              "VeriDose"
            )}
          </h2>
        </div>
        
        <div className="flex items-center gap-4">
          {userRole && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications > 0 && (
                      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive"></span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications > 0 ? (
                    <>
                      <div className="p-4">
                        <div className="mb-4 rounded border p-3">
                          <p className="text-sm font-medium">New trial assignment received</p>
                          <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                        </div>
                        <div className="rounded border p-3">
                          <p className="text-sm font-medium">Trial results ready for review</p>
                          <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer justify-center">
                        View all notifications
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <div className="py-6 text-center">
                      <p className="text-sm text-muted-foreground">No new notifications</p>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline-block">
                      {userName || userEmail || "User"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      {userName && <span>{userName}</span>}
                      {userEmail && (
                        <span className="text-xs text-muted-foreground">{userEmail}</span>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="px-2 py-1.5">
                    <Badge className={`${getRoleColor(userRole)} w-full justify-center py-1`}>
                      {getRoleBadgeText(userRole)}
                    </Badge>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
