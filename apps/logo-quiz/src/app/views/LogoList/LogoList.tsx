import * as React from 'react';
import './LogoList.scss';
import { RouteComponentProps } from 'react-router';
import { Level } from '@logo-quiz/models';
import { LogoPreview } from './components/LogoPreview/LogoPreview';
import { AppState, fetchLevel } from '@logo-quiz/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SVGBackArrow from '../../icons/back-arrow';

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

  getPlaceholders = () => {
    const array = [];
    for (let i = 0; i < 10; i++) {
      array.push(
        <div className="col-4 col-sm-3 logo-preview-wrapper" key={i}>
          <div className="logo-list__placeholder" />
        </div>,
      );
    }
    return array;
  };

  render() {
    const logos = (this.props.level && this.props.level.logos) || [];

    const renderedLogos = logos.map(logo => (
      <div className="col-4 col-sm-3 logo-preview-wrapper" key={logo._id}>
        <LogoPreview logo={logo} />
      </div>
    ));
    return (
      <div className="logo-list container">
        <div className="header-wrapper">
          <Link to={`/levels`} className="header-back">
            <SVGBackArrow height="24px" />
          </Link>
          <h3 className="header-title">{this.props.level.name}</h3>
        </div>
        <div className="logo-list__wrapper">
          <div className="logos">
            <div className="row">
              {renderedLogos.length > 0 && renderedLogos}
              {renderedLogos.length === 0 && this.getPlaceholders()}
            </div>
          </div>
        </div>
      </div>
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
  mapDispatchToProps,
)(LogoList as any);
