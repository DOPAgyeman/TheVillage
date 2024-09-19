import { addEventListener } from '@react-native-community/netinfo';
import React from 'react';

import { NetworkConnectionModal } from '@/components/network-connection-modal';
import { Button, View } from '@/ui';
import { useModal } from '@/ui';

export function NetworkInfo() {
  const modal = useModal();
  // Subscribe
  const unsubscribe = addEventListener((state) => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
  });

  unsubscribe();
  return (
    <View className="absolute inset-x-0 bottom-60 z-50">
      <Button label="test" variant="ghost" onPress={modal.present} />
      <NetworkConnectionModal ref={modal.ref} />
    </View>
  );
}
