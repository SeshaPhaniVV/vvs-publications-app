import Publication from '@models/publications';
import User from '@models/users';

export default class PublicationService {
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
  async getUserPublications(payload) {
    const { userId } = payload;

    const publications = await Publication.findAll({
      where: { student_id: userId },
    });

    const user = await User.findOne({ where: { id: userId } });

    return { publications, user };
  }

  async deletePublication(payload) {
    const { id } = payload;

    const deletedPublication = await Publication.destroy({ where: { id } });
    return deletedPublication;
  }

  async updatePublication(payload) {
    const { id } = payload;

    const updatedPublication = await Publication.update(payload, { where: { id } });
    return updatedPublication;
  }

  /**
   * Creates Publication
   *
   * @param {*} payload
   */
  async createPublication(payload) {
    const publication = await Publication.create(payload);
    return publication;
  }

  /**
   * returns all publications
   *
   * @returns
   */
  getPublications() {
    return Publication.findAll();
  }
}
