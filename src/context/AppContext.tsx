// App Context - Global state management for Zig

import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User, AuthState, Zig, VaultItem} from '../types';
import {currentUser, mockZigs, mockVaultItems} from '../data/mockData';

// Storage keys
const STORAGE_KEYS = {
  HAS_ONBOARDED: '@zig/hasOnboarded',
  AUTH_TOKEN: '@zig/authToken',
  USER_DATA: '@zig/userData',
};

interface AppContextType {
  // Auth state
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  user: User | null;
  isLoading: boolean;

  // Actions
  completeOnboarding: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;

  // Feed state
  feedZigs: Zig[];
  toggleSaveZig: (zigId: string) => void;

  // Vault state
  vaultItems: VaultItem[];
  selectedVaultItem: VaultItem | null;
  addToVault: (item: VaultItem) => void;
  selectVaultItem: (itemId: string) => void;
  lockInZig: (caption: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Feed state
  const [feedZigs, setFeedZigs] = useState<Zig[]>(mockZigs);

  // Vault state
  const [vaultItems, setVaultItems] = useState<VaultItem[]>(mockVaultItems);

  // Initialize app state from storage
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      const [hasOnboarded, authToken, userData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.HAS_ONBOARDED),
        AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
        AsyncStorage.getItem(STORAGE_KEYS.USER_DATA),
      ]);

      setHasCompletedOnboarding(hasOnboarded === 'true');

      if (authToken && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error initializing app:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.HAS_ONBOARDED, 'true');
      setHasCompletedOnboarding(true);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful login
      const mockToken = 'mock-auth-token';
      const mockUser = {...currentUser, id: 'user-1'};

      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, mockToken);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser));

      setIsAuthenticated(true);
      setUser(mockUser);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.USER_DATA,
      ]);
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = {...user, ...updates};
      setUser(updatedUser);
      AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));
    }
  };

  const toggleSaveZig = (zigId: string) => {
    setFeedZigs((zigs) =>
      zigs.map((zig) =>
        zig.id === zigId
          ? {
              ...zig,
              isSaved: !zig.isSaved,
              savesCount: zig.isSaved ? zig.savesCount - 1 : zig.savesCount + 1,
            }
          : zig
      )
    );
  };

  const selectedVaultItem = vaultItems.find((item) => item.isSelected) || null;

  const addToVault = (item: VaultItem) => {
    setVaultItems((items) => [...items, item]);
  };

  const selectVaultItem = (itemId: string) => {
    setVaultItems((items) =>
      items.map((item) => ({
        ...item,
        isSelected: item.id === itemId,
      }))
    );
  };

  const lockInZig = (caption: string) => {
    // In a real app, this would make an API call to lock in the Zig
    console.log('Zig locked in with caption:', caption);
  };

  const value: AppContextType = {
    isAuthenticated,
    hasCompletedOnboarding,
    user,
    isLoading,
    completeOnboarding,
    login,
    logout,
    updateUser,
    feedZigs,
    toggleSaveZig,
    vaultItems,
    selectedVaultItem,
    addToVault,
    selectVaultItem,
    lockInZig,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
