'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { CustomTopic } from '@/lib/types';

interface AppContextValue {
  customTopics: CustomTopic[];
  refreshCustomTopics: () => Promise<void>;
  isLoadingTopics: boolean;
}

const AppContext = createContext<AppContextValue>({
  customTopics: [],
  refreshCustomTopics: async () => {},
  isLoadingTopics: false,
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [customTopics, setCustomTopics] = useState<CustomTopic[]>([]);
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);

  const refreshCustomTopics = useCallback(async () => {
    setIsLoadingTopics(true);
    try {
      const res = await fetch('/api/topics');
      if (res.ok) {
        const data = await res.json();
        setCustomTopics(data.topics ?? []);
      }
    } catch {
      // silently fail
    } finally {
      setIsLoadingTopics(false);
    }
  }, []);

  useEffect(() => {
    refreshCustomTopics();
  }, [refreshCustomTopics]);

  return (
    <AppContext.Provider value={{ customTopics, refreshCustomTopics, isLoadingTopics }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
