import { Sequelize } from "sequelize";
import { User } from "./model/user.model";
import { Role } from "./model/role.model";
import { Projects } from "./model/project.model";
import { OrgContribution } from "./model/org-contribution.model";
import { Managers } from "./model/manager.model";
import { configVariable } from "../config/env.config";
import { Client } from "./model/client.model";

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
