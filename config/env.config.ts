import { EnvConfig } from "../interfaces/config.interface";

require("dotenv").config();

export const configVariable: EnvConfig = {
  databaseName: process.env.DATABASE_NAME as string,
  userName: process.env.DATABASE_USER as string,
  password: process.env.DATABASE_PASSWORD as string,
  host: process.env.DATABASE_URI as string,
  databasePort: process.env.DATABASE_PORT as string,
  port: process.env.PORT as string,
  databasePool: process.env.DATABASE_POOL_SIZE as string,
  secret_key: process.env.PRIVATE_KEY as string,
};
