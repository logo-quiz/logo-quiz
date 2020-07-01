import {
  AuthActionTypes,
  REQUEST_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  LOGOUT,
  REQUEST_SIGN_UP,
  REQUEST_LOGIN_ERROR,
  REQUEST_SIGN_UP_ERROR
} from './types';
import { Dispatch } from 'redux';
import { login, signup } from '../../shared/services';

export function requestLogin(email: string, password: string): AuthActionTypes {
  return {
    type: REQUEST_LOGIN,
    email,
    password
  };
}

export function requestLoginSuccess(token: string): AuthActionTypes {
  return {
    type: REQUEST_LOGIN_SUCCESS,
    token
  };
}

export function requestLoginError(error: Error): AuthActionTypes {
  return {
    type: REQUEST_LOGIN_ERROR,
    error
  };
}

export function logout(): AuthActionTypes {
  return {
    type: LOGOUT
  };
}

export function requestSignUp(email: string, password: string): AuthActionTypes {
  return {
    type: REQUEST_SIGN_UP,
    email,
    password
  };
}

export function requestSignUpError(error: Error): AuthActionTypes {
  return {
    type: REQUEST_SIGN_UP_ERROR,
    error
  };
}

export function loginUser(email: string, password: string) {
  return function(dispatch: Dispatch) {
    dispatch(requestLogin(email, password));
    return login(email, password)
      .then(jwt => {
        dispatch(requestLoginSuccess(jwt));
      })
      .catch(error => {
        dispatch(requestLoginError(error));
      });
  };
}

export function signUpUser(email: string, password: string) {
  return function(dispatch: Dispatch) {
    dispatch(requestSignUp(email, password));
    return signup(email, password)
      .then(() => {
        loginUser(email, password)(dispatch);
      })
      .catch(error => {
        dispatch(requestSignUpError(error));
      });
  };
}
