import * as React from "react";
import { LevelPreview } from './components/LevelPreview/LevelPreview';
import { Level } from '@logo-quiz/models';

interface LevelListProps {
  levels: Partial<Level>[]
}

export class LevelList extends React.Component<LevelListProps> {
  render() {
    const mockLevels: Partial<Level>[] = [
      {
        _id: '12345',
        name: 'Level 1'
      },
      {
        _id: '67890',
        name: 'Level 2'
      }
    ];
    const levels = mockLevels.map(level => {
      return (
        <LevelPreview level={level} key={level._id}/>
      );
    });
    return (
      <div className="levels">{levels}</div>
    );
  }
}
