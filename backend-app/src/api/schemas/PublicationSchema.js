import autoBind from 'auto-bind';
import BaseSchema from './BaseSchema';

export default class PublicationSchema extends BaseSchema {
  constructor(container) {
    super(container);
    // Had to do autobind as we are passing function and the execution context changes
    autoBind(this);
  }

  // TODO: update Users Schema
  reqValidation(req, res, next) {
    const schema = this.joi.object();
    this.validate(req, schema);
    next();
  }
}
