'use strict';
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../db';

export interface RecipientAttributes {
  id: number;
  last_message_id: number;
  speciality: string;
  stage: string;
  form: string;
  course: string;
  group: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
type RecipientCreationAttributes = Optional<RecipientAttributes, 'id'>;

export class Recipient extends Model<RecipientAttributes, RecipientCreationAttributes> implements RecipientAttributes {
  id!: number;
  last_message_id!: number;
  speciality!: string;
  stage!: string;
  form!: string;
  course!: string;
  group!: string;
}

Recipient.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
    },
    last_message_id: DataTypes.INTEGER,
    speciality: DataTypes.STRING,
    stage: DataTypes.STRING,
    form: DataTypes.STRING,
    course: DataTypes.STRING,
    group: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'recipients',
  },
);
