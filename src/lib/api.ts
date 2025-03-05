
import { supabase } from "@/integrations/supabase/client";
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

// User functions
export const createUser = async (
  email: string,
  name: string,
  phone: string,
  city: string,
  role: UserRole
): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .insert({
      email,
      name,
      phone,
      city,
      role
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating user:', error);
    return null;
  }
  
  return data;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  
  if (error) {
    console.error('Error getting user by email:', error);
    return null;
  }
  
  return data;
};

// Donor functions
export const createDonor = async (
  userId: string,
  bloodType: BloodType
): Promise<Donor | null> => {
  const { data, error } = await supabase
    .from('donors')
    .insert({
      id: userId,
      blood_type: bloodType
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating donor:', error);
    return null;
  }
  
  return data as Donor;
};

export const getDonorById = async (id: string): Promise<Donor | null> => {
  const { data, error } = await supabase
    .from('donors')
    .select('*, users!inner(*)')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error getting donor by id:', error);
    return null;
  }
  
  return data as Donor;
};

export const getAvailableDonorsByBloodTypeAndCity = async (
  bloodType: BloodType,
  city: string
): Promise<Donor[]> => {
  const { data, error } = await supabase
    .from('donors')
    .select('*, users!inner(*)')
    .eq('blood_type', bloodType)
    .eq('users.city', city)
    .eq('is_available', true);
  
  if (error) {
    console.error('Error getting available donors:', error);
    return [];
  }
  
  return data as Donor[];
};

export const updateDonorAvailability = async (donorId: string, isAvailable: boolean): Promise<boolean> => {
  const { error } = await supabase
    .from('donors')
    .update({ 
      is_available: isAvailable,
      last_donation: isAvailable ? null : new Date().toISOString()
    })
    .eq('id', donorId);
  
  if (error) {
    console.error('Error updating donor availability:', error);
    return false;
  }
  
  return true;
};

// Patient functions
export const createPatient = async (
  userId: string,
  bloodType: BloodType,
  urgency: UrgencyLevel
): Promise<Patient | null> => {
  const { data, error } = await supabase
    .from('patients')
    .insert({
      id: userId,
      blood_type: bloodType,
      urgency
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating patient:', error);
    return null;
  }
  
  return data as Patient;
};

export const getPatientById = async (id: string): Promise<Patient | null> => {
  const { data, error } = await supabase
    .from('patients')
    .select('*, users!inner(*)')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error getting patient by id:', error);
    return null;
  }
  
  return data as Patient;
};

export const updatePatientStatus = async (
  patientId: string, 
  status: RequestStatus
): Promise<boolean> => {
  const { error } = await supabase
    .from('patients')
    .update({ request_status: status })
    .eq('id', patientId);
  
  if (error) {
    console.error('Error updating patient status:', error);
    return false;
  }
  
  return true;
};

// Donation Match functions
export const createMatch = async (
  donorId: string,
  patientId: string
): Promise<DonationMatch | null> => {
  const { data, error } = await supabase
    .from('donation_matches')
    .insert({
      donor_id: donorId,
      patient_id: patientId
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating match:', error);
    return null;
  }
  
  // Update donor availability (freeze for 6 months)
  await updateDonorAvailability(donorId, false);
  
  // Update patient request status
  await updatePatientStatus(patientId, 'matched');
  
  return data as DonationMatch;
};

export const getAllMatches = async (): Promise<DonationMatch[]> => {
  const { data, error } = await supabase
    .from('donation_matches')
    .select(`
      *,
      donor:donors!inner(*),
      patient:patients!inner(*),
      donor_user:donors!inner(users!inner(*)),
      patient_user:patients!inner(users!inner(*))
    `)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error getting all matches:', error);
    return [];
  }
  
  return data as DonationMatch[];
};

// Admin functions
export const getAllDonors = async (): Promise<Donor[]> => {
  const { data, error } = await supabase
    .from('donors')
    .select('*, users!inner(*)')
    .order('users.created_at', { ascending: false });
  
  if (error) {
    console.error('Error getting all donors:', error);
    return [];
  }
  
  return data as Donor[];
};

export const getAllPatients = async (): Promise<Patient[]> => {
  const { data, error } = await supabase
    .from('patients')
    .select('*, users!inner(*)')
    .order('users.created_at', { ascending: false });
  
  if (error) {
    console.error('Error getting all patients:', error);
    return [];
  }
  
  return data as Patient[];
};

// Admin authentication
export const checkAdminCredentials = (password: string): boolean => {
  return password === 'Shashwat@226025';
};
