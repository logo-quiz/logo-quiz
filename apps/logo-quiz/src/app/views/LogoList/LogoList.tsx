import * as React from 'react';
import './LogoList.scss';
import { RouteComponentProps } from 'react-router';
import { Level } from '@logo-quiz/models';
import { LogoPreview } from './components/LogoPreview/LogoPreview';
import { AppState, fetchLevel } from '@logo-quiz/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

interface MatchParams {
  id: string;
}

interface LogoListProps extends RouteComponentProps<MatchParams> {
  fetchLevel: typeof fetchLevel;
  level: Level;
}

class LogoList extends React.Component<LogoListProps> {

  componentDidMount() {
    this.props.fetchLevel(this.props.match.params.id);
  }

  render() {
    const logos = this.props.level && this.props.level.logos || [];

    const renderedLogos = logos.map(logo => (
      <LogoPreview logo={logo} key={logo._id} />
    ));
    return (
      <div className="logos"> {renderedLogos} </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  level: state.level.level,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchLevel: (id: string) => dispatch(fetchLevel(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoList as any);
