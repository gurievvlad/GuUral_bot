import dotenv from 'dotenv';
import express from 'express';
import routes from './routes/index.js';
import schedule from 'node-schedule';
import bodyParser from 'body-parser';
import Bot from './bot/index.js';
import { Recipient } from './database/models/recipient.js';

// load the environment variables from the .env file
dotenv.config({
  path: '.env',
});

const server = express();

server.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

server.use(bodyParser.json());
routes(server);

server.listen(process.env.APP_PORT, () => {
  console.log('Listen on port', process.env.APP_PORT);
});

// Setup job schedule
schedule.scheduleJob('*/2 * * * *', () => {
  Recipient.findAll().then(items => {
    items.forEach(async recipient => {
      await Bot.sendSchedule.sendYesterdayMessage(recipient);
    });
  });
});
