import {
  FLUSH_LOGO,
  GUESS_LETTER,
  GuessedLetter,
  LogoActionTypes,
  REMOVE_LETTER_FROM_GUESS,
  REQUEST_LOGO,
  REQUEST_LOGO_SUCCESS
} from './types';
import { Logo } from '@logo-quiz/models';
import { Dispatch } from 'redux';
import axios, { AxiosResponse } from 'axios';

export function guessLetter(letter: GuessedLetter): LogoActionTypes {
  return {
    type: GUESS_LETTER,
    letter
  };
}

export function removeLetterFromGuess(letter: GuessedLetter): LogoActionTypes {
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

export function fetchLogo(id: string) {
  return function(dispatch: Dispatch) {
    dispatch(requestLogo(id));
    return axios.get(`http://localhost:3333/api/logos/${id}`)
    .then((logo: AxiosResponse<Logo>) => {
      dispatch(requestLogoSuccess(logo.data));
    });
  };
}
