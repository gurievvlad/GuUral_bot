import Bot from './index';
import { Update } from 'node-telegram-bot-api';
import WebhooksCallbacks from '../types/WebhooksCallbacks';
import { BotCommands } from '../types/WebhooksCallbacks';

class Webhooks {
  private static getCommand(messageText: string) {
    const commands: BotCommands = ['start', 'out'];
    return commands.find(command => messageText.search(command) > -1);
  }

  public async determinant(body: Update): Promise<void> {
    if (!body.callback_query) {
      if (!body?.message?.text) return;
      switch (Webhooks.getCommand(body.message.text)) {
        case 'start':
          await Bot.channel.authorization(body.message.chat.id);
          return;
        case 'out':
          await Bot.channel.resetAuthorization(body.message.chat.id);
          return;
      }
    }

    if (!body?.callback_query?.message) return;
    const obj: WebhooksCallbacks = JSON.parse(<string>body.callback_query.data);
    const { type = undefined, data = undefined } = obj;

    if (!type || !data) return;

    switch (type) {
      case 'auth':
        await Bot.channel.setData(data, body.callback_query.message.chat.id);
        return;
    }
  }
}

export default Webhooks;
