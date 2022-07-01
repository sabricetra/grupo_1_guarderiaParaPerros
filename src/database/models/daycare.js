module.exports = (sequelize, dataTypes) => {
    let alias = 'Daycare';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        category_id: {
            type: dataTypes.STRING,
            allowNull: false
        },
        characteristics: {
            type: dataTypes.STRING,
            allowNull: false
        },
        facilities: {
            type: dataTypes.STRING,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING,
        }
    };
    let config = {
        timestamps: false,
        // createdAt: 'created_at',
        // updatedAt: 'updated_at',
        deletedAt: false,
        tableName: "daycares"
    }
    const Daycare = sequelize.define(alias, cols, config);

    Daycare.associate = function (models) {
        Daycare.belongsToMany(models.User, {
            as: "users",
            through: 'usersDaycares',
            foreignKey: 'daycares_id',
            otherKey: 'users_id',
            timestamps: false
        }),
        Daycare.belongsTo(models.Category, {
            as: "categories",
            foreignKey: 'category_id',
            timestamps: false
        })
    }

    return Daycare
};

