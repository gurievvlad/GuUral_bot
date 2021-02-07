import Http from './Http';
import { sendMessageBodyType, editMessageBodyType, deleteMessageBodyType } from '../types/BotInterface';
import TelegramBot from 'node-telegram-bot-api';

export default class Bot extends Http {
  botUrl = `${this.tgUrl}/bot${this.botId}:${this.token}`;

  async sendMessage(body: sendMessageBodyType): Promise<TelegramBot.Message> {
    return new Promise((resolve, reject) => {
      this.api
        .post(`${this.botUrl}/sendMessage`, body)
        .then((data: { data: { ok: boolean; result: TelegramBot.Message } }) => {
          resolve(data.data.result);
        })
        .catch((err: Error) => {
          console.log(err);
          reject();
        });
    });
  }

  async deleteMessage(body: deleteMessageBodyType): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      this.api
        .post(`${this.botUrl}/deleteMessage`, body)
        .then((data: { data: { ok: boolean; result: boolean } }) => {
          resolve(data.data.result);
        })
        .catch((err: Error) => {
          console.log(err);
          reject(err);
        });
    });
  }

  async editMessage(body: editMessageBodyType): Promise<TelegramBot.Message> {
    return new Promise((resolve, reject) => {
      try {
        this.deleteMessage({
          chat_id: Number(body.chat_id),
          message_id: body.message_id,
        });
      } catch (err) {
        console.log(err);
      }

      this.sendMessage(body)
        .then((data: TelegramBot.Message) => resolve(data))
        .catch((err: Error) => {
          console.log(err);
          reject();
        });
    });
  }
}
