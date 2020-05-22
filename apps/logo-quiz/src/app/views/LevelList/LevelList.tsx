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
  componentDidMount() {
    this.props.fetchLevels();
  }

  render() {
    const levels = (this.props.levels || []).map(level => {
      return <LevelPreview level={level} key={level._id} />;
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
