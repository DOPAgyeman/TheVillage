import type { GetToken } from '@clerk/types';

import { clerkSupabaseClient } from '../index';
import type { insertUserType } from './schemas/insert-schemas';

export const insertUserIntoDatabase = async (
  user: insertUserType,
  getToken: GetToken
) => {
  const db = await clerkSupabaseClient(getToken);

  const { error } = await db.from('users').insert(user);
  if (error) throw error;
};

export const updateUser = async (
  getToken: GetToken,
  userId: string,
  user: Partial<insertUserType>
) => {
  const db = await clerkSupabaseClient(getToken);

  const { error } = await db.from('users').update(user).eq('id', userId);
  if (error) throw error;
};
