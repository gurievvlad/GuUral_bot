import { InlineKeyboardMarkup, MessageEntity } from 'node-telegram-bot-api';

export class sendMessageBodyType {
  chat_id!: number | string;
  text!: string;
  parse_mode?: string;
  entities?: MessageEntity[];
  disable_web_page_preview?: boolean;
  disable_notification?: boolean;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  reply_markup?: InlineKeyboardMarkup;
}

export class editMessageBodyType extends sendMessageBodyType {
  message_id!: number;
}

export class deleteMessageBodyType {
  chat_id!: number;
  message_id!: number;
}
