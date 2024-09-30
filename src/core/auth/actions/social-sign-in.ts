import type {
  StartOAuthFlowParams,
  StartOAuthFlowReturnType,
} from '@clerk/clerk-expo';
import { isClerkAPIResponseError } from '@clerk/clerk-expo';

export type SocialSignInOptions = {
  startOAuthFlow: (
    startOAuthFlowParams?: StartOAuthFlowParams
  ) => Promise<StartOAuthFlowReturnType>;
};

export const SocialSignIn = async (options: SocialSignInOptions) => {
  try {
    const { createdSessionId, setActive, authSessionResult } =
      await options.startOAuthFlow();

    if (createdSessionId && setActive) {
      await setActive({ session: createdSessionId });
      return authSessionResult ?? 'Success';
    } else {
      throw new Error('An error has occurred while signing in');
    }
  } catch (error) {
    if (isClerkAPIResponseError(error)) {
      throw error;
    } else {
      throw new Error('An error has occurred while signing in');
    }
  }
};
