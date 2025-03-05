
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { createUser, createPatient, getUserByEmail } from "@/lib/api";
import { BloodType, UrgencyLevel } from "@/lib/types";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const bloodTypes: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const urgencyLevels: { value: UrgencyLevel; label: string }[] = [
  { value: 'low', label: 'Low - Within a few weeks' },
  { value: 'medium', label: 'Medium - Within a few days' },
  { value: 'high', label: 'High - Urgent (within 24 hours)' }
];

const PatientRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    bloodType: "" as BloodType,
    urgency: "medium" as UrgencyLevel
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBloodTypeChange = (value: BloodType) => {
    setFormData((prev) => ({ ...prev, bloodType: value }));
  };

  const handleUrgencyChange = (value: UrgencyLevel) => {
    setFormData((prev) => ({ ...prev, urgency: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if user with email already exists
      const existingUser = await getUserByEmail(formData.email);
      if (existingUser) {
        toast({
          title: "Registration Failed",
          description: "A user with this email already exists.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // Create user
      const user = await createUser(
        formData.email,
        formData.name,
        formData.phone,
        formData.city,
        'patient'
      );

      if (user) {
        // Create patient
        const patient = await createPatient(user.id, formData.bloodType, formData.urgency);
        
        if (patient) {
          toast({
            title: "Request Submitted",
            description: "Your blood request has been registered successfully. We'll find donors for you.",
          });
          navigate('/find-donors', { 
            state: { 
              bloodType: formData.bloodType, 
              city: formData.city,
              patientId: patient.id
            } 
          });
        } else {
          toast({
            title: "Registration Failed",
            description: "Failed to register your request. Please try again.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Registration Failed",
          description: "Failed to create user. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-md mx-auto">
        <Card className="border-2 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">Blood Request</CardTitle>
            <CardDescription>Register your need for blood donation</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Patient/Requestor Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter patient or requestor name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type Needed</Label>
                <Select
                  value={formData.bloodType}
                  onValueChange={(value) => handleBloodTypeChange(value as BloodType)}
                  required
                >
                  <SelectTrigger id="bloodType">
                    <SelectValue placeholder="Select blood type needed" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select
                  value={formData.urgency}
                  onValueChange={(value) => handleUrgencyChange(value as UrgencyLevel)}
                  required
                >
                  <SelectTrigger id="urgency">
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting Request..." : "Submit Blood Request"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default PatientRegister;
