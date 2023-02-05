import Publication from '@models/publications';
import Http400Error from '@errors/Http400Error';
import User from '@models/users';

export default class UserService {
  /** @type {import('@loaders/logger')} */
  logger;

  constructor(container) {
    this.logger = container.get('logger');
  }

  /**
   * Gets user based on id
   *
   * @param {*} payload
   * @returns
   */
  async getUser(payload) {
    const { id } = payload;

    const user = await User.findOne({
      include: [
        {
          model: Publication,
          as: 'publications',
          required: false,
        },
      ],
      where: { id },
    });

    if (!user) {
      this.logger.info(`User does not exist for given Id - ${id} `);
      throw new Http400Error(`User does not exist for given Id - ${id}`);
    }

    return { user };
  }

  async deleteUser(payload) {
    const { id } = payload;

    const deletedUser = await User.destroy({ where: { id } });
    return deletedUser;
  }

  async updateUser(payload) {
    const { id } = payload;

    const updatedUser = await User.update(payload, { where: { id } });
    return updatedUser;
  }

  async createUser(payload) {
    const user = await User.create(payload);
    return user;
  }

  /**
   * returns all users
   *
   * @returns
   */
  getUsers() {
    return User.findAll();
  }
}
