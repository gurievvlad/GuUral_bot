import axios from 'axios';
require('dotenv').config();

export default class Http {
  readonly api = axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 2000,
  });

  readonly guUrl: string = 'https://gu-ural.ru/wp-admin';
  readonly tgUrl: string = 'https://api.telegram.org';
  readonly botId: string = process.env.TELEGRAM_BOT_ID ?? '';
  readonly token: string = process.env.TELEGRAM_BOT_TOKEN ?? '';
}
