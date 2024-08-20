import { BaseException } from '#modules/core/exceptions/BaseException';

export class NotFoundException extends BaseException {
  static status = 404;
  static code = 'E_NOT_FOUND';

  constructor() {
    super('Not found');
  }
}
