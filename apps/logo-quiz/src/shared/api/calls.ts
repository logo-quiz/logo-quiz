import axios from 'axios';
import { environment } from '@logo-quiz/environment';

export const restApi = axios.create({
  baseURL: environment.apiUrl
});
