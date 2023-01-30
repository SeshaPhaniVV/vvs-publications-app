/**
 * @typedef {import('sequelize').Sequelize} Sequelize
 * @typedef {import('sequelize').QueryInterface} QueryInterface
 */
export default {
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns
   */

  up: async (queryInterface) => {
    const environment = process.env.NODE_ENV || 'development';
    let users;

    if (environment === 'production') {
      users = [];
    } else if (environment === 'staging' || environment === 'test') {
      users = [];
    } else {
      users = [
        {
          id: 1,
          firstName: 'demo',
          lastName: 'user',
          email: 'demo.user@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
    }

    const insertedUsers = await queryInterface.bulkInsert({ tableName: 'users', schema: 'users' }, users, {
      returning: true,
      ignoreDuplicates: true,
    });

    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert(
      { tableName: 'publications', schema: 'users' },
      [
        {
          student_id: insertedUsers[0].id,
          title: 'Publication #1',
          year: 2021,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student_id: insertedUsers[0].id,
          title: 'Publication #2',
          year: 2022,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true, ignoreDuplicates: true },
    );
  },
  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete({ tableName: 'publications', schema: 'users' }, null, {});
    return queryInterface.bulkDelete({ tableName: 'users', schema: 'users' }, null, {});
  },
};
