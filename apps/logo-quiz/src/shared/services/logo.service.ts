import { AxiosResponse } from 'axios';
import { Logo, LogoVerifyResponse } from '@logo-quiz/models';
import { restApi } from '../api/calls';

export async function validateLogo(id: string, guess: string): Promise<LogoVerifyResponse> {
  const result: AxiosResponse<LogoVerifyResponse> = await restApi.post(
    `/logos/${id}/validate`,
    { guess }
  );
  return result.data;
}

export async function fetchLogo(id: string): Promise<Logo> {
  const logo: AxiosResponse<Logo> = await restApi.get(`/logos/${id}`);
  return logo.data;
}
