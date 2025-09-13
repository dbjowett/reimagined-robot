import type { Provider } from '../types';

// Set as environment variables in the future
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URL = import.meta.env.VITE_GOOGLE_REDIRECT_URL;

export const getProviderUrl = (nonce: string, provider: Provider) => {
  switch (provider) {
    case 'google':
      return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&response_type=id_token&redirect_uri=${GOOGLE_REDIRECT_URL}&scope=openid&nonce=${nonce}`;
    default:
      return '';
  }
};
