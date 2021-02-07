import { Router } from 'express';
import Bot from '../../bot';

const router = Router();

router.route('/webhook').post(function (request, response): void {
  Bot.webhooks.determinant(request.body);
  response.sendStatus(200);
});

export default router;
