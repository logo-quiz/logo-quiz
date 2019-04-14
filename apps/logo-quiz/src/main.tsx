import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { App } from './app/app';
import { LevelList } from './app/views/LevelList/LeveLlist';
import { LogoVerify } from './app/views/LogoVerify/LogoVerify';
import { LogoList } from './app/views/LogoList/LogoList';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/logos/:id" component={LogoVerify}/>
      <Route path="/levels/:id" component={LogoList}/>
      <Route exact path="/levels" component={LevelList}/>
    </div>
  </Router>
);

ReactDOM.render(routing, document.querySelector('logo-quiz-root'));
