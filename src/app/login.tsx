import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions } from 'react-native';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { Button, Image, Text, View } from '@/ui';

export default function Login() {
  const router = useRouter();
  useSoftKeyboardEffect();
  const { signIn, setActive, isLoaded } = useSignIn();

  const onSubmit: LoginFormProps['onSubmit'] = async (data) => {
    if (!isLoaded) {
      return;
    }
    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };
  const windowWidth = Dimensions.get('window').width;
  return (
    <View className="relative w-screen  bg-lightCream pt-20 dark:bg-black">
      <View className="flex h-full w-screen flex-col justify-center gap-5 px-5">
        <View className="absolute top-2 self-center">
          <Image
            source={require('/assets/icon.png')}
            style={{
              width: windowWidth / 6,
              height: windowWidth / 6,
            }}
            contentFit="contain"
            className="rounded-full"
          />
        </View>

        <LoginForm onSubmit={onSubmit} />
      </View>
      <View className="absolute inset-x-0 bottom-8">
        <View className="flex flex-row items-center justify-center gap-0">
          <Text className="text-sm text-black dark:text-white">
            Don't have an account?{' '}
          </Text>
          <Button
            variant="ghost"
            label=" Sign up"
            textClassName="no-underline text-sm font-semibold text-black dark:text-white"
            className="px-0"
            onPress={() => router.push('/sign-up')}
          />
        </View>
      </View>
    </View>
  );
}
