
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardMetrics from "@/components/Dashboard/DashboardMetrics";
import RecentActivity from "@/components/Dashboard/RecentActivity";
import AppShell from "@/components/Layout/AppShell";
import { Button } from "@/components/ui/button";
import { FileCheck, FlaskConical, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const HospitalDashboard = () => {
  // Mock user data for demonstration
  const user = {
    name: "Dr. Michael Chen",
    email: "michael.chen@hospital.example",
    role: "hospital" as const,
  };

  // Mock trial data
  const activeTrials = [
    {
      id: "trial-123",
      drugName: "Cardiomyozen-X",
      batchId: "CM-X-472B",
      assignedDate: "2025-05-02",
      targetSampleSize: 50,
      currentRecords: 12,
      status: "active",
    },
    {
      id: "trial-124",
      drugName: "Neuro-D",
      batchId: "ND-389A",
      assignedDate: "2025-04-15",
      targetSampleSize: 30,
      currentRecords: 28,
      status: "nearCompletion",
    },
    {
      id: "trial-125",
      drugName: "Immunogen-B",
      batchId: "IM-B-127C",
      assignedDate: "2025-03-10",
      targetSampleSize: 40,
      currentRecords: 40,
      status: "readyForSubmission",
    },
  ];

  const getStatusBadge = (status: string, current: number, target: number) => {
    const percentage = Math.round((current / target) * 100);
    
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-primary/20 text-primary">Active ({percentage}%)</Badge>;
      case "nearCompletion":
        return <Badge variant="outline" className="bg-warning/20 text-warning-foreground">Near Completion ({percentage}%)</Badge>;
      case "readyForSubmission":
        return <Badge variant="outline" className="bg-success/20 text-success">Ready for Submission (100%)</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <AppShell userRole={user.role} userName={user.name} userEmail={user.email}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Hospital Dashboard</h2>
            <p className="text-muted-foreground">
              Welcome back, {user.name}. Manage your clinical trial participation.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Patient Record
          </Button>
        </div>
        
        <DashboardMetrics userRole={user.role} />
        
        <Card>
          <CardHeader>
            <CardTitle>Active Clinical Trials</CardTitle>
            <CardDescription>
              Trials assigned to your hospital
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeTrials.length > 0 ? (
              <div className="space-y-4">
                {activeTrials.map((trial) => (
                  <div 
                    key={trial.id} 
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-start gap-3 mb-4 md:mb-0">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <FlaskConical className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{trial.drugName}</h3>
                        <div className="text-sm text-muted-foreground">Batch ID: {trial.batchId}</div>
                        <div className="text-sm text-muted-foreground">Assigned: {trial.assignedDate}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">
                          {trial.currentRecords}/{trial.targetSampleSize} records
                        </span>
                        {getStatusBadge(trial.status, trial.currentRecords, trial.targetSampleSize)}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Plus className="mr-1 h-3 w-3" /> Add Record
                        </Button>
                        {trial.status === "readyForSubmission" && (
                          <Button size="sm">
                            <FileCheck className="mr-1 h-3 w-3" /> Submit
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No active trials assigned to your hospital.
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest actions and updates
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

export default HospitalDashboard;
