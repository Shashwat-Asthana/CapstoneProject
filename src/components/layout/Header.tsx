
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAuthUser, isAuthenticated, logout } from '@/lib/auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const user = getAuthUser();
  
  const isActive = (path: string) => location.pathname === path;
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle logout
  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };
  
  // Format initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled 
          ? 'py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm'
          : 'py-4 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-blood rounded-full scale-75 blood-drop" />
            <div className="absolute inset-0 bg-blood rounded-full scale-75 opacity-30 animate-pulse" />
          </div>
          <span className="font-bold text-xl">BloodLife</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive('/') ? "text-primary" : "text-foreground/80"
            )}
          >
            Home
          </Link>
          {isAuthenticated() ? (
            <>
              <Link 
                to="/dashboard" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive('/dashboard') ? "text-primary" : "text-foreground/80"
                )}
              >
                Dashboard
              </Link>
              <div className="flex items-center space-x-4">
                <Avatar className="h-8 w-8 bg-muted">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {user?.name ? getInitials(user.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/donor-register" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive('/donor-register') ? "text-primary" : "text-foreground/80"
                )}
              >
                Become a Donor
              </Link>
              <Link 
                to="/patient-register" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive('/patient-register') ? "text-primary" : "text-foreground/80"
                )}
              >
                Need Blood
              </Link>
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild variant="default" size="sm">
                  <Link to="/donor-register">Register</Link>
                </Button>
              </div>
            </>
          )}
          <Button asChild variant="outline" size="sm">
            <Link to="/admin">Admin</Link>
          </Button>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[57px] z-50 bg-background/95 backdrop-blur-sm animate-fade-in md:hidden">
          <nav className="flex flex-col space-y-4 p-6">
            <Link 
              to="/" 
              className={cn(
                "text-lg font-medium py-2 transition-colors",
                isActive('/') ? "text-primary" : "text-foreground/80"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            {isAuthenticated() ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={cn(
                    "text-lg font-medium py-2 transition-colors",
                    isActive('/dashboard') ? "text-primary" : "text-foreground/80"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="border-t pt-4 flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8 bg-muted">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {user?.name ? getInitials(user.name) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user?.name}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-2" 
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/donor-register" 
                  className={cn(
                    "text-lg font-medium py-2 transition-colors",
                    isActive('/donor-register') ? "text-primary" : "text-foreground/80"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Become a Donor
                </Link>
                <Link 
                  to="/patient-register" 
                  className={cn(
                    "text-lg font-medium py-2 transition-colors",
                    isActive('/patient-register') ? "text-primary" : "text-foreground/80"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Need Blood
                </Link>
                <div className="border-t pt-4 flex flex-col space-y-2">
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="default" 
                    className="w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/donor-register">Register</Link>
                  </Button>
                </div>
              </>
            )}
            <div className="border-t pt-4">
              <Button 
                asChild 
                variant="secondary" 
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link to="/admin">Admin Panel</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
