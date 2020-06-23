import * as React from 'react';
import './LogoList.scss';
import { RouteComponentProps } from 'react-router';
import { Level } from '@logo-quiz/models';
import { LogoPreview } from './components/LogoPreview/LogoPreview';
import { AppState, fetchLevel } from '@logo-quiz/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
    const logos = (this.props.level && this.props.level.logos) || [];

    const renderedLogos = logos.map(logo => (
      <div className="col-xs-4 logo-preview-wrapper" key={logo._id}>
        <LogoPreview logo={logo} />
      </div>
    ));
    return (
      <div className="logo-list">
        <div className="header-wrapper">
          <Link to={`/levels`} className="header-back">
            <svg
              className="header-back"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              x="0px"
              y="0px"
              height="29px"
              viewBox="0 0 100 125"
              enableBackground="new 0 0 100 100"
              xmlSpace="preserve"
            >
              <path
                fill="#fff"
                d="M7.196,55.304l27.5,27.5c2.929,2.929,7.678,2.929,10.607,0s2.929-7.678,0-10.607L30.607,57.501H87.5  c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5H30.607l14.696-14.697c2.929-2.929,2.929-7.678,0-10.607s-7.678-2.929-10.607,0  l-27.5,27.5C4.267,47.626,4.267,52.375,7.196,55.304z"
              />
            </svg>
          </Link>
          <h3 className="header-title">Pick a logo</h3>
        </div>
        <div className="logo-list__wrapper">
          <div className="logos">
            <div className="row">{renderedLogos}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  level: state.level.level
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchLevel: (id: string) => dispatch(fetchLevel(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoList as any);
