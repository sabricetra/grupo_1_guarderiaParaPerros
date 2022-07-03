module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: dataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING,
            allowNull: false
        },
        date: {
            type: dataTypes.DATEONLY,
        },
        adress: {
            type: dataTypes.STRING,
        },
        dni: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING,
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        deletedAt: false,
        tableName: "users"
    }
    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.belongsToMany(models.Daycare, {
            as: "daycares",
            through: 'usersDaycares',
            foreignKey: 'users_id',
            otherKey: 'daycares_id',
            timestamps: false
        })
    }

    return User
};

