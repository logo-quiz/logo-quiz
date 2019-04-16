import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import './LogoVerify.scss';
import { Logo } from '@logo-quiz/models';

interface MatchParams {
  id: string;
}

interface LogoVerifyState {
  guess: string[];
  /**
   * Map of used letter. Ex: user clicks on letter in position 5, that letter will be showed on the position 0 of the
   * guess array then the usedLetters value will be {5: 0}, indicating the letter in position #5 was used in position
   * #0 of guess array
   */
  usedLetters: { [key: number]: number };
}

interface LogoVerifyProps extends RouteComponentProps<MatchParams> {
}

export class LogoVerify extends React.Component<LogoVerifyProps, LogoVerifyState> {
  private readonly LETTERS_PER_ROW = 7;
  state = {
    usedLetters: {},
    guess: ['', '', '', '', ''] // TODO: populate this with the nameLength coming from the API
  };

  addToGuess = (index: number, letter: string) => {
    const availableIndex = this.state.guess.findIndex(el => !el);
    if (availableIndex !== -1) {
      const newGuess = this.state.guess.slice();
      newGuess[availableIndex] = letter;
      this.setState((prevState) => {
        const obj = {
          usedLetters: {
            ...prevState.usedLetters,
            [index]: availableIndex
          },
          guess: newGuess
        };
        return obj;
      });
    }
  };

  removeFromGuess = (idx: number) => {
    const newGuess = this.state.guess.slice();
    newGuess[idx] = undefined;
    this.setState((prevState) => {
      const usedLetters = prevState.usedLetters;

      for (let key in usedLetters) {
        const guessIdx = usedLetters[key];
        if (guessIdx === idx) {
          delete usedLetters[key];
        }
      }

      return {
        guess: newGuess,
        usedLetters
      };
    });
  };

  getNameButtons = (guess: string[], obfuscatedName: string): JSX.Element[] => {
    const placeholderMap = {
      '_': ' '
    };
    return obfuscatedName.split('').map((letterText, idx) => {
      return letterText === '*' ?
        <button key={idx} onClick={() => this.removeFromGuess(idx)}> {guess[idx] || ''} </button> :
        <span key={idx}>{placeholderMap[obfuscatedName[idx]] || obfuscatedName[idx]}</span>;
    });
  };

  getLetterWidth = () => {
    return `${Math.floor(100 / this.LETTERS_PER_ROW)}%`;
  };

  isLetterDisabled(i: number) {
    return this.state.usedLetters[i] !== undefined;
  }

  render() {
    // TODO: fetch info for logo
    const logo: Partial<Logo> = {
      letters: 'etjddkjgfuis',
      obfuscatedName: '****_***'
    };
    return (
      <div className={'logo-verify'}>
        <p>Logo ID: {this.props.match.params.id}</p>
        <div>
          {this.getNameButtons(this.state.guess, logo.obfuscatedName)}
        </div>
        <hr/>
        <div className={'logo-verify__letters'}>
          {
            logo.letters.split('').map((letter, i) => (
              <button key={i}
                      disabled={this.isLetterDisabled(i)}
                      onClick={() => this.addToGuess(i, letter)}
                      style={{ width: this.getLetterWidth() }}>
                {letter}
              </button>
            ))
          }
        </div>
      </div>
    );
  }
}
