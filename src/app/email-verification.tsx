import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React from 'react';

import {
  EmailVerificationCodeForm,
  type VerificationCodeFormProps,
} from '@/components/email-verification-code';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

export default function EmailVerification() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  useSoftKeyboardEffect();

  const onPressVerify: VerificationCodeFormProps['onSubmit'] = async (data) => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <>
      <FocusAwareStatusBar />
      <EmailVerificationCodeForm onSubmit={onPressVerify} />
    </>
  );
}
