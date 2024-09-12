import { useSignUp } from '@clerk/clerk-expo';
import type { SubmitHandler } from 'react-hook-form';

import type { signUpUserType } from './schema';

export function useSignUpUser(): SubmitHandler<signUpUserType> {
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
  };
}

export function useVerifyUser(): SubmitHandler<signUpUserType> {
  const { isLoaded, signUp, setActive } = useSignUp();

  return async (data) => {
    if (!isLoaded) {
      return;
    }

    const completeSignUp = await signUp.attemptEmailAddressVerification({
      code: data.code,
    });

    if (completeSignUp.status === 'complete') {
      await setActive({ session: completeSignUp.createdSessionId });
    } else {
      throw new Error(
        'An error has occurred whilst completing the sign-up process'
      );
    }
  };
}
