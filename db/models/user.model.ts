import { Sequelize } from "sequelize";

const { DataTypes, Model } = require("sequelize");

export class User extends Model {
  static init(sequelize: Sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        registration_date: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        first_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        last_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone_number: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        employee_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        gender: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: false,
      }
    );
  }
}

