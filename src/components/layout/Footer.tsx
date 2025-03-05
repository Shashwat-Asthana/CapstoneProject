
import { Link } from 'react-router-dom';
import { Heart, Github, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 bg-blood rounded-full scale-75 blood-drop" />
              </div>
              <span className="font-bold text-lg">BloodLife</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting blood donors with patients in need, we're building a community of life-savers.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-base mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/donor-register" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Become a Donor
                </Link>
              </li>
              <li>
                <Link to="/patient-register" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Request Blood
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-base mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Donor Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blood Types Info
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-base mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href="mailto:info@bloodlife.org" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  info@bloodlife.org
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href="tel:+1234567890" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Github className="h-4 w-4 text-muted-foreground" />
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BloodLife. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground">Made with</span>
            <Heart className="h-4 w-4 text-blood fill-blood" />
            <span className="text-sm text-muted-foreground">for humanity</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
