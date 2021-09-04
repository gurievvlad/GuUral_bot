import sq from 'sequelize';
const { DataTypes, Model } = sq;
import sequelize from '../../db.js';

export class Recipient extends Model {}

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
