import type { GetToken } from '@clerk/types';
import type { Database } from 'database.types';

import { clerkSupabaseClient } from '../index';

export const updateUser = async (
  getToken: GetToken,
  userId: string,
  user: Partial<Database['public']['Tables']['users']['Row']>
) => {
  const db = await clerkSupabaseClient(getToken);

  const { error } = await db.from('users').update(user).eq('id', userId);
  if (error) throw error;
};
