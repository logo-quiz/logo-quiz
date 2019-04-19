import { combineReducers } from "redux";
import { logoReducer } from './logo/reducers';
import { systemReducer } from './system/reducers';

export const rootReducer = combineReducers({
  logo: logoReducer,
  system: systemReducer
})

export type AppState = ReturnType<typeof rootReducer>;
export * from './logo';
