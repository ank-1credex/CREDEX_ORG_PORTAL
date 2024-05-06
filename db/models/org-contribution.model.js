const { DataTypes, Model } = require("sequelize");
class OrgContribution extends Model {
  static init(sequelize) {
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
        actual_hours: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        applied_date: {
          type: DataTypes.DATE,
          allowNull: false,
          //   defaultValue: Date.now(),
        },
        message: {
          type: DataTypes.STRING,
          length: 100,
        },
        approval_mail_screenshot: {
          type: DataTypes.STRING,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          length: 50,
        },
        is_approved: {
          type: DataTypes.BOOLEAN,
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
module.exports = OrgContribution;
