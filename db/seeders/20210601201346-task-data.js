'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Tasks', [
      { content: 'Milk', list_Id: 1, user_Id: 1, dueDate: null, startDate: null, priority: false, repeat: false, location: null, createdAt: new Date(), updatedAt: new Date() },
      { content: 'Eggs', list_Id: 1, user_Id: 1, dueDate: null, startDate: null, priority: false, repeat: false, location: null, createdAt: new Date(), updatedAt: new Date() },
      { content: 'Bread', list_Id: 1, user_Id: 1, dueDate: null, startDate: null, priority: false, repeat: false, location: null, createdAt: new Date(), updatedAt: new Date() },
      { content: 'Clean the Kitchen', list_Id: 1, user_Id: 1, dueDate: null, startDate: null, priority: true, repeat: false, location: null, createdAt: new Date(), updatedAt: new Date() },
      { content: 'Wash the Car', list_Id: 1, user_Id: 1, dueDate: null, startDate: null, priority: false, repeat: false, location: null , createdAt: new Date(), updatedAt: new Date()},
      { content: 'Do Homework', list_Id: 1, user_Id: 1, dueDate: null, startDate: null, priority: true, repeat: false, location: null, createdAt: new Date(), updatedAt: new Date() }
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
