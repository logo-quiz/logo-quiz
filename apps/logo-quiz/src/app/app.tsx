import * as React from "react";
import { Component } from "react";

import "./app.sass";
import { LevelList } from './views/LevelList/LeveLlist';
import { Level } from '@logo-quiz/models';
import { Link} from 'react-router-dom';

export class App extends Component {
  render() {
    return (
      <div>
        <h1>Logo Quiz!</h1>
        <Link to="/levels">Levels</Link>
      </div>
    );
  }
}
