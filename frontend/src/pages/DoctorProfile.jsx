import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DoctorProfile() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // mock API call
    setTimeout(() => {
      setDoctor({
        id: Number(id),
        name: "John Smith",
        specialty: "Cardiologist",
        experience: 12,
        bio: "Expert in heart diseases with over 12 years of experience.",
        education: "MD from Harvard Medical School",
        clinicAddress: "123 Health Street, Medical City"
      });
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) return <div className="container mx-auto px-4 py-8"><Skeleton className="h-96" /></div>;
  if (!doctor) return <div className="container mx-auto px-4 py-8">Doctor not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Dr. {doctor.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><span className="font-semibold">Specialty:</span> {doctor.specialty}</p>
              <p><span className="font-semibold">Experience:</span> {doctor.experience} years</p>
              <p><span className="font-semibold">Bio:</span> {doctor.bio}</p>
              <p><span className="font-semibold">Education:</span> {doctor.education}</p>
              <p><span className="font-semibold">Clinic:</span> {doctor.clinicAddress}</p>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Book Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to={`/booking/${doctor.id}`}>Book Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
