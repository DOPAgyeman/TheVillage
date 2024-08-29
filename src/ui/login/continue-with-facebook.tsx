import React from 'react';

import { SocialSignIn } from '@/core/auth/social-sign-in';
import { useThemeConfig } from '@/core/use-theme-config';
import { Button, Image, Text, View } from '@/ui';

export const ContinueWithFacebook = () => {
  const signIn = SocialSignIn('oauth_facebook');
  const theme = useThemeConfig();
  return (
    <>
      <Button
        className="w-4/5 self-center bg-black dark:bg-lightCream"
        label="Continue with Email"
        onPress={signIn}
      >
        <View className="flex-row items-center justify-center gap-3">
          <Image
            source={
              theme.dark
                ? require('/assets/welcome/facebook-logo-primary.svg')
                : require('/assets/welcome/facebook-logo-secondary.svg')
            }
            contentFit="contain"
            className="h-6 min-h-[16px] w-6 min-w-[16px]"
          />
          <Text className="text-lg font-medium text-white no-underline dark:text-black">
            Continue with Facebook
          </Text>
        </View>
      </Button>
    </>
  );
};
