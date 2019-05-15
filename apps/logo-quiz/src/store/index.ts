import { combineReducers } from 'redux';
import { logoReducer } from './logo';
import { systemReducer } from './system/reducers';
import { levelReducer } from './level';
import { levelsReducer } from './levels';
import { authReducer } from './auth/reducers';

export const rootReducer = combineReducers({
  logo: logoReducer,
  level: levelReducer,
  levels: levelsReducer,
  system: systemReducer,
  auth: authReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export * from './logo';
export * from './level';
export * from './levels';
export * from './auth';
