
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-medify-blue text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Medify</h3>
            <p className="text-sm text-gray-200">
              AI-powered medical diagnosis and drone delivery service for essential medicines in remote and hilly areas.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-gray-300" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-gray-300" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-gray-300" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-gray-300" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-gray-300">About Us</Link>
              </li>
              <li>
                <Link to="/ai-diagnosis" className="hover:text-gray-300">AI Diagnosis</Link>
              </li>
              <li>
                <Link to="/drone-delivery" className="hover:text-gray-300">Drone Delivery</Link>
              </li>
              <li>
                <Link to="/emergency" className="hover:text-gray-300">Emergency Services</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="hover:text-gray-300">FAQs</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-gray-300">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-gray-300">Terms of Service</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-300">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>123 Healthcare Road, Hillside Region</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="flex-shrink-0" />
                <span>contact@medify.health</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-medify-blue-dark/30 mt-8 pt-6 text-center text-sm text-gray-300">
          <p>&copy; {year} Medify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
