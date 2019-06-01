import { Level } from '@logo-quiz/models';
import { LevelsActionTypes, REQUEST_LEVELS, REQUEST_LEVELS_SUCCESS } from './types';
import { Dispatch } from 'redux';
// TODO the imported function 'fetchLevels' conflicts with this class' function 'fetchLevels'.
// We'll need to come up with better naming, or expose the service methods in a namespace 'LevelService'.
import { fetchLevels as apiFetchLevels } from '../../shared/services';

export function requestLevels(): LevelsActionTypes {
  return {
    type: REQUEST_LEVELS,
  };
}

export function requestLevelsSuccess(levels: Level[]): LevelsActionTypes {
  return {
    type: REQUEST_LEVELS_SUCCESS,
    levels,
  };
}

export function requestLevelsError(error): LevelsActionTypes {
  return {
    type: 'REQUEST_LEVELS_ERROR',
    error,
  };
}

export function fetchLevels() {
  return function(dispatch: Dispatch) {
    dispatch(requestLevels());
    return apiFetchLevels().then(levels => {
      dispatch(requestLevelsSuccess(levels));
    }).catch(error => {
      dispatch(requestLevelsError(error));
    });
  };
}
