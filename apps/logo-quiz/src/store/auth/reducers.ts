import { AuthState, AuthActionTypes, REQUEST_LOGIN, REQUEST_LOGIN_SUCCESS } from './types';

const initialState: AuthState = {
  loggedIn: false,
  token: undefined,
  isLoading: false,
  error: undefined
}

export function authReducer(
  state = initialState,
  action: AuthActionTypes
): AuthState {
  switch (action.type) {
    case REQUEST_LOGIN:
      return { ...state, isLoading: true };
    case REQUEST_LOGIN_SUCCESS:
      return { ...state, token: action.token }
    default:
      return state;
  }
}
