import React, { useCallback } from 'react';
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
};

export const OnboardingLoginButton = ({
  scrollX,
  listContent,
  windowWidth,
}: OnboardingLoginButtonProps) => {
  const onPressLoginButton = useCallback(() => {
    console.log('login');
  }, []);
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
        onPress={onPressLoginButton}
        textClassName="no-underline"
      />
    </Animated.View>
  );
};
