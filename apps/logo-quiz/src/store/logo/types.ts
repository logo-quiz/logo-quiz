import { Logo } from '@logo-quiz/models';

/** Actions */
export const GUESS_LETTER = 'GUESS_LETTER';
export const REMOVE_LETTER_FROM_GUESS = 'REMOVE_LETTER_FROM_GUESS';
export const FLUSH_LOGO = 'FLUSH_LOGO';
export const REQUEST_LOGO = 'REQUEST_LOGO';
export const REQUEST_LOGO_ERROR = 'REQUEST_LOGO_ERROR';
export const REQUEST_LOGO_SUCCESS = 'REQUEST_LOGO_SUCCESS';
/** -------- */

export const NO_LETTER: GuessedLetter = { char: '*', id: -1 };
export const EMPTY_SPACE: GuessedLetter = { char: '_', id: -2 };
export const SPECIAL_CHAR: GuessedLetter = { char: '', id: -3 };

export interface GuessedLetter {
  char: string;
  id: number;
}

export interface LogoState {
  guess: GuessedLetter[];
  logo?: Partial<Logo>;
  isLoading: boolean;
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

export type LogoActionTypes = 
  GuessLetterAction |
  RemoveLetterFromGuessAction |
  RequestLogoAction |
  RequestLogoSuccessAction |
  FlushLogoAction;
