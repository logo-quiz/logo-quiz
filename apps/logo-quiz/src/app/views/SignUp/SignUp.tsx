import * as React from 'react';
import { AppState, signUpUser } from '@logo-quiz/store';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

interface SignUpProps {
  error: string;
  signUpUser: typeof signUpUser;
}

class SignUp extends React.Component<SignUpProps> {

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    this.props.signUpUser(data.get('email') as string, data.get('password') as string);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" name="email" placeholder="Email"/>
          <input type="password" name="password" placeholder="Password"/>
          <button type="submit">Signup</button>
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
  signUpUser: (email: string, password: string) => dispatch(signUpUser(email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp as any);
