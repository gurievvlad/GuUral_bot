import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export default class Http {
  constructor() {
    this.api = axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 2000,
    });

    this.api.interceptors.response.use(response => {
      const { config, data } = response;
      console.log(`${config.method}: ${config.url}`, data);
      return data;
    });

    this.guUrl = 'https://gu-ural.ru/wp-admin';
    this.tgUrl = 'https://api.telegram.org';
    this.botId = process.env.TELEGRAM_BOT_ID || '';
    this.token = process.env.TELEGRAM_BOT_TOKEN || '';
  }
}
