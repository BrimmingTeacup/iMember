'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Tasks', [
      { content: 'Milk', dueDate: null, startDate: null, priority: false, repeat: false, location: null },
      { content: 'Eggs', dueDate: null, startDate: null, priority: false, repeat: false, location: null },
      { content: 'Bread', dueDate: null, startDate: null, priority: false, repeat: false, location: null },
      { content: 'Clean the Kitchen', dueDate: null, startDate: null, priority: true, repeat: false, location: null },
      { content: 'Wash the Car', dueDate: null, startDate: null, priority: false, repeat: false, location: null },
      { content: 'Do Homework', dueDate: null, startDate: null, priority: true, repeat: false, location: null }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
