
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardMetrics from "@/components/Dashboard/DashboardMetrics";
import RecentActivity from "@/components/Dashboard/RecentActivity";
import AppShell from "@/components/Layout/AppShell";

const PharmaAdminDashboard = () => {
  // Mock user data for demonstration
  const user = {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@pharmaco.example",
    role: "pharma" as const,
  };

  return (
    <AppShell userRole={user.role} userName={user.name} userEmail={user.email}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, {user.name}. Here's an overview of your clinical trials.
          </p>
        </div>
        
        <DashboardMetrics userRole={user.role} />
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Trial Completion Progress</CardTitle>
              <CardDescription>
                Current status of ongoing trials
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-muted-foreground text-center">
                <p>Chart visualization will be displayed here</p>
                <p className="text-sm">(Implementation to be completed)</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Approval Rate</CardTitle>
              <CardDescription>
                Approval rate by drug category
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-muted-foreground text-center">
                <p>Chart visualization will be displayed here</p>
                <p className="text-sm">(Implementation to be completed)</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions across your trials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity userRole={user.role} />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};

export default PharmaAdminDashboard;
