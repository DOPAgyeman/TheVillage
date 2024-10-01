import React from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';

import { ControlledInput } from '@/ui';

type ForgotPasswordInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  onPressErase: () => void;
};

export const ForgotPasswordInputs = <T extends FieldValues>({
  control,
  name,
  label,
  onPressErase,
}: ForgotPasswordInputProps<T>) => {
  return (
    <ControlledInput
      control={control}
      name={name}
      label={label}
      keyboardType={
        name === 'email'
          ? 'email-address'
          : name === 'code'
          ? 'numeric'
          : 'default'
      }
      onPressErase={onPressErase}
      inputType={name === 'password' ? 'password' : 'text'}
    />
  );
};
