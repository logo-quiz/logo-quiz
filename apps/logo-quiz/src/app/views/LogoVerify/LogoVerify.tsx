import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import './LogoVerify.scss';
import { Logo } from '@logo-quiz/models';
import {
  AppState,
  guessLetter,
  GuessedLetter,
  EMPTY_SPACE,
  NO_LETTER,
  removeLetterFromGuess,
  fetchLogo
} from '@logo-quiz/store';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

interface MatchParams {
  id: string;
}

interface LogoVerifyState {}

interface LogoVerifyProps extends RouteComponentProps<MatchParams> {
  guessLetter: typeof guessLetter;
  removeLetterFromGuess: typeof removeLetterFromGuess;
  fetchLogo: typeof fetchLogo;
  guess: GuessedLetter[];
  logo: Logo;
}

class LogoVerify extends React.Component<LogoVerifyProps, LogoVerifyState> {
  private readonly LETTERS_PER_ROW = 7;

  componentDidMount() {
    this.props.fetchLogo(this.props.match.params.id);
  }

  getNameButtons = (guess: GuessedLetter[]): JSX.Element[] => {
    return guess.map((letter, idx) => {
      return letter.id !== EMPTY_SPACE.id ?
        <button key={idx} onClick={() => this.props.removeLetterFromGuess(letter)}>
        { letter.id === NO_LETTER.id ? '' : letter.char }
        </button> :
        <span key={idx}>&nbsp;</span>;
    });
  };

  getLetterWidth = () => {
    return `${Math.floor(100 / this.LETTERS_PER_ROW)}%`;
  };

  isLetterDisabled(id: number) {
    return this.props.guess.findIndex(guess => guess.id === id) !== -1;
  }

  render() {
    const letters = this.props.logo.letters;

    return (
      <div className='logo-verify'>
        <p>Logo ID: {this.props.match.params.id}</p>
        <div>
          {this.getNameButtons(this.props.guess)}
        </div>
        <hr/>
        <div className='logo-verify__letters'>
          {
            (letters || '').split('').map((letter, i) => (
              <button key={i}
                      disabled={this.isLetterDisabled(i)}
                      onClick={() => this.props.guessLetter({char: letter, id: i})}
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

const mapStateToProps = (state: AppState) => ({
  guess: state.logo.guess,
  logo: state.logo.logo
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  guessLetter: (letter: GuessedLetter) => dispatch(guessLetter(letter)),
  removeLetterFromGuess: (letter: GuessedLetter) => dispatch(removeLetterFromGuess(letter)),
  fetchLogo: (id: string) => dispatch(fetchLogo(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoVerify as any);
