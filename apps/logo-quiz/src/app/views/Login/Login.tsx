import * as React from 'react';
import { AppState, loginUser } from '@logo-quiz/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

interface LoginProps {
  error: string;
  loginUser: typeof loginUser;
}

class Login extends React.Component<LoginProps> {

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    this.props.loginUser(data.get('email') as string, data.get('password') as string);
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" name="email" placeholder="Email"/>
          <input type="password" name="password" placeholder="Password"/>
          <button type="submit">Login</button>
        </form>
        <span>{this.props.error}</span>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  error: state.auth.error
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  loginUser: (email: string, password: string) => dispatch(loginUser(email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login as any);
