import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions } from 'react-native';

import Colors from '@/constants/colors';
import { Button, Text, View } from '@/ui';

export const ContinueWithEmail = () => {
  const windowWidth = Dimensions.get('window').width;
  const router = useRouter();
  return (
    <>
      <Button
        className="w-4/5 self-center bg-primary dark:bg-primary"
        label="Continue with Email"
        onPress={() => router.push('/login')}
      >
        <View className="flex-row items-center justify-center gap-3">
          <FontAwesome
            name="envelope-o"
            color={Colors.white}
            size={windowWidth * 0.05}
          />
          <Text className="text-lg font-medium text-white no-underline dark:text-white">
            Continue with Email
          </Text>
        </View>
      </Button>
    </>
  );
};
