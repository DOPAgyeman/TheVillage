import React from 'react';

import { View } from '@/ui';
import { FocusAwareStatusBar } from '@/ui';

import SignUpTypingAnimation from '../components/typing-animation';

const welcome = () => {
  return (
    <View className="flex h-full items-center justify-center bg-lightGray">
      <FocusAwareStatusBar />
      <View className="w-full">
        <SignUpTypingAnimation />
      </View>
    </View>
  );
};

export default welcome;
