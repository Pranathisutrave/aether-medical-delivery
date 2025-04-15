
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Stethoscope, 
  Brain, 
  Clock, 
  MapPin, 
  Drone, 
  HeartPulse, 
  ShieldAlert,
  Phone
} from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 space-y-6 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold">
                AI-Powered Medical Diagnosis & Drone Delivery
              </h1>
              <p className="text-xl">
                Cutting-edge healthcare technology bringing life-saving medical services to remote and hilly regions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/ai-diagnosis">
                  <Button className="rounded-full text-medify-blue bg-white hover:bg-gray-100 px-6 py-5">
                    <Stethoscope size={20} className="mr-2" />
                    Try AI Diagnosis
                  </Button>
                </Link>
                <Link to="/drone-delivery">
                  <Button className="rounded-full bg-medify-red hover:bg-medify-red-dark px-6 py-5">
                    <Drone size={20} className="mr-2" />
                    Request Delivery
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-5/12 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="w-full aspect-square rounded-full bg-white/10 absolute animate-pulse-subtle"></div>
                <img 
                  src="https://cdn-images.lovable.ai/apps/c63e4f82-f294-4625-9821-fa35da256ad9/images/2mdFa.png" 
                  alt="Medical drone delivery illustration" 
                  className="relative z-10 w-full h-auto animate-float"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="relative h-16">
          <svg className="absolute bottom-0 w-full h-16" preserveAspectRatio="none" viewBox="0 0 1440 74" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 C120,20 240,40 480,40 C720,40 960,20 1200,20 C1320,20 1380,30 1440,40 L1440,74 L0,74 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Combining artificial intelligence and drone technology to revolutionize healthcare access in remote areas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Diagnosis */}
            <div className="feature-card group">
              <div className="h-14 w-14 rounded-full bg-medify-blue/10 flex items-center justify-center mb-6 group-hover:bg-medify-blue/20 transition-colors">
                <Brain className="text-medify-blue" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Diagnosis</h3>
              <p className="text-gray-600">
                Advanced AI technology that helps detect early signs of diseases through symptom analysis and medical history.
              </p>
              <Link to="/ai-diagnosis" className="mt-4 inline-block text-medify-blue hover:underline font-medium">
                Learn more
              </Link>
            </div>
            
            {/* Drone Delivery */}
            <div className="feature-card group">
              <div className="h-14 w-14 rounded-full bg-medify-green/10 flex items-center justify-center mb-6 group-hover:bg-medify-green/20 transition-colors">
                <Drone className="text-medify-green" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Drone Delivery</h3>
              <p className="text-gray-600">
                Rapid delivery of essential medicines to hard-to-reach areas, maintaining the cold chain when required.
              </p>
              <Link to="/drone-delivery" className="mt-4 inline-block text-medify-blue hover:underline font-medium">
                Learn more
              </Link>
            </div>
            
            {/* Emergency Services */}
            <div className="feature-card group">
              <div className="h-14 w-14 rounded-full bg-medify-red/10 flex items-center justify-center mb-6 group-hover:bg-medify-red/20 transition-colors">
                <ShieldAlert className="text-medify-red" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Emergency Services</h3>
              <p className="text-gray-600">
                Specialized emergency responses for disaster-prone areas, delivering critical supplies when needed most.
              </p>
              <Link to="/emergency" className="mt-4 inline-block text-medify-blue hover:underline font-medium">
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Medify</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our innovative approach bridges the gap in healthcare accessibility for remote and hilly regions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Clock size={36} className="mx-auto mb-4 text-medify-blue" />
              <h3 className="text-lg font-semibold mb-2">Quick Response</h3>
              <p className="text-gray-600">Average delivery time of just 30 minutes to remote locations</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <MapPin size={36} className="mx-auto mb-4 text-medify-blue" />
              <h3 className="text-lg font-semibold mb-2">Remote Access</h3>
              <p className="text-gray-600">Reaching areas with limited transportation infrastructure</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <HeartPulse size={36} className="mx-auto mb-4 text-medify-blue" />
              <h3 className="text-lg font-semibold mb-2">Cold Chain</h3>
              <p className="text-gray-600">Temperature-controlled delivery for sensitive medications</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Brain size={36} className="mx-auto mb-4 text-medify-blue" />
              <h3 className="text-lg font-semibold mb-2">AI Accuracy</h3>
              <p className="text-gray-600">Advanced algorithms for precise early disease detection</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-medify-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Emergency Medical Assistance?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our emergency service is available 24/7 for critical situations in remote and hard-to-reach areas.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/emergency">
              <Button className="rounded-full bg-medify-red hover:bg-medify-red-dark px-6 py-5">
                <ShieldAlert size={20} className="mr-2" />
                Request Emergency
              </Button>
            </Link>
            <Button className="rounded-full text-medify-blue bg-white hover:bg-gray-100 px-6 py-5">
              <Phone size={20} className="mr-2" />
              Call Helpline
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
