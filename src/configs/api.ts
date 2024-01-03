import axios from 'axios';
import auth from './auth';

interface Api {
  defaults: {
    headers: {
      Authorization: string;
    };
  };

  get: (url: string) => Promise<any>;
  post: (url: string, data: any) => Promise<any>;
  put: (url: string, data: any) => Promise<any>;
  delete: (url: string) => Promise<any>;
}

const Api: Api = <Api>(<unknown>axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${auth.getToken()}`,
  },
}));

export default Api;
