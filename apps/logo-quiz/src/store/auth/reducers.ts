import { AuthState, AuthActionTypes, REQUEST_LOGIN, REQUEST_LOGIN_SUCCESS, LOGOUT, REQUEST_SIGN_UP, REQUEST_LOGIN_ERROR, REQUEST_SIGN_UP_ERROR } from './types';

const initialState: AuthState = {
  loggedIn: false,
  token: undefined,
  isLoading: false,
  error: undefined
};

export function authReducer(state = initialState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case REQUEST_LOGIN:
      return { ...state, isLoading: true };
    case REQUEST_LOGIN_SUCCESS:
      return { ...state, token: action.token };
    case REQUEST_SIGN_UP:
      return { ...state, isLoading: true };
    case REQUEST_SIGN_UP_ERROR:
    case REQUEST_LOGIN_ERROR:
      return { ...state, error: 'Login Error' };
    case LOGOUT:
      return { ...state };
    default:
      return state;
  }
}
