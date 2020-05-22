import { AxiosResponse } from 'axios';
import { Logo } from '@logo-quiz/models';
import { restApi } from '../api/calls';

export async function validateLogo(id: string, guess: string) {
  const result: AxiosResponse<{ status: boolean }> = await restApi.post(
    `/logos/${id}/validate`, //
    { guess }
  );
  return result.data.status;
}

export async function fetchLogo(id: string) {
  const logo: AxiosResponse<Logo> = await restApi.get(`/logos/${id}`);
  return logo.data;
}
