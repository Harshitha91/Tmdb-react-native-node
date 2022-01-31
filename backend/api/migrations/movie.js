'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Movie', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      release_date: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      popularity: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      vote_average: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      poster_path: {
        allowNull: true,
        type: Sequelize.STRING,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Movie')
  },
}
