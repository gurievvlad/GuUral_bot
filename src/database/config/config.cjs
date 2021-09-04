const dotenv = require('dotenv');
dotenv.config();

const development = {
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    socketPath: '/var/run/mysqld/mysqld.sock'
  },
  define: {
    timestamps: false,
  },
  logging: false,
};

const production = {
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  host: process.env.DB_HOST || '',
  dialect: 'mariadb',
  dialectOptions: {
    socketPath: '/var/run/mysqld/mysqld.sock'
  },
  define: {
    timestamps: false,
  },
  logging: false,
};

module.exports = { development, production };
