import type { ClerkAPIError } from '@clerk/types';
import { createMutation } from 'react-query-kit';

import type { updateUserOptions } from '@/core/auth/queries/update';
import { updateUser } from '@/core/auth/queries/update';
import type { UserUnsafeMetadata } from '@/core/auth/types';

type Response = {
  firstName: string | null;
  lastName: string | null;
  primaryEmailAddressId: string | null;
  unsafeMetadata: UserUnsafeMetadata;
};

export const useUpdateUser = createMutation<
  Response,
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
