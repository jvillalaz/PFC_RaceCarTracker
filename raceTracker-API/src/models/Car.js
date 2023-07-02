import Sequelize, { Model } from 'sequelize';

class Car extends Model {
    static init(sequelize){
        super.init(
            {
                name: Sequelize.STRING,
                plate: Sequelize.STRING,
                model: Sequelize.STRING,
                owner: Sequelize.STRING,
                on_track: Sequelize.BOOLEAN
            },
            {
                sequelize
            }
        );

        return this;
    }

    static associate(models){
        this.belongsTo(models.Category, {as: 'category', foreignKey: 'category_id'});
    }
}

export default Car;
