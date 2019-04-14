import * as React from 'react';
import { Level } from '@logo-quiz/models';
import './LevelPreview.scss';
import { Link } from 'react-router-dom';

interface LevelPreviewProps {
  level: Partial<Level>;
};

export class LevelPreview extends React.Component<LevelPreviewProps> {
  render() {
    return (
      <Link className="level-button" to={`/levels/${this.props.level._id}`}>
        <h3>{this.props.level.name}</h3>
      </Link>
    );
  }
}
