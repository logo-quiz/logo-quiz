import * as React from 'react';
import { LevelPreview } from './components/LevelPreview/LevelPreview';
import { Level } from '@logo-quiz/models';
import { AppState, fetchLevels } from '@logo-quiz/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import './LevelList.scss';

interface LevelListProps {
  fetchLevels: typeof fetchLevels;
  levels: Partial<Level>[];
}

export class LevelList extends React.Component<LevelListProps> {
  logosCompleted = 0;

  componentDidMount() {
    this.props.fetchLevels();
  }

  isLevelLocked(level: Partial<Level>) {
    // TODO: I think this should be done in the backend. It should send an 'isLocked' prop.
    return this.logosCompleted < (level.scoreToUnlock || 0);
  }

  render() {
    this.logosCompleted = this.props.levels.reduce((count, level) => {
      const logos = level.logos.filter(logo => logo.validated);
      return count + logos.length;
    }, 0);
    const levels = (this.props.levels || []).map(level => {
      return <LevelPreview isLocked={this.isLevelLocked(level)} level={level} key={level._id} />;
    });
    return (
      <div className="levels">
        <div className="levels__wrapper">{levels}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  levels: state.levels.levels
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchLevels: () => dispatch(fetchLevels())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LevelList as any);
