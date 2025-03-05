
import { BloodType, Donor, DonationMatch, Patient, User } from './types';

// Mock database implementation using localStorage
// In a real application, this would be replaced with actual database calls

const STORAGE_KEYS = {
  DONORS: 'bloodlife_donors',
  PATIENTS: 'bloodlife_patients',
  MATCHES: 'bloodlife_matches',
};

// Seed initial data if it doesn't exist
const initializeDatabase = () => {
  if (!localStorage.getItem(STORAGE_KEYS.DONORS)) {
    localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.PATIENTS)) {
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.MATCHES)) {
    localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify([]));
  }
};

// Initialize on import
initializeDatabase();

// Helper function to generate IDs
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Donor functions
export const getDonors = (): Donor[] => {
  const donors = localStorage.getItem(STORAGE_KEYS.DONORS);
  return donors ? JSON.parse(donors) : [];
};

export const getDonorById = (id: string): Donor | undefined => {
  const donors = getDonors();
  return donors.find((donor) => donor.id === id);
};

export const getAvailableDonorsByBloodTypeAndCity = (
  bloodType: BloodType,
  city: string
): Donor[] => {
  const donors = getDonors();
  return donors.filter(
    (donor) => 
      donor.bloodType === bloodType && 
      donor.city.toLowerCase() === city.toLowerCase() && 
      donor.isAvailable
  );
};

export const addDonor = (donor: Omit<Donor, 'id' | 'createdAt'>): Donor => {
  const newDonor: Donor = {
    ...donor,
    id: generateId(),
    createdAt: new Date(),
  };
  
  const donors = getDonors();
  donors.push(newDonor);
  localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(donors));
  
  return newDonor;
};

export const updateDonor = (donor: Donor): Donor => {
  const donors = getDonors();
  const index = donors.findIndex((d) => d.id === donor.id);
  
  if (index !== -1) {
    donors[index] = donor;
    localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(donors));
  }
  
  return donor;
};

export const updateDonorAvailability = (donorId: string, isAvailable: boolean): Donor | undefined => {
  const donors = getDonors();
  const index = donors.findIndex((d) => d.id === donorId);
  
  if (index !== -1) {
    donors[index].isAvailable = isAvailable;
    donors[index].lastDonation = isAvailable ? donors[index].lastDonation : new Date();
    localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(donors));
    return donors[index];
  }
  
  return undefined;
};

// Patient functions
export const getPatients = (): Patient[] => {
  const patients = localStorage.getItem(STORAGE_KEYS.PATIENTS);
  return patients ? JSON.parse(patients) : [];
};

export const getPatientById = (id: string): Patient | undefined => {
  const patients = getPatients();
  return patients.find((patient) => patient.id === id);
};

export const addPatient = (patient: Omit<Patient, 'id' | 'createdAt'>): Patient => {
  const newPatient: Patient = {
    ...patient,
    id: generateId(),
    createdAt: new Date(),
  };
  
  const patients = getPatients();
  patients.push(newPatient);
  localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
  
  return newPatient;
};

export const updatePatient = (patient: Patient): Patient => {
  const patients = getPatients();
  const index = patients.findIndex((p) => p.id === patient.id);
  
  if (index !== -1) {
    patients[index] = patient;
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
  }
  
  return patient;
};

// Donation Match functions
export const getMatches = (): DonationMatch[] => {
  const matches = localStorage.getItem(STORAGE_KEYS.MATCHES);
  return matches ? JSON.parse(matches) : [];
};

export const getMatchById = (id: string): DonationMatch | undefined => {
  const matches = getMatches();
  return matches.find((match) => match.id === id);
};

export const getMatchesByDonorId = (donorId: string): DonationMatch[] => {
  const matches = getMatches();
  return matches.filter((match) => match.donorId === donorId);
};

export const getMatchesByPatientId = (patientId: string): DonationMatch[] => {
  const matches = getMatches();
  return matches.filter((match) => match.patientId === patientId);
};

export const createMatch = (
  donorId: string,
  patientId: string
): DonationMatch => {
  const newMatch: DonationMatch = {
    id: generateId(),
    donorId,
    patientId,
    matchDate: new Date(),
    status: 'pending',
    donationDate: null,
  };
  
  const matches = getMatches();
  matches.push(newMatch);
  localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(matches));
  
  // Update donor availability
  updateDonorAvailability(donorId, false);
  
  return newMatch;
};

export const updateMatch = (match: DonationMatch): DonationMatch => {
  const matches = getMatches();
  const index = matches.findIndex((m) => m.id === match.id);
  
  if (index !== -1) {
    matches[index] = match;
    localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(matches));
  }
  
  return match;
};

// Login check function - we'd use proper auth in a real app
export const checkUserCredentials = (
  email: string,
  password: string
): User | null => {
  // Check for donors
  const donors = getDonors();
  const donor = donors.find((d) => d.email === email);
  if (donor) {
    return donor;
  }
  
  // Check for patients
  const patients = getPatients();
  const patient = patients.find((p) => p.email === email);
  if (patient) {
    return patient;
  }
  
  // No user found with this email
  return null;
};

// Admin check
export const checkAdminCredentials = (password: string): boolean => {
  return password === 'Shashwat@226025';
};

// Clear database (for testing purposes)
export const clearDatabase = () => {
  localStorage.removeItem(STORAGE_KEYS.DONORS);
  localStorage.removeItem(STORAGE_KEYS.PATIENTS);
  localStorage.removeItem(STORAGE_KEYS.MATCHES);
  initializeDatabase();
};
