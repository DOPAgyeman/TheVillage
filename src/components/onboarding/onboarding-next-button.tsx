/* eslint-disable max-lines-per-function */
import { router } from 'expo-router';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import {
  interpolate,
  interpolateColor,
  type SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import type { OnboardingContent } from '@/constants/onboarding-content';
import { Button, View } from '@/ui';

import { ArrowRightIcon } from '../../ui/icons/arrow-right-icon';

type OnboardingNextButtonProps = {
  scrollX: SharedValue<number>;
  listContent: OnboardingContent[];
  windowWidth: number;
  incrementIndex: () => void;
  scrollIndex: number;
};

export const OnboardingNextButton = ({
  scrollX,
  listContent,
  windowWidth,
  incrementIndex,
  scrollIndex,
}: OnboardingNextButtonProps) => {
  const onPressNextButton = useCallback(() => {
    if (scrollIndex === listContent.length - 1) {
      router.push('/welcome');
      return;
    }
    incrementIndex();
  }, [incrementIndex, scrollIndex, listContent]);

  const color = useSharedValue<string>('#000000');
  var buttonText = 'Get started';

  const iconBaseStyles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      width: windowWidth / 4,
    },
  });

  const textBaseStyles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const buttonBaseStyles = StyleSheet.create({
    container: {
      position: 'relative',
      borderRadius: 100,
    },
  });

  const backgroundColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollX.value,
        listContent.map((_, i) => i * windowWidth),
        listContent.map((item) => item.textColor)
      ),
      width: interpolate(
        scrollX.value,
        listContent.map((_, i) => i * windowWidth),
        [windowWidth / 4, windowWidth / 4, windowWidth / 1.25],
        'clamp'
      ),
      height: interpolate(
        scrollX.value,
        listContent.map((_, i) => i * windowWidth),
        [windowWidth / 4, windowWidth / 4, windowWidth / 6],
        'clamp'
      ),
    };
  });

  const animateTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        listContent.map((_, i) => i * windowWidth),
        [0, 0, 1],
        'clamp'
      ),
    };
  });

  const animateIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            listContent.map((_, i) => i * windowWidth),
            [0, 0, windowWidth],
            'clamp'
          ),
        },
      ],
    };
  });

  useAnimatedReaction(
    () => scrollX.value,
    () => {
      color.value = interpolateColor(
        scrollX.value,
        listContent.map((_, i) => i * windowWidth),
        listContent.map((item) => item.backgroundColor)
      );
    }
  );
  return (
    <View className="absolute bottom-[10%]">
      <Button
        testID="onboarding-button"
        animateButtonStyle={[backgroundColorStyle, buttonBaseStyles.container]}
        animateTextStyle={[animateTextStyle, textBaseStyles.container]}
        animateIconStyle={[animateIconStyle, iconBaseStyles.container]}
        variant="iconAndText"
        textClassName="text-white dark:text-black no-underline text-lg"
        icon={
          <ArrowRightIcon
            color={color}
            width={windowWidth / 8}
            height={windowWidth / 8}
          />
        }
        customText={'Get started'}
        onPress={onPressNextButton}
        label={buttonText}
      />
    </View>
  );
};
