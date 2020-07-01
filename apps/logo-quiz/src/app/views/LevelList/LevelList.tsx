import * as React from 'react';
import { LevelPreview } from './components/LevelPreview/LevelPreview';
import { Level } from '@logo-quiz/models';
import { AppState, fetchLevels, flushLevels, flushLevel } from '@logo-quiz/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import './LevelList.scss';

interface LevelListProps {
  fetchLevels: typeof fetchLevels;
  levels: Partial<Level>[];
  flushLevels: typeof flushLevels;
  flushLevel: typeof flushLevel;
}

export class LevelList extends React.Component<LevelListProps> {
  logosCompleted = 0;

  componentDidMount() {
    this.props.fetchLevels();

    // flush the current logo list, we don't want to keep it cached when we visit the next level
    this.props.flushLevel();
  }

  componentWillUnmount() {
    this.props.flushLevels();
  }

  isLevelLocked(level: Partial<Level>) {
    // TODO: I think this should be done in the backend. It should send an 'isLocked' prop.
    return this.logosCompleted < (level.scoreToUnlock || 0);
  }

  getNumLogosToUnlock(level: Partial<Level>) {
    // TODO: I think this should be done in the backend. It should send an 'isLocked' prop.
    return level.scoreToUnlock - this.logosCompleted;
  }

  getLevelsPlaceholder() {
    const placeholders = [];
    for (let i = 0; i < 4; i++) {
      placeholders.push(
        <div className="lplaceholder d-flex justify-content-between align-items-center" key={i}>
          <div className="lplaceholder__name">
            <div className="glow-loader" />
          </div>
          <div className="text-right">
            <div className="lplaceholder__progress">
              <div className="glow-loader" />
            </div>
            <div className="lplaceholder__bar">
              <div className="glow-loader" />
            </div>
          </div>
        </div>
      );
    }
    return placeholders;
  }

  render() {
    this.logosCompleted = this.props.levels.reduce((count, level) => {
      const logos = level.logos.filter(logo => logo.validated);
      return count + logos.length;
    }, 0);
    const levels = (this.props.levels || []).map(level => {
      return (
        <LevelPreview
          numLogosToUnlock={this.getNumLogosToUnlock(level)}
          isLocked={this.isLevelLocked(level)}
          level={level}
          key={level._id}
        />
      );
    });

    return (
      <div className="levels container">
        <div className="header-wrapper">
          <h3 className="header-title">Pick a level</h3>
        </div>

        <div className="levels__wrapper">{levels.length === 0 ? this.getLevelsPlaceholder() : levels}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  levels: state.levels.levels
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchLevels: () => dispatch(fetchLevels()),
  flushLevels: () => dispatch(flushLevels()),
  flushLevel: () => dispatch(flushLevel())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LevelList as any);
