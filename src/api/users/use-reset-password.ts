import type { ClerkAPIError } from '@clerk/types';
import { createMutation } from 'react-query-kit';

import type { sendResetPasswordCodeOptions } from '@/core/auth/actions/reset-password';
import type { resetPasswordOptions } from '@/core/auth/actions/reset-password';
import type { verifyPasswordResetCodeOptions } from '@/core/auth/actions/reset-password';
import {
  resetPassword,
  sendResetPasswordCode,
  verifyPasswordResetCode,
} from '@/core/auth/actions/reset-password';

export const useSendResetPasswordCode = createMutation<
  sendResetPasswordCodeOptions['data'],
  sendResetPasswordCodeOptions,
  ClerkAPIError | Error
>({
  mutationFn: async (user) =>
    await sendResetPasswordCode({
      isLoaded: user.isLoaded,
      signIn: user.signIn,
      data: user.data,
    }),
  networkMode: 'online',
});

export const useResetPassword = createMutation<
  resetPasswordOptions['data'],
  resetPasswordOptions,
  ClerkAPIError | Error
>({
  mutationFn: async (user) =>
    await resetPassword({
      isLoaded: user.isLoaded,
      signIn: user.signIn,
      data: user.data,
      setActive: user.setActive,
    }),
  networkMode: 'online',
});

export const useVerifyPasswordResetCode = createMutation<
  verifyPasswordResetCodeOptions['data'],
  verifyPasswordResetCodeOptions,
  ClerkAPIError | Error
>({
  mutationFn: async (user) =>
    await verifyPasswordResetCode({
      isLoaded: user.isLoaded,
      signIn: user.signIn,
      data: user.data,
    }),
  networkMode: 'online',
});
