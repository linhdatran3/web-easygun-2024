import { endpoints } from './api/endpoints';
import { usePost } from './api/fetch';
import { Code } from './types/auth';

export function useRequestVerifyEmail() {
  const { executePost, isLoading, isError } = usePost<undefined, undefined>(endpoints.requestVerifyEmail());

  const requestVerifyEmail = async () => {
    const response = await executePost(undefined);
    if (response?.success) {
      return response?.success;
    } else {
      throw new Error(response?.message);
    }
  };

  return {
    requestVerifyEmail,
    isLoading,
    isError,
  };
}

export function useVerifyEmail() {
  const { executePost, isLoading, isError } = usePost<undefined, Code>(endpoints.verifyEmail());

  const verifyEmail = async (payload: Code) => {
    const response = await executePost(payload);
    if (response?.success) {
      return response?.success;
    } else {
      throw new Error(response?.message);
    }
  };

  return {
    verifyEmail,
    isLoading,
    isError,
  };
}