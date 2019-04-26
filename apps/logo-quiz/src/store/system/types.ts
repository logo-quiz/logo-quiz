/** Actions */
export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';
/** -------- */

export interface SystemState {
  isLoading: boolean;
}

interface StartLoadingAction {
  type: typeof START_LOADING
}

interface StopLoadingAction {
  type: typeof STOP_LOADING
}

export type SystemActionTypes = StartLoadingAction | StopLoadingAction;
