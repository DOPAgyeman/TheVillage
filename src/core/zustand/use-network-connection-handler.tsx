import { create } from 'zustand';

import { createSelectors } from '../utils';

interface networkHandler {
  isWaitingToReconnect: boolean | null;
  setIsWaitingToReconnect: (isConnected: boolean) => void;
}

const _useNetworkConnectionHandler = create<networkHandler>()((set) => ({
  isWaitingToReconnect: null,
  setIsWaitingToReconnect: (newBoolean) =>
    set({ isWaitingToReconnect: newBoolean }),
}));

export const useNetworkConnectionHandler = createSelectors(
  _useNetworkConnectionHandler
);
