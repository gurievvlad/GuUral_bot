'use strict';
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../db';

export interface ScheduleAttributes {
  id: number;
  title: string;
  date: string;
  time_from: string;
  time_to: string;
  type: string;
  teacher: string;
  group: string;
  course: string;
  speciality: string;
  createdAt: string;
  updatedAt: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
type ScheduleCreationAttributes = Optional<ScheduleAttributes, 'id'>;

export class Schedule extends Model<ScheduleAttributes, ScheduleCreationAttributes> implements ScheduleAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public title!: string;
  public date!: string;
  public time_from!: string;
  public time_to!: string;
  public type!: string;
  public teacher!: string;
  public group!: string;
  public course!: string;
  public speciality!: string;
  public createdAt!: string;
  public updatedAt!: string;
}

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
