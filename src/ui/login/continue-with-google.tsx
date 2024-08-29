import React from 'react';

import { SocialSignIn } from '@/core/auth/social-sign-in';
import { Button, Image, Text, View } from '@/ui';

export const ContinueWithGoogle = () => {
  const signIn = SocialSignIn('oauth_google');

  return (
    <>
      <Button
        className="w-4/5 self-center bg-black dark:bg-lightCream"
        label="Continue with Email"
        onPress={signIn}
      >
        <View className="flex-row items-center justify-center gap-3">
          <Image
            source={require('/assets/welcome/google-logo.svg')}
            contentFit="contain"
            className="h-6 min-h-[16px] w-6 min-w-[16px]"
          />
          <Text className="text-lg font-medium text-white no-underline dark:text-black">
            Continue with Google
          </Text>
        </View>
      </Button>
    </>
  );
};
