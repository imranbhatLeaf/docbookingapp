import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookingForm from "@/components/appointments/BookingForm";

export default function BookingPage() {
  const { id } = useParams(); // Using 'id' to match the route parameter in App.tsx

  return (
    <div className="container mx-auto max-w-md px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Book an Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <BookingForm doctorId={id} />
        </CardContent>
      </Card>
    </div>
  );
}
