import 'module-alias/register';

export default {
  up: async (queryInterface) => {
    await queryInterface.createSchema('users');
  },

  down: async (queryInterface) => {
    await queryInterface.dropSchema('users');
  },
};
