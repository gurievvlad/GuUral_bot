import getSchedule from './schedule/index.js';
import telegram from './telegram/index.js';
import getGroup from './getGroup/index.js';

export default function (app) {
  app.use('/telegram', telegram);
  app.use('/getSchedule', getSchedule);
  app.use('/getGroup', getGroup);
}
