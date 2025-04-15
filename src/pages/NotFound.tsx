
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="h-24 w-24 rounded-full bg-amber-100 flex items-center justify-center">
            <AlertTriangle size={48} className="text-amber-500" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-medify-blue mb-4">Page Not Found</h2>
        
        <p className="text-gray-600 mb-8">
          We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
          <Link to="/">
            <Button className="btn-primary w-full sm:w-auto">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
