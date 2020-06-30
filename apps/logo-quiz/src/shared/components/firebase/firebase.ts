import * as app from 'firebase/app';
import 'firebase/analytics';
import { environment } from '@logo-quiz/environment';
import Analytics = firebase.analytics.Analytics;

export class Firebase {
  analytics: Analytics;

  constructor() {
    app.initializeApp(environment.firebase);
    this.analytics = app.analytics();
  }
}
