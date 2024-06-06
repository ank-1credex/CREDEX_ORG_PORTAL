import { Sequelize } from "sequelize";

const { DataTypes, Model } = require("sequelize");

export class Projects extends Model {
  id!: number;
  project_name!: string;
  client_id!: number;
  is_billable!: boolean;

  static init(sequelize: Sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        project_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        client_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        is_billable: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Projects",
        tableName: "projects",
        timestamps: false,
      }
    );
  }
}
