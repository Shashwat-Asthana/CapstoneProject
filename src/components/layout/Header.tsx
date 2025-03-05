
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Droplet } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Droplet className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">BloodLife</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/donor-register" className="text-sm font-medium transition-colors hover:text-primary">
            Donor Registration
          </Link>
          <Link to="/patient-register" className="text-sm font-medium transition-colors hover:text-primary">
            Request Blood
          </Link>
          <Link to="/admin-login" className="text-sm font-medium transition-colors hover:text-primary">
            Admin
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden md:flex">
            <Link to="/donor-register">Register as Donor</Link>
          </Button>
          <Button asChild size="sm" className="hidden md:flex">
            <Link to="/patient-register">Request Blood</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
          >
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
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
