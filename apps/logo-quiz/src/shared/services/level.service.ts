import axios, { AxiosResponse } from 'axios';
import { Level } from '@logo-quiz/models';
import { authHeader } from '../helpers';


export function fetchLevels() {
  return axios.get<Level[]>(`http://localhost:3333/api/levels`, {
    headers: authHeader()
  }).then((levels: AxiosResponse<Level[]>) => {
    return levels.data;
  });
}

export function fetchLevel(id: String) {
  return axios.get(`http://localhost:3333/api/levels/${id}`, {
    headers: authHeader()
  }).then((level: AxiosResponse<Level>) => {
    return level.data;
  });
}
