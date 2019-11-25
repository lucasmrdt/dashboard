import Api from 'services/api';
import { BASE_URI } from 'constants/api';

export const getMe = () => Api.get(`${BASE_URI}/user/me`);

export const authWithCredential = (email: string, password: string) =>
  Api.post(`${BASE_URI}/auth/credential`, { email, password });

export const authWithToken = (token: string) =>
  Api.post(`${BASE_URI}/auth/OAuth`, { token });

export const registerWithCredential = (email: string, name: string, password: string) =>
  Api.post(`${BASE_URI}/user/credential`, { email, name, password });

export const registerWithToken = (email: string, name: string, token: string) =>
  Api.post(`${BASE_URI}/user/OAuth`, { email, name, token });
