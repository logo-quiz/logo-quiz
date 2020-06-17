import { AxiosRequestConfig } from 'axios';
import { signup, login } from '../services';
import { restApi } from './calls';

async function requestInterceptor(config: AxiosRequestConfig) {
  // don't trigger the interceptor for login (/auth/token) and signup (POST /users)
  const ignore = /\/auth\/token|users/g.test(config.url);
  if (ignore) return config;

  let jwt = JSON.parse(localStorage.getItem('jwt'));

  // for non-logged users, create a dummy user and login immediately to keep the session
  if (!jwt) {
    const genRandom = () => Math.round(Math.random() * Math.pow(10, 20)).toString();
    const email = `${genRandom()}@random.com`;
    const password = genRandom();
    // create a dummy user and login
    await signup(email, password);
    jwt = await login(email, password);
  }

  config.headers.Authorization = `Bearer ${jwt}`;
  return config;
}

restApi.interceptors.request.use(requestInterceptor);
