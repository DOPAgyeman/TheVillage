import React from 'react';
import { Dimensions } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';

import { ListIndicator } from '@/components/onboarding/onboarding-list-indicator';
import { OnboardingNextButton } from '@/components/onboarding/onboarding-next-button';
import { OnboardingScrollList } from '@/components/onboarding/onboarding-scroll-list';
import { OnboardingSkipButton } from '@/components/onboarding/onboarding-skip-button';
import { ScrollBackgroundColor } from '@/components/onboarding/scroll-background-color';
import { content } from '@/constants/onboarding-content';
import { useOnboardingScrollIndex } from '@/core/zustand/use-onboarding-scroll-index';
import { View } from '@/ui';

const Onboarding = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const scrollX = React.useRef(useSharedValue(0)).current;
  const scrollIndex = useOnboardingScrollIndex.use.index();
  const incrementIndex = useOnboardingScrollIndex.use.incrementIndex();
  const setIndex = useOnboardingScrollIndex.use.setIndex();

  return (
    <Animated.View className="relative h-full items-center">
      <ScrollBackgroundColor
        scrollX={scrollX}
        listContent={content}
        windowWidth={windowWidth}
      />

      <OnboardingScrollList
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
        incrementIndex={incrementIndex}
        scrollIndex={scrollIndex}
        setIndex={setIndex}
      />

      {scrollIndex !== 2 && (
        <OnboardingSkipButton
          scrollX={scrollX}
          listContent={content}
          windowWidth={windowWidth}
          setIndex={setIndex}
        />
      )}
    </Animated.View>
  );
};

export default Onboarding;
