import Channel from './Channel.js';
import Webhooks from './Webhooks.js';
import SendSchedule from './SendSchedule.js';

export default {
  channel: new Channel(),
  webhooks: new Webhooks(),
  sendSchedule: new SendSchedule(),
};
