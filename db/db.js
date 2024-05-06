const Sequelize = require("sequelize");
const User = require("./models/user.model");
const Assignments = require("./models/assignments.model");
const Role = require("./models/role.model");
const Projects = require("./models/projects.model");
const OrgContribution = require("./models/org-contribution.model");
const Managers = require("./models/managers.model");

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_URI,
    dialect: "mysql",
    port: parseInt(process.env.DATABASE_PORT),
    pool: {
      min: 0,
      max: parseInt(process.env.DATABASE_POOL_SIZE),
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

sequelize.sync();
const models = {
  user: User.init(sequelize),
  assignment: Assignments.init(sequelize),
  role: Role.init(sequelize),
  projects: Projects.init(sequelize),
  orgcontribution: OrgContribution.init(sequelize),
  manager: Managers.init(sequelize),
};
const db = {
  ...models,
  sequelize,
};
module.exports = db;
