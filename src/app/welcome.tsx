import { router } from 'expo-router';
import React from 'react';
import { Dimensions } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import colors from '@/constants/colors';
import { Button, View } from '@/ui';
import { FocusAwareStatusBar } from '@/ui';
import { Image, SafeAreaView, Text } from '@/ui';

const Welcome = () => {
  const windowWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={{ backgroundColor: colors.white }}>
      <View className="flex h-full flex-col justify-between">
        <FocusAwareStatusBar />
        <View className="flex h-3/4 w-full flex-col items-center justify-between pb-24">
          <View className="self-end pr-10 pt-5">
            <Text className="text-lg font-semibold text-primary">Log in</Text>
          </View>
          <Animated.View
            entering={FadeInUp.duration(900).delay(1600)}
            className="items-center"
          >
            <Image
              style={{
                width: windowWidth / 1.1,
                height: windowWidth / 1.7,
              }}
              contentFit="contain"
              source={require('/assets/welcome/gardening.png')}
            />
            <View className="px-5 pt-5">
              <Text className="self-center py-5 text-2xl font-bold">
                Show love in a practical way
              </Text>
              <Text className="self-center text-lg">
                Make it easy to meet your loved one's needs by accepting
                requests for practical help
              </Text>
            </View>
          </Animated.View>
        </View>
        <Animated.View
          entering={FadeInDown.duration(700).delay(1800)}
          className="px-10"
        >
          <Button
            label="Continue with email"
            variant="default"
            onPress={() => {
              router.push('/login');
            }}
            textClassName="text-lg font-medium"
          />
          <Button
            label="Continue with Google"
            variant="outline"
            onPress={() => {
              router.push('/sign-up');
            }}
            textClassName="text-lg font-medium"
          />
          <Button
            label="Continue with Facebook"
            variant="outline"
            onPress={() => {
              router.push('/sign-up');
            }}
            textClassName="text-lg font-medium"
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
