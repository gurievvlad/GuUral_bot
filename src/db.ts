import { Sequelize } from 'sequelize';

import { development, production } from './database/config/config';

const sequelize = new Sequelize(process.env.NODE_ENV === 'production' ? production : development);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected!');
  })
  .catch(error => {
    console.error('Database connection error: ' + error);
  });

export default sequelize;
