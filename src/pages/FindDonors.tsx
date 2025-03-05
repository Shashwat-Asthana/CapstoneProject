
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getAvailableDonorsByBloodTypeAndCity, createMatch } from "@/lib/api";
import { Donor } from "@/lib/types";
import AppLayout from "@/components/layout/AppLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Phone, Mail, Calendar, MapPin, AlertCircle, CheckCircle2 } from "lucide-react";

interface LocationState {
  bloodType: string;
  city: string;
  patientId: string;
}

const FindDonors = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [showPhone, setShowPhone] = useState<Record<string, boolean>>({});
  const [showEmail, setShowEmail] = useState<Record<string, boolean>>({});
  const [matching, setMatching] = useState(false);

  const state = location.state as LocationState;

  useEffect(() => {
    if (!state?.bloodType || !state?.city || !state?.patientId) {
      toast({
        title: "Error",
        description: "Missing search parameters. Please try again.",
        variant: "destructive"
      });
      navigate('/patient-register');
      return;
    }

    const fetchDonors = async () => {
      setLoading(true);
      try {
        const availableDonors = await getAvailableDonorsByBloodTypeAndCity(
          state.bloodType as any,
          state.city
        );
        setDonors(availableDonors);
      } catch (error) {
        console.error("Error fetching donors:", error);
        toast({
          title: "Error",
          description: "Failed to fetch donors. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, [state, navigate, toast]);

  const handleShowPhone = (donorId: string) => {
    setShowPhone((prev) => ({ ...prev, [donorId]: true }));
  };

  const handleShowEmail = (donorId: string) => {
    setShowEmail((prev) => ({ ...prev, [donorId]: true }));
  };

  const handleRequestDonor = async () => {
    if (!selectedDonor || !state.patientId) return;
    
    setMatching(true);
    try {
      const match = await createMatch(selectedDonor.id, state.patientId);
      
      if (match) {
        toast({
          title: "Success!",
          description: "Donation request has been sent to the donor.",
        });
        navigate('/');
      } else {
        toast({
          title: "Request Failed",
          description: "Failed to send donation request. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error requesting donor:", error);
      toast({
        title: "Request Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setMatching(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">Available Blood Donors</h1>
          <p className="text-gray-600">
            {state?.bloodType && state?.city && (
              <>
                Showing donors with <span className="font-semibold">{state.bloodType}</span> blood type in{" "}
                <span className="font-semibold">{state.city}</span>
              </>
            )}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="blood-drop mx-auto h-16 w-16 text-primary animate-pulse">
              <AlertCircle size={64} />
            </div>
            <p className="mt-4 text-gray-600">Searching for donors...</p>
          </div>
        ) : donors.length === 0 ? (
          <Card className="border-2 border-primary/20 text-center py-8">
            <CardContent>
              <div className="mx-auto flex justify-center text-amber-500 mb-4">
                <AlertCircle size={48} />
              </div>
              <h2 className="text-2xl font-semibold mb-2">No Donors Found</h2>
              <p className="text-gray-600 mb-6">
                We couldn't find any available donors with {state?.bloodType} blood type in {state?.city}.
              </p>
              <div className="flex flex-col gap-4 justify-center sm:flex-row">
                <Button variant="outline" onClick={() => navigate('/')}>
                  Return Home
                </Button>
                <Button onClick={() => navigate('/patient-register')}>
                  Try Different Location
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              {donors.map((donor) => {
                const user = donor.users;
                return (
                  <Card key={donor.id} className="border-2 border-primary/10 overflow-hidden hover:border-primary/30 transition-all">
                    <CardHeader className="bg-muted/50">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{user?.name}</CardTitle>
                          <CardDescription>Donor since {new Date(user?.created_at || '').toLocaleDateString()}</CardDescription>
                        </div>
                        <div className="text-lg font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {donor.blood_type}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin size={16} />
                          <span>{user?.city}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone size={16} />
                          {showPhone[donor.id] ? (
                            <span>{user?.phone}</span>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleShowPhone(donor.id)}
                            >
                              Click to show
                            </Button>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail size={16} />
                          {showEmail[donor.id] ? (
                            <span>{user?.email}</span>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleShowEmail(donor.id)}
                            >
                              Click to show
                            </Button>
                          )}
                        </div>
                        {donor.last_donation && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar size={16} />
                            <span>Last donated: {new Date(donor.last_donation).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/30 flex justify-end p-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full" 
                            onClick={() => setSelectedDonor(donor)}
                          >
                            Request Donation
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Donation Request</DialogTitle>
                            <DialogDescription>
                              You are about to request a blood donation from {user?.name}. 
                              Once confirmed, we will contact the donor and update you on the status.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle2 className="text-green-500" size={20} />
                              <span>Blood Type: <strong>{donor.blood_type}</strong></span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle2 className="text-green-500" size={20} />
                              <span>Location: <strong>{user?.city}</strong></span>
                            </div>
                            <p className="text-yellow-600 text-sm mt-4">
                              Note: Once matched, this donor will be unavailable for 6 months following donation.
                            </p>
                          </div>
                          <DialogFooter>
                            <Button 
                              variant="outline" 
                              onClick={() => setSelectedDonor(null)}
                            >
                              Cancel
                            </Button>
                            <Button 
                              onClick={handleRequestDonor}
                              disabled={matching}
                            >
                              {matching ? "Processing..." : "Confirm Request"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default FindDonors;
