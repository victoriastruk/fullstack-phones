'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cpus', [
      {
        name: 'Snapdragon 8 Gen 2',
        manifacturer: 'Qualcomm',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Apple A17 Pro',
        manifacturer: 'Apple',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Exynos 2200',
        manifacturer: 'Samsung',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cpus', null, {});
  },
};
