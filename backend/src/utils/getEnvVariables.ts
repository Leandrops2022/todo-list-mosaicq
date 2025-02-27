import dotenv from 'dotenv';

dotenv.config();

const getEnvVariables = () => ({
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET ?? '123456',
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
});
export default getEnvVariables;
