/**
 * Seed data utilities for Raghava v1.0 CEO OS
 * Provides deterministic dummy data for all features
 */

export type UserRole = 'CEO' | 'Director' | 'Admin' | 'Staff';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  teamTag?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  org?: string;
  phone?: string;
  tags: string[];
  notes?: string;
  ftuId?: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'Backlog' | 'Doing' | 'Blocked' | 'Done';
  priority: 'Low' | 'Med' | 'High' | 'Critical';
  dueDate?: string;
  assigneeUserId: string;
  createdByUserId: string;
  ftuId?: string;
  comments: TaskComment[];
  createdAt: string;
  updatedAt: string;
}

export interface TaskComment {
  id: string;
  authorUserId: string;
  text: string;
  createdAt: string;
}

export interface MessageThread {
  id: string;
  title: string;
  participantIds: string[];
  linkedTaskId?: string;
  ftuId?: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface VaultItem {
  id: string;
  title: string;
  type: 'doc' | 'note';
  value: string;
  tags: string[];
  ftuId?: string;
  sensitivity: 'Low' | 'Medium' | 'High';
  createdAt: string;
}

export interface PasswordItem {
  id: string;
  title: string;
  username?: string;
  url?: string;
  passwordEnc: string;
  tags: string[];
  ftuId?: string;
  createdAt: string;
}

// Mulberry32 PRNG for deterministic randomness
function mulberry32(seed: number) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// Generate deterministic score for FTU code
export function generateTopicScore(ftuCode: string): number {
  const hash = ftuCode.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rng = mulberry32(hash);
  return Math.floor(rng() * 30) + 70; // 70-100 range
}

// Generate sparkline data (8 points) with trend
export function generateSparklineData(ftuCode: string): number[] {
  const hash = ftuCode.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rng = mulberry32(hash);
  const baseScore = generateTopicScore(ftuCode);
  const trend = (rng() - 0.5) * 10; // -5 to +5 trend
  
  const data: number[] = [];
  for (let i = 0; i < 8; i++) {
    const variance = (rng() - 0.5) * 8;
    const value = Math.max(0, Math.min(100, baseScore + (trend * i / 7) + variance));
    data.push(Math.round(value));
  }
  return data;
}

// I❤️CEO v1.2 Framework - 10 Focuses with 10 Topics each
export const FTU_FRAMEWORK = [
  {
    code: 'F1',
    title: 'Family',
    topics: [
      { code: 'T1', title: 'Health & Wellness' },
      { code: 'T2', title: 'Quality Time' },
      { code: 'T3', title: 'Communication' },
      { code: 'T4', title: 'Financial Security' },
      { code: 'T5', title: 'Education' },
      { code: 'T6', title: 'Legacy Planning' },
      { code: 'T7', title: 'Traditions' },
      { code: 'T8', title: 'Conflict Resolution' },
      { code: 'T9', title: 'Shared Goals' },
      { code: 'T10', title: 'Emotional Support' },
    ],
  },
  {
    code: 'F2',
    title: 'Finance',
    topics: [
      { code: 'T1', title: 'Cash Flow Management' },
      { code: 'T2', title: 'Investment Portfolio' },
      { code: 'T3', title: 'Tax Strategy' },
      { code: 'T4', title: 'Risk Management' },
      { code: 'T5', title: 'Debt Optimization' },
      { code: 'T6', title: 'Estate Planning' },
      { code: 'T7', title: 'Retirement Planning' },
      { code: 'T8', title: 'Wealth Preservation' },
      { code: 'T9', title: 'Diversification' },
      { code: 'T10', title: 'Financial Goals' },
    ],
  },
  {
    code: 'F3',
    title: 'Fitness',
    topics: [
      { code: 'T1', title: 'Cardiovascular Health' },
      { code: 'T2', title: 'Strength Training' },
      { code: 'T3', title: 'Flexibility & Mobility' },
      { code: 'T4', title: 'Nutrition & Diet' },
      { code: 'T5', title: 'Sleep Quality' },
      { code: 'T6', title: 'Stress Management' },
      { code: 'T7', title: 'Preventive Care' },
      { code: 'T8', title: 'Mental Wellness' },
      { code: 'T9', title: 'Recovery & Rest' },
      { code: 'T10', title: 'Longevity Goals' },
    ],
  },
  {
    code: 'F4',
    title: 'Faith',
    topics: [
      { code: 'T1', title: 'Spiritual Practice' },
      { code: 'T2', title: 'Moral Compass' },
      { code: 'T3', title: 'Community Engagement' },
      { code: 'T4', title: 'Charitable Giving' },
      { code: 'T5', title: 'Purpose & Meaning' },
      { code: 'T6', title: 'Reflection & Meditation' },
      { code: 'T7', title: 'Values Alignment' },
      { code: 'T8', title: 'Service to Others' },
      { code: 'T9', title: 'Gratitude Practice' },
      { code: 'T10', title: 'Inner Peace' },
    ],
  },
  {
    code: 'F5',
    title: 'Friends',
    topics: [
      { code: 'T1', title: 'Social Network' },
      { code: 'T2', title: 'Trust Building' },
      { code: 'T3', title: 'Quality Connections' },
      { code: 'T4', title: 'Mutual Support' },
      { code: 'T5', title: 'Shared Experiences' },
      { code: 'T6', title: 'Boundaries' },
      { code: 'T7', title: 'Communication' },
      { code: 'T8', title: 'Loyalty & Commitment' },
      { code: 'T9', title: 'Fun & Recreation' },
      { code: 'T10', title: 'Growth Together' },
    ],
  },
  {
    code: 'F6',
    title: 'Freedom',
    topics: [
      { code: 'T1', title: 'Time Autonomy' },
      { code: 'T2', title: 'Location Independence' },
      { code: 'T3', title: 'Financial Independence' },
      { code: 'T4', title: 'Decision Authority' },
      { code: 'T5', title: 'Creative Expression' },
      { code: 'T6', title: 'Personal Boundaries' },
      { code: 'T7', title: 'Work-Life Balance' },
      { code: 'T8', title: 'Self-Determination' },
      { code: 'T9', title: 'Flexibility' },
      { code: 'T10', title: 'Choice & Options' },
    ],
  },
  {
    code: 'F7',
    title: 'Fun',
    topics: [
      { code: 'T1', title: 'Hobbies & Interests' },
      { code: 'T2', title: 'Travel & Adventure' },
      { code: 'T3', title: 'Entertainment' },
      { code: 'T4', title: 'Sports & Games' },
      { code: 'T5', title: 'Creative Pursuits' },
      { code: 'T6', title: 'Social Events' },
      { code: 'T7', title: 'Relaxation' },
      { code: 'T8', title: 'Exploration' },
      { code: 'T9', title: 'Spontaneity' },
      { code: 'T10', title: 'Joy & Laughter' },
    ],
  },
  {
    code: 'F8',
    title: 'Fulfillment',
    topics: [
      { code: 'T1', title: 'Life Purpose' },
      { code: 'T2', title: 'Achievement' },
      { code: 'T3', title: 'Contribution' },
      { code: 'T4', title: 'Personal Growth' },
      { code: 'T5', title: 'Impact & Legacy' },
      { code: 'T6', title: 'Satisfaction' },
      { code: 'T7', title: 'Mastery' },
      { code: 'T8', title: 'Meaning' },
      { code: 'T9', title: 'Self-Actualization' },
      { code: 'T10', title: 'Contentment' },
    ],
  },
  {
    code: 'F9',
    title: 'Focus',
    topics: [
      { code: 'T1', title: 'Concentration' },
      { code: 'T2', title: 'Priority Setting' },
      { code: 'T3', title: 'Time Management' },
      { code: 'T4', title: 'Distraction Control' },
      { code: 'T5', title: 'Deep Work' },
      { code: 'T6', title: 'Goal Clarity' },
      { code: 'T7', title: 'Task Completion' },
      { code: 'T8', title: 'Energy Management' },
      { code: 'T9', title: 'Mindfulness' },
      { code: 'T10', title: 'Strategic Thinking' },
    ],
  },
  {
    code: 'F10',
    title: 'Future',
    topics: [
      { code: 'T1', title: 'Vision Setting' },
      { code: 'T2', title: 'Long-term Planning' },
      { code: 'T3', title: 'Innovation' },
      { code: 'T4', title: 'Risk Assessment' },
      { code: 'T5', title: 'Opportunity Scanning' },
      { code: 'T6', title: 'Succession Planning' },
      { code: 'T7', title: 'Technology Adoption' },
      { code: 'T8', title: 'Market Positioning' },
      { code: 'T9', title: 'Scenario Planning' },
      { code: 'T10', title: 'Legacy Building' },
    ],
  },
];

// Generate topic score map
export function generateTopicScoreMap(): Record<string, number> {
  const map: Record<string, number> = {};
  FTU_FRAMEWORK.forEach(focus => {
    focus.topics.forEach(topic => {
      const ftuCode = `${focus.code}.${topic.code}`;
      map[ftuCode] = generateTopicScore(ftuCode);
    });
  });
  return map;
}

// Seed users
export const SEED_USERS: User[] = [
  { id: '1', email: 'ceo@raghava.ai', name: 'Dr (Maj) Jai Prathap Reddy', role: 'CEO' },
  { id: '2', email: 'director1@raghava.ai', name: 'Sarah Williams', role: 'Director', teamTag: 'Clinical' },
  { id: '3', email: 'director2@raghava.ai', name: 'Michael Chen', role: 'Director', teamTag: 'Operations' },
  { id: '4', email: 'admin@raghava.ai', name: 'Jane Admin', role: 'Admin' },
  { id: '5', email: 'staff1@raghava.ai', name: 'Alex Johnson', role: 'Staff', teamTag: 'Clinical' },
  { id: '6', email: 'staff2@raghava.ai', name: 'Maria Garcia', role: 'Staff', teamTag: 'Operations' },
  { id: '7', email: 'staff3@raghava.ai', name: 'David Lee', role: 'Staff', teamTag: 'Finance' },
];

// Seed contacts (30+)
export const SEED_CONTACTS: Contact[] = [
  {
    id: 'c1', name: 'Dr (Maj) Jai Prathap Reddy', email: 'ceo@raghava.ai', role: 'CEO',
    department: 'Executive', org: 'Raghava AI', phone: '+1-555-0001',
    tags: ['Leadership', 'Strategy'], notes: 'Founder and CEO', createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'c2', name: 'Sarah Williams', email: 'director1@raghava.ai', role: 'Director',
    department: 'Clinical', org: 'Raghava AI', phone: '+1-555-0002',
    tags: ['Clinical', 'Healthcare'], ftuId: 'F1.T1.U1', createdAt: '2024-01-16T10:00:00Z'
  },
  {
    id: 'c3', name: 'Michael Chen', email: 'director2@raghava.ai', role: 'Director',
    department: 'Operations', org: 'Raghava AI', phone: '+1-555-0003',
    tags: ['Operations', 'Logistics'], createdAt: '2024-01-17T10:00:00Z'
  },
  {
    id: 'c4', name: 'Jane Admin', email: 'admin@raghava.ai', role: 'Admin',
    department: 'Administration', org: 'Raghava AI', phone: '+1-555-0004',
    tags: ['Admin', 'HR'], createdAt: '2024-01-18T10:00:00Z'
  },
  {
    id: 'c5', name: 'Robert Thompson', email: 'robert.t@advisor.com', role: 'Director',
    department: 'Advisory', org: 'Strategic Partners', phone: '+1-555-1001',
    tags: ['Advisor', 'Finance', 'Strategy'], ftuId: 'F2.T2.U4', createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: 'c6', name: 'Emily Rodriguez', email: 'emily.r@legal.com', role: 'Director',
    department: 'Legal', org: 'Legal Services Inc', phone: '+1-555-1002',
    tags: ['Legal', 'Compliance'], createdAt: '2024-01-22T10:00:00Z'
  },
  {
    id: 'c7', name: 'James Wilson', email: 'james.w@tech.com', role: 'Staff',
    department: 'Technology', org: 'Tech Innovations', phone: '+1-555-1003',
    tags: ['Technology', 'Software'], createdAt: '2024-01-24T10:00:00Z'
  },
  {
    id: 'c8', name: 'Lisa Anderson', email: 'lisa.a@finance.com', role: 'Admin',
    department: 'Finance', org: 'Financial Partners', phone: '+1-555-1004',
    tags: ['Finance', 'Accounting'], ftuId: 'F2.T1.U2', createdAt: '2024-01-26T10:00:00Z'
  },
  {
    id: 'c9', name: 'Christopher Martin', email: 'chris.m@marketing.com', role: 'Staff',
    department: 'Marketing', org: 'Brand Agency', phone: '+1-555-1005',
    tags: ['Marketing', 'Branding'], createdAt: '2024-01-28T10:00:00Z'
  },
  {
    id: 'c10', name: 'Amanda White', email: 'amanda.w@hr.com', role: 'Admin',
    department: 'HR', org: 'People First', phone: '+1-555-1006',
    tags: ['HR', 'Recruiting'], createdAt: '2024-02-01T10:00:00Z'
  },
  {
    id: 'c11', name: 'Daniel Harris', email: 'daniel.h@security.com', role: 'Staff',
    department: 'Security', org: 'SecureIT', phone: '+1-555-1007',
    tags: ['Security', 'Cybersecurity'], ftuId: 'F7.T5.U3', createdAt: '2024-02-03T10:00:00Z'
  },
  {
    id: 'c12', name: 'Michelle Taylor', email: 'michelle.t@clinical.com', role: 'Staff',
    department: 'Clinical', org: 'HealthCare Plus', phone: '+1-555-1008',
    tags: ['Clinical', 'Research'], createdAt: '2024-02-05T10:00:00Z'
  },
  {
    id: 'c13', name: 'Kevin Brown', email: 'kevin.b@operations.com', role: 'Staff',
    department: 'Operations', org: 'Ops Excellence', phone: '+1-555-1009',
    tags: ['Operations', 'Process'], createdAt: '2024-02-07T10:00:00Z'
  },
  {
    id: 'c14', name: 'Jessica Davis', email: 'jessica.d@sales.com', role: 'Staff',
    department: 'Sales', org: 'Sales Force', phone: '+1-555-1010',
    tags: ['Sales', 'Business Development'], createdAt: '2024-02-09T10:00:00Z'
  },
  {
    id: 'c15', name: 'Matthew Miller', email: 'matthew.m@product.com', role: 'Admin',
    department: 'Product', org: 'Product Innovators', phone: '+1-555-1011',
    tags: ['Product', 'Innovation'], createdAt: '2024-02-11T10:00:00Z'
  },
  {
    id: 'c16', name: 'Ashley Garcia', email: 'ashley.g@design.com', role: 'Staff',
    department: 'Design', org: 'Creative Studio', phone: '+1-555-1012',
    tags: ['Design', 'UX'], createdAt: '2024-02-13T10:00:00Z'
  },
  {
    id: 'c17', name: 'Brian Martinez', email: 'brian.m@data.com', role: 'Staff',
    department: 'Data', org: 'Data Analytics Co', phone: '+1-555-1013',
    tags: ['Data', 'Analytics'], ftuId: 'F9.T5.U1', createdAt: '2024-02-15T10:00:00Z'
  },
  {
    id: 'c18', name: 'Nicole Lee', email: 'nicole.l@compliance.com', role: 'Admin',
    department: 'Compliance', org: 'Compliance Group', phone: '+1-555-1014',
    tags: ['Compliance', 'Regulatory'], createdAt: '2024-02-17T10:00:00Z'
  },
  {
    id: 'c19', name: 'Ryan Walker', email: 'ryan.w@consulting.com', role: 'Director',
    department: 'Consulting', org: 'Strategy Consultants', phone: '+1-555-1015',
    tags: ['Advisor', 'Strategy'], createdAt: '2024-02-19T10:00:00Z'
  },
  {
    id: 'c20', name: 'Stephanie Hall', email: 'stephanie.h@ventures.com', role: 'Director',
    department: 'Ventures', org: 'Growth Capital', phone: '+1-555-1016',
    tags: ['Finance', 'Ventures'], createdAt: '2024-02-21T10:00:00Z'
  },
  {
    id: 'c21', name: 'Justin Allen', email: 'justin.a@partnerships.com', role: 'Staff',
    department: 'Partnerships', org: 'Alliance Partners', phone: '+1-555-1017',
    tags: ['Partnerships', 'Alliances'], createdAt: '2024-02-23T10:00:00Z'
  },
  {
    id: 'c22', name: 'Rebecca Young', email: 'rebecca.y@training.com', role: 'Staff',
    department: 'Training', org: 'Learning Solutions', phone: '+1-555-1018',
    tags: ['Training', 'Development'], createdAt: '2024-02-25T10:00:00Z'
  },
  {
    id: 'c23', name: 'Gregory King', email: 'gregory.k@research.com', role: 'Staff',
    department: 'Research', org: 'R&D Labs', phone: '+1-555-1019',
    tags: ['Research', 'Science'], createdAt: '2024-02-27T10:00:00Z'
  },
  {
    id: 'c24', name: 'Samantha Wright', email: 'samantha.w@quality.com', role: 'Admin',
    department: 'Quality', org: 'QA Systems', phone: '+1-555-1020',
    tags: ['Quality', 'Assurance'], createdAt: '2024-03-01T10:00:00Z'
  },
  {
    id: 'c25', name: 'Tyler Lopez', email: 'tyler.l@logistics.com', role: 'Staff',
    department: 'Logistics', org: 'Supply Chain Co', phone: '+1-555-1021',
    tags: ['Logistics', 'Supply Chain'], createdAt: '2024-03-03T10:00:00Z'
  },
  {
    id: 'c26', name: 'Victoria Hill', email: 'victoria.h@media.com', role: 'Staff',
    department: 'Media', org: 'Media Relations', phone: '+1-555-1022',
    tags: ['Media', 'PR'], createdAt: '2024-03-05T10:00:00Z'
  },
  {
    id: 'c27', name: 'Brandon Scott', email: 'brandon.s@procurement.com', role: 'Admin',
    department: 'Procurement', org: 'Purchasing Group', phone: '+1-555-1023',
    tags: ['Procurement', 'Sourcing'], createdAt: '2024-03-07T10:00:00Z'
  },
  {
    id: 'c28', name: 'Rachel Green', email: 'rachel.g@sustainability.com', role: 'Staff',
    department: 'Sustainability', org: 'Green Initiatives', phone: '+1-555-1024',
    tags: ['Sustainability', 'Environment'], ftuId: 'F8.T3.U2', createdAt: '2024-03-09T10:00:00Z'
  },
  {
    id: 'c29', name: 'Aaron Adams', email: 'aaron.a@innovation.com', role: 'Director',
    department: 'Innovation', org: 'Future Labs', phone: '+1-555-1025',
    tags: ['Innovation', 'Technology'], createdAt: '2024-03-11T10:00:00Z'
  },
  {
    id: 'c30', name: 'Megan Baker', email: 'megan.b@customer.com', role: 'Staff',
    department: 'Customer Success', org: 'Client Care', phone: '+1-555-1026',
    tags: ['Customer Success', 'Support'], createdAt: '2024-03-13T10:00:00Z'
  },
  {
    id: 'c31', name: 'Jordan Nelson', email: 'jordan.n@platform.com', role: 'Staff',
    department: 'Platform', org: 'Tech Platform', phone: '+1-555-1027',
    tags: ['Technology', 'Platform'], createdAt: '2024-03-15T10:00:00Z'
  },
  {
    id: 'c32', name: 'Taylor Carter', email: 'taylor.c@advisory.com', role: 'Director',
    department: 'Advisory', org: 'Executive Advisors', phone: '+1-555-1028',
    tags: ['Advisor', 'Executive'], ftuId: 'F10.T1.U5', createdAt: '2024-03-17T10:00:00Z'
  }
];

// Initialize all seed data in localStorage
export function initializeSeedData() {
  const prefix = 'raghava:';
  
  // Only seed if not already initialized
  if (localStorage.getItem(`${prefix}seed:initialized`)) {
    return;
  }

  // Users
  localStorage.setItem(`${prefix}users`, JSON.stringify(SEED_USERS));
  
  // Contacts
  localStorage.setItem(`${prefix}contacts`, JSON.stringify(SEED_CONTACTS));
  
  // Topic scores
  const topicScores = generateTopicScoreMap();
  localStorage.setItem(`${prefix}topic:scores`, JSON.stringify(topicScores));
  
  // Mark as initialized
  localStorage.setItem(`${prefix}seed:initialized`, 'true');
}
