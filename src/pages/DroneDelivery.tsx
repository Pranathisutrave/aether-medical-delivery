import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle, 
  MapPin, 
  Package, 
  Clock, 
  Thermometer, 
  Loader2, 
  Rocket,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface DeliveryRequest {
  id: string;
  address: string;
  coordinates: string;
  medicines: string;
  phoneNumber: string;
  coldChainRequired: boolean;
  status: "pending" | "confirmed" | "in-transit" | "delivered";
  estimatedTime: number; // in minutes
}

const DroneDelivery = () => {
  const { isAuthenticated } = useAuth();
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [medicines, setMedicines] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [coldChainRequired, setColdChainRequired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deliveryRequest, setDeliveryRequest] = useState<DeliveryRequest | null>(null);
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to request a drone delivery",
        variant: "destructive"
      });
      return;
    }
    
    if (!address || !medicines || !phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      const newRequest: DeliveryRequest = {
        id: `DR-${Date.now().toString().slice(-6)}`,
        address,
        coordinates: coordinates || "Automatic GPS tracking",
        medicines,
        phoneNumber,
        coldChainRequired,
        status: "confirmed",
        estimatedTime: Math.floor(Math.random() * 15) + 20, // Random time between 20-35 minutes
      };
      setDeliveryRequest(newRequest);
      setLoading(false);
      setStep(2);
      toast({
        title: "Success",
        description: "Drone delivery request confirmed!"
      });
    }, 2000);
  };

  const simulateDelivery = () => {
    if (!deliveryRequest) return;
    
    setDeliveryRequest({
      ...deliveryRequest,
      status: "in-transit",
    });
    
    toast({
      title: "Drone Update",
      description: `Drone is now in transit. Estimated arrival in ${deliveryRequest.estimatedTime} minutes`,
    });
    
    setTimeout(() => {
      setDeliveryRequest({
        ...deliveryRequest,
        status: "delivered",
      });
      toast({
        title: "Delivery Complete",
        description: "Medicine successfully delivered!"
      });
    }, 5000);
  };

  const resetForm = () => {
    setAddress("");
    setCoordinates("");
    setMedicines("");
    setPhoneNumber("");
    setColdChainRequired(false);
    setDeliveryRequest(null);
    setStep(1);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Drone Medicine Delivery</h1>
          <p className="mt-3 text-xl text-gray-600">
            Fast delivery of essential medicines to remote and hilly areas
          </p>
        </div>

        {!isAuthenticated && (
          <Card className="mb-8 border-orange-300 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Authentication Required</h3>
                  <p className="text-gray-700 mt-1">
                    Please login or create an account to request a drone delivery.
                  </p>
                  <div className="flex space-x-4 mt-4">
                    <Link to="/login">
                      <Button variant="outline" className="border-medify-blue text-medify-blue hover:bg-medify-blue hover:text-white">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button className="bg-medify-blue text-white hover:bg-medify-blue-dark">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 1: Delivery Request Form */}
        {step === 1 && (
          <form onSubmit={handleSubmit} className={isAuthenticated ? "" : "opacity-75 pointer-events-none"}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 text-medify-blue" />
                  Delivery Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Address*
                  </label>
                  <Textarea
                    id="address"
                    placeholder="Enter your complete delivery address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                  <p className="text-xs text-gray-500 mt-1">
                    Leave blank for automatic GPS tracking (may be less accurate in remote areas)
                  </p>
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
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="mr-2 text-medify-blue" />
                  Medicine Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="medicines" className="block text-sm font-medium text-gray-700 mb-1">
                    Required Medicines*
                  </label>
                  <Textarea
                    id="medicines"
                    placeholder="List the medicines you need, including dosage if possible"
                    value={medicines}
                    onChange={(e) => setMedicines(e.target.value)}
                    className="health-input min-h-[100px]"
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="coldChain"
                    checked={coldChainRequired}
                    onChange={(e) => setColdChainRequired(e.target.checked)}
                    className="rounded border-gray-300 text-medify-blue focus:border-medify-blue focus:ring focus:ring-medify-blue focus:ring-opacity-50"
                  />
                  <div>
                    <label htmlFor="coldChain" className="font-medium text-gray-700 cursor-pointer">
                      Cold Chain Required
                    </label>
                    <p className="text-xs text-gray-500">
                      For temperature-sensitive medications that need refrigeration
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                  <div className="flex">
                    <Thermometer className="text-medify-blue flex-shrink-0 mr-2" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">Temperature-Controlled Delivery</p>
                      <p className="mt-1">
                        Our drones are equipped with temperature-controlled compartments that can maintain the required temperature for sensitive medications.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="btn-primary w-full" 
                  disabled={loading || !isAuthenticated}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing Request...
                    </>
                  ) : (
                    "Request Drone Delivery"
                  )}
                </Button>
              </CardFooter>
            </Card>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 flex space-x-4">
              <div className="flex-shrink-0 mt-1">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-medium text-yellow-800">Delivery Time Information</h3>
                <p className="text-yellow-700 mt-1">
                  Our drone delivery service aims to fulfill orders within 30 minutes of confirmation. Actual delivery times may vary based on weather conditions, distance, and terrain accessibility.
                </p>
              </div>
            </div>
          </form>
        )}

        {/* Step 2: Delivery Status */}
        {step === 2 && deliveryRequest && (
          <div>
            <Card className="mb-8 border-medify-blue border">
              <CardHeader className="bg-medify-blue/5">
                <CardTitle className="flex items-center">
                  <Rocket className="mr-2 text-medify-blue" />
                  Delivery Status
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                  <div>
                    <h3 className="font-bold text-lg">Order #{deliveryRequest.id}</h3>
                    <p className="text-sm text-gray-600">
                      Requested on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    deliveryRequest.status === "delivered" 
                      ? "bg-green-100 text-green-800" 
                      : deliveryRequest.status === "in-transit" 
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {deliveryRequest.status === "delivered" 
                      ? "Delivered" 
                      : deliveryRequest.status === "in-transit" 
                      ? "In Transit" 
                      : "Confirmed"
                    }
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm text-gray-500">Delivery Address</h4>
                      <p className="font-medium">{deliveryRequest.address}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500">Contact Number</h4>
                      <p className="font-medium">{deliveryRequest.phoneNumber}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-gray-500">Medicines</h4>
                    <p className="font-medium">{deliveryRequest.medicines}</p>
                  </div>
                  
                  {deliveryRequest.coldChainRequired && (
                    <div className="flex items-center space-x-2">
                      <Thermometer className="text-medify-blue" size={18} />
                      <span className="text-sm font-medium">Cold Chain Enabled</span>
                    </div>
                  )}
                </div>
                
                {deliveryRequest.status === "confirmed" && (
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Clock className="text-blue-500" />
                      <div>
                        <p className="text-blue-800 font-medium">Estimated Delivery Time</p>
                        <p className="text-blue-700">Approximately {deliveryRequest.estimatedTime} minutes</p>
                      </div>
                    </div>
                    <Button 
                      onClick={simulateDelivery}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Track Delivery
                    </Button>
                  </div>
                )}
                
                {deliveryRequest.status === "in-transit" && (
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <Rocket size={32} className="text-medify-blue animate-pulse-subtle" />
                      <p className="text-blue-800 font-medium">Drone is en route to your location</p>
                      <p className="text-blue-700">Expected arrival in {deliveryRequest.estimatedTime} minutes</p>
                    </div>
                  </div>
                )}
                
                {deliveryRequest.status === "delivered" && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex flex-col items-center space-y-2 text-center">
                      <CheckCircle2 size={32} className="text-green-600" />
                      <p className="text-green-800 font-medium">Delivery Completed</p>
                      <p className="text-green-700">Your medicines have been successfully delivered</p>
                    </div>
                  </div>
                )}
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Phone size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium">Need Assistance?</p>
                      <p>Call our support team at <span className="font-medium">1-800-MEDIFY</span> for any delivery-related queries.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={resetForm}
                  className="w-full"
                  variant="outline"
                >
                  Request Another Delivery
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default DroneDelivery;
