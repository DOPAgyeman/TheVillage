import { isClerkAPIResponseError } from '@clerk/clerk-expo';
import type { SetActiveParams, SignUpResource } from '@clerk/types';

import type { signUpUserType } from '../schema';

export type signUpUserOptions = {
  isLoaded: boolean;
  signUp?: SignUpResource;
  data: signUpUserType;
};

export type verifyUserOptions = {
  isLoaded: boolean;
  signUp?: SignUpResource;
  data: signUpUserType;
  setActive?: (params: SetActiveParams) => Promise<void>;
};

export const signUpUser = async (options: signUpUserOptions) => {
  if (!options.isLoaded || !options.signUp) {
    throw new Error('An error has occurred while signing up');
  }
  try {
    await options.signUp.create({
      emailAddress: options.data.email_address,
      password: options.data.password,
      firstName: options.data.first_name,
      lastName: options.data.last_name,
      unsafeMetadata: { birthday: options.data.date_of_birth },
    });

    await options.signUp.prepareEmailAddressVerification({
      strategy: 'email_code',
    });
    return options.data;
  } catch (error) {
    if (isClerkAPIResponseError(error)) {
      throw error;
    } else {
      throw new Error('An error has occurred while signing up');
    }
  }
};

export const verifyUser = async (options: verifyUserOptions) => {
  if (!options.isLoaded || !options.signUp || !options.setActive) {
    throw new Error(
      'An error has occurred whilst completing the sign-up process'
    );
  }

  try {
    const completeSignUp = await options.signUp.attemptEmailAddressVerification(
      {
        code: options.data.code,
      }
    );

    if (completeSignUp.status === 'complete') {
      await options.setActive({ session: completeSignUp.createdSessionId });
      return options.data;
    } else {
      throw new Error(
        'An error has occurred whilst completing the sign-up process'
      );
    }
  } catch (error) {
    if (isClerkAPIResponseError(error)) {
      throw error;
    } else {
      throw new Error(
        'An error has occurred whilst completing the sign-up process'
      );
    }
  }
};
