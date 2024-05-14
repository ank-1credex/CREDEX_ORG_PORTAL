require("dotenv").config();

export interface EnvConfig {
  databaseName: string;
  userName: string;
  password: string;
  host: string;
  databasePort: string;
  port: string;
  databasePool: string;
  secret_key: string;
}
