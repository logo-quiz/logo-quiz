import { Environment } from './environment.interface';

export const environment: Environment = {
  production: true,
  dbUri: process.env.MONGODB_URI
};
