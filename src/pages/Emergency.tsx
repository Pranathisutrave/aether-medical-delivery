import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
  AlertCircle,
  MapPin,
  Phone,
  Loader2,
  Ambulance,
  AlertTriangle,
  ShieldAlert,
  Rocket,  // Add Rocket import
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Emergency = () => {
  const { isAuthenticated } = useAuth();
  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [emergencyRequested, setEmergencyRequested] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!location || !description || !phoneNumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    // Simulate API call for emergency request
    setTimeout(() => {
      setLoading(false);
      setEmergencyRequested(true);
      toast.success("Emergency request received. Help is on the way!", {
        duration: 6000,
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-medify-red">Emergency Services</h1>
          <p className="mt-3 text-xl text-gray-600">
            Immediate response for urgent medical situations in remote areas
          </p>
        </div>

        {/* Emergency Helpline Banner */}
        <div className="mb-8 bg-medify-red rounded-lg p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Phone size={32} className="mr-4" />
              <div>
                <h3 className="text-xl font-bold">Emergency Helpline</h3>
                <p className="text-white/90">Call our 24/7 emergency number</p>
              </div>
            </div>
            <div className="text-2xl font-bold tracking-wider">1-800-MEDIFY</div>
          </div>
        </div>

        {!emergencyRequested ? (
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              <Card className="border-red-200">
                <CardHeader className="bg-red-50">
                  <CardTitle className="flex items-center text-medify-red">
                    <AlertTriangle className="mr-2" />
                    Emergency Request Form
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Location/Address*
                      </label>
                      <Textarea
                        id="location"
                        placeholder="Enter your location or address in detail"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="health-input min-h-[100px]"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="coordinates" className="block text-sm font-medium text-gray-700 mb-1">
                        GPS Coordinates (if known)
                      </label>
                      <Input
                        id="coordinates"
                        placeholder="e.g. 28.7041° N, 77.1025° E"
                        value={coordinates}
                        onChange={(e) => setCoordinates(e.target.value)}
                        className="health-input"
                      />
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-500">
                          Leave blank for automatic GPS tracking
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs h-8"
                          onClick={() => {
                            toast.info("Attempting to get your location...");
                            // In a real app, this would use the Geolocation API
                            setTimeout(() => {
                              setCoordinates("28.5458° N, 77.1703° E");
                              toast.success("Location detected successfully!");
                            }, 1000);
                          }}
                        >
                          <MapPin size={14} className="mr-1" />
                          Detect Location
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Emergency Description*
                      </label>
                      <Textarea
                        id="description"
                        placeholder="Describe the emergency situation in detail"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="health-input min-h-[120px]"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Phone Number*
                      </label>
                      <Input
                        id="phoneNumber"
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="health-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-yellow-800">
                        <p className="font-medium">Important Notice</p>
                        <p className="mt-1">
                          This service is for genuine emergencies in remote and hard-to-reach areas.
                          For life-threatening emergencies, please also call the local emergency services if possible.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50">
                  <Button
                    type="submit"
                    className="w-full bg-medify-red hover:bg-medify-red-dark"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing Emergency Request...
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="mr-2 h-5 w-5" />
                        Submit Emergency Request
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-blue-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-center mb-2">Medical Emergency</h3>
                    <p className="text-sm text-center text-gray-600">
                      For serious medical conditions requiring immediate attention
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-center mb-2">Medication Crisis</h3>
                    <p className="text-sm text-center text-gray-600">
                      Critical medicine required urgently in remote locations
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-center mb-2">Disaster Response</h3>
                    <p className="text-sm text-center text-gray-600">
                      Emergency assistance in disaster-affected areas
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        ) : (
          <Card className="border-green-300 mb-8">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center text-green-700">
                <CheckCircle2 className="mr-2" />
                Emergency Request Confirmed
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="flex flex-col items-center text-center space-y-4 py-4">
                <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                  <Ambulance size={40} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Help is on the way!</h3>
                <p className="text-gray-600 max-w-md">
                  Your emergency request has been received. Our team will contact you shortly at <span className="font-semibold">{phoneNumber}</span>.
                </p>
              </div>

              <div className="space-y-4 border-t border-b border-gray-200 py-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Emergency ID</h4>
                  <p className="font-medium">EM-{Date.now().toString().slice(-6)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Location</h4>
                  <p className="font-medium">{location}</p>
                </div>
                {coordinates && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">GPS Coordinates</h4>
                    <p className="font-medium">{coordinates}</p>
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Description</h4>
                  <p className="font-medium">{description}</p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Phone className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium">Stay on the line</p>
                    <p className="mt-1">
                      Our emergency team will call you within the next 2 minutes. Please keep your phone accessible.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <Button 
                onClick={() => setEmergencyRequested(false)}
                variant="outline" 
                className="w-full sm:w-auto"
              >
                Submit Another Request
              </Button>
              <Link to="/dashboard" className="w-full sm:w-auto">
                <Button className="bg-medify-blue w-full">
                  Go to Dashboard
                </Button>
              </Link>
            </CardFooter>
          </Card>
        )}

        <div className="mt-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">What to Expect</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-medify-blue/10 flex items-center justify-center flex-shrink-0">
                <Phone className="text-medify-blue" size={20} />
              </div>
              <div>
                <h4 className="font-medium">Immediate Contact</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Our emergency team will contact you within minutes of receiving your request.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-medify-blue/10 flex items-center justify-center flex-shrink-0">
                <Rocket className="text-medify-blue" size={20} />
              </div>
              <div>
                <h4 className="font-medium">Drone Assessment</h4>
                <p className="text-sm text-gray-600 mt-1">
                  A drone may be dispatched for initial assessment and to deliver critical supplies.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-medify-blue/10 flex items-center justify-center flex-shrink-0">
                <Ambulance className="text-medify-blue" size={20} />
              </div>
              <div>
                <h4 className="font-medium">Medical Response</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Medical personnel will be dispatched based on the emergency assessment.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-medify-blue/10 flex items-center justify-center flex-shrink-0">
                <ShieldAlert className="text-medify-blue" size={20} />
              </div>
              <div>
                <h4 className="font-medium">Continuous Support</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Our team will remain in contact to provide guidance until help arrives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Import CheckCircle2 icon that was missing
import { CheckCircle2 } from "lucide-react";

export default Emergency;
