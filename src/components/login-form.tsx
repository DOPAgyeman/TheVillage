/* eslint-disable max-lines-per-function */
import { useSignIn } from '@clerk/clerk-expo';
import { isClerkAPIResponseError } from '@clerk/clerk-expo';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';

import { useLoginUser } from '@/api/users/use-email-login';
import { handleClerkError } from '@/core/auth/errors';
import type { signUpUserType } from '@/core/auth/schema';
import { signUpUserSchema } from '@/core/auth/schema';
import { Button, ControlledInput, Text, View } from '@/ui';
import { showErrorMessage } from '@/ui/flash-message';

export type EmailLoginFormType = Pick<
  signUpUserType,
  'email_address' | 'password'
>;

const loginSchema = signUpUserSchema.pick({
  email_address: true,
  password: true,
});

export const LoginForm = () => {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const {
    handleSubmit,
    control,
    formState: {
      errors: logInErrors,
      dirtyFields: logInDirtyFields,
      isSubmitting,
    },
    resetField,
    setError,
  } = useForm<EmailLoginFormType>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
    defaultValues: {
      email_address: '',
      password: '',
    },
  });

  const resetEmailField = useCallback(() => {
    resetField('email_address', {
      keepError: false,
      keepDirty: false,
      keepTouched: true,
    });
  }, [resetField]);

  const { mutate: _loginUser, isPending: isPendingLogin } = useLoginUser();

  const loginUser = useCallback(
    (data: EmailLoginFormType) => {
      if (Keyboard.isVisible()) {
        Keyboard.dismiss();
      }
      _loginUser(
        {
          isLoaded: isLoaded,
          signIn: signIn,
          setActive: setActive,
          data: data,
        },
        {
          onSuccess: () => {
            router.replace('/');
          },
          onError: (error) => {
            if (isClerkAPIResponseError(error)) {
              handleClerkError({
                error: error.errors[0],
                setError: setError,
                content: [{ name: 'email_address' }, { name: 'password' }],
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
    [isLoaded, setActive, signIn, _loginUser, router, setError]
  );

  const onPressForgotPassword = useCallback(() => {
    router.push('/forgot-password' as Href<'forgot-password'>);
  }, [router]);

  return (
    <View className="relative flex w-full flex-col gap-2">
      <View className="gap-2 pb-8">
        <Text className="self-start pt-4 text-5xl font-semibold text-black dark:text-white">
          Log in
        </Text>
        <Text className="w-3/4 self-start text-start text-base font-medium text-black dark:text-white">
          Continue where you left off and show love to your Village
        </Text>
      </View>
      <ControlledInput
        control={control}
        name="email_address"
        label="Email address"
        keyboardType="email-address"
        inputType="text"
        onPressErase={resetEmailField}
      />
      <ControlledInput
        control={control}
        name="password"
        label="Password"
        keyboardType="default"
        secureTextEntry={true}
        inputType="password"
      />
      <Button
        label="Login"
        onPress={handleSubmit(loginUser)}
        variant="default"
        disabled={
          logInErrors.email_address || logInErrors.password
            ? true
            : !logInDirtyFields.email_address && !logInDirtyFields.password
            ? true
            : false
        }
        loading={isSubmitting || isPendingLogin}
      />
      <View className="pt-4">
        <Button
          className="my-0 h-fit py-0"
          label="Forgot your password?"
          variant="ghost"
          textClassName="no-underline font-normal text-black dark:text-white"
          onPress={onPressForgotPassword}
        />
      </View>
    </View>
  );
};
