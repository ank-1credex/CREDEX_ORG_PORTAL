const { DataTypes, Model } = require("sequelize");
class Managers extends Model {
  static init(sequelize) {
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
        modelName: "managers",
        modelName: "managers",
        tableName: "",
        timestamps: false,
      }
    );
  }
}
module.exports = Managers;
