/* eslint-disable max-lines-per-function */
import type { FlashList } from '@shopify/flash-list';
import React, { useCallback, useMemo } from 'react';
import { Dimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { ListIndicator } from '@/components/onboarding/onboarding-list-indicator';
import { OnboardingLoginButton } from '@/components/onboarding/onboarding-login-button';
import { OnboardingNextButton } from '@/components/onboarding/onboarding-next-button';
import { OnboardingScrollList } from '@/components/onboarding/onboarding-scroll-list';
import { OnboardingSkipButton } from '@/components/onboarding/onboarding-skip-button';
import { ScrollBackgroundColor } from '@/components/onboarding/scroll-background-color';
import { content } from '@/constants/onboarding-content';
import { useScrollIndex } from '@/core/zustand/use-scroll-index';
import { View } from '@/ui';

const Welcome = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const scrollX = React.useRef(useSharedValue(0)).current;
  const scrollIndex = useScrollIndex((state) => state.index);
  const incrementIndex = useScrollIndex((state) => state.incrementIndex);
  const setIndex = useScrollIndex((state) => state.setIndex);
  const ref = React.useRef<FlashList<any>>(null);

  const onPressNextButton = useCallback(() => {
    if (scrollIndex === content.length - 1) {
      console.log('end');
      return;
    }
    incrementIndex();
  }, [incrementIndex, scrollIndex]);

  const onPressSkipButton = useCallback(() => {
    setIndex(2);
  }, [setIndex]);

  const onPressLoginButton = useCallback(() => {
    console.log('login');
  }, []);
  useMemo(() => {
    ref.current?.scrollToIndex({ animated: true, index: scrollIndex });
  }, [scrollIndex]);

  return (
    <View className="relative h-full items-center">
      <ScrollBackgroundColor
        scrollX={scrollX}
        listContent={content}
        windowWidth={windowWidth}
      />
      <OnboardingScrollList
        ref={ref}
        scrollX={scrollX}
        scrollIndex={scrollIndex}
        setIndex={setIndex}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
      />
      <View className="gap- absolute bottom-[28%] flex-row items-center gap-3">
        {content.map((item, i) => {
          return (
            <ListIndicator
              key={`Indicator-${i}`}
              scrollX={scrollX}
              listContent={content}
              listContentIndex={i}
              windowWidth={windowWidth}
            />
          );
        })}
      </View>

      <OnboardingNextButton
        scrollX={scrollX}
        listContent={content}
        windowWidth={windowWidth}
        onPress={onPressNextButton}
      />
      {scrollIndex === 2 ? (
        <OnboardingLoginButton
          scrollX={scrollX}
          listContent={content}
          windowWidth={windowWidth}
          onPress={onPressLoginButton}
        />
      ) : (
        <OnboardingSkipButton
          scrollX={scrollX}
          listContent={content}
          windowWidth={windowWidth}
          onPress={onPressSkipButton}
        />
      )}
    </View>
  );
};

export default Welcome;
