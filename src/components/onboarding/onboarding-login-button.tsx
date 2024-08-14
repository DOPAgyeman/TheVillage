import React from 'react';
import Animated, {
  interpolateColor,
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import type { OnboardingContent } from '@/constants/onboarding-content';
import { Button } from '@/ui';

type OnboardingLoginButtonProps = {
  scrollX: SharedValue<number>;
  listContent: OnboardingContent[];
  windowWidth: number;
  onPress: () => void;
};

export const OnboardingLoginButton = ({
  scrollX,
  listContent,
  windowWidth,
  onPress,
}: OnboardingLoginButtonProps) => {
  const animateTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        scrollX.value,
        listContent.map((_, i) => i * windowWidth),
        listContent.map((item) => item.textColor)
      ),
    };
  });

  return (
    <Animated.View className="absolute right-0 top-14 w-1/4">
      <Button
        variant="ghost"
        label={'Log in'}
        animateTextStyle={animateTextStyle}
        onPress={onPress}
        textClassName="no-underline"
      />
    </Animated.View>
  );
};
