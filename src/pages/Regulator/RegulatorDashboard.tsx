
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardMetrics from "@/components/Dashboard/DashboardMetrics";
import RecentActivity from "@/components/Dashboard/RecentActivity";
import AppShell from "@/components/Layout/AppShell";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Database, FileCheck, Flag, X } from "lucide-react";

const RegulatorDashboard = () => {
  // Mock user data for demonstration
  const user = {
    name: "Rebecca Torres",
    email: "rebecca.torres@fda.example",
    role: "regulator" as const,
  };

  // Mock submissions data
  const pendingSubmissions = [
    {
      id: "sub-123",
      drugName: "Cardiomyozen-X",
      hospitalName: "Memorial Healthcare",
      submittedDate: "2025-05-03",
      anomalyPercentage: 1.2,
      status: "pendingReview",
      txHash: "0x7f9e8d7c6b5a4e3d2c1b0a9f8e7d6c5b4a3f2e1d",
    },
    {
      id: "sub-124",
      drugName: "Neuro-D",
      hospitalName: "University Medical Center",
      submittedDate: "2025-05-01",
      anomalyPercentage: 7.5,
      status: "flaggedForReview",
      txHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    },
    {
      id: "sub-125",
      drugName: "Immunogen-B",
      hospitalName: "City General Hospital",
      submittedDate: "2025-04-29",
      anomalyPercentage: 2.8,
      status: "pendingReview",
      txHash: "0x0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
    },
  ];

  const getStatusBadge = (status: string, anomalyPercentage: number) => {
    let badgeClass = "";
    let label = "";
    
    if (status === "flaggedForReview" || anomalyPercentage > 5) {
      badgeClass = "bg-warning/20 text-warning-foreground";
      label = "Flagged";
    } else if (status === "pendingReview") {
      badgeClass = "bg-primary/20 text-primary";
      label = "Pending";
    } else {
      badgeClass = "bg-muted/20 text-muted-foreground";
      label = "Unknown";
    }
    
    return <Badge variant="outline" className={badgeClass}>{label}</Badge>;
  };

  const truncateTxHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  };

  return (
    <AppShell userRole={user.role} userName={user.name} userEmail={user.email}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Regulatory Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, {user.name}. Review and manage clinical trial submissions.
          </p>
        </div>
        
        <DashboardMetrics userRole={user.role} />
        
        <Card>
          <CardHeader>
            <CardTitle>Pending Submissions</CardTitle>
            <CardDescription>
              Submissions awaiting your review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Drug</TableHead>
                  <TableHead>Hospital</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Anomaly %</TableHead>
                  <TableHead>Blockchain Verification</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">{submission.drugName}</TableCell>
                    <TableCell>{submission.hospitalName}</TableCell>
                    <TableCell>{submission.submittedDate}</TableCell>
                    <TableCell className={submission.anomalyPercentage > 5 ? "text-warning" : ""}>
                      {submission.anomalyPercentage}%
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">{truncateTxHash(submission.txHash)}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(submission.status, submission.anomalyPercentage)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="outline" className="h-7 w-7">
                          <FileCheck className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" className="h-7 w-7 text-success">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" className="h-7 w-7 text-destructive">
                          <X className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" className="h-7 w-7 text-warning">
                          <Flag className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Anomaly Detection Trends</CardTitle>
              <CardDescription>
                Anomaly percentage by hospital
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
              <CardTitle>Blockchain Verification Status</CardTitle>
              <CardDescription>
                Verification rate by drug type
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
              Your latest reviews and actions
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

export default RegulatorDashboard;
