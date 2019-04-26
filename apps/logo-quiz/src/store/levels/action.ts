import { Level } from '@logo-quiz/models';
import { LevelsActionTypes, REQUEST_LEVELS, REQUEST_LEVELS_SUCCESS } from './types';
import { Dispatch } from 'redux';
import axios, { AxiosResponse } from 'axios';

export function requestLevels(): LevelsActionTypes {
  return {
    type: REQUEST_LEVELS
  };
}

export function requestLevelsSuccess(levels: Level[]): LevelsActionTypes {
  return {
    type: REQUEST_LEVELS_SUCCESS,
    levels
  };
}

export function fetchLevels() {
  return function(dispatch: Dispatch) {
    dispatch(requestLevels());
    return axios.get(`http://localhost:3333/api/levels`)
    .then((level: AxiosResponse<Level[]>) => {
      console.log(level)
      dispatch(requestLevelsSuccess(level.data));
    });
  };
}
