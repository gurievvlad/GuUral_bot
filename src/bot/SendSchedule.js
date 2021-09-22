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
    const dayLessonsReducer = (textLesson, item) =>
      `${textLesson}${['timeStart', 'discipline', 'classroom', 'type', 'notes']
        .map(val => item[val])
        .filter(item => !!item)
        .join(' | ')}\n`;
    return dayLessons.reduce(dayLessonsReducer, '');
  }

  generateYesterdayText(schedule) {
    const filterFromDate = date => lesson => lesson.date === this.localDate(date);
    const today = schedule.filter(filterFromDate(TODAY));
    const tomorrow = schedule.filter(filterFromDate(TOMORROW));

    return (
      (today.length ? `Сегодня:\n${this.generateLessons(today)}`.trim() : '') +
      (today.length && tomorrow.length ? '\n\n' : '') +
      (tomorrow.length ? `Завтра:\n${this.generateLessons(tomorrow)}`.trim() : '')
    );
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
