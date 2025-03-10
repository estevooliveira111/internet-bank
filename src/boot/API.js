import axios from 'axios';
import router from '@/router';

const AcessAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers:{
    'X-Customer-Id': import.meta.env.VITE_API_CUSTOMER
  }
});

function isTokenExpired() {
  const expiresAt = localStorage.getItem('expires_at');

  if (!expiresAt) return true;

  const now = new Date().getTime();
  const expirationTime = new Date(expiresAt).getTime();

  return now >= expirationTime;
}

AcessAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    // if (token) {
    //   if (isTokenExpired()) {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('expires_at');
    //     router.push('/login');
    //     return Promise.reject(new Error('Sessão expirada. Faça login novamente.'));
    //   }

    //   config.headers.Authorization = `Bearer ${token}`;
    // } else {
    //   router.push('/login');
    // }

    return config;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('expires_at');
      router.push({ name: 'login' });
    }

    return Promise.reject(error);
  }
);

export { AcessAPI };