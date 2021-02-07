import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';
import schedule from 'node-schedule';
import bodyParser from 'body-parser';
import Bot from './bot';
import { Recipient } from './database/models/recipient';
import greenlookExpress from 'greenlock-express';

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

greenlookExpress
  .init({
    packageRoot: process.env.GREENLOCK_PACKAGE_ROOT,

    // contact for security and critical bug notices
    maintainerEmail: process.env.GREENLOCK_MAINTAINER_EMAIL,

    // where to look for configuration
    configDir: process.env.GREENLOCK_CONFIG_DIR,

    // whether or not to run at cloudscale
    cluster: false,
  })
  .serve(server.app);

// Setup job schedule
schedule.scheduleJob('0 6 * * *', () => {
  Recipient.findAll().then((items: Recipient[]): void => {
    items.forEach((item): void => {
      Bot.sendSchedule.sendYesterdayMessage(item.id).catch(err => {
        console.log(err);
      });
    });
  });
});
