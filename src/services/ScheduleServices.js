import Api from '../api/index.js';

class ScheduleServices {
  async get({ form, speciality, course, group }) {
    return await Api.university.getSchedule({ form, speciality, course, group });
  }

  timeGen(time) {
    const split = time.split(' — ', 2).map(item => item.replace('.', ':'));
    return {
      timeStart: split[0] || '',
      timeEnd: split[1] || '',
    };
  }

  async getNormal({ form, speciality, course, group }) {
    const resp = await this.get({ form, speciality, course, group });
    return Object.values(resp)
      .map(item => item.data || [])
      .flat()
      .map(item => ({
        ...item,
        ...this.timeGen(item.time),
      }));
  }
}

export default ScheduleServices;
