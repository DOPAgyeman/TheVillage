import React from 'react';

import { Button, View } from '@/ui';
import { Options, useModal } from '@/ui';

export function NetworkInfo() {
  const modal = useModal();
  return (
    <View className="absolute inset-x-0 bottom-60 z-50">
      <Button label="test" variant="ghost" onPress={modal.present} />
      <Options
        ref={modal.ref}
        options={[
          { label: '3', value: 'en' },
          { label: '4', value: 'ar' },
        ]}
        onSelect={() => {}}
      />
    </View>
  );
}
