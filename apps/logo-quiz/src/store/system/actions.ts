import { START_LOADING, SystemActionTypes, STOP_LOADING } from './types';

export function startLoading(): SystemActionTypes {
  return {
    type: START_LOADING
  }
}

export function stopLoading(): SystemActionTypes {
  return {
    type: STOP_LOADING
  }
}
