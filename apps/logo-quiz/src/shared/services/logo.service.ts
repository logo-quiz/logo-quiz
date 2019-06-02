import axios, { AxiosResponse } from 'axios';
import { authHeader } from '../helpers';

export function validateLogo(id: string, guess: string) {
  return axios.post(`http://localhost:3333/api/logos/${id}/validate`, { guess }, { headers: authHeader() })
    .then((result: AxiosResponse<{status: boolean}>) => {
      return result.data.status;
    });
}
