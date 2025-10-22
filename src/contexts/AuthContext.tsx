import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 
  | 'CEO' 
  | 'Director' 
  | 'Admin' 
  | 'Staff' 
  | 'IT Team'
  | 'Family and Friends'
  | 'CPDP Manager'
  | 'CPDP TCO'
  | 'CPDP Staff'
  | 'CPDP Patients'
  | 'CPDP Training'
  | 'CPDP Network';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  teamTag?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string, name: string, role: UserRole) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users seeded in localStorage - matches SEED_USERS
const DEMO_USERS: User[] = [
  { id: '1', email: 'ceo@raghava.ai', name: 'Dr (Maj) Jai Prathap Reddy', role: 'CEO' },
  { id: '2', email: 'director1@raghava.ai', name: 'Sarah Williams', role: 'Director', teamTag: 'Clinical' },
  { id: '3', email: 'director2@raghava.ai', name: 'Michael Chen', role: 'Director', teamTag: 'Operations' },
  { id: '4', email: 'admin@raghava.ai', name: 'Jane Admin', role: 'Admin' },
  { id: '5', email: 'staff1@raghava.ai', name: 'Alex Johnson', role: 'Staff', teamTag: 'Clinical' },
  { id: '6', email: 'staff2@raghava.ai', name: 'Maria Garcia', role: 'Staff', teamTag: 'Operations' },
  { id: '7', email: 'staff3@raghava.ai', name: 'David Lee', role: 'Staff', teamTag: 'Finance' },
  { id: '8', email: 'it@raghava.ai', name: 'James Wilson', role: 'IT Team' },
  { id: '9', email: 'family@raghava.ai', name: 'Emma Thompson', role: 'Family and Friends' },
  { id: '10', email: 'cpdp.manager@raghava.ai', name: 'Robert Anderson', role: 'CPDP Manager' },
  { id: '11', email: 'cpdp.tco@raghava.ai', name: 'Linda Martinez', role: 'CPDP TCO' },
  { id: '12', email: 'cpdp.staff1@raghava.ai', name: 'John Smith', role: 'CPDP Staff', teamTag: 'CPDP' },
  { id: '13', email: 'cpdp.patient1@raghava.ai', name: 'Mary Johnson', role: 'CPDP Patients' },
  { id: '14', email: 'cpdp.training@raghava.ai', name: 'Susan Brown', role: 'CPDP Training' },
  { id: '15', email: 'cpdp.network@raghava.ai', name: 'Thomas Davis', role: 'CPDP Network' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Initialize demo users
    const storedUsers = localStorage.getItem('raghava_users');
    if (!storedUsers) {
      localStorage.setItem('raghava_users', JSON.stringify(DEMO_USERS));
      // Set default passwords for demo users
      DEMO_USERS.forEach(u => {
        localStorage.setItem(`raghava_pwd_${u.email}`, 'password123');
      });
    }

    // Check if user is logged in
    const storedUser = localStorage.getItem('raghava_current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const usersStr = localStorage.getItem('raghava_users');
    if (!usersStr) return false;

    const users: User[] = JSON.parse(usersStr);
    const foundUser = users.find(u => u.email === email);
    
    if (!foundUser) return false;

    const storedPassword = localStorage.getItem(`raghava_pwd_${email}`);
    if (storedPassword !== password) return false;

    setUser(foundUser);
    localStorage.setItem('raghava_current_user', JSON.stringify(foundUser));
    return true;
  };

  const signup = (email: string, password: string, name: string, role: UserRole): boolean => {
    const usersStr = localStorage.getItem('raghava_users');
    if (!usersStr) return false;

    const users: User[] = JSON.parse(usersStr);
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role
    };

    users.push(newUser);
    localStorage.setItem('raghava_users', JSON.stringify(users));
    localStorage.setItem(`raghava_pwd_${email}`, password);
    
    setUser(newUser);
    localStorage.setItem('raghava_current_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('raghava_current_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
