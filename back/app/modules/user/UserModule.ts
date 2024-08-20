import app from '@adonisjs/core/services/app';
import { AbstractUserRepository } from '#modules/user/repositories/AbstractUserRepository';
import { AbstractUserService } from '#modules/user/services/AbstractUserService';

export const initUserModule = async () => {
  const { UserRepository } = await import('#modules/user/repositories/UserRepository');
  app.container.singleton(AbstractUserRepository, () => {
    return app.container.make(UserRepository);
  });

  // User
  const { UserService } = await import('#modules/user/services/UserService');
  app.container.singleton(AbstractUserService, () => {
    return app.container.make(UserService);
  });
};
