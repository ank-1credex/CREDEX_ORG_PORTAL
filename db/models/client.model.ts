import { Sequelize } from "sequelize";
const { DataTypes, Model } = require("sequelize");
export class Client extends Model {
  static init(sequelize: Sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        client_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Clients",
        tableName: "clients",
        timestamps: false,
      }
    );
  }
}
