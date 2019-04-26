import { combineReducers } from 'redux';
import { logoReducer } from './logo';
import { systemReducer } from './system/reducers';
import { levelReducer } from './level';
import { levelsReducer } from './levels';

export const rootReducer = combineReducers({
  logo: logoReducer,
  level: levelReducer,
  levels: levelsReducer,
  system: systemReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export * from './logo';
export * from './level';
export * from './levels';
