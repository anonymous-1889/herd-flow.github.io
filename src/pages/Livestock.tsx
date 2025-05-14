
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, MoreHorizontal, Plus, Search, Trash2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

type Cattle = {
  id: string;
  tag_id: string;
  name: string | null;
  breed: string;
  cattle_type: string;
  birth_date: string;
  weight: number;
  gender: string;
  status: string;
};

export default function Livestock() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cattle, setCattle] = useState<Cattle[]>([]);
  const [filteredCattle, setFilteredCattle] = useState<Cattle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCattle = async () => {
      try {
        // Check if user is authenticated
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData.user) {
          navigate("/login");
          return;
        }

        const { data, error } = await supabase
          .from('cattle')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          setCattle(data);
          setFilteredCattle(data);
        }
      } catch (err: any) {
        console.error('Error fetching cattle:', err);
        setError(err.message || 'Failed to load livestock data');
        toast({
          title: "Error",
          description: "Failed to load livestock data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCattle();
  }, [navigate, toast]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setFilteredCattle(cattle);
    } else {
      const filtered = cattle.filter(
        (c) =>
          c.tag_id.toLowerCase().includes(query) ||
          (c.name && c.name.toLowerCase().includes(query)) ||
          c.breed.toLowerCase().includes(query) ||
          c.cattle_type.toLowerCase().includes(query)
      );
      setFilteredCattle(filtered);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-farm-green-400";
      case "sick":
        return "bg-destructive";
      case "pregnant":
        return "bg-farm-brown-300";
      case "injured":
        return "bg-amber-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleDeleteCattle = async (id: string) => {
    try {
      const { error } = await supabase
        .from('cattle')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      // Update the local state
      const updatedCattle = cattle.filter(c => c.id !== id);
      setCattle(updatedCattle);
      setFilteredCattle(updatedCattle);
      
      toast({
        title: "Cattle removed",
        description: "The animal has been removed from your records",
      });
    } catch (err: any) {
      console.error('Error deleting cattle:', err);
      toast({
        title: "Error",
        description: err.message || "Failed to delete the cattle record",
        variant: "destructive",
      });
    }
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const diffTime = Math.abs(today.getTime() - birth.getTime());
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    const remainingDays = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
    const remainingMonths = Math.floor(remainingDays / 30);
    
    if (diffYears > 0) {
      return `${diffYears} year${diffYears > 1 ? 's' : ''}${remainingMonths > 0 ? `, ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''}`;
    } else if (remainingMonths > 0) {
      return `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    } else {
      return `${remainingDays} day${remainingDays !== 1 ? 's' : ''}`;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="page-heading">Livestock Management</h1>
        <Button onClick={() => navigate("/cattle-entry")} className="bg-farm-green-500 hover:bg-farm-green-600">
          <Plus className="mr-2 h-4 w-4" /> Add New Livestock
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Livestock Inventory</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search livestock..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin mr-2 h-6 w-6 border-2 rounded-full border-t-farm-green-500"></div>
              <p>Loading livestock data...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-8 text-destructive">
              <AlertCircle className="mr-2 h-5 w-5" />
              <p>{error}</p>
            </div>
          ) : (
            <div className="table-container">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tag ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Breed</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCattle.length > 0 ? (
                    filteredCattle.map((cattle) => (
                      <TableRow key={cattle.id}>
                        <TableCell>{cattle.tag_id}</TableCell>
                        <TableCell>{cattle.name || '-'}</TableCell>
                        <TableCell>{cattle.breed}</TableCell>
                        <TableCell>{cattle.cattle_type}</TableCell>
                        <TableCell>{calculateAge(cattle.birth_date)}</TableCell>
                        <TableCell>{cattle.weight} kg</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(cattle.status)}>
                            {cattle.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteCattle(cattle.id)}>
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        {searchQuery.length > 0 
                          ? "No livestock found matching your search" 
                          : "No livestock records found. Add your first animal using the 'Add New Livestock' button."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
