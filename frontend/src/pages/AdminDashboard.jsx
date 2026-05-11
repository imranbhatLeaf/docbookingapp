import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { 
  Users, 
  UserPlus, 
  Calendar, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  LayoutDashboard,
  Stethoscope
} from "lucide-react";
import api from "@/services/api";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    users: 0,
    doctors: 0,
    appointments: 0,
    pendingApplications: 0
  });
  const [applications, setApplications] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, appsRes, feedbackRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/applications'),
        api.get('/admin/feedback')
      ]);
      setStats(statsRes.data);
      setApplications(appsRes.data);
      setFeedback(feedbackRes.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleAppAction = async (id, status) => {
    try {
      await api.put(`/admin/applications/${id}`, { status });
      toast.success(`Application ${status}`);
      fetchData(); // Refresh all data to update stats too
    } catch (error) {
      toast.error(`Failed to ${status} application`);
    }
  };

  const handleDeleteFeedback = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      await api.delete(`/admin/feedback/${id}`);
      toast.success("Feedback deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete feedback");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  if (user?.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
        <p className="text-gray-600 mt-2">You do not have administrative privileges to view this page.</p>
        <Button className="mt-6" onClick={() => window.location.href = "/"}>Return Home</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Control Center</h1>
          <p className="text-muted-foreground mt-1">Manage your platform's users, doctors, and feedback.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchData} size="sm">
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-6 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === "overview" 
              ? "border-primary text-primary" 
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Overview
        </button>
        <button
          onClick={() => setActiveTab("doctors")}
          className={`px-6 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === "doctors" 
              ? "border-primary text-primary" 
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <UserPlus className="w-4 h-4" />
          Doctor Approvals
          {stats.pendingApplications > 0 && (
            <span className="ml-1 bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full text-[10px] font-bold">
              {stats.pendingApplications}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("feedback")}
          className={`px-6 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === "feedback" 
              ? "border-primary text-primary" 
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          User Feedback
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard 
              title="Total Users" 
              value={stats.users} 
              icon={<Users className="w-5 h-5 text-blue-600" />} 
              bgColor="bg-blue-50" 
            />
            <StatsCard 
              title="Approved Doctors" 
              value={stats.doctors} 
              icon={<Stethoscope className="w-5 h-5 text-green-600" />} 
              bgColor="bg-green-50" 
            />
            <StatsCard 
              title="Appointments" 
              value={stats.appointments} 
              icon={<Calendar className="w-5 h-5 text-purple-600" />} 
              bgColor="bg-purple-50" 
            />
            <StatsCard 
              title="Pending Apps" 
              value={stats.pendingApplications} 
              icon={<UserPlus className="w-5 h-5 text-orange-600" />} 
              bgColor="bg-orange-50" 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
                <CardDescription>Latest messages from users</CardDescription>
              </CardHeader>
              <CardContent>
                {feedback.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No feedback received yet.</p>
                ) : (
                  <div className="space-y-4">
                    {feedback.slice(0, 3).map((f) => (
                      <div key={f.id} className="p-4 border rounded-lg bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-sm">{f.name || 'Anonymous'}</p>
                            <p className="text-xs text-gray-500">{new Date(f.created_at).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-xs ${i < f.rating ? "text-yellow-500" : "text-gray-300"}`}>★</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 line-clamp-2 italic">"{f.message}"</p>
                      </div>
                    ))}
                    <Button variant="link" className="w-full text-primary" onClick={() => setActiveTab("feedback")}>
                      View all feedback
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pending Tasks</CardTitle>
                <CardDescription>Items requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-100 p-2 rounded-full">
                        <UserPlus className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="text-sm font-medium">Doctor Applications</span>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 bg-orange-200 text-orange-800 rounded-full">
                      {stats.pendingApplications} Pending
                    </span>
                  </li>
                  <li className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium">New Feedback</span>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 bg-blue-200 text-blue-800 rounded-full">
                      {feedback.length} Total
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Doctors Tab */}
      {activeTab === "doctors" && (
        <Card className="animate-in slide-in-from-bottom-4 duration-500">
          <CardHeader>
            <CardTitle>Doctor Applications</CardTitle>
            <CardDescription>Review credentials and approve healthcare providers</CardDescription>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold text-lg">All caught up!</h3>
                <p className="text-muted-foreground">No pending doctor applications at the moment.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor Info</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Credentials</TableHead>
                    <TableHead className="text-right">Decision</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">{app.doctorName || app.name}</span>
                          <span className="text-xs text-gray-500 italic">{app.doctorEmail}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {app.specialty}
                        </span>
                      </TableCell>
                      <TableCell>
                        {app.document_url === 'manual' ? (
                          <span className="text-yellow-600 text-xs font-semibold">Manual Verification Needed</span>
                        ) : (
                          <a 
                            href={app.document_url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-primary hover:underline text-xs flex items-center gap-1"
                          >
                            View Certificate
                          </a>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 bg-green-50 text-green-600 hover:bg-green-100 border-green-200"
                            onClick={() => handleAppAction(app.id, 'approved')}
                          >
                            <CheckCircle className="w-3.5 h-3.5 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="h-8 bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                            onClick={() => handleAppAction(app.id, 'rejected')}
                          >
                            <XCircle className="w-3.5 h-3.5 mr-1" />
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
      )}

      {/* Feedback Tab */}
      {activeTab === "feedback" && (
        <Card className="animate-in slide-in-from-bottom-4 duration-500">
          <CardHeader>
            <CardTitle>Platform Feedback</CardTitle>
            <CardDescription>Hear what your users are saying about the service</CardDescription>
          </CardHeader>
          <CardContent>
            {feedback.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="font-semibold text-lg">No Feedback Yet</h3>
                <p className="text-muted-foreground">User messages will appear here once submitted.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {feedback.map((f) => (
                  <div key={f.id} className="border rounded-xl p-5 hover:shadow-md transition-shadow bg-white relative group">
                    <button 
                      onClick={() => handleDeleteFeedback(f.id)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {(f.name || 'A')[0].toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900">{f.name || 'Anonymous User'}</h4>
                        <p className="text-xs text-gray-500">{f.email || 'No email provided'}</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < f.rating ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                      ))}
                    </div>
                    <blockquote className="text-sm text-gray-700 italic border-l-4 border-gray-100 pl-4 py-1">
                      "{f.message}"
                    </blockquote>
                    <div className="mt-4 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                      Submitted on {new Date(f.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function StatsCard({ title, value, icon, bgColor }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
          </div>
          <div className={`${bgColor} p-3 rounded-xl`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
