let accessToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const getAccessToken = () => {
  return accessToken;
};

export const clearAccessToken = () => {
  accessToken = null;
};


let onAuthExpired: (() => void) | null = null;

export const setAuthExpieredHandler = (
  callback : () => void
) => {
  onAuthExpired = callback;
};

export const notifyAuthExpired = () => {
  onAuthExpired?.();
};