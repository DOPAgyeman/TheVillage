import type { Theme } from '@react-navigation/native';
import {
  DarkTheme as _DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import { useColorScheme } from 'nativewind';
import { Platform } from 'react-native';

import colors from '@/constants/colors';

const DarkTheme: Theme = {
  ..._DarkTheme,
  colors: {
    ..._DarkTheme.colors,
    primary: colors.primary,
    background: colors.black,
    text: colors.black,
    border: colors.black,
    card: colors.black,
  },
};

const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary[400],
    background: colors.white,
  },
};

export function useThemeConfig() {
  const { colorScheme } = useColorScheme();

  if (colorScheme === 'dark') {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(colors.black);
    }
    return DarkTheme;
  }
  if (Platform.OS === 'android') {
    NavigationBar.setBackgroundColorAsync(colors.white);
  }
  return LightTheme;
}
