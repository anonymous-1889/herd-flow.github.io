
import { useState } from "react";
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
import { Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data
const mockCattle = [
  { id: "CT001", name: "Bella", breed: "Holstein", type: "Dairy", age: "3 years", weight: "550 kg", status: "healthy" },
  { id: "CT002", name: "Max", breed: "Angus", type: "Beef", age: "2 years", weight: "620 kg", status: "healthy" },
  { id: "CT003", name: "Daisy", breed: "Jersey", type: "Dairy", age: "4 years", weight: "480 kg", status: "sick" },
  { id: "CT004", name: "Bull", breed: "Hereford", type: "Bull", age: "5 years", weight: "950 kg", status: "healthy" },
  { id: "CT005", name: "Lily", breed: "Simmental", type: "Dairy", age: "2 years", weight: "520 kg", status: "healthy" },
  { id: "CT006", name: "Rex", breed: "Charolais", type: "Beef", age: "3 years", weight: "680 kg", status: "pregnant" },
  { id: "CT007", name: "Spot", breed: "Holstein-Friesian", type: "Dairy", age: "1 year", weight: "320 kg", status: "healthy" },
  { id: "CT008", name: "Rusty", breed: "Limousin", type: "Beef", age: "4 years", weight: "720 kg", status: "injured" },
  { id: "CT009", name: "Rose", breed: "Brown Swiss", type: "Dairy", age: "3 years", weight: "590 kg", status: "healthy" },
  { id: "CT010", name: "Duke", breed: "Shorthorn", type: "Bull", age: "6 years", weight: "980 kg", status: "healthy" },
];

export default function Livestock() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCattle, setFilteredCattle] = useState(mockCattle);
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setFilteredCattle(mockCattle);
    } else {
      const filtered = mockCattle.filter(
        (cattle) =>
          cattle.id.toLowerCase().includes(query) ||
          cattle.name.toLowerCase().includes(query) ||
          cattle.breed.toLowerCase().includes(query) ||
          cattle.type.toLowerCase().includes(query)
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
          <div className="table-container">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
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
                      <TableCell>{cattle.id}</TableCell>
                      <TableCell>{cattle.name}</TableCell>
                      <TableCell>{cattle.breed}</TableCell>
                      <TableCell>{cattle.type}</TableCell>
                      <TableCell>{cattle.age}</TableCell>
                      <TableCell>{cattle.weight}</TableCell>
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
                            <DropdownMenuItem>
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
                      No livestock found matching your search
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
