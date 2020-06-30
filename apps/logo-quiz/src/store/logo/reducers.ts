import { QuizLetter } from '@logo-quiz/store';
import {
  EMPTY_SPACE,
  FLUSH_LOGO,
  GUESS_LETTER,
  LogoActionTypes,
  LogoState,
  LogoStatus,
  NO_LETTER,
  REMOVE_LETTER_FROM_GUESS,
  REQUEST_LOGO,
  REQUEST_LOGO_SUCCESS,
  VERIFY_LOGO,
  VERIFY_LOGO_SUCCESS,
} from './types';

const initialState: LogoState = {
  guess: [],
  options: [],
  logo: {},
  isLoading: false,
  status: LogoStatus.Indeterminate,
  realImageUrl: '',
};

export function logoReducer(state = initialState, action: LogoActionTypes): LogoState {
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
      return {
        ...state,
        ...initialState,
      };
    case REQUEST_LOGO:
      return {
        ...state,
        isLoading: true,
      };
    case REQUEST_LOGO_SUCCESS:
      const charMap: { [char: string]: QuizLetter } = {
        '*': NO_LETTER,
        _: EMPTY_SPACE,
      };

      let initGuess = action.logo.obfuscatedName
      .split('')
      .map(letter => charMap[letter] || { char: letter, id: -3 });

      const initOptions: QuizLetter[] = action.logo.letters.split('').map((char, id) => ({ char, id }));
      const logoName = action.logo.name;

      // populate the guess if the real name comes in the response, it means the user has validated the logo
      if (logoName) {
        const cacheOptions = initOptions.slice();
        initGuess = [];
        logoName.split('').forEach(letter => {
          const quizLetterIdx = cacheOptions.findIndex(({ char }) => char === letter);
          initGuess.push(cacheOptions[quizLetterIdx]);
          cacheOptions.splice(quizLetterIdx, 1);
        });
      }
      return {
        ...state,
        isLoading: false,
        logo: action.logo,
        guess: initGuess,
        options: initOptions,
      };
    case VERIFY_LOGO:
      return {
        ...state,
        isLoading: true,
      };
    case VERIFY_LOGO_SUCCESS:
      return {
        ...state,
        status: action.data.status ? LogoStatus.Valid : LogoStatus.Invalid,
        realImageUrl: action.data.realImageUrl,
      };
    default:
      return state;
  }
}
