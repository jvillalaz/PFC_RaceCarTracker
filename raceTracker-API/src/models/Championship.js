import Sequelize, { Model } from 'sequelize';

class Championship extends Model {
    static init(sequelize){
        super.init(
            {
                name: Sequelize.STRING,
            },
            {
                sequelize
            }
        );

        return this;
    }
    
}

export default Championship;
