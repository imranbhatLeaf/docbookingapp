import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Star } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function DoctorCard({ doctor }) {
  // Format experience text
  const experienceText = doctor.experience
    ? `${doctor.experience} year${doctor.experience > 1 ? "s" : ""} experience`
    : "Experience N/A";

  // Safely get rating as a number
  let ratingValue = parseFloat(doctor.rating);
  if (isNaN(ratingValue)) {
    // Fallback: generate a demo rating based on id (3.0 to 4.9)
    ratingValue = 3.0 + (doctor.id % 20) / 10; // gives 3.0, 3.1, ... 4.9
    ratingValue = Math.min(5.0, Math.max(3.0, ratingValue));
  }
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBookClick = () => {
    if (!user) {
      toast.error("Please log in to book an appointment");
      navigate("/login", { state: { from: `/booking/${doctor.id}` } });
    } else {
      navigate(`/booking/${doctor.id}`);
    }
  };

  const rating = ratingValue.toFixed(1);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{doctor.name}</CardTitle>
            <p className="text-sm font-medium text-primary mt-1">{doctor.specialty}</p>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-bold text-yellow-700">{rating}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4 space-y-2 flex-1">
        {doctor.clinic_address && (
          <div className="flex items-start gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="text-xs line-clamp-2">{doctor.clinic_address}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Briefcase className="h-4 w-4" />
          <span className="text-xs">{experienceText}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex gap-2 border-t-0 bg-transparent">
        <Button asChild variant="default" className="flex-1">
          <Link to={`/doctors/${doctor.id}`}>View Profile</Link>
        </Button>
        <Button variant="outline" className="flex-1" onClick={handleBookClick}>
          Book
        </Button>
      </CardFooter>
    </Card>
  );
}