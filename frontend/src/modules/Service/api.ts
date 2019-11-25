import Api from 'services/api';
import { BASE_URI } from 'constants/api';

export const getServices = () => Api.get(`${BASE_URI}/service`);
