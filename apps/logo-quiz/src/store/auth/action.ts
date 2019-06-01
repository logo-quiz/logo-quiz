import { AuthActionTypes, REQUEST_LOGIN, REQUEST_LOGIN_SUCCESS } from './types';
import { Dispatch } from 'redux';
import { login } from '../../shared/services';

export function requestLogin(email: string, password: string): AuthActionTypes {
  return {
    type: REQUEST_LOGIN,
    email,
    password
  }
}

export function requestLoginSuccess(token: string): AuthActionTypes {
  return {
    type: REQUEST_LOGIN_SUCCESS,
    token
  }
}

export function loginUser(email: string, password: string) {
  return function(dispatch: Dispatch) {
    dispatch(requestLogin(email, password));
    return login(email, password).then(jwt => {
      dispatch(requestLoginSuccess(jwt))
    });
  }
}
