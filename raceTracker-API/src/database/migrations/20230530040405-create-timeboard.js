'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('timeboards', {
      id: {
        type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
      },
      car_id: {
        type: Sequelize.INTEGER,
				allowNull: false,
        references: {
          model: 'cars',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      laptime_id: {
        type: Sequelize.INTEGER,
				allowNull: true,
        references: {
          model: 'laptimes',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      championship_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'championships',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      round_number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      best_time: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      finished_round: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('timeboard');
  }
};
