import { create } from 'zustand';

import { createSelectors } from '../utils';

interface buttonHandler {
  isPressed: boolean;
  toggleIsPressed: () => void;
}

const _useButtonHandler = create<buttonHandler>()((set) => ({
  isPressed: false,
  toggleIsPressed: () => set((state) => ({ isPressed: !state.isPressed })),
}));

export const useButtonHandler = createSelectors(_useButtonHandler);
