import { Application } from 'express';
import getSchedule from './schedule';
import telegram from './telegram';
import getGroup from './getGroup';

export default function (app: Application): void {
  app.use('/telegram', telegram);
  app.use('/getSchedule', getSchedule);
  app.use('/getGroup', getGroup);
}
