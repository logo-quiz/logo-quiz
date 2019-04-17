import { combineReducers } from "redux";
import { logoReducer } from './logo/reducers';

export const rootReducer = combineReducers({
  logo: logoReducer
})

export type AppState = ReturnType<typeof rootReducer>;
