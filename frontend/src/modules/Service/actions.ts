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
