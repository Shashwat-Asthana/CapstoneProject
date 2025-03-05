
import { User } from './types';

// Mocking authentication state
let currentUser: User | null = null;

// Helper function to simulate login
export const loginUser = (email: string, password: string): User | null => {
  // In a real app, you would validate credentials against a backend
  // For now, we'll just pretend the login was successful if the email contains "donor" or "patient"
  
  let role = 'donor';
  if (email.includes('patient')) {
    role = 'patient';
  } else if (email.includes('admin')) {
    role = 'admin';
  }
  
  const user: User = {
    id: `user-${Date.now()}`,
    email,
    name: email.split('@')[0],
    phone: '123-456-7890',
    city: 'Sample City',
    role: role as any,
    created_at: new Date().toISOString()
  };
  
  setAuthUser(user);
  return user;
};

// Helper function to simulate logout
export const logoutUser = (): void => {
  currentUser = null;
  localStorage.removeItem('auth_user');
};

// Get the current authenticated user
export const getAuthUser = (): User | null => {
  if (currentUser) return currentUser;
  
  const storedUser = localStorage.getItem('auth_user');
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
    return currentUser;
  }
  
  return null;
};

// Set the authenticated user
export const setAuthUser = (user: User): void => {
  currentUser = user;
  localStorage.setItem('auth_user', JSON.stringify(user));
};

// Check if the user is authenticated
export const isAuthenticated = (): boolean => {
  return getAuthUser() !== null;
};

// Check if the user has a specific role
export const hasRole = (role: string): boolean => {
  const user = getAuthUser();
  return user?.role === role;
};
