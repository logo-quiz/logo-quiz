import * as React from 'react';
import { Component } from 'react';

import './app.scss';
import { Link } from 'react-router-dom';

export class App extends Component {
  render() {
    return (
      <div className="vh-center main">
        <div className="vh-center flex-column main__content">
          <h1 className="main__header">Logo Quiz</h1>
          <h2 className="main__subheader">Software Edition</h2>
          <img className="main__image" src="/assets/images/cover.png" alt="logos" />
          <Link className="main__button vh-center" to="/levels">
            Play
          </Link>
        </div>
        <div className="main__circle main__circle--one" />
        <div className="main__circle main__circle--two" />
      </div>
    );
  }
}
