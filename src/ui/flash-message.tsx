import { StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import colors from '@/constants/colors';

export const showSuccessMessage = (message: string, description?: string) => {
  showMessage({
    message: message,
    type: 'success',
    description: description,
    style: styles.successContainer,
    floating: true,
    textStyle: styles.description,
    titleStyle: styles.title,
    icon: { icon: 'success', position: 'left', props: {} },
  });
};

export const showErrorMessage = (message: string, description?: string) => {
  showMessage({
    message: message,
    type: 'danger',
    description: description,
    style: styles.errorContainer,
    floating: true,
    textStyle: styles.description,
    titleStyle: styles.title,
    icon: { icon: 'danger', position: 'left', props: {} },
  });
};

export const showInfoMessage = (message: string, description?: string) => {
  showMessage({
    message: message,
    type: 'info',
    description: description,
    style: styles.infoContainer,
    floating: true,
    textStyle: styles.description,
    titleStyle: styles.title,
    icon: { icon: 'info', position: 'left', props: {} },
  });
};

const styles = StyleSheet.create({
  successContainer: {
    backgroundColor: colors.secondaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    backgroundColor: colors.darkRed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    backgroundColor: colors.purple,
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
