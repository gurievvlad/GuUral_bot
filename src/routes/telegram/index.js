import { Router } from 'express';
import Bot from '../../bot/index.js';

const router = Router();

router.route('/webhook').post((request, response) => {
  Bot.webhooks.determinant(request.body);
  response.sendStatus(200);
});

export default router;
