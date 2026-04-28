import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/services/api";
import { toast } from "sonner";

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/appointments/my")
      .then(res => setAppointments(res.data))
      .catch(err => toast.error("Failed to load appointments"))
      .finally(() => setLoading(false));
  }, []);

  const cancelAppointment = async (id) => {
    try {
      await api.delete(`/appointments/${id}`);
      setAppointments(appointments.filter(a => a.id !== id));
      toast.success("Appointment cancelled");
    } catch (err) {
      toast.error("Cancel failed");
    }
  };

  if (loading) return <div className="container mx-auto px-4 py-8"><Skeleton className="h-64" /></div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Appointments</h1>
      {appointments.length === 0 ? (
        <p className="text-muted-foreground">No appointments yet. <a href="/doctors" className="text-primary">Book one now</a></p>
      ) : (
        <div className="grid gap-4">
          {appointments.map(app => (
            <Card key={app.id}>
              <CardHeader>
                <CardTitle>Dr. {app.doctorName}</CardTitle>
                <CardDescription>{app.specialty}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div>
                  <p>Date: {new Date(app.date).toLocaleDateString()}</p>
                  <p>Time: {app.time}</p>
                </div>
                <Button variant="destructive" onClick={() => cancelAppointment(app.id)}>Cancel</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
