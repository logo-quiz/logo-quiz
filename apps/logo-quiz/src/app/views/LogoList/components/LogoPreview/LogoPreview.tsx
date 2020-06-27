import * as React from 'react';
import './LogoPreview.scss';
import { Logo } from '@logo-quiz/models';
import { Link } from 'react-router-dom';
import ReactImageAppear from 'react-image-appear';

interface LogoPreviewProps {
  logo: Partial<Logo>;
}

export class LogoPreview extends React.Component<LogoPreviewProps> {
  getCheckIcon() {
    return (
      <svg width="10px" height="8px" viewBox="0 0 10 8" version="1.1">
        <g id="logo-picker" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Mobile" transform="translate(-138.000000, -115.000000)" fill="#FFFFFF" fillRule="nonzero">
            <g id="Group-5" transform="translate(132.000000, 108.000000)">
              <g id="noun_Check_1807547" transform="translate(6.000000, 7.000000)">
                <g id="Group" transform="translate(0.000000, 0.109969)">
                  <path
                    d="M8.94468948,0.0574396552 C8.72029066,0.0649159601 8.50766025,0.159636237 8.35201707,0.321456897 C6.68219638,1.99488793 5.15907741,3.64096552 3.54598259,5.28372414 L1.5686119,3.70506897 C1.32799661,3.51257669 1.00296549,3.46307323 0.715954652,3.57520606 C0.428943811,3.6873389 0.223557022,3.94407239 0.177161512,4.24869749 C0.130766001,4.55332259 0.250410352,4.8595595 0.49102569,5.05205172 L3.07723259,7.12101724 C3.42043757,7.39481506 3.91458152,7.36697597 4.2248619,7.05636207 C6.08166879,5.19556897 7.74833776,3.36441379 9.56968948,1.53912931 C9.82573416,1.29165404 9.903289,0.912226883 9.76489162,0.584127738 C9.62649424,0.256028592 9.3006236,0.0467726398 8.94468948,0.0574396552 Z"
                    id="Shape"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }

  render() {
    return (
      <Link className="logo-preview" to={`/logos/${this.props.logo._id}`}>
        {/* <img className="logo-preview__image" src={this.props.logo.obfuscatedImageUrl} alt="logo image" /> */}

        <div className="logo-preview__image-wrapper">
          <ReactImageAppear
            className="logo-preview__image"
            src={this.props.logo.obfuscatedImageUrl}
            alt="logo image"
            animation="fadeIn"
            animationDuration="0.5s"
            showLoader={false}
            placeholderClass="placeholder-loading"
          />
        </div>

        {this.props.logo['validated'] && (
          <span className="logo-preview--valid vh-center">{this.getCheckIcon()}</span>
        )}
      </Link>
    );
  }
}
