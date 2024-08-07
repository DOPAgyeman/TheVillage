/* eslint-disable max-lines-per-function */
import React from 'react';
import { memo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { ReText } from 'react-native-redash';

import { content } from '../constants/welcome-animated-text';

const AnimatedIntro = () => {
  const { width } = useWindowDimensions();
  const ballWidth = 1.5;
  const half = width / 2 - ballWidth / 2;
  const ballOpacity = useSharedValue(1);

  const currentX = useSharedValue(half);
  const currentIndex = useSharedValue(0);
  const isAtStart = useSharedValue(true);
  const labelWidth = useSharedValue(0);
  const canGoToNext = useSharedValue(false);
  const didPlay = useSharedValue(false);

  const newColorIndex = useDerivedValue(() => {
    if (!isAtStart.value) {
      return (currentIndex.value + 1) % content.length;
    }
    return currentIndex.value;
  }, [currentIndex]);

  const textStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        currentX.value,
        [half, half + labelWidth.value / 8],
        [
          content[newColorIndex.value].fontColor,
          content[currentIndex.value].fontColor,
        ],
        'RGB'
      ),
      transform: [
        {
          translateX: interpolate(
            currentX.value,
            [half, half + labelWidth.value / 2],
            [half + 4, half - labelWidth.value / 2]
          ),
        },
      ],
    };
  }, [currentIndex, currentX]);

  const ballStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        currentX.value,
        [half, half + labelWidth.value / 8],
        [
          content[newColorIndex.value].fontColor,
          content[currentIndex.value].fontColor,
        ],
        'RGB'
      ),
      transform: [{ translateX: currentX.value - ballWidth }],
      opacity: ballOpacity.value,
    };
  });

  const mask = useAnimatedStyle(
    () => ({
      transform: [{ translateX: currentX.value }],
      width: width / 1.5,
    }),
    [currentIndex, currentX, labelWidth]
  );

  const style1 = useAnimatedStyle(() => ({
    opacity: interpolate(1, [1, 0], [1, 0, 0, 0, 0, 0, 0]),
    transform: [
      {
        translateX: interpolate(
          1,
          [1, 0],
          [0, -width * 2, -width, -width, -width, -width, -width]
        ),
      },
    ],
  }));

  const text = useDerivedValue(() => {
    const index = currentIndex.value;
    return content[index].title;
  }, [currentIndex]);

  useAnimatedReaction(
    () => labelWidth.value,
    (newWidth) => {
      currentX.value = withDelay(
        900,
        withTiming(
          half + newWidth / 2,
          {
            duration: 975,
            easing: Easing.out(
              Easing.steps(content[currentIndex.value].title.length, false)
            ),
          },
          (currentXFinished) => {
            if (currentXFinished) {
              canGoToNext.value = true;
              isAtStart.value = false;
              ballOpacity.value = withDelay(
                200,
                withRepeat(
                  withTiming(0, {
                    duration: 550,
                    easing: Easing.steps(1, true),
                  }),
                  1,
                  false,
                  (finished) => {
                    if (finished) {
                      cancelAnimation(ballOpacity);
                      ballOpacity.value = 1;
                    }
                  }
                )
              );
            }
          }
        )
      );
    },
    [labelWidth, currentX, half]
  );

  useAnimatedReaction(
    () => canGoToNext.value,
    (next) => {
      if (next) {
        canGoToNext.value = false;
        currentX.value = withDelay(
          900,
          withTiming(
            half,
            {
              duration: 975,
              easing: Easing.out(
                Easing.steps(content[currentIndex.value].title.length, false)
              ),
            },
            (nextFinished) => {
              if (nextFinished) {
                ballOpacity.value = withDelay(
                  200,
                  withRepeat(
                    withTiming(0, {
                      duration: 550,
                      easing: Easing.steps(1, true),
                    }),
                    1,
                    false,
                    (finished) => {
                      if (finished) {
                        cancelAnimation(ballOpacity);
                        ballOpacity.value = 1;
                      }
                    }
                  )
                );
                currentIndex.value = (currentIndex.value + 1) % content.length;
                isAtStart.value = true;
                didPlay.value = false;
              }
            }
          )
        );
      }
    },
    [currentX, labelWidth]
  );

  return (
    <Animated.View style={[styles.wrapper, style1]}>
      <Animated.View style={[styles.content]}>
        <Animated.View style={[styles.ball, ballStyle]} />
        <Animated.View style={[styles.mask, mask]} />
        <ReText
          onLayout={(e) => {
            labelWidth.value = e.nativeEvent.layout.width + 4;
          }}
          style={[styles.title, textStyle]}
          text={text}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F2F0E9',
  },
  mask: {
    zIndex: 1,
    position: 'absolute',
    left: '0%',
    height: 44,
    backgroundColor: '#F2F0E9',
  },
  ball: {
    width: 1.5,
    zIndex: 10,
    height: 34,
    position: 'absolute',
    left: '0%',
  },
  titleText: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    left: '0%',
    position: 'absolute',
  },
  content: {
    gap: 0,
  },
});
export default memo(AnimatedIntro);
