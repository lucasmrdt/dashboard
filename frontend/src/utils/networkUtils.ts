export const encodeUrlQuery = (query: {[key: string]: string}) =>
  Object.keys(query)
    .map(key => `${key}=${query[key]}`)
    .join('&');
