import { transform } from './objectUtils';

import { TransformOption } from './objectUtils';
import { Response } from 'types/apiTypes';

const response = <T>(data: T, success: boolean, options?: TransformOption) => ({
  data: transform(data, options),
  success,
});

export const success = <T>(data: T, options?: TransformOption): Response<T> =>
  response(data, true, options);

export const fail = (data: string) => response(data, false);
