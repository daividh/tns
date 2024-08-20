import { inject } from '@adonisjs/core';
import { HttpContext } from '@adonisjs/core/http';

import { AbstractUserService } from '#modules/user/services/AbstractUserService';
import hash from '@adonisjs/core/services/hash';
import { eq } from 'drizzle-orm';
import { userAccount } from '#modules/user/database/UserSchema';
import { errors as authErrors } from '@adonisjs/auth';

@inject()
export default class SessionController {
  constructor(private userService: AbstractUserService) {}

  async login({ request, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password']);

    const user = await this.userService.findOne({
      where: eq(userAccount.email, email),
    });

    if (!user) {
      throw new authErrors.E_INVALID_CREDENTIALS();
    }

    /**
     * Verify the password using the hash service
     */
    await hash.verify(user.password, password);

    return await auth.use('jwt').generate(user);
  }
}
