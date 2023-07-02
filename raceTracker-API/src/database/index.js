import Sequelize from 'sequelize';

import Car from '../models/Car';
import Category from '../models/Category';
import Championship from '../models/Championship';
import Laptime from '../models/Laptime';
import Timeboard from '../models/Timeboard';

import dotenv from 'dotenv';

dotenv.config();

const models = [
    Car,
    Category,
    Championship,
    Laptime,
    Timeboard
]

class Database{
    constructor(){
        this.init();
    }

    init(){
        this.connection = new Sequelize(process.env.DATABASE_URL, {
            define: {
                timestamps: false,
                underscored: true,
                underscoredAll: true
            }
        });

        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));
    }
}

export default new Database();
