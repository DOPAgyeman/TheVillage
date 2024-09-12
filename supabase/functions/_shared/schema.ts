import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().min(1),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  full_name: z.string().min(1),
  date_of_birth: z.string().datetime().min(1),
  email_address: z.string().email().min(1),
  external_accounts: z.array(z.string()),
  image_url: z.string(),
});
