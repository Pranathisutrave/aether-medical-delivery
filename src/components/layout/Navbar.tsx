
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X, UserCircle } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-medify-blue">Medify</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-medify-blue transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-medify-blue transition-colors">
              About
            </Link>
            <Link to="/ai-diagnosis" className="text-gray-700 hover:text-medify-blue transition-colors">
              AI Diagnosis
            </Link>
            <Link to="/drone-delivery" className="text-gray-700 hover:text-medify-blue transition-colors">
              Drone Delivery
            </Link>
          </nav>

          {/* Auth buttons (desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <div className="flex items-center space-x-2 text-medify-blue">
                    <UserCircle size={20} />
                    <span>{user?.name}</span>
                  </div>
                </Link>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="border-medify-blue text-medify-blue hover:bg-medify-blue hover:text-white"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" className="border-medify-blue text-medify-blue hover:bg-medify-blue hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="btn-primary">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-medify-blue"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md py-4">
          <div className="container mx-auto px-4 space-y-4">
            <Link
              to="/"
              className="block text-gray-700 hover:text-medify-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 hover:text-medify-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/ai-diagnosis"
              className="block text-gray-700 hover:text-medify-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Diagnosis
            </Link>
            <Link
              to="/drone-delivery"
              className="block text-gray-700 hover:text-medify-blue transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Drone Delivery
            </Link>

            <div className="pt-4 border-t border-gray-200">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 text-medify-blue"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserCircle size={20} />
                    <span>{user?.name}</span>
                  </Link>
                  <Button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-medify-blue text-medify-blue hover:bg-medify-blue hover:text-white"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-medify-blue text-medify-blue hover:bg-medify-blue hover:text-white"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full btn-primary">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
