import { Environment } from './environment.interface';

export const environment: Environment = {
  production: false,
  apiUrl: 'http://localhost:3333/api',
  firebase: {
    apiKey: 'AIzaSyA_b9oSr0au26gPHycw8j0P6R0HmXb6SUM',
    authDomain: 'logo-quiz-ff05c.firebaseapp.com',
    databaseURL: 'https://logo-quiz-ff05c.firebaseio.com',
    projectId: 'logo-quiz-ff05c',
    storageBucket: 'logo-quiz-ff05c.appspot.com',
    messagingSenderId: '906502881524',
    appId: '1:906502881524:web:4d8c037136f05351515ea1',
    measurementId: 'G-ZHR5SG2DBK',
  },
};
