import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import './LogoVerify.scss';
import { Logo } from '@logo-quiz/models';
import {
  AppState,
  EMPTY_SPACE,
  fetchLogo,
  flushLogo,
  GuessedLetter,
  guessLetter,
  NO_LETTER,
  removeLetterFromGuess,
  SPECIAL_CHAR,
  validateLogo,
  LogoStatus
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
  flushLogo: typeof flushLogo;
  validateLogo: typeof validateLogo;
  guess: GuessedLetter[];
  logo: Logo;
  status: LogoStatus;
}

class LogoVerify extends React.Component<LogoVerifyProps, LogoVerifyState> {
  private readonly LETTERS_PER_ROW = 7;

  componentDidMount() {
    this.props.fetchLogo(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.flushLogo();
  }

  getNameButtons = (guess: GuessedLetter[]): JSX.Element[] => {
    return guess.map((letter, idx) => {
      const map: { [key: number]: () => JSX.Element } = {
        [EMPTY_SPACE.id]: () => {
          return <span key={idx}>&nbsp;</span>;
        },
        [SPECIAL_CHAR.id]: () => {
          return <span key={idx}>{letter.char}</span>;
        },
      };
      return map[letter.id] ?
        map[letter.id]() :
        <button key={idx} onClick={() => this.props.removeLetterFromGuess(letter)}>
          {letter.id === NO_LETTER.id ? '' : letter.char}
        </button>;
    });
  };

  getLetterWidth = () => {
    return `${Math.floor(100 / this.LETTERS_PER_ROW)}%`;
  };

  isLetterDisabled(id: number) {
    return this.props.guess.findIndex(guess => guess.id === id) !== -1;
  }

  getImage() {
    return this.props.logo.obfuscatedImageUrl;
  }

  verifyLogo() {
    const guess = this.props.guess.map(letter => letter.char).join('');
    this.props.validateLogo(this.props.match.params.id, guess);
  }

  render() {
    const letters = this.props.logo.letters;

    return (
      <div className='logo-verify'>
        {this.getImage() && <img className="logo-verify__image" src={this.getImage()} alt="logo image"/>}
        <div>
          {this.getNameButtons(this.props.guess)}
        </div>
        <button onClick={() => this.verifyLogo()}>Verify</button>
        {(this.props.status === LogoStatus.Valid) && (
          <div className="success">Good Guess!</div>
        )}
        {(this.props.status === LogoStatus.Invalid) && (
          <div className="error">Bad Guess :(</div>
        )}
        <hr/>
        <div className='logo-verify__letters'>
          {
            (letters || '').split('').map((letter, i) => (
              <button key={i}
                      disabled={this.isLetterDisabled(i)}
                      onClick={() => this.props.guessLetter({ char: letter, id: i })}
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
  logo: state.logo.logo,
  status: state.logo.status
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  guessLetter: (letter: GuessedLetter) => dispatch(guessLetter(letter)),
  removeLetterFromGuess: (letter: GuessedLetter) => dispatch(removeLetterFromGuess(letter)),
  flushLogo: () => dispatch(flushLogo()),
  fetchLogo: (id: string) => dispatch(fetchLogo(id)),
  validateLogo: (id: string, guess: string) => dispatch(validateLogo(id, guess)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogoVerify as any);
