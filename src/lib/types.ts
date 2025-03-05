
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type UserRole = 'donor' | 'patient' | 'admin';

export type UrgencyLevel = 'low' | 'medium' | 'high';

export type RequestStatus = 'pending' | 'matched' | 'fulfilled';

export type MatchStatus = 'pending' | 'contacted' | 'completed' | 'canceled';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  city: string;
  role: UserRole;
  created_at: string;
}

export interface Donor extends User {
  blood_type: BloodType;
  last_donation: string | null;
  is_available: boolean;
}

export interface Patient extends User {
  blood_type: BloodType;
  requested_date: string | null;
  urgency: UrgencyLevel;
  request_status: RequestStatus;
}

export interface DonationMatch {
  id: string;
  donor_id: string;
  patient_id: string;
  match_date: string;
  status: MatchStatus;
  donation_date: string | null;
  created_at: string;
}

export interface DonorWithUser extends Donor {
  user: User;
}

export interface PatientWithUser extends Patient {
  user: User;
}

export interface MatchWithDetails extends DonationMatch {
  donor: Donor;
  patient: Patient;
  donor_user: User;
  patient_user: User;
}
