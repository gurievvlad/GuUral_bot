import Bot from './index';
import { Update } from 'node-telegram-bot-api';
import WebhooksCallbacks from '../types/WebhooksCallbacks';

class Webhooks {
  private parse(request: string): WebhooksCallbacks {
    return JSON.parse(request);
  }

  public async determinant(body: Update): Promise<void> {
    if (!body.callback_query) {
      if (!body.message || !body.message.text) return;
      const command: string = body.message.text.split('/')[1].split('@')[0] || '';
      switch (command) {
        case 'start':
          await Bot.channel.authorization(body.message.chat.id);
          return;
        case 'out':
          await Bot.channel.resetAuthorization(body.message.chat.id);
          return;
        default:
          return;
      }
    }

    if (!body.callback_query.data || !body.callback_query.message) return;
    const obj: WebhooksCallbacks = this.parse(body.callback_query.data);
    const { type, data } = obj;

    switch (type) {
      case 'auth':
        await Bot.channel.setData(data, body.callback_query.message.chat.id);
        return;
    }
  }
}

export default Webhooks;
