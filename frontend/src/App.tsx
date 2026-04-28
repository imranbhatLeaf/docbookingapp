import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Pages
import Home from './pages/Home';
import DoctorsList from './pages/DoctorsList';
import DoctorProfile from './pages/DoctorProfile';
import BookingPage from './pages/BookingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Footer from './components/common/Footer';
import Navbar from './components/common/Navbar';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from "@/components/ui/sonner";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/doctors/:id" element={<DoctorProfile />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;