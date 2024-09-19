import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Dimensions } from 'react-native';
import Rive from 'rive-react-native';

import colors from '@/constants/colors';
import { Modal } from '@/ui/modal';

export const NetworkConnectionModal = React.forwardRef<BottomSheetModal>(
  ({}, ref) => {
    const height = Dimensions.get('window').height * 0.25;
    const snapPoints = React.useMemo(() => [height], [height]);
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
      <Modal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: isDark ? colors.lightBlack : colors.white,
        }}
      >
        <Rive resourceName="wifi_animation_dark" />
      </Modal>
    );
  }
);
