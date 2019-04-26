import * as React from 'react';
import './LogoPreview.scss'
import { Logo } from '@logo-quiz/models';
import { Link } from 'react-router-dom';

interface LogoPreviewProps {
  logo: Partial<Logo>;
}

export class LogoPreview extends React.Component<LogoPreviewProps> {
  render() {
    return (
      <Link className="logo-preview" to={`/logos/${this.props.logo._id}`}>
        <img className="logo-preview__image" src={this.props.logo.obfuscatedImageUrl} alt="logo image"/>
      </Link>
    );
  }
}
