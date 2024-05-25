import { Sequelize } from "sequelize";

const { DataTypes, Model } = require("sequelize");
export class Role extends Model {
  static init(sequelize: Sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        role: {
          type: DataTypes.STRING,
          defaultValue: "employee",
        },
      },
      {
        sequelize,
        modelName: "Role",
        tableName: "roles",
        timestamps: false,
      }
    );
  }
}
