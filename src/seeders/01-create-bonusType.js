"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "bonus_options",
      [
        {
          bonus_type: "custom",
          id: "18ah89gh34",
          bonus_percent: "10",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          bonus_type: "fixed(10%)",
          id: "18ah89ga57",
          bonus_percent: undefined,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("bonus_options", null, {});
  },
};
