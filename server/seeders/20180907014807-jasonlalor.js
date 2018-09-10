'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Passengers', [{
        id: '4b232d86-d942-4de8-9358-0c923a0b0e2f',
        username: 'jasonlalor',
        first_name: 'Jason',
        email: 'jasonlalor@gmail.com',
        phone: '9544718822',
        createdAt: '2018-07-04 20:46:02.863-04',
        updatedAt: '2018-09-06 19:05:28.316-04'
      }], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Passengers', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
