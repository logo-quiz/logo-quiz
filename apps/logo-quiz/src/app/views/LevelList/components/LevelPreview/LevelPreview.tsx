import * as React from "react";
import { Level } from '@logo-quiz/models';
import './LevelPreview.scss';

interface LevelPreviewProps {
  level: Partial<Level>;
};

export class LevelPreview extends React.Component<LevelPreviewProps> {
  render() {
    return (
      <button className="level-button">
        <h3>{this.props.level.name}</h3>
      </button>
    );
  }
}
