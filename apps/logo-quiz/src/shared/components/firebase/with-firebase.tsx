import * as React from 'react';
import { Firebase } from './firebase';

export const FirebaseContext: React.Context<Firebase> = React.createContext(null);

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase}/>}
  </FirebaseContext.Consumer>
);
