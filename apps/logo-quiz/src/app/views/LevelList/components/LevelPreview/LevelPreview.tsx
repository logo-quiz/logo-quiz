import * as React from 'react';
import { Level } from '@logo-quiz/models';
import './LevelPreview.scss';
import { Link } from 'react-router-dom';

interface LevelPreviewProps {
  level: Partial<Level>;
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
    return this.getNumLogosValidated() / this.getNumLogos();
  }

  render() {
    return (
      <Link className="level-button" to={`/levels/${this.props.level._id}`}>
        <div className="justify-content-between v-center">
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
      </Link>
    );
  }
}
