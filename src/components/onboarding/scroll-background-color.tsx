import React from 'react';
import { StyleSheet } from 'react-native'; // Import StyleSheet module
import Animated, {
  interpolateColor,
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import type { OnboardingContent } from '@/constants/onboarding-content';

type ScrollBackgroundColorProps = {
  scrollX: SharedValue<number>;
  listContent: OnboardingContent[];
  windowWidth: number;
};

export const ScrollBackgroundColor = ({
  scrollX,
  listContent,
  windowWidth,
}: ScrollBackgroundColorProps) => {
  const backgroundColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollX.value,
        listContent.map((_, i) => i * windowWidth),
        listContent.map((item) => item.backgroundColor)
      ),
    };
  });
  return (
    <Animated.View
      style={[backgroundColorStyle, StyleSheet.absoluteFillObject]}
    />
  );
};
