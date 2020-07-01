import {
  LevelsActionTypes,
  LevelsState,
  REQUEST_LEVELS,
  REQUEST_LEVELS_SUCCESS,
  FLUSH_LEVELS
} from './types';

const initialState: LevelsState = {
  levels: [],
  isLoading: false
};

export function levelsReducer(state = initialState, action: LevelsActionTypes): LevelsState {
  switch (action.type) {
    case FLUSH_LEVELS:
      return initialState;
    case REQUEST_LEVELS:
      return { ...state, isLoading: true };
    case REQUEST_LEVELS_SUCCESS:
      return { ...state, levels: action.levels };
    default:
      return state;
  }
}
