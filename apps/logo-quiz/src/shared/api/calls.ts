import axios from 'axios';
import { env } from '@logo-quiz/environment';

export const restApi = axios.create({
  baseURL: env.apiUrl
});
