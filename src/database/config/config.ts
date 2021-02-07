require('dotenv').config();

type TConfig = {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: 'mysql' | 'mariadb' | 'postgres' | 'mssql';
  define: {
    timestamps: boolean;
  };
  logging: boolean;
};

const development: TConfig = {
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mariadb',
  define: {
    timestamps: false,
  },
  logging: false,
};

const production: TConfig = {
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  host: process.env.DB_HOST || '',
  dialect: 'mariadb',
  define: {
    timestamps: false,
  },
  logging: false,
};

export { development, production };
