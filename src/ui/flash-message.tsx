import React from 'react';
import { StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Rive, { Fit } from 'rive-react-native';

import Colors from '@/constants/colors';
import { View } from '@/ui';

type flashMessageProps = {
  message: string;
  description?: string;
  backgroundColor?: string;
};

export const showSuccessMessage = (options: flashMessageProps) => {
  showMessage({
    message: options.message,
    type: 'success',
    description: options.description,
    style: [
      styles.successContainer,
      { backgroundColor: options.backgroundColor },
    ],
    floating: true,
    textStyle: styles.description,
    titleStyle: styles.title,
    icon: { icon: 'success', position: 'left', props: {} },
    position: 'top',
  });
};

export const showErrorMessage = (options: flashMessageProps) => {
  showMessage({
    message: options.message,
    type: 'danger',
    description: options.description,
    style: [
      styles.errorContainer,
      { backgroundColor: options.backgroundColor },
    ],
    floating: true,
    textStyle: styles.description,
    titleStyle: styles.title,
    icon: { icon: 'danger', position: 'left', props: {} },
    position: 'top',
  });
};

export const showInfoMessage = (options: flashMessageProps) => {
  showMessage({
    message: options.message,
    type: 'info',
    description: options.description,
    style: [styles.infoContainer, { backgroundColor: options.backgroundColor }],
    floating: true,
    textStyle: styles.description,
    titleStyle: styles.title,
    icon: { icon: 'info', position: 'left', props: {} },
    position: 'top',
  });
};

export const showNetworkConnectionErrorMessage = (
  options: flashMessageProps
) => {
  showMessage({
    message: options.message,
    type: 'none',
    description: options.description,
    style: [
      styles.networkConnectionContainer,
      { backgroundColor: options.backgroundColor },
    ],
    floating: true,
    textStyle: styles.description,
    titleStyle: styles.title,
    icon: () => (
      <View className="mr-4 h-8 w-8">
        <Rive
          resourceName="wifi_connecting_animation"
          fit={Fit.Contain}
          autoplay={true}
        />
      </View>
    ),
    position: 'bottom',
    duration: undefined,
  });
};

export const showNetworkConnectionSuccessMessage = (
  options: flashMessageProps
) => {
  showMessage({
    message: options.message,
    type: 'none',
    description: options.description,
    style: [
      styles.networkConnectionContainer,
      { backgroundColor: options.backgroundColor },
    ],
    floating: true,
    textStyle: styles.description,
    titleStyle: styles.title,
    icon: () => (
      <View className="mr-4 h-8 w-8">
        <Rive
          resourceName="wifi_connected_animation"
          fit={Fit.Contain}
          autoplay={true}
        />
      </View>
    ),
    position: 'bottom',
    duration: 5000,
  });
};

const styles = StyleSheet.create({
  successContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondaryGreen,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkRed,
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.purple,
  },
  networkConnectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'left',
    textAlignVertical: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'left',
    textAlignVertical: 'center',
    fontSize: 13,
    fontWeight: 'medium',
  },
});
