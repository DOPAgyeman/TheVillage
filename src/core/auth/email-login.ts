import { isClerkAPIResponseError } from '@clerk/clerk-expo';
import type { SetActiveParams, SignInResource } from '@clerk/types';

import type { EmailLoginFormType } from '@/components/login-form';

export type loginUserOptions = {
  isLoaded: boolean;
  signIn?: SignInResource;
  data: EmailLoginFormType;
  setActive?: (params: SetActiveParams) => Promise<void>;
};

export const loginUser = async (options: loginUserOptions) => {
  if (!options.isLoaded || !options.signIn || !options.setActive) {
    throw new Error('An error has occurred while logging in');
  }
  // Start the sign-in process using the email and password provided
  try {
    const signInAttempt = await options.signIn.create({
      identifier: options.data.email,
      password: options.data.password,
    });

    // If sign-in process is complete, set the created session as active
    if (signInAttempt.status === 'complete') {
      await options.setActive({ session: signInAttempt.createdSessionId });
      return options.data;
    } else {
      throw new Error('An error has occurred while logging in');
    }
  } catch (error) {
    if (isClerkAPIResponseError(error)) {
      throw error;
    } else {
      throw new Error('An error has occurred while signing up');
    }
  }
};
