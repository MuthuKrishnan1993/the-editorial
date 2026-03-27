import { create } from 'zustand';
import type { FilterState, SortOption } from '@/types';

const DEFAULT_FILTERS: FilterState = {
  categories: [],
  priceRange: [0, 1000],
  sizes: [],
  colors: [],
  sortBy: 'newest',
};

interface FilterStoreState {
  filters: FilterState;
  setCategory: (categories: string[]) => void;
  setPriceRange: (range: [number, number]) => void;
  setSizes: (sizes: string[]) => void;
  setColors: (colors: string[]) => void;
  setSortBy: (sort: SortOption) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStoreState>()((set) => ({
  filters: { ...DEFAULT_FILTERS },

  setCategory: (categories) =>
    set((state) => ({ filters: { ...state.filters, categories } })),

  setPriceRange: (range) =>
    set((state) => ({ filters: { ...state.filters, priceRange: range } })),

  setSizes: (sizes) =>
    set((state) => ({ filters: { ...state.filters, sizes } })),

  setColors: (colors) =>
    set((state) => ({ filters: { ...state.filters, colors } })),

  setSortBy: (sort) =>
    set((state) => ({ filters: { ...state.filters, sortBy: sort } })),

  resetFilters: () => set({ filters: { ...DEFAULT_FILTERS } }),
}));
