import { FlashList } from '@shopify/flash-list';
import type { JSXElementConstructor, ReactElement } from 'react';
import React from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

import type { OnboardingContent } from '@/constants/onboarding-content';
import { content } from '@/constants/onboarding-content';
import { Image, Text, View } from '@/ui';

type AnimatedFlashListProps = {
  data: OnboardingContent[];
  horizontal: boolean;
  showsHorizontalScrollIndicator: boolean;
  pagingEnabled: boolean;
  keyExtractor: (item: OnboardingContent) => string;
  scrollEventThrottle: number;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  renderItem: (
    item: any
  ) => ReactElement<any | string | JSXElementConstructor<any>>;
  estimatedItemSize: number;
  initialScrollIndex: number;
};

const AnimatedFlashList = Animated.createAnimatedComponent(
  React.forwardRef(
    (props: AnimatedFlashListProps, ref: React.Ref<FlashList<any>>) => (
      <FlashList<any> {...props} ref={ref} />
    )
  )
);

type OnboardingScrollListProps = {
  scrollX: SharedValue<number>;
  scrollIndex: number;
  setIndex: (index: number) => void;
  windowWidth: number;
  windowHeight: number;
};

export const OnboardingScrollList = React.forwardRef<
  FlashList<any>,
  OnboardingScrollListProps
>(({ scrollX, scrollIndex, setIndex, windowWidth, windowHeight }, ref) => {
  return (
    <AnimatedFlashList
      ref={ref}
      data={content}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      keyExtractor={(item) => item.key}
      scrollEventThrottle={32}
      onScroll={useAnimatedScrollHandler({
        onScroll: (event) => {
          scrollX.value = event.contentOffset.x;
        },
        onMomentumEnd: () => {
          if (scrollX.value === 0 && scrollIndex !== 0) {
            runOnJS(setIndex)(0);
          } else if (scrollX.value === windowWidth && scrollIndex !== 1) {
            runOnJS(setIndex)(1);
          } else if (scrollX.value === windowWidth * 2 && scrollIndex !== 2) {
            runOnJS(setIndex)(2);
          }
        },
      })}
      estimatedItemSize={361}
      initialScrollIndex={scrollIndex}
      renderItem={({ item }: { item: OnboardingContent }) => {
        return (
          <View className="relative h-2/3 w-screen items-center justify-end">
            <View className="h-1/2 justify-center">
              <Image
                source={item.image}
                style={{
                  width: windowWidth * 0.95,
                  height: windowWidth / 1.7,
                  maxHeight: windowHeight / 2,
                }}
                contentFit="contain"
              />
            </View>
            <View className="px-7">
              <Text
                className="py-7 text-3xl font-bold"
                style={{ color: item.textColor }}
              >
                {item.title}
              </Text>
              <Text
                className="text-lg font-normal"
                style={{ color: item.textColor }}
              >
                {item.description}
              </Text>
            </View>
          </View>
        );
      }}
    />
  );
});
