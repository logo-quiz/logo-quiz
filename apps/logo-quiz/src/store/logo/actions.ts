import {
  FLUSH_LOGO,
  GUESS_LETTER,
  QuizLetter,
  LogoActionTypes,
  REMOVE_LETTER_FROM_GUESS,
  REQUEST_LOGO,
  REQUEST_LOGO_SUCCESS,
  VERIFY_LOGO,
  VERIFY_LOGO_SUCCESS
} from './types';
import { Logo } from '@logo-quiz/models';
import { Dispatch } from 'redux';
import axios, { AxiosResponse } from 'axios';
import { validateLogo as apiValidateLogo } from '../../shared/services';
import { fetchLogo as apiFetchLogo } from '../../shared/services';

export function guessLetter(letter: QuizLetter): LogoActionTypes {
  return {
    type: GUESS_LETTER,
    letter
  };
}

export function removeLetterFromGuess(letter: QuizLetter): LogoActionTypes {
  return {
    type: REMOVE_LETTER_FROM_GUESS,
    letter
  };
}

export function flushLogo(): LogoActionTypes {
  return {
    type: FLUSH_LOGO
  };
}

export function requestLogo(id: string): LogoActionTypes {
  return {
    type: REQUEST_LOGO,
    id
  };
}

export function requestLogoSuccess(logo: Logo): LogoActionTypes {
  return {
    type: REQUEST_LOGO_SUCCESS,
    logo
  };
}

export function requestLogoError(error): LogoActionTypes {
  return {
    type: 'REQUEST_LOGO_ERROR',
    error
  };
}

export function verifyLogo(id: string, guess: string): LogoActionTypes {
  return {
    type: VERIFY_LOGO,
    id,
    guess
  };
}

export function verifyLogoSuccess(status: boolean): LogoActionTypes {
  return {
    type: VERIFY_LOGO_SUCCESS,
    status
  };
}

export function fetchLogo(id: string) {
  return function(dispatch: Dispatch) {
    dispatch(requestLogo(id));
    return apiFetchLogo(id)
      .then(logo => {
        dispatch(requestLogoSuccess(logo));
      })
      .catch(error => {
        dispatch(requestLogoError(error));
      });
  };
}

export function validateLogo(id: string, guess: string) {
  return function(dispatch: Dispatch) {
    dispatch(verifyLogo(id, guess));
    return apiValidateLogo(id, guess)
      .then(status => {
        dispatch(verifyLogoSuccess(status));
      })
      .catch(error => {
        // TODO: dispatch(verifyLogoError(error));
      });
  };
}
