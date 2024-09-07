import React from 'react';
import type { SharedValue } from 'react-native-reanimated';

import type { OnboardingContent } from '@/constants/onboarding-content';
import { content } from '@/constants/onboarding-content';
import { Image, Text, View } from '@/ui';

import AnimatedFlashList from '../animated-flash-list';

type OnboardingScrollListProps = {
  scrollX: SharedValue<number>;
  scrollIndex: number;
  setIndex: (index: number) => void;
  windowWidth: number;
  windowHeight: number;
};

export const OnboardingScrollList = ({
  scrollX,
  scrollIndex,
  setIndex,
  windowWidth,
  windowHeight,
}: OnboardingScrollListProps) => {
  return (
    <AnimatedFlashList
      scrollX={scrollX}
      setIndex={setIndex}
      scrollIndex={scrollIndex}
      data={content}
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEnabled
      pagingEnabled
      keyExtractor={(item: OnboardingContent) => item.key}
      scrollEventThrottle={32}
      estimatedItemSize={361}
      initialScrollIndex={scrollIndex}
      getItemType={(item: OnboardingContent) => {
        return item.key;
      }}
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
};
