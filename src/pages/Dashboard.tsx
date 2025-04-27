
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const mockCattleByType = [
  { name: 'Dairy', count: 42 },
  { name: 'Beef', count: 28 },
  { name: 'Calves', count: 15 },
  { name: 'Bulls', count: 5 },
];

const mockWeightData = [
  { month: 'Jan', avgWeight: 320 },
  { month: 'Feb', avgWeight: 330 },
  { month: 'Mar', avgWeight: 345 },
  { month: 'Apr', avgWeight: 360 },
  { month: 'May', avgWeight: 375 },
  { month: 'Jun', avgWeight: 390 },
];

const COLORS = ['#4fa326', '#8ed765', '#d2b48c', '#b38b50'];

export default function Dashboard() {
  const [userName, setUserName] = useState("Farmer");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Fetch user data and cattle summary
    const userDataStr = localStorage.getItem("herdflow-user");
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      if (userData.name) {
        setUserName(userData.name.split(" ")[0]);
      }
    }

    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Dashboard Updated",
        description: "Latest livestock data has been loaded",
      });
    }, 1000);
  }, [toast]);

  const stats = [
    { title: "Total Livestock", value: "90", change: "+5%" },
    { title: "Healthy", value: "85", change: "+2%" },
    { title: "Requiring Attention", value: "5", change: "-1%" },
    { title: "Feed Stock", value: "2.5 tons", change: "-10%" },
  ];

  return (
    <div>
      <h1 className="page-heading">Welcome back, {userName}!</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.change.startsWith('+') ? 'text-farm-green-500' : 'text-destructive'}`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Livestock Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockCattleByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {mockCattleByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Average Weight Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockWeightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avgWeight" fill="#4fa326" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
