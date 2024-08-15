import React, { useCallback } from 'react';
import Animated, {
  interpolateColor,
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import type { OnboardingContent } from '@/constants/onboarding-content';
import { Button } from '@/ui';

type OnboardingSkipButtonProps = {
  scrollX: SharedValue<number>;
  listContent: OnboardingContent[];
  windowWidth: number;
  setIndex: (index: number) => void;
};

export const OnboardingSkipButton = ({
  scrollX,
  listContent,
  windowWidth,
  setIndex,
}: OnboardingSkipButtonProps) => {
  const onPressSkipButton = useCallback(() => {
    setIndex(2);
  }, [setIndex]);

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
        label={'Skip'}
        animateTextStyle={animateTextStyle}
        onPress={onPressSkipButton}
        textClassName="no-underline"
      />
    </Animated.View>
  );
};
