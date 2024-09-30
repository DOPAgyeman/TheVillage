import { useOAuth } from '@clerk/clerk-expo';
import { isClerkAPIResponseError } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';

import { useSocialSignIn } from '@/api/users/use-social-signin';
import { handleClerkError } from '@/core/auth/errors';
import { Button, Image, Text, View } from '@/ui';
import { showErrorMessage } from '@/ui/flash-message';

export const ContinueWithGoogle = () => {
  const router = useRouter();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { mutate: socialSignIn, isPending } = useSocialSignIn();
  const signIn = useCallback(async () => {
    socialSignIn(
      {
        startOAuthFlow: startOAuthFlow,
      },
      {
        onSuccess: () => {
          router.replace('/');
        },
        onError: (error) => {
          if (isClerkAPIResponseError(error)) {
            handleClerkError({
              error: error.errors[0],
            });
          } else {
            showErrorMessage({
              message: error.message,
            });
          }
        },
      }
    );
  }, [socialSignIn, startOAuthFlow, router]);

  return (
    <>
      <Button
        className="w-4/5 self-center bg-lightBlack dark:bg-lightBlack"
        label="Continue with Email"
        onPress={signIn}
        loading={isPending}
      >
        <View className="flex-row items-center justify-center gap-3">
          <Image
            source={require('/assets/welcome/google-logo.svg')}
            contentFit="contain"
            className="h-6 min-h-[16px] w-6 min-w-[16px]"
          />
          <Text className="text-lg font-medium text-white no-underline dark:text-white">
            Continue with Google
          </Text>
        </View>
      </Button>
    </>
  );
};
