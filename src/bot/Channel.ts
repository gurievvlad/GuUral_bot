import Api from '../api';
import ScheduleForm from '../types/ScheduleForm';
import { sendMessageBodyType, editMessageBodyType } from '../types/BotInterface';
import { Recipient } from '../database/models/recipient';
import { WebhookCallbackData } from '../types/WebhooksCallbacks';
import { InlineKeyboardButton } from 'node-telegram-bot-api';

class Channel {
  private async send(chat_id: number, chatData: Recipient, text: string, reply?: InlineKeyboardButton[][]) {
    const body: sendMessageBodyType = {
      chat_id,
      text,
    };
    if (reply?.length) body.reply_markup = { inline_keyboard: reply };

    const lastAuthMessageId = chatData.last_message_id;

    if (lastAuthMessageId === 0) {
      Api.bot
        .sendMessage(body)
        .then(resp => {
          Recipient.findByPk(chat_id).then(async (chat: Recipient | null) => {
            if (!chat || !resp.message_id) return;

            chat.last_message_id = resp.message_id;
            await chat.save();
          });
        })
        .catch(err => {
          console.log(err);
        });
      return;
    }

    Api.bot
      .editMessage(<editMessageBodyType>{
        ...body,
        message_id: lastAuthMessageId,
      })
      .then(resp => {
        Recipient.findByPk(chat_id).then(async (chat: Recipient | null) => {
          if (!chat || !resp.message_id) return;

          chat.last_message_id = resp.message_id;
          await chat.save();
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  private static callbackDataGen(question: string, answer: string): string {
    return JSON.stringify({
      type: 'auth',
      data: {
        question: String(question),
        answer: String(answer),
      },
    });
  }

  public async authorization(id: number): Promise<void> {
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

    const send = (text: string, reply?: InlineKeyboardButton[][]) => {
      return this.send(id, chatData, text, reply);
    };

    if (!chatData.form && !chatData.speciality && !chatData.course && !chatData.group) {
      await send('Привет! Для начала мне нужно узнать твою группу. Какая у тебя форма обучения?', [
        [{ text: 'Очная', callback_data: Channel.callbackDataGen('form', '1') }],
        [{ text: 'Заочная', callback_data: Channel.callbackDataGen('form', '2') }],
        [{ text: 'Очно-заочная', callback_data: Channel.callbackDataGen('form', '3') }],
      ]);
      return;
    }
    if (!chatData.stage) {
      await send('Ступень обучения', [
        [{ text: 'Бакалавриат', callback_data: Channel.callbackDataGen('stage', '1') }],
        [{ text: 'Магистратура', callback_data: Channel.callbackDataGen('stage', '2') }],
        [{ text: 'Аспирантура', callback_data: Channel.callbackDataGen('stage', '3') }],
      ]);
      return;
    }
    if (!chatData.speciality) {
      switch (chatData.stage) {
        case '1':
          await send('Направление подготовки', [
            [{ text: 'Гостиничное дело', callback_data: Channel.callbackDataGen('speciality', '11') }],
            [{ text: 'Журналистика', callback_data: Channel.callbackDataGen('speciality', '10') }],
            [
              {
                text: 'Конструирование изделий легкой промышленности',
                callback_data: Channel.callbackDataGen('speciality', '5'),
              },
            ],
            [{ text: 'Менеджмент', callback_data: Channel.callbackDataGen('speciality', '3') }],
            [{ text: 'Прикладная информатика', callback_data: Channel.callbackDataGen('speciality', '4') }],
            [{ text: 'Психология', callback_data: Channel.callbackDataGen('speciality', '12') }],
            [{ text: 'Реклама и связи с общественностью', callback_data: Channel.callbackDataGen('speciality', '6') }],
            [{ text: 'Сервис', callback_data: Channel.callbackDataGen('speciality', '7') }],
            [{ text: 'Управление персоналом', callback_data: Channel.callbackDataGen('speciality', '9') }],
            [{ text: 'Хореографическое искусство', callback_data: Channel.callbackDataGen('speciality', '8') }],
            [{ text: 'Экономика', callback_data: Channel.callbackDataGen('speciality', '2') }],
            [{ text: 'Юриспруденция', callback_data: Channel.callbackDataGen('speciality', '1') }],
          ]);
          break;
        case '2':
          await send('Направление подготовки', [
            [{ text: 'Психология', callback_data: Channel.callbackDataGen('speciality', '15') }],
            [{ text: 'Экономика', callback_data: Channel.callbackDataGen('speciality', '14') }],
            [{ text: 'Юриспруденция', callback_data: Channel.callbackDataGen('speciality', '16') }],
          ]);
          break;
        case '3':
          await send('Направление подготовки', [
            [{ text: 'Культурология', callback_data: Channel.callbackDataGen('speciality', '22') }],
            [
              {
                text: 'Политические науки и регионоведение',
                callback_data: Channel.callbackDataGen('speciality', '20'),
              },
            ],
            [{ text: 'Психологические науки', callback_data: Channel.callbackDataGen('speciality', '17') }],
            [{ text: 'Социологические науки', callback_data: Channel.callbackDataGen('speciality', '19') }],
            [{ text: 'Философия, этика и религиоведение', callback_data: Channel.callbackDataGen('speciality', '21') }],
            [{ text: 'Экономика', callback_data: Channel.callbackDataGen('speciality', '18') }],
            [{ text: 'Юриспруденция', callback_data: Channel.callbackDataGen('speciality', '23') }],
          ]);
          break;
      }
      return;
    }
    if (!chatData.course) {
      await send('Курс', [
        [
          { text: '1', callback_data: Channel.callbackDataGen('course', '1') },
          { text: '2', callback_data: Channel.callbackDataGen('course', '2') },
          { text: '3', callback_data: Channel.callbackDataGen('course', '3') },
          { text: '4', callback_data: Channel.callbackDataGen('course', '4') },
          { text: '5', callback_data: Channel.callbackDataGen('course', '5') },
        ],
      ]);
      return;
    }
    if (chatData.form && chatData.speciality && chatData.course && !chatData.group) {
      const { form, speciality, course } = chatData;
      const data: ScheduleForm = { form, speciality, course };

      const groups = await Api.university.getGroups(data);
      switch (groups && groups.length) {
        case 0: {
          await send('Группы не найдены');
          break;
        }
        case 1: {
          await send(`Ваша группа ${groups[0].name}`, [
            [
              { text: 'ДА', callback_data: Channel.callbackDataGen('group', groups[0].id) },
              { text: 'Нет', callback_data: Channel.callbackDataGen('exit', '') },
            ],
          ]);
          break;
        }
        default: {
          const reply = groups.map(item => [
            {
              text: item.name,
              callback_data: Channel.callbackDataGen('group', item.id),
            },
          ]);
          await send('Последний шаг! Выберите вашу группу', reply);
        }
      }
      return;
    }

    if (chatData.group) await send('Поздравляю! Теперь ты авторизован. Для сброса авторизации: /out');
  }

  public async resetAuthorization(id: number): Promise<void> {
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

  public async setData(data: WebhookCallbackData, id: number): Promise<void> {
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
