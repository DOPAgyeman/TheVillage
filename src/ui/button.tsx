/* eslint-disable max-lines-per-function */
import type { ReactNode } from 'react';
import React from 'react';
import type { PressableProps, StyleProp, View, ViewStyle } from 'react-native';
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

const button = tv({
  slots: {
    container:
      'my-2 flex flex-row items-center justify-center rounded-full px-4',
    label: 'font-inter text-base font-semibold',
    indicator: 'h-6 text-white',
  },

  variants: {
    variant: {
      default: {
        container: 'bg-primary dark:bg-lightCream',
        label: 'text-white dark:text-black',
        indicator: 'text-white dark:text-black',
      },
      secondary: {
        container: 'bg-black',
        label: 'text-white',
        indicator: 'text-white',
      },
      outline: {
        container: 'border-darkGreen border',
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
        indicator: 'text-white dark:text-black',
      },
    },
    size: {
      default: {
        container: 'h-[3.4rem]',
        label: 'text-base',
      },
      lg: {
        container: 'h-[3.4rem]',
        label: 'text-base',
      },
      sm: {
        container: 'h-8',
        label: 'text-base',
        indicator: 'h-2',
      },
      icon: { container: 'h-9 w-9' },
    },
    disabled: {
      true: {
        container: 'bg-gray dark:bg-gray',
        label: 'text-black dark:text-lightCream',
        indicator: 'text-gray dark:text-lightCream',
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
  customText?: ReactNode;
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
      customText,
      textClassName = '',
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
          buttonOpacity.value = withTiming(0.8, {
            duration: 200,
            easing: Easing.elastic(0),
            reduceMotion: ReduceMotion.System,
          });

          buttonScale.value = withSpring(0.96, {
            duration: 200,
            dampingRatio: 0.7,
            stiffness: 254,
            overshootClamping: false,
            restDisplacementThreshold: 42.22,
            restSpeedThreshold: 0.01,
            reduceMotion: ReduceMotion.System,
          });
        } else if (pressed === false) {
          cancelAnimation(buttonOpacity);
          cancelAnimation(buttonScale);
          buttonOpacity.value = withTiming(1, {
            duration: 200,
            easing: Easing.elastic(0),
            reduceMotion: ReduceMotion.System,
          });
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
    );

    return (
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
          props.children
        ) : (
          <Animated.View style={[buttonStyle, animateButtonStyle]}>
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
                    {customText}
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
    );
  }
);
