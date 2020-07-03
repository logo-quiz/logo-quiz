import { Injectable } from '@nestjs/common';
import * as Airbrake from '@airbrake/node';
import { config } from '@api/config';

@Injectable()
export class NotifierService {
  private notifier: any;

  constructor() {
    this.notifier = (new Airbrake.Notifier({
      ...config.airBreak,
      environment: config.environment,
    }));

  }

  notify(args: any) {
    this.notifier.notify(args);
  }
}
