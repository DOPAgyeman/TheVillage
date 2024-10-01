import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';
import { Dimensions } from 'react-native';

import { useThemeConfig } from '@/core/use-theme-config';
import { Button, View } from '@/ui';
const windowWidth = Dimensions.get('window').width;
import colors from '@/constants/colors';

type ChevronLeftProps = {
  onPress: () => void;
};

export const ChevronLeft = ({ onPress }: ChevronLeftProps) => {
  const theme = useThemeConfig();
  return (
    <View className="w-1/4">
      <Button
        variant="ghost"
        className="justify-start bg-none px-0"
        style={{ width: windowWidth * 0.18, height: windowWidth * 0.18 }}
        shouldScaleOnPress={false}
        onPress={onPress}
      >
        <View className="px-7">
          <FontAwesome6
            name="chevron-left"
            color={theme.dark ? colors.secondaryGreen : colors.primary}
            size={windowWidth * 0.06}
          />
        </View>
      </Button>
    </View>
  );
};
