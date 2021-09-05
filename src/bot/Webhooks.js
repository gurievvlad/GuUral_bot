import Bot from './index.js';

class Webhooks {
  getCommand(messageText) {
    const commands = ['start', 'out'];
    return commands.find(command => messageText.search(command) > -1);
  }

  async determinant(body) {
    if (!body.callback_query) {
      if (!body.message || !body.message.text) return;
      switch (this.getCommand(body.message.text)) {
        case 'start':
          await Bot.channel.authorization(body.message.chat.id);
          return;
        case 'out':
          await Bot.channel.resetAuthorization(body.message.chat.id);
          return;
      }
    }

    if (!body.callback_query || !body.callback_query.message) return;
    const obj = JSON.parse(body.callback_query.data);
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
