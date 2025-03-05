
import { Link } from "react-router-dom";
import { Droplet } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t mt-12">
      <div className="container py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Droplet className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">BloodLife</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connecting blood donors with patients in need.
              Your donation can save a life.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/donor-register" className="hover:text-primary transition-colors">Become a Donor</Link>
              </li>
              <li>
                <Link to="/patient-register" className="hover:text-primary transition-colors">Request Blood</Link>
              </li>
              <li>
                <Link to="/admin-login" className="hover:text-primary transition-colors">Admin</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Blood Types</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary font-semibold px-2 py-1 rounded-md text-xs">A+</span>
                <span>A Positive</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary font-semibold px-2 py-1 rounded-md text-xs">A-</span>
                <span>A Negative</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary font-semibold px-2 py-1 rounded-md text-xs">B+</span>
                <span>B Positive</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary font-semibold px-2 py-1 rounded-md text-xs">B-</span>
                <span>B Negative</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary font-semibold px-2 py-1 rounded-md text-xs">AB+</span>
                <span>AB Positive</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary font-semibold px-2 py-1 rounded-md text-xs">AB-</span>
                <span>AB Negative</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary font-semibold px-2 py-1 rounded-md text-xs">O+</span>
                <span>O Positive</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary font-semibold px-2 py-1 rounded-md text-xs">O-</span>
                <span>O Negative</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>contact@bloodlife.org</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>123 Blood Avenue, City, Country</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BloodLife. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
