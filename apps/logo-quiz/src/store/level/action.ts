import { Level } from '@logo-quiz/models';
import { LevelActionTypes, REQUEST_LEVEL, REQUEST_LEVEL_SUCCESS } from './types';
import { Dispatch } from 'redux';
import axios, { AxiosResponse } from 'axios';

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

export function fetchLevel(id: string) {
  return function(dispatch: Dispatch) {
    dispatch(requestLevel(id));
    return axios.get(`http://localhost:3333/api/levels/${id}`)
    .then((level: AxiosResponse<Level>) => {
      dispatch(requestLevelSuccess(level.data));
    });
  };
}
