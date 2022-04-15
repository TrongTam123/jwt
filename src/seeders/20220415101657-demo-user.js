'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      await queryInterface.bulkInsert('User', [
        {
        email: 'trongtam244@gmail.com',
        password: '123',
        username: 'Fake1'
        },
        {
        email: 'trongtam244@gmail.com',
        password: '123',
        username: 'Fake2'
        },
        {
        email: 'trongtam244@gmail.com',
        password: '123',
        username: 'Fake3'
        },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
