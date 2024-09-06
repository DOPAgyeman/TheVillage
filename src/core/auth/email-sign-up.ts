import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import type { SubmitHandler } from 'react-hook-form';

import { insertUserIntoDatabase } from '@/db/queries/insert';

import type { signUpUserType } from './schema';

export function useSignUpUser(
  incrementIndex?: () => void
): SubmitHandler<signUpUserType> {
  const { isLoaded, signUp } = useSignUp();
  return async (data) => {
    if (!isLoaded) {
      return;
    }

    await signUp.create({
      emailAddress: data.email,
      password: data.password,
      firstName: data.first_name,
      lastName: data.last_name,
      unsafeMetadata: { birthday: data.date_of_birth },
    });

    await signUp.prepareEmailAddressVerification({
      strategy: 'email_code',
    });
    if (incrementIndex) {
      incrementIndex();
    }
  };
}

export function useVerifyUser(
  setIndex?: (index: number) => void
): SubmitHandler<signUpUserType> {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  return async (data) => {
    if (!isLoaded) {
      return;
    }

    const completeSignUp = await signUp.attemptEmailAddressVerification({
      code: data.code,
    });

    if (completeSignUp.status === 'complete') {
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
      if (setIndex) {
        setIndex(0);
      }
    }
  };
}
