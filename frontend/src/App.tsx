import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Pages
import Home from './pages/Home';
import DoctorsList from './pages/DoctorsList';
import DoctorProfile from './pages/DoctorProfile';
import BookingPage from './pages/BookingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorRegister from './pages/DoctorRegister';
import DoctorLogin from './pages/DoctorLogin';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import Footer from './components/common/Footer';
import Navbar from './components/common/Navbar';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from "@/components/ui/sonner";

import ProtectedRoute from './components/common/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/doctors/:id" element={<DoctorProfile />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/register" element={<DoctorRegister />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;