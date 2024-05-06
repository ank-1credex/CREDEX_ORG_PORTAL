const { DataTypes, Model } = require("sequelize");
class User extends Model {
  static init(sequelize) {
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
          // defaultValue:Date.now(),
        },
        first_name: {
          type: DataTypes.STRING,
          allowNull: false,
          length: 45,
        },
        last_name: {
          type: DataTypes.STRING,
          allowNull: false,
          length: 45,
        },
        phone_number: {
          type: DataTypes.STRING,
          allowNull: false,
          length: 45,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          length: 100,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          length: 150,
        },
        employee_id: {
          type: DataTypes.STRING,
          allowNull: false,
          length: 45,
        },
        gender: {
          type: DataTypes.STRING,
          allowNull: false,
          length: 45,
        },
        role_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          length: 45,
        },
        manager_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          length: 45,
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
module.exports = User;
