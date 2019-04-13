import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import './LogoVerify.scss';
import { Logo } from '@logo-quiz/models';

interface MatchParams {
  id: string;
}

interface LogoVerifyState {
  guess: string[];
}

interface LogoVerifyProps extends RouteComponentProps<MatchParams> {
}

export class LogoVerify extends React.Component<LogoVerifyProps, LogoVerifyState> {

  state = {
    guess: ['', '', '', '', ''] // TODO: populate this with the nameLength coming from the API
  }

  getFirstHalf = (array: JSX.Element[]) => {
    return array.slice(0, Math.ceil(array.length / 2));
  }

  getSecondHalf = (array: JSX.Element[]) => {
    return array.slice(Math.ceil(array.length / 2), array.length);
  }

  addToGuess = (letter: string) => {
    const availableIndex = this.state.guess.findIndex(el => !el);
    const newGuess = this.state.guess.slice()
    newGuess[availableIndex] = letter;
    this.setState({
      guess: newGuess
    })
  }

  removeFromGuess = (idx: number) => {
    const newGuess = this.state.guess.slice();
    newGuess[idx] = undefined;
    this.setState({
      guess: newGuess
    });
  }

  getNameButtons = (guess: string[], nameLength: number): JSX.Element[] => {
    // trick to create a n-length array
    const arr = [].slice.apply(new Uint8Array(nameLength)) as number[];
    return arr.map((_, idx) => (
      <button key={idx} onClick={() => this.removeFromGuess(idx)}> {guess[idx] || ''} </button>
    ));
  }

  render() {
    // TODO: fetch info for logo
    const logo: Partial<Logo> = {
      letters: 'etjddkjgfuis',
      nameLength: 5
    }
    const letters = logo.letters.split('').map((letter, i) => (
      <button key={i} onClick={() => this.addToGuess(letter)}>{letter}</button>
    ));
    return (
      <div>
        <p>Logo ID: {this.props.match.params.id}</p>
        <div>
          {this.getNameButtons(this.state.guess, logo.nameLength)}
        </div>
        <hr/>
        <div>{this.getFirstHalf(letters)}</div>
        <div>{this.getSecondHalf(letters)}</div>  
      </div>
    );
  }
}
