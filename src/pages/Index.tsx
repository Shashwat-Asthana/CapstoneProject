
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet, User, UserRound, ShieldCheck } from "lucide-react";

const Index = () => {
  return (
    <AppLayout>
      <div className="container mx-auto">
        <section className="py-12 md:py-24 flex flex-col justify-center items-center text-center">
          <div className="mx-auto max-w-3xl space-y-4">
            <div className="blood-drop inline-block mb-4">
              <Droplet size={64} className="text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
              Blood-Test 33434343 <span className="text-primary">Life</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              Connect blood donors with patients in need. Your donation can save a life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/donor-register">Register as Donor</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8">
                <Link to="/patient-register">Request Blood</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-primary/10 transition-all hover:border-primary/20">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <User className="text-primary" size={24} />
                </div>
                <CardTitle>Register as a Donor</CardTitle>
                <CardDescription>Share your blood type and location to help patients in need.</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Complete a simple registration form with your details and blood type. Be ready to donate when someone in your area needs your blood type.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button asChild variant="ghost">
                  <Link to="/donor-register">Become a Donor</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-primary/10 transition-all hover:border-primary/20">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <UserRound className="text-primary" size={24} />
                </div>
                <CardTitle>Request Blood</CardTitle>
                <CardDescription>Find donors matching your blood type in your area.</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Submit a blood request specifying the blood type needed and location. We'll show you available donors in your area ready to help.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button asChild variant="ghost">
                  <Link to="/patient-register">Request Blood</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-primary/10 transition-all hover:border-primary/20">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <ShieldCheck className="text-primary" size={24} />
                </div>
                <CardTitle>Admin Access</CardTitle>
                <CardDescription>Manage donors, patients, and donations.</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Administrators can oversee all donors, patients, and donation matches. Monitor and manage the entire blood donation ecosystem.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button asChild variant="ghost">
                  <Link to="/admin-login">Admin Login</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Index;
