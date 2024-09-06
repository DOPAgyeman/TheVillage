import React from 'react';
import { memo } from 'react';
import type { Control } from 'react-hook-form';
import type { SharedValue } from 'react-native-reanimated';

import type { SignUpContent } from '@/constants/signup-content';
import { Text, View } from '@/ui';

import AnimatedFlashList from '../animated-flash-list';
import { SignUpInputs } from './signup-inputs';

export type SignUpFormProps = {
  scrollX: SharedValue<number>;
  scrollIndex: number;
  setIndex: (index: number) => void;
  content: SignUpContent[];
  control: Control<any>;
};

function SignUpScrollList({
  scrollX,
  scrollIndex,
  setIndex,
  content,
  control,
}: SignUpFormProps) {
  return (
    <AnimatedFlashList
      scrollX={scrollX}
      setIndex={setIndex}
      scrollIndex={scrollIndex}
      data={content}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      scrollEnabled={false}
      keyExtractor={(item: SignUpContent) => item.key}
      scrollEventThrottle={32}
      estimatedItemSize={414}
      initialScrollIndex={scrollIndex}
      renderItem={({ item }: { item: SignUpContent }) => {
        return (
          <View className="h-1/2 w-screen items-start justify-start gap-10 px-7 pt-5">
            <View className="gap-2">
              <Text className="text-start text-3xl font-bold">
                {item.title}
              </Text>
              <Text className="text-start text-lg font-normal">
                {item.description}
              </Text>
            </View>

            <View className="h-fit w-full">
              <SignUpInputs
                control={control}
                name={item.name}
                label={item.label}
              />
            </View>
          </View>
        );
      }}
    />
  );
}
export default memo(SignUpScrollList);
