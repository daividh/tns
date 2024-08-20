import { symbols } from '@adonisjs/auth';

import { IUser } from '#modules/user/models/IUser';
import { JwtGuardUser, JwtUserProviderContract } from './types/jwt.js';
import { inject } from '@adonisjs/core';
import { AbstractUserService } from '../user/services/AbstractUserService.js';
import { userAccount } from '../user/database/UserSchema.js';
import { eq } from 'drizzle-orm';

@inject()
export default class UserProvider implements JwtUserProviderContract<IUser> {
  declare [symbols.PROVIDER_REAL_USER]: IUser;

  constructor(private userService: AbstractUserService) {}

  createUserForGuard(user: IUser): Promise<JwtGuardUser<IUser>> {
    return Promise.resolve({
      getId: () => user.id,
      getOriginal: () => user,
    });
  }
  async findById(identifier: string | number | BigInt): Promise<JwtGuardUser<IUser> | null> {
    const user = await this.userService.findOne({
      where: eq(userAccount.id, Number(identifier)),
    });

    if (user == null) {
      return null;
    }

    return {
      getId: () => user.id,
      getOriginal: () => user,
    };
  }
}
