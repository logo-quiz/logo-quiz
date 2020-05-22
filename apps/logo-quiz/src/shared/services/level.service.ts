import axios, { AxiosResponse } from 'axios';
import { Level } from '@logo-quiz/models';
import { authHeader } from '../helpers';
import { env } from '@logo-quiz/environment';

export function fetchLevels() {
  return axios
    .get<Level[]>(`${env.apiUrl}/levels`, {
      headers: authHeader()
    })
    .then((levels: AxiosResponse<Level[]>) => {
      return levels.data;
    });
}

export function fetchLevel(id: String) {
  return axios
    .get(`${env.apiUrl}/levels/${id}`, {
      headers: authHeader()
    })
    .then((level: AxiosResponse<Level>) => {
      return level.data;
    });
}
