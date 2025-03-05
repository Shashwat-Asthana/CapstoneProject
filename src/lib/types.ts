
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  city: string;
  role: 'donor' | 'patient' | 'admin';
  createdAt: Date;
}

export interface Donor extends User {
  bloodType: BloodType;
  lastDonation: Date | null;
  isAvailable: boolean;
  role: 'donor';
}

export interface Patient extends User {
  bloodType: BloodType;
  requestedDate: Date | null;
  urgency: 'low' | 'medium' | 'high';
  requestStatus: 'pending' | 'matched' | 'fulfilled';
  role: 'patient';
}

export interface DonationMatch {
  id: string;
  donorId: string;
  patientId: string;
  matchDate: Date;
  status: 'pending' | 'contacted' | 'completed' | 'canceled';
  donationDate: Date | null;
}
