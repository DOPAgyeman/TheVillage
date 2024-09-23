import { addEventListener } from '@react-native-community/netinfo';
import React from 'react';

import colors from '@/constants/colors';
import { Button, View } from '@/ui';
import {
  showNetworkConnectionErrorMessage,
  showNetworkConnectionSuccessMessage,
} from '@/ui/flash-message';

import { useNetworkConnectionHandler } from './zustand/use-network-connection-handler';

export function NetworkInfo() {
  const isWaitingToReconnect =
    useNetworkConnectionHandler.use.isWaitingToReconnect();
  const setIsWaitingToReconnect =
    useNetworkConnectionHandler.use.setIsWaitingToReconnect();

  // Subscribe
  const unsubscribe = addEventListener((state) => {
    if (state.isConnected === false) {
      showNetworkConnectionErrorMessage({
        message: 'You are not connected to the internet.',
        backgroundColor: colors.lightBlack,
      });
      setIsWaitingToReconnect(true);
    } else if (state.isConnected === true && isWaitingToReconnect === true) {
      showNetworkConnectionSuccessMessage({
        message: 'Your internet connection has been restored.',
        backgroundColor: colors.lightBlack,
      });
      setIsWaitingToReconnect(false);
    }
  });

  unsubscribe();
  return (
    <View className="absolute inset-x-0 bottom-60 z-50">
      <Button
        label="test"
        variant="ghost"
        onPress={() =>
          showNetworkConnectionErrorMessage({
            message: 'You are not connected to the internet.',
            description: '',
            backgroundColor: colors.lightBlack,
          })
        }
      />
    </View>
  );
}
