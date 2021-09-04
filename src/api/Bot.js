import Http from './Http.js';

export default class Bot extends Http {
  constructor() {
    super();
    this.botUrl = `${this.tgUrl}/bot${this.botId}:${this.token}`;
  }

  async sendMessage(body) {
    return await this.api
      .post(`${this.botUrl}/sendMessage`, body)
      .then(data => data.data.result)
      .catch(err => {
        console.log(`deleteMessage(${body}): произошла ошибка: ${err}`);
        return null;
      });
  }

  async deleteMessage(body) {
    return await this.api
      .post(`${this.botUrl}/deleteMessage`, body)
      .then(data => data.data.result)
      .catch(err => {
        console.log(`deleteMessage(${body}): произошла ошибка: ${err}`);
        return null;
      });
  }

  async editMessage(body) {
    await this.deleteMessage({
      chat_id: body.chat_id,
      message_id: body.message_id,
    });
    return await this.sendMessage(body);
  }
}
