import type { ClerkAPIError } from '@clerk/types';
import { createMutation } from 'react-query-kit';

import type { updateUserOptions } from '@/core/auth/queries/update';
import { updateUser } from '@/core/auth/queries/update';

import type { UserResponse } from '../types';

export const useUpdateUser = createMutation<
  UserResponse,
  updateUserOptions,
  ClerkAPIError
>({
  mutationFn: async (user) => {
    const updatedUser = await updateUser({
      user: user.user,
      userResource: user.userResource,
    });
    return updatedUser;
  },
  networkMode: 'online',
});
