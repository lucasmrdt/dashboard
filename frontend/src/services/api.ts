import {encodeUrlQuery} from 'utils';

class Api {
  headers: {[ket: string]: string} = {};

  setAuthToken(authToken: string) {
    this.headers.Authorization = `Bearer ${authToken}`;
  }

  async get(endpoint: string, query: {[key: string]: any} = {}) {
    const res = await fetch(`${endpoint}?${encodeUrlQuery(query)}`, {
      headers: this.headers,
    });
    return res.json();
  }

  async post(endpoint: string, query: {[key: string]: any} = {}) {
    const res = await fetch(endpoint, {
      headers: this.headers,
      body: JSON.stringify(query),
      method: 'POST',
    });
    return res.json();
  }
}

export default new Api();
