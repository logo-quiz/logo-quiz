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
      <Link className="level-button" to={`/logos/${this.props.logo._id}`}>
        <h3>{this.props.logo.name}</h3>
      </Link>
    );
  }
}
