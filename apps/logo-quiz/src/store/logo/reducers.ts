import { LogoState, LogoActionTypes, GUESS_LETTER } from './types';

const initialState: LogoState = {
  guess: []
}

export function logoReducer(
  state = initialState,
  action: LogoActionTypes
): LogoState {
  switch (action.type) {
    case GUESS_LETTER:
      return {
        guess: [...state.guess, action.letter]
      }
  }
};
