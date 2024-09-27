import type { ClerkAPIError } from '@clerk/types';
import type { WebBrowserAuthSessionResult } from 'expo-web-browser';
import { createMutation } from 'react-query-kit';

import type { SocialSignInOptions } from '@/core/auth/social-sign-in';
import { SocialSignIn } from '@/core/auth/social-sign-in';

export const useSocialSignIn = createMutation<
  WebBrowserAuthSessionResult | 'Success',
  SocialSignInOptions,
  ClerkAPIError | Error
>({
  mutationFn: async (user) =>
    await SocialSignIn({
      startOAuthFlow: user.startOAuthFlow,
    }),
  networkMode: 'online',
});
