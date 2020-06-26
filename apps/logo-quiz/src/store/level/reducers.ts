import { LevelActionTypes, LevelState, REQUEST_LEVEL, REQUEST_LEVEL_SUCCESS, FLUSH_LEVEL } from './types';

const initialState: LevelState = {
  level: {},
  isLoading: false
};

export function levelReducer(state = initialState, action: LevelActionTypes): LevelState {
  switch (action.type) {
    case FLUSH_LEVEL:
      return { ...state, level: {} };
    case REQUEST_LEVEL:
      return { ...state, isLoading: true };
    case REQUEST_LEVEL_SUCCESS:
      return { ...state, level: action.level };
    default:
      return state;
  }
}
