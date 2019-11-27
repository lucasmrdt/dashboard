export const AUTH_WITH_TOKEN = 'AUTH_WITH_TOKEN';
export const authWithToken = (token: string) => ({
  type: AUTH_WITH_TOKEN,
  payload: {
    token,
  },
});

export const AUTH_WITH_CREDENTIAL = 'AUTH_WITH_CREDENTIAL';
export const authWithCredential = (email: string, password: string) => ({
  type: AUTH_WITH_CREDENTIAL,
  payload: {
    email,
    password,
  },
});

export const REGISTER_WITH_TOKEN = 'REGISTER_WITH_TOKEN';
export const registerWithToken = (email: string, name: string, token: string) => ({
  type: REGISTER_WITH_TOKEN,
  payload: {
    token,
    email,
    name,
  },
});

export const REGISTER_WITH_CREDENTIAL = 'REGISTER_WITH_CREDENTIAL';
export const registerWithCredential = (
  email: string,
  name: string,
  password: string
) => ({
  type: REGISTER_WITH_CREDENTIAL,
  payload: {
    email,
    name,
    password,
  },
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = (jwtToken?: string) => ({
  type: AUTH_SUCCESS,
  payload: {
    jwtToken,
  },
});

export const AUTH_FAILED = 'AUTH_FAILED';
export const authFailed = (error: string) => ({
  type: AUTH_FAILED,
  payload: {
    error,
  },
});

export const DISCONNECT = 'DISCONNECT';
export const disconnect = () => ({
  type: DISCONNECT,
});
