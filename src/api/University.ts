import Http from './Http';
import ScheduleForm from '../types/ScheduleForm';
import ScheduleResponse from '../types/ScheduleInterface';
import FormData from 'form-data';

export default class University extends Http {
  async getSchedule(formData: ScheduleForm): Promise<ScheduleResponse> {
    return new Promise(resolve => {
      const form = new FormData();
      form.append('form', formData.form);
      form.append('speciality', formData.speciality);
      form.append('course', formData.course);
      form.append('group', formData.group);
      form.append('teacher', formData.teacher || '');
      form.append('action', 'lau_shedule_students_show');
      this.api
        .post<ScheduleResponse>(`${this.guUrl}/admin-ajax.php`, form, {
          headers: form.getHeaders(),
        })
        .then(data => {
          resolve(data.data);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  async getGroups(formData: ScheduleForm): Promise<{ id: string; name: string }[]> {
    return new Promise((resolve, reject) => {
      const form = new FormData();
      form.append('form', formData.form);
      form.append('speciality', formData.speciality);
      form.append('course', formData.course);
      form.append('group', '');
      form.append('teacher', '');
      form.append('action', 'lau_shedule_students_show_groups');
      this.api
        .post(`${this.guUrl}/admin-ajax.php`, form, {
          headers: form.getHeaders(),
        })
        .then(data => {
          resolve(data.data);
        })
        .catch(err => {
          console.log(err);
          reject();
        });
    });
  }
}
