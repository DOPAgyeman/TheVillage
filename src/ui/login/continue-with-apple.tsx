import React from 'react';

import { SocialSignIn } from '@/core/auth/social-sign-in';
import { useThemeConfig } from '@/core/use-theme-config';
import { Button, Image, Text, View } from '@/ui';

export const ContinueWithApple = () => {
  const signIn = SocialSignIn('oauth_apple');
  const theme = useThemeConfig();
  return (
    <>
      <Button
        className="w-4/5 self-center bg-black dark:bg-lightBlack"
        label="Continue with Email"
        onPress={signIn}
      >
        <View className="flex-row items-center justify-center gap-3">
          <Image
            source={
              theme.dark
                ? require('/assets/welcome/apple-logo-white.svg')
                : require('/assets/welcome/apple-logo-white.svg')
            }
            contentFit="contain"
            className="h-6 min-h-[16px] w-6 min-w-[16px]"
          />
          <Text className="text-lg font-medium text-white no-underline dark:text-white">
            Continue with Apple
          </Text>
        </View>
      </Button>
    </>
  );
};
