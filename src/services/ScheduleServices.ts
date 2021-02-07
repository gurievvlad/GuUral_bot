import Api from '../api';
import ScheduleForm from '../types/ScheduleForm';
import NormalSchedule from '../types/NormalSheduleInterface';
import ScheduleResponse, { Schedule } from '../types/ScheduleInterface';
import { Recipient } from '../database/models/recipient';

type TTimes = {
  timeStart: string;
  timeEnd: string;
};

class ScheduleServices {
  async get({ form, speciality, course, group }: ScheduleForm): Promise<ScheduleResponse> {
    return await Api.university.getSchedule({ form, speciality, course, group });
  }

  async getById(id: number): Promise<ScheduleResponse | Error> {
    const resp = await Recipient.findByPk(id);
    if (!resp) return new Error('Not find chat');
    const { form, speciality, course, group } = resp;
    return await this.get({ form, speciality, course, group });
  }

  timeGen(time: string): TTimes {
    const split: string[] = time.split(' — ', 2);
    return {
      timeStart: split[0] ? split[0].replace('.', ':') : '00:00',
      timeEnd: split[1] ? split[1].replace('.', ':') : '00:00',
    };
  }

  async getNormal({ form, speciality, course, group }: ScheduleForm): Promise<NormalSchedule[]> {
    const { previous, current, next } = await this.get({ form, speciality, course, group });
    const schedule: Schedule[] = [...previous.data, ...current.data, ...next.data];

    return schedule.map(item => {
      const { timeStart, timeEnd } = this.timeGen(item.time);
      return {
        ...item,
        timeStart,
        timeEnd,
      };
    });
  }

  async getNormalById(id: number): Promise<NormalSchedule[] | []> {
    const resp = await Recipient.findByPk(id);
    if (!resp) return [];
    const { form, speciality, course, group } = resp;
    return await this.getNormal({ form, speciality, course, group });
  }
}

export default ScheduleServices;
