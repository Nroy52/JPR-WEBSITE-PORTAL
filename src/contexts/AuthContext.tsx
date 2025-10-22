import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 
  | 'Super User'
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

export type UserStatus = 'pending' | 'approved' | 'denied';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  teamTag?: string;
  status?: UserStatus;
  signupDate?: string;
  lastLogin?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; message?: string };
  signup: (email: string, password: string, name: string, role: UserRole) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  getPendingUsers: () => User[];
  approveUser: (userId: string) => void;
  denyUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Super user - pre-approved with special access
const SUPER_USER: User = {
  id: 'super-1',
  email: 'superuser@raghava.ai',
  name: 'Super Administrator',
  role: 'Super User',
  status: 'approved'
};

// Demo users seeded in localStorage - all pre-approved
const DEMO_USERS: User[] = [
  { id: '1', email: 'ceo@raghava.ai', name: 'Dr (Maj) Jai Prathap Reddy', role: 'CEO', status: 'approved', signupDate: new Date().toISOString(), lastLogin: new Date().toISOString() },
  { id: '2', email: 'director1@raghava.ai', name: 'Sarah Williams', role: 'Director', teamTag: 'Clinical', status: 'approved', signupDate: new Date().toISOString() },
  { id: '3', email: 'director2@raghava.ai', name: 'Michael Chen', role: 'Director', teamTag: 'Operations', status: 'approved', signupDate: new Date().toISOString() },
  { id: '4', email: 'admin@raghava.ai', name: 'Jane Admin', role: 'Admin', status: 'approved', signupDate: new Date().toISOString() },
  { id: '5', email: 'staff1@raghava.ai', name: 'Alex Johnson', role: 'Staff', teamTag: 'Clinical', status: 'approved', signupDate: new Date().toISOString() },
  { id: '6', email: 'staff2@raghava.ai', name: 'Maria Garcia', role: 'Staff', teamTag: 'Operations', status: 'approved', signupDate: new Date().toISOString() },
  { id: '7', email: 'staff3@raghava.ai', name: 'David Lee', role: 'Staff', teamTag: 'Finance', status: 'approved', signupDate: new Date().toISOString() },
  { id: '8', email: 'it@raghava.ai', name: 'James Wilson', role: 'IT Team', status: 'approved', signupDate: new Date().toISOString() },
  { id: '9', email: 'family@raghava.ai', name: 'Emma Thompson', role: 'Family and Friends', status: 'approved', signupDate: new Date().toISOString() },
  { id: '10', email: 'cpdp.manager@raghava.ai', name: 'Robert Anderson', role: 'CPDP Manager', status: 'approved', signupDate: new Date().toISOString() },
  { id: '11', email: 'cpdp.tco@raghava.ai', name: 'Linda Martinez', role: 'CPDP TCO', status: 'approved', signupDate: new Date().toISOString() },
  { id: '12', email: 'cpdp.staff1@raghava.ai', name: 'John Smith', role: 'CPDP Staff', teamTag: 'CPDP', status: 'approved', signupDate: new Date().toISOString() },
  { id: '13', email: 'cpdp.patient1@raghava.ai', name: 'Mary Johnson', role: 'CPDP Patients', status: 'approved', signupDate: new Date().toISOString() },
  { id: '14', email: 'cpdp.training@raghava.ai', name: 'Susan Brown', role: 'CPDP Training', status: 'approved', signupDate: new Date().toISOString() },
  { id: '15', email: 'cpdp.network@raghava.ai', name: 'Thomas Davis', role: 'CPDP Network', status: 'approved', signupDate: new Date().toISOString() },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Initialize demo users and super user
    const storedUsers = localStorage.getItem('raghava_users');
    if (!storedUsers) {
      const allUsers = [SUPER_USER, ...DEMO_USERS];
      localStorage.setItem('raghava_users', JSON.stringify(allUsers));
      
      // Set default passwords
      localStorage.setItem(`raghava_pwd_${SUPER_USER.email}`, 'superadmin123');
      DEMO_USERS.forEach(u => {
        localStorage.setItem(`raghava_pwd_${u.email}`, 'password123');
      });
    } else {
      // Check if super user exists, if not add it
      const users: User[] = JSON.parse(storedUsers);
      const superUserExists = users.find(u => u.email === SUPER_USER.email);
      if (!superUserExists) {
        users.unshift(SUPER_USER);
        localStorage.setItem('raghava_users', JSON.stringify(users));
        localStorage.setItem(`raghava_pwd_${SUPER_USER.email}`, 'superadmin123');
      }
    }

    // Check if user is logged in
    const storedUser = localStorage.getItem('raghava_current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string): { success: boolean; message?: string } => {
    const usersStr = localStorage.getItem('raghava_users');
    if (!usersStr) return { success: false, message: 'System error' };

    const users: User[] = JSON.parse(usersStr);
    const foundUser = users.find(u => u.email === email);
    
    if (!foundUser) return { success: false, message: 'Invalid email or password' };

    const storedPassword = localStorage.getItem(`raghava_pwd_${email}`);
    if (storedPassword !== password) return { success: false, message: 'Invalid email or password' };

    // Check approval status (Super User is always approved)
    if (foundUser.role !== 'Super User' && foundUser.status === 'pending') {
      return { success: false, message: 'Your account is pending approval by the administrator' };
    }

    if (foundUser.status === 'denied') {
      return { success: false, message: 'Your account access has been denied. Please contact support.' };
    }

    // Update last login
    foundUser.lastLogin = new Date().toISOString();
    users[users.findIndex(u => u.id === foundUser.id)] = foundUser;
    localStorage.setItem('raghava_users', JSON.stringify(users));

    setUser(foundUser);
    localStorage.setItem('raghava_current_user', JSON.stringify(foundUser));
    return { success: true };
  };

  const signup = (email: string, password: string, name: string, role: UserRole): boolean => {
    const usersStr = localStorage.getItem('raghava_users');
    if (!usersStr) return false;

    const users: User[] = JSON.parse(usersStr);
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return false;
    }

    // New users are pending approval by default (except Super User which can't be created via signup)
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      status: 'pending',
      signupDate: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('raghava_users', JSON.stringify(users));
    localStorage.setItem(`raghava_pwd_${email}`, password);
    
    // Don't auto-login pending users
    return true;
  };

  const getPendingUsers = (): User[] => {
    const usersStr = localStorage.getItem('raghava_users');
    if (!usersStr) return [];
    
    const users: User[] = JSON.parse(usersStr);
    return users.filter(u => u.status === 'pending');
  };

  const approveUser = (userId: string) => {
    const usersStr = localStorage.getItem('raghava_users');
    if (!usersStr) return;

    const users: User[] = JSON.parse(usersStr);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex].status = 'approved';
      localStorage.setItem('raghava_users', JSON.stringify(users));
    }
  };

  const denyUser = (userId: string) => {
    const usersStr = localStorage.getItem('raghava_users');
    if (!usersStr) return;

    const users: User[] = JSON.parse(usersStr);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex].status = 'denied';
      localStorage.setItem('raghava_users', JSON.stringify(users));
    }
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
      isAuthenticated: !!user,
      getPendingUsers,
      approveUser,
      denyUser
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
