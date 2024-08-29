import { useOAuth } from '@clerk/clerk-expo';
import type { OAuthStrategy } from '@clerk/types';
import { useRouter } from 'expo-router';
import React from 'react';

export const SocialSignIn = (strategy: OAuthStrategy) => {
  const router = useRouter();

  const { startOAuthFlow } = useOAuth({ strategy: strategy });

  return React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId) {
        if (setActive) {
          await setActive({ session: createdSessionId });
          router.replace('/');
        }
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, [startOAuthFlow, router]);
};
