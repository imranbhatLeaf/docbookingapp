import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import api from "@/services/api";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await api.get('/admin/applications');
      setApplications(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchApplications();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleAction = async (id, status) => {
    try {
      await api.put(`/admin/applications/${id}`, { status });
      toast.success(`Application ${status}`);
      // Refresh list
      fetchApplications();
    } catch (error) {
      toast.error(`Failed to ${status} application`);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading admin panel...</div>;

  if (user?.role !== 'admin') {
    return <div className="p-8 text-center text-red-500">Access Denied. Admin privileges required.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Pending Doctor Applications</CardTitle>
          <CardDescription>Review and approve new doctors</CardDescription>
        </CardHeader>
        <CardContent>
          {applications.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No pending applications.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Document</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.doctorName || app.name}</TableCell>
                    <TableCell>{app.doctorEmail}</TableCell>
                    <TableCell>{app.specialty}</TableCell>
                    <TableCell>
                      {app.document_url === 'manual' ? (
                        <span className="text-yellow-600 font-medium">Manual Review Requested</span>
                      ) : (
                        <a href={app.document_url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                          View Document
                        </a>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="bg-green-50 text-green-600 hover:bg-green-100 border-green-200"
                          onClick={() => handleAction(app.id, 'approved')}
                        >
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                          onClick={() => handleAction(app.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
