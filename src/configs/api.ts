import axios from 'axios';
import auth from './auth';

interface API {
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

const API: API = <API>(<unknown>axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json' || 'multipart/form-data',
    Authorization: `Bearer ${auth.getToken()}`,
  },
}));

export default API;
