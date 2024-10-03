import { getAPIURI } from './API';

const BASE_URI = getAPIURI();

export const API_URL = {
  LOGIN: `${BASE_URI}/api/auth/login`,
  REGISTER: `${BASE_URI}/api/auth/register`,
  CASTAWAY: `${BASE_URI}/api/admin/castaway`,
  RESET_PASSWORD: `${BASE_URI}/api/auth/request-password-reset`,
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
  CASTAWAY_ADD: {
    INFO: 'Adding new Castaway',
    SUCCESS: 'Successfully added new Castaway!',
    ERROR: 'Unable to addd new castaway',
  },
  RESET_PASSWORD: {
    INFO: 'Requesting new password',
    SUCCESS: 'Successfully requested new password email!',
    ERROR: 'Unable to request new password.',
  },
};
