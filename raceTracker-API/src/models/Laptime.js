import Sequelize, { Model } from 'sequelize';

class Laptime extends Model {
    static init(sequelize){
        super.init(
            {
                lap_1: Sequelize.STRING,
                lap_2: Sequelize.STRING,
                lap_3: Sequelize.STRING,
                lap_4: Sequelize.STRING,
                lap_5: Sequelize.STRING
            },
            {
                sequelize
            }
        );

        return this;
    }

}

export default Laptime;
