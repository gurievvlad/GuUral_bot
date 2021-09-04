import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { production, development } from './database/config/config.cjs';
dotenv.config();

const sequelize = new Sequelize(process.env.NODE_ENV === 'production' ? production : development);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected!');
  })
  .catch(error => {
    console.log('Database connection error: ' + error);
  });

export default sequelize;
