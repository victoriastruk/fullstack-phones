'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('phones', [
      {
        model: 'Galaxy S22',
        brand: 'Samsung',
        year: 2022,
        ram: 8,
        cpu_id: 3, // Exynos 2200
        screen_size: 6.1,
        has_nfc: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        model: 'iPhone 15 Pro',
        brand: 'Apple',
        year: 2023,
        ram: 6,
        cpu_id: 2, // Apple A17 Pro
        screen_size: 6.1,
        has_nfc: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        model: 'OnePlus 11',
        brand: 'OnePlus',
        year: 2023,
        ram: 12,
        cpu_id: 1, // Snapdragon 8 Gen 2
        screen_size: 6.7,
        has_nfc: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('phones', null, {});
  },
};
