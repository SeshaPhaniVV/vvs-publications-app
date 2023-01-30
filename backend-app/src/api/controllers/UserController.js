import BaseController from '@api/controllers/BaseController';

export default class UserController extends BaseController {
  /** @type {(import('@services/UserService').default)} */
  UserService;

  constructor(container) {
    super(container);
    this.UserService = container.get('UserService');
  }

  async getUsers(req, res, next) {
    try {
      const response = await this.UserService.getUsers(req.validatedPayload);
      res.status(200).json(response);
    } catch (err) {
      this.handleError(err, req, res, next);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const response = await this.UserService.deleteUser(req.validatedPayload);
      res.status(201).json(response);
    } catch (err) {
      this.handleError(err, req, res, next);
    }
  }

  async createUser(req, res, next) {
    try {
      const response = await this.UserService.createUser(req.validatedPayload);
      res.status(201).json(response);
    } catch (err) {
      this.handleError(err, req, res, next);
    }
  }

  async getUser(req, res, next) {
    try {
      const response = await this.UserService.getUser(req.validatedPayload);
      res.status(201).json(response);
    } catch (err) {
      this.handleError(err, req, res, next);
    }
  }
}
