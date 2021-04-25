import { Router } from 'express';
import Api from '../../api';
import { GetGroupRequestQuery } from '../../types/RequestsQuery';
import Error from '../../types/Error';

const router = Router();

async function genResponse(request: GetGroupRequestQuery): Promise<Error | { id: string; name: string }[]> {
  const { form, speciality, course }: GetGroupRequestQuery = request;
  if (!form || !speciality || !course) {
    return Promise.reject({
      message: 'Form, speciality and course required parameters',
      code: 400,
    });
  }
  return Promise.resolve(await Api.university.getGroups({ form, speciality, course }));
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
