import { Level } from '@logo-quiz/models';
import { AxiosError } from 'axios';

export const REQUEST_LEVELS = 'REQUEST_LEVELS';
export const REQUEST_LEVELS_SUCCESS = 'REQUEST_LEVELS_SUCCESS';
export const REQUEST_LEVELS_ERROR = 'REQUEST_LEVELS_ERROR';
export const FLUSH_LEVELS = 'FLUSH_LEVELS';

export interface LevelsState {
  levels: Partial<Level>[];
  isLoading: boolean;
}

interface RequestLevelsAction {
  type: typeof REQUEST_LEVELS;
}

interface RequestLevelSuccessAction {
  type: typeof REQUEST_LEVELS_SUCCESS;
  levels: Level[];
}

interface RequestLevelErrorAction {
  type: typeof REQUEST_LEVELS_ERROR;
  error: AxiosError;
}

interface FlushLevelsAction {
  type: typeof FLUSH_LEVELS;
}

export type LevelsActionTypes =
  | RequestLevelsAction
  | RequestLevelSuccessAction
  | RequestLevelErrorAction
  | FlushLevelsAction;
