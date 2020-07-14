import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import './LogoVerify.scss';
import { Logo } from '@logo-quiz/models';
import {
  AppState,
  EMPTY_SPACE,
  fetchLogo,
  flushLogo,
  guessLetter,
  LogoState,
  LogoStatus,
  NO_LETTER,
  QuizLetter,
  removeLetterFromGuess,
  SPECIAL_CHAR,
  validateLogo,
} from '@logo-quiz/store';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Link } from 'react-router-dom';
import SVGBackArrow from '../../icons/back-arrow';
import SVGGreenCheckLg from '../../icons/green-check-lg';
import SVGDeleteLetter from '../../icons/delete-letter';

interface MatchParams {
  id: string;
}

interface LogoVerifyState {
  loadingGuess: number;
  loadingGuessDirection: 1 | -1;
}

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
  realImageUrl: string;
  isVerifying: boolean;
  nextLogo: Logo;
}

class LogoVerify extends React.Component<LogoVerifyProps, LogoVerifyState> {
  private loadingInterval: ReturnType<typeof setInterval>;

  private loadComponent(logoId: string) {
    this.setState({
      loadingGuess: -1,
      loadingGuessDirection: 1,
    });
    this.props.fetchLogo(logoId);
  }

  componentDidMount() {
    this.loadComponent(this.props.match.params.id);
    window.addEventListener('keyup', this.keyHandler);
  }

  componentWillReceiveProps(nextProps: LogoVerifyProps) {
    const currentLogoId = this.props.match.params.id;
    const newLogoId = nextProps.match.params.id;
    if (currentLogoId !== newLogoId) {
      this.props.flushLogo();
      this.loadComponent(newLogoId);
    }
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

    if (this.props.isVerifying) {
      this.startLoadingAnimation();
    } else if (this.loadingInterval) {
      this.setState({
        ...this.state,
        loadingGuess: -1,
      });
      clearInterval(this.loadingInterval);
      this.loadingInterval = null;
    }
  }

