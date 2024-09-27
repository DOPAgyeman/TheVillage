import type { UserUnsafeMetadata } from '@/core/auth/types';
export type PaginateQuery<T> = {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
};

export type UserResponse = {
  firstName: string | null;
  lastName: string | null;
  primaryEmailAddressId: string | null;
  unsafeMetadata: UserUnsafeMetadata;
};
