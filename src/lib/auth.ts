
import { User } from './types';

// Simple authentication using localStorage
const AUTH_TOKEN_KEY = 'bloodlife_auth_token';
const USER_DATA_KEY = 'bloodlife_user_data';

// Store user authentication data
export const setAuthUser = (user: User) => {
  const token = generateAuthToken();
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
};

// Get the currently authenticated user
export const getAuthUser = (): User | null => {
  const userData = localStorage.getItem(USER_DATA_KEY);
  if (!userData) return null;
  
  try {
    return JSON.parse(userData);
  } catch (error) {
    return null;
  }
};

// Check if a user is logged in
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(AUTH_TOKEN_KEY) && !!getAuthUser();
};

// Check if the current user is an admin
export const isAdmin = (): boolean => {
  const user = getAuthUser();
  return user?.role === 'admin';
};

// Logout user
export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
};

// Set admin authentication
export const setAdminAuth = () => {
  const adminUser: User = {
    id: 'admin',
    email: 'admin@bloodlife.com',
    name: 'Admin',
    phone: '',
    city: '',
    role: 'admin',
    createdAt: new Date(),
  };
  
  setAuthUser(adminUser);
};

// Simple token generator (in a real app, we'd use a proper JWT)
const generateAuthToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};
