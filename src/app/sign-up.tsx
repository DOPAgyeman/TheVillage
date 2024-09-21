/* eslint-disable max-lines-per-function */
import { isClerkAPIResponseError } from '@clerk/clerk-expo';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { StyleSheet } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

import SignUpScrollList from '@/components/signup/signup-scroll-list';
import colors from '@/constants/colors';
import { content } from '@/constants/signup-content';
import { useSignUpUser, useVerifyUser } from '@/core/auth/email-sign-up';
import { handleClerkError } from '@/core/auth/errors';
import type { signUpUserType } from '@/core/auth/schema';
import { signUpUserSchema } from '@/core/auth/schema';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { useSignUpScrollIndex } from '@/core/zustand/use-signup-scroll-index';
import { Button, FocusAwareStatusBar, Text, View } from '@/ui';
import { showErrorMessage, showSuccessMessage } from '@/ui/flash-message';
import { ChevronLeft } from '@/ui/icons/chevron-left';

export default function SignUp() {
  useSoftKeyboardEffect();

  const scrollX = React.useRef(useSharedValue(0)).current;
  const scrollIndex = useSignUpScrollIndex.use.index();
  const incrementIndex = useSignUpScrollIndex.use.incrementIndex();
  const decrementIndex = useSignUpScrollIndex.use.decrementIndex();
  const setIndex = useSignUpScrollIndex.use.setIndex();
  const router = useRouter();

  const {
    handleSubmit: handleSignUp,
    control: signUpControl,
    formState: {
      errors: signUpErrors,
      dirtyFields: signUpDirtyFields,
      isSubmitting,
    },
    getValues,
    setError,
    resetField,
  } = useForm<signUpUserType>({
    resolver: zodResolver(signUpUserSchema),
    mode: 'all',
    defaultValues: {
      first_name: '',
      last_name: '',
      date_of_birth: new Date(),
      email_address: '',
      password: '',
      code: '',
    },
  });

  const signUpUser = useSignUpUser();
  const verifyUser = useVerifyUser();

  const onPressButton = useCallback(async () => {
    if (content[scrollIndex].name === 'code') {
      const getCodeValue = getValues('code');
      if (getCodeValue.length !== 6) {
        setError(
          'code',
          {
            type: 'custom',
            message: 'Please enter a 6-digit code',
          },
          { shouldFocus: true }
        );
      } else {
        try {
          await handleSignUp(verifyUser)();
          if (Keyboard.isVisible()) {
            Keyboard.dismiss();
          }

          router.replace('/');
          setIndex(0);
        } catch (error) {
          if (isClerkAPIResponseError(error)) {
            handleClerkError({
              error: error.errors[0],
              setError: setError,
              fieldName: 'code',
              shouldFocus: false,
              hideFlashMessage: true,
              backgroundColor: colors.darkRed,
            });
          } else {
            showErrorMessage({
              message: 'An error has occurred. Please try again later.',
              backgroundColor: colors.darkRed,
            });
          }
        }
      }
    } else if (content[scrollIndex].name === 'password') {
      try {
        await handleSignUp(signUpUser)();
        incrementIndex();
        if (Keyboard.isVisible()) {
          Keyboard.dismiss();
        }
      } catch (error) {
        if (isClerkAPIResponseError(error)) {
          handleClerkError({
            error: error.errors[0],
            setIndex: setIndex,
            setError: setError,
            content: content,
            backgroundColor: colors.darkRed,
          });
        } else {
          showErrorMessage({
            message: 'An error has occurred. Please try again later.',
            backgroundColor: colors.darkRed,
          });
        }
      }
    } else {
      incrementIndex();
      if (Keyboard.isVisible()) {
        Keyboard.dismiss();
      }
    }
  }, [
    setIndex,
    getValues,
    handleSignUp,
    incrementIndex,
    verifyUser,
    scrollIndex,
    setError,
    signUpUser,

    router,
  ]);

  const onPressBack = useCallback(() => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    if (scrollIndex === 0) {
      router.back();
    } else {
      decrementIndex();
    }
  }, [decrementIndex, router, scrollIndex]);

  const onPressLogIn = useCallback(() => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    router.back();
    setIndex(0);
  }, [setIndex, router]);

  const onPressResendCode = useCallback(async () => {
    try {
      await handleSignUp(signUpUser)();

      if (Keyboard.isVisible()) {
        Keyboard.dismiss();
      }
      showSuccessMessage({
        message: 'Verification code sent successfully',
        backgroundColor: colors.secondaryGreen,
      });
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        handleClerkError({
          error: error.errors[0],
          setIndex: setIndex,
          setError: setError,
          content: content,
          backgroundColor: colors.darkRed,
        });
      } else {
        showErrorMessage({
          message: 'An error has occurred. Please try again later.',
          backgroundColor: colors.darkRed,
        });
      }
    }
  }, [handleSignUp, signUpUser, setError, setIndex]);

  return (
    <Animated.View className="h-full py-14">
      <View
        className="bg-white dark:bg-black"
        style={StyleSheet.absoluteFillObject}
        onTouchEnd={() => {
          if (Keyboard.isVisible()) {
            Keyboard.dismiss();
          }
        }}
      />
      <FocusAwareStatusBar />
      <ChevronLeft onPress={onPressBack} />

      <SignUpScrollList
        scrollX={scrollX}
        scrollIndex={scrollIndex}
        setIndex={setIndex}
        content={content}
        control={signUpControl}
        resetField={resetField}
      />

      <View className="gap-4 px-5">
        <Button
          testID="signup-button"
          label={scrollIndex === content.length - 1 ? 'Sign up' : 'Next'}
          onPress={onPressButton}
          disabled={
            signUpErrors[content[scrollIndex].name] ||
            !signUpDirtyFields[content[scrollIndex].name]
              ? true
              : false
          }
          loading={isSubmitting}
        />
        {content[scrollIndex].name === 'code' && (
          <Button
            label="Resend verification code"
            variant="ghost"
            textClassName="text-sm text-darkGray dark:text-darkGray no-underline font-semibold"
            onPress={onPressResendCode}
          />
        )}
      </View>
      <View className="absolute bottom-14 w-3/4 flex-row flex-wrap items-center justify-center gap-1 self-center pt-5">
        <Text className="text-sm text-black dark:text-white">
          Already have an account?
        </Text>
        <Button
          variant="ghost"
          textClassName="text-sm text-black dark:text-white no-underline font-semibold"
          label="Log in"
          className="m-0 h-max w-fit p-0"
          onPress={onPressLogIn}
        />
      </View>
    </Animated.View>
  );
}
