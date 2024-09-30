import type { ClerkAPIError } from '@clerk/types';
import { createMutation } from 'react-query-kit';

import type { EmailLoginFormType } from '@/components/login-form';
import type { loginUserOptions } from '@/core/auth/email-login';
import { loginUser } from '@/core/auth/email-login';

export const useLoginUser = createMutation<
  EmailLoginFormType,
  loginUserOptions,
  ClerkAPIError | Error
>({
  mutationFn: async (user) =>
    await loginUser({
      isLoaded: user.isLoaded,
      signIn: user.signIn,
      data: user.data,
      setActive: user.setActive,
    }),
  networkMode: 'online',
});
