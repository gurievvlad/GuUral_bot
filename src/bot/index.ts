import Channel from './Channel';
import Webhooks from './Webhooks';
import SendSchedule from './SendSchedule';

export default {
  channel: new Channel(),
  webhooks: new Webhooks(),
  sendSchedule: new SendSchedule(),
};
