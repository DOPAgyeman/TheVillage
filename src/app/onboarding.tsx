import React from 'react';
import { Dimensions } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';

import { ListIndicator } from '@/components/onboarding/onboarding-list-indicator';
import { OnboardingLoginButton } from '@/components/onboarding/onboarding-login-button';
import { OnboardingNextButton } from '@/components/onboarding/onboarding-next-button';
import { OnboardingScrollList } from '@/components/onboarding/onboarding-scroll-list';
import { OnboardingSkipButton } from '@/components/onboarding/onboarding-skip-button';
import { ScrollBackgroundColor } from '@/components/onboarding/scroll-background-color';
import { content } from '@/constants/onboarding-content';
import { useScrollIndex } from '@/core/zustand/use-scroll-index';
import { View } from '@/ui';

const Onboarding = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const scrollX = React.useRef(useSharedValue(0)).current;
  const scrollIndex = useScrollIndex.use.index();
  const incrementIndex = useScrollIndex.use.incrementIndex();
  const setIndex = useScrollIndex.use.setIndex();

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
      />

      {scrollIndex === 2 ? (
        <OnboardingLoginButton
          scrollX={scrollX}
          listContent={content}
          windowWidth={windowWidth}
        />
      ) : (
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
