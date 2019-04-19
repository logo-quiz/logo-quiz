import { SystemState, SystemActionTypes, START_LOADING, STOP_LOADING } from "./types";

const initialState: SystemState = {
  isLoading: false
}

export function systemReducer(
  state = initialState,
  action: SystemActionTypes
): SystemState {
  switch(action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case STOP_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
