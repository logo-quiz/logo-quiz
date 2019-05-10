interface Config {
	version: string;
	isProduction: boolean;
	salt: string;
	session: {
		domain?: string;
		secret: string;
		timeout?: number;
  };
}

export const config: Partial<Config> = {
  salt: process.env.APP_SALT || 'mysalt',
	session: {
		secret: process.env.APP_SESSION_SECRET || 'mysecret'
  }
}
