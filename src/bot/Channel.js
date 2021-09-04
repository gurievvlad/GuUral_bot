import Api from '../api/index.js';
import { Recipient } from '../database/models/recipient.js';
import questions from './questions.js';

const callbackDataGen = (question, answer) =>
  JSON.stringify({
    type: 'auth',
    data: { question, answer },
  });

const callbackGen = question => (...args) => args.map(([text, data]) => [{ text, callback_data: callbackDataGen(question, data) }]);

class Channel {
  async send(chat_id, chatData, text, reply) {
    const body = { chat_id, text };
    if (reply.length) body.reply_markup = { inline_keyboard: reply };
    const lastAuthMessageId = chatData.last_message_id;
    const sendResp = lastAuthMessageId ? Api.bot.editMessage({ ...body, message_id: lastAuthMessageId }) : Api.bot.sendMessage(body);
    sendResp
      .then(resp => {
        Recipient.findByPk(chat_id).then(async chat => {
          if (!chat || !resp.message_id) return;

          chat.last_message_id = resp.message_id;
          await chat.save();
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  async authorization(id) {
    const [chatData] = await Recipient.findOrCreate({
      where: {
        id: id,
      },
      defaults: {
        id: id,
        last_message_id: 0,
        speciality: '',
        course: '',
        group: '',
        stage: '',
        form: '',
      },
    });

    const send = (text, reply) => {
      return this.send(id, chatData, text, reply);
    };

    if (!chatData.form) {
      await send('Привет! Для начала мне нужно узнать твою группу. Какая у тебя форма обучения?', callbackGen('form')(...questions.form));
      return;
    }
    if (!chatData.stage) {
      await send('Ступень обучения', callbackGen('stage')(...questions.stage));
      return;
    }
    if (!chatData.speciality) {
      await send('Направление подготовки', callbackGen('speciality')(...questions.speciality[chatData.stage]));
      return;
    }
    if (!chatData.course) {
      await send('Курс', [
        [
          { text: '1', callback_data: callbackDataGen('course', '1') },
          { text: '2', callback_data: callbackDataGen('course', '2') },
          { text: '3', callback_data: callbackDataGen('course', '3') },
          { text: '4', callback_data: callbackDataGen('course', '4') },
          { text: '5', callback_data: callbackDataGen('course', '5') },
        ],
      ]);
      return;
    }
    if (!chatData.group) {
      const { form, speciality, course } = chatData;
      const data = { form, speciality, course };

      await Api.university.getGroups(data).then(async groups => {
        if (!groups.length) {
          await send('Группы не найдены', [[{ text: 'Начать с начала', callback_data: callbackDataGen('exit', '') }]]);
          return;
        }
        if (groups.length === 1) {
          await send(`Ваша группа ${groups[0].name}?`, [
            [
              { text: 'Дa', callback_data: callbackDataGen('group', groups[0].id) },
              { text: 'Нет', callback_data: callbackDataGen('exit', '') },
            ],
          ]);
          return;
        }
        await send(
          'Последний шаг! Выберите вашу группу',
          groups.map(item => [
            {
              text: item.name,
              callback_data: callbackDataGen('group', item.id),
            },
          ]),
        );
      });
      return;
    }

    if (chatData.group) await send('Поздравляю! Теперь ты авторизован. Для сброса авторизации: /out');
  }

  async resetAuthorization(id) {
    const recipient = await Recipient.findByPk(id);
    if (!recipient) return;
    recipient.speciality = '';
    recipient.course = '';
    recipient.group = '';
    recipient.stage = '';
    recipient.form = '';
    recipient.last_message_id = 0;
    await recipient.save();
    await this.authorization(recipient.id);
  }

  async setData(data, id) {
    if (data.question === 'exit') {
      await this.resetAuthorization(id);
      return;
    }

    const recipient = await Recipient.findByPk(id);
    if (!recipient) return;
    recipient[data.question] = data.answer;
    await recipient.save();
    await this.authorization(recipient.id);
  }
}

export default Channel;