  private startLoadingAnimation() {
    if (!this.loadingInterval) {
      this.loadingInterval = setInterval(() => {
        this.setState((state, props) => {
          if (props.guess) {
            if (state.loadingGuessDirection > 0) {
              return {
                ...state,
                loadingGuess: state.loadingGuess + 1,
                loadingGuessDirection: state.loadingGuess >= props.guess.length ? -1 : 1,
              };
            } else {
              return {
                ...state,
                loadingGuess: state.loadingGuess - 1,
                loadingGuessDirection: state.loadingGuess < 0 ? 1 : -1,
              };
            }
          }
          return state;
        });
      }, 80);
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
    return guess.length > 0 && !guess.find(({ id }) => id === -1);
  }

  removeLastLetter = () => {
    let last: QuizLetter;
    const guess = this.props.guess;
    for (let i = guess.length - 1; i >= 0 && !last; i--) {
      if (guess[i].id >= 0) {
        last = guess[i];
      }
    }
    if (last) {
      this.props.removeLetterFromGuess(last);
    }
  };

  keyHandler = (e: KeyboardEvent) => {
    if (this.isVerified()) return;
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

  isVerified() {
    return !!(this.props.realImageUrl || this.props.logo.realImageUrl);
  }

  getNameButtons = (guess: QuizLetter[]): JSX.Element[] => {
    return guess.map((letter, idx) => {
      const defaultClass = 'logo-verify__guess-btn';
      const wrongClass = this.showGuessAsWrong() ? 'logo-verify__guess-btn--wrong' : '';
      const correctClass = this.isVerified() ? 'logo-verify__guess-btn--correct' : '';
      const btnClass = [defaultClass, wrongClass, correctClass].filter(Boolean).join(' ');

      const map: { [key: number]: () => JSX.Element } = {
        [EMPTY_SPACE.id]: () => {
          return <span key={idx} className={`${btnClass} ${defaultClass}--especial`}>
            &nbsp;
          </span>;
        },
        [SPECIAL_CHAR.id]: () => {
          return <span key={idx} className={`${btnClass} ${defaultClass}--especial`}>
            {letter.char}
          </span>;
        },
      };
      return map[letter.id] ? (
        map[letter.id]()
      ) : (
        <button
          className={`${btnClass}
          ${this.state.loadingGuess === idx ? 'logo-verify__guess-btn--loading' : ''}`}
          key={idx}
          disabled={this.isVerified()}
          style={{ width: 100 / guess.length + '%' }}
          onClick={() => this.props.removeLetterFromGuess(letter)}
        >
          <span className="logo-verify__btn-text">{letter.id === NO_LETTER.id ? '' : letter.char}</span>
        </button>
      );
    });
  };

  isLetterDisabled(id: number) {
    return this.props.guess.findIndex(guess => guess.id === id) !== -1;
  }

  getImageUrl() {
    return this.props.realImageUrl || this.props.logo.realImageUrl || this.props.logo.obfuscatedImageUrl;
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

  getButtonPlaceholders() {
    const buttons = [];
    for (let i = 0; i < 15; i++) {
      buttons.push(
        <div className="logo-verify__btn-wrapper h-center" key={i}>
          <div className="logo-verify__btn logo-verify__btn--empty">
            <div className="glow-loader"/>
          </div>
        </div>,
      );
    }
    return buttons;
  }

  render() {
    const options = this.props.options;
    const isVerified = this.isVerified();

    return (
      <div className="logo-verify container">
        {this.props.logo && (
          <div className="header-wrapper">
            <Link to={`/levels/${this.props.logo.level}`} className="header-back">
              <SVGBackArrow height="24px"/>
            </Link>
            <h3 className="header-title">Guess the logo!</h3>
          </div>
        )}

        {this.props.status === LogoStatus.Valid && (
          <div className="modal lv-modal">
            <div className="modal__backdrop"/>
            <div className="modal__wrapper">
              <div className="modal__content lv-modal__content">
                <SVGGreenCheckLg/>
                <p>Good guess!</p>
                {this.props.nextLogo && (
                  <Link
                    className="main__button lv-modal__button lv-modal__button--next"
                    to={this.props.nextLogo._id}
                    innerRef={node => {
                      // `node` refers to the mounted DOM element
                      // or null when unmounted
                      if (node) {
                        node.focus();
                      }
                    }}
                  >
                    <span className="lv-modal__back-text">Next logo</span>
                    <SVGBackArrow className="lv-modal__front-icon" height="16px"/>
                  </Link>
                )}
                <hr/>
                <Link
                  className="lv-modal__button lv-modal__button--prev"
                  to={`/levels/${this.props.logo.level}`}
                  innerRef={node => {
                    // `node` refers to the mounted DOM element
                    // or null when unmounted
                    if (node && isVerified) {
                      node.focus();
                    }
                  }}
                >
                  <SVGBackArrow className="lv-modal__back-icon" height="16px"/>
                  <span className="lv-modal__back-text">Back to logos</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="logo-verify__wrapper">
          <div className="logo-verify__image-wrapper vh-center">
            {this.getImageUrl() ? (
              <img className="logo-verify__image" src={this.getImageUrl()} alt="logo image"/>
            ) : (
              <div className="logo-verify__image-placeholder">
                <div className="glow-loader"/>
              </div>
            )}
          </div>

          <div className={`h-center logo-verify__guess ${isVerified ? 'logo-verify__guess--inactive' : ''}`}>
            {this.getNameButtons(this.props.guess)}
          </div>

          {options && options.length > 0 && (
            <div
              className={`logo-verify__letters ${isVerified ? 'logo-verify__letters--inactive' : ''}`}
            >
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
                    <SVGDeleteLetter/>
                  </span>
                </button>
              </div>
            </div>
          )}

          {(!options || options.length === 0) && (
            <div className="logo-verify__letters">{this.getButtonPlaceholders()}</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps: (state: AppState) => LogoState = (state: AppState) => ({
  ...state.logo,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  guessLetter: (letter: QuizLetter) => dispatch(guessLetter(letter)),
  removeLetterFromGuess: (letter: QuizLetter) => dispatch(removeLetterFromGuess(letter)),
  flushLogo: () => dispatch(flushLogo()),
  fetchLogo: (id: string) => dispatch(fetchLogo(id)),
  validateLogo: (id: string, guess: string) => dispatch(validateLogo(id, guess)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogoVerify);
