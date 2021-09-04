import { Router } from 'express';
import Api from '../../api/index.js';

const router = Router();

async function genResponse(request) {
  const { form, speciality, course } = request;
  if (!form || !speciality || !course) {
    return Promise.reject({
      message: 'Form, speciality and course required parameters',
      code: 400,
    });
  }
  return Promise.resolve(await Api.university.getGroups({ form, speciality, course }));
}

async function response(request, response) {
  genResponse(request.query)
    .then(data => {
      response.send(data);
    })
    .catch(data => {
      response.status(400).send(data);
    });
}

router.route('/').get(response);

router.route('/').post(response);

export default router;
