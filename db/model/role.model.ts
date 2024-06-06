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
          type: DataTypes.ENUM,
          values: ["employee", "manager", "admin"],
          defaultValue: "employee",
          allowNull: false,
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
