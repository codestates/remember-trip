"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("user", [
      {
        name: "Hyunmin",
        email: "chlgusals3@gmail.com",
        password: "1234",
      },
      {
        name: "ManSeon",
        email: "full-fish@gmail.com",
        password: "5678",
      },
      {
        name: "KiHyuk",
        email: "YQuick@gmail.com",
        password: "2468",
      },
      {
        name: "YoonMe",
        email: "do66i@gmail.com",
        password: "1357",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("user", null, {});
  },
};
