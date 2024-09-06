import { create } from 'zustand';

import { createSelectors } from '../utils';

interface booleanHandler {
  boolean: boolean;
  toggleBoolean: () => void;
  setBoolean: (boolean: boolean) => void;
}

const _useBooleanHandler = create<booleanHandler>()((set) => ({
  boolean: false,
  toggleBoolean: () => set((state) => ({ boolean: !state.boolean })),
  setBoolean: (newBoolean) => set({ boolean: newBoolean }),
}));

export const useBooleanHandler = createSelectors(_useBooleanHandler);
