'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('phones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 2000,
          max: new Date().getFullYear(),
        },
      },
      ram: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      cpu_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cpus',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      screen_size: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 3.0,
        },
      },
      has_nfc: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      image: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('phones');
  },
};
