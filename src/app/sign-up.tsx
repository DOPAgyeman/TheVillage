import { useSignUp } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import React from 'react';

import type { SignUpFormProps } from '@/components/signup-form';
import { SignUpForm } from '@/components/signup-form';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

export default function SignUp() {
  useSoftKeyboardEffect();
  const { isLoaded, signUp } = useSignUp();

  const onSubmit: SignUpFormProps['onSubmit'] = async (data) => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      router.push('/email-verification');
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <>
      <FocusAwareStatusBar />
      <SignUpForm onSubmit={onSubmit} />
    </>
  );
}
