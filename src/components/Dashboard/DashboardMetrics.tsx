
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type MetricProps = {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
};

export const Metric = ({ title, value, description, icon, trend }: MetricProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/20 p-1.5 text-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <CardDescription className="flex items-center text-xs">
          {description}
          {trend && (
            <span className={`ml-2 flex items-center text-xs ${trend.isPositive ? 'text-success' : 'text-destructive'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
          )}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

type DashboardMetricsProps = {
  userRole: "pharma" | "hospital" | "regulator";
};

const DashboardMetrics = ({ userRole }: DashboardMetricsProps) => {
  // Different metrics based on user role
  const metrics = {
    pharma: [
      {
        title: "Active Trials",
        value: "24",
        description: "Across all batches",
        icon: <span className="text-lg">🧪</span>,
        trend: { value: 12, isPositive: true },
      },
      {
        title: "Hospitals Enrolled",
        value: "187",
        description: "In current trials",
        icon: <span className="text-lg">🏥</span>,
      },
      {
        title: "Data Collection",
        value: "76%",
        description: "Completion rate",
        icon: <span className="text-lg">📊</span>,
        trend: { value: 5, isPositive: true },
      },
      {
        title: "Approved Results",
        value: "42",
        description: "By regulators",
        icon: <span className="text-lg">✅</span>,
      },
    ],
    hospital: [
      {
        title: "Assigned Trials",
        value: "3",
        description: "Active participation",
        icon: <span className="text-lg">🧪</span>,
      },
      {
        title: "Patient Records",
        value: "157",
        description: "Submitted records",
        icon: <span className="text-lg">👨‍⚕️</span>,
        trend: { value: 23, isPositive: true },
      },
      {
        title: "Completion Rate",
        value: "63%",
        description: "Across all trials",
        icon: <span className="text-lg">📈</span>,
        trend: { value: 8, isPositive: true },
      },
      {
        title: "Submission Status",
        value: "2",
        description: "Pending reviews",
        icon: <span className="text-lg">🔍</span>,
      },
    ],
    regulator: [
      {
        title: "Pending Approvals",
        value: "16",
        description: "Awaiting review",
        icon: <span className="text-lg">⏳</span>,
        trend: { value: 4, isPositive: false },
      },
      {
        title: "Approved Trials",
        value: "42",
        description: "This quarter",
        icon: <span className="text-lg">✅</span>,
        trend: { value: 15, isPositive: true },
      },
      {
        title: "Flagged Reports",
        value: "7",
        description: "For investigation",
        icon: <span className="text-lg">🚩</span>,
      },
      {
        title: "Blockchain Verified",
        value: "96%",
        description: "Data integrity",
        icon: <span className="text-lg">🔒</span>,
        trend: { value: 3, isPositive: true },
      },
    ],
  };

  const currentMetrics = metrics[userRole];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {currentMetrics.map((metric, index) => (
        <Metric key={index} {...metric} />
      ))}
    </div>
  );
};

export default DashboardMetrics;
