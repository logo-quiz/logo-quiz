import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { App } from './app/app';
import { LevelList } from './app/views/LevelList/LeveLlist';
import { LogoVerify } from './app/views/LogoVerify/LogoVerify';
import { LogoList } from './app/views/LogoList/LogoList';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './store';
import { devToolsEnhancer } from 'redux-devtools-extension';

const store = createStore(
  rootReducer,
  undefined,
  devToolsEnhancer({}),
);


const routing = (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={App}/>
        <Route path="/logos/:id" component={LogoVerify}/>
        <Route path="/levels/:id" component={LogoList}/>
        <Route exact path="/levels" component={LevelList}/>
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(routing, document.querySelector('logo-quiz-root'));
