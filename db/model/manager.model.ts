import { Sequelize } from "sequelize";
const { DataTypes, Model } = require("sequelize");
export class Managers extends Model {
  static init(sequelize: Sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        manager_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Managers",
        tableName: "managers",
        timestamps: false,
      }
    );
  }
}
