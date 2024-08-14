import React from 'react';
import Animated, {
  interpolate,
  interpolateColor,
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import type { OnboardingContent } from '@/constants/onboarding-content';

type ListIndicatorProps = {
  scrollX: SharedValue<number>;
  listContent: OnboardingContent[];
  listContentIndex: number;
  windowWidth: number;
};

export const ListIndicator = ({
  scrollX,
  listContent,
  listContentIndex,
  windowWidth,
}: ListIndicatorProps) => {
  const listIndicatorStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [
          (listContentIndex - 1) * windowWidth,
          listContentIndex * windowWidth,
          (listContentIndex + 1) * windowWidth,
        ],
        [0.4, 1, 0.4],
        'clamp'
      ),
      backgroundColor: interpolateColor(
        scrollX.value,
        listContent.map((_, i) => i * windowWidth),
        listContent.map((item) => item.textColor)
      ),
      width: interpolate(
        scrollX.value,
        [
          (listContentIndex - 1) * windowWidth,
          listContentIndex * windowWidth,
          (listContentIndex + 1) * windowWidth,
        ],
        [12, 30, 12],
        'clamp'
      ),
      height: interpolate(
        scrollX.value,
        [
          (listContentIndex - 1) * windowWidth,
          listContentIndex * windowWidth,
          (listContentIndex + 1) * windowWidth,
        ],
        [12, 10, 12],
        'clamp'
      ),
    };
  });
  return (
    <Animated.View>
      <Animated.View
        className="h-[12px] w-[12px] rounded-full bg-white"
        style={[listIndicatorStyle]}
      />
    </Animated.View>
  );
};
