import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary">
          Kashdocs
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-4">
            <a href="/#categories" className="text-sm font-medium hover:text-primary transition-colors">Categories</a>
            <a href="/#about" className="text-sm font-medium hover:text-primary transition-colors">About</a>
            <a href="/#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/doctors">Doctors</Link>
            </Button>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Button variant="ghost" size="sm" asChild className="text-primary font-bold">
                    <Link to="/admin/dashboard">Admin Panel</Link>
                  </Button>
                )}
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-background border-b px-4 py-6 space-y-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            <a href="/#categories" className="text-lg font-semibold py-2 border-b" onClick={() => setIsOpen(false)}>Categories</a>
            <a href="/#about" className="text-lg font-semibold py-2 border-b" onClick={() => setIsOpen(false)}>About</a>
            <a href="/#contact" className="text-lg font-semibold py-2 border-b" onClick={() => setIsOpen(false)}>Contact</a>
            <Link to="/doctors" className="text-lg font-semibold py-2 border-b text-primary" onClick={() => setIsOpen(false)}>Find a Doctor</Link>
          </div>
          
          <div className="pt-4 space-y-3">
            {user ? (
              <>
                <Button variant="ghost" className="w-full justify-start text-lg" asChild>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                </Button>
                <Button variant="destructive" className="w-full justify-start text-lg" onClick={() => { logout(); setIsOpen(false); }}>
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Button variant="outline" className="w-full text-lg" asChild>
                  <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                </Button>
                <Button className="w-full text-lg" asChild>
                  <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
