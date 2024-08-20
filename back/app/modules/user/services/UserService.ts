import { inject } from '@adonisjs/core';

import { AbstractUserRepository } from '#modules/user/repositories/AbstractUserRepository';
import { AbstractUserService } from '#modules/user/services/AbstractUserService';

@inject()
export class UserService extends AbstractUserService {
  constructor(repository: AbstractUserRepository) {
    super(repository);
  }
}
