import { ApplicationService } from '@adonisjs/core/types';
import { Database } from '#modules/database/Database';
import { initUserModule } from '#modules/user/UserModule';
import { AbstractUserService } from '#modules/user/services/AbstractUserService';
import { UserService } from '#modules/user/services/UserService';
import { AbstractUserRepository } from '#modules/user/repositories/AbstractUserRepository';
import { UserRepository } from '#modules/user/repositories/UserRepository';

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  async boot() {
    await Promise.all([initUserModule()]);
  }

  register() {
    // Database

    this.app.container.singleton(Database, async () => {
      const db = new Database();
      await db.connect();
      return db;
    });

    // User module
    // this.app.container.singleton(AbstractUserRepository, async () => {
    //   return new UserRepository(
    //     await this.app.container.make(Database)
    //   )
    // });
    // this.app.container.singleton(AbstractUserService, async () => {
    //   return new UserService(
    //     await this.app.container.make(AbstractUserRepository)
    //   )
    // });
  }
}
