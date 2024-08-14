import { create } from 'zustand';

import { createSelectors } from '../utils';

interface ScrollIndex {
  index: number;
  incrementIndex: () => void;
  setIndex: (index: number) => void;
}

const _useScrollIndex = create<ScrollIndex>()((set) => ({
  index: 0,
  incrementIndex: () => set((state) => ({ index: state.index + 1 })),
  setIndex: (newIndex) => set({ index: newIndex }),
}));

export const useScrollIndex = createSelectors(_useScrollIndex);
