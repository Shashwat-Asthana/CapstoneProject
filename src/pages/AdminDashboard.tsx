
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getAllDonors, getAllPatients, getAllMatches } from "@/lib/api";
import { Donor, Patient, DonationMatch } from "@/lib/types";
import AppLayout from "@/components/layout/AppLayout";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  LogOut, 
  Users, 
  UserRound, 
  Droplet, 
  Calendar,
  AlertTriangle 
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [donors, setDonors] = useState<Donor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [matches, setMatches] = useState<DonationMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You must be an admin to view this page.",
        variant: "destructive"
      });
      navigate('/admin-login');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [donorsData, patientsData, matchesData] = await Promise.all([
          getAllDonors(),
          getAllPatients(),
          getAllMatches()
        ]);
        
        setDonors(donorsData);
        setPatients(patientsData);
        setMatches(matchesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    toast({
      title: "Logged Out",
      description: "You have been logged out of the admin dashboard.",
    });
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
      case 'matched':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Matched</Badge>;
      case 'fulfilled':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Fulfilled</Badge>;
      case 'contacted':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">Contacted</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Completed</Badge>;
      case 'canceled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Canceled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'low':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Low</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Medium</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">High</Badge>;
      default:
        return <Badge variant="outline">{urgency}</Badge>;
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
          <Button variant="destructive" size="sm" onClick={handleLogout}>
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Users size={18} className="mr-2 text-primary" />
                Total Donors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{donors.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <UserRound size={18} className="mr-2 text-primary" />
                Total Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{patients.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Droplet size={18} className="mr-2 text-primary" />
                Total Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{matches.length}</div>
            </CardContent>
          </Card>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="blood-drop mx-auto h-16 w-16 text-primary animate-pulse">
              <AlertTriangle size={64} />
            </div>
            <p className="mt-4 text-gray-600">Loading data...</p>
          </div>
        ) : (
          <Tabs defaultValue="matches">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="matches">Donation Matches</TabsTrigger>
              <TabsTrigger value="donors">Donors</TabsTrigger>
              <TabsTrigger value="patients">Patients</TabsTrigger>
            </TabsList>
            
            <TabsContent value="matches">
              <Card>
                <CardHeader>
                  <CardTitle>Donation Matches</CardTitle>
                  <CardDescription>
                    Complete list of all blood donation matches in the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Match Date</TableHead>
                          <TableHead>Donor Name</TableHead>
                          <TableHead>Blood Type</TableHead>
                          <TableHead>Patient Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Donation Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {matches.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                              No donation matches found
                            </TableCell>
                          </TableRow>
                        ) : (
                          matches.map((match) => (
                            <TableRow key={match.id}>
                              <TableCell>
                                {new Date(match.match_date).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                {match.donor_user?.users?.name}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="font-semibold">
                                  {match.donor?.blood_type}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {match.patient_user?.users?.name}
                              </TableCell>
                              <TableCell>
                                {getStatusBadge(match.status)}
                              </TableCell>
                              <TableCell>
                                {match.donation_date ? new Date(match.donation_date).toLocaleDateString() : 'N/A'}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="donors">
              <Card>
                <CardHeader>
                  <CardTitle>Registered Donors</CardTitle>
                  <CardDescription>
                    Complete list of all registered blood donors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>City</TableHead>
                          <TableHead>Blood Type</TableHead>
                          <TableHead>Last Donation</TableHead>
                          <TableHead>Available</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {donors.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                              No donors found
                            </TableCell>
                          </TableRow>
                        ) : (
                          donors.map((donor) => (
                            <TableRow key={donor.id}>
                              <TableCell>{donor.users.name}</TableCell>
                              <TableCell>{donor.users.email}</TableCell>
                              <TableCell>{donor.users.phone}</TableCell>
                              <TableCell>{donor.users.city}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="font-semibold">
                                  {donor.blood_type}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {donor.last_donation ? new Date(donor.last_donation).toLocaleDateString() : 'Never'}
                              </TableCell>
                              <TableCell>
                                {donor.is_available ? (
                                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                                    Available
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                                    Unavailable
                                  </Badge>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="patients">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Requests</CardTitle>
                  <CardDescription>
                    Complete list of all patient blood requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>City</TableHead>
                          <TableHead>Blood Type</TableHead>
                          <TableHead>Requested Date</TableHead>
                          <TableHead>Urgency</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patients.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                              No patient requests found
                            </TableCell>
                          </TableRow>
                        ) : (
                          patients.map((patient) => (
                            <TableRow key={patient.id}>
                              <TableCell>{patient.users.name}</TableCell>
                              <TableCell>{patient.users.email}</TableCell>
                              <TableCell>{patient.users.phone}</TableCell>
                              <TableCell>{patient.users.city}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="font-semibold">
                                  {patient.blood_type}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {patient.requested_date ? new Date(patient.requested_date).toLocaleDateString() : 'N/A'}
                              </TableCell>
                              <TableCell>
                                {getUrgencyBadge(patient.urgency)}
                              </TableCell>
                              <TableCell>
                                {getStatusBadge(patient.request_status)}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;
