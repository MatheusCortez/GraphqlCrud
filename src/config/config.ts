require('dotenv').config();

export const Config = {
  database: {
    DB_CONFIG: process.env.DATABASE,
  },
  apiCep: {
    CEP_URL: process.env.API_VIACEP,
  },
  jwt: {
    SECRET_KEY: process.env.JWT_SECRET,
  },
};
