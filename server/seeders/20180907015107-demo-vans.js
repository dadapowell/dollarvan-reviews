'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Vans', [{
          id: 'fcc82ace-a7d1-481c-8316-3ba9b7163cce',
          base_lic_num: 'B80070',
          affil_base_name: 'EARLY BIRD TRANSPORTATION INC',
          driver_name: 'MESSIAS,BARRINGTON,G',
          licensee_num: '5453779',
          dollarvan_id: 1000,
          dollarvan_id_inuse: true,
          dmv_lic_plate: '55534LA',
          createdAt: '2018-07-29 21:24:49.673-04',
          updatedAt: '2018-07-29 21:24:49.673-04'
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
      return queryInterface.bulkDelete('Vans', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
