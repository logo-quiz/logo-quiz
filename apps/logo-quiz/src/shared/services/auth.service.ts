import axios, { AxiosResponse } from 'axios';

export async function login(email: string, password: string) {
  const payload = await axios.post('http://localhost:3333/api/auth/token', {
    email,
    password
  });
  const jwt = payload.data.token;
  localStorage.setItem('jwt', JSON.stringify(jwt));
  return jwt;
}
