module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categorydesc: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false,
        tableName: "categories"
    }
    const Category = sequelize.define(alias, cols, config);

    Category.associate = function (models) {
       Category.hasMany(models.Daycare, {
            as: "daycares",
            foreignKey: 'category_id',
            timestamps: false
        })
    }


    return Category
};
