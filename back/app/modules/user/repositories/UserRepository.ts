import { inject } from '@adonisjs/core';
import { Database } from '#modules/database/Database';

import { AbstractUserRepository } from '#modules/user/repositories/AbstractUserRepository';

@inject()
export class UserRepository extends AbstractUserRepository {
  constructor(db: Database) {
    super(db);
  }
}
