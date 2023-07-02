'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('laptimes', {
      id: {
        type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
      },
      lap_1: {
        type: Sequelize.STRING,
				allowNull: true
      },
      lap_2: {
        type: Sequelize.STRING,
				allowNull: true
      },
      lap_3: {
        type: Sequelize.STRING,
				allowNull: true
      },
      lap_4: {
        type: Sequelize.STRING,
				allowNull: true
      },
      lap_5: {
        type: Sequelize.STRING,
				allowNull: true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('laptimes');
  }
};
