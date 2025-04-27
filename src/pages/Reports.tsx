
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileChartLine, Download, Printer } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock data for reports
const weightGrowthData = [
  { month: "Jan", dairy: 10, beef: 25 },
  { month: "Feb", dairy: 15, beef: 30 },
  { month: "Mar", dairy: 20, beef: 45 },
  { month: "Apr", dairy: 25, beef: 60 },
  { month: "May", dairy: 22, beef: 65 },
  { month: "Jun", dairy: 30, beef: 70 },
  { month: "Jul", dairy: 35, beef: 75 },
  { month: "Aug", dairy: 40, beef: 80 },
  { month: "Sep", dairy: 45, beef: 85 },
  { month: "Oct", dairy: 50, beef: 90 },
  { month: "Nov", dairy: 55, beef: 95 },
  { month: "Dec", dairy: 60, beef: 100 },
];

const milkProductionData = [
  { month: "Jan", production: 1200, target: 1300 },
  { month: "Feb", production: 1100, target: 1300 },
  { month: "Mar", production: 1300, target: 1300 },
  { month: "Apr", production: 1500, target: 1300 },
  { month: "May", production: 1400, target: 1300 },
  { month: "Jun", production: 1600, target: 1300 },
  { month: "Jul", production: 1700, target: 1300 },
  { month: "Aug", production: 1800, target: 1300 },
  { month: "Sep", production: 1600, target: 1300 },
  { month: "Oct", production: 1500, target: 1300 },
  { month: "Nov", production: 1400, target: 1300 },
  { month: "Dec", production: 1300, target: 1300 },
];

const feedConsumptionData = [
  { name: "Hay", value: 35 },
  { name: "Grain", value: 25 },
  { name: "Silage", value: 30 },
  { name: "Other", value: 10 },
];

const healthStatusData = [
  { name: "Healthy", value: 85 },
  { name: "Sick", value: 5 },
  { name: "Under Treatment", value: 7 },
  { name: "Recovering", value: 3 },
];

const COLORS = ['#4fa326', '#8ed765', '#d2b48c', '#b38b50'];

export default function Reports() {
  const [timeframe, setTimeframe] = useState("year");

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="page-heading">Reports & Analytics</h1>
        <div className="flex items-center gap-4">
          <Select defaultValue={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="growth">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="growth">Growth</TabsTrigger>
          <TabsTrigger value="milk">Milk Production</TabsTrigger>
          <TabsTrigger value="feed">Feed Consumption</TabsTrigger>
          <TabsTrigger value="health">Health Status</TabsTrigger>
        </TabsList>
        
        <TabsContent value="growth">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileChartLine className="mr-2 h-5 w-5" /> Weight Growth Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weightGrowthData}>
                    <defs>
                      <linearGradient id="colorDairy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4fa326" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#4fa326" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorBeef" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#b38b50" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#b38b50" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="dairy" stroke="#4fa326" fillOpacity={1} fill="url(#colorDairy)" name="Dairy Cattle (%)"/>
                    <Area type="monotone" dataKey="beef" stroke="#b38b50" fillOpacity={1} fill="url(#colorBeef)" name="Beef Cattle (%)"/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="milk">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileChartLine className="mr-2 h-5 w-5" /> Milk Production
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={milkProductionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="production" stroke="#4fa326" activeDot={{ r: 8 }} name="Actual Production (L)" />
                    <Line type="monotone" dataKey="target" stroke="#8884d8" strokeDasharray="5 5" name="Target Production (L)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feed">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileChartLine className="mr-2 h-5 w-5" /> Feed Consumption
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={feedConsumptionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {feedConsumptionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="health">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileChartLine className="mr-2 h-5 w-5" /> Herd Health Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={healthStatusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="Percentage">
                      {healthStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
