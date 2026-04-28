import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DoctorFilters({ filters, setFilters }) {
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div>
        <Label>Search by name</Label>
        <Input
          placeholder="Search..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>
      <div>
        <Label>Specialty</Label>
        <Select value={filters.specialty} onValueChange={(val) => setFilters({ ...filters, specialty: val })}>
          <SelectTrigger>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Cardiologist">Cardiologist</SelectItem>
            <SelectItem value="Dermatologist">Dermatologist</SelectItem>
            <SelectItem value="Neurologist">Neurologist</SelectItem>
            <SelectItem value="Gynecologist">Gynecologist</SelectItem>
            <SelectItem value="Orthopedic">Orthopedic</SelectItem>
            <SelectItem value="Pediatrician">Pediatrician</SelectItem>
            <SelectItem value="Gastro">Gastro</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
