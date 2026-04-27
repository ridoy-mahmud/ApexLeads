import { create } from 'zustand';

interface AppState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  user: any | null;
  setUser: (user: any) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  user: { name: "Admin User", role: "ADMIN", email: "admin@nexuscrawl.com" },
  setUser: (user) => set({ user }),
}));
