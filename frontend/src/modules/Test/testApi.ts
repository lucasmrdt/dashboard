import Api from 'services/api';

const BASE_URI = 'https://jsonplaceholder.typicode.com/todos/1';

export const test = () => Api.get(BASE_URI);
