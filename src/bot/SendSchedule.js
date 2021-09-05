import Api from '../api/index.js';
import Services from '../services/index.js';

const TODAY = new Date();
const TOMORROW = new Date();
TOMORROW.setDate(TOMORROW.getDate() + 1);

class SendSchedule {
  localDate(date) {
    return date.toLocaleString('os-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  generateLessons(dayLessons) {
    return dayLessons.reduce(
      (textLesson, item) =>
        textLesson +
        ['timeStart', 'discipline', 'classroom', 'type', 'notes']
          .map(val => item[val])
          .filter(Boolean)
          .join(' | '),
      '',
    );
  }

  generateYesterdayText(schedule) {
    const filterFromDate = date => lesson => lesson.date === this.localDate(date);
    const a = {
      today: schedule.filter(filterFromDate(TODAY)),
      tomorrow: schedule.filter(filterFromDate(TOMORROW)),
    };

    return `
      ${a.today.length ? `Сегодня:\n${this.generateLessons(a.today)}` : ''}
      ${a.today.length && a.tomorrow.length ? '\n' : ''}
      ${a.tomorrow.length ? `Завтра:\n${this.generateLessons(a.tomorrow)}` : ''}
    `;
  }

  async sendYesterdayMessage(chat) {
    if (!chat.form || !chat.speciality || !chat.course || !chat.group) {
      console.log(`Чат ${chat.id} — недостаточно данных для отправки расписания`);
      return;
    }

    const schedule = await Services.schedule.getNormal(chat);
    if (!schedule.length) return;

    const text = this.generateYesterdayText(schedule);
    if (!text) return;

    await Api.bot
      .sendMessage({
        chat_id: chat.id,
        text,
      })
      .then(() => {
        console.log(`Чат ${chat.id} — расписание отправлено`);
      });
  }
}

export default SendSchedule;
