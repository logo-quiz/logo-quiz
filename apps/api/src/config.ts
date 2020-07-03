import * as dotenv from 'dotenv';

dotenv.config({ path: './apps/api/.env' });

export type EnvironmentName = 'production' | 'staging' | 'development';

interface Config {
  environment: EnvironmentName,
  version: string;
  isProduction: boolean;
  dbUri: string;
  salt: string;
  session: {
    domain?: string;
    secret: string;
    timeout?: number;
  };
  airBreak: {
    projectId: number;
    projectKey: string;
  }
}

export const config: Partial<Config> = {
  environment: <EnvironmentName>process.env.NODE_ENV || 'development',
  salt: process.env.APP_SALT || 'mysalt',
  dbUri: process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/logo-quiz',
  session: {
    secret: process.env.APP_SESSION_SECRET || 'mysecret',
  },
  airBreak: {
    projectId: Number.parseInt(process.env.AIRBRAKE_PROJECT_ID, 10),
    projectKey: process.env.AIRBRAKE_PROJECT_KEY,
  },
};
