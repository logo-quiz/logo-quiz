import * as React from "react";
import { LevelPreview } from './components/LevelPreview/LevelPreview';
import { Level } from '@logo-quiz/models';

interface LevelListProps {
  levels: Partial<Level>[]
}

export class LevelList extends React.Component<LevelListProps> {
  render() {
    const levels = this.props.levels.map(level => {
      return (
        <LevelPreview level={level} key={level._id}/>
      );
    });
    return (
      <div className="levels">{levels}</div>
    );
  }
}
