import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import './LogoVerify.scss';
import { Logo } from '@logo-quiz/models';
import {
  AppState,
  EMPTY_SPACE,
  fetchLogo,
  flushLogo,
  QuizLetter,
  guessLetter,
  NO_LETTER,
  removeLetterFromGuess,
  SPECIAL_CHAR,
  validateLogo,
  LogoStatus
} from '@logo-quiz/store';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Link } from 'react-router-dom';
import SVGBackArrow from '../../icons/back-arrow';
import SVGGreenCheckLg from '../../icons/green-check-lg';
import ReactImageAppear from 'react-image-appear';
import SVGDeleteLetter from '../../icons/delete-letter';

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
  guess: QuizLetter[];
  options: QuizLetter[];
  logo: Logo;
  status: LogoStatus;
}

class LogoVerify extends React.Component<LogoVerifyProps, LogoVerifyState> {
  private readonly LETTERS_PER_ROW = 5;

  componentDidMount() {
    this.props.fetchLogo(this.props.match.params.id);
    window.addEventListener('keyup', this.keyHandler);
  }

  componentWillUnmount() {
    this.props.flushLogo();
    window.removeEventListener('keyup', this.keyHandler);
  }

  componentDidUpdate(prevProps: LogoVerifyProps) {
    const isFirstUpdate = prevProps.guess.length === 0;
    const hasChangedGuess = !this.compareGuesses(prevProps.guess, this.props.guess);
    if (!isFirstUpdate && hasChangedGuess && this.isGuessComplete(this.props.guess)) {
      this.verifyLogo();
    }
  }

  private compareGuesses(guess1: QuizLetter[], guess2: QuizLetter[]) {
    if (guess1.length !== guess2.length) return false;
    for (let i = 0; i < guess1.length; i++) {
      if (guess1[i].id !== guess2[i].id) return false;
    }
    return true;
  }

  private isGuessComplete(guess: QuizLetter[]) {
    return !guess.find(({ id }) => id === -1);
  }

  removeLastLetter = () => {
    let last: QuizLetter;
    const guess = this.props.guess;
    for (let i = guess.length - 1; i >= 0 && !last; i--) {
      if (guess[i].id !== -1) {
        last = guess[i];
      }
    }
    if (last) {
      this.props.removeLetterFromGuess(last);
    }
  };

  keyHandler = (e: KeyboardEvent) => {
    const letter = e.key;
    if (letter === 'Backspace') {
      this.removeLastLetter();
    }
    const finalOption = this.props.options.find(({ char, id }) => {
      const matches = char === letter;
      const inGuess = this.props.guess.some(guessChar => guessChar.id === id);
      return matches && !inGuess;
    });
    if (finalOption) {
      this.guessLetter(finalOption);
    }
  };

  showGuessAsWrong() {
    return this.isGuessComplete(this.props.guess) && this.props.status === LogoStatus.Invalid;
  }

  getNameButtons = (guess: QuizLetter[]): JSX.Element[] => {
    return guess.map((letter, idx) => {
      const map: { [key: number]: () => JSX.Element } = {
        [EMPTY_SPACE.id]: () => {
          return <span key={idx}>&nbsp;</span>;
        },
        [SPECIAL_CHAR.id]: () => {
          return <span key={idx}>{letter.char}</span>;
        }
      };
      return map[letter.id] ? (
        map[letter.id]()
      ) : (
        <button
          className={`logo-verify__guess-btn ${
            this.showGuessAsWrong() ? 'logo-verify__guess-btn--wrong' : ''
          }`}
          key={idx}
          style={{ width: 100 / guess.length + '%' }}
          onClick={() => this.props.removeLetterFromGuess(letter)}
        >
          <span className="logo-verify__btn-text">{letter.id === NO_LETTER.id ? '' : letter.char}</span>
        </button>
      );
    });
  };

  getLetterWidth = () => {
    return `${Math.floor(100 / this.LETTERS_PER_ROW)}%`;
  };

  isLetterDisabled(id: number) {
    return this.props.guess.findIndex(guess => guess.id === id) !== -1;
  }

  getImage() {
    return this.props.logo.realImageUrl || this.props.logo.obfuscatedImageUrl;
  }

  verifyLogo() {
    const guess = this.props.guess.map(letter => letter.char).join('');
    this.props.validateLogo(this.props.match.params.id, guess);
  }

  guessLetter(letter: QuizLetter) {
    if (!this.isGuessComplete(this.props.guess)) {
      this.props.guessLetter(letter);
    }
  }

  render() {
    const options = this.props.options;
    return (
      <div className="logo-verify">
        {this.props.logo && (
          <div className="header-wrapper">
            <Link to={`/levels/${this.props.logo.level}`} className="header-back">
              <SVGBackArrow className="header-back" height="24px" />
            </Link>
            <h3 className="header-title">Guess the logo!</h3>
          </div>
        )}

        {this.props.status === LogoStatus.Valid && (
          <div className="modal lv-modal">
            <div className="modal__backdrop" />
            <div className="modal__wrapper">
              <div className="modal__content lv-modal__content">
                <SVGGreenCheckLg />
                <p>Good guess!</p>
                <Link className="main__button lv-modal__button" to={`/levels/${this.props.logo.level}`}>
                  <SVGBackArrow className="lv-modal__back-icon" height="16px" />
                  <span className="lv-modal__back-text">Back to logos</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="logo-verify__wrapper">
          <div className="logo-verify__image-wrapper vh-center">
            {/* <img className="logo-verify__image" src={this.getImage()} alt="logo image" /> */}
            {/* {!this.getImage() && <div className="placeholder-loading" />} */}
            {this.getImage() && (
              <ReactImageAppear
                className="logo-verify__image"
                src={this.getImage()}
                alt="logo image"
                animation="fadeIn"
                animationDuration="0.5s"
                showLoader={false}
                placeholderClass="placeholder-loading"
              />
            )}
          </div>

          <div className="h-center logo-verify__guess">{this.getNameButtons(this.props.guess)}</div>

          {options && options.length && (
            <div className="logo-verify__letters">
              {options.map(({ char, id }, i) => (
                <div className="logo-verify__btn-wrapper h-center" key={i}>
                  <button
                    className="logo-verify__btn"
                    disabled={this.isLetterDisabled(i)}
                    onClick={() => this.guessLetter({ char, id })}
                  >
                    <span className="logo-verify__btn-text">{char}</span>
                  </button>
                </div>
              ))}
              <div className="logo-verify__btn-wrapper h-center">
                <button className="logo-verify__btn logo-verify__btn--delete" onClick={this.removeLastLetter}>
                  <span className="logo-verify__btn-text">
                    <SVGDeleteLetter />
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  guess: state.logo.guess,
  options: state.logo.options,
  logo: state.logo.logo,
  status: state.logo.status
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  guessLetter: (letter: QuizLetter) => dispatch(guessLetter(letter)),
  removeLetterFromGuess: (letter: QuizLetter) => dispatch(removeLetterFromGuess(letter)),
  flushLogo: () => dispatch(flushLogo()),
  fetchLogo: (id: string) => dispatch(fetchLogo(id)),
  validateLogo: (id: string, guess: string) => dispatch(validateLogo(id, guess))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoVerify as any);
