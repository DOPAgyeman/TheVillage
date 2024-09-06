import * as React from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { useDateTimePickerHandler } from '@/core/zustand/use-datetimepicker-handler';
import { Input } from '@/ui';

type DateTimePickerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  mode: 'date' | 'time' | 'datetime' | undefined;
  label: string;
};

interface ControlledDateTimePickerProps<T extends FieldValues>
  extends DateTimePickerProps<T> {}

// only used with react-hook-form
export function DateTimePicker<T extends FieldValues>(
  props: ControlledDateTimePickerProps<T>
) {
  const { name, control, mode, label } = props;
  const { field, fieldState } = useController({ control, name });
  const isVisible = useDateTimePickerHandler.use.boolean();
  const toggleIsVisible = useDateTimePickerHandler.use.toggleBoolean();

  return (
    <View>
      <Input
        onPress={toggleIsVisible}
        showSoftInputOnFocus={false}
        label={label}
        value={field.value.toLocaleString('UTC', {
          dateStyle: 'short',
        })}
        error={fieldState.error?.message}
        onChangeText={field.onChange}
        defaultValue={field.value.toLocaleString('UTC', {
          dateStyle: 'short',
        })}
        ref={field.ref}
        selectionColor={'transparent'}
      />

      <DateTimePickerModal
        isVisible={isVisible}
        mode={mode}
        date={(field.value as Date) || new Date()}
        onConfirm={(date) => {
          field.onChange(date);
          toggleIsVisible();
        }}
        onCancel={toggleIsVisible}
        ref={field.ref}
      />
    </View>
  );
}
