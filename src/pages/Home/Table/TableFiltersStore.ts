import { create } from 'zustand';

interface Filters {
  type: 'all' | string;
  status: 'all' | 'CLOSED' | 'IN_PROGRESS' | 'CREATED';
  setType: (type: 'all' | string) => void;
  setStatus: (status: 'all' | 'CLOSED' | 'IN_PROGRESS' | 'CREATED') => void;
}

export const useTableFiltersStore = create<Filters>(set => ({
  type: 'all',
  status: 'all',
  setType: type => set(() => ({ type })),
  setStatus: status => set(() => ({ status }))
}));
