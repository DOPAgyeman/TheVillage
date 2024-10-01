/* eslint-disable max-lines-per-function */
import type { ReactNode } from 'react';
import React from 'react';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { ActivityIndicator, Pressable } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  ReduceMotion,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import type { View } from '@/ui';
const button = tv({
  slots: {
    container: 'flex flex-row items-center justify-center rounded-full px-4',
    label: 'font-inter text-base font-medium',
    indicator: 'h-6 text-white',
  },

  variants: {
    variant: {
      default: {
        container: 'bg-primary dark:bg-secondaryGreen',
        label: 'text-lg text-white dark:text-lightCream',
        indicator: 'text-white dark:text-lightCream',
      },
      secondary: {
        container: 'bg-black',
        label: 'text-white',
        indicator: 'text-white',
      },
      outline: {
        container: 'border border-lightGray dark:border-lightBlack',
        label: 'text-black dark:text-white',
        indicator: 'text-black dark:text-white',
      },
      destructive: {
        container: 'bg-purple',
        label: 'text-white',
        indicator: 'text-white',
      },
      ghost: {
        container: 'bg-transparent',
        label: 'text-black underline dark:text-white',
        indicator: 'text-black dark:text-white',
      },
      link: {
        container: 'bg-transparent',
        label: 'text-black',
        indicator: 'text-black',
      },
      iconAndText: {
        container: 'bg-transparent',
        label: 'text-black underline dark:text-white',
        indicator: 'text-white dark:text-lightCream',
      },
    },
    size: {
      default: {
        container: 'h-[4.25rem]',
        label: 'text-base',
      },
      lg: {
        container: 'h-20',
        label: 'text-base',
      },
      sm: {
        container: 'h-8',
        label: 'text-base',
        indicator: 'h-2',
      },
      icon: { container: 'h-14 w-14' },
    },
    disabled: {
      true: {
        container: 'bg-lightGray dark:bg-lightBlack',
        label: 'text-darkGray dark:text-darkGray',
        indicator: 'text-darkGray dark:text-lightGray',
      },
    },
    fullWidth: {
      true: {
        container: '',
      },
      false: {
        container: 'self-center',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    disabled: false,
    fullWidth: true,
    size: 'default',
  },
});

type ButtonVariants = VariantProps<typeof button>;
interface Props extends ButtonVariants, Omit<PressableProps, 'disabled'> {
  label?: string;
  loading?: boolean;
  className?: string;
  textClassName?: string;
  animateButtonStyle?: [ViewStyle] | StyleProp<any>;
  animateTextStyle?: [ViewStyle] | StyleProp<any>;
  animateIconStyle?: [ViewStyle] | StyleProp<any>;
  icon?: ReactNode;
  shouldScaleOnPress?: boolean;
}

export const Button = React.forwardRef<View, Props>(
  (
    {
      label: text,
      loading = false,
      variant = 'default',
      disabled = false,
      size = 'default',
      className = '',
      testID,
      animateButtonStyle,
      animateTextStyle,
      animateIconStyle,
      icon,
      textClassName = 'text-lg',
      shouldScaleOnPress = true,
      ...props
    },
    ref
  ) => {
    const styles = React.useMemo(
      () => button({ variant, disabled, size }),
      [variant, disabled, size]
    );

    const buttonOpacity = useSharedValue(1);
    const buttonScale = useSharedValue(1);
    const hasPressed = useSharedValue(false);

    const buttonStyle = useAnimatedStyle(() => {
      return {
        opacity: buttonOpacity.value,
        transform: [
          {
            scale: buttonScale.value,
          },
        ],
      };
    });

    useAnimatedReaction(
      () => hasPressed.value,
      (pressed) => {
        if (pressed === true) {
          cancelAnimation(buttonOpacity);
          cancelAnimation(buttonScale);
          buttonOpacity.value = withTiming(0.925, {
            duration: 200,
            easing: Easing.elastic(0),
            reduceMotion: ReduceMotion.System,
          });
          if (shouldScaleOnPress) {
            buttonScale.value = withSpring(0.96, {
              duration: 200,
              dampingRatio: 0.7,
              stiffness: 254,
              overshootClamping: false,
              restDisplacementThreshold: 42.22,
              restSpeedThreshold: 0.01,
              reduceMotion: ReduceMotion.System,
            });
          }
        } else if (pressed === false) {
          cancelAnimation(buttonOpacity);
          cancelAnimation(buttonScale);
          buttonOpacity.value = withTiming(1, {
            duration: 200,
            easing: Easing.elastic(0),
            reduceMotion: ReduceMotion.System,
          });
          if (shouldScaleOnPress) {
            buttonScale.value = withSpring(1, {
              duration: 200,
              dampingRatio: 0.7,
              stiffness: 254,
              overshootClamping: false,
              restDisplacementThreshold: 42.22,
              restSpeedThreshold: 0.01,
              reduceMotion: ReduceMotion.System,
            });
          }
        }
      }
    );

    return (
      <Animated.View style={buttonStyle}>
        <Pressable
          disabled={disabled || loading}
          className={styles.container({ className })}
          {...props}
          ref={ref}
          testID={testID}
          onPressIn={() => {
            hasPressed.value = true;
          }}
          onPressOut={() => {
            hasPressed.value = false;
          }}
        >
          {props.children ? (
            loading ? (
              <ActivityIndicator
                size="small"
                className={styles.indicator()}
                testID={testID ? `${testID}-activity-indicator` : undefined}
              />
            ) : (
              props.children
            )
          ) : (
            <Animated.View style={animateButtonStyle}>
              {loading ? (
                <ActivityIndicator
                  size="small"
                  className={styles.indicator()}
                  testID={testID ? `${testID}-activity-indicator` : undefined}
                />
              ) : variant === 'iconAndText' ? (
                <>
                  <Animated.View style={animateIconStyle}>{icon}</Animated.View>
                  <Animated.View style={animateTextStyle}>
                    <Animated.Text
                      className={styles.label({ className: textClassName })}
                    >
                      {text}
                    </Animated.Text>
                  </Animated.View>
                </>
              ) : (
                <Animated.Text
                  style={animateTextStyle}
                  testID={testID ? `${testID}-label` : undefined}
                  className={styles.label({ className: textClassName })}
                >
                  {text}
                </Animated.Text>
              )}
            </Animated.View>
          )}
        </Pressable>
      </Animated.View>
    );
  }
);
