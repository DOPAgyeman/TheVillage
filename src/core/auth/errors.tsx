import type { ClerkAPIError } from '@clerk/types';
import type { UseFormSetError } from 'react-hook-form';

import { showErrorMessage } from '@/ui/flash-message';

type handleClerkErrorProps = {
  error: ClerkAPIError;
  setIndex?: (index: number) => void;
  setError?: UseFormSetError<any>;
  content?: any;
  fieldName?: string;
  shouldFocus?: boolean;
  hideFlashMessage?: boolean;
};

export const handleClerkError = (options: handleClerkErrorProps) => {
  if (!options.hideFlashMessage) {
    showErrorMessage({
      message:
        options.error.meta?.paramName === 'code'
          ? 'Incorrect code'
          : String(options.error.message).charAt(0).toUpperCase() +
            options.error.message.slice(1),
      description:
        options.error.longMessage === options.error.message
          ? ''
          : options.error.meta?.paramName === 'code'
          ? 'You have entered an incorrect code. Please try again.'
          : options.error.longMessage,
    });
  }
  if (options.content) {
    let findFieldWithError = options.content.find(
      (item: { name: string }) => item.name === options.error.meta?.paramName
    );
    let fieldWithErrorIndex = options.content.findIndex(
      (item: { name: string }) => item.name === options.error.meta?.paramName
    );
    console.log(options.error);
    if (findFieldWithError) {
      if (options.setError) {
        options.setError(
          findFieldWithError.name,
          {
            type: 'custom',
            message:
              options.error.meta?.paramName === 'code'
                ? 'You have entered an incorrect code. Please try again.'
                : options.error.message,
          },
          { shouldFocus: true }
        );
      }

      if (fieldWithErrorIndex !== -1) {
        if (options.setIndex) {
          options.setIndex(fieldWithErrorIndex);
        }
      }
    }
  } else if (options.setError && options.fieldName) {
    options.setError(
      options.fieldName,
      {
        type: 'custom',
        message:
          options.error.meta?.paramName === 'code'
            ? 'You have entered an incorrect code. Please try again.'
            : options.error.message,
      },
      { shouldFocus: options.shouldFocus || true }
    );
  }
};
