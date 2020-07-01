import * as React from 'react';
import { Level } from '@logo-quiz/models';
import './LevelPreview.scss';
import { Link } from 'react-router-dom';

interface LevelPreviewProps {
  level: Partial<Level>;
  isLocked: boolean;
  numLogosToUnlock: number;
}

export class LevelPreview extends React.Component<LevelPreviewProps> {
  get logos() {
    return this.props.level.logos;
  }

  getNumLogos() {
    return this.logos.length;
  }

  getNumLogosValidated() {
    return this.logos.filter(logo => logo.validated).length;
  }

  getValidatedRate() {
    const numLogos = this.getNumLogos();
    const numLogosValidated = this.getNumLogosValidated();
    return numLogos === 0 ? 0 : numLogosValidated / numLogos;
  }

  getLockIcon() {
    return (
      <svg width="16px" height="32px" viewBox="0 0 23 32" version="1.1">
        <g id="Page-1-Copy" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Mobile" transform="translate(-199.000000, -368.000000)" fill="#373F50" fillRule="nonzero">
            <g id="noun_Lock_3329902" transform="translate(199.000000, 368.000000)">
              <path
                d="M21.0845403,13.1779346 L20.125,13.1779346 L20.125,8.47064052 C20.125,3.79243494 16.2626454,0 11.4981895,0 C6.73373369,0 2.87137909,3.79243494 2.87137909,8.47064052 L2.87137909,13.1779346 L1.9154597,13.1779346 C0.857580518,13.1779346 0,14.0199904 0,15.058719 L0,30.1192156 C0,31.1579441 0.857580518,32 1.9154597,32 L21.0845403,32 C22.1424195,32 23,31.1579441 23,30.1192156 L23,15.058719 C23,14.0199904 22.1424195,13.1779346 21.0845403,13.1779346 Z M16.2904597,13.1779346 L6.7059194,13.1779346 L6.7059194,8.47064052 C6.65798951,6.75868152 7.56076333,5.15623533 9.06321528,4.28638117 C10.5656672,3.41652702 12.4307119,3.41652702 13.9331638,4.28638117 C15.4356158,5.15623533 16.3383896,6.75868152 16.2904597,8.47064052 L16.2904597,13.1779346 Z"
                id="Shape"
              />
            </g>
          </g>
        </g>
      </svg>
    );
  }

  getLevelContent() {
    return (
      <div className="justify-content-between v-center level-button__content">
        <h3 className="level-button__name">{this.props.level.name}</h3>
        <div>
          <h4 className="level-button__validated">
            {this.getNumLogosValidated()}/{this.getNumLogos()}
          </h4>
          <div className="level-button__bar">
            <span className="level-button__fill" style={{ width: this.getValidatedRate() * 100 + '%' }} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const toUnlock = this.props.numLogosToUnlock;
    return (
      <>
        {!this.props.isLocked && (
          <Link className="level-button" to={`/levels/${this.props.level._id}`}>
            {this.getLevelContent()}
          </Link>
        )}
        {this.props.isLocked && (
          <div className="level-button level-button--locked">
            {this.getLevelContent()}
            <div className="level-button__lock vh-center">
              {this.getLockIcon()}
              <p className="level-button__message">
                Guess {toUnlock} more {toUnlock > 1 ? 'logos' : 'logo'} to unlock
              </p>
            </div>
          </div>
        )}
      </>
    );
  }
}
