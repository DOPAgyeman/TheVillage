import type { ClerkAPIError } from '@clerk/types';
import { createMutation } from 'react-query-kit';

import type { signUpUserOptions } from '@/core/auth/queries/insert';
import { signUpUser } from '@/core/auth/queries/insert';
import type { signUpUserType } from '@/core/auth/schema';

export const useSignUpUser = createMutation<
  signUpUserType,
  signUpUserOptions,
  ClerkAPIError | Error
>({
  mutationFn: async (user) =>
    signUpUser({
      isLoaded: user.isLoaded,
      signUp: user.signUp,
      data: user.data,
    }),
  networkMode: 'online',
});
