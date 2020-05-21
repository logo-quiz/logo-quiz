import axios from 'axios';
import { env } from '@logo-quiz/environment';

export async function login(email: string, password: string) {
  const payload = await axios.post(`${env.apiUrl}/auth/token`, {
    email,
    password
  });
  const jwt = payload.data.token;
  localStorage.setItem('jwt', JSON.stringify(jwt));
  return jwt;
}
