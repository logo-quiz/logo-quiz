import axios, { AxiosResponse } from 'axios';
import { authHeader } from '../helpers';
import { Logo } from '@logo-quiz/models';
import { env } from '@logo-quiz/environment';

export async function validateLogo(id: string, guess: string) {
  const result: AxiosResponse<{ status: boolean }> = await axios.post(
    `${env.apiUrl}/logos/${id}/validate`,
    { guess },
    { headers: authHeader() }
  );
  return result.data.status;
}

export async function fetchLogo(id: string) {
  const logo: AxiosResponse<Logo> = await axios.get(`${env.apiUrl}/logos/${id}`, {
    headers: authHeader()
  });
  return logo.data;
}
