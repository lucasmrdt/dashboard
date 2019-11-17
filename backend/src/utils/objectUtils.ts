export interface TransformOption {
  [previousKey: string]: any | null;
}

/**
 * Rename/omit keys of an object.
 *
 * @param object the Object
 * @param options transform object, `key` is the current name, `value` is the renamed key. Set value to null if you want to omit it.
 * @returns the transformed object.
 */
export const transform = (input: any, options: TransformOption = {}) => {
  if (!input || (input.constructor !== Array && input.constructor !== Object)) {
    return input;
  }

  const finalOptions: TransformOption = { _id: 'id', ...options };
  const output: any = Array.isArray(input) ? [] : {};

  for (const key in input) {
    if (finalOptions[key] === null) {
      continue;
    }
    const value = input[key];
    const renamedKey = finalOptions[key] || key;

    if (/^_/.test(renamedKey)) {
      continue;
    }

    if (typeof value === 'object') {
      output[renamedKey] = transform(value, options);
    } else {
      output[renamedKey] = value;
    }
  }
  return output;
};
