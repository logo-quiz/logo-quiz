import * as React from "react";
import { Component } from "react";

import "./app.sass";
import { LevelList } from './views/LevelList/LeveLlist';
import { Level } from '@logo-quiz/models';

export class App extends Component {
  render() {
    const levels: Partial<Level>[] = [
      {
        _id: '12345',
        name: 'Level 1'
      },
      {
        _id: '67890',
        name: 'Level 2'
      }
    ];
    return (
      <div>
        <LevelList levels={levels}/>
      </div>
    );
  }
}
