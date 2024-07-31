import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/ui';

const schema = z.object({
  firstName: z.string({
    required_error: 'Please enter your first name',
  }),
  lastName: z.string({
    required_error: 'Please enter your last name',
  }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export type SignUpFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const SignUpForm = ({ onSubmit = () => {} }: SignUpFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <View className="flex-1 justify-center p-4">
      <Text testID="form-title" className="pb-6 text-center text-2xl">
        Sign up
      </Text>

      <ControlledInput
        testID="first-name"
        control={control}
        name="firstName"
        label="First name"
      />
      <ControlledInput
        testID="last-name"
        control={control}
        name="lastName"
        label="Last name"
      />

      <ControlledInput
        testID="email-input"
        control={control}
        name="email"
        label="Email"
      />
      <ControlledInput
        testID="password-input"
        control={control}
        name="password"
        label="Password"
        placeholder="***"
        secureTextEntry={true}
      />
      <Button
        testID="signup-button"
        label="Sign up"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
