import { create } from 'zustand';

import { createSelectors } from '../utils';

interface dateTimePickerHandler {
  boolean: boolean;
  toggleBoolean: () => void;
  setBoolean: (boolean: boolean) => void;
}

const _useDateTimePickerHandler = create<dateTimePickerHandler>()((set) => ({
  boolean: false,
  toggleBoolean: () => set((state) => ({ boolean: !state.boolean })),
  setBoolean: (newBoolean) => set({ boolean: newBoolean }),
}));

export const useDateTimePickerHandler = createSelectors(
  _useDateTimePickerHandler
);
