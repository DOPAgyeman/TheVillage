import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/ui';

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .min(1, { message: 'Please enter your email address' })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
    mode: 'all',
  });

  return (
    <View className="flex w-full flex-col gap-4">
      <View>
        <Text className="self-start pt-5 text-5xl font-semibold text-black dark:text-white">
          Log in
        </Text>
        <Text className="w-3/4 self-start text-start text-sm font-medium text-black dark:text-white">
          Continue where you left off and show love to your Village
        </Text>
      </View>
      <ControlledInput
        testID="email-input"
        control={control}
        name="email"
        placeholder="Email address"
      />
      <ControlledInput
        testID="password-input"
        control={control}
        name="password"
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button
        testID="login-button"
        label="Login"
        onPress={handleSubmit(onSubmit)}
        variant="default"
      />
      <Button
        testID="form-title"
        className="my-0 h-fit py-0"
        label="Forgot your password?"
        variant="ghost"
        textClassName="no-underline font-normal text-black dark:text-white"
      />
      <View className="flex w-full flex-row items-center justify-center gap-2 px-5">
        <View className="h-px flex-1 bg-black  opacity-20" />
        <Text className="text-base color-black">or</Text>
        <View className="h-px flex-1 bg-black opacity-20" />
      </View>
      <View className="flex w-full flex-row items-center justify-center gap-5 px-5">
        <Button label="" variant="default" className="bg-black" size="icon" />
        <Button label="" variant="default" className="bg-black" size="icon" />
        <Button label="" variant="default" className="bg-black" size="icon" />
      </View>
    </View>
  );
};
