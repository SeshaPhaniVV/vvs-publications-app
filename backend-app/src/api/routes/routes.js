import { Router } from 'express';
import { Container } from 'typedi';
import UserController from '@api/controllers/UserController';
import PublicationController from '@api/controllers/PublicationController';
import UserSchema from '@api/schemas/UserSchema';
import PublicationSchema from '@api/schemas/PublicationSchema';

export default (app) => {
  const userControllerI = new UserController(Container);
  const publicationControllerI = new PublicationController(Container);
  const userRoutes = Router();
  const publicationRoutes = Router();

  /**
   * User Routes
   */
  app.use('/users', userRoutes);
  const userSchemaI = new UserSchema(Container);

  userRoutes.get('', userSchemaI.userValidation, userControllerI.getUsers);
  userRoutes.get('/:id', userSchemaI.userValidation, userControllerI.getUser);
  userRoutes.post('', userSchemaI.userValidation, userControllerI.createUser);
  userRoutes.delete('/:id', userSchemaI.userValidation, userControllerI.deleteUser);

  /**
   * Publication Routes
   */
  app.use('/publications', publicationRoutes);
  const publicationsSchemaI = new PublicationSchema(Container);

  publicationRoutes.get('', publicationsSchemaI.reqValidation, publicationControllerI.getPublications);
  publicationRoutes.get('/user/:userId', publicationsSchemaI.reqValidation, publicationControllerI.getUserPublications);
  publicationRoutes.post('', publicationsSchemaI.reqValidation, publicationControllerI.createPublication);
  publicationRoutes.delete('/:id', publicationsSchemaI.reqValidation, publicationControllerI.deletePublication);
  publicationRoutes.put('/:id', publicationsSchemaI.reqValidation, publicationControllerI.updatePublication);
};
