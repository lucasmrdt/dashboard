import { Service } from './types';

export const GET_SERVICES = 'GET_SERVICES';
export const getServices = () => ({
  type: GET_SERVICES,
});

export const GET_SERVICES_SUCCESS = 'GET_SERVICES_SUCCESS';
export const getServicesSuccess = (services: Service[]) => ({
  type: GET_SERVICES_SUCCESS,
  payload: { services },
});

export const GET_SERVICES_FAILURE = 'GET_SERVICES_FAILURE';
export const getServicesFailure = (message: string) => ({
  type: GET_SERVICES_FAILURE,
  payload: { message },
});

export const AUTH_SERVICE = 'AUTH_SERVICE';
export const authService = (serviceName: string, token: string) => ({
  type: AUTH_SERVICE,
  payload: { serviceName, token },
});

export const AUTH_SERVICE_SUCCESS = 'AUTH_SERVICE_SUCCESS';
export const authServiceSuccess = (serviceName: string) => ({
  type: AUTH_SERVICE_SUCCESS,
  payload: { serviceName },
});

export const AUTH_SERVICE_FAILURE = 'AUTH_SERVICE_FAILURE';
export const authServiceFailure = (error: string) => ({
  type: AUTH_SERVICE_FAILURE,
  payload: { error },
});
