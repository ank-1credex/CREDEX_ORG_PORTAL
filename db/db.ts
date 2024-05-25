import { Sequelize } from "sequelize";
import { User } from "../db/models/user.model";
import { Role } from "./models/role.model";
import { Projects } from "./models/projects.model";
import { OrgContribution } from "./models/org-contribution.model";
import { Managers } from "./models/managers.model";
import { configVariable } from "../config/env.config";
import { Client } from "./models/client.model";

const sequelize = new Sequelize(
  configVariable.databaseName,
  configVariable.userName,
  configVariable.password,
  {
    host: configVariable.host,
    dialect: "mysql",
    port: parseInt(configVariable.databasePort),
    pool: {
      min: 0,
      max: parseInt(configVariable.databasePool),
      idle: 10000,
    },
    define: {
      paranoid: true,
      charset: "latin1",
      timestamps: true,
    },
    logging: false,
  }
);

const models = {
  user: User.init(sequelize),
  role: Role.init(sequelize),
  projects: Projects.init(sequelize),
  orgcontribution: OrgContribution.init(sequelize),
  manager: Managers.init(sequelize),
  client: Client.init(sequelize),
};

Role.hasMany(User);
Managers.hasMany(User);

export const db = {
  ...models,
  sequelize,
};
