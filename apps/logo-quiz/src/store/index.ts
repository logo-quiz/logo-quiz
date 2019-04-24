import { combineReducers } from "redux";
import { logoReducer } from './logo/reducers';
import { systemReducer } from './system/reducers';
import { levelReducer } from './level';

export const rootReducer = combineReducers({
  logo: logoReducer,
  level: levelReducer,
  system: systemReducer
})

export type AppState = ReturnType<typeof rootReducer>;
export * from './logo';
export * from './level';
