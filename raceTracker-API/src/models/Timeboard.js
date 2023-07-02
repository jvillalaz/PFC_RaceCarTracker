import Sequelize, { Model } from 'sequelize';

class Timeboard extends Model {
    static init(sequelize){
        super.init(
            {
                round_number: Sequelize.NUMBER,
                best_time: Sequelize.NUMBER,
                finished_round: Sequelize.BOOLEAN
            },
            {
                sequelize
            }
        );

        return this;
    }

    static associate(models){
        this.belongsTo(models.Car, {as: 'car', foreignKey: 'car_id'});
        this.belongsTo(models.Laptime, {as: 'laptime', foreignKey: 'laptime_id'});
        this.belongsTo(models.Championship, {as: 'championship', foreignKey: 'championship_id'});
    }
}

export default Timeboard;
