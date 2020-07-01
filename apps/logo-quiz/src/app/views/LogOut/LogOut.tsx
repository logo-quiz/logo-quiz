import * as React from 'react';
import { connect } from 'react-redux';
import { logout } from '@logo-quiz/store';
import { Dispatch } from 'redux';

interface LogOutProps {
  logout: () => void;
}

class LogOut extends React.Component<LogOutProps> {
  logout = () => {
    this.props.logout();
  };

  render() {
    return <button onClick={this.logout}>logout</button>;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogOut);
