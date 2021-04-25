import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';
import schedule from 'node-schedule';
import bodyParser from 'body-parser';
import Bot from './bot';
import { Recipient } from './database/models/recipient';

// load the environment variables from the .env file
dotenv.config({
  path: '.env',
});

class Server {
  public app = express();
}

const server = new Server();

server.app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

server.app.use(bodyParser.json());
routes(server.app);

server.app.listen(process.env.APP_PORT, () => {
  console.log('Listen on port', process.env.APP_PORT);
});

// Setup job schedule
schedule.scheduleJob('0 6 * * *', () => {
  Recipient.findAll().then((items: Recipient[]): void => {
    items.forEach((item): void => {
      if (!item.id) return;
      Bot.sendSchedule
        .sendYesterdayMessage(item.id)
        .then(message => {
          console.log(message);
        })
        .catch(err => {
          console.error(err);
        });
    });
  });
});
