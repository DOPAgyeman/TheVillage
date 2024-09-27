import type { ClerkAPIError } from '@clerk/types';
import { createMutation } from 'react-query-kit';

import type { updateUserOptions } from '@/core/auth/queries/update';
import { updateUser } from '@/core/auth/queries/update';

import type { UpdateUserResponse } from '../types';

export const useUpdateUser = createMutation<
  UpdateUserResponse,
  updateUserOptions,
  ClerkAPIError | Error
>({
  mutationFn: async (user) =>
    await updateUser({
      user: user.user,
      userResource: user.userResource,
    }),
  networkMode: 'online',
});
