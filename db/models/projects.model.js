const { DataTypes, Model } = require("sequelize");
class Projects extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                project_name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                client_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                is_billable: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "Projects",
                tableName: "projects",
                timestamps: false,
            }
        );
    }
}
module.exports = Projects;