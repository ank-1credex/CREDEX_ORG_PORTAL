import { allow } from "joi";
import { Sequelize } from "sequelize";
const { DataTypes, Model } = require("sequelize");

export class OrgContribution extends Model {
  static init(sequelize: Sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        project_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        hours: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        applied_date: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        message: {
          type: DataTypes.STRING,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        quarter: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "OrgContribution",
        tableName: "org_contribution",
        timestamps: false,
      }
    );
  }
}
