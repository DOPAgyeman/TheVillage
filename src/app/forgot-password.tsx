/* eslint-disable max-lines-per-function */
import { isClerkAPIResponseError } from '@clerk/clerk-expo';
import { useAuth, useSignIn } from '@clerk/clerk-expo';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { StyleSheet } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

import {
  useResetPassword,
  useSendResetPasswordCode,
  useVerifyPasswordResetCode,
} from '@/api/users/use-reset-password';
import ForgotPasswordScrollList from '@/components/forgot password/forgot-password-scroll-list';
import colors from '@/constants/colors';
import { forgotPasswordContent } from '@/constants/forgot-password-content';
import { handleClerkError } from '@/core/auth/errors';
import type { signUpUserType } from '@/core/auth/schema';
import { signUpUserSchema } from '@/core/auth/schema';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { useSignUpScrollIndex } from '@/core/zustand/use-signup-scroll-index';
import { Button, FocusAwareStatusBar, View } from '@/ui';
import { showErrorMessage, showSuccessMessage } from '@/ui/flash-message';
import { ChevronLeft } from '@/ui/icons/chevron-left';

export default function ResetPassword() {
  useSoftKeyboardEffect();
  const { isSignedIn } = useAuth();
  const scrollX = React.useRef(useSharedValue(0)).current;
  const scrollIndex = useSignUpScrollIndex.use.index();
  const incrementIndex = useSignUpScrollIndex.use.incrementIndex();
  const decrementIndex = useSignUpScrollIndex.use.decrementIndex();
  const setIndex = useSignUpScrollIndex.use.setIndex();
  const router = useRouter();

  const {
    mutate: _sendResetPasswordCode,
    isPending: isPendingSendResetPasswordCode,
  } = useSendResetPasswordCode();
  const { mutate: _verifyPasswordResetCode, isPending: isPendingVerifyCode } =
    useVerifyPasswordResetCode();
  const { mutate: _resetPassword, isPending: isPendingResetPassword } =
    useResetPassword();
  const { isLoaded, signIn, setActive } = useSignIn();

  const forgotPasswordSchema = signUpUserSchema.pick({
    email_address: true,
    code: true,
    password: true,
  });

  type forgotPasswordType = Pick<
    signUpUserType,
    'email_address' | 'code' | 'password'
  >;

  const {
    handleSubmit: handleResetPassword,
    control: resetPasswordControl,
    formState: {
      errors: signUpErrors,
      dirtyFields: signUpDirtyFields,
      isSubmitting,
    },
    getValues,
    setError,
    resetField,
  } = useForm<forgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'all',
    defaultValues: {
      email_address: '',
      password: '',
      code: '',
    },
  });

  const sendResetPasswordCode = useCallback(
    (data: forgotPasswordType) => {
      _sendResetPasswordCode(
        { isLoaded: isLoaded, signIn: signIn, data: data },
        {
          onSuccess: () => {
            incrementIndex();
            if (Keyboard.isVisible()) {
              Keyboard.dismiss();
            }
          },
          onError: (error) => {
            if (isClerkAPIResponseError(error)) {
              handleClerkError({
                error: error.errors[0],
                setIndex: setIndex,
                setError: setError,
                content: forgotPasswordContent,
              });
            } else {
              showErrorMessage({
                message: error.message,
              });
            }
          },
        }
      );
    },
    [
      incrementIndex,
      isLoaded,
      setError,
      setIndex,
      signIn,
      _sendResetPasswordCode,
    ]
  );

  const verifyPasswordResetCode = useCallback(
    (data: Pick<forgotPasswordType, 'code'>) => {
      _verifyPasswordResetCode(
        {
          isLoaded: isLoaded,
          signIn: signIn,
          data: data,
        },
        {
          onSuccess: () => {
            if (Keyboard.isVisible()) {
              Keyboard.dismiss();
            }
            incrementIndex();
          },
          onError: (error) => {
            if (isClerkAPIResponseError(error)) {
              handleClerkError({
                error: error.errors[0],
                setIndex: setIndex,
                setError: setError,
                content: forgotPasswordContent,
              });
            } else {
              showErrorMessage({
                message: error.message,
              });
            }
          },
        }
      );
    },
    [
      _verifyPasswordResetCode,
      isLoaded,
      setError,
      setIndex,
      signIn,

      incrementIndex,
    ]
  );

  const resetPassword = useCallback(
    (data: forgotPasswordType) => {
      _resetPassword(
        {
          isLoaded: isLoaded,
          signIn: signIn,
          data: data,
          setActive: setActive,
        },
        {
          onSuccess: () => {
            if (Keyboard.isVisible()) {
              Keyboard.dismiss();
            }
            if (isSignedIn === false) {
              showSuccessMessage({
                message: 'Your password has been reset successfully',
                description: 'You are now signed in',
              });
              router.replace('/');
            } else if (isSignedIn === true) {
              showSuccessMessage({
                message: 'Your password has been reset successfully',
              });
              router.back();
            }
            setIndex(0);
          },
          onError: (error) => {
            if (isClerkAPIResponseError(error)) {
              handleClerkError({
                error: error.errors[0],
                setIndex: setIndex,
                setError: setError,
                content: forgotPasswordContent,
              });
            } else {
              showErrorMessage({
                message: error.message,
              });
            }
          },
        }
      );
    },
    [
      _resetPassword,
      isLoaded,
      setActive,
      setError,
      setIndex,
      signIn,
      router,
      isSignedIn,
    ]
  );

  const resendVerificationCode = useCallback(
    (data: forgotPasswordType) => {
      _sendResetPasswordCode(
        {
          isLoaded: isLoaded,
          signIn: signIn,
          data: data,
        },
        {
          onSuccess: () => {
            if (Keyboard.isVisible()) {
              Keyboard.dismiss();
            }
            showSuccessMessage({
              message: 'Password reset code sent successfully',
              backgroundColor: colors.secondaryGreen,
            });
          },
          onError: (error) => {
            if (isClerkAPIResponseError(error)) {
              handleClerkError({
                error: error.errors[0],
                setIndex: setIndex,
                setError: setError,
                content: forgotPasswordContent,
              });
            } else {
              showErrorMessage({
                message: error.message,
              });
            }
          },
        }
      );
    },
    [_sendResetPasswordCode, isLoaded, setError, setIndex, signIn]
  );

  const onPressButton = useCallback(async () => {
    if (forgotPasswordContent[scrollIndex].name === 'code') {
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
        verifyPasswordResetCode({ code: getCodeValue });
      }
    } else if (forgotPasswordContent[scrollIndex].name === 'password') {
      await handleResetPassword(resetPassword)();
    } else if (forgotPasswordContent[scrollIndex].name === 'email_address') {
      const getEmailEntered = getValues('email_address');
      sendResetPasswordCode({
        email_address: getEmailEntered,
        code: '',
        password: '',
      });
    }
  }, [
    getValues,
    handleResetPassword,
    resetPassword,
    scrollIndex,
    setError,
    sendResetPasswordCode,
    verifyPasswordResetCode,
  ]);

  const onPressBack = useCallback(() => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    if (scrollIndex === 0) {
      router.back();
      setIndex(0);
    } else {
      decrementIndex();
    }
  }, [decrementIndex, router, scrollIndex, setIndex]);

  const onPressResendCode = useCallback(async () => {
    const getEmailEntered = getValues('email_address');
    resendVerificationCode({
      email_address: getEmailEntered,
      code: '',
      password: '',
    });
  }, [resendVerificationCode, getValues]);

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

      <ForgotPasswordScrollList
        scrollX={scrollX}
        scrollIndex={scrollIndex}
        setIndex={setIndex}
        content={forgotPasswordContent}
        control={resetPasswordControl}
        resetField={resetField}
      />

      <View className="gap-4 px-5">
        <Button
          testID="signup-button"
          label={
            scrollIndex === forgotPasswordContent.length - 1
              ? 'Sign up'
              : 'Next'
          }
          onPress={onPressButton}
          disabled={
            signUpErrors[forgotPasswordContent[scrollIndex].name] ||
            !signUpDirtyFields[forgotPasswordContent[scrollIndex].name]
              ? true
              : false
          }
          loading={
            isSubmitting ||
            isPendingSendResetPasswordCode ||
            isPendingResetPassword ||
            isPendingVerifyCode
          }
        />
        {forgotPasswordContent[scrollIndex].name === 'code' && (
          <Button
            label="Resend verification code"
            variant="ghost"
            textClassName="text-sm text-lightBlack dark:text-darkGray no-underline font-semibold"
            onPress={onPressResendCode}
            className="h-fit w-fit self-center p-4"
          />
        )}
      </View>
    </Animated.View>
  );
}
