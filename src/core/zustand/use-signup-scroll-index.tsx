import { create } from 'zustand';

import { createSelectors } from '../utils';

interface SignUpScrollIndex {
  index: number;
  incrementIndex: () => void;
  setIndex: (index: number) => void;
}

const _useSignUpScrollIndex = create<SignUpScrollIndex>()((set) => ({
  index: 0,
  incrementIndex: () => set((state) => ({ index: state.index + 1 })),
  setIndex: (newIndex) => set({ index: newIndex }),
}));

export const useSignUpScrollIndex = createSelectors(_useSignUpScrollIndex);
