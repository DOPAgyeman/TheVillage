/* eslint-disable max-lines-per-function */
import React, { useCallback } from 'react';
import { memo } from 'react';
import type { Control } from 'react-hook-form';
import { Keyboard } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

import type { SignUpContent } from '@/constants/signup-content';
import { useDateTimePickerHandler } from '@/core/zustand/use-datetimepicker-handler';
import { Text, View } from '@/ui';

import AnimatedFlashList from '../animated-flash-list';
import { SignUpInputs } from './signup-inputs';

export type SignUpFormProps = {
  scrollX: SharedValue<number>;
  scrollIndex: number;
  setIndex: (index: number) => void;
  content: SignUpContent[];
  control: Control<any>;

  resetField: (
    name: SignUpContent['name'],
    options?: Record<string, boolean | any>
  ) => void;
};

function SignUpScrollList({
  scrollX,
  scrollIndex,
  setIndex,
  content,
  control,
  resetField,
}: SignUpFormProps) {
  const setIsDateTimePickerVisible = useDateTimePickerHandler.use.setBoolean();
  const onScrollEnd = useCallback(() => {
    if (content[scrollIndex].name === 'date_of_birth') {
      setIsDateTimePickerVisible(true);
    }
  }, [setIsDateTimePickerVisible, scrollIndex, content]);
  return (
    <View>
      <View
        className="absolute bottom-0 z-10 h-1/4 w-full bg-none"
        onTouchEnd={() => {
          if (Keyboard.isVisible()) {
            Keyboard.dismiss();
          }
        }}
      />
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
        getItemType={(item: SignUpContent) => {
          return item.name;
        }}
        keyboardShouldPersistTaps="always"
        onScrollEnd={onScrollEnd}
        renderItem={({ item }: { item: SignUpContent }) => {
          return (
            <View className="h-fit w-screen gap-8 px-7 pb-20 pt-4">
              <View
                className="gap-4"
                onTouchEnd={() => {
                  if (Keyboard.isVisible()) {
                    Keyboard.dismiss();
                  }
                }}
              >
                <Text className="text-start text-3xl font-bold">
                  {item.title}
                </Text>
                <Text className="text-start text-lg font-normal">
                  {item.description}
                </Text>
              </View>

              <View className="w-full">
                <SignUpInputs
                  control={control}
                  name={item.name}
                  label={item.label}
                  onPressErase={() => {
                    resetField(item.name, {
                      keepError: false,
                      keepDirty: false,
                      keepTouched: true,
                    });
                  }}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
export default memo(SignUpScrollList);
