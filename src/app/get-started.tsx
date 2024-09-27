import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Dimensions } from 'react-native';

import { ContinueWithApple } from '@/components/login/continue-with-apple';
import { ContinueWithEmail } from '@/components/login/continue-with-email';
import { ContinueWithFacebook } from '@/components/login/continue-with-facebook';
import { ContinueWithGoogle } from '@/components/login/continue-with-google';
import { Button, Image, Text, View } from '@/ui';

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function GetStarted() {
  const windowWidth = Dimensions.get('window').width;
  useWarmUpBrowser();
  return (
    <View className="h-full w-screen items-center justify-end gap-28 bg-gray dark:bg-black">
      <View className="items-center gap-5">
        <Image
          source={require('/assets/icon.png')}
          style={{
            width: windowWidth / 6,
            height: windowWidth / 6,
          }}
          contentFit="contain"
          className="rounded-full"
        />
        <Text className="text-3xl font-medium">Get started</Text>
      </View>
      <View className="h-fit w-screen gap-5 rounded-t-[3.5rem] py-10">
        <ContinueWithEmail />
        <ContinueWithGoogle />
        <ContinueWithFacebook />
        <ContinueWithApple />
        <View className="w-3/4 flex-row flex-wrap items-center justify-center gap-1 self-center pt-5">
          <Text className="text-sm text-black dark:text-white">
            By tapping Continue, you agree to our
          </Text>
          <Button
            variant="ghost"
            textClassName="text-sm text-black dark:text-white no-underline font-semibold"
            label="Terms"
            className="m-0 h-max w-fit p-0"
          />
          <Text className="text-sm text-black dark:text-white">and</Text>
          <Button
            variant="ghost"
            textClassName="text-sm text-black dark:text-white no-underline font-semibold"
            label="Privacy Policy."
            className="m-0 h-max w-fit p-0"
          />
        </View>
      </View>
    </View>
  );
}
