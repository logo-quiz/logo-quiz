import { Logo } from '@logo-quiz/models';

/** Actions */
export const GUESS_LETTER = 'GUESS_LETTER';
export const REMOVE_LETTER_FROM_GUESS = 'REMOVE_LETTER_FROM_GUESS';
export const FLUSH_LOGO = 'FLUSH_LOGO';
export const REQUEST_LOGO = 'REQUEST_LOGO';
export const REQUEST_LOGO_ERROR = 'REQUEST_LOGO_ERROR';
export const REQUEST_LOGO_SUCCESS = 'REQUEST_LOGO_SUCCESS';
export const VERIFY_LOGO = 'VERIFY_LOGO';
export const VERIFY_LOGO_SUCCESS = 'VERIFY_LOGO_SUCCESS';
export const VEIFY_LOGO_ERROR = 'VEIFY_LOGO_ERROR';

/** -------- */

export const NO_LETTER: GuessedLetter = { char: '*', id: -1 };
export const EMPTY_SPACE: GuessedLetter = { char: '_', id: -2 };
export const SPECIAL_CHAR: GuessedLetter = { char: '', id: -3 };

export interface GuessedLetter {
  char: string;
  id: number;
}

export enum LogoStatus {
  Valid, Invalid, Indeterminate
}

export interface LogoState {
  guess: GuessedLetter[];
  logo?: Partial<Logo>;
  isLoading: boolean;
  status: LogoStatus;
}

interface GuessLetterAction {
  type: typeof GUESS_LETTER;
  letter: GuessedLetter;
}

interface RemoveLetterFromGuessAction {
  type: typeof REMOVE_LETTER_FROM_GUESS;
  letter: GuessedLetter;
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

interface VerifyLogoAction {
  type: typeof VERIFY_LOGO;
  id: string;
  guess: string;
}

interface VerifyLogoSuccessAction {
  type: typeof VERIFY_LOGO_SUCCESS;
  status: boolean;
}

export type LogoActionTypes = 
  GuessLetterAction |
  RemoveLetterFromGuessAction |
  RequestLogoAction |
  RequestLogoSuccessAction |
  VerifyLogoAction |
  VerifyLogoSuccessAction |
  FlushLogoAction;
