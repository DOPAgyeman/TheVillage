import { db } from '../index';
import type { insertUserType } from './schemas/insert-schemas';

export const insertUserIntoDatabase = async (user: insertUserType) => {
  const { error } = await db.from('users').insert(user);
  if (error) throw new Error(`${error.message}`);
};
