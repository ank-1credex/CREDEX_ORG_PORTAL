import { Sequelize } from "sequelize";
const { DataTypes, Model } = require("sequelize");

export class Assignments extends Model {
  static init(sequelize: Sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        project_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Assignments",
        tableName: "assignments",
        timestamps: false,
      }
    );
  }
}
