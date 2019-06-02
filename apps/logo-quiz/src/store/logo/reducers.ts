import { GuessedLetter } from '@logo-quiz/store';
import {
  EMPTY_SPACE,
  FLUSH_LOGO,
  GUESS_LETTER,
  LogoActionTypes,
  LogoState,
  NO_LETTER,
  REMOVE_LETTER_FROM_GUESS,
  REQUEST_LOGO,
  REQUEST_LOGO_SUCCESS,
  VERIFY_LOGO,
  VERIFY_LOGO_SUCCESS,
  LogoStatus
} from './types';

const initialState: LogoState = {
  guess: [],
  logo: {},
  isLoading: false,
  status: LogoStatus.Indeterminate
};

export function logoReducer(
  state = initialState,
  action: LogoActionTypes
): LogoState {
  const guess = state.guess.slice();
  switch (action.type) {
    case GUESS_LETTER:
      const availableIndex = state.guess.findIndex(el => el.id === NO_LETTER.id);
      if (availableIndex !== -1) {
        guess[availableIndex] = action.letter;
      }
      return { ...state, guess, status: LogoStatus.Indeterminate };
    case REMOVE_LETTER_FROM_GUESS:
      const index = state.guess.findIndex(el => el.id === action.letter.id);
      if (index !== -1) {
        guess[index] = NO_LETTER;
      }
      return { ...state, guess, status: LogoStatus.Indeterminate };
    case FLUSH_LOGO:
      return { ...state, logo: {}, status: LogoStatus.Indeterminate };
    case REQUEST_LOGO:
      return {
        ...state, isLoading: true
      };
    case REQUEST_LOGO_SUCCESS:
      const charMap: { [char: string]: GuessedLetter } = {
        '*': NO_LETTER,
        '_': EMPTY_SPACE
      };
      const initGuess = action.logo.obfuscatedName.split('')
      .map(letter => charMap[letter] || { char: letter, id: -3 });
      return {
        ...state, isLoading: false, logo: action.logo, guess: initGuess
      };
    case VERIFY_LOGO:
      return {
        ...state, isLoading: true
      }
    case VERIFY_LOGO_SUCCESS:
      return {
        ...state, status: action.status ? LogoStatus.Valid : LogoStatus.Invalid
      }
    default:
      return state;
  }
};
