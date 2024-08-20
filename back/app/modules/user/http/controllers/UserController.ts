import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

import { createUserValidator, updateUserValidator } from '#modules/user/validators/UserValidator';
import { AbstractUserService } from '#modules/user/services/AbstractUserService';

@inject()
export default class UsersController {
  constructor(private userService: AbstractUserService) {}

  async index({ request }: HttpContext) {
    return this.userService.list({});
  }

  /**
   * Show individual record
   */
  async show({ request }: HttpContext) {
    return await this.userService.findByIdOrThrow(request.param('id'));
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = request.all();
    const user = await createUserValidator.validate(data);

    return this.userService.save(user);
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const data = request.all();
    data['id'] = params.id;
    const rawAccount = await updateUserValidator.validate(data, {
      meta: {
        userId: params.id,
      },
    });

    const account = this.userService.save(rawAccount);

    return account;
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
