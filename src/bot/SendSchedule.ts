import Api from '../api';
import NormalSchedule from '../types/NormalSheduleInterface';
import services from '../services';

type TYesterdaySchedule = {
  today: NormalSchedule[];
  tomorrow: NormalSchedule[];
};

const TODAY: Date = new Date();
const TOMORROW: Date = new Date();
TOMORROW.setDate(TOMORROW.getDate() + 1);

class SendSchedule {
  localDate(date: Date): string {
    return date.toLocaleDateString('ru').replace(/\//g, '.');
  }

  generateLessons(dayLessons: NormalSchedule[]): string {
    return dayLessons.reduce((textLesson, item) => {
      textLesson += `${item.timeStart}`;
      textLesson += ` ${item.discipline}`;
      if (item.classroom) textLesson += ` | ${item.classroom}`;
      if (item.type) textLesson += ` | ${item.type}`;
      if (item.notes) textLesson += ` | ${item.notes}`;
      textLesson += `\n`;
      return textLesson;
    }, '');
  }

  generateYesterdayText(schedule: NormalSchedule[]): string {
    const a: TYesterdaySchedule = {
      today: schedule.filter(lesson => lesson.date === this.localDate(TODAY)),
      tomorrow: schedule.filter(lesson => lesson.date === this.localDate(TOMORROW)),
    };

    let text = '';
    if (a.today.length) text += `Сегодня:\n${this.generateLessons(a.today)}`;
    if (a.today.length && a.tomorrow.length) text += '\n';
    if (a.tomorrow.length) text += `Завтра:\n${this.generateLessons(a.tomorrow)}`;
    return text;
  }

  async sendYesterdayMessage(id: number): Promise<void> {
    const schedule = await services.schedule.getNormalById(id);
    if (!schedule.length) return Promise.reject(new Error('Нет расписания'));
    const text = this.generateYesterdayText(schedule);
    if (!text) return Promise.reject(new Error('Не сгенерировался текст'));
    await Api.bot
      .sendMessage({
        chat_id: id,
        text,
      })
      .then(() => {
        return Promise.resolve();
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }
}

export default SendSchedule;
