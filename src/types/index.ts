// Zig Type Definitions

export interface User {
  id: string;
  handle: string;
  displayName: string;
  avatar: string | null;
  bio: string;
  followerCount: number;
  followingCount: number;
  savedZigsCount: number;
  isFollowing?: boolean;
}

export interface LinkMetadata {
  title: string;
  description?: string;
  image?: string;
  source: string;
  url: string;
  type: 'article' | 'song' | 'video' | 'podcast' | 'book' | 'product' | 'other';
  artist?: string;    // For songs
  albumArt?: string;  // For songs
}

export interface VaultItem {
  id: string;
  link: LinkMetadata;
  addedAt: Date;
  isSelected: boolean;
}

export interface Zig {
  id: string;
  user: User;
  link: LinkMetadata;
  caption: string;
  publishedAt: Date;
  weekNumber: number;
  year: number;
  savesCount: number;
  commentsCount: number;
  isSaved: boolean;
  isLate: boolean;  // Late Arrival badge
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  createdAt: Date;
  replies?: Comment[];
}

export interface WeeklyEdition {
  weekNumber: number;
  year: number;
  dropTime: Date;
  zigs: Zig[];
}

// Navigation Types
export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  Login: undefined;
  SignUp: undefined;
  ProfileSetup: undefined;
  MainTabs: undefined;
  ZigDetail: {zigId: string};
  UserProfile: {userId: string};
  Comments: {zigId: string};
  Settings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Vault: undefined;
  Activity: undefined;
  Profile: undefined;
};

// Auth state
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  hasCompletedOnboarding: boolean;
}
