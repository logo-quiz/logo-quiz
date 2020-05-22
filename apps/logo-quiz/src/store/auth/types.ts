import { User } from '@logo-quiz/models';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const REQUEST_LOGIN_SUCCESS = 'REQUEST_LOGIN_SUCCESS';
export const REQUEST_LOGIN_ERROR = 'REQUEST_LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';

export interface AuthState {
  loggedIn: boolean;
  token: string;
  isLoading: boolean;
  error: string;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

interface RequestLoginAction {
  type: typeof REQUEST_LOGIN;
  email: string;
  password: string;
}

interface RequestLoginSuccessAction {
  type: typeof REQUEST_LOGIN_SUCCESS;
  token: string;
}

export type AuthActionTypes = RequestLoginAction | RequestLoginSuccessAction | LogoutAction;
