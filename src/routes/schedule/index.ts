import { Router } from 'express';
import services from '../../services';
import { ScheduleRequestQuery } from '../../types/RequestsQuery';
import Error from '../../types/Error';
import NormalSchedule from '../../types/NormalSheduleInterface';
import ScheduleResponse from '../../types/ScheduleInterface';

const router = Router();

async function genResponse(request: ScheduleRequestQuery): Promise<Error | ScheduleResponse | NormalSchedule[]> {
  const { form, speciality, course, group, normalize }: ScheduleRequestQuery = request;
  if (!form || !speciality || !course || !group) {
    return Promise.reject({
      message: 'Form, speciality, course and group required parameters',
      code: 400,
    });
  }
  if (normalize) {
    return Promise.resolve(await services.schedule.getNormal({ form, speciality, course, group }));
  } else {
    return Promise.resolve(await services.schedule.get({ form, speciality, course, group }));
  }
}

router.route('/').get(
  async (request, response): Promise<void> => {
    genResponse(request.query)
      .then(data => {
        response.send(data);
      })
      .catch(data => {
        response.status(400).send(data);
      });
  },
);

router.route('/').post(
  async (request, response): Promise<void> => {
    genResponse(request.body)
      .then(data => {
        response.send(data);
      })
      .catch(data => {
        response.status(400).send(data);
      });
  },
);

export default router;
