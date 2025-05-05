
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  FileCheck, 
  FlaskConical, 
  Hospital, 
  Shield,
  User
} from "lucide-react";

type Activity = {
  id: string;
  action: string;
  entity: string;
  date: string;
  status: "pending" | "completed" | "rejected" | "verified";
};

type RecentActivityProps = {
  userRole: "pharma" | "hospital" | "regulator";
};

const RecentActivity = ({ userRole }: RecentActivityProps) => {
  // Mock data for different user roles
  const activities = {
    pharma: [
      {
        id: "act-123",
        action: "Created new drug trial",
        entity: "Cardiomyozen-X",
        date: "2025-05-02",
        status: "pending",
      },
      {
        id: "act-124",
        action: "Assigned trial to hospital",
        entity: "Memorial Healthcare",
        date: "2025-05-01",
        status: "completed",
      },
      {
        id: "act-125",
        action: "Updated dosage guidelines",
        entity: "Neuro-D Trial",
        date: "2025-04-29",
        status: "completed",
      },
      {
        id: "act-126",
        action: "Received regulatory approval",
        entity: "Immunogen-B",
        date: "2025-04-25",
        status: "verified",
      },
      {
        id: "act-127",
        action: "Submitted final report",
        entity: "Pulmonary-X Trial",
        date: "2025-04-20",
        status: "rejected",
      },
    ],
    hospital: [
      {
        id: "act-456",
        action: "Added patient record",
        entity: "Trial #472-B",
        date: "2025-05-05",
        status: "completed",
      },
      {
        id: "act-457",
        action: "Received new trial assignment",
        entity: "Cardiomyozen-X",
        date: "2025-05-02",
        status: "pending",
      },
      {
        id: "act-458",
        action: "Submitted final report",
        entity: "Immunogen-B",
        date: "2025-04-30",
        status: "verified",
      },
      {
        id: "act-459",
        action: "Updated patient data",
        entity: "Trial #472-B",
        date: "2025-04-28",
        status: "completed",
      },
      {
        id: "act-460",
        action: "Flagged adverse reaction",
        entity: "Pulmonary-X Trial",
        date: "2025-04-25",
        status: "rejected",
      },
    ],
    regulator: [
      {
        id: "act-789",
        action: "Approved trial results",
        entity: "Immunogen-B",
        date: "2025-05-03",
        status: "verified",
      },
      {
        id: "act-790",
        action: "Requested additional data",
        entity: "Neuro-D Trial",
        date: "2025-05-01",
        status: "pending",
      },
      {
        id: "act-791",
        action: "Verified blockchain record",
        entity: "Cardiomyozen-X",
        date: "2025-04-29",
        status: "completed",
      },
      {
        id: "act-792",
        action: "Flagged anomaly detection",
        entity: "Pulmonary-X Trial",
        date: "2025-04-27",
        status: "rejected",
      },
      {
        id: "act-793",
        action: "Reviewed hospital submission",
        entity: "Memorial Healthcare",
        date: "2025-04-25",
        status: "completed",
      },
    ],
  };

  const getIcon = (action: string) => {
    if (action.includes("trial")) return <FlaskConical className="h-4 w-4" />;
    if (action.includes("hospital")) return <Hospital className="h-4 w-4" />;
    if (action.includes("patient")) return <User className="h-4 w-4" />;
    if (action.includes("report") || action.includes("data")) return <FileCheck className="h-4 w-4" />;
    if (action.includes("verified") || action.includes("approved")) return <Shield className="h-4 w-4" />;
    return <FileCheck className="h-4 w-4" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-warning/20 text-warning-foreground">Pending</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-primary/20 text-primary">Completed</Badge>;
      case "verified":
        return <Badge variant="outline" className="bg-success/20 text-success">Verified</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-destructive/20 text-destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const currentActivities = activities[userRole];

  return (
    <Table>
      <TableCaption>Recent activity in the VeriDose platform.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px]"></TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Entity</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="w-[100px]">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentActivities.map((activity) => (
          <TableRow key={activity.id}>
            <TableCell className="p-2">{getIcon(activity.action)}</TableCell>
            <TableCell>{activity.action}</TableCell>
            <TableCell>{activity.entity}</TableCell>
            <TableCell>{activity.date}</TableCell>
            <TableCell>{getStatusBadge(activity.status)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentActivity;
