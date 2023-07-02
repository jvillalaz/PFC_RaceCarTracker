'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('cars', {
      id: {
        type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
				allowNull: false
      },
      plate: {
        type: Sequelize.STRING,
				allowNull: false
      },
      model: {
        type: Sequelize.STRING,
				allowNull: false
      },
      owner: {  
        type: Sequelize.STRING,
				allowNull: false
      },
      on_track: {
        type: Sequelize.BOOLEAN,
				defaultValue: false
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('cars');
  }
};
