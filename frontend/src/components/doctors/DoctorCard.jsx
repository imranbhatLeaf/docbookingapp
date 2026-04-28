import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, BadgeCheck } from "lucide-react";

export default function DoctorCard({ doctor }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-1">
              <CardTitle className="text-xl">Dr. {doctor.name}</CardTitle>
              {doctor.verified && <BadgeCheck className="h-5 w-5 text-blue-600 fill-blue-50" />}
            </div>
            <p className="text-sm font-medium text-primary mt-1">{doctor.specialty}</p>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-bold text-yellow-700">{doctor.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center gap-1 text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          <span className="text-xs">{doctor.location}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {doctor.experience} years experience
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild className="w-full">
          <Link to={`/doctors/${doctor.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
