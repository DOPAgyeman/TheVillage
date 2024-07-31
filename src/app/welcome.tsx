import React from 'react';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import { Image } from '@/ui';
import { Button, View } from '@/ui';
import { FocusAwareStatusBar } from '@/ui';

import WelcomeAnimation from '../components/typing-animation';

const Welcome = () => {
  return (
    <View className="flex h-full w-full justify-center bg-lightGray">
      <FocusAwareStatusBar />
      <View className="flex h-full justify-between">
        <View className="flex h-1/2 items-center justify-end">
          <View className="w-full gap-16">
            <Animated.View entering={FadeInUp.duration(900).delay(1600)}>
              <Image
                className="h-28 w-28 self-center overflow-hidden rounded-full"
                contentFit="cover"
                source={require('/assets/icon.png')}
              />
            </Animated.View>

            <WelcomeAnimation />
          </View>
        </View>
        <Animated.View
          entering={FadeInDown.duration(700).delay(1800)}
          className="flex h-1/2 w-full justify-end py-20 placeholder:px-10"
        >
          <Button
            label="Log in"
            variant="default"
            size="lg"
            onPress={() => {}}
          />
          <Button label="Sign up" variant="outline" size="lg" />
        </Animated.View>
      </View>
    </View>
  );
};

export default Welcome;
