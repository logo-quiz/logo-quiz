import { Level } from '@logo-quiz/models';
import { LevelActionTypes, REQUEST_LEVEL, REQUEST_LEVEL_SUCCESS, FLUSH_LEVEL } from './types';
import { Dispatch } from 'redux';
import { fetchLevel as apiFetchLevel } from '../../shared/services';

export function requestLevel(id: string): LevelActionTypes {
  return {
    type: REQUEST_LEVEL,
    id
  };
}

export function requestLevelSuccess(level: Level): LevelActionTypes {
  return {
    type: REQUEST_LEVEL_SUCCESS,
    level
  };
}

export function flushLevel(): LevelActionTypes {
  return {
    type: FLUSH_LEVEL
  };
}

export function fetchLevel(id: string) {
  return function(dispatch: Dispatch) {
    dispatch(requestLevel(id));
    return apiFetchLevel(id)
      .then((level: Level) => {
        dispatch(requestLevelSuccess(level));
      })
      .catch(error => {
        // TODO: dispatch(requestLevelError(error));
      });
  };
}
