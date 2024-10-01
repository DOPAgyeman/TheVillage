import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';

import {
  showNetworkConnectionErrorMessage,
  showNetworkConnectionSuccessMessage,
} from '@/ui/flash-message';

import colors from '../constants/colors';
import { useThemeConfig } from './use-theme-config';
import { useNetworkConnectionHandler } from './zustand/use-network-connection-handler';

export function useNetworkInfo() {
  const colorTheme = useThemeConfig();
  const isWaitingToReconnect =
    useNetworkConnectionHandler.use.isWaitingToReconnect();
  const setIsWaitingToReconnect =
    useNetworkConnectionHandler.use.setIsWaitingToReconnect();

  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected);
      if (state.isConnected === true && isWaitingToReconnect === true) {
        showNetworkConnectionSuccessMessage({
          message: 'Your network connection has been restored.',
          backgroundColor: colorTheme.dark
            ? colors.lightCream
            : colors.lightBlack,
          titleColor: colorTheme.dark ? colors.black : colors.white,
        });
        setIsWaitingToReconnect(false);
      } else if (state.isConnected === false && isWaitingToReconnect !== true) {
        showNetworkConnectionErrorMessage({
          message: 'You are not connected to the internet.',
          backgroundColor: colorTheme.dark
            ? colors.lightCream
            : colors.lightBlack,
          titleColor: colorTheme.dark ? colors.black : colors.white,
        });
        setIsWaitingToReconnect(true);
      }
    });
  });
}
