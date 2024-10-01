import { isClerkAPIResponseError } from '@clerk/clerk-expo';
import type { SetActiveParams, SignInResource } from '@clerk/types';

import type { signUpUserType } from '../schema';

export type sendResetPasswordCodeOptions = {
  isLoaded: boolean;
  signIn?: SignInResource;
  data: Pick<signUpUserType, 'email_address' | 'code'>;
};

export type verifyPasswordResetCodeOptions = {
  isLoaded: boolean;
  signIn?: SignInResource;
  data: Pick<signUpUserType, 'code'>;
};

export type resetPasswordOptions = {
  isLoaded: boolean;
  signIn?: SignInResource;
  data: Pick<signUpUserType, 'email_address' | 'code' | 'password'>;
  setActive?: (params: SetActiveParams) => Promise<void>;
};

export const sendResetPasswordCode = async (
  options: sendResetPasswordCodeOptions
) => {
  if (!options.isLoaded || !options.signIn) {
    throw new Error('An error has occurred while logging in');
  }

  try {
    await options.signIn.create({
      identifier: options.data.email_address,
      strategy: 'reset_password_email_code',
    });

    return options.data;
  } catch (error) {
    if (isClerkAPIResponseError(error)) {
      throw error;
    } else {
      throw new Error(
        'An error has occurred while sending reset password code'
      );
    }
  }
};

export const verifyPasswordResetCode = async (
  options: verifyPasswordResetCodeOptions
) => {
  if (!options.isLoaded || !options.signIn) {
    throw new Error('An error has occurred while resetting your password');
  }

  try {
    const attemptPasswordReset = await options.signIn?.attemptFirstFactor({
      strategy: 'reset_password_email_code',
      code: options.data.code,
    });
    if (attemptPasswordReset.status === 'needs_new_password') {
      return options.data;
    } else {
      throw new Error(
        'An error has occurred while verifying your password reset code'
      );
    }
  } catch (error) {
    if (isClerkAPIResponseError(error)) {
      throw error;
    } else {
      throw new Error(
        'An error has occurred while verifying your password reset code'
      );
    }
  }
};

export const resetPassword = async (options: resetPasswordOptions) => {
  if (!options.isLoaded || !options.signIn || !options.setActive) {
    throw new Error('An error has occurred while resetting your password');
  }

  try {
    const attemptPasswordReset = await options.signIn?.resetPassword({
      password: options.data.password,
    });
    if (attemptPasswordReset.status === 'complete') {
      await options.setActive({
        session: attemptPasswordReset.createdSessionId,
      });
      return options.data;
    } else {
      throw new Error('An error has occurred while resetting your password');
    }
  } catch (error) {
    if (isClerkAPIResponseError(error)) {
      throw error;
    } else {
      throw new Error('An error has occurred while resetting your password');
    }
  }
};
