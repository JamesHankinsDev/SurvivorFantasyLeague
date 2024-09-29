import { getAPIURI } from './API';

const BASE_URI = getAPIURI();

export const API_URL = {
  LOGIN: `${BASE_URI}/api/auth/login`,
  REGISTER: `${BASE_URI}/api/auth/register`,
};

export const TOAST_MESSAGE = {
  LOGIN: {
    INFO: 'Signing in. This may take up to 1 minute.',
    SUCCESS: 'Sign in successful. Welcome back!',
    ERROR: 'Sign in failed.',
  },
  REGISTER: {
    INFO: 'Registering. This may take up to 1 minute.',
    SUCCESS: 'Registration successful!',
    ERROR: 'Error registering.',
  },
};
