import { create } from 'zustand';

import { createSelectors } from '../utils';

interface OnboardingScrollIndex {
  index: number;
  incrementIndex: () => void;
  setIndex: (index: number) => void;
}

const _useOnboardingScrollIndex = create<OnboardingScrollIndex>()((set) => ({
  index: 0,
  incrementIndex: () => set((state) => ({ index: state.index + 1 })),
  setIndex: (newIndex) => set({ index: newIndex }),
}));

export const useOnboardingScrollIndex = createSelectors(
  _useOnboardingScrollIndex
);
