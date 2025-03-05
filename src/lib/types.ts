
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

export interface Donor {
  id: string;
  blood_type: BloodType;
  last_donation: string | null;
  is_available: boolean;
  users?: User; // To match the Supabase join response structure
}

export interface Patient {
  id: string;
  blood_type: BloodType;
  requested_date: string | null;
  urgency: UrgencyLevel;
  request_status: RequestStatus;
  users?: User; // To match the Supabase join response structure
}

export interface DonationMatch {
  id: string;
  donor_id: string;
  patient_id: string;
  match_date: string;
  status: MatchStatus;
  donation_date: string | null;
  created_at: string;
  // These fields are available when we join with donors and patients tables
  donor?: Donor;
  patient?: Patient;
  donor_user?: { users: User };
  patient_user?: { users: User };
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
  donor_user: { users: User };
  patient_user: { users: User };
}
