import Http from './Http.js';
import FormData from 'form-data';

export default class University extends Http {
  async getSchedule(formData) {
    const { form, speciality, course, group } = formData;
    if (!form || !speciality || !course || !group) return {};

    const data = new FormData();
    data.append('form', form);
    data.append('speciality', speciality);
    data.append('course', course);
    data.append('group', group);
    data.append('teacher', '');
    data.append('action', 'lau_shedule_students_show');

    return this.api
      .post(`${this.guUrl}/admin-ajax.php`, data, {
        headers: data.getHeaders(),
      })
      .catch(err => {
        console.log(
          `У form ${form}, speciality ${speciality}, course ${course}, group ${group} произошла ошибка с получением расписания: ${err}`,
        );
        return {};
      });
  }

  async getGroups(formData) {
    const { form, speciality, course } = formData;
    if (!form || !speciality || !course) return [];

    const data = new FormData();
    data.append('form', form);
    data.append('speciality', speciality);
    data.append('course', course);
    data.append('teacher', '');
    data.append('action', 'lau_shedule_students_show_groups');
    return this.api
      .post(`${this.guUrl}/admin-ajax.php`, data, {
        headers: data.getHeaders(),
      })
      .catch(err => {
        console.log(`У form ${form}, speciality ${speciality}, course ${course} произошла ошибка с получением групп: ${err}`);
        return [];
      });
  }
}
