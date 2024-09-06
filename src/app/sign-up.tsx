/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useSharedValue } from 'react-native-reanimated';

import SignUpScrollList from '@/components/signup/signup-scroll-list';
import { content } from '@/constants/signup-content';
import { useSignUpUser, useVerifyUser } from '@/core/auth/email-sign-up';
import type { signUpUserType } from '@/core/auth/schema';
import { signUpUserSchema } from '@/core/auth/schema';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { useSignUpScrollIndex } from '@/core/zustand/use-signup-scroll-index';
import { Button, FocusAwareStatusBar, SafeAreaView, View } from '@/ui';

export default function SignUp() {
  useSoftKeyboardEffect();

  const scrollX = React.useRef(useSharedValue(0)).current;
  const scrollIndex = useSignUpScrollIndex.use.index();
  const incrementIndex = useSignUpScrollIndex.use.incrementIndex();
  const setIndex = useSignUpScrollIndex.use.setIndex();

  const {
    handleSubmit: handleSignUp,
    control: signUpControl,
    formState: { errors: signUpErrors, dirtyFields: signUpDirtyFields },
    getValues,
    setError,
  } = useForm<signUpUserType>({
    resolver: zodResolver(signUpUserSchema),
    mode: 'all',
    defaultValues: {
      first_name: '',
      last_name: '',
      date_of_birth: new Date(),
      email: '',
      password: '',
      code: '',
    },
  });

  const signUpUser = useSignUpUser(incrementIndex);
  const verifyUser = useVerifyUser(setIndex);

  const onPress = useCallback(async () => {
    if (scrollIndex === content.length - 1) {
      const getCodeValue = getValues('code');
      if (getCodeValue.length !== 6) {
        setError('code', {
          type: 'custom',
          message: 'Please enter a 6-digit code',
        });
      } else {
        try {
          await handleSignUp(verifyUser)();
        } catch (error) {
          console.error(JSON.stringify(error, null, 2));
        }
      }
    } else if (scrollIndex === content.length - 2) {
      try {
        await handleSignUp(signUpUser)();
      } catch (error) {
        console.error(JSON.stringify(error, null, 2));
      }
    } else {
      incrementIndex();
    }
  }, [
    getValues,
    handleSignUp,
    incrementIndex,
    verifyUser,
    scrollIndex,
    setError,
    signUpUser,
  ]);

  return (
    <SafeAreaView>
      <FocusAwareStatusBar />
      <SignUpScrollList
        scrollX={scrollX}
        scrollIndex={scrollIndex}
        setIndex={setIndex}
        content={content}
        control={signUpControl}
      />
      <View className="px-7 pt-16">
        <Button
          testID="signup-button"
          label={'Next'}
          onPress={onPress}
          disabled={
            signUpErrors[content[scrollIndex].name] ||
            !signUpDirtyFields[content[scrollIndex].name]
              ? true
              : false
          }
        />
      </View>
    </SafeAreaView>
  );
}
