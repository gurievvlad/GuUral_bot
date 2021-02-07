type TQuestion = 'form' | 'stage' | 'speciality' | 'course' | 'group' | 'exit';

export class WebhookCallbackData {
  question!: TQuestion;
  answer!: string;
}

export default class WebhooksCallbacks {
  type!: string;
  data!: WebhookCallbackData;
}
