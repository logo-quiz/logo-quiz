export const GUESS_LETTER = 'GUESS_LETTER';

export interface LogoState {
  guess: string[];
}

interface GuessLetterAction {
  type: typeof GUESS_LETTER;
  letter: string;
}

export type LogoActionTypes = GuessLetterAction;
