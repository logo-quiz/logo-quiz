import { Environment } from './environment.interface';

export const environment: Environment = {
  production: true,
  apiUrl: '/api',
  firebase: {
    apiKey: 'AIzaSyByGkdd0Nly2t4vZP0HJ9EuriXnqmWTeaA',
    authDomain: 'logo-quiz-prod.firebaseapp.com',
    databaseURL: 'https://logo-quiz-prod.firebaseio.com',
    projectId: 'logo-quiz-prod',
    storageBucket: 'logo-quiz-prod.appspot.com',
    messagingSenderId: '653537369067',
    appId: '1:653537369067:web:7063dba90f49536558d7ae',
    measurementId: 'G-6MHFM5RFBW',
  },
};

export default environment;
