
import { 
  BloodType, 
  Donor, 
  DonationMatch, 
  Patient, 
  User, 
  UserRole,
  UrgencyLevel,
  RequestStatus
} from "./types";

// Mock data store
let users: User[] = [];
let donors: Donor[] = [];
let patients: Patient[] = [];
let donationMatches: DonationMatch[] = [];

// User Functions
export const addUser = (
  email: string,
  name: string,
  phone: string,
  city: string,
  role: UserRole
): User => {
  const id = `user-${Date.now()}`;
  const newUser: User = {
    id,
    email,
    name,
    phone,
    city,
    role,
    created_at: new Date().toISOString()
  };
  
  users.push(newUser);
  return newUser;
};

// Donor Functions
export const addDonor = (data: {
  name: string;
  email: string;
  phone: string;
  city: string;
  bloodType: BloodType;
  role: UserRole;
  password: string;
  lastDonation: null;
  isAvailable: boolean;
}): User => {
  // Create user first
  const user = addUser(data.email, data.name, data.phone, data.city, data.role);
  
  // Then create donor
  const newDonor: Donor = {
    id: user.id,
    blood_type: data.bloodType,
    is_available: data.isAvailable,
    last_donation: data.lastDonation
  };
  
  donors.push(newDonor);
  
  // Return user
  return user;
};

export const getDonorById = (id: string): Donor | undefined => {
  return donors.find(donor => donor.id === id);
};

export const getDonorWithUser = (id: string): (Donor & { user: User }) | null => {
  const donor = getDonorById(id);
  const user = getUserById(id);
  
  if (!donor || !user) return null;
  
  return {
    ...donor,
    user
  };
};

export const updateDonorAvailability = (donorId: string, available: boolean): boolean => {
  const donor = getDonorById(donorId);
  if (!donor) return false;
  
  donor.is_available = available;
  donor.last_donation = available ? donor.last_donation : new Date().toISOString();
  
  return true;
};

// Patient Functions
export const addPatient = (data: {
  name: string;
  email: string;
  phone: string;
  city: string;
  bloodType: BloodType;
  urgency: UrgencyLevel;
  role: UserRole;
  password: string;
  requestedDate: Date;
  requestStatus: RequestStatus;
}): User => {
  // Create user first
  const user = addUser(data.email, data.name, data.phone, data.city, data.role);
  
  // Then create patient
  const newPatient: Patient = {
    id: user.id,
    blood_type: data.bloodType,
    urgency: data.urgency,
    requested_date: data.requestedDate.toISOString(),
    request_status: data.requestStatus
  };
  
  patients.push(newPatient);
  
  // Return user
  return user;
};

export const getPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

export const getPatientWithUser = (id: string): (Patient & { user: User }) | null => {
  const patient = getPatientById(id);
  const user = getUserById(id);
  
  if (!patient || !user) return null;
  
  return {
    ...patient,
    user
  };
};

// Donation Match Functions
export const createMatch = (donor_id: string, patient_id: string): DonationMatch | null => {
  const donor = getDonorById(donor_id);
  const patient = getPatientById(patient_id);
  
  if (!donor || !patient) return null;
  
  // Update donor availability
  updateDonorAvailability(donor_id, false);
  
  // Update patient status
  updatePatientStatus(patient_id, 'matched');
  
  const newMatch: DonationMatch = {
    id: `match-${Date.now()}`,
    donor_id,
    patient_id,
    match_date: new Date().toISOString(),
    status: 'pending',
    donation_date: null,
    created_at: new Date().toISOString()
  };
  
  donationMatches.push(newMatch);
  return newMatch;
};

// Additional utility functions
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

export const getDonorByEmail = (email: string): User | null => {
  const user = getUserByEmail(email);
  if (!user) return null;
  return user;
};

export const getPatientByEmail = (email: string): User | null => {
  const user = getUserByEmail(email);
  if (!user) return null;
  return user;
};

export const updatePatientStatus = (patientId: string, status: RequestStatus): boolean => {
  const patient = getPatientById(patientId);
  if (!patient) return false;
  
  patient.request_status = status;
  return true;
};

export const getMatchById = (id: string): DonationMatch | undefined => {
  return donationMatches.find(match => match.id === id);
};

export const getAllMatches = (): DonationMatch[] => {
  return donationMatches;
};
