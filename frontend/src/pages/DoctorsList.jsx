import { useEffect, useState } from "react";
import DoctorCard from "@/components/doctors/DoctorCard";
import DoctorFilters from "@/components/doctors/DoctorFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Stethoscope, Baby, Activity, Heart, Brain, Bone, Zap, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/services/api"; // import your axios instance

const categories = [
  { name: "all", label: "All", icon: UserRound },
  { name: "Gynecologist", label: "Gyni", icon: Stethoscope },
  { name: "Pediatrician", label: "Pedia", icon: Baby },
  { name: "Gastro", label: "Gastro", icon: Activity },
  { name: "Cardiologist", label: "Cardio", icon: Heart },
  { name: "Neurologist", label: "Neuro", icon: Brain },
  { name: "Orthopedic", label: "Ortho", icon: Bone },
  { name: "Dermatologist", label: "Derma", icon: Zap },
];

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", specialty: "all" });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await api.get("/doctors");
        // Transform backend fields to match DoctorCard props
        const transformed = response.data.map((doc) => ({
          id: doc.id,
          name: doc.name || "Unknown Doctor",
          specialty: doc.specialty || "General",
          experience: doc.experience || "N/A",
          location: doc.location || doc.clinic_address || "Not specified",
          rating: doc.rating || (4 + Math.random() * 0.9).toFixed(1),
          verified: doc.verified !== undefined ? doc.verified : true,
        }));
        setDoctors(transformed);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doc) => {
    const searchLower = (filters.search || "").toLowerCase();
    const matchesSearch = (doc.name || "").toLowerCase().includes(searchLower) ||
                          (doc.location || "").toLowerCase().includes(searchLower);
    const matchesSpecialty = filters.specialty === "all" || doc.specialty === filters.specialty;
    return matchesSearch && matchesSpecialty;
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          <div><Skeleton className="h-64" /></div>
          <div className="md:col-span-3 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-6">Find a Doctor</h1>

          {/* Horizontal Category Bar */}
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setFilters({ ...filters, specialty: cat.name })}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full border whitespace-nowrap transition-all duration-200",
                  filters.specialty === cat.name
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card hover:border-primary/50 text-muted-foreground"
                )}
              >
                <cat.icon
                  className={cn(
                    "h-4 w-4",
                    filters.specialty === cat.name ? "text-primary-foreground" : "text-primary"
                  )}
                />
                <span className="text-sm font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="hidden md:block">
            <DoctorFilters filters={filters} setFilters={setFilters} />
          </div>
          <div className="md:col-span-3">
            {filteredDoctors.length === 0 ? (
              <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed">
                <p className="text-muted-foreground">No doctors found matching your criteria.</p>
                <Button
                  variant="link"
                  onClick={() => setFilters({ search: "", specialty: "all" })}
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doc) => (
                  <DoctorCard key={doc.id} doctor={doc} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}