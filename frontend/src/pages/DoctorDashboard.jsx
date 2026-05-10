import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import api from "@/services/api";

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const res = await api.get('/doctors/me');
        setDoctorProfile(res.data);
      } catch (err) {
        if (err.response?.status !== 404) {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDoctorData();
    }
  }, [user]);

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;

  // We don't have the status readily available if they are pending because our GET /doctors only returns approved.
  // For the sake of this UI, if they are a doctor but not in the approved list, they are either pending or rejected.
  const isApproved = !!doctorProfile;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>
      
      {!isApproved ? (
        <Alert className="mb-6 bg-yellow-50 border-yellow-200">
          <Clock className="h-5 w-5 text-yellow-600" />
          <AlertTitle className="text-yellow-800">Application Pending</AlertTitle>
          <AlertDescription className="text-yellow-700">
            Your application is currently being reviewed by our administrators. You will be able to manage your appointments and profile once approved.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>Manage your public details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Name:</strong> {doctorProfile.name}</p>
              <p><strong>Specialty:</strong> {doctorProfile.specialty}</p>
              <Button variant="outline" className="mt-4">Edit Profile</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appointments</CardTitle>
              <CardDescription>View your upcoming schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">No upcoming appointments.</p>
              <Button>View All</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
