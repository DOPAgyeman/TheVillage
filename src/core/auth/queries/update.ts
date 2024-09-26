import { isClerkAPIResponseError } from '@clerk/clerk-expo';
import type { UserResource } from '@clerk/types';

import type { UserUnsafeMetadata } from '../types';

export type updateUserOptions = {
  user: Partial<{
    firstName: string;
    lastName: string;
    primaryEmailAddressId: string;
    unsafeMetadata: UserUnsafeMetadata;
  }>;
  userResource: UserResource;
};

export const updateUser = async (options: updateUserOptions) => {
  const update = await options.userResource
    .update(options.user)
    .then((res) => {
      return {
        firstName: res.firstName,
        lastName: res.lastName,
        primaryEmailAddressId: res.primaryEmailAddressId,
        unsafeMetadata: res.unsafeMetadata,
      };
    })
    .catch((error) => {
      if (isClerkAPIResponseError(error)) {
        throw new Error(error.errors[0].longMessage ?? error.errors[0].message);
      } else {
        throw new Error('An error has occurred while updating the user');
      }
    });

  return update;
};
