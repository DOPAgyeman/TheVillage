import { create } from 'zustand';

interface ScrollIndex {
  index: number;
  incrementIndex: () => void;
  setIndex: (index: number) => void;
}

export const useScrollIndex = create<ScrollIndex>()((set) => ({
  index: 0,
  incrementIndex: () => set((state) => ({ index: state.index + 1 })),
  setIndex: (newIndex) => set({ index: newIndex }),
}));
