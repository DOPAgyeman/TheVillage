import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';
import { Keyboard } from 'react-native';
import { StyleSheet } from 'react-native';

import { LoginForm } from '@/components/login-form';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { useThemeConfig } from '@/core/use-theme-config';
import { Button, Text, View } from '@/ui';
import { ChevronLeft } from '@/ui/icons/chevron-left';

export default function Login() {
  const theme = useThemeConfig();
  const router = useRouter();
  useSoftKeyboardEffect();

  StatusBar.setBarStyle(theme.dark ? 'light-content' : 'dark-content');

  const onPressBack = useCallback(() => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    router.back();
  }, [router]);

  return (
    <View className="relative h-full w-screen py-14">
      <View
        className="bg-lightCream dark:bg-black"
        style={StyleSheet.absoluteFillObject}
        onTouchEnd={() => {
          if (Keyboard.isVisible()) {
            Keyboard.dismiss();
          }
        }}
      />
      <ChevronLeft onPress={onPressBack} />

      <View className="px-7">
        <LoginForm />
      </View>
      <View className="absolute inset-x-0 bottom-8">
        <View className="flex flex-row items-center justify-center gap-0">
          <Text className="text-sm text-black dark:text-white">
            Don't have an account?{' '}
          </Text>
          <Button
            variant="ghost"
            label=" Sign up"
            textClassName="no-underline text-sm font-semibold text-black dark:text-white"
            className="px-0"
            onPress={() => router.push('/sign-up')}
          />
        </View>
      </View>
    </View>
  );
}
