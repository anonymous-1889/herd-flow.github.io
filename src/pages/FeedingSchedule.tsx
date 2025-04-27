
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Plus, Calendar } from "lucide-react";

// Mock feeding schedule data
const mockMorningFeeding = [
  { id: 1, group: "Dairy Cows", time: "06:00", feed: "Alfalfa Hay", quantity: "100 kg", additives: "Minerals", notes: "Increase for high producers" },
  { id: 2, group: "Beef Cattle", time: "07:00", feed: "Mixed Grass Hay", quantity: "150 kg", additives: "None", notes: "" },
  { id: 3, group: "Calves", time: "07:30", feed: "Calf Starter", quantity: "25 kg", additives: "Probiotics", notes: "Check consumption" },
];

const mockNoonFeeding = [
  { id: 4, group: "Dairy Cows", time: "12:00", feed: "Mixed Grain", quantity: "80 kg", additives: "None", notes: "" },
  { id: 5, group: "Beef Cattle", time: "12:30", feed: "Silage", quantity: "200 kg", additives: "None", notes: "" },
];

const mockEveningFeeding = [
  { id: 6, group: "Dairy Cows", time: "17:00", feed: "Alfalfa Hay", quantity: "100 kg", additives: "Minerals", notes: "" },
  { id: 7, group: "Beef Cattle", time: "18:00", feed: "Mixed Grass Hay", quantity: "150 kg", additives: "None", notes: "" },
  { id: 8, group: "Calves", time: "18:30", feed: "Calf Starter", quantity: "25 kg", additives: "Vitamins", notes: "Ensure all calves get access" },
];

const formSchema = z.object({
  group: z.string().min(1, "Group is required"),
  time: z.string().min(1, "Time is required"),
  feed: z.string().min(1, "Feed type is required"),
  quantity: z.string().min(1, "Quantity is required"),
  additives: z.string().optional(),
  notes: z.string().optional(),
  period: z.string().min(1, "Feeding period is required"),
});

export default function FeedingSchedule() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      group: "",
      time: "",
      feed: "",
      quantity: "",
      additives: "",
      notes: "",
      period: "morning",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Add feeding schedule logic would go here
    console.log(data);
    
    toast({
      title: "Schedule updated",
      description: `Added new feeding for ${data.group} at ${data.time}`,
    });
    
    form.reset();
    setIsDialogOpen(false);
  };

  const renderScheduleTable = (scheduleData: any[]) => (
    <div className="table-container">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Group</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Feed Type</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Additives</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scheduleData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.group}</TableCell>
              <TableCell>{item.time}</TableCell>
              <TableCell>{item.feed}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.additives || "-"}</TableCell>
              <TableCell className="max-w-xs truncate">{item.notes || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="page-heading">Feeding Schedule</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-farm-green-500 hover:bg-farm-green-600">
              <Plus className="mr-2 h-4 w-4" /> Add Feeding Time
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add Feeding Schedule</DialogTitle>
              <DialogDescription>
                Create a new feeding time for your livestock
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="period"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feeding Period</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="morning">Morning</SelectItem>
                          <SelectItem value="noon">Noon</SelectItem>
                          <SelectItem value="evening">Evening</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="group"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Livestock Group</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select group" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Dairy Cows">Dairy Cows</SelectItem>
                            <SelectItem value="Beef Cattle">Beef Cattle</SelectItem>
                            <SelectItem value="Calves">Calves</SelectItem>
                            <SelectItem value="Bulls">Bulls</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="feed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Feed Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select feed" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Alfalfa Hay">Alfalfa Hay</SelectItem>
                            <SelectItem value="Mixed Grass Hay">Mixed Grass Hay</SelectItem>
                            <SelectItem value="Silage">Silage</SelectItem>
                            <SelectItem value="Mixed Grain">Mixed Grain</SelectItem>
                            <SelectItem value="Calf Starter">Calf Starter</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 100 kg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="additives"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additives (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Minerals, Vitamins" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Any special instructions" className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Save Schedule</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" /> Daily Feeding Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="morning">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="morning">Morning</TabsTrigger>
              <TabsTrigger value="noon">Noon</TabsTrigger>
              <TabsTrigger value="evening">Evening</TabsTrigger>
            </TabsList>
            <TabsContent value="morning">
              {renderScheduleTable(mockMorningFeeding)}
            </TabsContent>
            <TabsContent value="noon">
              {renderScheduleTable(mockNoonFeeding)}
            </TabsContent>
            <TabsContent value="evening">
              {renderScheduleTable(mockEveningFeeding)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
