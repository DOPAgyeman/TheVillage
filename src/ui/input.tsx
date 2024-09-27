/* eslint-disable max-lines-per-function */
import Ionicons from '@expo/vector-icons/Ionicons';
import * as React from 'react';
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { TextInput, TextInputProps } from 'react-native';
import type { InputModeOptions } from 'react-native';
import { I18nManager, Pressable, StyleSheet, View } from 'react-native';
import { TextInput as NTextInput } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { tv } from 'tailwind-variants';

import { useThemeConfig } from '@/core/use-theme-config';
import { useBooleanHandler } from '@/core/zustand/use-boolean-handler';

import colors from '../constants/colors';
import { Text } from './text';

export const inputTv = tv({
  slots: {
    container: 'justify-center',
    label: 'absolute px-4 text-lg text-darkGray dark:text-darkGray',
    input:
      'w-full rounded-xl border border-darkGray pb-4 pl-4 pr-14 pt-8 text-base text-black placeholder-white focus:border-primary focus:ring-gray dark:border-lightBlack dark:text-white  dark:placeholder-white dark:focus:border-secondaryGreen dark:focus:ring-secondaryGreen',
    icon: 'absolute right-0 top-0 h-2/3 w-2/12 items-center justify-center',
  },

  variants: {
    focused: {
      true: {
        input: 'border-gray dark:border-lightBlack',
      },
    },
    error: {
      true: {
        input:
          'border-gray focus:border-darkRed dark:border-lightBlack dark:focus:border-lightRed',
        label: 'text-darkGray dark:text-darkGray',
      },
    },
    disabled: {
      true: {
        input: 'bg-darkGray dark:bg-black',
      },
    },
  },
  defaultVariants: {
    focused: false,
    error: false,
    disabled: false,
  },
});

export interface NInputProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
  error?: string;
  onPressErase?: () => void;
  inputType?: InputModeOptions | 'date' | 'password';
}

type TRule<T extends FieldValues> = Omit<
  RegisterOptions<T, Path<T>>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

export type RuleType<T extends FieldValues> = { [name in keyof T]: TRule<T> };
export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: TRule<T>;
};

interface ControlledInputProps<T extends FieldValues>
  extends NInputProps,
    InputControllerType<T> {}

export const Input = React.forwardRef<TextInput, NInputProps>((props, ref) => {
  const {
    label,
    error,
    testID,
    value,
    onPressErase,
    inputType,

    ...inputProps
  } = props;
  const labelAnimate = useSharedValue<number>(value ? 0 : 1);
  const isFocussed = useBooleanHandler.use.boolean();
  const toggleIsFocussed = useBooleanHandler.use.toggleBoolean();
  const [showPassword, setShowPassword] = React.useState(false);

  const onBlur = React.useCallback(() => {
    toggleIsFocussed();
    if (!value) {
      labelAnimate.value = withTiming(1, {
        duration: 200,
        easing: Easing.in(Easing.ease),
        reduceMotion: ReduceMotion.System,
      });
    }
  }, [toggleIsFocussed, labelAnimate, value]);
  const onFocus = React.useCallback(() => {
    toggleIsFocussed();
    labelAnimate.value = withTiming(0, {
      duration: 200,
      easing: Easing.out(Easing.ease),
      reduceMotion: ReduceMotion.System,
    });
  }, [toggleIsFocussed, labelAnimate]);

  const styles = React.useMemo(
    () =>
      inputTv({
        error: Boolean(error),
        focused: isFocussed,
        disabled: Boolean(props.disabled),
      }),
    [error, isFocussed, props.disabled]
  );

  const labelStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(labelAnimate.value, [0, 1], [0.9, 1]),
        },
        { translateX: interpolate(labelAnimate.value, [0, 1], [-3, 0]) },
      ],
      paddingBottom: interpolate(labelAnimate.value, [0, 1], [24, 0]),
    };
  });

  const theme = useThemeConfig();

  return (
    <View className="relative gap-4">
      <View className={styles.container()}>
        {label && (
          <Animated.Text
            testID={testID ? `${testID}-label` : undefined}
            className={styles.label()}
            style={labelStyle}
          >
            {label}
          </Animated.Text>
        )}
        <NTextInput
          testID={testID}
          ref={ref}
          placeholderTextColor={colors.black}
          selectionColor={theme.dark ? colors.secondaryGreen : colors.primary}
          className={styles.input()}
          onBlur={onBlur}
          onFocus={onFocus}
          {...inputProps}
          style={StyleSheet.flatten([
            { writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' },
            inputProps.style,
          ])}
          secureTextEntry={inputType === 'password' ? !showPassword : false}
        />
      </View>

      <Text
        testID={testID ? `${testID}-error` : undefined}
        className="text-sm text-darkRed dark:text-lightRed"
      >
        {error}
      </Text>
      <View className={styles.icon()}>
        {inputType === 'password' ? (
          showPassword ? (
            <Pressable onPress={() => setShowPassword(false)}>
              <Ionicons
                name="eye-outline"
                color={colors.darkGray}
                adjustsFontSizeToFit={true}
                size={22}
              />
            </Pressable>
          ) : !showPassword ? (
            <Pressable onPress={() => setShowPassword(true)}>
              <Ionicons
                name="eye-off-outline"
                color={colors.darkGray}
                adjustsFontSizeToFit={true}
                size={22}
              />
            </Pressable>
          ) : null
        ) : error ? (
          !value ? null : inputType === 'date' ? null : (
            <Pressable onPress={onPressErase}>
              <Ionicons
                name="close-outline"
                color={theme.dark ? colors.lightRed : colors.darkRed}
                adjustsFontSizeToFit={true}
                size={30}
              />
            </Pressable>
          )
        ) : !value ? null : inputType === 'date' ? null : (
          <Ionicons
            name="checkmark-outline"
            color={theme.dark ? colors.secondaryGreen : colors.primary}
            adjustsFontSizeToFit={true}
            size={30}
          />
        )}
      </View>
    </View>
  );
});

// only used with react-hook-form
export function ControlledInput<T extends FieldValues>(
  props: ControlledInputProps<T>
) {
  const { name, control, rules, ...inputProps } = props;
  const { field, fieldState } = useController({ control, name, rules });

  return (
    <Input
      ref={field.ref}
      autoCapitalize="none"
      onChangeText={field.onChange}
      value={(field.value as string) || ''}
      {...inputProps}
      error={fieldState.error?.message}
      defaultValue={field.value}
    />
  );
}
