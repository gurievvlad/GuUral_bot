import sq from 'sequelize';
const { DataTypes, Model } = sq;
import sequelize from '../../db.js';

export class Schedule extends Model {}

Schedule.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    date: {
      type: new DataTypes.STRING(),
    },
    time_from: {
      type: new DataTypes.STRING(),
    },
    time_to: {
      type: new DataTypes.STRING(),
    },
    type: {
      type: new DataTypes.STRING(),
    },
    teacher: {
      type: new DataTypes.STRING(),
    },
    group: {
      type: new DataTypes.STRING(),
    },
    course: {
      type: new DataTypes.STRING(),
    },
    speciality: {
      type: new DataTypes.STRING(),
    },
    createdAt: {
      type: new DataTypes.STRING(),
    },
    updatedAt: {
      type: new DataTypes.STRING(),
    },
  },
  {
    tableName: 'schedule',
    sequelize, // passing the `sequelize` instance is required
  },
);
