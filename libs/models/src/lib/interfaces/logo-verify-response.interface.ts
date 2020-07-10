import { Logo } from '@logo-quiz/models';

export interface LogoVerifyResponse {
  status: boolean;
  realImageUrl: string;
  nextLogo?: Partial<Pick<Logo, 'id' | 'obfuscatedImageUrl'>>;
}
