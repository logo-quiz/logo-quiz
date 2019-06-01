import axios, { AxiosResponse } from 'axios';

export function login(email: string, password: string) {
  return axios.post('http://localhost:3333/api/auth/token', {
      email, password
    }).then((payload: AxiosResponse<{token: string}>) => {
      const jwt = payload.data.token;
      localStorage.setItem('jwt', JSON.stringify(jwt))
      return jwt;
    });
}
