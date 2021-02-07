import Api from '../api';
import NormalSchedule from '../types/NormalSheduleInterface';
import services from '../services';

type TYesterdaySchedule = {
  today: NormalSchedule[];
  tomorrow: NormalSchedule[];
};

const TODAY: Date = new Date();
const TOMORROW: Date = new Date(TODAY);
TOMORROW.setDate(TOMORROW.getDate() + 1);

class SendSchedule {
  localDate(date: Date): string {
    return date.toLocaleDateString('ru').replace('/', '.').replace('/', '.');
  }

  generateLessons(dayLessons: NormalSchedule[]): string {
    let textLesson = '';
    dayLessons.forEach(item => {
      textLesson += `${item.timeStart}`;
      textLesson += ` ${item.discipline}`;
      if (item.classroom) textLesson += ` | ${item.classroom}`;
      if (item.type) textLesson += ` | ${item.type}`;
      if (item.notes) textLesson += ` | ${item.notes}`;
      textLesson += `\n`;
    });
    return textLesson;
  }

  generateYesterdayText(schedule: NormalSchedule[]): string {
    const a: TYesterdaySchedule = {
      today: [],
      tomorrow: [],
    };
    schedule.forEach(lesson => {
      switch (lesson.date) {
        case this.localDate(TODAY):
          a.today.push(lesson);
          break;
        case this.localDate(TOMORROW):
          a.tomorrow.push(lesson);
          break;
        default:
          return;
      }
    });

    let text = '';
    if (a.today.length) {
      text += 'Сегодня:\n';
      text += this.generateLessons(a.today);
    }
    if (a.today.length && a.tomorrow.length) text += '\n';
    if (a.tomorrow.length) {
      text += 'Завтра:\n';
      text += this.generateLessons(a.tomorrow);
    }

    return text;
  }

  async sendYesterdayMessage(id: number): Promise<void> {
    const schedule = await services.schedule.getNormalById(id);
    if (!schedule.length) return;
    await Api.bot.sendMessage({
      chat_id: id,
      text: this.generateYesterdayText(schedule),
    });
  }
}

export default SendSchedule;
