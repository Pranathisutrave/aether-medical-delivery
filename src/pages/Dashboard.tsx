
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Stethoscope, 
  Drone, 
  ShieldAlert, 
  Clock, 
  Package, 
  FileText,
  ArrowRight,
  Calendar,
  Heart,
  Bell
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h1>
          <p className="mt-2 text-gray-600">Manage your healthcare needs and drone delivery requests</p>
        </header>

        {/* Quick Actions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/ai-diagnosis" className="block h-full">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-medify-blue/10 flex items-center justify-center">
                    <Stethoscope className="text-medify-blue" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Diagnosis</h3>
                    <p className="text-sm text-gray-500">Check your symptoms</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/drone-delivery" className="block h-full">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-medify-green/10 flex items-center justify-center">
                    <Drone className="text-medify-green" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Request Delivery</h3>
                    <p className="text-sm text-gray-500">Order medicine by drone</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/emergency" className="block h-full">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-medify-red/10 flex items-center justify-center">
                    <ShieldAlert className="text-medify-red" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Emergency</h3>
                    <p className="text-sm text-gray-500">For urgent situations</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <Button variant="link" className="text-medify-blue p-0 h-auto">
              View All <ArrowRight size={16} className="ml-1" />
            </Button>
          </div>

          <div className="space-y-4">
            {/* Simulated activity entries */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Stethoscope className="text-medify-blue" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">AI Diagnosis Completed</h3>
                      <span className="text-xs text-gray-500">Today</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      You received a diagnosis for "Potential Upper Respiratory Infection"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Package className="text-medify-green" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Medicine Delivery</h3>
                      <span className="text-xs text-gray-500">Yesterday</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Your medicine delivery (Order #DR-123456) was completed successfully
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <FileText className="text-purple-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Account Created</h3>
                      <span className="text-xs text-gray-500">3 days ago</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      You created your Medify account
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Upcoming Deliveries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Clock size={18} className="mr-2 text-medify-blue" />
                Upcoming Deliveries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Order #DR-567890</span>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">In Transit</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Arriving in 22 minutes</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Order #DR-567891</span>
                  <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Scheduled</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Tomorrow, 10:00 AM</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full text-medify-blue">
                View All Deliveries
              </Button>
            </CardFooter>
          </Card>

          {/* Health Reminders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Bell size={18} className="mr-2 text-medify-blue" />
                Health Reminders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Calendar size={16} className="text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Medication Reminder</p>
                    <p className="text-xs text-gray-600 mt-1">Take Amoxicillin 500mg - 3 times daily</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Heart size={16} className="text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Follow-up Check</p>
                    <p className="text-xs text-gray-600 mt-1">Schedule a follow-up diagnostic in 7 days</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full text-medify-blue">
                Manage Reminders
              </Button>
            </CardFooter>
          </Card>

          {/* Health Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Heart size={18} className="mr-2 text-medify-blue" />
                Health Tips
              </CardTitle>
              <CardDescription>
                Personalized for your conditions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
                <p>Stay hydrated with at least 8 glasses of water daily for your respiratory health.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
                <p>Regular steam inhalation can help ease congestion symptoms.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
                <p>Ensure you complete your full course of antibiotics even if symptoms improve.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full text-medify-blue">
                View All Tips
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
