import { LogoActionTypes, GUESS_LETTER } from './types';

export function guessLetter(letter: string): LogoActionTypes {
  return {
    type: GUESS_LETTER,
    letter
  }
}
