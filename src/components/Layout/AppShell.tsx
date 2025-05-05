
import { ReactNode, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useToast } from "@/components/ui/use-toast";

type AppShellProps = {
  children: ReactNode;
  userRole?: "pharma" | "hospital" | "regulator" | null;
  userName?: string | null;
  userEmail?: string | null;
};

const AppShell = ({ 
  children, 
  userRole = null,
  userName = null,
  userEmail = null
}: AppShellProps) => {
  const { toast } = useToast();

  useEffect(() => {
    if (userRole) {
      toast({
        title: `Welcome to VeriDose`,
        description: `You are signed in as ${userRole}`,
        duration: 3000,
      });
    }
  }, [userRole, toast]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {userRole && (
        <Sidebar userRole={userRole} />
      )}
      <div className="flex flex-col flex-1">
        <Header userRole={userRole} userName={userName} userEmail={userEmail} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
        <footer className="px-6 py-2 text-sm text-muted-foreground border-t">
          <div className="container flex items-center justify-between">
            <div>© 2025 VeriDose. All rights reserved.</div>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AppShell;
