import BaseController from '@api/controllers/BaseController';

export default class UserController extends BaseController {
  /** @type {(import('@services/PublicationService').default)} */
  PublicationService;

  constructor(container) {
    super(container);
    this.PublicationService = container.get('PublicationService');
  }

  async getPublications(req, res, next) {
    try {
      const response = await this.PublicationService.getPublications(req.validatedPayload);
      res.status(200).json(response);
    } catch (err) {
      this.handleError(err, req, res, next);
    }
  }

  async deletePublication(req, res, next) {
    try {
      const response = await this.PublicationService.deletePublication(req.validatedPayload);
      res.status(200).json(response);
    } catch (err) {
      this.handleError(err, req, res, next);
    }
  }

  async updatePublication(req, res, next) {
    try {
      const response = await this.PublicationService.updatePublication(req.validatedPayload);
      res.status(200).json(response);
    } catch (err) {
      this.handleError(err, req, res, next);
    }
  }

  async createPublication(req, res, next) {
    try {
      const response = await this.PublicationService.createPublication(req.validatedPayload);
      res.status(201).json(response);
    } catch (err) {
      this.handleError(err, req, res, next);
    }
  }

  async getUserPublications(req, res, next) {
    try {
      const response = await this.PublicationService.getUserPublications(req.validatedPayload);
      res.status(201).json(response);
    } catch (err) {
      this.handleError(err, req, res, next);
    }
  }
}
