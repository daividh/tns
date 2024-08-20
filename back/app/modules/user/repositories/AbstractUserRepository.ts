import { BaseModelRepository } from '#modules/core/repositories/BaseModelRepository';
import { Database } from '#modules/database/Database';

import { userAccount } from '#modules/user/database/UserSchema';
import { IUserRepository } from '#modules/user/repositories/IUserRepository';
import { IUserDefinition } from '#modules/user/models/IUser';

export abstract class AbstractUserRepository
  extends BaseModelRepository<IUserDefinition, 'userAccount'>
  implements IUserRepository
{
  constructor(database: Database) {
    super(database, userAccount, 'userAccount');
  }
}
