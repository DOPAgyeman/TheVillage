import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/ui';

const schema = z.object({
  code: z.string({
    required_error: 'Please enter your email verification code',
  }),
});

export type FormType = z.infer<typeof schema>;

export type VerificationCodeFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const EmailVerificationCodeForm = ({
  onSubmit = () => {},
}: VerificationCodeFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <View className="flex-1 justify-center p-4">
      <Text testID="form-title" className="pb-6 text-center text-2xl">
        Enter your email verification code
      </Text>

      <ControlledInput
        testID="code"
        control={control}
        name="code"
        label="Code"
      />
      <Button
        testID="verification-code-button"
        label="Verify"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
