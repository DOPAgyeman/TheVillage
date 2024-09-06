import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React from 'react';

import {
  EmailVerificationCodeForm,
  type VerificationCodeFormProps,
} from '@/components/email-verification-code';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { insertUserIntoDatabase } from '@/db/queries/insert';
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
        console.log(
          `date1: ${new Date(completeSignUp.unsafeMetadata.birthday as string)}`
        );
        await insertUserIntoDatabase({
          id: completeSignUp.createdUserId || '',
          first_name: completeSignUp.firstName || '',
          last_name: completeSignUp.lastName || '',
          full_name: completeSignUp.firstName + ' ' + completeSignUp.lastName,
          email: completeSignUp.emailAddress || '',
          date_of_birth: completeSignUp.unsafeMetadata.birthday as Date,
          sign_in_methods: 'email',
        });
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (error) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(`${error}`);
    }
  };

  return (
    <>
      <FocusAwareStatusBar />
      <EmailVerificationCodeForm onSubmit={onPressVerify} />
    </>
  );
}
