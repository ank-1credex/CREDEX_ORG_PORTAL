const { DataTypes, Model } = require("sequelize");
class Role extends Model {
    static init(sequelize) {
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
                    defaultValue: 'USER',
                    limit:50,
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
module.exports = Role;