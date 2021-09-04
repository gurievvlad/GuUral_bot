import { Router } from 'express';
import services from '../../services/index.js';

const router = Router();

async function genResponse(request) {
  const { form, speciality, course, group, normalize } = request;
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

router.route('/').get(async (request, response) => {
  genResponse(request.query)
    .then(data => {
      response.send(data);
    })
    .catch(data => {
      response.status(400).send(data);
    });
});

router.route('/').post(async (request, response) => {
  genResponse(request.body)
    .then(data => {
      response.send(data);
    })
    .catch(data => {
      response.status(400).send(data);
    });
});

export default router;
