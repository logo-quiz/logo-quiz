import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { App } from './app/app';
import LevelList from './app/views/LevelList/LevelList';
import LogoVerify from './app/views/LogoVerify/LogoVerify';
import LogoList from './app/views/LogoList/LogoList';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer, logout } from './store';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import Login from './app/views/Login/Login';
import './shared/api/http-interceptor';
import SignUp from './app/views/SignUp/SignUp';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware))
);

const onLogout = () => {
  store.dispatch(logout());
};

const routing = (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/logos/:id" component={LogoVerify} />
        <Route path="/levels/:id" component={LogoList} />
        <Route exact path="/levels" component={LevelList} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
      </div>
      <button className="logout-btn" onClick={onLogout}>
        logout
      </button>
    </Router>
  </Provider>
);

ReactDOM.render(routing, document.querySelector('logo-quiz-root'));
