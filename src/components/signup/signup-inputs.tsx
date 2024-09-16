import React from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';

import { ControlledInput } from '@/ui';
import { DateTimePicker } from '@/ui/date-time-picker';

type SignupInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  onPressErase: () => void;
};

export const SignUpInputs = <T extends FieldValues>({
  control,
  name,
  label,
  onPressErase,
}: SignupInputProps<T>) => {
  if (name === 'date_of_birth') {
    return (
      <DateTimePicker
        control={control}
        name={name}
        mode="date"
        label="Date of birth"
      />
    );
  } else {
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
  }
};
