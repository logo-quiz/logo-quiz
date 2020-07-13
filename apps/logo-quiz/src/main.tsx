import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { App } from './app/app';
import LevelList from './app/views/LevelList/LevelList';
import LogoVerify from './app/views/LogoVerify/LogoVerify';
import LogoList from './app/views/LogoList/LogoList';
import LogOut from './app/views/LogOut/LogOut';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './store';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import Login from './app/views/Login/Login';
import './shared/api/http-interceptor';
import SignUp from './app/views/SignUp/SignUp';
import { FirebaseContext } from './shared/components/firebase/with-firebase';
import { Firebase } from './shared/components/firebase/firebase';
import { ROUTES } from './shared/utils/routes';
import { environment } from '@logo-quiz/environment';
import { ErrorBoundary } from './shared/components/error-boundary/error-boundary';

const loggerMiddleware = createLogger();

const middlewares = [
  thunkMiddleware, //
  environment.production ? null : loggerMiddleware,
].filter(Boolean);

const store = createStore(
  rootReducer, //
  composeWithDevTools(applyMiddleware(...middlewares)),
);

const root = (
  <ErrorBoundary>
    <FirebaseContext.Provider value={new Firebase()}>
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={App} />
            <Route path={ROUTES.LOGOS_INDIVIDUAL} component={LogoVerify} />
            <Route path={ROUTES.LEVELS_INDIVIDUAL} component={LogoList} />
            <Route exact path={ROUTES.LEVELS_LIST} component={LevelList} />
            <Route exact path={ROUTES.LOGIN} component={Login} />
            <Route exact path={ROUTES.LOGOUT} component={LogOut} />
            <Route exact path={ROUTES.SIGNUP} component={SignUp} />
          </div>
        </Router>
      </Provider>
    </FirebaseContext.Provider>
  </ErrorBoundary>
);

ReactDOM.render(root, document.querySelector('logo-quiz-root'));
