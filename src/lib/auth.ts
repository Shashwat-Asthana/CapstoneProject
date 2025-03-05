
import { User } from './types';

// Authentication state
let currentUser: User | null = null;
let isAdminAuthenticated: boolean = false;

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

// Check if admin is authenticated
export const isAdminAuth = (): boolean => {
  if (isAdminAuthenticated) return true;
  
  const adminAuth = localStorage.getItem('admin_auth');
  if (adminAuth === 'true') {
    isAdminAuthenticated = true;
    return true;
  }
  
  return false;
};

// Helper function to clear authentication
export const logoutUser = (): void => {
  currentUser = null;
  localStorage.removeItem('auth_user');
};
