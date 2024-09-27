import type { ClerkAPIError } from '@clerk/types';
import { createMutation } from 'react-query-kit';

import type { verifyUserOptions } from '@/core/auth/queries/insert';
import { verifyUser } from '@/core/auth/queries/insert';
import type { signUpUserType } from '@/core/auth/schema';

export const useVerifyUser = createMutation<
  signUpUserType,
  verifyUserOptions,
  ClerkAPIError | Error
>({
  mutationFn: async (user) =>
    verifyUser({
      isLoaded: user.isLoaded,
      signUp: user.signUp,
      data: user.data,
      setActive: user.setActive,
    }),
  networkMode: 'online',
});
