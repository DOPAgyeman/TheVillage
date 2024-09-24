import { create } from 'zustand';

import { createSelectors } from '../utils';

interface networkHandler {
  isWaitingToReconnect: boolean | null;
  toggleIsWaitingToReconnect: () => void;
  setIsWaitingToReconnect: (isConnected: boolean) => void;
}

const _useNetworkConnectionHandler = create<networkHandler>()((set) => ({
  isWaitingToReconnect: null,
  toggleIsWaitingToReconnect: () =>
    set((state) => ({ isWaitingToReconnect: !state.isWaitingToReconnect })),
  setIsWaitingToReconnect: (newBoolean) =>
    set({ isWaitingToReconnect: newBoolean }),
}));

export const useNetworkConnectionHandler = createSelectors(
  _useNetworkConnectionHandler
);
