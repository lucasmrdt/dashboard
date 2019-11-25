import { encodeUrlQuery } from 'utils';

import { Response } from 'types/Api';

const wait = (t: number) => new Promise(r => setTimeout(r, t));

class Api {
  headers: { [ket: string]: string } = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  setAuthToken(authToken: string) {
    this.headers.Authorization = authToken;
  }

  async get<T = any>(
    endpoint: string,
    query: { [key: string]: any } = {}
  ): Promise<Response<T>> {
    // await wait(1000);
    const res = await fetch(`${endpoint}?${encodeUrlQuery(query)}`, {
      headers: this.headers,
    });
    return res.json();
  }

  async post<T = any>(
    endpoint: string,
    query: { [key: string]: any } = {}
  ): Promise<Response<T>> {
    // await wait(1000);
    const res = await fetch(endpoint, {
      headers: this.headers,
      body: JSON.stringify(query),
      method: 'POST',
    });
    return res.json();
  }
}

export default new Api();
