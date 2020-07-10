import { Logo, LogoVerifyResponse } from '@logo-quiz/models';
import { AxiosError } from 'axios';

/** Actions */
export const GUESS_LETTER = 'GUESS_LETTER';
export const REMOVE_LETTER_FROM_GUESS = 'REMOVE_LETTER_FROM_GUESS';
export const FLUSH_LOGO = 'FLUSH_LOGO';
export const REQUEST_LOGO = 'REQUEST_LOGO';
export const REQUEST_LOGO_ERROR = 'REQUEST_LOGO_ERROR';
export const REQUEST_LOGO_SUCCESS = 'REQUEST_LOGO_SUCCESS';
export const VERIFY_LOGO = 'VERIFY_LOGO';
export const VERIFY_LOGO_SUCCESS = 'VERIFY_LOGO_SUCCESS';
export const VERIFY_LOGO_ERROR = 'VERIFY_LOGO_ERROR';
/** -------- */

export const NO_LETTER: QuizLetter = { char: '*', id: -1 };
export const EMPTY_SPACE: QuizLetter = { char: '_', id: -2 };
export const SPECIAL_CHAR: QuizLetter = { char: '', id: -3 };

export interface QuizLetter {
  char: string;
  id: number;
}

export enum LogoStatus {
  Valid,
  Invalid,
  Indeterminate
}

export interface LogoState {
  guess: QuizLetter[];
  options: QuizLetter[];
  logo?: Partial<Logo>;
  isLoading: boolean;
  isVerifying: boolean;
  status: LogoStatus;
  realImageUrl: string;
  nextLogo?: Partial<Logo>;
}

interface GuessLetterAction {
  type: typeof GUESS_LETTER;
  letter: QuizLetter;
}

interface RemoveLetterFromGuessAction {
  type: typeof REMOVE_LETTER_FROM_GUESS;
  letter: QuizLetter;
}

interface FlushLogoAction {
  type: typeof FLUSH_LOGO;
}

interface RequestLogoAction {
  type: typeof REQUEST_LOGO;
  id: string;
}

interface RequestLogoSuccessAction {
  type: typeof REQUEST_LOGO_SUCCESS;
  logo: Logo;
}

interface RequestLogoErrorAction {
  type: typeof REQUEST_LOGO_ERROR;
  error: AxiosError;
}

interface VerifyLogoAction {
  type: typeof VERIFY_LOGO;
  id: string;
  guess: string;
}

interface VerifyLogoSuccessAction {
  type: typeof VERIFY_LOGO_SUCCESS;
  data: LogoVerifyResponse;
}

export type LogoActionTypes =
  | GuessLetterAction
  | RemoveLetterFromGuessAction
  | RequestLogoAction
  | RequestLogoSuccessAction
  | RequestLogoErrorAction
  | VerifyLogoAction
  | VerifyLogoSuccessAction
  | FlushLogoAction;
